import React from 'react';

function RightComp() {
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
        <div className='msg-box msg-left'>hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro hey whatsup bro </div>
      </div>
      <div className='msg-sender'>
        <textarea type='text' placeholder='Type your message here...' />
        <button className='attach'>
        <i class="fa-regular fa-face-smile-beam"></i>
        </button>
        <button className='attach'>
          <i className="ri-attachment-line"></i>
        </button>
        <button className='btn-send'>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/send1.svg' alt='' />
        </button>
      </div>
    </div>
  )
}

export default RightComp;