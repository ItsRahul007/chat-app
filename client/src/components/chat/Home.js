import React from 'react';
import LeftComp from "./LeftComp"
import MiddleComp from "./MiddleComp"
import RightComp from "./RightComp"

function Home() {
  return (
    <div style={{display: "flex", minHeight: "100vh", minWidth: "100vw"}}>
        <LeftComp/>
        <MiddleComp/>
        <RightComp/>
    </div>
  );
};

export default Home;