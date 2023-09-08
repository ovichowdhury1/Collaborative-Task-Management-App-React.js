import React from 'react';
import Dashboard from "./Home/Dashboard";
import Home from './Components/Home';
import Login from './Components/Login';
import Errror from './Components/Errror';
import {Routes,Route} from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/details' element={<Dashboard/>} />
        <Route path='*' element={<Errror />} />
      </Routes>
    </>
    );
}

export default App;


