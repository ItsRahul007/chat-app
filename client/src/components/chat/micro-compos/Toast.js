import React from 'react';
import "./noChat.css";

function Toast() {
  return (
    <div className='toast'>
        <div className='toast-con'>
            <input type='text' />
            <div className='toast-btns'>
                <button>Delete</button>
                <button>Delete For Me</button>
                <button>Edit</button>
                <button>Cancle</button>
            </div>
        </div>
    </div>
  );
};

export default Toast;