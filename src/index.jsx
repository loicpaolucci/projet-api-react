import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import Authentification from './pages/Authentification';
import Connexion from './pages/Connexion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import  './style.scss';


const App = () => {
  return(

    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Authentification/>}/>
          <Route path='/login' element={<Connexion/>}/>
        </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(<App/>, document.getElementById("root"));