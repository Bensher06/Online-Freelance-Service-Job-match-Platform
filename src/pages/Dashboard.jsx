import React from "react";
import Styles from "../styles/Dashboard.module.css";
import Footer from "../assets/Footer";
import { useNavigate } from "react-router-dom";
import Navbar from "../assets/Navbar";

function Dashboard() {
    const navigate = useNavigate();

    function navigateToEmployerHome(){
      navigate('/employer/home')
    }
    function navigateToEmployeeHome(){
      navigate('/employee/home')
    }
    
    // Removed unused findJobsButton function

  return (
    // Added a container class for full-height structure
    <div className={Styles.dashboardContainer}>
      {/* Removed Navbar usage for cleaner landing */}
      <Navbar/>

      <div className={Styles.hero}>
        {/* Employer Section (Left) - Blue Gradient */}
        <div className={`${Styles.section} ${Styles.employerSection}`}>
          <h1>I'm an Employer</h1>
          <p>Looking for amazing hires</p>
          <button onClick={navigateToEmployerHome}>START HIRING WORKERS</button>


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
          <button onClick={navigateToEmployeeHome}>START FINDING JOBS</button>

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