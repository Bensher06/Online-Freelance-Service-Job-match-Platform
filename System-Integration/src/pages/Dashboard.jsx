import React from "react";
import Navbar from "../assets/navbar";
import Styles from "../styles/Dashboard.module.css"

function Dashboard () {

    return(
        <div>
            <Navbar className={Styles.navbar}></Navbar>
            <div className={Styles.hello}>
                <div className={Styles.qoute}>
                <h1>Find Local Jobs, With Less Hassle</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab aliquam, ipsam delectus veritatis nobis iste minus, aut pariatur quia hic eum dicta dolores doloribus! Itaque placeat culpa inventore hic. Nobis.</p>
                <button >Find your Job</button>
                </div>
                <img src="ini.png" alt="img" />
                </div>
            
        </div>
    )
}

export default Dashboard;