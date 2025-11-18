import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/jobseeker/EmployerProfile.module.css'; 
import Navbar from '../../assets/Navbar';
import Footer from '../../assets/Footer';

// Mock Data
const mockEmployer = {
    id: "acme-inc-123",
    name: "Acme Inc.",
    website: "https://example.com",
    logoUrl: "https://placehold.co/100x100/007bff/white?text=A",
    description: "Acme Inc. is a leading manufacturer of widgets and gadgets. We are dedicated to innovation and quality, and we're always looking for talented individuals to join our team. Our mission is to disrupt the status quo with superior quality and unparalleled service.",
    openJobs: [
        {
            id: "1",
            "job-title": "Senior React Developer",
            "location": "Remote",
            "job-type": "full-time",
            "description": "We are looking for a senior React developer to build and maintain our cutting-edge web applications. Must have 5+ years experience.",
        },
        {
            id: "5",
            "job-title": "Product Manager",
            "location": "New York, NY",
            "job-type": "full-time",
            "description": "Join our product team to define the future of our flagship product. Requires 3+ years of PM experience in a SaaS environment.",
        },
    ]
};

/**
 * Component for a single job card.
 */
const JobCard = ({ job }) => {
    const jobTitle = job['job-title'] || 'N/A';
    const location = job.location || 'N/A';
    const jobType = (job['job-type'] || 'N/A').replace('-', ' ');
    const descriptionSnippet = (job.description || '...').substring(0, 100) + '...';

    return (
        <div className={styles.jobCard}>
            <h3>{jobTitle}</h3>
            <div className={styles.jobDetails}>
                <div className={styles.detailItem}>
                    <i className="fas fa-map-marker-alt"></i> {location}
                </div>
                <div className={styles.detailItem}>
                    <i className="fas fa-briefcase"></i> {jobType}
                </div>
            </div>
            <p className={styles.jobDescription}>{descriptionSnippet}</p>
            {/* Link to Job Details Page */}
            <a href={`/jobs/details/${job.id}`} className={styles.viewJobButton}>
                View Job
            </a>
        </div>
    );
};

const ClientProfile = () => {
    const [employer, setEmployer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadEmployerData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        console.log('Simulating data fetch...');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            if (!mockEmployer) {
                throw new Error("Employer not found.");
            }
            
            setEmployer(mockEmployer);
        } catch (err) {
            console.error("Fetch error:", err);
            setError("An error occurred while loading the profile.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEmployerData();
    }, [loadEmployerData]);

    if (isLoading || error) {
        return (
            <React.Fragment>
                <Navbar />
                <main className={styles.mainContent}>
                    <div className={styles.loadingState}>
                        {isLoading && <p><i className="fas fa-spinner fa-spin"></i> Loading employer profile...</p>}
                        {error && <p>Error: {error}</p>}
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
    
    const isJobEmpty = employer.openJobs.length === 0;
    const websiteLink = employer.website.replace('https://', '').replace('http://', '');
    
    return (
        <React.Fragment>
            <Navbar />
            
            <main className={styles.mainContent}>
                <div className={styles.profileContainer}>
                    
                    <section className={styles.employerHeaderCard}>
                        <div className={styles.employerLogo}>
                            {employer.logoUrl ? (
                                <img src={employer.logoUrl} alt={`${employer.name} Logo`} />
                            ) : (
                                <i className="fas fa-building"></i>
                            )}
                        </div>
                        <div className={styles.employerInfo}>
                            <h1>{employer.name}</h1>
                            <a 
                                href={employer.website} 
                                className={styles.employerWebsite} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {websiteLink}
                            </a>
                        </div>
                    </section>

                    <section className={styles.profileBody}>
                        <aside className={styles.aboutCard}>
                            <h2>About Us</h2>
                            <p>{employer.description}</p>
                        </aside>
                        
                        <div className={styles.openJobsContainer}>
                            <h2>Open Positions</h2>
                            <div className={styles.jobListingsContainer}>
                                {isJobEmpty ? (
                                    <div className={styles.emptyState}>
                                        <p>This employer has no open jobs right now.</p>
                                    </div>
                                ) : (
                                    employer.openJobs.map(job => (
                                        <JobCard key={job.id} job={job} />
                                    ))
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            
            <Footer />
        </React.Fragment>
    );
};

export default ClientProfile;