import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { socket } from '../socket/socketIO';
import { useSelector } from 'react-redux';
import Toast from '../micro-compos/Toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function RightComp({ openMenu, chatWith, userId, updateMessageState, updateLocalMessages, storeImage, updateLocalImages }) {
  let { _id } = chatWith;
  const [text, setText] = useState(''); // For storing typed messages
  const [toastStyle, setToastStyle] = useState({ top: "-90%", value: '', disabled: false });
  const [info, setInfo] = useState({ name: '', avatar: '', image: '' });
  const { name, avatar, image } = info;

  // Importing the store states
  const messageStore = useSelector(state => state.messageSlice);
  const onlineId = useSelector(state => state.onlineSlice);
  const allPersons = useSelector(state => state.user.allUsersData);

  useEffect(() => {
    const allUsers = allPersons.data;
    const user = allUsers.filter(obj => obj._id === _id);
    setInfo(user[0]);
  }, [_id, allPersons]);

  //For scrolled to the bottom message
  function scrollBottom() {
    const chatContainer = document.getElementById('chat-container');
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 200);
  };

  // Generating a unique id for specific messages
  function generateUniqueID() {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 9);
    return `${timestamp}-${randomString}`;
  };

  useEffect(() => scrollBottom(), [chatWith]); // When ever clicked on any chat scrolling down

  // If chatWith is not null scrolling down the page whenever get any messages or images
  useEffect(() => {
    socket.on("recive-msg", () => {
      scrollBottom();
    });

    socket.on("recive-image", () => {
      scrollBottom();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {

    const smilefaceEmoji = document.getElementById("smilefaceEmoji");
    const emojiBtn = document.getElementById("emojiBtn");
    const emojiPicker = document.getElementById("emojiPicker");

    // When hover on emoji emoji piker will visible
    emojiPicker.style.display = "none";
    emojiBtn.addEventListener("mouseenter", () => {
      smilefaceEmoji.style.display = "none";
      emojiPicker.style.display = "block";
    });

    // When mouse leave emoji piker would vanised
    emojiBtn.addEventListener("mouseleave", () => {
      smilefaceEmoji.style.display = "block";
      emojiPicker.style.display = "none";
    });

  }, []);

  // Emoji piker clicked function
  function pickEmoji(e) {
    setText(text + e.emoji);
  };

  // Sending the messages into server and adding the message in frontend
  function sendMsg() {
    const msgId = generateUniqueID();
    socket.emit('send_msg', { text, id: _id, msgId });
    updateMessageState(_id, userId, text, msgId);
    updateLocalMessages(_id, userId, text, msgId);
    setText('');
    scrollBottom();
  };

  // Listening the Enter button event
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (text.trim() !== '') {
        sendMsg();
      };
    };
  };

  // For delete and edit message options if the message is clicked user's then buttons are not disabled else its disabled
  function options(obj) {
    if (obj.id !== userId) setToastStyle({ top: "0", value: obj.msg, msgId: obj.msgId, disabled: true });
    else setToastStyle({ top: "0", value: obj.msg, msgId: obj.msgId, disabled: false });
  };

  // For sending pictures
  function sendFile(e) {
    const file = e.target.files[0];
    const msgId = generateUniqueID();

    const reader = new FileReader();
    reader.onload = (fileEvent) => {
      const imageData = fileEvent.target.result;

      storeImage(_id, userId, imageData, msgId);
      updateLocalImages(_id, userId, imageData, msgId);
      socket.emit("send-image", { id: _id, img: imageData, msgId });
    };
    reader.readAsDataURL(file);
    scrollBottom();
  };

  return (
    <div className='right-comp'>
      <Toast toastStyle={toastStyle} keyId={_id} setToastStyle={setToastStyle} userId={userId} /> {/* For deleting or editing messages */}
      {/* Right head section */}
      <div className='chat-head'>
        <button className='menu-btn' onClick={openMenu}>
          <i className="ri-menu-line"></i>
        </button>
        <span className='user-avatar' style={{ background: image ? "black" : avatar }}>
          {image ? <img src={`http://localhost:4000/images/` + image} alt='profile' /> : [name && name.slice(0, 2)]}
        </span>
        <span>
          <div className='user-name'>{name}</div>
          <div className='user-status'>{onlineId.includes(_id) ? "Online" : "Offline"}</div>
        </span>
      </div>

      {/* Message section */}
      <div className='chat-section' id='chat-container'>

        {
          messageStore[_id] ? messageStore[_id].map((obj) => {
            return (
              <PhotoProvider>
                {obj.msg ?
                  <div onClick={() => options(obj)} key={obj.msgId} className={`msg-box ${obj.id === userId ? "msg-right" : "msg-left"}`}>
                    {obj.msg}
                  </div>
                  :
                  <PhotoView src={obj.img}>
                    <img src={obj.img} alt='' key={obj.msgId} className={`msg-box ${obj.id === userId ? "msg-right" : "msg-left"}`} />
                  </PhotoView>
                }
              </PhotoProvider>
            );
          })
            :
            <h1>No chats</h1>
        }

      </div>

      {/* The right bottom section */}
      <div className='msg-sender'>
        <textarea type='text' placeholder='Type your message here...' value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKeyDown}
        />

        <div className='attach' id='emojiBtn'>
          <i className="fa-regular fa-face-smile-beam" id='smilefaceEmoji'></i>
          <div id='emojiPicker' style={{ display: "none" }}>
            <EmojiPicker theme='dark' height={600} onEmojiClick={pickEmoji} />
          </div>
        </div>

        <input type='file' accept="image/*" style={{ display: "none" }} id='attachFile' onChange={sendFile} />
        <label htmlFor='attachFile' type="file" name="avatar" className='attach'>
          <i className="ri-attachment-line"></i>
        </label>
        <button className='btn-send' disabled={text.length <= 0 || !text.trim().length} onClick={sendMsg} >
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/send1.svg' alt='' />
        </button>
      </div>
    </div>
  );
};

export default RightComp;