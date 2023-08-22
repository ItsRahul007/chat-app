import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import Home from "./components/chat/Home";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Alert from "./components/alert/Alert";
import { fetchUser, fetchAllUsers } from './store/slices/userSlice';
import CropImage from "./components/chat/micro-compos/CropImage";

function App() {
  const dispatch = useDispatch();

  const data = useSelector(state => {
    return state.alert;
  });

  // If auth-token exists then fetching the user and sending to home page else sending user to login page
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      dispatch(fetchUser());
      dispatch(fetchAllUsers());
      navigate('/');
    }
    else navigate('/login');
  }, []);

  function loginToDispatch() {
    dispatch(fetchUser());
    dispatch(fetchAllUsers());
  };
  return (
    <>
      <Alert errors={data[0]} />
      <Routes style>
        <Route path="/" element={<Home />} />
        <Route path="/crop" element={<CropImage />} />
        <Route path="/login" element={<Login callApi={loginToDispatch} />} />
        <Route path="/signup" element={<Signup callApi={loginToDispatch} />} />
      </Routes>
    </>
  );
};

export default App;