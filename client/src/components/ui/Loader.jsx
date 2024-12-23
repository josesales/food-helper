import React from "react";

const Loader = ({ mini, containerStyle }) => (
  <div className={`loader-overlay${mini ? "-mini" : ""}`}>
    <div
      className={`loader-container${mini ? "-mini" : ""}`}
      style={{ ...containerStyle }}
    />
  </div>
);

export default Loader;
