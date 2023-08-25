import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../store/slices/alertSlice';
import { useGoogleLogin } from '@react-oauth/google';
import { socket } from "../chat/socket/socketIO";
import axios from "axios";

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
  async function storeGoogleUserInfo({name, email, password}){
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

  // Fetching api and sending given credentials
  function signupUser(e) {
    e.preventDefault();

    const confirmPassword = document.querySelectorAll(".inputs");
    if (confirmPassword[2].value !== confirmPassword[3].value) return alert("password didn't matched");

    storeGoogleUserInfo(inputValue);
  };

  const singupGoogle = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      fetchGoogleUser(tokenResponse);
    },
    onError: ()=> alert("Some server error occerd")
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
        storeGoogleUserInfo(info);
      })
      .catch(error => {
        alert("Some server error occerd");
        console.error('Error fetching user data:', error);
      });
  };

  function loginWithGithub(){
    window.location.assign(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`);
  };

  return (
    <div className='log sign'>
      <h1>Signup</h1>
      <div className='signup'>
        <form autoComplete='off' className='signup-form' onSubmit={signupUser}>

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
            <a href="/"><i className="fa-brands fa-facebook"></i>acebook</a>
            <a href="/" onClick={loginWithGithub}><i className="ri-github-fill"></i>Github</a>
            <a href="/" onClick={singupGoogle}><i className="fa-brands fa-google"></i>oogle</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup