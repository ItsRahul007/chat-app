import React, { useState, useRef } from 'react';
import './home.css'
import LeftComp from "./homeComponents/LeftComp";
import MiddleComp from "./homeComponents/MiddleComp";
import RightComp from "./homeComponents/RightComp";
import Chat from './homeComponents/middle-components/Chat';
import Profile from "./homeComponents/middle-components/Profile";
import AvailableChat from './homeComponents/middle-components/AvailableChat';
import Setting from './homeComponents/middle-components/Setting';

function Home() {
  const [compo, setCompo] = useState(<Chat />);
  const [pixle, setPixle] = useState(0);

  // Changing components when clicked 
  function changeCompo(name) {
    if (name === "chat") {
      setCompo(<Chat />)
    }
    else if (name === "profile") {
      setCompo(<Profile />)
    }
    else if (name === "avalibleChat") {
      setCompo(<AvailableChat />)
    }
    else if (name === "setting") {
      setCompo(<Setting />)
    }
  };

  // toggling menu
  const twoCompo = useRef(null)
  function toggleMenu() {
    if (pixle === 0) {
      twoCompo.current.style.left = pixle + "px";
      setPixle(-500)
    }
    else {
      twoCompo.current.style.left = pixle + "px";
      setPixle(0)
    }
  };

  return (
    <div className='home-con'>
      <div>
        <div ref={twoCompo} className='two-compo'>
          <LeftComp changeCompo={changeCompo} closeMenu={toggleMenu} />
          <MiddleComp compo={compo} />
        </div>
        <RightComp openMenu={toggleMenu} />
      </div>
    </div>
  );
};
// position: "absolute", left: "0", zIndex: '100'

export default Home;