import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../../redux/actions";

const VideogameDetail=(props)=>{

    const dispatch= useDispatch();
    useEffect(()=>dispatch(getVideogameDetail(1)),[])
    const videogame=useSelector(state=>state.videogameDetail)
    

    return (
        <>
            <h1>{videogame.name}</h1>
            <img src={videogame.img}/>
            <h2>Generos: </h2>
            {videogame.genres.map(g=>(<p>{g}</p>))}
            {<h3>{videogame.description}</h3>}
            <h2>Fecha de lanzamiento: {videogame.released}</h2>
            <h2>Rating: {videogame.rating}</h2> 
            <h2>Plataformas: </h2> 
            {/* {videogame.platforms.map(p=>(<p>{p}</p>))} */}
        </>
    )
}
export default VideogameDetail;