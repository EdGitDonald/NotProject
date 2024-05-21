import { useState } from 'react'
import './App.css'
import Homepage from './Pages/Homepage/Homepage'
import Banner from './Components/Banner/Banner'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {


  return (
    <BrowserRouter>
       <Banner />
     <Routes>
       <Route path='/' element={<Homepage/>}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App


