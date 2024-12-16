import React, { useState } from "react";
import Loader from "./Loader";

const Media = ({
  image,
  video,
  containerClass,
  imageClass,
  videoClass,
  loadingClass,
}) => {
  try {
    const [isLoading, setIsLoading] = useState(true);
    const mediaClass = containerClass ? containerClass : "media-container";
    const mediaLoadingClass = loadingClass
      ? loadingClass
      : "media-container__loading";
    const mediaImgClass = imageClass ? imageClass : "media-container__img";
    const mediaVideoClass = videoClass ? videoClass : "media-container__video";
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
        {isLoading && <Loader />}
        {image ? (
          <img className={mediaImgClass} src={image} onLoad={onLoad} />
        ) : (
          <iframe
            title="media-video"
            className={mediaVideoClass}
            src={video}
            onLoad={onLoad}
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
};
export default Media;
