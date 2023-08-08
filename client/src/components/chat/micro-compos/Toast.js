import React from 'react';
import "./noChat.css";
import { socket } from '../socket/socketIO';
import { dltMessage } from '../../../store/slices/messageSlice';
import { useDispatch } from 'react-redux';

function Toast({ toastStyle, setToastStyle, keyId, userId }) {
  const dispatch = useDispatch();

  // When the input willbe change
  function onChange(e) {
    setToastStyle({ ...toastStyle, [e.target.name]: e.target.value });
  };

  function close() {
    setToastStyle({ top: '-90%' });
  };

  // Deleting the clicked message
  function deleteMsg() {
    dispatch(dltMessage({ keyId, msgId: toastStyle.msgId }));
    close();
  };

  function deleteForEveryOne() {
    dispatch(dltMessage({ keyId, msgId: toastStyle.msgId }));
    socket.emit("delete-msg", { userId, msgId: toastStyle.msgId });
    close();
  };

  return (
    <div className='toast' style={{ top: toastStyle.top }}>
      <div className='toast-con'>
        <input type='text' name='value' value={toastStyle.value} onChange={onChange} readOnly={toastStyle.disabled} />
        <div className='toast-btns'>
          <button disabled={toastStyle.disabled} onClick={deleteForEveryOne}>
            Delete
          </button>
          <button onClick={deleteMsg}>
            Delete For Me
          </button>
          <button disabled={toastStyle.disabled}>
            Edit
          </button>
          <button onClick={close}>
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;