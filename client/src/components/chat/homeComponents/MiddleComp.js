// This comp for those details like settings, profile, chats persons and for availble chats
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUser, fetchAllUsers } from '../../../store/slices/userSlice';

function MiddleComp({compo}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // If auth-token exists then fetching the user else sending user to login page
  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      dispatch(fetchUser());
      dispatch(fetchAllUsers());
    }
    else navigate('/login');
  },[]);
  
  return (
    <div className='mid-comp'>
      {compo}
    </div>
  );
};

export default MiddleComp;