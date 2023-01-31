import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getAllVideogamesName } from "../../redux/actions";

const SearchBar=({setCurrentPage})=>{
    const [input, setInput]= useState("")
    const dispatch=useDispatch();


    const handleChange=(e)=> {
        e.preventDefault()
        setInput(e.target.value); 
    }
    const handleClick=(e)=>{
        e.preventDefault();
        dispatch(getAllVideogamesName(input))
        setCurrentPage(1);
        
    }
    return(
        <>
             <input
                onChange={handleChange}
                placeholder= "Buscar..."
            />
            
            <button onClick={handleClick}>BUSCAR</button>
        </>
    )
}
export default SearchBar;