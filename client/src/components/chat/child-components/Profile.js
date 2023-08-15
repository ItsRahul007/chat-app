import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
  }, []);

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
      <>
        {
          userData.data &&
          <div className='user-profile'>
            <span className='profile-img' style={{ background: chatWithProfile.avatar }}>
              {chatWithProfile.image ? <img src={chatWithProfile.image} alt='' /> : chatWithProfile.name.slice(0, 2)}
            </span>
            <div className='user-status'>{onlineId.includes(chatWith._id) ? "Online" : "Offline"}</div>
            <div className='user-name'>{chatWithProfile.name}</div>
            <div className='user-about'>{chatWithProfile.about}</div>
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
            {
              mediaPictures ? mediaPictures.map((url, i) => {
                return <img src={url.img} alt='' key={i} />
              })
                :
                <h4 style={{ color: "white", marginLeft: "130px", width: "100%" }}>No Images</h4>
            }
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
      {profile ? <MyProfile /> : [chatWith ? <ChatProfile /> : <h1 style={{ color: "white" }}>Please select a chat</h1>]}
    </div>
  );
};

export default Profile;