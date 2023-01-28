import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Videogames from './components/Videogames/Videogames';
import InitialPage from './components/InitialPage/InitialPage'
import VideogameDetail from'./components/VideogameDetail/VideogameDetail';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element ={<InitialPage/>}/>
        <Route exact path='/videogames' element={<Videogames/>}/>
        <Route exact path='/videogames/:videogameId' element= {<VideogameDetail/>}/>
        <Route exact path='/videogame/create' element= {<CreateVideogame/>}/>
      </Routes>
    </div>
  );
}
export default App;
