import React from "react";
import "./style.css";

const tf = require("@tensorflow/tfjs");
const tfn = require("@tensorflow/tfjs-node");

// example model - working
async function predict() {
    const model = await tf.loadLayersModel(
        "https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json"
    );
    console.log(typeof model);
}

// my model - not working
async function predictAlt() {
    const handler = tfn.io.fileSystem("./model.json");
    const myModel = await tf.loadLayersModel(handler);
    const prediction = myModel.predict(tf.ones([120,120,3]));
    console.log(prediction);
    console.log(typeof model);
}

export default function Detection() {
    return (
        <div className="App">
            <button onClick={predict} style={{ fontSize: "20px" }}>
                example model
            </button>
            <br />
            <br />
            <button onClick={predictAlt} style={{ fontSize: "20px" }}>
                my model
            </button>
        </div>
    );
}
