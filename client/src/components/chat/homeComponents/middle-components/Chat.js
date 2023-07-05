import React, { useRef, useEffect } from 'react';
import "./middle.css";
import blackSearch from "../../../../png/blackSearch.png"
import limeSearch from "../../../../png/limeSearch.png"

function Chat() {
    const con = useRef(null);
    const img = useRef(null);
    useEffect(() => {
        con.current.addEventListener("mouseenter", (e)=>{
            img.current.src = limeSearch;
        })

        con.current.addEventListener("mouseleave", (e)=>{
            img.current.src = blackSearch;       
        })
    })
    

    return (
        <div className='chat-comp'>
            <div>Chats</div>
            <div ref={con} className="search">
                <img ref={img} src={blackSearch} alt='search'/>
                <input type='search' placeholder='Search Chat' />
            </div>
            <div className='chat-persons'>

            </div>
        </div>
    );
};

export default Chat;