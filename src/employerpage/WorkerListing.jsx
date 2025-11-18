import React, { useState } from 'react';
import styles from '../styles/jobseeker/WorkerListing.module.css';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';

// Data Array for Mock Worker Cards
const mockWorkers = [
    {
        id: 1, name: "Jane S.", title: "Expert Virtual Assistant",
        avatar: "https://placehold.co/60x60/e0e0e0/333?text=JS",
        bio: "5+ years experience helping busy executives with email management, scheduling, and data entry. Highly organized and detail-oriented.",
        skills: ["Virtual Assistant", "Data Entry", "Email Handling", "Admin Support"],
        rate: "$800", rateTime: "/ month", rating: 4.9, reviewCount: 112
    },
    {
        id: 2, name: "Michael R.", title: "Full-Stack Developer",
        avatar: "https://placehold.co/60x60/e0e0e0/333?text=MR",
        bio: "Senior developer specializing in React and Node.js. Passionate about building fast, responsive, and scalable web applications.",
        skills: ["React.js", "Node.js", "JavaScript", "SQL", "AWS"],
        rate: "$45", rateTime: "/ hour", rating: 5.0, reviewCount: 84
    },
    {
        id: 3, name: "Alicia C.", title: "UI/UX & Graphic Designer",
        avatar: "https://placehold.co/60x60/e0e0e0/333?text=AC",
        bio: "Creative designer with a focus on user-centric and beautiful interfaces. Proficient in Figma, Adobe XD, and the complete Adobe Suite.",
        skills: ["Figma", "UI/UX", "Photoshop", "Web Design"],
        rate: "$35", rateTime: "/ hour", rating: 4.8, reviewCount: 95
    },
    {
        id: 4, name: "David K.", title: "SEO & Content Writer",
        avatar: "https://placehold.co/60x60/e0e0e0/333?text=DK",
        bio: "I help businesses rank on Google. Specializing in technical SEO, keyword research, and high-quality blog content that converts.",
        skills: ["SEO", "Content Writing", "Copywriting", "Ahrefs"],
        rate: "$1,200", rateTime: "/ month", rating: 4.9, reviewCount: 71
    },
    {
        id: 5, name: "Sarah M.", title: "Social Media Manager",
        avatar: "https://placehold.co/60x60/e0e0e0/333?text=SM",
        bio: "Let's grow your brand! I create engaging content, manage ad campaigns, and build communities on Instagram, Facebook, and TikTok.",
        skills: ["Social Media", "Content Creation", "Facebook Ads", "Canva"],
        rate: "$25", rateTime: "/ hour", rating: 4.7, reviewCount: 58
    },
    {
        id: 6, name: "Robert L.", title: "QuickBooks Bookkeeper",
        avatar: "https://placehold.co/60x60/e0e0e0/333?text=RL",
        bio: "Certified QuickBooks ProAdvisor. I handle reconciliations, payroll, and financial reports so you can focus on your business.",
        skills: ["Bookkeeping", "QuickBooks", "Payroll", "Finance"],
        rate: "$30", rateTime: "/ hour", rating: 5.0, reviewCount: 102
    },
];

// Helper Component for a single worker card
const WorkerCard = ({ worker }) => {
    const handleCardClick = () => {
        // Navigate to the public freelancer profile view
        window.location.href = `/employee/profile/${worker.id}`;
        console.log(`Navigating to profile for worker ID: ${worker.id}`);
    };

    return (
        <div className={styles.workerCard} onClick={handleCardClick}>
            <div className={styles.workerCardContent}>
                <div className={styles.workerHeader}>
                    <img src={worker.avatar} alt={worker.name} />
                    <div className={styles.workerInfo}>
                        <h3>{worker.name}</h3>
                        <p>{worker.title}</p>
                    </div>
                </div>
                <p className={styles.workerBio}>{worker.bio}</p>
                <div className={styles.workerSkills}>
                    {worker.skills.map(skill => (
                        <span key={skill} className={styles.skillTag}>{skill}</span>
                    ))}
                </div>
                <div className={styles.workerFooter}>
                    <div className={styles.workerRate}>
                        <span>{worker.rate}</span> <span className={styles.time}>{worker.rateTime}</span>
                    </div>
                    <div className={styles.workerRating}>
                        <i className="fas fa-star"></i> {worker.rating.toFixed(1)} <span className={styles.reviewCount}>({worker.reviewCount})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WorkerListings = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const handleSearchClick = () => {
        console.log('Searching for:', searchQuery || 'all workers');
        // In a real app, this would trigger an API call or filter mockWorkers
    };

    const handleFilterClick = () => {
        console.log('Filter modal opening...');
    };

    return (
        <React.Fragment>
            {/* Header Component (Using shared Navbar) */}
            <Navbar />

            <main className={styles.mainContent}>
                
                {/* Search and Filter Bar */}
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        <i className="fas fa-search icon"></i>
                        <input 
                            type="text" 
                            placeholder="Search by skill (e.g., 'Virtual Assistant', 'React Developer')"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button className={styles.filterButton} onClick={handleFilterClick}>
                        <i className="fas fa-filter"></i> Filters
                    </button>
                    <button className={styles.searchButton} onClick={handleSearchClick}>
                        Search
                    </button>
                </div>

                <h1 className={styles.pageTitle}>Find Your Next Hire</h1>

                {/* Worker Profile Listings Grid */}
                <div className={styles.jobListingsContainer}>
                    {mockWorkers.map(worker => (
                        <WorkerCard key={worker.id} worker={worker} />
                    ))}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </React.Fragment>
    );
};

export default WorkerListings;