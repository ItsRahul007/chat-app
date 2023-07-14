import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./components/chat/Home";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";

function App() {
  // If user not login then navigate user to login page
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("authToken") && navigate("/Login")
  },[])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
};

export default App;
