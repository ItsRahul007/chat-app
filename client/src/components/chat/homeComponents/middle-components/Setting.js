import React from 'react'

function Setting() {
  return (
    <div className='setting-comp'>
      <div>Settings</div>
      <ul className='collaps'>
        <li>
          <input type='radio' name='accordian' id='first' />
          <label htmlFor='first'>General Info</label>
          <div className='content'>
            <div>
              <input type='text' />
              <div>Full Name</div>
            </div>
            <div>
              <input type='text' />
              <div>About</div>
            </div>
          </div>
        </li>
        <li>
          <input type='radio' name='accordian' id='second' />
          <label htmlFor='second'>Change Password</label>
          <div className='content'>
            <div>
              <input type='text' />
              <div>Full Name</div>
            </div>
            <div>
              <input type='text' />
              <div>About</div>
            </div>
          </div>
      </li>
    </ul>
    </div >
  );
};

export default Setting;