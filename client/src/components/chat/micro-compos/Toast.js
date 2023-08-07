import React from 'react';
import "./noChat.css";

function Toast({toastStyle, setToastStyle}) {
  function onChange(e){
    setToastStyle({...toastStyle, [e.target.name] : e.target.value});
  };

  function close(){
    setToastStyle({top: '-90%'});
  }

  return (
    <div className='toast' style={{top: toastStyle.top}}>
        <div className='toast-con'>
            <input type='text' name='value' value={toastStyle.value} onChange={onChange} readOnly={toastStyle.disabled} />
            <div className='toast-btns'>
                <button disabled={toastStyle.disabled}>Delete</button>
                <button>Delete For Me</button>
                <button disabled={toastStyle.disabled}>Edit</button>
                <button onClick={close}>Cancle</button>
            </div>
        </div>
    </div>
  );
};

export default Toast;