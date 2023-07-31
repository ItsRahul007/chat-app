import React, { useState, useRef, useEffect } from 'react';
import './home.css';
import { useSelector } from 'react-redux';
import LeftComp from "./parent-compos/LeftComp";
import MiddleComp from "./parent-compos/MiddleComp";
import RightComp from "./parent-compos/RightComp";
import Chat from './child-components/Chat';
import Profile from "./child-components/Profile";
import AvailableChat from './child-components/AvailableChat';
import Setting from './child-components/Setting';
import NoChat from './micro-compos/NoChat';
import { socket } from './socket/socketIO';

function Home() {
  const userData = useSelector(state => state.user.userData);
  const [chatWith, setChatWith] = useState(null);
  const [compo, setCompo] = useState(<Chat setChatWith={setChatWith} toggleMenu={toggleMenu} />);
  const [pixle, setPixle] = useState(0);

  // when a user loged in or open the app emiting user-online function
  if (userData.data) {
    const userId = userData.data._id;
    socket.emit('user-online', userId);
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
            <RightComp openMenu={toggleMenu} chatWith={chatWith} userId={userData.data && userData.data._id} /* if user data exist then sending user id */ />
            :
            <NoChat openMenu={toggleMenu} />
        }
      </div>
    </div>
  );
};

export default Home;