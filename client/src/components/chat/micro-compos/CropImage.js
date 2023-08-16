import { useState } from 'react';
import Avatar from "react-avatar-edit";


function CropImage() {
    const [cropedImage, setCropedImage] = useState(null);

    function onCrop(e){
        setCropedImage(e);
        console.log(e);
    }

    function onClose(){
        setCropedImage(null);
    };

    return (
        <>
            <Avatar
                height={300}
                width={300}
                onCrop={onCrop}
                onClose={onClose}
            />
            {
                cropedImage && <img src={cropedImage} style={{height: "100px"}} />
            }
        </>
    )
};

export default CropImage;