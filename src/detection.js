import React from "react";
import "./style.css";
import { useModel } from 'react-tensorflow';

const tf = require("@tensorflow/tfjs");
// const tfn = require("@tensorflow/tfjs-node");

// example model - working
async function predict() {
    const model = await tf.loadLayersModel(
        "https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json"
    );
    console.log(typeof model);
}

// my model - not working
// async function predictAlt() {
//     const model = useModel({ modelUrl: `./model.json` })
//     const prediction = model.predict(tf.ones([120,120,3]));
//     console.log(prediction);
//     console.log(typeof model);
// }

const MyModelComponent = () => {
    const model = useModel({ modelUrl: `./model.js` })
    const prediction = model.predict(tf.ones([120,120,3]));
    console.log(prediction);

  
    return null
  }

export default function Detection() {
    return (
        <div className="App">
            <button onClick={predict} style={{ fontSize: "20px" }}>
                example model
            </button>
            <br />
            <br />
            <button onClick={MyModelComponent} style={{ fontSize: "20px" }}>
                my model
            </button>
        </div>
    );
}

// const MyModelComponent = () => {
//     const model = useModel({ modelUrl: `${PATH_TO_MODEL}` })
  
//     // ...do something with the model
  
//     return null
//   }