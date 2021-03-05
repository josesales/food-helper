import React from 'react';
import { ReactComponent as Upload } from "../assets/upload.svg";

const ImageUpload = () => (

    <div className="image-upload">

        <label for="file-input">
            <Upload className="image-upload__img" />
        </label>

        <input type="file" accept="image/jpeg, image/png" name="avatar" id="file-input" />
    </div>
)

export default ImageUpload;