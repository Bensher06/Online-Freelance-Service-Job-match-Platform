import React, { useState, useEffect, useCallback } from 'react';
import styles from '../../styles/jobseeker/FreelancerProfileEdit.module.css';
import Navbar from '../../assets/Navbar';
import Footer from '../../assets/Footer';

// Mock Data structure for initial form population
const MOCK_PROFILE_DATA = {
    id: "user-jane-doe-456",
    name: "Jane Doe",
    title: "Senior UX/UI Designer",
    avatarUrl: "https://placehold.co/120x120/007bff/white?text=JD",
    rate: "$85 / hour",
    location: "Remote (Based in New York, NY)",
    email: "jane.doe@example.com", 
    bio: "I am a passionate UX/UI designer with over 7 years of experience in creating intuitive and engaging digital experiences. I specialize in mobile app design, user research, and interactive prototyping. I love solving complex problems and turning ideas into beautiful, user-friendly products.",
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping", "Wireframing", "Mobile App Design", "HTML/CSS"],
    // Experience data structured for display/editing
    experience: [
        { title: "Lead UX Designer", company: "DesignCo", dates: "2021 - Present", description: "Led the redesign of a major e-commerce mobile app, resulting in a 30% increase in user engagement. Mentored junior designers and established a new design system." },
        { title: "Senior Product Designer", company: "Tech Solutions Ltd.", dates: "2018 - 2021", description: "Worked on B2B SaaS products, conducting user research and creating wireframes, mockups, and prototypes for new features." },
    ]
};

/**
 * Converts the mock experience array to a string for the textarea, mimicking the desired format.
 */
const formatExperienceForTextarea = (experienceArray) => {
    return experienceArray.map(item => 
        `**${item.title}** @ ${item.company} (Dates: ${item.dates})\n${item.description}`
    ).join('\n\n');
};

const FreelancerProfileEdit = () => { 
    const [formData, setFormData] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [submitMessage, setSubmitMessage] = useState(null); 

    // --- Data Loading Logic ---
    const loadProfileData = useCallback(async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        
        const initialData = { ...MOCK_PROFILE_DATA };
        
        initialData.skills = initialData.skills.join(', ');
        initialData.experience = formatExperienceForTextarea(initialData.experience);

        setFormData(initialData);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadProfileData();
    }, [loadProfileData]);
    
    // --- Event Handlers ---
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (isSaving) return;

        setIsSaving(true);
        setSubmitMessage(null);
        
        const dataToSave = { ...formData };
        dataToSave.skills = dataToSave.skills.split(',').map(s => s.trim()).filter(s => s);

        console.log("Saving data:", dataToSave);

        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        try {
            setSubmitMessage({ text: 'Profile saved successfully!', type: 'success' });
        } catch (error) {
            setSubmitMessage({ text: 'Error saving profile. Please try again.', type: 'error' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setSubmitMessage(null), 4000); 
        }
    };
    

    // --- Conditional Rendering for Loading State ---
    if (isLoading || !formData) {
        return (
            <React.Fragment>
                <Navbar />
                <main className={styles.mainContent}>
                    <div className={styles.loadingState}>
                        <p><i className="fas fa-spinner fa-spin"></i> Loading profile settings...</p>
                    </div>
                </main>
                <Footer />
            </React.Fragment>
        );
    }
    
    return (
        <React.Fragment>
            {/* Header Component */}
            <Navbar />

            {/* Main Content for Profile Settings Form */}
            <main className={styles.mainContent}>
                <div className={styles.profileSettingsContainer}>
                    <h1>Edit Your Profile</h1>
                    <div className={styles.settingsFormCard}>
                        <form onSubmit={handleFormSubmit}>
                            
                            <div className={styles.formRow}>
                                {/* Full Name */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="full-name">Full Name</label>
                                    <input type="text" id="full-name" name="name" required
                                        value={formData.name || ''} onChange={handleChange}
                                    />
                                </div>
                                
                                {/* Job Title */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="job-title">Your Job Title</label>
                                    <input type="text" id="job-title" name="title" placeholder="e.g., Senior UX/UI Designer"
                                        value={formData.title || ''} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Avatar URL */}
                            <div className={styles.formGroup}>
                                <label htmlFor="avatar-url">Avatar URL</label>
                                <input type="text" id="avatar-url" name="avatarUrl" placeholder="https://..."
                                    value={formData.avatarUrl || ''} onChange={handleChange}
                                />
                                <p className={styles.helperText}>Provide a direct link to your profile image (e.g., from Imgur, or a public profile).</p>
                            </div>
                            
                            <div className={styles.formRow}>
                                {/* Hourly Rate */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="hourly-rate">Hourly Rate</label>
                                    <input type="text" id="hourly-rate" name="rate" placeholder="e.g., $85 / hour"
                                        value={formData.rate || ''} onChange={handleChange}
                                    />
                                </div>
                                
                                {/* Location */}
                                <div className={styles.formGroup}>
                                    <label htmlFor="location">Location</label>
                                    <input type="text" id="location" name="location" placeholder="e.g., New York, NY or 'Remote'"
                                        value={formData.location || ''} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Email (Disabled) */}
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" required disabled
                                    value={formData.email || ''} 
                                />
                                <p className={styles.helperText}>Your email is used for login and cannot be changed here.</p>
                            </div>

                            {/* About Me */}
                            <div className={styles.formGroup}>
                                <label htmlFor="bio">About Me</label>
                                <textarea id="bio" name="bio" placeholder="Tell employers a bit about yourself, your background, and your passion..."
                                    value={formData.bio || ''} onChange={handleChange}
                                />
                            </div>

                            {/* Skills */}
                            <div className={styles.formGroup}>
                                <label htmlFor="skills">Top Skills</label>
                                <input type="text" id="skills" name="skills" placeholder="e.g., Figma, Sketch, User Research"
                                    value={formData.skills || ''} onChange={handleChange}
                                />
                                <p className={styles.helperText}>Comma-separated list of your top skills.</p>
                            </div>

                            {/* Experience */}
                            <div className={styles.formGroup}>
                                <label htmlFor="experience">Experience</label>
                                <textarea id="experience" name="experience" placeholder="Detail your work experience here."
                                    value={formData.experience || ''} onChange={handleChange}
                                />
                                <p className={styles.helperText}>
                                    We recommend this format for each entry:
                                    <br />
                                    <strong>Job Title</strong> @ Company Name (Dates: 2021 - Present)
                                    <br />
                                    A short description of your responsibilities and achievements.
                                </p>
                            </div>

                            {/* Submit Button */}
                            <div className={styles.formGroup}>
                                <button type="submit" className={styles.submitButton} disabled={isSaving}>
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                            
                            {/* Message Area */}
                            {submitMessage && (
                                <div className={`${styles.submitMessage} ${styles[submitMessage.type]}`}>
                                    {submitMessage.text}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </React.Fragment>
    );
};

export default FreelancerProfileEdit;