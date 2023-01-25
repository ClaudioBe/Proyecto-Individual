import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import InitialPage from './components/InitialPage/InitialPage'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element ={<InitialPage/>}/>
        <Route exact path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}
export default App;
