import React, { useState, useEffect, useMemo, useCallback } from 'react';
import styles from '../../styles/AppHome.module.css';
import NavBarLoggedIn from '../../assets/navbarLogin';

// Mock data for the job board
const initialJobs = [
    { id: 1, title: 'Senior Software Engineer', company: 'Innovatech Solutions', location: 'Remote', salary: 140000, type: 'Full-Time', posted: '2 days ago' },
    { id: 2, title: 'Product Manager', company: 'DataFlow Systems', location: 'New York, NY', salary: 120000, type: 'Full-Time', posted: '1 week ago' },
    { id: 3, title: 'UX Designer', company: 'Creative Agency X', location: 'San Francisco, CA', salary: 95000, type: 'Contract', posted: '3 hours ago' },
    { id: 4, title: 'Data Analyst', company: 'Global Metrics', location: 'Remote', salary: 80000, type: 'Part-Time', posted: '4 days ago' },
    { id: 5, title: 'Marketing Specialist', company: 'BrandBuilder Co.', location: 'Austin, TX', salary: 70000, type: 'Full-Time', posted: '1 month ago' },
];

// Helper component for the individual job card
const JobCard = React.memo(({ job, onApply }) => (
    <div className={styles.jobCard}>
        <div className={styles.jobInfo}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <p className={styles.jobDetail}>{job.company} - {job.location}</p>
            <p className={styles.jobDetail}>
                ${job.salary.toLocaleString()} • {job.type} • Posted {job.posted}
            </p>
        </div>
        <button className={styles.applyButton} onClick={() => onApply(job.id)}>
            Apply Now
        </button>
    </div>
));

// Main App component
const AppHome = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [sortBy, setSortBy] = useState('Date');
    const [jobs, setJobs] = useState(initialJobs);

    const availableJobTypes = ['All', 'Full-Time', 'Part-Time', 'Contract'];

    const handleApply = useCallback((jobId) => {
        // In a real application, this would handle the application submission
        console.log(`Applying for job ID: ${jobId}`);
        // Simple UI feedback
        alert(`Successfully submitted application for Job ID ${jobId}!`);
    }, []);

    const filteredAndSortedJobs = useMemo(() => {
        let currentJobs = [...jobs];

        // 1. Filter by search term
        if (searchTerm) {
            currentJobs = currentJobs.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 2. Filter by job type
        if (filterType !== 'All') {
            currentJobs = currentJobs.filter(job => job.type === filterType);
        }

        // 3. Sort
        currentJobs.sort((a, b) => {
            if (sortBy === 'Salary') {
                return b.salary - a.salary; // Highest salary first
            }
            // For 'Date', we'll rely on the original array order for this mock (or add a proper timestamp)
            return a.id - b.id;
        });

        return currentJobs;
    }, [jobs, searchTerm, filterType, sortBy]);

    return (
        <div className={styles.container}>
            
            <header className={styles.header}>
                <NavBarLoggedIn/>
                <div className={styles.controls}>
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search jobs, companies, or locations..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Filter Dropdown */}
                    <select
                        className={styles.dropdown}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option disabled>Filter by Type</option>
                        {availableJobTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    {/* Sort Dropdown */}
                    <select
                        className={styles.dropdown}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option disabled>Sort by</option>
                        <option value="Date">Latest</option>
                        <option value="Salary">Salary (High to Low)</option>
                    </select>
                </div>
            </header>

            <main>
                <p className={styles.resultCount}>
                    Showing {filteredAndSortedJobs.length} job(s)
                </p>

                <div className={styles.jobsList}>
                    {filteredAndSortedJobs.length > 0 ? (
                        filteredAndSortedJobs.map(job => (
                            <JobCard key={job.id} job={job} onApply={handleApply} />
                        ))
                    ) : (
                        <p className={styles.noResults}>No jobs match your current search criteria.</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AppHome;