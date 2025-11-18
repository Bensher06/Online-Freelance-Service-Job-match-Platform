import React from 'react';
import { ClipboardList, Map, Megaphone } from 'lucide-react'; 
import Styles from '../styles/EmployerHome.module.css'; 
// Import common layout components
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';


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
            
            <Navbar />

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
                    <a href="/employer/post-job" className={Styles.cta}>
                        Post a Job Now
                    </a>
                </div>

                {/* Image (Right Side) - Placeholder updated for employer focus */}
                <div className={Styles.heroImgContainer}>
                    <img 
                        src="https://placehold.co/600x400/1D4ED8/FFFFFF?text=Employer+Hiring+Dashboard" 
                        alt="Employer Dashboard Illustration" 
                        className={Styles.heroImg} 
                    />
                </div>

            </section>
            
            {/* Employer Features Section */}
            <EmployerFeaturesSection />

            <Footer />
        </div>
    );
}

export default EmployerHome;