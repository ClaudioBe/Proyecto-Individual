import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame,getAllGenres } from "../../redux/actions";
import{Link} from 'react-router-dom';
import img from '../../img/videogame.png';
import './CreateVideogame.css'

function validate(input){
    const error={};
    input.name ?error.name=null :error.name="El videojuego debe tener un nombre"
    if(input.name.length>50) error.name = 'Nombre demasiado largo';
    
    input.description_raw ?error.description_raw=null 
                          :error.description_raw="El videojuego debe tener una descripción"

    const fecha=[];
    if(!input.released) error.released=null; 
    else{
        if(input.released==="%-%-%") fecha= input.released.split("-"); 
        if(fecha.length!=3 || fecha[0].length!=4 || fecha[1]!=2 || fecha[2]!=2) 
            error.released="El formato es aaaa-mm-dd y deben ser números";
        else error.released=null;
    }
    
    if(input.rating>5.0) error.rating='El rating no puede ser mayor a 5.0';
    if(input.rating<0) error.rating= "El rating no puede ser negativo";

    input.platforms ?error.platforms=null :error.platforms="Debe elegir al menos una plataforma"
    
    return error;
}
const CreateVideogame=()=>{
    const dispatch=useDispatch();
    useEffect(()=>dispatch(getAllGenres()),[])
    const genres=useSelector(state=>state.genres);

    const[error,setError]=useState({
        name:"El videojuego debe tener un nombre",
        description_raw:"El videojuego debe tener una descripción",
        platforms:"Debe elegir al menos una plataforma"})

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
            <div className="links">
                <Link className="linkCVHome" to='/'><img src={img} width="50px"/></Link>
                <Link className="linkCV" to ="/videogames"><button>Volver</button> </Link>
            </div>
            

            <form className="form" onSubmit={e=>handleSubmit(e)}>
                <label>Nombre: </label>
                <input className="input" type="text" name="name" value={input.name} onChange={handleChange}/>
                {error.name && (<p className="errors">{error.name}</p>)}

                <label>Descripción: </label>
                <textarea className="input"  name="description_raw" value={input.description_raw} onChange={handleChange}/>
                {error.description_raw && (<p className="errors">{error.description_raw}</p>)}

                <label>Fecha de lanzamiento: </label>
                <input className="input" placeholder="año-mes-día" type="text" name="released" value={input.released} onChange={handleChange}></input>
                {error.released &&(<p className="errors">{error.released}</p>)}

                <label>Rating: </label>
                <input className="input" type="float" name="rating" value={input.rating} onChange={handleChange}></input>
                {error.rating&&(<p className="errors">{error.rating}</p>)}

                <label>Imagen:</label>
                <input className="input" placeholder="https://...." type="text" name="background_image" value={input.background_image} onChange={handleChange}></input>
                
                <label>Plataformas: </label>
                <select onChange={handleSelectPlatforms}>
                    {platforms.map(p=><option value={p}>{p}</option>)}
                </select>
                <ul><li>{input.platforms.map(p=>p+ ", ")}</li></ul>
                {error.platforms && (<p className="errors">{error.platforms}</p>)}

                <label>Generos: </label>
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