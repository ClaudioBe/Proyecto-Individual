import React, {useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogamesName, getAllGenres,getVideogamesGenre,order} from '../../redux/actions';
import VideogameCard from '../VideogameCard/VideogameCard';

const Videogames =()=>{
    const [input, setInput]= useState("")
    const handleChange=(e)=> {
        setInput(e.target.value)
    }
    const videogames=useSelector(state=>state.videogames);
    const genres=useSelector(state=>state.genres)
    useEffect(()=>dispatch(getAllGenres()),[])
    const dispatch=useDispatch();
    return (
        <>
        <input
            value={input}
            onChange={handleChange}
        />
        <button onClick={()=>dispatch(getAllVideogamesName(input))}>BUSCAR</button>
        {genres.map(g=>{
            return(
                <button onClick={()=>dispatch(getVideogamesGenre(g.name))}>
                    {g.name}
                </button>)
        })}
        <button onClick={()=>dispatch(order())}>A-Z</button>
        <button >Z-A</button>
        {videogames.map((v)=>{
            return(
                <VideogameCard
                    id={v.id}
                    key={v.id}
                    name={v.name}
                    genres={v.genres}
                    img={v.img}
                />
            )   
        })}
        </>
    )
}
export default Videogames;
