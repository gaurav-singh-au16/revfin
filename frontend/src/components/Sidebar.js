import React, { useRef, useState, useEffect } from 'react'
import Canvas from './canvas'
import ImageUpload from './ImageUpload'
import { Navbar, Button } from "react-bootstrap";
import axios from 'axios';

const Template = (props) => {

  const [template, setTemplate] = useState([])
  const [rectangle, setRectangle] = useState([])

  const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = () => {
        const formData = new FormData();
        formData.append('image', image);
        // console.log(formData)

        axios.post('https://revfin-six.vercel.app/api/add-template', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then((response) => {
          getSavedTemplates()
            // console.log(response.data);
        });
    };

  useEffect(() => {
    getSavedTemplates()
    getSavedRectangle()
  }, [])

  const getSavedTemplates = () => {
    axios.get('https://revfin-six.vercel.app/api/template')
      .then((response) => {
        setTemplate(response.data.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getSavedRectangle = () => {
    axios.get('https://revfin-six.vercel.app/api/rectangle')
      .then((response) => {
        setRectangle(response.data.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  // console.log(initialRectangle)
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

  const canvasRef = useRef();

  const addRectangle = () => {
    canvasRef.current.addNewRect();
    getSavedRectangle()
  };

  const [imageBuffer, setImageBuffer] = useState(null)
  const [templateId, setTemplateId] = useState('')

  const handleState = (image, id) => {
    setImageBuffer(image)
    setTemplateId(id)
  }

  const removeRect = (id) => {
    axios.get(`https://revfin-six.vercel.app/api/remove-rectangle/${id}`)
      .then((res) => {
        getSavedRectangle()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const removeTemplate = (id) => {
    axios.get(`https://revfin-six.vercel.app/api/remove-template/${id}`)
      .then((res) => {
        getSavedTemplates()

      })
      .catch((err) => {
        console.log(err)
      })
  }


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
          <div>
            <input className='form' type="file" onChange={handleImageChange}  accept=".png, .jpg, .jpeg"/>
            <button className='form-control' onClick={handleImageUpload}>Upload Image</button>
        </div>
        </Navbar>
      </div>


      <div className='left-panel mt-5'>
        {template.map((data, idx) => (
          <div className='mt-5' key={idx}>
            <h2 className='form-control mt-2' style={{ cursor: "pointer" }} onClick={() => handleState(data.image, data.id)}>
              {`Template ${idx + 1}`}
              <span className='mx-3 text-danger' style={{ cursor: "pointer" }} onClick={() => removeTemplate(data.id)}>X</span></h2>
            {rectangle.map((rect) => (
              rect.template_id === data.id ?
                <h4 className='fs-6 fw-light mx-3' style={{ cursor: "pointer" }}>
                  {`Template ${idx + 1} Rect`}
                  <span className='mx-3 text-danger' style={{ cursor: "pointer" }} onClick={() => removeRect(rect.id)}>X</span></h4> : ''
            ))}
          </div>
        ))}
      </div>
      <div className='right-panel'>
        <Canvas imageData={imageBuffer} rectData={rect} ref={canvasRef} template_id={templateId} />
      </div>
    </>
  )
}

export default Template