// Left component for providing buttons like settings, profile, chat, logout etc.
import React from 'react';
import "./compo.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function LeftComp({ changeCompo, closeMenu }) {
  const navigate = useNavigate();

  // Changing components and also changing the colors
  function clicked(e, name, i){
    e.preventDefault();
    changeCompo(name);
    let buttons = document.querySelector(".buttons").childNodes;

    for(let index = 0; index !== buttons.length; index++){
      buttons[index].classList.remove("clicked-button");
    };

    buttons[i].classList.add("clicked-button");
  };

  function logoutFun(){
    localStorage.removeItem("authToken");
    navigate('/login');
  }

  return (
    <div className='left-comp'>
      <button className='menu-btn' onClick={closeMenu}>
        <i className="ri-close-line"></i>
      </button>
      <div className='logo'>
        <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/logo.svg' alt='logo' />
      </div>
      <div className='buttons'>
        <Link to="/" className='clicked-button' onClick={(e) => clicked(e,'chat', 0)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/home.svg' alt='Home' />
        </Link>

        <Link to="/" onClick={(e) => clicked(e,'profile', 1)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/profile1.svg' alt='Profile' />
        </Link>

        <Link to="/" onClick={(e) => clicked(e,'avalibleChat', 2)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/groups.svg' alt='Chats' />
        </Link>

        <Link to="/" onClick={(e) => clicked(e,'setting', 3)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/settings.svg' alt='Setting' />
        </Link>

      </div>
      <div className='log-out'>
        <button onClick={logoutFun}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/logout.svg' alt='Logout' />
        </button>
      </div>
    </div>
  );
};

export default LeftComp;