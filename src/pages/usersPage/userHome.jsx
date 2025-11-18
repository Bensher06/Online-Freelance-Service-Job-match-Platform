import React from 'react';
// Import icons for the features section
import { Search, MapPin, Zap } from 'lucide-react';
// The import path is now valid because App.module.css is also being generated.
import Styles from '../../styles/jobseeker/usersHome.module.css'; 
import SignInPage from './SignInpage';

// Helper component for Navbar placeholder
const NavbarPlaceholder = () => (
  <header className={Styles.navbar}>
    <div className={Styles.logo}>Job+</div>
    <nav className={Styles.navLinks}>
      <a href="#" className={Styles.navLink}>Jobs</a>
      <a href="#" className={Styles.navLink}>About</a>
      <a href="SignInPage" className={Styles.signInButton}>Sign In</a>
    </nav>
  </header>
);

// Helper component for Footer placeholder
const FooterPlaceholder = () => (
  <footer className={Styles.footer}>
    <div className={Styles.footerContent}>
        <p className={Styles.footerText}>&copy; {new Date().getFullYear()} Job+. All rights reserved. Connecting communities one job at a time.</p>
    </div>
  </footer>
);

// New component for the Features Section
const FeaturesSection = () => {
    const features = [
        {
            icon: Search,
            title: "Smart Local Search",
            description: "Find jobs posted within your immediate area, cutting down on commute time and stress."
        },
        {
            icon: MapPin,
            title: "Pinpoint Location Match",
            description: "Our map view ensures you know exactly where the opportunity is, down to the street address."
        },
        {
            icon: Zap,
            title: "Fast Application",
            description: "Apply with one click using your saved profile. Get your resume in front of employers instantly."
        },
    ];

    return (
        <section className={Styles.featuresSection}>
            <div className={Styles.sectionHeader}>
                <h2 className={Styles.sectionTitle}>Why Job+ Works for You</h2>
                <p className={Styles.sectionSubtitle}>Simple, effective tools to get you hired faster.</p>
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

// Main App Component, representing the Home Page
const UsersHome = () => {
  return (
    <div className={Styles.container}>
      
      <NavbarPlaceholder />

      {/* Hero Section */}
      <section className={Styles.hero}>
        
        {/* Text Block (Left Side) */}
        <div className={Styles.textBlock}>
          <h1 className={Styles.textBlockTitle}>
            Find Local Jobs, With Less Hassle
          </h1>
          <p className={Styles.textBlockParagraph}>
            Job+ connects you to real opportunities right around your area.
            No noise. No stress. Just work that fits your path.
          </p>
          
          {/* CTA Button */}
          <button className={Styles.cta}>
            Find Your Job
          </button>
        </div>

        {/* Image (Right Side) */}
        <div className={Styles.heroImgContainer}>
          <img 
            src="https://placehold.co/600x400/2563EB/FFFFFF?text=Job+Search+Dashboard"
            alt="Dashboard Illustration" 
            className={Styles.heroImg} 
          />
        </div>

      </section>
      
      {/* New Features Section for Job Seekers */}
      <FeaturesSection />

      <FooterPlaceholder />
    </div>
  );
}

export default UsersHome;