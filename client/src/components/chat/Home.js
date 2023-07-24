import React, { useState, useRef } from 'react';
import './home.css'
import LeftComp from "./parent-compos/LeftComp";
import MiddleComp from "./parent-compos/MiddleComp";
import RightComp from "./parent-compos/RightComp";
import Chat from './child-components/Chat';
import Profile from "./child-components/Profile";
import AvailableChat from './child-components/AvailableChat';
import Setting from './child-components/Setting';
import NoChat from './micro-compos/NoChat';

function Home() {
  const [compo, setCompo] = useState(<Chat key={'chat'} />);
  const [pixle, setPixle] = useState(0);
  const [chatWith, setChatWith] = useState(null);

  // Changing components when clicked and sending propertis to components
  function changeCompo(name) {
    if (name === "chat") {
      setCompo(<Chat key={'chat'} setChatWith={setChatWith} />);
    }
    else if (name === "profile") {
      setCompo(<Profile key={"profile"} />)
    }
    else if (name === "avalibleChat") {
      setCompo(<AvailableChat key={'avalibleChat'} setChatWith={setChatWith} />)
    }
    else if (name === "setting") {
      setCompo(<Setting key={'setting'} />)
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
        {chatWith? <RightComp openMenu={toggleMenu} chatWith={chatWith} /> : <NoChat openMenu={toggleMenu}/>}
      </div>
    </div>
  );
};

export default Home;