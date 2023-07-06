import React, { useState } from 'react';
import LeftComp from "./homeComponents/LeftComp";
import MiddleComp from "./homeComponents/MiddleComp";
import RightComp from "./homeComponents/RightComp";
import Chat from './homeComponents/middle-components/Chat';
import Profile from "./homeComponents/middle-components/Profile";
import AvailableChat from './homeComponents/middle-components/AvailableChat'
import Setting from './homeComponents/middle-components/Setting'

function Home() {
  const [compo, setCompo] = useState(<Chat/>);

  // Changing components when clicked 
  function changeCompo(name){
    if(name === "chat"){
      setCompo(<Chat/>)
    }
    else if(name === "profile"){
      setCompo(<Profile/>)
    }
    else if(name === "avalibleChat"){
      setCompo(<AvailableChat/>)
    }
    else if(name === "setting"){
      setCompo(<Setting/>)
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", background: "black" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "97vh", width: "97vw", borderRadius: "20px", overflow: "hidden"}}>
        <LeftComp changeCompo={changeCompo} />
        <MiddleComp compo={compo}/>
        <RightComp />
      </div>
    </div>
  );
};

export default Home;