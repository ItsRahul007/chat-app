import React from 'react';
import kankana from "./kankana.jpg";
import { useDispatch } from 'react-redux';
import { showAlert, removeAlert } from '../../../../store/slices/alertSlice';

function Profile() {
  const dispatch = useDispatch();

  // For allert
  function alert(msg) {
    dispatch(showAlert(msg));
    setTimeout(() => {
      dispatch(removeAlert());
    }, 3500);
  };

  //Fetching the user
  const userData = async ()=>{
    const data = await fetch('http://localhost:4000/auth/getuser', {
      headers:{
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('authToken')
      }
    });

    const parsedData = await data.json();
    return parsedData;
  };
  
  if(userData.errors) return alert(userData.errors);
  console.log(userData)
  const {name, about, avatar, image} = userData;

  return (
    <div className='profile-con'>
      <span>Profile</span>
      <div className='user-profile'>
        <span className='profile-img' style={{background: avatar}}>
          {image && <img src={kankana} alt='' />}
        </span>
        <div className='user-name'>{name}</div>
        <div className='user-about'>{about}</div>
      </div>
      <div className='user-media'>
        <span>MEDIA</span>
        <div>
          <img src='https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg' alt='' />
          <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          <img src='https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg' alt='' />
          <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          <img src='https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg' alt='' />
          <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          <img src='https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg' alt='' />
          <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' alt='' />
          <img src='https://imgv3.fotor.com/images/cover-photo-image/a-beautiful-girl-with-gray-hair-and-lucxy-neckless-generated-by-Fotor-AI.jpg' alt='' />
          <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' alt='' />
        </div>
      </div>
    </div>
  );
};

export default Profile;