import React from 'react';
import "./auth.css";
import { Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
// const decoded = jwt_decode("ya29.a0AbVbY6Pg3yk2yXMxxw2RUJJMa2PxwkoFEOHUJneyTrRyux41LGvJ-kA2u3hWLPUfr16gsi36ktkP6szBkr-KtIAv8siHak5OTl9-Ne1H00b2ZlLuATxvRr8myJGAdcewenfijDEvZN44e4L1a6hxFuzyUiabaCgYKAdsSARMSFQFWKvPlBcSeKbiTDK1yG-ZY9hWX6w0163");
// console.log(decoded)

function Login() {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      // const decoded = jwt_decode();
      console.log(tokenResponse);
    },
    
  });

  return (
    <>
      <div className='log'>
       <h1>Login</h1>
       <p>Get logged in to the chat-app <br/> Chat with anyone anytime</p>
        <form className='login-form' autoComplete='off'>
          <input className='inputs' autoComplete='off' type='email' placeholder='Enter your email'/>
          <input className='inputs' autoComplete='off' type='password' placeholder='Set your password'/>
          <button className='btnn' type='submit'>Login</button>
        </form>
        <div className='login-other'>
          <span>or login with</span>
          <button target='_blank'><i className="fa-brands fa-facebook"></i></button>
          <button target='_blank'><i className="fa-brands fa-instagram"></i></button>
          <button onClick={login} target='_blank'><i className="fa-brands fa-google"></i></button>
        </div>
        <div className='noAccount'>
          Don't have an account <Link to="/signup">Signup</Link>
        </div>
      </div>    
    </>
  )
}

export default Login