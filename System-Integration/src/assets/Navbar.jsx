import React from "react";
import Styles from "../styles/Navbar.module.css"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar (){
   const navigate = useNavigate();

  function loginButton() {
    navigate("/login");s
  }
  function signInButton() {
    navigate("/signin");s
  }
  function navigateHome (){
    navigate('/')
  }
    return(
        <div className={Styles.all}>

            <div className={Styles.logo} onClick={navigateHome}></div>
            
            
            <div className={Styles.login}>
                <p className={Styles.loginb}
                onClick={loginButton}>Log in</p>
                <button onClick={signInButton} >Sign in</button>
            </div>
        </div>
    )
}

export default Navbar;