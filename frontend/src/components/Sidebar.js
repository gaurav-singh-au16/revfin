import React, { useRef, useState } from 'react'
import Canvas from './canvas'
import ImageUpload from './ImageUpload'
import { Navbar, Nav, Button } from "react-bootstrap";

const Template = (props) => {

  const initialTemplate = props.template == undefined ? [] : props.template
  // const [template, setTemplate] = useState(props.template)
  const [rect, setRect] = useState([
    {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      stroke: 'black',
      id: 2,
    },
    {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      stroke: 'black',
      id: 2,
    },
  ])
  const [imageData, setImageData] = useState({
    id: 1,
    image: 'buffer image'
  })
  const canvasRef = useRef();

  const addRectangle = () => {
    canvasRef.current.addNewRect();
  };

  const [imageBuffer, setImageBuffer] = useState(null)


  return (
    <>
      <div className="topnav">
        <Navbar
          fixed="top"
          expand="lg"
          bg="dark"
          variant="dark"
          className="topnav justify-content-center"
        >

          <Navbar.Brand href="" className=''>Image Annotate</Navbar.Brand>
          <Button onClick={addRectangle}>Add Rectangle</Button>
          <ImageUpload />
        </Navbar>
      </div>


      <div className='left-panel mt-5'>
        {initialTemplate.map((data, idx) => (
          <>
            <h2 className='form-control' style={{ cursor: "pointer" }} onClick={() => setImageBuffer(data.image)}>
              {`Template ${idx + 1}`}
              <span className='mx-3 text-danger' style={{ cursor: "pointer" }}>X</span></h2>
          </>
        ))}
      </div>
      <div className='right-panel'>
        <Canvas imageData={imageBuffer} rectData={rect} ref={canvasRef} />
      </div>
    </>
  )
}

export default Template