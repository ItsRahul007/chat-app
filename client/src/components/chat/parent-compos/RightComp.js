import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { socket } from '../socket/socketIO';

function RightComp({ openMenu, chatWith }) {
  const { name, avatar, image, _id } = chatWith;
  const [text, setText] = useState(''); // For storing typed messages
  const [messages, setMessages] = useState('')
  const bottom_msg = useRef(null);

  //For scrolled to the bottom message
  function scrollBottom() {
    bottom_msg.current && bottom_msg.current.scrollIntoView({ behavior: "smooth" });
    console.log(bottom_msg.current);
  };

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

    scrollBottom();
  }, []);

  // Emoji piker clicked function
  function pickEmoji(e) {
    setText(text + e.emoji);
  };

  function appendChild(msg, position){
    let chatCon = document.querySelector(".chat-section");
    let child = document.createElement('div');
    child.classList.add(`msg-box`);
    child.classList.add(`msg-${position}`);
    child.onClick = options();
    child.innerText = msg;
    child.ref = bottom_msg;
    chatCon.appendChild(child);
  };

  // Sending the messages into server and adding the message in frontend
  function sendMsg() {
    socket.emit('send_msg', { text, id: _id });
    appendChild(text, "right");
    setText('');
    scrollBottom();
  };

  // Receving emitied functions on the server
  useEffect(() => {
    // Receving the sended message and adding the message in the frontend
    socket.on("recive-msg", (obj) => {
      appendChild(obj.msg, "left");
      console.log(obj);
      scrollBottom();
    });
  }, [socket]);

  // For delete and edit message options
  function options() {
    // TODO: AKTA ALERT TYPE KI6U BANA JEI KHANE OPTION GULO ASBE
  };

  return (
    <div className='right-comp'>
      {/* Right head section */}
      <div className='chat-head'>
        <button className='menu-btn' onClick={openMenu}>
          <i className="ri-menu-line"></i>
        </button>
        <span className='user-avatar' style={{ background: avatar }}>
          {image ? <img src={image} alt='profile' /> : name.slice(0, 2)}
        </span>
        <span>
          <div className='user-name'>{name}</div>
          <div className='user-status'>Online</div>
        </span>
      </div>

      {/* Message section */}
      <div className='chat-section'>

        {/* {
          message && message.map((obj, i) => {
            return <div onClick={options} key={i} className={`msg-box ${obj.id === userId ? "msg-right" : "msg-left"}`}>{obj.msg}</div>
          })
        } */}

      </div>

        {/* The right bottom section */}
      <div className='msg-sender'>
        <textarea type='text' placeholder='Type your message here...' value={text} onChange={e => setText(e.target.value)} />

        <div className='attach' id='emojiBtn'>
          <i className="fa-regular fa-face-smile-beam" id='smilefaceEmoji'></i>
          <div id='emojiPicker' style={{ display: "none" }}>
            <EmojiPicker theme='dark' height={600} onEmojiClick={pickEmoji} />
          </div>
        </div>

        <button type="file" name="avatar" className='attach'>
          <i className="ri-attachment-line"></i>
        </button>
        <button className='btn-send' disabled={text.length <= 0 || text === ''} onClick={sendMsg} >
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/send1.svg' alt='' />
        </button>
      </div>
    </div>
  );
};

export default RightComp;