import React, { useState, useEffect } from 'react';
import "./auth.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert, removeAlert } from '../../store/slices/alertSlice';
import axios from "axios";
import { socket } from "../chat/socket/socketIO";
import { useGoogleLogin } from '@react-oauth/google';

function Login({ callApi }) {
  const [inputValue, setInputValue] = useState({ name: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Setting the given input values
  function onChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // For allert
  function alert(msg) {
    dispatch(showAlert(msg));
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3500);
  };

  // The login function
  async function loginUser({ email, password }) {
    const responce = await fetch("http://localhost:4000/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const parsedData = await responce.json();
    if (parsedData.authToken) {
      localStorage.setItem("authToken", parsedData.authToken);
      callApi();
      navigate('/');
    }
    else {
      alert(parsedData.errors);
    };
  }

  // Fetching api and sending given credentials
  function signupUser(e) {
    e && e.preventDefault();
    const { email, password } = inputValue;
    loginUser({ email, password });
  };

  // Fetching google user
  function fetchGoogleUser(token) {
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      }
    })
      .then(response => {
        const userData = response.data;
        console.log((userData))
        loginUser({ email: userData.email, password: userData.email });
      })
      .catch(error => {
        alert("Some server error occerd");
        console.error('Error fetching user data:', error);
      });
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      fetchGoogleUser(tokenResponse);
    },
    onError: () => alert("Some server error occerd")
  });

  // Getting the github code from parameaters
  useEffect(() => {
    const querryString = window.location.search;
    const urlParams = new URLSearchParams(querryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
    if(codeParam){
      getAccessToken(codeParam)
    }
  }, []);
  
  // Creating a new user with infos
  async function signupUser({name, email, password}){
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

  // Re-dericet user to github authentication page
  function loginWithGithub() {
    const clientId = "07c40468d891316c80d6";
    const redirectUri = "http://localhost:3000/login";
    const scope = 'user user:email'; // The scope of access you're requesting
  
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=chat-app`;
    window.location.href = authUrl;
  };

  // When user logeding fetching access token and after that fetching his details 
  async function getAccessToken(codeParam){
    const res = await fetch("http://localhost:4000/github/getAccessToken?code=" + codeParam);
    const parsedData = await res.json();
    if(parsedData.access_token){
      const res = await fetch("http://localhost:4000/github/getUserData", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + parsedData.access_token
        }
      });
      const data = await res.json();      
      if(data.errors) alert(data.errors) // If we can't get user's email sending alert
      else if(data.email) loginUser({email: data.email, password: data.email}) // If email already exist then runing loging user function
      else signupUser({name: data.name, email: data.email, password: data.email}); // If its a new user then signup him
    };
  };

  return (
    <div className='log'>
      <h1>Login</h1>
      <p>Get logged in to the chat-app <br /> Chat with anyone anytime</p>
      <form className='login-form' autoComplete='off' onSubmit={signupUser}>

        <input className='inputs' autoComplete='off' type='email' name='email' value={inputValue.email} placeholder='Enter your email' required onChange={onChange} />
        <input className='inputs' autoComplete='off' type='password' name='password' value={inputValue.password} placeholder='Enter password' required minLength={8} onChange={onChange} />
        <button className='btnn' type='submit'>Login</button>

      </form>
      <div className='login-other'>

        <span>or login with</span>
        <button><i className="fa-brands fa-facebook"></i></button>
        <button onClick={loginWithGithub}><i className="ri-github-fill"></i></button>
        <button id='singGoogle' onClick={loginWithGoogle}><i className="fa-brands fa-google"></i></button>

      </div>
      <div className='noAccount'>
        Don't have an account <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Login;