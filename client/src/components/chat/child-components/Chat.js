import React, { useEffect, useState } from 'react';
import "./middle.css";
import blackSearch from "../../../png/blackSearch.png";
import limeSearch from "../../../png/limeSearch.png";
import { useSelector } from "react-redux";
// import { socket } from '../socket/socketIO';

function Chat({ setChatWith, toggleMenu }) {
    const allusers = useSelector(state => state.user.allUsersData);
    const onlineId = useSelector(state => state.onlineSlice);
    const messageStore = useSelector(state => state.messageSlice);

    const [value, setValue] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filterValue, setFilterValue] = useState([]);

    let chatId = Object.keys(messageStore); // Getting the keys that I'm chated with

    // Changing images in hover
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

    // Filltering the persons that I'm chat with
    function filterPerson() {
        setValue([]);
        if (allusers.data) {
            allusers.data.map(data => {
                const { _id } = data;
                return chatId.includes(_id) &&
                    setValue(value => {
                        const updateData = [...value, data];
                        return updateData;
                    });
            });
        };
    };

    // Runing the filter person when allusers.data id avaliable for displaying persons
    useEffect(() => {
        filterPerson();
    }, [allusers.data], filterPerson);

    // Displaying Searched Filltered persons
    function SearchValues() {
        return (
            <>
                {
                    filterValue && filterValue.map(data => {
                        const { name, avatar, image, _id } = data;
                        // Getting the last message
                        const allMsg = chatId.includes(_id) && messageStore[_id];
                        const lastMsg = allMsg && allMsg[allMsg.length - 1];

                        return (
                            <li key={_id} onClick={() => clickedChat(data)}>
                                <span className='profile-img' style={{ background: image ? "black" : avatar }}>
                                    {image ? <img src={`http://localhost:4000/images/` + image} alt='profile' /> : name.slice(0, 2)}
                                </span>
                                {onlineId.includes(_id) && <div className='online-symbol'></div>}
                                <span className='name-msg'>
                                    <div className='name'>{name}</div>
                                    <div className='last-msg'>
                                        {lastMsg ? [lastMsg.msg ? [lastMsg.msg.length <= 32 ? lastMsg.msg : lastMsg.msg.slice(0, 30) + '...'] : "image"] : "Hello there. I'm using chat-app"}
                                    </div>
                                </span>
                            </li>
                        );
                    })
                }
            </>
        );
    };

    // Toggling the menu and setting the righ-comp data 
    function clickedChat(data) {
        toggleMenu();
        setChatWith(data);
    };

    // Re-rendring chats whenever some new word entered in search input
    useEffect(() => {
        const filter = value.filter(obj => obj.name.toLocaleLowerCase().includes(searchInput));
        setFilterValue(filter);
    }, [searchInput, value]);

    return (
        <div className='chat-comp'>
            <div>Chats</div>
            <div id='searchCon' className="search">
                <img id='searchImage' src={blackSearch} alt='search' />
                <input type='search' placeholder='Search Chat' value={searchInput} onChange={e => setSearchInput(e.target.value.toLocaleLowerCase())} />
            </div>
            <div className='chat-list'>
                <ul>
                    {
                        searchInput.length <= 0 &&
                        allusers.data && value.map(data => {
                            const { name, avatar, image, _id } = data;
                            // Getting the last message
                            const allMsg = chatId.includes(_id) && messageStore[_id];
                            const lastMsg = allMsg && allMsg[allMsg.length - 1];

                            return (chatId.includes(_id) && allMsg.length >= 0 &&
                                <li key={_id} onClick={() => clickedChat(data)}>
                                    <span className='profile-img' style={{ background: image ? "black" : avatar }}>
                                        {image ? <img src={`http://localhost:4000/images/` + image} alt='profile' /> : name.slice(0, 2)}
                                    </span>
                                    {onlineId.includes(_id) && <div className='online-symbol'></div>}
                                    <span className='name-msg'>
                                        <div className='name'>{name}</div>
                                        <div className='last-msg'>
                                            {lastMsg ? [lastMsg.msg ? [lastMsg.msg.length <= 32 ? lastMsg.msg : lastMsg.msg.slice(0, 30) + '...'] : "image"] : "Hello there. I'm using chat-app"}
                                        </div>
                                    </span>
                                </li>
                            );
                        })
                    }
                    {
                        searchInput.length >= 1 && <SearchValues />
                    }
                </ul>
            </div>
        </div>
    );
};

export default Chat;