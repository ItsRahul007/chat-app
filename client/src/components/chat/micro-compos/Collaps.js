import React, { useState } from 'react';
import { showAlert } from '../../../store/slices/alertSlice';

function Collaps({ name, about, email, avatar, image, onUserChange, setUser, user, dispatch }) {

    const [pass, setPass] = useState({ oldPassword: '', password: '', conPassword: '' });
    const { oldPassword, password, conPassword } = pass;
    const colors = ['#72c976', '#454f5a', '#c18138', '#367e4f', '#17b1a4', '#1755b1', '#4116db', '#9616db', '#b913b9', '#b9137c', '#b9133d', '#b91313'];

    function onPassChange(e) {
        setPass({ ...pass, [e.target.name]: e.target.value });
    };

    // Chnage password method
    async function changePassword() {
        let obj = {};
        if (password.length < 5 || oldPassword.length < 5) return dispatch(showAlert("Fill the password form"));
        
        if (password !== conPassword) return dispatch(showAlert("Given password didn't matched"));

        obj.password = password;
        obj.oldPassword = oldPassword;

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
            dispatch(showAlert(data.errors))
        };

        // If success then sending message
        dispatch(showAlert("Avatar changed success fully"))
    };

    function changeColor(choosedColor) {
        const avatarCon = document.querySelector(".collap-img");
        avatarCon.style.background = choosedColor;
        setUser({ ...user, avatar: choosedColor });
    };

    return (
        <>
            <li>
                <input type='radio' name='accordian' id='avatar-img' defaultChecked />
                <label htmlFor='avatar-img'>Profile Picture</label>
                <div className='content'>
                    <div className='collap-profile'>
                        <span className='profile-img collap-img' style={{ background: avatar }}>
                            {image ? <img src={image} alt='' /> : name.length !== 0 && name.slice(0, 2)}
                        </span>
                        <div>
                            <input type='file' style={{ display: 'none' }} id='chooseFile' />
                            <label htmlFor='chooseFile'><i className="ri-edit-2-fill"></i></label>
                        </div>
                    </div>
                    <div>
                        <div className='avatar-colors'>
                            {colors.map(e => {
                                return <span key={e} style={{ background: e }} onClick={() => changeColor(e)}></span>
                            })}
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <input type='radio' name='accordian' id='gen-info' />
                <label htmlFor='gen-info'>General Info</label>
                <div className='content'>
                    <div>
                        <input type='text' name='name' value={name} onChange={onUserChange} />
                        <span className='content-name'>Full Name</span>
                    </div>
                    <div>
                        <input type='text' name='about' value={about} onChange={onUserChange} />
                        <span className='content-name'>About</span>
                    </div>
                    <div>
                        <input type='text' name='email' value={email} readOnly />
                        <span className='content-name'>Email</span>
                    </div>
                    <div className='res-msg' id='gen-msg'></div>
                </div>
            </li>
            <li>
                <input type='radio' name='accordian' id='pas-change' />
                <label htmlFor='pas-change'>Change Password</label>
                <div className='content' >
                    <div>
                        <input type='text' name='oldPassword' value={oldPassword} onChange={onPassChange} />
                        <span className='content-name'>Current Password</span>
                    </div>
                    <div>
                        <input type='text' name='password' value={password} onChange={onPassChange} />
                        <span className='content-name'>New Password</span>
                    </div>
                    <div>
                        <input type='text' name='conPassword' value={conPassword} onChange={onPassChange} />
                        <span className='content-name'>Confirm Password</span>
                    </div>
                    <div>
                        <button className='setting-btn' onClick={changePassword}>Change Password</button>
                    </div>
                    <div className='res-msg' id='pas-msg'></div>
                </div>
            </li>
        </>
    );
};

export default Collaps;