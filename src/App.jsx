import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Login from './Page/Login';
import Signup from './Page/Signup';
import DetailAboutProject from './Page/DetailAboutProject';
import FindWork from './Page/FindWork';
import Allbidders from './Page/Allbidders';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/signup' element = {<Signup/>}/>
        <Route path = '/detailproject' element = {<DetailAboutProject/>}/>
        <Route path = '/findWork' element = {<FindWork/>}/>
        <Route path = '/allbidder' element = {<Allbidders/>}/>
      </Routes>

    </Router>
   
  )
}

export default App
