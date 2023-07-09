import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

function RightComp() {
  const [message, setMessage] = useState('');

  const emoji_btn = useRef(null);
  const smile_face = useRef(null);
  const emoji_piker = useRef(null);

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
  });

  // Emoji piker clicked function
  function pickEmoji(e){
    setMessage(message + e.emoji);
  };


  return (
    <div className='right-comp'>
      <div className='chat-head'>
        <span className='user-avatar'>
          <img src='https://media.istockphoto.com/id/1294339577/photo/young-beautiful-woman.jpg?s=612x612&w=0&k=20&c=v41m_jNzYXQtxrr8lZ9dE8hH3CGWh6HqpieWkdaMAAM=' alt='profile' />
        </span>
        <span>
          <div className='user-name'>Rahul Ghosh</div>
          <div className='user-status'>Online</div>
        </span>
      </div>
      <div className='chat-section'>

        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup</div>
        <div className='msg-box msg-right'>fine! what about you man?</div>
        <div className='msg-box msg-left'>hey whatsup bro</div>

        <div className='msg-box msg-left'>
          <span className='options'>
            <button>Edit</button>
            <button>Delete for me</button>
            <button>Delete for everyone</button>
          </span>
          hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro 
        </div>
      </div>

      <div className='msg-sender'>
        <textarea type='text' placeholder='Type your message here...' value={message} onChange={e => setMessage(e.target.value)} />

        <div className='attach' ref={emoji_btn}>
          <i className="fa-regular fa-face-smile-beam" ref={smile_face}></i>
          <div ref={emoji_piker} style={{display: "none"}}>
            <EmojiPicker theme='dark' height={600} onEmojiClick={pickEmoji}/>
          </div>
        </div>

        <button className='attach'>
          <i className="ri-attachment-line"></i>
        </button>
        <button className='btn-send'>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/send1.svg' alt='' />
        </button>
      </div>
    </div>
  );
};

export default RightComp;