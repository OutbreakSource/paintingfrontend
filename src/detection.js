import React from "react";
import "./styles.css";

const tf = require("@tensorflow/tfjs");

// example model - working
async function predict() {
    const model = await tf.load(
        "https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json"
    );
    console.log(typeof model);
}

// my model - not working
async function predictAlt() {
    const myModel = await tf.loadLayersModel("file://my-model.json");
    console.log(typeof model);
}

export default function detection() {
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
