import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createVideogame } from "../../redux/actions";
export function validate(input){
    const error={};
    if(input.name.length>20) error.name = 'Nombre demasiado largo';
    
    if(input.rating>5.0) error.rating='El rating no puede ser mayor a 5.0';

    if(input.rating<0) error.rating= "El rating no puede ser negativo";
    
    return error;
}
const CreateVideogame=()=>{
    const [error,setError]=useState({})
    const[input,setInput]=useState({
        name:"",
        description:"",
        released:"",
        rating:0,
        genres:[],
        platforms:[]
    })

    const dispatch=useDispatch();

    const handleChange=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
        setError(validate({...input,[e.target.name]:e.target.value}))
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(error.length===0) dispatch(createVideogame(input))
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Nombre: </label>
            <input type="text" name="name" value={input.name} onChange={handleChange}/>
            {error.name && (<p>{error.name}</p>)}

            <label>Descripción: </label>
            <textarea  name="description" value={input.description} onChange={handleChange}/>

            <label>Fecha de lanzamiento: </label>
            <input type="text" name="released" value={input.released} onChange={handleChange}></input>

            <label>Rating: </label>
            <input type="float" name="rating" value={input.rating} onChange={handleChange}></input>
        </form>
    )
}

export default CreateVideogame;