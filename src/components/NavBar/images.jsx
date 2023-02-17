import React, {useEffect,useState } from "react";
import axios from  "axios";

import "./navbar.css"
const Navbar = ()=>{
    const [images,setImages] = useState([]);

const apikey = "2e71078c7aab1f6736da40a788bd4389";
const [searchTerm, setSearchTerm] = useState("building");
useEffect(()=>{
        axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apikey}&tags=${searchTerm}&per_page=50&format=json&nojsoncallback=1`)
        .then(response =>{
            const {data:{photos:{photo}}} = response;
            setImages(photo);
            console.log(photo)
        })
        .catch(error=>error)
    
},[searchTerm])
const keyHandler = (key) => {
    setSearchTerm("")
    setSearchTerm(key);
}

// const url2 = `http://farm${images.farm}`
    return(
        <div>
            <div id="heading">
                <h1>My Gallary</h1>
                <div id="buttons">
                    <button onClick={()=>{keyHandler("mountain")}}>Mountain</button>
                    <button onClick={()=>{keyHandler("beach")}}>beach</button>
                    <button onClick={()=>{keyHandler("bird")}}>Birds</button>
                    <button onClick={()=>{keyHandler("cuisine")}}>Food</button>
                </div>
            </div>
            <div id="imageContainer">
                {images.map(item=>{
                    let farm = item.farm;
                    let server_id=item.server;
                    let photo_id = item.id;
                    let secret_id = item.secret;
                    const url2 = `https://farm${farm}.staticflickr.com/${server_id}/${photo_id}_${secret_id}.jpg`
                    return(
                        <div>
                           <img src={url2} alt="img" />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Navbar;