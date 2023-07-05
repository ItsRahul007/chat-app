import React from 'react';
import LeftComp from "./homeComponents/LeftComp"
import MiddleComp from "./homeComponents/MiddleComp"
import RightComp from "./homeComponents/RightComp"

function Home() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", background: "black" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "97vh", width: "97vw", borderRadius: "20px", overflow: "hidden"}}>
        <LeftComp />
        <MiddleComp />
        <RightComp />
      </div>
    </div>
  );
};

export default Home;