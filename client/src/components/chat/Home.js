import React from 'react';
import LeftComp from "./homeComponents/LeftComp"
import MiddleComp from "./homeComponents/MiddleComp"
import RightComp from "./homeComponents/RightComp"

function Home() {
  return (
    <div style={{ display: "flex", maxHeight: "100vh", maxWidth: "100vw" }}>
      <LeftComp />
      <MiddleComp />
      <RightComp />
    </div>
  );
};

export default Home;