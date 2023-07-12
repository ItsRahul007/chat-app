// Left component for providing buttons like settings, profile, chat, logout etc.
import React, { useRef } from 'react';
import "./compo.css";
import { Link } from 'react-router-dom';

function LeftComp({ changeCompo, closeMenu }) {
  // Adding all Link tags inside ref
  const ref = useRef([]);

  // Changing components and also changing the colors
  function clicked(name, i){
    changeCompo(name);

    for(let elem in ref.current){
      ref.current[elem].classList.remove("clicked-button");
    };

    ref.current[i].classList.add("clicked-button");
  };


  return (
    <div className='left-comp'>
      <button className='menu-btn' onClick={closeMenu}>
        <i class="ri-close-line"></i>
      </button>
      <div className='logo'>
        <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/logo.svg' alt='logo' />
      </div>
      <div className='buttons'>
        <Link to="/" ref={el => ref.current[0] = el} className='clicked-button' onClick={() => clicked('chat', 0)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/home.svg' alt='Home' />
        </Link>

        <Link to="/" ref={el => ref.current[1] = el} onClick={() => clicked('profile', 1)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/profile1.svg' alt='Profile' />
        </Link>

        <Link to="/" ref={el => ref.current[2] = el} onClick={() => clicked('avalibleChat', 2)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/groups.svg' alt='Chats' />
        </Link>

        <Link to="/" ref={el => ref.current[3] = el} onClick={() => clicked('setting', 3)}>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/settings.svg' alt='Setting' />
        </Link>

      </div>
      <div className='log-out'>
        <button>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/logout.svg' alt='Logout' />
        </button>
      </div>
    </div>
  );
};

export default LeftComp;