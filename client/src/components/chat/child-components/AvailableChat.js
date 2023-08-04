import React, { useRef, useEffect, useState } from 'react';
import "./middle.css";
import blackSearch from "../../../png/blackSearch.png";
import limeSearch from "../../../png/limeSearch.png";
import { useSelector } from 'react-redux';
import removeUser from '../micro-compos/removeUser';

function AvailableChat({ setChatWith, toggleMenu }) {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState([]);
  const con = useRef(null);
  const img = useRef(null);

  const allUsersData = useSelector(state => state.user.allUsersData);
  const userData = useSelector(state => state.user.userData);


  // changing images on hover
  useEffect(() => {
    con.current.addEventListener("mouseenter", (e) => {
      img.current.src = limeSearch;
    });

    con.current.addEventListener("mouseleave", (e) => {
      img.current.src = blackSearch;
    });
  }, []);

  // Filtering the user from the all user datas and storing it in data state
  useEffect(() => {
    const splice = removeUser(allUsersData.data, userData.data._id);
    setData(splice);
  }, [allUsersData.data, userData.data]);

  // Toggling the menu and setting the righ-comp data 
  function clickedChat(data) {
    toggleMenu();
    setChatWith(data);
  };

  //
  function SearchValues() {
    return (
      <>
        {
          filterValue && filterValue.map(data => {
            const { name, about, avatar, image, _id } = data;

            return (
              <li key={_id} onClick={() => clickedChat(data)}>
                <span className='profile-img' style={{ background: avatar }}>
                  {image ? <img src={image} alt='profile' /> : name.slice(0, 2)}
                </span>
                <span className='name-msg'>
                  <div className='name'>{name}</div>
                  <div className='last-msg'>
                    {about ? [about.length <= 32 ? about : about.slice(0, 30) + '...'] : "Hello there. I'm using chat-app"}
                  </div>
                </span>
              </li>
            );
          })
        }
      </>
    );
  };

  useEffect(() => {
    const filter = data && data.filter(obj => obj.name.toLocaleLowerCase().includes(searchValue));
    setFilterValue(filter);
  }, [searchValue]);

  return (
    <div className='chat-comp'>
      <div>Available Chat</div>
      <div ref={con} className="search">
        <img ref={img} src={blackSearch} alt='search' />
        <input type='search' placeholder='Search Chat' value={searchValue} onChange={e => setSearchValue(e.target.value.toLowerCase())} />
      </div>

      <div className='chat-list'>

        {allUsersData.isLoading && <div>Loading...</div>}
        {allUsersData.isFailed && <div>some internal server error occurred</div>}

        <ul>
          {
            searchValue.length <= 0 &&
            data && data.map(data => {
              const { name, about, avatar, image, _id } = data;
              return (
                <li key={_id} onClick={() => clickedChat(data)}>
                  <span className='profile-img' style={{ background: avatar }}>
                    {image ? <img src={image} alt='profile' /> : name.slice(0, 2)}
                  </span>
                  <span className='name-msg'>
                    <div className='name'>{name}</div>
                    <div className='last-msg'>
                      {about ? [about.length <= 32 ? about : about.slice(0, 30) + '...'] : "Hello there. I'm using chat-app"}
                    </div>
                  </span>
                </li>
              );
            })
          }
          {
            searchValue.length >= 0 && <SearchValues />
          }
        </ul>

      </div>
    </div>
  );
};

export default AvailableChat;