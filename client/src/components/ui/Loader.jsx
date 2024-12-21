import React from "react";

const Loader = ({ mini }) => (
  <div className={`loader-overlay${mini ? "-mini" : ""}`}>
    <div className={`loader-container${mini ? "-mini" : ""}`} />
  </div>
);

export default Loader;
