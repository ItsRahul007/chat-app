import React, { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { socket } from '../socket/socketIO';
import { useSelector, useDispatch } from 'react-redux';
import Toast from '../micro-compos/Toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { deleteWholeChat } from '../../../store/slices/messageSlice';
import { blockUser, unBlockUser } from "../../../store/slices/blockSlice";
import { removeUnreadMsgAmmount } from '../../../store/slices/unreadMessage';

function getTime() {
  const date = new Date().toLocaleTimeString();
  const splitDate = date.split(" ");
  if (splitDate[0].length === 7) {
    const timestamp = splitDate[0].slice(0, 4) + splitDate[1].toLocaleLowerCase();
    return timestamp;
  }
  else {
    const timestamp = splitDate[0].slice(0, 5) + splitDate[1].toLocaleLowerCase()
    return timestamp;
  };
};

function RightComp({ openMenu, chatWith, userId, updateMessageState, updateLocalMessages, storeImage, updateLocalImages }) {

  const [text, setText] = useState(''); // For storing typed messages
  const [toastStyle, setToastStyle] = useState({ top: "-90%", value: '', disabled: false });
  const [info, setInfo] = useState({ name: '', avatar: '', image: '' });
  const { name, avatar, image } = info;
  const [open, setOpen] = useState(false); // For opening or closing the options
  const [lastSeen, setLastSeen] = useState(null);
  const { _id } = chatWith; // The id of the person that I'm chatting with
  const dispatch = useDispatch();

  // Importing the store states
  const messageStore = useSelector(state => state.messageSlice);
  const onlineId = useSelector(state => state.onlineSlice);
  const allPersons = useSelector(state => state.user.allUsersData);
  const blockSlice = useSelector(state => state.blockSlice);

  const isBlocked = blockSlice.blockedChat.includes(_id);
  const isBlockedByUser = blockSlice.blockedBy.includes(_id);

  useEffect(() => {
    const allUsers = allPersons.data;
    const user = allUsers.filter(obj => obj._id === _id);
    setInfo(user[0]);
    dispatch(removeUnreadMsgAmmount(_id)); // Deleting the id from ureadMessage slice
  }, [_id, allPersons]);

  function toggleDropDown() {
    setOpen(!open);
  };

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

  // If chatWith is not null then scrolling down the page whenever get any messages or images, and also dispatch removeUnreadMsgAmmount if the person that I'm chatting with, sends any messages
  useEffect(() => {
    function removeUnread(obj) {
      scrollBottom();
      // Deleting the id from ureadMessage slice
      if (obj.id === _id) dispatch(removeUnreadMsgAmmount(_id));
    };

    socket.on("recive-msg", removeUnread);
    socket.on("recive-image", removeUnread);
    socket.emit("get-last-seen", _id)

    return () => {
      socket.off("recive-msg", removeUnread);
      socket.off("recive-image", removeUnread);
    };
  }, [_id]);

  // Getting the last seen of user and also adding some checks
  useEffect(() => {
    socket.on("last-seen", seen => {
      // Checking if the user offline today or not
      const date = new Date();
      const time = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
      if (seen) {
        const splitTime = seen.split(" ");
        if (splitTime[0] === time) {
          setLastSeen(splitTime[1]);
        }
        else {
          setLastSeen(seen);
        };
      }
      // If we dont have the last seen of user
      else {
        setLastSeen(null);
      };
    });

    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(() => {

    const smilefaceEmoji = document.getElementById("smilefaceEmoji");
    const emojiBtn = document.getElementById("emojiBtn");
    const emojiPicker = document.getElementById("emojiPicker");

    if (emojiBtn && emojiPicker) {
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
    };

  }, []);

  // Emoji piker clicked function
  function pickEmoji(e) {
    setText(text + e.emoji);
  };

  // Sending the messages into server and adding the message in frontend
  function sendMsg() {
    const msgId = generateUniqueID();
    socket.emit('send_msg', { text, id: _id, msgId });
    const timestamp = getTime();
    updateMessageState(_id, userId, text, msgId, timestamp);
    updateLocalMessages(_id, userId, text, msgId, timestamp);
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
    const timestamp = getTime();

    const reader = new FileReader();
    reader.onload = (fileEvent) => {
      const imageData = fileEvent.target.result;

      storeImage(_id, userId, imageData, msgId, timestamp);
      updateLocalImages(_id, userId, imageData, msgId, timestamp);
      socket.emit("send-image", { id: _id, img: imageData, msgId });
    };
    reader.readAsDataURL(file);
    scrollBottom();
  };

  function block() {
    socket.emit("blocked", _id);
    dispatch(blockUser(_id));
  };

  function unblock() {
    socket.emit("unblock", _id);
    dispatch(unBlockUser(_id));
  };

  return (
    <div className='right-comp'>
      {/* For deleting or editing messages */}
      <Toast toastStyle={toastStyle} keyId={_id} setToastStyle={setToastStyle} userId={userId} />
      {/* Right head section */}
      <div className='chat-head'>
        <div>
          <button className='menu-btn' onClick={openMenu}>
            <i className="ri-menu-line"></i>
          </button>
          <span className='user-avatar' style={{ background: image ? "black" : avatar }}>
            {image ? <img src={`http://localhost:4000/images/` + image} alt='profile' /> : [name && name.slice(0, 2)]}
          </span>
          <span>
            <div className='user-name'>{name}</div>
            <div className='user-status'>
              {!(isBlocked || isBlockedByUser) && [onlineId.includes(_id) ? "Online" : [lastSeen ? lastSeen : "Offline"]]}
            </div>
          </span>
        </div>
        <div className='menu-icon' onClick={toggleDropDown}>
          <i className="ri-menu-line" style={{ opacity: open ? "0" : "100" }}></i>
          {open && (
            <div className="dropdown">
              <div className="dropdown-option" onClick={() => dispatch(deleteWholeChat(_id))}>
                Delete chat
              </div>
              {
                !isBlockedByUser &&
                <div className="dropdown-option" onClick={isBlocked ? unblock : block} >
                  {isBlocked ? 'Unblock' : 'Block'}
                </div>
              }
              <div className="dropdown-option">
                Close
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message section */}
      <div className='chat-section' id='chat-container'>

        {
          messageStore[_id] && messageStore[_id].length > 0 ? messageStore[_id].map((obj) => {
            return (
              <PhotoProvider>
                {obj.msg ?
                  <div onClick={() => options(obj)} key={obj.msgId} className={`msg-box ${obj.id === userId ? "msg-right" : "msg-left"}`}>
                    {obj.msg}
                    <span className='time'><span>{obj.timestamp}</span></span>
                  </div>
                  :
                  <PhotoView src={obj.img}>
                    <div key={obj.msgId} className={`msg-box ${obj.id === userId ? "msg-right" : "msg-left"}`} style={{ display: "flex", flexDirection: "column" }}>
                      <img src={obj.img} alt='' />
                      <span className='image-time'><span>{obj.timestamp}</span></span>
                    </div>
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
        {(isBlocked || isBlockedByUser) ?
          <div>{isBlocked ? "You blocked this chat" : "You are blocked"}</div>
          :
          <>
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
          </>
        }
      </div>
    </div>
  );
};

export default RightComp;