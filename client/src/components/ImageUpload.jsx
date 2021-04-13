import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Upload } from "../assets/upload.svg";
import { setImage, setBase64Image } from '../redux/recipe/recipe-actions';
import { selectBase64Image } from '../redux/recipe/recipe-selector';

const ImageUpload = ({ setImage, image, setBase64Image }) => {

    const [base64ImageState, setBase64ImageState] = useState(image ? image : null);


    const onFileUploaded = ({ target }) => {
        if (target.files && target.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                const setImg = async () => {
                    await setBase64ImageState(e.target.result);
                    await setBase64Image(e.target.result);
                }
                setImg();
            };

            setImage(target.files[0]);
            reader.readAsDataURL(target.files[0]);
        }
    }

    return (

        <div className="image-upload">

            <label htmlFor="file-input">
                {
                    base64ImageState ?
                        <form encType="multipart/form-data">
                            <img src={base64ImageState} className="image-upload__img" />
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
    setBase64Image: base64Image => dispatch(setBase64Image(base64Image)),
});

export default connect(null, mapDispatchToProps)(ImageUpload);