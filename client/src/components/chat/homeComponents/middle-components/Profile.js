import React from 'react';
import myImage from "./myImage2-min.jpg";
import kankana from "./kankana.jpg";

function Profile() {
  return (
    <div className='profile-con'>
      <span>Profile</span>
      <div className='user-profile'>
        <span className='profile-img' style={{ background: "red" }}>
          <img src={kankana} alt='' />
        </span>
        <div className='user-name'>Kankana Mondal</div>
        <div className='user-about'>Hello there. I'm using chat-app</div>
      </div>
    </div>
  );
};

export default Profile;