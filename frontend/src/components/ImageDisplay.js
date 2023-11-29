import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image } from 'react-konva';

const ImageDisplay = (props) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (props.imagesData) {
      const arrayBufferView = new Uint8Array(props.imagesData.data);
      const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
      const dataUrl = URL.createObjectURL(blob);

      const img = new window.Image();
      img.src = dataUrl;

      img.onload = () => {
        setImage(img);
      };
    }
  }, [props.imagesData]);

  return (
    <div>
      {image && (
        <Image
          image={image}
          width={window.innerWidth}
          height={window.innerHeight}
        />
      )}

    </div>
  );
};

export default ImageDisplay;
