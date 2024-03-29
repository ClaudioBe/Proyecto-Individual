import React, { useEffect ,useState}from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams ,Link} from "react-router-dom";
import { getVideogameDetail } from "../../redux/actions";
import './VideogameDetail.css'

const Loading="https://media.tenor.com/0o0T8nh8W4EAAAAj/sonic-is-runinng-run.gif";

const VideogameDetail=()=>{
    const[loading,setLoading]=useState(false);
    const loadingCards=()=>{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false);
        },700)
    }
    const {id}=useParams();
    const dispatch= useDispatch();
    useEffect(()=>dispatch(getVideogameDetail(id)),[])
    useEffect(()=>loadingCards(),[])
    const videogame=useSelector(state=>state.videogameDetail)
    
    return loading ? (<div className='loading'><img src={Loading}/></div>) 
                   :(
        <div className="containerDetail">
            <div className="nameAndButton">
                <h1>{videogame.name}</h1>
                <Link to ='/videogames'><button className="buttonDetail">Volver</button></Link>
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