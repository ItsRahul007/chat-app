import React from 'react';
import "./auth.css";
import { Link } from 'react-router-dom';

function Login() {

  return (
    <>
      <div className='log'>
        <h1>Login</h1>
        <p>Get logged in to the chat-app <br /> Chat with anyone anytime</p>
        <form className='login-form' autoComplete='off'>
          <input className='inputs' autoComplete='off' type='email' placeholder='Enter your email' />
          <input className='inputs' autoComplete='off' type='password' placeholder='Set your password' />
          <button className='btnn' type='submit'>Login</button>
        </form>
        <div className='login-other'>
          <span>or login with</span>
          <button target='_blank'><i className="fa-brands fa-facebook"></i></button>
          <button target='_blank'><i className="fa-brands fa-instagram"></i></button>
          <button id='singGoogle' target='_blank'><i className="fa-brands fa-google"></i></button>
        </div>
        <div className='noAccount'>
          Don't have an account <Link to="/signup">Signup</Link>
        </div>
      </div>
    </>
  )
}

export default Login