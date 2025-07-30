import React from 'react'
import  LoginSignup  from './views/LoginSignup.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"


const App = () => {
  return (
    <BrowserRouter>
    <Toaster/>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App