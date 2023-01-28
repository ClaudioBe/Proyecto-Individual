import React from "react";
import {Link} from 'react-router-dom';
const VideogameCard=({id,name,genres,img})=>{
    return(
        <>
            <Link to={`/videogames/${id}`}>{name}</Link>
            <img src={img}/>
            <h2>Generos: </h2>
            {genres&&genres.map(g=>{return (<p>{g}</p>)})}
        </>
    )
}
export default VideogameCard;