import React, { useRef, useEffect } from 'react';
import "./middle.css";
import blackSearch from "../../../../png/blackSearch.png";
import limeSearch from "../../../../png/limeSearch.png";
import kankana from "./kankana.jpg";
import myImage from "./myImage2-min.jpg"

function Chat() {
    const con = useRef(null);
    const img = useRef(null);
    useEffect(() => {
        con.current.addEventListener("mouseenter", (e)=>{
            img.current.src = limeSearch;
        });

        con.current.addEventListener("mouseleave", (e)=>{
            img.current.src = blackSearch;       
        });
    });

    return (
        <div className='chat-comp'>
            <div>Chats</div>
            <div ref={con} className="search">
                <img ref={img} src={blackSearch} alt='search'/>
                <input type='search' placeholder='Search Chat' />
            </div>
            <div className='chat-list'>
                <ul>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={myImage} alt='profile-picture' />
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Rahul Ghosh</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img'>
                            <img src={kankana}></img>
                        </span>
                        <span className='name-msg'>
                            <div className='name'>Kankana Mondal</div>
                            <div className='last-msg'>What's up bro</div>
                        </span>
                    </li>
                    <li>
                        <span className='profile-img' style={{background: "red"}}>Bo</span>
                        <span className='name-msg'>
                            <div className='name'>Boga Chaudhuri</div>
                            <div className='last-msg'>Ki re vai ki kor6is</div>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Chat;