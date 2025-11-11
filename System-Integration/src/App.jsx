import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React from "react"
import Dashboard from './pages/Dashboard'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signin from "./pages/Signin"

function App () {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </Router>
  )
}
export default App;