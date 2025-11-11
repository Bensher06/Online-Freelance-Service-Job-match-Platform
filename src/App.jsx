import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import React from "react"
import Dashboard from './pages/Dashboard'
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signin from "./pages/Signin"
import UsersHome from "./pages/usersPage/userHome"
import SignInPage from "./pages/usersPage/SignInpage"
import EmployerHome from "./employerpage/EmployerHome.jsx"
import EmployerSignInPage from "./employerpage/EmployerSignInPage.jsx"
import EmployerSignUp from "./employerpage/EmployerSignUp.jsx"
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
        <Route path="/EmployerHome" element={<EmployerHome/>}/>
        <Route path="/EmployerSignInPage" element={<EmployerSignInPage/>}/>
        <Route path="/EmployerSignInPage/EmployerSignUp" element={<EmployerSignUp/>}/>
      </Routes>
    </Router>
  )
}
export default App;