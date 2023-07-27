import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useSelector } from 'react-redux';
import { socket } from '../socket/socketIO';

function RightComp({ openMenu, chatWith }) {
  const userData = useSelector(state => state.user.userData);
  const userId = userData.data._id;
  const [text, setText] = useState(''); // For storing typed messages
  const [message, setMessage] = useState([  // For storing the sending and reciving messages
    {
      id: chatWith._id,
      msg: "Hello brother"
    },
    {
      id: userId,
      msg: "kaise ho vai"
    }
  ]);
  const { name, avatar, image, _id } = chatWith;

  const emoji_btn = useRef(null);
  const smile_face = useRef(null);
  const emoji_piker = useRef(null);
  const bottom_msg = useRef(null);

  //For scrolled to message bottom section
  function scrollBottom() {
    bottom_msg.current && bottom_msg.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {

    // When hover on emoji emoji piker will visible
    emoji_piker.current.style.display = "none";
    emoji_btn.current.addEventListener("mouseenter", () => {
      smile_face.current.style.display = "none";
      emoji_piker.current.style.display = "block";

    });

    // When mouse leave emoji piker would vanised
    emoji_btn.current.addEventListener("mouseleave", () => {
      smile_face.current.style.display = "block";
      emoji_piker.current.style.display = "none";
    });

    scrollBottom();
  }, []);

  // Emoji piker clicked function
  function pickEmoji(e) {
    setText(text + e.emoji);
  };

  function appendChild(msg, position){
    let chatCon = document.querySelector(".chat-section");
    let child = document.createElement('div')
    child.classList.add(`msg-box`)
    child.classList.add(`msg-${position}`)
    child.onClick = options();
    child.innerText = msg;
    child.ref = bottom_msg;
    chatCon.appendChild(child);
  }

  // For sending messages
  function sendMsg() {
    socket.emit('send_msg', { text, id: _id });
    appendChild(text, "right");
    setText('');
  };

  // For resiving emitied functions on the server
  useEffect(() => {
    socket.on("recive-msg", (obj) => {
      appendChild(obj.msg, "left");
    });
  });

  // For delete and edit message options
  function options() {
    // TODO: AKTA ALERT TYPE KI6U BANA JEI KHANE OPTION GULO ASBE
  };

  return (
    <div className='right-comp'>
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
      <div className='chat-section'>

        {
          message && message.map((obj, i) => {
            return <div onClick={options} key={i} className={`msg-box ${obj.id === userId ? "msg-right" : "msg-left"}`}>{obj.msg}</div>
          })
        }

      </div>

      <div className='msg-sender'>
        <textarea type='text' placeholder='Type your message here...' value={text} onChange={e => setText(e.target.value)} />

        <div className='attach' ref={emoji_btn}>
          <i className="fa-regular fa-face-smile-beam" ref={smile_face}></i>
          <div ref={emoji_piker} style={{ display: "none" }}>
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