import React from 'react'

function Singup() {
  return (
    <div className='log sign'>
      <h1>Signup</h1>
      <div className='signup'>
        <form autoComplete='off' className='signup-form'>
          <input autoComplete='off' className='inputs' type='text' placeholder='Enter your name' />
          <input autoComplete='off' className='inputs' type='email' placeholder='Enter your email' />
          <input autoComplete='off' className='inputs' type='password' placeholder='Set your password' />
          <input autoComplete='off' className='inputs' type='password' placeholder='Confirm password' />
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