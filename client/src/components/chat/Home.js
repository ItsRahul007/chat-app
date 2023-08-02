import React, { useState, useRef, useEffect } from 'react';
import './home.css';
import { useSelector, useDispatch } from 'react-redux';
import LeftComp from "./parent-compos/LeftComp";
import MiddleComp from "./parent-compos/MiddleComp";
import RightComp from "./parent-compos/RightComp";
import Chat from './child-components/Chat';
import Profile from "./child-components/Profile";
import AvailableChat from './child-components/AvailableChat';
import Setting from './child-components/Setting';
import NoChat from './micro-compos/NoChat';
import { socket } from './socket/socketIO';
import { setNewMessage, saveMessage } from '../../store/slices/messageSlice';
import { chatList } from '../../store/slices/chatSlice';

function Home() {
  // The store state variables
  const userData = useSelector(state => state.user.userData);
  const messageStore = useSelector(state => state.messageSlice);
  const chatId = useSelector(state => state.chatId);

  const [chatWith, setChatWith] = useState(null);
  const [compo, setCompo] = useState(<Chat setChatWith={setChatWith} toggleMenu={toggleMenu} />);
  const [pixle, setPixle] = useState(0);
  const dispatch = useDispatch();

  // when a user loged in or open the app emiting user-online function
  if (userData.data) {
    const userId = userData.data._id;
    socket.emit('user-online', userId);
  };

  // Updating the message state and also storing the messages
  function updateMessageState(keyId, id, msg) {
    // Setting and storing the messages in redux state
    dispatch(setNewMessage({ keyId, id, msg }));

    // Storing the messages in local storage
    if (userData.data) {
      const localItem = localStorage.getItem(userData.data._id);
      if (localItem) {
        const parsedItem = JSON.parse(localItem);
        parsedItem[keyId] = [...(parsedItem[keyId] || []), {id, msg}];
        localStorage.setItem(userData.data._id, JSON.stringify(parsedItem));
      }
      else {
        const obj = {};
        obj[keyId] = [{id, msg}];
        localStorage.setItem(userData.data._id, JSON.stringify(obj));
      };
    };
  };

  useEffect(() => {
    // When user will be online
    socket.on("new-user-online", id => {
      console.log(id + " is online");
    });

    // When user will be offline
    socket.on("user-offline", id => {
      console.log(id + " is offline");
    });

    // Receving the sended message and adding the message in the frontend
    socket.on("recive-msg", (obj) => {
      updateMessageState(obj.id, obj.id, obj.msg);

      // Checking if the id already stored or not
      if (!chatId.includes(obj.id)) dispatch(chatList(obj.id));
    });

    // Reciving the undelivered messages
    socket.on("get-unsend-msg", msg => {
      // Maping through the msg array and emiting "recived-msg" function for deleting recived messages
      msg.map(obj => {
        // Setting the messages
        updateMessageState(obj.senderId, obj.senderId, obj.message);

        // Checking if the id already stored or not
        if (!chatId.includes(obj.senderId)) dispatch(chatList(obj.senderId));
        return socket.emit("recived-unsend-msg", obj._id);
      });
    });

  }, [socket]);

  // Changing components when clicked and sending propertis to components
  function changeCompo(name) {
    if (name === "chat") {
      setCompo(<Chat setChatWith={setChatWith} toggleMenu={toggleMenu} />);
    }
    else if (name === "profile") {
      setCompo(<Profile />)
    }
    else if (name === "avalibleChat") {
      setCompo(<AvailableChat setChatWith={setChatWith} toggleMenu={toggleMenu} />)
    }
    else if (name === "setting") {
      setCompo(<Setting />)
    }
  };

  // toggling menu
  const menuCompo = useRef(null)
  function toggleMenu() {
    if (pixle === 0) {
      menuCompo.current.style.left = pixle + "px";
      setPixle(-500)
    }
    else {
      menuCompo.current.style.left = pixle + "px";
      setPixle(0)
    }
  };

  return (
    <div className='home-con'>
      <div>
        <div ref={menuCompo} className='two-compo'>
          <LeftComp changeCompo={changeCompo} closeMenu={toggleMenu} />
          <MiddleComp compo={compo} />
        </div>
        {
          chatWith ? // If user select a chat then displaying Right component with chat otherwise showing NoChat component
            <RightComp openMenu={toggleMenu} chatWith={chatWith} userId={userData.data && userData.data._id} /* if user data exist then sending user id */ updateMessageState={updateMessageState} />
            :
            <NoChat openMenu={toggleMenu} />
        }
      </div>
    </div>
  );
};

export default Home;