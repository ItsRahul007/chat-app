import { useState } from 'react';
import Avatar from "react-avatar-edit";
import "./microCompo.css"

function CropImage({ display, setDisplay }) {
    const [cropedImage, setCropedImage] = useState(null);

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
      
        // Generate a unique filename (optional)
        const timestamp = new Date().getTime();
        const filename = `image_${timestamp}.${mimeType.split('/')[1]}`;
      
        // If you need a File object (optional)
        const file = new File([blob], filename, { type: mimeType });
      
        return file;
      }

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
        setDisplay("none");
        const file = convertBase64ToImageFile(cropedImage);
        console.log(file);
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
                    <img src={cropedImage} className='preview' />
                    <button className='save-img' onClick={saveImage}>Save</button>
                </>
            }
        </div>
    )
};

export default CropImage;