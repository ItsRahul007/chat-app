import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { socket } from '../socket/socketIO';
import { chatList } from '../../../store/slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';

function RightComp({ openMenu, chatWith, userId, updateMessageState }) {
  const { name, avatar, image, _id } = chatWith;
  const [text, setText] = useState(''); // For storing typed messages
  const bottom_msg = useRef(null);
  const dispatch = useDispatch();

  // Importing the store states
  const chatId = useSelector(state => state.chatId);
  const messageStore = useSelector(state => state.messageSlice);

  //For scrolled to the bottom message
  function scrollBottom() {
    bottom_msg.current && bottom_msg.current.scrollIntoView({ behavior: "smooth" });
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

  // Sending the messages into server and adding the message in frontend
  function sendMsg() {
    socket.emit('send_msg', { text, id: _id });
    updateMessageState(_id, userId, text);
    setText('');

    // Checking if the id already stored or not
    if (!chatId.includes(_id)) dispatch(chatList(_id));
    scrollBottom();
  };


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

        {
          messageStore[_id] ? messageStore[_id].map((obj, i) => {
            return (
              <div onClick={options} key={i} ref={bottom_msg} className={`msg-box ${obj.id === userId ? "msg-right" : "msg-left"}`}>
                {obj.msg}
              </div>
            )
          })
            :
            <h1>No chats</h1>
        }

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