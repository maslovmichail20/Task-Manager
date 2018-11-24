import React from 'react';

const Preloader = ({ wrapperClass }) => (
  <div className={wrapperClass + " preloader-wrapper"}>
    <div className="md-preloader">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="75" width="75" viewBox="0 0 75 75">
        <circle cx="37.5" cy="37.5" r="33.5" strokeWidth="8"/>
      </svg>
    </div>
  </div>
);

export default Preloader;