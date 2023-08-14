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
import { dltMessage, setImage, setMessage, updateMessage } from '../../store/slices/messageSlice';
import { pushOnlineId, removeOnlineId } from '../../store/slices/onlineSlice';
import { fetchAllUsers } from '../../store/slices/userSlice';

function Home() {
  // The store state variables
  const userData = useSelector(state => state.user.userData);

  const [chatWith, setChatWith] = useState(null);
  const [compo, setCompo] = useState(<Chat setChatWith={setChatWith} toggleMenu={toggleMenu} />);
  const [pixle, setPixle] = useState(0);
  const dispatch = useDispatch();

  // when a user loged in or open the app emiting user-online function
  useEffect(() => {
    if (userData.data) {
      const userId = userData.data._id;
      socket.emit('user-online', userId);
      localStorage.setItem("userId", userId);
    };
  }, [userData.data]);

  // Updating the message state
  function updateMessageState(keyId, id, msg, msgId) {
    // Setting and storing the messages in redux state
    dispatch(setMessage({ keyId, id, msg, msgId }));
  };

  // Updating the message state but with images
  function storeImage(keyId, id, img, msgId){
    dispatch(setImage({ keyId, id, img, msgId }));
  };

  // Storing the messages in local storage and also updating them
  function updateLocalMessages(keyId, id, msg, msgId) {
    const userId = localStorage.getItem("userId");
    // Storing the messages in local storage
    if (userId) {
      const localItem = localStorage.getItem(userId);
      if (localItem) {
        const parsedItem = JSON.parse(localItem);
        parsedItem[keyId] = [...(parsedItem[keyId] || []), { id, msg, msgId }];
        localStorage.setItem(userId, JSON.stringify(parsedItem));
      }
      else {
        const obj = {};
        obj[keyId] = [{ id, msg, msgId }];
        localStorage.setItem(userId, JSON.stringify(obj));
      };
    };
  };

  // Storing the images in local storage with messages
  function updateLocalImages(keyId, id, img, msgId) {
    const userId = localStorage.getItem("userId");
    // Storing the messages in local storage
    if (userId) {
      const localItem = localStorage.getItem(userId);
      if (localItem) {
        const parsedItem = JSON.parse(localItem);
        parsedItem[keyId] = [...(parsedItem[keyId] || []), { id, img, msgId }];
        localStorage.setItem(userId, JSON.stringify(parsedItem));
      }
      else {
        const obj = {};
        obj[keyId] = [{ id, img, msgId }];
        localStorage.setItem(userId, JSON.stringify(obj));
      };
    };
  };

  useEffect(() => {
    // When user will be online
    socket.on("new-user-online", id => {
      dispatch(pushOnlineId(id));
    });

    // Storing the already onlined user's id
    socket.on("get-online-id", arr => {
      for (let i = 0; i < arr.length; i++) {
        const id = arr[i];
        dispatch(pushOnlineId(id));
      }
    });

    // When user will be offline
    socket.on("user-offline", id => {
      dispatch(removeOnlineId(id));
    });

    // Receving the sended message and adding the message in the frontend
    socket.on("recive-msg", obj => {
      updateMessageState(obj.id, obj.id, obj.msg, obj.msgId);
      updateLocalMessages(obj.id, obj.id, obj.msg, obj.msgId);
    });

    // Reciving the undelivered messages
    socket.on("get-unsend-msg", msg => {
      // Maping through the msg array and emiting "recived-msg" function for deleting recived messages
      msg.map(obj => {
        if(obj.message){
          // Setting the messages
          updateMessageState(obj.senderId, obj.senderId, obj.message, obj.msgId);
          updateLocalMessages(obj.senderId, obj.senderId, obj.message, obj.msgId);
        }
        else if(obj.image){
          // Setting the images
          storeImage(obj.senderId, obj.senderId, obj.image, obj.msgId);
          updateLocalImages(obj.senderId, obj.senderId, obj.image, obj.msgId);
        }

        return socket.emit("recived-unsend-msg", obj._id);
      });
    });

    // When someone update smething on his profile then re-fetching all users
    socket.on("user-update-server", () => {
      dispatch(fetchAllUsers());
    });

    // If user have some message to be deleted then getting them and also emiting a function to delete those messages from db
    socket.on("delete-msg-db", arr => {
      arr.map(obj => {
        const { senderId, msgId } = obj;
        dispatch(dltMessage({ keyId: senderId, msgId }));
        return socket.emit("recived-deleted-msg", obj._id);
      });
    });

    // If user have some message to be updated then getting them and also emiting a function to delete those messages from db
    socket.on("update-msg-db", arr => {
      arr.map(obj => {
        const { senderId, msgId, newContent } = obj;
        dispatch(updateMessage({ keyId: senderId, msgId, newContent }));
        return socket.emit("recived-update-msg", obj._id);
      });
    });

    // If user online and someone update some message
    socket.on("update-msg-server", obj => {
      const { senderId, msgId, newContent } = obj;
      dispatch(updateMessage({ keyId: senderId, msgId, newContent }));
    });

    // If user online and someone delete some message
    socket.on("delete-msg-server", obj => {
      const { senderId, msgId } = obj;
      dispatch(dltMessage({ keyId: senderId, msgId }));
    });

    socket.on("recive-image", obj => {
      const {id, img, msgId} = obj;
      storeImage(id, id, img, msgId);
      updateLocalImages(id, id, img, msgId);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Changing components when clicked and sending propertis to components
  function changeCompo(name) {
    if (name === "chat") {
      setCompo(<Chat setChatWith={setChatWith} toggleMenu={toggleMenu} />);
    }
    else if (name === "profile") {
      setCompo(<Profile chatWith={chatWith} />)
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

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const localItem = localStorage.getItem(userId);
      const messageObject = JSON.parse(localItem);
      // Looping through the keys and getting the messageObject
      if (messageObject) {
        const keyArray = Object.keys(messageObject);
        for (let i = 0; i < keyArray.length; i++) {
          const keyId = keyArray[i];

          // Maping the message object and storing the messages in state
          messageObject[keyId].map(obj => {
            if(obj.msg){
              const { id, msg, msgId } = obj;
              return updateMessageState(keyId, id, msg, msgId);
            }
            else if(obj.img){
              const { id, img, msgId } = obj;
              return storeImage(keyId, id, img, msgId);
            }
          });
        };
      }
    };
  }, []);

  return (
    <div className='home-con'>
      <div>
        <div ref={menuCompo} className='two-compo'>
          <LeftComp changeCompo={changeCompo} closeMenu={toggleMenu} />
          <MiddleComp compo={compo} />
        </div>
        {
          chatWith ? // If user select a chat then displaying Right component with chat otherwise showing NoChat component
            <RightComp openMenu={toggleMenu} chatWith={chatWith} userId={userData.data && userData.data._id} /* if user data exist then sending user id */ updateMessageState={updateMessageState} updateLocalMessages={updateLocalMessages} storeImage={storeImage} updateLocalImages={updateLocalImages} />
            :
            <NoChat openMenu={toggleMenu} />
        }
      </div>
    </div>
  );
};

export default Home;