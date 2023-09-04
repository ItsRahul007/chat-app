import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

function Profile({ chatWith }) {
  const [data, setData] = useState({ name: '', avatar: '', image: '', about: '' });
  const { name, about, avatar, image } = data;
  const [profile, setProfile] = useState(true);
  const [chatWithProfile, setChatWithProfile] = useState({ name: '', avatar: '', about: '', image: '' });

  const userData = useSelector(state => state.user.userData);
  const allPersons = useSelector(state => state.user.allUsersData);
  const onlineId = useSelector(state => state.onlineSlice);

  useEffect(() => {
    if (userData.data) setData(userData.data);
  }, [userData.data]);

  useEffect(() => {
    if (chatWith) {
      const allUsers = allPersons.data;
      const user = allUsers.filter(obj => obj._id === chatWith._id);
      setChatWithProfile(user[0]);
    };
  }, [chatWith, allPersons]);

  const mediaPictures = useSelector(state => state.mediaSlice);

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
      <PhotoProvider>
        {
          userData.data &&
          <div className='user-profile'>
            <span className='profile-img chat-avatar' style={{ background: chatWithProfile.avatar, fontSize: "41px" }}>
              {chatWithProfile.image ?
                <PhotoView src={`http://localhost:4000/images/` + chatWithProfile.image} >
                  <img src={`http://localhost:4000/images/` + chatWithProfile.image} alt='' />
                </PhotoView>
                : chatWithProfile.name.slice(0, 2)}
            </span>
            <div className='user-status'>{onlineId.includes(chatWith._id) ? "Online" : "Offline"}</div>
            <div className='user-name'>{chatWithProfile.name}</div>
            <div className='user-about'>{chatWithProfile.about}</div>
          </div>
        }
      </PhotoProvider>
    );
  };

  function MyProfile() {
    return (
      <PhotoProvider>
        {userData.isLoading && <div>Loading...</div>}
        {userData.isFailed && <div>some internal server error occurred</div>}
        {
          userData.data &&
          <div className='user-profile'>
            <span className='profile-img chat-avatar' style={{ background: avatar }}>
              {
                image ?
                  <PhotoView src={`http://localhost:4000/images/` + image}>
                    <img src={`http://localhost:4000/images/` + image} alt='' />
                  </PhotoView>
                  : name.slice(0, 2)
              }
            </span>
            <div className='user-name'>{name}</div>
            <div className='user-about'>{about}</div>
          </div>
        }
        <div className='user-media'>
          <span>MEDIA</span>
          <div>
            {
              mediaPictures ? mediaPictures.map((url, i) => (
                <PhotoView src={url.img} key={i} >
                  <img src={url.img} alt='' style={{ objectFit: 'cover' }} />
                </PhotoView>
              ))
                :
                <h4 style={{ color: "white", marginLeft: "130px", width: "100%" }}>No Images</h4>
            }
          </div>
        </div>
      </PhotoProvider>
    );
  };

  return (
    <div className='profile-con'>
      <span>Profile</span>
      <div className='options'>
        <span onClick={() => changeProfile("myProfile")} id='myPro'>My profile</span>
        <span className='not-clicked' onClick={() => changeProfile("chatProfile")} id='chatPro'>Chat-with profile</span>
      </div>
      {profile ? <MyProfile /> : [chatWith ? <ChatProfile /> : <h1 style={{ color: "white" }}>Please select a chat</h1>]}
    </div>
  );
};

export default Profile;