import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Singup() {
  const [inputValue, setInputValue] = useState({ name: "", email: '', password: '' });
  const navigate = useNavigate();

  // Setting given input values
  function onChange(e) {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  // For allert
  function setToast(msg) {
    toast(msg)
  }

  // Fetching api and sending given credentials
  async function signupUser(e) {
    e.preventDefault();
    const { name, email, password } = inputValue;

    const confirmPassword = document.querySelectorAll(".inputs");
    if (confirmPassword[2].value !== confirmPassword[3].value) return setToast("password didn't matched");

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
      navigate('/');
    }
    else {
      setToast(parsedData.errors);
    };
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
              <a href="/" target='_blank'><i className="fa-brands fa-facebook"></i>acebook</a>
              <a href="/" target='_blank'><i className="fa-brands fa-instagram"></i>Instagram</a>
              <a href="/" target='_blank'><i className="fa-brands fa-google"></i>oogle</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Singup