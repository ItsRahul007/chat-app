import React, { useState } from 'react';
import "./auth.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showAlert, removeAlert } from '../../store/slices/alertSlice';
import axios from "axios";
import { useGoogleLogin } from '@react-oauth/google';

function Login({callApi}) {
  const [inputValue, setInputValue] = useState({name: '', password: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Setting the given input values
  function onChange(e){
    setInputValue({...inputValue, [e.target.name]: e.target.value});
  };

  // For allert
  function alert(msg) {
    dispatch(showAlert(msg));
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3500);
  };

  // The login function
  async function loginUser({email, password}){
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

  function fetchGoogleUser(token) {
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        'Authorization': `Bearer ${token.access_token}`
      }
    })
      .then(response => {
        const userData = response.data;
        console.log((userData))
        loginUser({email: userData.email, password: userData.email});
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
    onError: ()=> alert("Some server error occerd")
  });

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
        <button target='_blank'><i className="fa-brands fa-facebook"></i></button>
        <button target='_blank'><i className="fa-brands fa-instagram"></i></button>
        <button id='singGoogle' target='_blank' onClick={loginWithGoogle}><i className="fa-brands fa-google"></i></button>
        
      </div>
      <div className='noAccount'>
        Don't have an account <Link to="/signup">Signup</Link>
      </div>
    </div>
  )
}

export default Login;