//Komponentti etusivun "isolle" kuvalle (salontori)
import React from 'react';
import './top-image.style.css';
import LazyLoad from 'react-lazyload';

const TopImage = ({picUrl}) => {
  return (
    <>
      <div className="image-container">
          <img
            className="top-image"
            src={picUrl}
            alt="saloimage"
          />
      </div>
    </>
  )
};

export default TopImage;