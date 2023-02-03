import './LandingPage.css';
import React from 'react';
import {Link} from 'react-router-dom'
import img from '../../img/videogame.png'
// import img from '../../img/videogame.png';

const img1="https://th.bing.com/th/id/R.803e00f86a4a47761aa670a059a4eb1a?rik=804nOnaP2T1LHQ&pid=ImgRaw&r=0&sres=1&sresct=1"
const img3="https://th.bing.com/th/id/R.a0ecaf1749a989a9b3ac742cd3c884fc?rik=Wwrv%2bxV60K2azg&riu=http%3a%2f%2fwww.mortalkombatwarehouse.com%2fmkx%2fscorpion%2fmobile_03.png&ehk=WWxztP%2bSnwpNfOoh7e1sxDmyRGthN8hf62rAQ6RUS1E%3d&risl=&pid=ImgRaw&r=0"
const img4="https://th.bing.com/th/id/R.9bebaad9038923e3eaed76729573574c?rik=AZjKzgbQIYxe6g&riu=http%3a%2f%2fvignette1.wikia.nocookie.net%2fsnk%2fimages%2fe%2fec%2fKyo-kofxiii-win.png%2frevision%2flatest%3fcb%3d20130413222241&ehk=3OTGR7w5EGsV7uAwG6qk6v%2b3pT7OoSWJNtq4rX6QfQA%3d&risl=&pid=ImgRaw&r=0"
const img6="https://vignette.wikia.nocookie.net/godofwar/images/d/d2/Kratos_render.png/revision/latest?cb=20141103214656&path-prefix=es"
const img8="https://i.pinimg.com/originals/37/b8/d1/37b8d1ed698a22414eaad06d856f4385.png"
const flecha="https://gifs.eco.br/wp-content/uploads/2022/07/gifs-de-flechas-40.gif"
// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)

const LandingPage= ()=>{
    return (
        <div className='LP'>
            <div className='imgs1'>
                <img src={img3} width="200px"/>  
                <img className="kratos"src={img6} width="200px"/>
                <img src={img4} width="200px" />
            </div>
            <div className='start'>
                <img src={flecha} width="70px" />
                <Link className="linkLP" to='/videogames' ><button className='buttonLP' >ENTRAR!</button></Link>
                <img className="rota-x" width="70px" src={flecha}/>
            </div>
            
            <div className="imgs2">
                <img src={img8} width="150px" height="200px"/>
                <img className="mario"src={img} width="300px" height="200px"/>
                <img src={img1} width="150px" height="200px" />
            </div>
            
        </div>
    )
}
export default LandingPage;