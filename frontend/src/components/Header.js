import React, { useRef } from 'react';
import Canvas from './canvas';
import ImageUpload from './ImageUpload';

const Header = () => {
  const canvasRef = useRef();

  const addRectangle = () => {
    canvasRef.current.addNewRect();
  };

  return (
    <>
      <button onClick={addRectangle}>Add Rectangle</button>
      <ImageUpload />
    <div className='right-panel'>
      <Canvas ref={canvasRef} />
    </div>
    </>
  );
};

export default Header
