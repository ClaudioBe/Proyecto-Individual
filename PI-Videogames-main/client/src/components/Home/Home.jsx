import React, {useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllVideogamesName } from '../../redux/actions';

const Home =()=>{
    const [input, setInput]= useState("")
    const handleChange=(e)=> {
        setInput(e.target.value)
    }
    const dispatch=useDispatch();
    return (
        <>
        <input
            value={input}
            onChange={handleChange}
        />
        <button onClick={()=>dispatch(getAllVideogamesName(input))}>BUSCAR</button>
        
        </>
    )
}
export default Home;
