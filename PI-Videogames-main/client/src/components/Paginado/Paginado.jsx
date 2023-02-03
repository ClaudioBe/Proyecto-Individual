import React from "react";
import './Paginado.css'

const Paginado=({videogamesPerPage,videogames,paginado})=>{
    const pageNumbers=[]

    for(let i =0;i<Math.ceil(videogames/videogamesPerPage);i++){
        pageNumbers.push(i+1);
    }
    return(
        <nav>
            {pageNumbers?.map(n=>(
                <button className="btnPaginado" onClick={()=>paginado(n)}>{n}</button>  
            ))}
        </nav>
    )
}

export default Paginado;