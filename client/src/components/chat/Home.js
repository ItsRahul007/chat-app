import React, { useState, useRef } from 'react';
import './home.css'
import LeftComp from "./homeComponents/LeftComp";
import MiddleComp from "./homeComponents/MiddleComp";
import RightComp from "./homeComponents/RightComp";
import Chat from './homeComponents/child-components/Chat';
import Profile from "./homeComponents/child-components/Profile";
import AvailableChat from './homeComponents/child-components/AvailableChat';
import Setting from './homeComponents/child-components/Setting';

function Home() {
  const [compo, setCompo] = useState(<Chat key={'chat'} />);
  const [pixle, setPixle] = useState(0);

  // Changing components when clicked 
  function changeCompo(name) {
    if (name === "chat") {
      setCompo(<Chat key={'chat'} />)
    }
    else if (name === "profile") {
      setCompo(<Profile key={"profile"} />)
    }
    else if (name === "avalibleChat") {
      setCompo(<AvailableChat key={'avalibleChat'} />)
    }
    else if (name === "setting") {
      setCompo(<Setting key={'setting'} />)
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
          <LeftComp changeCompo={changeCompo} closeMenu={toggleMenu} key={'leftcompo'} />
          <MiddleComp compo={compo} key={'middlecompo'} />
        </div>
        <RightComp openMenu={toggleMenu} key={'rightcompo'} />
      </div>
    </div>
  );
};
// position: "absolute", left: "0", zIndex: '100'

export default Home;