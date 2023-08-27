import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/slices/alertSlice';
import { useGoogleLogin } from '@react-oauth/google';
import { socket } from "../chat/socket/socketIO";
import axios from "axios";
import { LoginSocialFacebook } from "reactjs-social-login";

function Singup({ callApi }) {
  const [inputValue, setInputValue] = useState({ name: "", email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Setting given input values
  function onChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // For allert
  function alert(msg) {
    dispatch(showAlert(msg));
  };

  // Signup user with infos
  async function signupUser({ name, email, password }) {
    const responce = await fetch("http://localhost:4000/auth/signup", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const parsedData = await responce.json();
    if (parsedData.authToken) {
      localStorage.setItem("authToken", parsedData.authToken);
      callApi();
      navigate('/');
      socket.emit("user-signup");
    }
    else {
      alert(parsedData.errors);
    };
  };

  // Fetching api and sending given input credentials
  function signupUserWithGivenInfo(e) {
    e.preventDefault();

    const confirmPassword = document.querySelectorAll(".inputs");
    if (confirmPassword[2].value !== confirmPassword[3].value) return alert("password didn't matched");

    signupUser(inputValue);
  };

  const singupGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      fetchGoogleUser(tokenResponse);
    },
    onError: () => alert("Some server error occerd")
  });

  function fetchGoogleUser(token) {
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      }
    })
      .then(response => {
        const info = {};
        const userData = response.data;
        info.name = userData.name;
        info.email = userData.email;
        info.password = userData.email;
        signupUser(info);
      })
      .catch(error => {
        alert("Some server error occerd");
        console.error('Error fetching user data:', error);
      });
  };

  // Github login function
  function loginWithGithub() {
    const clientId = "07c40468d891316c80d6";
    const redirectUri = window.location.href;
    const scope = 'user';

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    // Getting the github code from parameaters
    const querryString = window.location.search;
    const urlParams = new URLSearchParams(querryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
    if (codeParam) {
      getAccessToken(codeParam)
    };

  }, []);  

  // When user logedin fetching access token and after that fetching his details 
  async function getAccessToken(codeParam) {
    const res = await fetch("http://localhost:4000/github/getAccessToken?code=" + codeParam);
    const parsedData = await res.json();
    if (parsedData.access_token) {
      const res = await fetch("http://localhost:4000/github/getUserData", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + parsedData.access_token
        }
      });
      const data = await res.json();
      if (data.errors) alert(data.errors) // If we can't get user's email sending alert
      else if (data.loginUser) alert("A user with this email already exists") // If email already exist then alerting him
      else if (data.newUser) signupUser({ name: data.newUser.name, email: data.newUser.email, password: data.newUser.email }); // If its a new user then signup him
    };
  };

  return (
    <div className='log sign'>
      <h1>Signup</h1>
      <div className='signup'>
        <form autoComplete='off' className='signup-form' onSubmit={signupUserWithGivenInfo}>

          <input autoComplete='off' className='inputs' type='text' placeholder='Enter your name' minLength={3} required name='name' value={inputValue.name} onChange={onChange} />
          <input autoComplete='off' className='inputs' type='email' placeholder='Enter your email' name='email' required value={inputValue.email} onChange={onChange} />
          <input autoComplete='off' className='inputs' type='password' placeholder='Set your password' minLength={8} required name='password' value={inputValue.password} onChange={onChange} />
          <input autoComplete='off' className='inputs' type='password' placeholder='Confirm password' minLength={8} required />
          <button className='btnn' type='submit'>Submit</button>

        </form>
        <div className='column'>
          <div className='v1'></div>
          <span>or</span>
          <div className='v2'></div>
        </div>
        <div className='other-option'>
          <h2>Signup with</h2>
          <div>
            <LoginSocialFacebook
              isOnlyGetToken
              appId='1094803578156515'
              onResolve={({ provider, data }) => {
                console.log(provider)
                console.log(data)
              }}
              onReject={(err) => {
                console.log(err)
              }}
            >
              <a href="/" target='_blank'><i className="fa-brands fa-facebook"></i>acebook</a>
            </LoginSocialFacebook>

            <a href="/" target='_blank' onClick={loginWithGithub}><i className="ri-github-fill"></i>Github</a>
            <a href="/" target='_blank' onClick={singupGoogle}><i className="fa-brands fa-google"></i>oogle</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup