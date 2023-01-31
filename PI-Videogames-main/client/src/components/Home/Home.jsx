import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllGenres,filterVideogamesByGenre,alphabeticalOrder, getAllVideogames, createdOrExisting, OrderByRating} from '../../redux/actions';
import VideogameCard from '../VideogameCard/VideogameCard';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import './Home.css'

const Home =()=>{
    const [orderAz, setOrderAz]=useState("")
    const[orderByRat,setOrderByRat]=useState("")
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

    //PAGINADO
    const[currentPage, setCurrentPage]=useState(1);
    const[videogamesPerPage,setVideogamesPerPage]=useState(15)
    const indexOfLastVideogame = currentPage * videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame- videogamesPerPage;
    const currentVideogames=videogames.slice(indexOfFirstVideogame,indexOfLastVideogame);

    const paginado=(pageNumber)=>{
        setCurrentPage(pageNumber);
    }
    
    return (
        <>
           <SearchBar
           setCurrentPage={setCurrentPage}/>
            <select onChange={handleFilterGenre}>
                <option value = "Todos">Todos</option>
                {genres.map(g=>(
                    <option value={g.name}>
                        {g.name}
                    </option>))}
            </select>

            <select onChange={handleOrderByName}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>

            <select onChange={handleFilterCreate}>
                <option value="Todos">Todos</option>
                <option value="created">Creados</option>
                <option value="existing">Existentes</option>
            </select>
            
            <select onChange={handleOrderByRating}>
                <option value="asc">menor a mayor</option>
                <option value="desc">mayor a menor</option>
            </select>
            <Paginado
                videogamesPerPage={videogamesPerPage}
                videogames={videogames.length}
                paginado={paginado}
            />

        
            <Link to='/videogames/create'><button>Crear videojuego</button></Link>
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
            
        </>
    )
}
export default Home;
