import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Upload } from "../assets/upload.svg";
import { setImage } from '../redux/recipe/recipe-actions';

const ImageUpload = ({ setImage }) => {

    const [base64Image, setBase64Image] = useState(null);

    const onFileUploaded = ({ target }) => {
        if (target.files && target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                setBase64Image(e.target.result);
            };

            setImage(target.files[0]);
            reader.readAsDataURL(target.files[0]);
        }
    }

    return (

        <div className="image-upload">

            <label htmlFor="file-input">
                {
                    base64Image ?
                        <form encType="multipart/form-data">
                            <img src={base64Image} className="image-upload__img" />
                        </form> :

                        <Upload className="image-upload__img" />
                }
            </label>

            <input type="file" accept="image/jpeg, image/png" name="image" id="file-input" onChange={onFileUploaded} />
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setImage: image => dispatch(setImage(image)),
});

export default connect(null, mapDispatchToProps)(ImageUpload);