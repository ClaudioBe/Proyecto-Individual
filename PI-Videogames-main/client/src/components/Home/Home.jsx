import React, {useState,Suspense,lazy } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllGenres,filterVideogamesByGenre,alphabeticalOrder, getAllVideogames, createdOrExisting, OrderByRating} from '../../redux/actions';
import VideogameCard from '../VideogameCard/VideogameCard';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import img from '../../img/videogame.png';
import './Home.css'


const Loading="https://media.tenor.com/0o0T8nh8W4EAAAAj/sonic-is-runinng-run.gif";

const Home =()=>{
    const[loading,setLoading]=useState(false);
    const loadingCards=()=>{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false);
        },10000)
    }
    const [orderAz, setOrderAz]=useState("")
    const [orderByRat,setOrderByRat]=useState("")
    const handleFilterGenre=(e)=>{
        dispatch(filterVideogamesByGenre(e.target.value))
    }

    const handleFilterCreate=(e)=>{
        dispatch(createdOrExisting(e.target.value))
        setCurrentPage(1)
    }
    const handleOrderByName=(e)=>{
        dispatch(alphabeticalOrder(e.target.value))
        setCurrentPage(1);
        setOrderAz(e.target.value)
    }
    const handleOrderByRating=(e)=>{
        dispatch(OrderByRating(e.target.value))
        setCurrentPage(1);
        setOrderByRat(e.target.value);
    }
    const videogames=useSelector(state=>state.videogames);
    const genres=useSelector(state=>state.genres)
    const dispatch=useDispatch()
    useEffect(()=>dispatch(getAllGenres()),[])
    useEffect(()=>dispatch(getAllVideogames()),[])
    useEffect(()=>loadingCards(),[])
    
    //PAGINADO
    const[currentPage, setCurrentPage]=useState(1);
    const[videogamesPerPage,setVideogamesPerPage]=useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame- videogamesPerPage;
    const currentVideogames=videogames.slice(indexOfFirstVideogame,indexOfLastVideogame);

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }
    
    return loading?(<div className='loading'><img src={Loading}/></div>)
    :(
        <>
            <div className="buttonsSB">
                <Link className="linkLPHome" to='/'><img src={img} width="50px"/></Link>
                <SearchBar className="SB" setCurrentPage={setCurrentPage}/>
                <p className='sep'>Genero:</p>
                <select className="btnHome" onChange={handleFilterGenre}>
                    <option value = "all">Todos</option>
                    {genres.map(g=>(<option value={g.name}>{g.name}</option>))}
                </select>
                <p className='sep'>Orden alfabético: </p>
                <select className="btnHome" onChange={handleOrderByName}>
                    <option value="none">No</option>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <p className='sep'>Orden por rating: </p>
                <select className="btnHome" onChange={handleOrderByRating}>
                    <option value="none">No</option>
                    <option value="asc">menor a mayor</option>
                    <option value="desc">mayor a menor</option>
                </select>
                <p className='sep'>Creados o Existentes: </p>
                <select className="btnHome"onChange={handleFilterCreate}>
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="existing">Existentes</option>
                </select>
            </div>
            <hr />
            <Link  to='/videogames/create'><button className="create">Crear videojuego</button></Link>
            <hr />
            <Paginado
                videogamesPerPage={videogamesPerPage}
                videogames={videogames.length}
                paginado={paginado}
            />

            <div className='containerCards'>
                {currentVideogames?.map(v=>
                    (<VideogameCard 
                        id={v.id}
                        key={v.id}
                        name={v.name}
                        genres={v.genres}
                        img={v.img}
                    />)   
                )}
            </div>
            <Paginado
                videogamesPerPage={videogamesPerPage}
                videogames={videogames.length}
                paginado={paginado}
            />
        </>
    )
}
export default Home;
