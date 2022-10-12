import React, {useState, useEffect, Fragment} from "react";
import "./style.css"
import * as tf from "@tensorflow/tfjs";
import { DropzoneArea } from "material-ui-dropzone";
import { Backdrop, Chip, CircularProgress, Grid, Stack } from "@mui/material";


export default function UploadImages() {
    const [model, setModel] = useState(null);
    const [classLabels, setClassLabels] = useState(null);

    useEffect(() => {
        const loadModel = async () => {
            const model_url = "https://paintingemotion.s3.us-west-2.amazonaws.com/model.json";

            const model = await tf.loadLayersModel(model_url);

            setModel(model);
        };

        const getClassLabels = async () => {

            const testLabel = ["awe", "anger", "amusement", "contentment", "disgust",
            "fear", "sadness", "excitement"]

            setClassLabels(testLabel);
        };

        loadModel();
        getClassLabels();
    }, []);


    const [loading, setLoading] = useState(false);
    const [confidence, setConfidence] = useState(null);
    const [predictedClass, setPredictedClass] = useState(null);


    const readImageFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);

            reader.readAsDataURL(file);
        });
    };

    const createHTMLImageElement = (imageSrc) => {
        return new Promise((resolve) => {
            const img = new Image();

            img.onload = () => resolve(img);

            img.src = imageSrc;
        });
    };

    const handleImageChange = async (files) => {
        if (files.length === 0) {
            setConfidence(null);
            setPredictedClass(null);
        }

        if (files.length === 1) {
            setLoading(true);

            const imageSrc = await readImageFile(files[0]);
            const image = await createHTMLImageElement(imageSrc);

            const [predictedClass, confidence] = tf.tidy(() => {
                const tensorImg = tf.browser.fromPixels(image).resizeNearestNeighbor([120, 120]).toFloat().expandDims();
                const result = model.predict(tensorImg);

                const predictions = result.dataSync();
                const predicted_index = result.as1D().argMax().dataSync()[0];

                const predictedClass = classLabels[predicted_index];
                const confidence = Math.round(predictions[predicted_index] * 100);

                return [predictedClass, confidence];
            });
            console.log(predictedClass)
            setPredictedClass(predictedClass);
            setConfidence(confidence);
            setLoading(false);
        }

    };



    return (
        <Fragment>
            <Grid container className="App" direction="column" alignItems="center" justifyContent="center" marginTop="12%">
                <Grid item>
                    <h1 style={{ textAlign: "center", marginBottom: "1.5em" }}>Emotion Analyzer</h1>
                    <DropzoneArea
                        acceptedFiles={["image/*"]}
                        dropzoneText={"Add an image"}
                        onChange={handleImageChange}
                        maxFileSize={10000000}
                        filesLimit={1}
                        showAlerts={["error"]}
                    />
                    <Stack style={{ marginTop: "2em", width: "12rem" }} direction="row" spacing={1}>
                        <Chip
                            label={predictedClass === null ? "Prediction:" : `Prediction: ${predictedClass}`}
                            style={{ justifyContent: "left" }}
                            variant="outlined"
                        />
                        <Chip
                            label={confidence === null ? "Confidence:" : `Confidence: ${confidence}%`}
                            style={{ justifyContent: "left" }}
                            variant="outlined"
                        />
                    </Stack>
                </Grid>
            </Grid>

            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Fragment>
    );

}

