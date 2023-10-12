import React from 'react';

import './ImageBox.css';

const ImageBox = props => {
  return (
    <div className={`imagebox ${props.className}`} style={props.style}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default ImageBox;