import React from 'react';
import {Link} from 'react-router-dom';
import img from '../../img/videogame.png';

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)

const InitialPage= ()=>{
    return (
        <div>
            <img src={img} alt=""></img>
            <Link to='/home'><button>Home</button></Link>
        </div>
        
    )
}
export default InitialPage;