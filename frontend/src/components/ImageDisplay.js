import React from 'react';

const ImageDisplay = (props) => {
  console.log(props.imagesData.id)
  
  return (
    <div>
      {/* <label>{props.imagesData.id}</label> */}
      {/* <h1>{id}</h1>
      <h1>{image}</h1> */}
      {/* <img
        src={`data:image/png;base64,${base64ToUint8Array(props.image).toString('base64')}`}
        alt={`Template ${props.id}`}
      /> */}
    </div>
  );
};

export default ImageDisplay;
