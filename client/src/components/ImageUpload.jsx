import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Upload } from "../assets/upload.svg";
import { setImage, setBase64Image } from "../redux/recipe/recipe-actions";

const ImageUpload = ({ image }) => {
  const [base64ImageState, setBase64ImageState] = useState(
    image ? image : null
  );
  const dispatch = useDispatch();

  const onFileUploaded = ({ target }) => {
    if (target.files && target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        const setImg = async () => {
          setBase64ImageState(e.target.result);
          dispatch(setBase64Image(e.target.result));
        };
        setImg();
      };

      dispatch(setImage(target.files[0]));
      reader.readAsDataURL(target.files[0]);
    }
  };

  return (
    <div className="image-upload">
      <label htmlFor="file-input">
        {base64ImageState ? (
          <form encType="multipart/form-data">
            <img
              src={base64ImageState}
              alt="image-upload"
              className="image-upload__img"
            />
          </form>
        ) : (
          <Upload className="image-upload__img" />
        )}
      </label>

      <input
        type="file"
        accept="image/jpeg, image/png"
        name="image"
        id="file-input"
        onChange={onFileUploaded}
      />
    </div>
  );
};

export default ImageUpload;
