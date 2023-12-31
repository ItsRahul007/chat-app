import { useState } from 'react';
import Avatar from "react-avatar-edit";
import "./microCompo.css";
import axios from 'axios';
import { socket } from '../socket/socketIO';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../../store/slices/userSlice';

function CropImage({ display, setDisplay }) {
    const [cropedImage, setCropedImage] = useState(null);
    const dispatch = useDispatch();

    // Converting base64 image to a normal image
    function convertBase64ToImageFile(base64String) {
        const matches = base64String.match(/^data:(.+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            throw new Error('Invalid Base64 string format');
        }

        const mimeType = matches[1];
        const base64Data = matches[2];

        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
        }

        const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeType });

        // Generate a unique filename
        const timestamp = new Date().getTime();
        const filename = `image_${timestamp}.${mimeType.split('/')[1]}`;

        // If you need a File object (optional)
        const file = new File([blob], filename, { type: mimeType });

        return file;
    }

    // Geting the base64 image
    function onCrop(e) {
        setCropedImage(e);
    }

    function onClose() {
        setCropedImage(null);
    };

    function close() {
        onClose();
        setDisplay("none");
    };

    async function saveImage() {
        setDisplay("none");
        const file = convertBase64ToImageFile(cropedImage);
        const fd = new FormData();
        fd.append("file", file);
        const res = await axios.post("http://localhost:4000/upload/uploadImage", fd, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "auth-token": localStorage.getItem('authToken')
            }
        });
        console.log(res);
        dispatch(fetchUser());
        socket.emit("profile-picture-update");
    };

    return (
        <div className='crop-image' style={{ display }}>
            <button onClick={close}>Close</button>
            <Avatar
                height={300}
                width={300}
                onCrop={onCrop}
                onClose={onClose}
                exportMimeType='image/*'
            />
            {
                cropedImage && <>
                    <img src={cropedImage} className='preview' alt='' />
                    <button className='save-img' onClick={saveImage}>Save</button>
                </>
            }
        </div>
    )
};

export default CropImage;