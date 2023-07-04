// Left component for providing buttons like settings, profile, chat, logout
import React from 'react';
import "./compo.css";
import { Link } from 'react-router-dom';

function LeftComp() {
  return (
    <div className='left-comp'>
      <div className='logo'>
        <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/logo.svg' alt='logo'/>
      </div>
      <div className='buttons'>
        <Link to="/">
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/home.svg' alt='Home'/>
        </Link>
        <Link to="/">
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/profile1.svg' alt='Profile'/>
        </Link>
        <Link to="/">
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/groups.svg' alt='Chats'/>
        </Link>
        <Link to="/">
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/settings.svg' alt='Setting'/>
        </Link>
      </div>
      <div className='log-out'>
        <button>
          <img src='https://www.kodingwife.com/demos/ichat/dark-version/img/logout.svg' alt='Logout'/>
        </button>
      </div>
    </div>
  );
};

export default LeftComp;