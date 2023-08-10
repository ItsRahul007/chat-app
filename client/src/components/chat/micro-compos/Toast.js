import React from 'react';
import "./noChat.css";
import { socket } from '../socket/socketIO';
import { dltMessage, updateMessage } from '../../../store/slices/messageSlice';
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

  // Deleting the clicked message for user only
  function deleteMsgForMe() {
    dispatch(dltMessage({ keyId, msgId: toastStyle.msgId }));
    close();
  };

  // Deleting the clicked message for everyone
  function deleteForEveryOne() {
    deleteMsgForMe();
    socket.emit("delete-msg", { userId, msgId: toastStyle.msgId, reciverId: keyId });
  };

  function update(){
    const updateValue = document.getElementById("updateValue");
    dispatch(updateMessage({ keyId, msgId: toastStyle.msgId, newContent: updateValue.value }));
    socket.emit("update-msg", { userId, msgId: toastStyle.msgId, reciverId: keyId, newContent: updateValue.value });
    close();
  };

  return (
    <div className='toast' style={{ top: toastStyle.top }}>
      <div className='toast-con'>
        <input type='text' name='value' value={toastStyle.value} onChange={onChange} readOnly={toastStyle.disabled} id='updateValue' />
        <div className='toast-btns'>
          <button disabled={toastStyle.disabled} onClick={deleteForEveryOne}>
            Delete
          </button>
          <button onClick={deleteMsgForMe}>
            Delete For Me
          </button>
          <button disabled={toastStyle.disabled} onClick={update}>
            Update
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