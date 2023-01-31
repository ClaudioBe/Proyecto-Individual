import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams ,Link} from "react-router-dom";
import { getVideogameDetail } from "../../redux/actions";
import './VideogameDetail.css'

const VideogameDetail=()=>{
    const {id}=useParams();
    const dispatch= useDispatch();
    useEffect(()=>dispatch(getVideogameDetail(id)),[])
    const videogame=useSelector(state=>state.videogameDetail)
    

    return (
        <div className="containerDetail">
            <div className="nameAndButton">
                <h1>{videogame.name}</h1>
                <button className="buttonDetail"><Link to ='/videogames'>Volver</Link></button>
            </div>
            <img className="imgDetail" src={videogame.img}/>
            <p className="desc">{videogame.description}</p>
            
            <div className="infoContDetail">
                <div>
                    <h2>Generos </h2>
                    <ul>{videogame.genres?.map(g=>(<li><p>{g}</p></li>))}</ul>
                </div>
                <div className="divDetail">
                    <h2>Fecha de lanzamiento </h2>
                    {videogame.released}
                </div>
                <div className="divDetail">
                    <h2>Rating </h2> 
                    {videogame.rating}
                </div>
                <div className="divDetail">
                    <h2>Plataformas </h2> 
                    <ul>{videogame.platforms?.map(p=>(<li>{p}</li>))}</ul>
                </div>
                
            </div>
        </div>
    )
}
export default VideogameDetail;