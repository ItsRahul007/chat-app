import React from 'react'

function Setting() {
  return (
    <div className='setting-comp'>
      <div>Settings</div>
      <ul className='collaps'>
        <li>
          <input type='radio' name='accordian' id='first' checked readOnly />
          <label htmlFor='first'>General Info</label>
          <div className='content'>
            <div>
              <input type='text' />
              <span>Full Name</span>
            </div>
            <div>
              <input type='text' />
              <span>About</span>
            </div>
            <div>
              <input type='text' />
              <span>Email</span>
            </div>
          </div>
        </li>
        <li>
          <input type='radio' name='accordian' id='second' readOnly />
          <label htmlFor='second'>Change Password</label>
          <div className='content'>
            <div>
              <input type='text' />
              <span>Current Password</span>
            </div>
            <div>
              <input type='text' />
              <span>New Password</span>
            </div>
            <div>
              <input type='text' />
              <span>Confirm Password</span>
            </div>
            <div>
              <button className='setting-btn'>Change Password</button>
            </div>
          </div>
        </li>
      </ul>
      <button className='setting-btn'>Save Changes</button>
    </div >
  );
};

export default Setting;