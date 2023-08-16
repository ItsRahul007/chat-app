import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../../store/slices/userSlice';
import Collaps from '../micro-compos/Collaps';
import { socket } from '../socket/socketIO';
import CropImage from '../micro-compos/CropImage';

function Setting() {
  const [user, setUser] = useState({ name: '', about: '', email: '', avatar: '', image: '' });
  const { name, about, email, avatar, image } = user;
  const [display, setDisplay] = useState("none");

  const dispatch = useDispatch();
  const userData = useSelector(state => state.user.userData);

  useEffect(() => {
    setUser(userData.data)
  }, [userData.data]);

  function onUserChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Updating user and after that dispatching fetchUser and fetchAllUsers
  async function updateUser() {
    const genMsg = document.getElementById('gen-msg');
    // If datas then storing it in obj and sending them in responce
    let obj = {};
    obj.id = user._id;
    if (name !== userData.data.name) obj.name = name;
    if (avatar !== userData.data.avatar) obj.avatar = avatar;
    if (image !== userData.data.image) obj.image = image;
    if (about !== userData.data.about) obj.about = about;

    const responce = await fetch('http://localhost:4000/auth/updateuser', {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        'auth-token': localStorage.getItem('authToken')
      },
      body: JSON.stringify(obj)
    });

    const data = await responce.json();

    // If error then sending message
    if (data.errors) {
      genMsg.classList.add('failed');
      genMsg.innerText = data.errors;
      return setTimeout(() => {
        genMsg.innerText = '';
        genMsg.classList.remove('failed');
      }, 3000);
    };

    dispatch(fetchUser());
    socket.emit("user-update-client", obj); // Emiting the updates
    
    // If success then sending message
    genMsg.classList.add('success');
    genMsg.innerText = "Changed success fully";
    setTimeout(() => {
      genMsg.innerText = '';
      genMsg.classList.remove('success');
    }, 3000);
  };

  return (
    <div className='setting-comp'>
      <div>Settings</div>
      <CropImage display={display} setDisplay={setDisplay} user={user} setUser={setUser} />
      <span className='collap-compo'>
        <ul className='collaps'>
          <Collaps name={name} about={about} email={email} avatar={avatar} image={image} onUserChange={onUserChange} setUser={setUser} user={user} dispatch={dispatch} setDisplay={setDisplay} />
        </ul>
      </span>
      <button className='setting-btn' onClick={updateUser}>Save Changes</button>
    </div >
  );
};

export default Setting;