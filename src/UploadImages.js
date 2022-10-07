import React, {useState, useEffect} from "react";
import "./style.css"

export default function UploadImages() {
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([])

    useEffect(() => {
        if (images.length < 1){
            return
        }
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
    }, [images]);

    function onImageChange(e){
        setImages([...e.target.files]);

    }

    return(
        <div className={"center"}>
            <input className={"center"} type="file" multiple accept={"image/*"} onChange={onImageChange}/>
            { imageURLs.map(imageSrc => <img className={"photo"} src={imageSrc} />)}
        </div>
    );

}

