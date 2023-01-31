import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame,getAllGenres } from "../../redux/actions";
import{Link} from 'react-router-dom';

function validate(input){
    const error={};
    if(input.name.length>50) error.name = 'Nombre demasiado largo';
    
    if(input.rating>5.0) error.rating='El rating no puede ser mayor a 5.0';

    if(input.rating<0) error.rating= "El rating no puede ser negativo";
    
    return error;
}
const CreateVideogame=()=>{
    const dispatch=useDispatch();
    const genres=useSelector(state=>state.genres);

    const[error,setError]=useState({})
    const[input,setInput]=useState({
        name:"",
        description_raw:"",
        released:"",
        rating:0,
        background_image:"",
        genres:[],
        platforms:[]
    })
    const platforms=[
        "Android",
        "Linux",
        "Xbox 360",
        "Xbox One",
        "Xbox Series S/X",
        "PlayStation",
        "PlayStation 2",
        "PlayStation 3",
        "PlayStation 4",
        "PlayStation 5",
        "PC",
        "Nintendo Switch",
        "Nintendo 64",
        "macOS",
        "Apple Macintosh",
        "Web"
    ]
    useEffect(()=>dispatch(getAllGenres(),console.log(platforms)),[])

    //Inputs
    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
        setError(validate({...input,[e.target.name]:e.target.value}))
    }
    //crear videojuego
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(createVideogame(input))
        alert("El videojuego fue creado!")
    }
    //Select
    const handleSelectGenres=(e)=>{
        setInput({
            ...input,
            genres:[...input.genres, e.target.value]
        })
    }
    const handleSelectPlatforms=(e)=>{
        setInput({
            ...input,
            platforms:[...input.platforms, e.target.value]
        })
    }
    return(
        <>
            <Link to ="/videogames"><button>Volver</button> </Link>

            <form onSubmit={e=>handleSubmit(e)}>
                <label>Nombre: </label>
                <input type="text" name="name" value={input.name} onChange={handleChange}/>
                {error.name && (<p>{error.name}</p>)}

                <label>Descripción: </label>
                <textarea  name="description_raw" value={input.description_raw} onChange={handleChange}/>

                <label>Fecha de lanzamiento: </label>
                <input placeholder="año-mes-día" type="text" name="released" value={input.released} onChange={handleChange}></input>

                <label>Rating: </label>
                <input type="float" name="rating" value={input.rating} onChange={handleChange}></input>

                <label>Imagen:</label>
                <input placeholder="https://...." type="text" name="background_image" value={input.background_image} onChange={handleChange}></input>
                
                <select onChange={handleSelectPlatforms}>
                    {platforms.map(p=><option value={p}>{p}</option>)}
                </select>
                <ul><li>{input.platforms.map(p=>p+ ", ")}</li></ul>
                
                <select onChange={handleSelectGenres}>
                    {genres.map(g=><option value={g.name}>{g.name}</option>)}
                </select>
                <ul><li>{input.genres.map(g=>g+ ", ")}</li></ul>

                

                <button type="submit">Crear Videojuego</button>
            </form>
        </>
        
    )
}

export default CreateVideogame;