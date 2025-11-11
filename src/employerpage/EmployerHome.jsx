import React from 'react';
// Import icons for the features section
// Icons: ClipboardList (for managing applications), Map (for local reach), Megaphone (for posting)
import { ClipboardList, Map, Megaphone } from 'lucide-react'; 
// Use the new styles file
import Styles from '../styles/EmployerHome.module.css'; 


const NavbarPlaceholder = () => (
    <header className={Styles.navbar}>
        <div className={Styles.logo}>Job+</div>
        <nav className={Styles.navLinks}>
            <a href="#" className={Styles.navLink}>Post a Job</a>
            <a href="#" className={Styles.navLink}>Pricing</a>
            <a href="EmployerSignInPage" className={Styles.signInButton}>Employer Login</a>
            <a href="./EmployerSignInPage/EmployerSignUp" className={Styles.signInButton2}>Sign Up</a>
        </nav>
    </header>
);

// Helper component for Footer placeholder (keeping the same footer structure)
const FooterPlaceholder = () => (
    <footer className={Styles.footer}>
        <div className={Styles.footerContent}>
            <p className={Styles.footerText}>&copy; {new Date().getFullYear()} Job+. All rights reserved. Connecting communities one job at a time.</p>
        </div>
    </footer>
);

// New component for the Features Section (Employer-focused)
const EmployerFeaturesSection = () => {
    const features = [
        {
            icon: Map,
            title: "Hyper-Local Reach",
            description: "Target candidates living within your immediate operating area, ensuring relevant and committed applicants."
        },
        {
            icon: ClipboardList,
            title: "Simple Applicant Tracking",
            description: "Manage, review, and communicate with all your local applicants through a clean, intuitive dashboard."
        },
        {
            icon: Megaphone,
            title: "Post in Minutes",
            description: "Our streamlined posting process gets your vacancy live and in front of local job seekers instantly."
        },
    ];

    return (
        <section className={Styles.featuresSection}>
            <div className={Styles.sectionHeader}>
                <h2 className={Styles.sectionTitle}>Recruitment Made Simple</h2>
                <p className={Styles.sectionSubtitle}>Find quality local talent without the hassle of national job boards.</p>
            </div>
            
            <div className={Styles.featuresGrid}>
                {features.map((feature, index) => (
                    <div key={index} className={Styles.featureCard}>
                        <feature.icon className={Styles.featureIcon} />
                        <h3 className={Styles.featureTitle}>{feature.title}</h3>
                        <p className={Styles.featureDescription}>{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// Main App Component, representing the Employer Home Page
const EmployerHome = () => {
    return (
        <div className={Styles.container}>
            
            <NavbarPlaceholder />

            {/* Hero Section (Employer-focused) */}
            <section className={Styles.hero}>
                
                {/* Text Block (Left Side) */}
                <div className={Styles.textBlock}>
                    <h1 className={Styles.textBlockTitle}>
                        Find Your Next Local Hire, Fast
                    </h1>
                    <p className={Styles.textBlockParagraph}>
                        Recruit candidates who are close by and ready to work. 
                        Job+ connects local businesses with the right community talent.
                    </p>
                    
                    {/* CTA Button */}
                    <button className={Styles.cta}>
                        Post a Job Now
                    </button>
                </div>

                {/* Image (Right Side) - Placeholder updated for employer focus */}
                <div className={Styles.heroImgContainer}>
                    <img 
                        src="https://placehold.co/600x400/1D4ED8/FFFFFF?text=Employer+Hiring+Dashboard" // Blue background for contrast
                        alt="Employer Dashboard Illustration" 
                        className={Styles.heroImg} 
                    />
                </div>

            </section>
            
            {/* Employer Features Section */}
            <EmployerFeaturesSection />

            <FooterPlaceholder />
        </div>
    );
}

export default EmployerHome;