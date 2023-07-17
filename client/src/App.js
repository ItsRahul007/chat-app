import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "./components/chat/Home";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Alert from "./components/alert/Alert";

function App() {
  const data = useSelector(state => {
    return state.alert;
  });

  // If user not login then navigate user to login page
  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem("authToken")? navigate("/login") : navigate('/')
  },[]);

  return (
    <>
      <Alert errors={data[0]}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </>
  );
};

export default App;
