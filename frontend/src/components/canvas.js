import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { Stage, Layer } from 'react-konva';
import Rectangle from './Rectangle';
import ImageDisplay from './ImageDisplay';
import {v4 as uuidv4} from 'uuid'
import axios from 'axios';




const Canvas = forwardRef((props, ref) => {
    // console.log(props)
    // const initialRectangles = [];
    const [rectangles, setRectangles] = React.useState([]);
    const [selectedId, selectShape] = React.useState(null);
    // console.log(rectangles)
    const addNewRect = () => {
        // console.log('Function in ComponentA is called');
        const newRect = {
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            stroke: 'black',
            id: uuidv4(),
            template_id: props.template_id
          };
          
          setRectangles(prevRectangles => [...prevRectangles, newRect]);
       
    };
    // console.log(initialRectangles)

    useImperativeHandle(ref, () => ({
        addNewRect,
    }));

    // const initialRectangles = addNewRectangle() || undefined?[] : addNewRectangle.initialValue;


    const checkDeselect = (e) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null);
        }
    };

    useEffect(() => {
        updateRectangle()
    }, [rectangles])

    useEffect(() => {
        drawRectangle()
    }, [props.template_id])

    const updateRectangle = () => {
        // console.log(rectangles)
        if(rectangles.length !== 0){
            axios.post('/api/create-update-rectangle', rectangles)
            .then((response) => {
    
            })
            .catch((error) => {
            console.log(error)
        })
        }
    }

    const drawRectangle = () => {
        axios.get(`/api/rectangle/${props.template_id}`)
        .then((response) => {
            setRectangles(response.data.data)
        })
        .catch((error) => {
        console.log(error)
    })
    }

    return (
        <Stage
            width={900}
            height={window.innerHeight}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
        >
            <Layer>
                {props.imageData?
                <ImageDisplay imagesData={props.imageData}/>
                : ''
                }
                {rectangles.map((rect, i) => {
                    return (
                        <Rectangle
                            key={i}
                            shapeProps={rect}
                            isSelected={rect.id === selectedId}
                            onSelect={() => {
                                selectShape(rect.id);
                            }}
                            onChange={(newAttrs) => {
                                const rects = rectangles.slice();
                                rects[i] = newAttrs;
                                setRectangles(rects);
                            }}
                        />
                    );
                })}
            </Layer>
        </Stage>
    );
})

export default Canvas;