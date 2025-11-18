import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/jobseeker/FreelancerProfile.module.css';
import Navbar from '../../assets/Navbar';
import Footer from '../../assets/Footer';

// Mock Data structure based on the provided vanilla JS
const mockEmployee = {
    id: "user-jane-doe-456",
    name: "Jane Doe",
    title: "Senior UX/UI Designer",
    avatarUrl: "https://placehold.co/120x120/007bff/white?text=JD",
    rate: "$85 / hour",
    location: "Remote (Based in New York, NY)",
    email: "jane.doe@example.com",
    bio: "I am a passionate UX/UI designer with over 7 years of experience in creating intuitive and engaging digital experiences. I specialize in mobile app design, user research, and interactive prototyping. I love solving complex problems and turning ideas into beautiful, user-friendly products.",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Mobile App Design", "HTML/CSS"],
    experience: [
        {
            title: "Lead UX Designer",
            company: "DesignCo",
            dates: "2021 - Present",
            description: "Led the redesign of a major e-commerce mobile app, resulting in a 30% increase in user engagement. Mentored junior designers and established a new design system."
        },
        {
            title: "Senior Product Designer",
            company: "Tech Solutions Ltd.",
            dates: "2018 - 2021",
            description: "Worked on B2B SaaS products, conducting user research and creating wireframes, mockups, and prototypes for new features."
        },
    ]
};

// Helper component for a single experience item
const ExperienceItem = ({ item }) => (
    <div className={styles.experienceItem}>
        <h3>{item.title}</h3>
        <div className={styles.companyDate}>
            {item.company}
            <span className={styles.date}>({item.dates})</span>
        </div>
        <p>{item.description}</p>
    </div>
);


const FreelancerProfile = () => {
    const [employee, setEmployee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadEmployeeData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); 
            
            if (!mockEmployee) { 
                throw new Error("Profile not found.");
            }
            
            setEmployee(mockEmployee);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("An error occurred while loading the profile.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEmployeeData();
    }, [loadEmployeeData]);

    if (isLoading || error) {
        return (
            <React.Fragment>
                <Navbar />
                <main className={styles.mainContent}>
                    <div id="loading-state" className={styles.loadingState}>
                        <p>{isLoading ? 'Loading profile...' : `Error: ${error}`}</p>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
    
    return (
        <React.Fragment>
            <Navbar />
            
            <main className={styles.mainContent}>
                <div className={styles.profileContainer}>
                    
                    {/* Left Column: Sidebar */}
                    <aside className={styles.profileSidebar}>
                        <div className={styles.profileCard}>
                            <div className={styles.profileAvatar}>
                                {employee.avatarUrl ? (
                                    <img src={employee.avatarUrl} alt={`${employee.name} Avatar`} />
                                ) : (
                                    <i className="fas fa-user"></i>
                                )}
                            </div>
                            <h1 className={styles.userName}>{employee.name}</h1>
                            <p className={styles.jobTitle}>{employee.title}</p>
                            
                            <a href={`mailto:${employee.email}`} className={styles.contactButton}>
                                Contact Me
                            </a>
                            
                            <ul className={styles.profileDetails}>
                                <li className={styles.detailRate}><i className="fas fa-money-bill-wave"></i> {employee.rate}</li>
                                <li className={styles.detailLocation}><i className="fas fa-map-marker-alt"></i> {employee.location}</li>
                                <li className={styles.detailEmail}><i className="fas fa-envelope"></i> {employee.email}</li>
                            </ul>
                            
                            {/* Link to Edit Profile */}
                            <a href="/employee/profile/edit" className={styles.contactButton} style={{marginTop: '15px', backgroundColor: 'transparent', color: 'var(--primary-blue)', border: '1px solid var(--primary-blue)'}}>
                                Edit Profile
                            </a>
                        </div>
                    </aside>
                    
                    {/* Right Column: Main Content */}
                    <div className={styles.profileMain}>
                        
                        {/* About Me */}
                        <section className={styles.profileSectionCard}>
                            <h2>About Me</h2>
                            <p className={styles.userBio}>{employee.bio}</p>
                        </section>
                        
                        {/* Skills */}
                        <section className={styles.profileSectionCard}>
                            <h2>Top Skills</h2>
                            <div className={styles.skillsContainer}>
                                {employee.skills && employee.skills.length > 0 ? (
                                    employee.skills.map(skill => (
                                        <span key={skill} className={styles.tag}>{skill}</span>
                                    ))
                                ) : (
                                    <p className={styles.noSkills}>No skills listed.</p>
                                )}
                            </div>
                        </section>
                        
                        {/* Experience */}
                        <section className={styles.profileSectionCard}>
                            <h2>Experience</h2>
                            <div className={styles.experienceList}>
                                {employee.experience && employee.experience.length > 0 ? (
                                    employee.experience.map((item, index) => (
                                        <ExperienceItem key={index} item={item} />
                                    ))
                                ) : (
                                    <p>No experience listed.</p>
                                )}
                            </div>
                        </section>
                    </div>
                    
                </div>
            </main>

            <Footer />
        </React.Fragment>
    );
};

export default FreelancerProfile;