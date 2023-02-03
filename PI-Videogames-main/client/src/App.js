import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import VideogameDetail from'./components/VideogameDetail/VideogameDetail';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';
import axios from 'axios';
import LandingPage from './components/LandingPage/LandingPage';
axios.defaults.baseURL='http://localhost:3001/';

function App() {
  return(
      <div className="App">
        <Routes>
          <Route exact path='/' element ={<LandingPage />}/>
          <Route exact path='/videogames' element={<Home />}/>
          <Route exact path='/videogames/:id' element= {<VideogameDetail />}/>
          <Route exact path='/videogames/create' element= {<CreateVideogame/>}/>
        </Routes>
      </div>
    );
}
export default App;
