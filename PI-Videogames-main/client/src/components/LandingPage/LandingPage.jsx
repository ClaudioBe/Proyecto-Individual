import './LandingPage.css';
import React from 'react';
import {Link} from 'react-router-dom';
// import img from '../../img/videogame.png';

const img="https://th.bing.com/th/id/R.803e00f86a4a47761aa670a059a4eb1a?rik=804nOnaP2T1LHQ&pid=ImgRaw&r=0&sres=1&sresct=1"
const img2="https://vignette.wikia.nocookie.net/deadliestfiction/images/8/8e/Kratos_Profile.png/revision/latest?cb=20131226013058"
const img3="https://th.bing.com/th/id/R.a0ecaf1749a989a9b3ac742cd3c884fc?rik=Wwrv%2bxV60K2azg&riu=http%3a%2f%2fwww.mortalkombatwarehouse.com%2fmkx%2fscorpion%2fmobile_03.png&ehk=WWxztP%2bSnwpNfOoh7e1sxDmyRGthN8hf62rAQ6RUS1E%3d&risl=&pid=ImgRaw&r=0"
const img4="https://th.bing.com/th/id/R.9bebaad9038923e3eaed76729573574c?rik=AZjKzgbQIYxe6g&riu=http%3a%2f%2fvignette1.wikia.nocookie.net%2fsnk%2fimages%2fe%2fec%2fKyo-kofxiii-win.png%2frevision%2flatest%3fcb%3d20130413222241&ehk=3OTGR7w5EGsV7uAwG6qk6v%2b3pT7OoSWJNtq4rX6QfQA%3d&risl=&pid=ImgRaw&r=0"
const img5="https://th.bing.com/th/id/OIP.sGB1Fo0e5Mg4whU0I7xRfQAAAA?pid=ImgDet&w=300&h=300&rs=1"
const img6="https://vignette.wikia.nocookie.net/godofwar/images/d/d2/Kratos_render.png/revision/latest?cb=20141103214656&path-prefix=es"
// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)

const LandingPage= ()=>{
    return (
        <div className='LP'>
            <div>
                <img src={img5} width ="200px"/>
                <img src={img} width="200px"/>    
            </div>
            <div className='imgs2'>
                <img src={img3} width="300px" />
                <img src={img6} width="300px"/>
                <img src={img4} width="300px" />
            </div>
            <Link to='/videogames'><button className='buttonLP' >Videogames</button></Link>
        </div>
    )
}
export default LandingPage;