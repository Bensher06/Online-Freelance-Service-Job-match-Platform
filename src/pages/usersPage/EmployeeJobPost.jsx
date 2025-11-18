import React, { useState } from 'react';
import styles from '../../styles/PostJobForm.module.css';

const PostJob = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        'job-title': '',
        'company-name': '',
        'job-type': '',
        location: '',
        salary: '',
        description: '',
        skills: '',
        'apply-info': '',
    });
    // State for submission feedback
    const [submitMessage, setSubmitMessage] = useState(null);

    // Handles changes to all form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // React equivalent of the form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submitted!', formData);
        
        // Simulate API submission success
        setSubmitMessage({
            text: 'Your job post has been submitted for review!',
            type: 'success'
        });

        // Optionally, reset form:
        // setFormData({ /* initial empty state */ });

        // Remove the message after a few seconds, replacing the vanilla JS setTimeout
        setTimeout(() => {
            setSubmitMessage(null);
        }, 4000);
    };
    
    // React equivalent of the sign-in button click handler
    const handleSignInClick = (e) => {
        e.preventDefault();
        console.log('Sign In clicked! This would open a login modal.');
    };

    return (
        <React.Fragment>
            {/* Header Component */}
            <header className={styles.header}>
                <a href="#" className={styles.logo}>
                    Job<span className={styles.plusSign}>+</span>
                </a>
                <nav className={styles.navLinks}>
                    <a href="#">Jobs</a>
                    <a href="#">About</a>
                </nav>
                <a href="#" className={styles.signInButton} onClick={handleSignInClick}>
                    Sign In
                </a>
            </header>

            {/* Main Content for Job Post Form */}
            <main className={styles.mainContent}>
                <div className={styles.postJobContainer}>
                    <h1>Post a New Opportunity</h1>
                    <div className={styles.jobFormCard}>
                        <form onSubmit={handleSubmit}>
                            
                            {/* Job Title */}
                            <div className={styles.formGroup}>
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" id="job-title" name="job-title" 
                                    placeholder="e.g., Senior React Developer" required
                                    value={formData['job-title']} onChange={handleChange}
                                />
                            </div>

                            {/* Company Name */}
                            <div className={styles.formGroup}>
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" id="company-name" name="company-name" 
                                    placeholder="e.g., Acme Inc."
                                    value={formData['company-name']} onChange={handleChange}
                                />
                                <p className={styles.helperText}>Leave blank if posting as an individual.</p>
                            </div>

                            {/* Row for Job Type & Location */}
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="job-type">Job Type</label>
                                    <select id="job-type" name="job-type" required
                                        value={formData['job-type']} onChange={handleChange}
                                    >
                                        <option value="">Select job type...</option>
                                        <option value="freelance">Contract / Freelance</option>
                                        <option value="full-time">Full-Time Employee</option>
                                        <option value="part-time">Part-Time Employee</option>
                                        <option value="internship">Internship</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="location">Location</label>
                                    <input type="text" id="location" name="location" 
                                        placeholder="e.g., New York, NY or 'Remote'" required
                                        value={formData.location} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Salary / Rate */}
                            <div className={styles.formGroup}>
                                <label htmlFor="salary">Salary / Rate (Optional)</label>
                                <input type="text" id="salary" name="salary" 
                                    placeholder="e.g., $90,000 - $110,000 / year or $80 / hour"
                                    value={formData.salary} onChange={handleChange}
                                />
                            </div>

                            {/* Job Description */}
                            <div className={styles.formGroup}>
                                <label htmlFor="description">Job Description</label>
                                <textarea id="description" name="description" 
                                    placeholder="Describe the role, responsibilities, and qualifications..." required
                                    value={formData.description} onChange={handleChange}
                                />
                            </div>

                            {/* Skills */}
                            <div className={styles.formGroup}>
                                <label htmlFor="skills">Skills Required</label>
                                <input type="text" id="skills" name="skills" 
                                    placeholder="e.g., React, Node.js, Project Management"
                                    value={formData.skills} onChange={handleChange}
                                />
                                <p className={styles.helperText}>Comma-separated skills.</p>
                            </div>
                            
                            {/* How to Apply */}
                            <div className={styles.formGroup}>
                                <label htmlFor="apply-info">How to Apply</label>
                                <input type="text" id="apply-info" name="apply-info" 
                                    placeholder="e.g., 'Apply on our company website' or 'Email resume to jobs@example.com'" required
                                    value={formData['apply-info']} onChange={handleChange}
                                />
                                <p className={styles.helperText}>Provide a link or email address.</p>
                            </div>

                            {/* Submit Button */}
                            <div className={styles.formGroup}>
                                <button type="submit" className={styles.submitButton}>
                                    Preview & Post Job
                                </button>
                                {submitMessage && (
                                    <p className={styles.submitMessage} style={{ color: submitMessage.type === 'success' ? 'green' : 'red' }}>
                                        {submitMessage.text}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            {/* Footer Component */}
            <footer className={styles.footer}>
                <p>&copy; 2025 Job+. All rights reserved. Connecting communities one job at a time.</p>
            </footer>
        </React.Fragment>
    );
};

export default PostJob;