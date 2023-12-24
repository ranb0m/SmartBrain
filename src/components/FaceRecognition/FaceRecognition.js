import React from "react";
import './FaceRecognition.css'

function FaceBoxes({ boxes }) {
    return (
        <div>
        {    
            boxes.map(box => {
                return <div key={box.id} className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            })
        }
        </div>
    );
}

export default function FaceRecognition({ imageSrc, boxes }) {
    return (
        <div className="center ma">
        <div className="absolute mt2">
        <img id="fimage"
             alt="url_contents" 
             src={imageSrc}
             width="250vw"
             height="auto" />
        <FaceBoxes boxes={boxes} />
        </div>
        </div>
    )
};