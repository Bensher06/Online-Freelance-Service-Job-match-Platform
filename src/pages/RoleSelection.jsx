import React, { useState, useEffect, useCallback } from "react";
import styles from "../styles/Signin.module.css";
import Footer from "../assets/Footer";

// Array of all available background image paths
const BACKGROUND_IMAGES = [
    "/bg1.png", "/bg2.png", "/bg3.png", "/bg4.png",
    "/bg5.png", "/bg6.png", "/bg7.png", "/bg8.png"
];

const NavbarPlaceholder = () => (
    <header className={styles.header}>
        <a href="/" className={styles.logo}>
            Job<span className={styles.plusSign}>+</span>
        </a>
        <nav className={styles.navLinks}>
            <a href="/employee/home" className={styles.navLink}>Jobs</a>
            <a href="/about" className={styles.navLink}>About</a>
        </nav>
    </header>
);

function RoleSelection() {
    const [currentBg, setCurrentBg] = useState(BACKGROUND_IMAGES[0]);
    const [isFading, setIsFading] = useState(false);

    // Function to select the next random background image
    const getNextBackground = useCallback(() => {
        const currentIndex = BACKGROUND_IMAGES.indexOf(currentBg);
        let nextIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);

        while (nextIndex === currentIndex) {
            nextIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length);
        }
        return BACKGROUND_IMAGES[nextIndex];
    }, [currentBg]);

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setIsFading(true); // Start fade-out

            const swapTimeout = setTimeout(() => {
                setCurrentBg(getNextBackground());
                setIsFading(false); // Trigger fade-in
            }, 500); // Wait 0.5s

            return () => clearTimeout(swapTimeout);
        }, 1500);

        return () => clearInterval(imageInterval);
    }, [getNextBackground]);


    // Handler to navigate to the Sign In page for a specific role
    const handleRoleSelect = (role) => {
        if (role === 'employer') {
            window.location.href = '/employer/home';
        } else if (role === 'employee') {
            window.location.href = '/employee/home';
        }
    };


    return (
        <div 
            className={`${styles.container} ${isFading ? styles.fading : ''}`} 
            style={{ 
                '--current-bg': `url(${currentBg})` // Set CSS variable for pseudo-element
            }}
        >
            <NavbarPlaceholder />
            
            <main className={styles.mainContent}>
                <div className={styles.centerCard}>
                  
                    <h1>Join Job+</h1>
                    <p className={styles.subtitle}>Please choose your role to find the best opportunities or talent.</p>

                    <div className={styles.roleSelectionGrid}>
                        {/* Role Card 1: Employee/Job Seeker */}
                        <div 
                            onClick={() => handleRoleSelect('employee')} 
                            className={styles.roleCard}
                            role="button"
                            tabIndex="0"
                        >
                            <i className="fas fa-briefcase role-icon"></i>
                            <h2>Job Seeker</h2>
                            <p>Find contract work, full-time roles, and apply with your professional profile.</p>
                            <button
                                className={`${styles.roleBtn} ${styles.employeeBtn}`}
                            >
                                Continue as Employee
                            </button>
                        </div>
                            
                        {/* Role Card 2: Employer */}
                        <div 
                            onClick={() => handleRoleSelect('employer')} 
                            className={styles.roleCard}
                            role="button"
                            tabIndex="0"
                        >
                            <i className="fas fa-building role-icon"></i>
                            <h2>Employer</h2>
                            <p>Post job openings and browse our database of highly skilled professionals.</p>
                            <button 
                                className={`${styles.roleBtn} ${styles.employerBtn}`}
                            >
                                Continue as Employer
                            </button>
                        </div>
                    </div>

                    <p className={styles.loginText}>
                        Already have an account? <a href="/login">Log in</a>
                    </p>

                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default RoleSelection;