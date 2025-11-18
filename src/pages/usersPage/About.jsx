import React from 'react';
import styles from '../../styles/jobseeker/AboutUs.module.css';
import Navbar from '../../assets/Navbar';
import Footer from '../../assets/Footer';

const AboutUs = () => {
    return (
        <React.Fragment> 
            <Navbar />

            {/* Main Content for About Page */}
            <main className={styles.mainContent}>
                <div className={styles.aboutContainer}>
                    
                    <div className={styles.introCard}>
                        <h1>About Job+</h1>
                        <p className={styles.missionStatement}>
                            We believe finding meaningful work shouldn't be a chore.
                            Job+ was built to connect talented individuals with great companies in a simple, direct, and effective way.
                        </p>
                        <div className={styles.aboutText}>
                            <p>
                                In today's fast-paced market, the gap between employers and qualified candidates can feel wider than ever. Traditional job sites are often cluttered, expensive, or impersonal. 
                                We set out to change that.
                            </p>
                            <p>
                                Job+ is a streamlined platform designed for both sides of the hiring equation. For employers, we provide simple tools to post jobs and find the right talent. For job seekers, we offer a clean, filterable list of real opportunities without the fluff.
                            </p>
                        </div>
                    </div>

                    <h2>Why Choose Us?</h2>
                    
                    {/* Features Grid */}
                    <section className={styles.featuresGrid}>
                        <div className={styles.featureCard}>
                            <i className="fas fa-search-dollar" /> 
                            <h3>Direct Hiring Model</h3>
                            <p>We're not a middleman. Employers and freelancers connect directly. We don't take a cut of anyone's salary or contract rate.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className="fas fa-check-circle" />
                            <h3>Quality & Simplicity</h3>
                            <p>Our focus is on quality listings and an easy-to-use interface. No clutter, no distractions—just the tools you need to get hired or hire.</p>
                        </div>
                        <div className={styles.featureCard}>
                            <i className="fas fa-users" />
                            <h3>Community Focused</h3>
                            <p>We're building a community of professionals. Whether you're a startup or a seasoned freelancer, you have a place here.</p>
                        </div>
                    </section>
                </div>
            </main>

            <Footer/>
        </React.Fragment>
    );
};

export default AboutUs;