import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Upload } from "../assets/upload.svg";
import { setImage } from "../redux/recipe/recipe-actions";

const ImageUpload = ({ image }) => {
  const [imageURL, setImageURL] = useState(image ? image : null);
  const dispatch = useDispatch();

  const onFileUploaded = ({ target }) => {
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const fileURL = URL.createObjectURL(file);

      setImageURL(fileURL);
      dispatch(setImage(file));
    }
  };

  return (
    <div className="image-upload">
      <label htmlFor="file-input">
        {imageURL ? (
          <form encType="multipart/form-data">
            <img
              src={imageURL}
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
