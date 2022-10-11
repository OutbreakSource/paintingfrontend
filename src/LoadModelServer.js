import {useEffect, useState} from "react";
import * as tf from "@tensorflow/tfjs";


export default function LoadModelServer() {
    const url = {
        model: 'https://paintingemotion.s3.us-west-2.amazonaws.com/model.json',
    };

    const [model, setModel] = useState(null);
    useEffect(()=>{
        tf.ready().then(()=>{
            loadModelServer(url)
        });
    },[])

    async function loadModelServer(url) {
        try {
// For layered model
            const model = await tf.loadLayersModel(url.model);
// For graph model
// const model = await tf.loadGraphModel(url.model);
            setModel(model);
            console.log("Load model success")
        } catch (err) {
            console.log(err);
        }
    }
}