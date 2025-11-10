import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React from "react"
import Dashboard from './pages/Dashboard'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signin from "./pages/Signin"
import UsersHome from "./pages/usersPage/userHome"
import SignInPage from "./pages/usersPage/SignInpage"
import AppHome from "./pages/usersPage/AppHome"


function App () {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/usersHome" element={<UsersHome/>}/>
        <Route path="/SignInPage" element={<SignInPage/>}/>
        <Route path="/AppHome" element={<AppHome/>}/>
      </Routes>
    </Router>
  )
}
export default App;