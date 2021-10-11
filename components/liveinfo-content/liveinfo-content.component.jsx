//LiveInfo sivun containeri
// "tällä hetkellä vaan iframe"

import React from 'react';
import './liveinfo-content.style.css';

const LiveinfoContent = ({url}) => {
  return (
    <>
      <iframe 
        className="iframe"
        src={url}
        title="mapbox-iframe"
      />
    </>
  );
}

export default LiveinfoContent;