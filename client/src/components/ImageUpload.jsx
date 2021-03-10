import React, { useState } from 'react';
import { ReactComponent as Upload } from "../assets/upload.svg";

const ImageUpload = () => {

    const [image, setImage] = useState(null);

    const onFileUploaded = ({ target }) => {
        if (target.files && target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setImage(e.target.result);
            };

            reader.readAsDataURL(target.files[0]);
        }
    }

    return (

        <div className="image-upload">

            <label htmlFor="file-input">
                {
                    image ? <img src={image} className="image-upload__img" /> : <Upload className="image-upload__img" />
                }
            </label>

            <input type="file" accept="image/jpeg, image/png" name="avatar" id="file-input" onChange={onFileUploaded} />
        </div>
    );
}

export default ImageUpload;