import React, { useState } from "react";
import Loader from "./Loader";

const Media = React.memo(
  ({
    image,
    video,
    containerClass,
    imageClass,
    videoClass,
    loadingClass,
    onImgClick,
  }) => {
    try {
      const [isLoading, setIsLoading] = useState(true);
      const mediaClass = containerClass ? containerClass : "media-container";
      const mediaImgClass = imageClass ? imageClass : "media-container__img";
      const mediaVideoClass = videoClass
        ? videoClass
        : "media-container__video";
      //When inserting a recipe the 'watch' from the video url must be replaced for 'embed'
      //implement logic to turn the link into the format https://www.youtube.com/embed/:id

      if (image && video) {
        throw new Error("You can cannot send both image and video together");
      }

      const onLoad = () => {
        setIsLoading(false);
      };

      return (
        <div className={mediaClass}>
          {image && isLoading && <Loader />}
          {image ? (
            <img
              className={mediaImgClass}
              src={image}
              alt="Media"
              onLoad={onLoad}
              onClick={onImgClick}
              loading="lazy"
              style={{ cursor: onImgClick ? "pointer" : "default" }}
            />
          ) : (
            <iframe
              title="media-video"
              className={mediaVideoClass}
              src={video}
              frameBorder="0"
              allowFullScreen
            />
          )}
        </div>
      );
    } catch (error) {
      console.log(error.message);
      //TODO: Build error screen
      return <div>Some error occurred</div>;
    }
  }
);
export default Media;
