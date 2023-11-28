import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = () => {
  const [images, setImages] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/images').then((response) => {
//       setImages(response.data);
//     });
//   }, []);

  return (
    <div>
      {/* <h2>Images</h2> */}
      {images.map((image) => (
        <div key={image.id}>
          <p>{image.name}</p>
          <img
            src={`data:image/png;base64,${Buffer.from(image.data).toString(
              'base64'
            )}`}
            alt={image.name}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
