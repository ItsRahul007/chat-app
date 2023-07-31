import React, { useEffect } from 'react';
import "./middle.css";
import blackSearch from "../../../png/blackSearch.png";
import limeSearch from "../../../png/limeSearch.png";
import { useSelector } from "react-redux";

function Chat({ setChatWith, toggleMenu }) {
    const chatId = useSelector(state => state.chatId);
    const allusers = useSelector(state => state.user.allUsersData);

    useEffect(() => {
        const searchCon = document.getElementById("searchCon");
        const searchImage = document.getElementById("searchImage");

        searchCon.addEventListener("mouseenter", () => {
            searchImage.src = limeSearch;
        });

        searchCon.addEventListener("mouseleave", () => {
            searchImage.src = blackSearch;
        });
    }, []);

    // Toggling the menu and setting the righ-comp data 
    function clickedChat(data) {
        toggleMenu();
        setChatWith(data);
    };

    return (
        <div className='chat-comp'>
            <div>Chats</div>
            <div id='searchCon' className="search">
                <img id='searchImage' src={blackSearch} alt='search' />
                <input type='search' placeholder='Search Chat' />
            </div>
            <div className='chat-list'>
                <ul>
                    {
                        allusers.data && allusers.data.map(data => {
                            const { name, about, avatar, image, _id } = data;
                            return (chatId.includes(_id) &&
                                <li key={_id} onClick={() => clickedChat(data)}>
                                    <span className='profile-img' style={{ background: avatar }}>
                                        {image ? <img src={image} alt='profile' /> : name.slice(0, 2)}
                                    </span>
                                    <span className='name-msg'>
                                        <div className='name'>{name}</div>
                                        <div className='last-msg'>{about ? about : "Hello there. I'm using chat-app"}</div>
                                    </span>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Chat;