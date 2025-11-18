import React, { useState } from 'react';
import styles from '../../styles/jobseeker/PostJobForm.module.css';
import Navbar from '../../assets/Navbar';
import Footer from '../../assets/Footer';

const PostJobForm = () => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        jobCategory: '',
        jobDescription: '',
        jobSkills: '',
        payType: 'hourly', // Default to 'hourly'
        jobBudget: '',
        jobDuration: 'ongoing', // Default to 'ongoing'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value, type, checked, name } = e.target;
        
        // Handle radio buttons specifically
        if (type === 'radio' && checked) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        } else if (type !== 'radio') {
            setFormData(prevData => ({
                ...prevData,
                [id]: value,
            }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call to post job
        console.log("Submitting Job Data:", formData);
        
        try {
            // await api.postJob(formData);
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            
            alert(`Job posting "${formData.jobTitle || 'New Job'}" has been submitted!`);
            // Redirect after successful post
            window.location.href = '/employer/talent-search'; 

        } catch (error) {
            alert(`Error posting job: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const handleSaveDraft = () => {
        console.log("Saving Draft:", formData);
        alert('Job saved as draft!');
    };


    return (
        <React.Fragment>
            <Navbar /> 

            <main className={styles.mainContent}>
                
                <div className={styles.jobPostContainer}>
                    <div className={styles.jobPostHeader}>
                        <h1>Post a New Job Opening</h1>
                        <p>Fill out the details below to attract the best talent for your project.</p>
                    </div>
                    
                    <form className={styles.jobPostForm} onSubmit={handleFormSubmit}>
                        
                        <div className={styles.formSection}>
                            <h2>Job Details</h2>
                            <div className={styles.formGroup}>
                                <label htmlFor="jobTitle">Job Title</label>
                                <input 
                                    type="text" 
                                    id="jobTitle" 
                                    placeholder="e.g., 'Expert Virtual Assistant for Scheduling'" 
                                    required
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="jobCategory">Job Category</label>
                                <select 
                                    id="jobCategory" 
                                    required
                                    value={formData.jobCategory}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select a category...</option>
                                    <option value="va">Virtual Assistant</option>
                                    <option value="dev">Web Development</option>
                                    <option value="design">Graphic Design & UI/UX</option>
                                    <option value="writing">Content Writing & SEO</option>
                                    <option value="smm">Social Media Management</option>
                                    <option value="bookkeeping">Bookkeeping & Finance</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="jobDescription">Job Description</label>
                                <textarea 
                                    id="jobDescription" 
                                    placeholder="Describe the responsibilities, requirements, and what you're looking for in a candidate..." 
                                    required
                                    value={formData.jobDescription}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className={styles.formSection}>
                            <h2>Skills & Expertise</h2>
                            <div className={styles.formGroup}>
                                <label htmlFor="jobSkills">Required Skills</label>
                                <input 
                                    type="text" 
                                    id="jobSkills" 
                                    placeholder="e.g., Data Entry, Email Handling, Figma, React.js (comma-separated)"
                                    value={formData.jobSkills}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className={styles.formSection}>
                            <h2>Budget & Duration</h2>
                            <div className={styles.formGroup}>
                                <label>Payment Type</label>
                                <div className={styles.radioGroup} onChange={handleChange}>
                                    <div className={styles.radioOption}>
                                        <input 
                                            type="radio" 
                                            id="pay-hourly" 
                                            name="payType" 
                                            value="hourly" 
                                            checked={formData.payType === 'hourly'} 
                                        />
                                        <label htmlFor="pay-hourly" className={styles.radioLabel}>
                                            <i className="fas fa-clock"></i> Pay by Hour
                                        </label>
                                    </div>
                                    <div className={styles.radioOption}>
                                        <input 
                                            type="radio" 
                                            id="pay-fixed" 
                                            name="payType" 
                                            value="fixed"
                                            checked={formData.payType === 'fixed'}
                                        />
                                        <label htmlFor="pay-fixed" className={styles.radioLabel}>
                                            <i className="fas fa-tag"></i> Pay a Fixed Price
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="jobBudget">Budget / Rate</label>
                                    <input 
                                        type="text" 
                                        id="jobBudget" 
                                        placeholder="e.g., $10/hour or $800/month"
                                        value={formData.jobBudget}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="jobDuration">Estimated Duration</label>
                                    <select 
                                        id="jobDuration"
                                        value={formData.jobDuration}
                                        onChange={handleChange}
                                    >
                                        <option value="lt-1m">Less than 1 month</option>
                                        <option value="1-3m">1 to 3 months</option>
                                        <option value="3-6m">3 to 6 months</option>
                                        <option value="6m+">More than 6 months</option>
                                        <option value="ongoing">Ongoing Project</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.formFooter}>
                            <button 
                                type="button" 
                                className={styles.saveDraftButton} 
                                onClick={handleSaveDraft}
                                disabled={isSubmitting}
                            >
                                Save as Draft
                            </button>
                            <button 
                                type="submit" 
                                className={styles.submitJobButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>

                    </form>
                </div>

            </main>

            <Footer />
        </React.Fragment>
    );
};

export default PostJobForm;