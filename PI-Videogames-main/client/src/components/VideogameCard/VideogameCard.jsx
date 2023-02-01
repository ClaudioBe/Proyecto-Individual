import './VideogameCard.css';
import React from "react";
import {Link} from 'react-router-dom';
const VideogameCard=({id,name,genres,img})=>{
    return(
        <div className='containerCard'>
            <Link className='link' to={`/videogames/${id}`}>{name}</Link>
            <img className='imgCard' src={img}/>
            <h3>Generos: </h3>
            <div className='containerGenres'>
                <ul>{genres.map(g=> (<li>{g}</li>))}</ul>
            </div>
        </div>
    )
}
export default VideogameCard;