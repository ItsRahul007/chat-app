import React, { useRef, useEffect } from 'react';
import "./middle.css";
import blackSearch from "../../../../png/blackSearch.png";
import limeSearch from "../../../../png/limeSearch.png";
import { useSelector } from 'react-redux';

function AvailableChat() {
  const con = useRef(null);
  const img = useRef(null);

  const allUsersData = useSelector(state => state.user.allUsersData);

  useEffect(() => {
    // changing images on hover
    con.current.addEventListener("mouseenter", (e) => {
      img.current.src = limeSearch;
    });

    con.current.addEventListener("mouseleave", (e) => {
      img.current.src = blackSearch;
    });
  });

  return (
    <div className='chat-comp'>
      <div>Available Chat</div>
      <div ref={con} className="search">
        <img ref={img} src={blackSearch} alt='search' />
        <input type='search' placeholder='Search Chat' />
      </div>
      <div className='chat-list'>
        {allUsersData.isLoading && <div>Loading...</div>}
        {allUsersData.isFailed && <div>some internal server error occurred</div>}
        <ul>
          {allUsersData.data && allUsersData.data.map(data => {
            const { name, about, avatar, image } = data;
            return(
              <li>
                <span className='profile-img' style={{background: avatar}}>
                  {image? <img src={image} alt='profile' /> : name.slice(0, 2)}
                </span>
                <span className='name-msg'>
                  <div className='name'>{name}</div>
                  <div className='last-msg'>{about? about : "Hello there. I'm using chat-app"}</div>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AvailableChat;