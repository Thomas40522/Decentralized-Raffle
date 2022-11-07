import 'antd/dist/antd.css';
import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link

} from "react-router-dom";
// import { utils } from "ethers";

import Raffle from "./components/Raffle";
import RaffleList from "./components/RaffleList";
import Admin from './components/Admin';
import Winner from './components/Winner';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<RaffleList/>}/>
          <Route path='/raffle' element={<Raffle/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/winner' element={<Winner/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
