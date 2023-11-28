import React from 'react'

const ZoomInOut = () => {

    function zoomStage(stage, scaleBy) {
        const oldScale = stage.scaleX();

        const pos = {
            x: stage.width() / 2,
            y: stage.height() / 2,
        };
        const mousePointTo = {
            x: pos.x / oldScale - stage.x() / oldScale,
            y: pos.y / oldScale - stage.y() / oldScale,
        };

        const newScale = Math.max(0.05, oldScale * scaleBy);

        const newPos = {
            x: -(mousePointTo.x - pos.x / newScale) * newScale,
            y: -(mousePointTo.y - pos.y / newScale) * newScale,
        };

        const newAttrs = limitAttributes(stage, { ...newPos, scale: newScale });

        stage.to({
            x: newAttrs.x,
            y: newAttrs.y,
            scaleX: newAttrs.scale,
            scaleY: newAttrs.scale,
            duration: 0.1,
        });
    }
    return (
        <div className="zoom-container">
            <button
                onClick={
                    zoomStage(stageRef.current, 1.2)
                }
            >
                +
            </button>
            <button
                onClick={() => {
                    zoomStage(stageRef.current, 0.8);
                }}
            >
                -
            </button>
        </div>
    )
}

export default ZoomInOut