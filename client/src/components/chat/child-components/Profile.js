import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Profile({chatWith}) {
  const [data, setData] = useState({ name: '', avatar: '', image: '', about: '' });
  const { name, about, avatar, image } = data;
  const [profile, setProfile] = useState(true);

  const userData = useSelector(state => state.user.userData);
  useEffect(() => {
    if (userData.data) setData(userData.data);
  }, []);

  // Changing components by macking true false and also adding and removing classes
  function changeProfile(name) {
    const myPro = document.getElementById("myPro");
    const chatPro = document.getElementById("chatPro");
    if (name === "myProfile") {
      setProfile(true);
      myPro.classList.remove('not-clicked');
      chatPro.classList.add('not-clicked');
    }
    else {
      setProfile(false);
      myPro.classList.add('not-clicked');
      chatPro.classList.remove('not-clicked');
    };
  }

  function ChatProfile() {
    return (
      <>
        {
          userData.data &&
          <div className='user-profile'>
            <span className='profile-img' style={{ background: chatWith.avatar }}>
              {chatWith.image ? <img src={chatWith.image} alt='' /> : chatWith.name.slice(0, 2)}
            </span>
            <div className='user-name'>{chatWith.name}</div>
            <div className='user-about'>{chatWith.about}</div>
          </div>
        }
      </>
    )
  }

  function MyProfile() {
    return (
      <>
        {userData.isLoading && <div>Loading...</div>}
        {userData.isFailed && <div>some internal server error occurred</div>}
        {
          userData.data &&
          <div className='user-profile'>
            <span className='profile-img' style={{ background: avatar }}>
              {image ? <img src={image} alt='' /> : name.slice(0, 2)}
            </span>
            <div className='user-name'>{name}</div>
            <div className='user-about'>{about}</div>
          </div>
        }
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
      </>
    );
  }


  return (
    <div className='profile-con'>
      <span>Profile</span>
      <div className='options'>
        <span onClick={() => changeProfile("myProfile")} id='myPro'>My profile</span>
        <span className='not-clicked' onClick={() => changeProfile("chatProfile")} id='chatPro'>Chat-with profile</span>
      </div>
      {profile ? <MyProfile /> : [chatWith ? <ChatProfile /> : <h1 style={{color: "white"}}>Please select a chat</h1>]}
    </div>
  );
};

export default Profile;