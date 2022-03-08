import React from "react";
import "./Preloader.scss";

const Preloader = () => {
  return (
    <div className="preloader">
      <img src="/hashdefine.jfif" alt="" width="auto" height="auto" />
      <div class="progress">
        <div class="progress_value"></div>
      </div>
    </div>
  );
};

export default Preloader;
