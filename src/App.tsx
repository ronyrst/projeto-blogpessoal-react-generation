import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { Grid } from '@material-ui/core';
import './App.css';
import Navbar from './components/static/navbar/Navbar'
import Footer from './components/static/footer/Footer'
import Home from './components/home/Home';

function App() {

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default App
