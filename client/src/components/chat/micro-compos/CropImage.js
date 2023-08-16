import { useState } from 'react';
import Avatar from "react-avatar-edit";
import "./microCompo.css"


function CropImage({ display, setDisplay, setUser, user }) {
    const [cropedImage, setCropedImage] = useState(null);

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

    function saveImage(){
        setUser({ ...user, image: cropedImage });
        setDisplay("none");
    }

    return (
        <div className='crop-image' style={{ display }}>
            <button onClick={close}>Close</button>
            <Avatar
                height={300}
                width={300}
                onCrop={onCrop}
                onClose={onClose}
            />
            {
                cropedImage && <>
                    <img src={cropedImage} className='preview' />
                    <button className='save-img' onClick={saveImage}>Save</button>
                </>
            }
        </div>
    )
};

export default CropImage;