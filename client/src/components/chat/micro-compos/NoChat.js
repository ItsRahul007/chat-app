import React from 'react';
import "./noChat.css";

function NoChat({openMenu}) {
  return (
    <div className='right-comp no-chat'>
        <div>
            <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/empty-chat-display.svg' alt=''/>
            <p>Please select a chat to start messaging.</p>
            <button onClick={openMenu}>Lets chat</button>
        </div>
    </div>
  )
}

export default NoChat;