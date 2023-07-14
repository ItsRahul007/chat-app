import React, { useState } from 'react';

function Singup() {
  const [inputValue, setInputValue] = useState({name: "", email: '', password: ''});

  async function signupUser(){
    const confirmPassword = document.querySelectorAll(".inputs");
    if(confirmPassword[2].value !== confirmPassword[3].value) return alert("password didn't matched");

    await fetch("http://localhost:4000/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inputValue)
    });
  };

  function onChange(e){
    setInputValue({...inputValue, [e.target.name]: e.target.value});
  }

  return (
    <div className='log sign'>
      <h1>Signup</h1>
      <div className='signup'>
        <form autoComplete='off' className='signup-form' onSubmit={signupUser}>

          <input autoComplete='off' className='inputs' type='text' placeholder='Enter your name' minLength={3} name='name' value={inputValue} onChange={onChange} />
          <input autoComplete='off' className='inputs' type='email' placeholder='Enter your email' name='email' value={inputValue} onChange={onChange} />
          <input autoComplete='off' className='inputs' type='password' placeholder='Set your password' minLength={8} name='password' value={inputValue} onChange={onChange} />
          <input autoComplete='off' className='inputs' type='password' placeholder='Confirm password' minLength={8} />
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
  )
}

export default Singup;