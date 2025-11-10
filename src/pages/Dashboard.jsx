import React from "react";
import Navbar from "../assets/navbar";
import Styles from "../styles/Dashboard.module.css";
import Footer from "../assets/Footer";
import { Navigate } from "react-router-dom";
import Login from "./Login";

// NOTE: You must replace 'employer-team.png' and 'worker-team.png' 
// with the actual paths or import statements for your images.
// For example: import employerImage from '../assets/employer-team.png';

function Dashboard() {

    function findJobsButton () {
        Navigate(<Login/>)
    }

  return (
    // Added a container class for full-height structure
    <div className={Styles.dashboardContainer}>
      <Navbar className={Styles.navbar}></Navbar>

      <div className={Styles.hero}>
        {/* Employer Section (Left) - Blue Gradient */}
        <div className={`${Styles.section} ${Styles.employerSection}`}>
          <h1>I'm an Employer</h1>
          <p>Looking for amazing hires</p>
          <button>START HIRING WORKERS</button>


          <img src="3.png" alt="Employer Team" className={Styles.sectionImg} />

          <div className={`${Styles.speechBubble} ${Styles.bubbleEmployer1}`}>

          </div>
          <div className={`${Styles.speechBubble} ${Styles.bubbleEmployer2}`}>
            Looking to grow my business
          </div>
          

        </div>

        {/* Worker Section (Right) - Light Background */}
        <div className={`${Styles.section} ${Styles.workerSection}`}>
          <h1>I'm a Filipino online worker</h1>
          <p>Looking for a remote job</p>
          <button onClick={findJobsButton}>START FINDING JOBS</button>

          {/* Image */}
          <img src="worker-team.png" alt="Online Worker Team" className={Styles.sectionImg} />
          
          {/* Speech Bubbles and Arrows */}
          <div className={`${Styles.speechBubble} ${Styles.bubbleWorker1}`}>
            Looking to make additional income
          </div>
          <div className={`${Styles.speechBubble} ${Styles.bubbleWorker2}`}>
          </div>

        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Dashboard;