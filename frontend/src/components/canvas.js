import React, { forwardRef, useImperativeHandle } from 'react'
import { Stage, Layer } from 'react-konva';
import Rectangle from './Rectangle';
import ImageDisplay from './ImageDisplay';




const Canvas = forwardRef((props, ref) => {
    // console.log(props)
    // const initialRectangles = [];
    const [rectangles, setRectangles] = React.useState([]);
    const [selectedId, selectShape] = React.useState(null);
    const addNewRect = () => {
        console.log('Function in ComponentA is called');
        const newRect = {
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            stroke: 'black',
            id: `rect${rectangles.length + 1}`,
          };
      
          setRectangles(prevRectangles => [...prevRectangles, newRect]);
        // initialRectangles.push(
        //     {
        //         x: 50,
        //         y: 50,
        //         width: 100,
        //         height: 100,
        //         // fill: 'red',
        //         stroke: "black",
        //         id: 'rect1',
        //       }
        // )
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