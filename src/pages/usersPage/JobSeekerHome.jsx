import React, { useState } from 'react';
import { Search, MapPin, Zap, LogIn, UserPlus, Mail, Lock, Chrome, Github, X } from 'lucide-react'; 
// Import corrected Navbar and Footer
import Navbar from '../../assets/Navbar'; 
import Footer from '../../assets/Footer'; 


// --- Inline Style Definitions (Centralized) ---
const styles = {
    // === 1. GLOBAL & CONTAINER ===
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        fontFamily: 'Inter, sans-serif',
    },
    // === 2. MODAL STYLES ===
    modalBackdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        animation: 'fadeIn 0.2s ease-out',
    },
    modalContent: {
        position: 'relative',
        backgroundColor: 'white',
        padding: '2rem 2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        borderRadius: '0.75rem',
        borderTop: '5px solid #2563eb',
        maxWidth: '400px',
        width: '90%',
        animation: 'slideUp 0.3s ease-out',
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: '#6b7280',
        transition: 'color 0.15s ease-in-out',
        padding: '0.5rem',
    },
    // === 3. HOMEPAGE STYLES ===
    hero: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        maxWidth: '80rem',
        margin: '0 auto',
        width: '100%',
    },
    introSection: {
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '1rem',
    },
    title: {
        fontSize: '2.5rem',
        lineHeight: 1.25,
        fontWeight: '800',
        color: '#1f2937',
        marginBottom: '1rem',
        maxWidth: '48rem',
        margin: '0 auto',
        animation: 'slideUp 0.7s ease-out 0.2s backwards',
    },
    subtitle: {
        fontSize: '1.25rem',
        fontWeight: '300',
        color: '#4b5563',
        marginTop: '1rem',
        animation: 'slideUp 0.7s ease-out 0.4s backwards',
    },
    signUpButton: { 
        padding: '0.5rem 1rem',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        borderRadius: '0.5rem',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'background-color 0.15s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        border: 'none',
        cursor: 'pointer',
    },
    featuresSection: {
        padding: '4rem 1.5rem',
        maxWidth: '80rem',
        margin: '0 auto 4rem',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
    featuresGrid: {
        display: 'grid',
        gap: '2rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        marginTop: '2rem',
    },
    featureCardBase: {
        backgroundColor: '#f3f4f6',
        padding: '2rem',
        borderRadius: '0.75rem',
        textAlign: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    featureIcon: {
        margin: '0 auto 1rem',
        width: '3rem',
        height: '3rem',
        color: '#2563eb',
    },
    featureTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.5rem',
    },
    featureDescription: {
        fontSize: '1rem',
        color: '#4b5563',
    },
    // === 4. FORM STYLES (Used by SignInModal) ===
    formTitle: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#1f2937',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formSubtitle: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginBottom: '1.5rem',
    },
    messageBox: (isError) => ({
        padding: '0.75rem',
        backgroundColor: isError ? '#fee2e2' : '#dbeafe',
        color: isError ? '#ef4444' : '#1e40af',
        borderRadius: '0.375rem',
        border: `1px solid ${isError ? '#fca5a5' : '#60a5fa'}`,
        fontSize: '0.875rem',
        marginBottom: '1rem',
    }),
    socialButton: {
        width: '100%',
        padding: '0.75rem 1rem',
        marginBottom: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        color: '#4b5563',
        fontSize: '0.9rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.15s ease-in-out',
    },
    divider: {
        position: 'relative',
        margin: '1.5rem 0',
    },
    dividerLine: {
        borderTop: '1px solid #e5e7eb',
    },
    dividerText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '0 0.75rem',
        backgroundColor: 'white',
        color: '#6b7280',
        fontSize: '0.875rem',
    },
    inputWrapper: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9ca3af',
    },
    inputField: {
        width: '100%',
        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.15s ease-in-out',
    },
    formSubmitButton: (loading) => ({
        width: '100%',
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '0.5rem',
        backgroundColor: loading ? '#93c5fd' : '#2563eb',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.15s ease-in-out',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '1rem',
    }),
    link: {
        fontWeight: '600',
        color: '#2563eb',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 0.15s ease-in-out',
    },
};

// --- MODAL CONTENT (JobSeekerSignInPage converted to Modal Content) ---
const SignInModalContent = ({ closeModal, navigateToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        setTimeout(() => {
            console.log('Attempting job seeker login with:', { email, password });
            setMessage('Sign In functionality is pending implementation. (Simulated Success)');
            setLoading(false);
        }, 1500);
    };

    const handleSocialSignIn = (provider) => {
        setMessage(`Signing in with ${provider} is pending implementation.`);
    };

    const handleForgotPassword = () => {
        setMessage('Password reset functionality is pending.');
    };
    

    return (
        <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={closeModal} aria-label="Close modal">
                <X size={24} />
            </button>

            <h2 style={styles.formTitle}>
                <LogIn style={{ width: '1.75rem', height: '1.75rem', marginRight: '0.5rem', color: '#1d4ed8' }} />
                Welcome Back
            </h2>
            <p style={styles.formSubtitle}>Sign in to access your dashboard and applications.</p>
            
            {/* Alert/Message Box */}
            {message && (
                <div style={styles.messageBox(message.startsWith('Error'))} role="alert">
                    {message}
                </div>
            )}

            {/* Social Sign-in Options */}
            <button 
                style={styles.socialButton}
                onClick={() => handleSocialSignIn('Google')}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
                <Chrome size={20} style={{ marginRight: '0.5rem' }} /> 
                Continue with Google
            </button>
            <button 
                style={{ ...styles.socialButton, marginBottom: '0' }}
                onClick={() => handleSocialSignIn('GitHub')}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
                <Github size={20} style={{ marginRight: '0.5rem' }} />
                Continue with GitHub
            </button>

            {/* Divider (The "or" line) */}
            <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>or</span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    {/* Email Input */}
                    <div style={styles.inputWrapper}>
                        <Mail size={18} style={styles.inputIcon} />
                        <input 
                            type="email" 
                            id="email" 
                            style={styles.inputField} 
                            placeholder="Email address" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    {/* Password Input */}
                    <div style={styles.inputWrapper}>
                        <Lock size={18} style={styles.inputIcon} />
                        <input 
                            type="password" 
                            id="password" 
                            style={styles.inputField} 
                            placeholder="Password" 
                            required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                
                <button type="submit" style={styles.formSubmitButton(loading)} disabled={loading}>
                    {loading ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <svg style={{ animation: 'spin 1s linear infinite', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem', color: 'white' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing In...
                        </div>
                    ) : 'Sign In'}
                </button>
            </form>

            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '1rem' }}>
                <a href="#" style={styles.link} onClick={handleForgotPassword}>Forgot Password?</a>
            </p>
            
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginTop: '1.5rem' }}>
                Don't have an account? 
                <a 
                    href="#" 
                    onClick={navigateToSignUp} 
                    style={{ ...styles.link, marginLeft: '0.25rem' }}
                >
                    Create one
                </a>
            </p>
        </div>
    );
};


// --- Features Content (Job Seeker Focus) ---
const features = [
    {
        icon: MapPin,
        title: "Hyper-Local Matching",
        description: "Find jobs posted within a few miles of your home, reducing commuting time and expenses significantly."
    },
    {
        icon: Search,
        title: "Vetted Opportunities",
        description: "Every employer is verified by our team, ensuring you apply only to legitimate, secure positions."
    },
    {
        icon: Zap,
        title: "One-Click Application",
        description: "Apply instantly with your pre-filled profile to jobs that match your skills, getting you hired faster."
    },
];

// --- MAIN WRAPPER COMPONENT ---
const JobSeekerHome = () => {
    // State to track which feature card is being hovered over
    const [hoveredCard, setHoveredCard] = useState(null);
    // State to control the modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Navigates to the dedicated sign-up page
    const navigateToSignUp = (e) => {
        e.preventDefault();
        window.location.href = '/employee/signup';
    }

    return (
        <div style={styles.container}>
            {/* Inject CSS Keyframes for animations */}
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}
            </style>

            <Navbar openModal={openModal} />

            <main style={{ flexGrow: 1 }}>
                <section style={styles.hero}>
                    <div style={{ ...styles.introSection, opacity: isModalOpen ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                        <h1 style={styles.title}>
                            Your Next Job is Right Around the Corner
                        </h1>
                        <p style={styles.subtitle}>
                            Stop commuting across the city. Job+ connects you directly with jobs in your neighborhood.
                        </p>
                        <button 
                            onClick={openModal}
                            style={{ 
                                ...styles.signUpButton, 
                                border: 'none',
                                cursor: 'pointer',
                                display: 'inline-flex', 
                                marginTop: '2rem', 
                                padding: '1rem 2rem', 
                                fontSize: '1rem',
                                animation: 'slideUp 0.7s ease-out 0.6s backwards',
                            }}
                        >
                            <UserPlus style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
                            Start Your Job Search Today
                        </button>
                    </div>

                    {/* Features Grid Section */}
                    <section style={{ ...styles.featuresSection, opacity: isModalOpen ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={styles.title}>Why Job Seekers Love Job+</h2>
                        </div>
                        
                        <div style={styles.featuresGrid}>
                            {features.map((feature, index) => (
                                <div 
                                    key={index} 
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        ...styles.featureCardBase,
                                        animation: `slideUp 0.6s ease-out ${0.8 + index * 0.1}s backwards`, 
                                        transform: hoveredCard === index ? 'translateY(-5px) scale(1.01)' : 'translateY(0)',
                                        boxShadow: hoveredCard === index 
                                            ? '0 15px 25px -5px rgba(0, 0, 0, 0.15)' 
                                            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                    }}
                                >
                                    <feature.icon style={styles.featureIcon} />
                                    <h3 style={styles.featureTitle}>{feature.title}</h3>
                                    <p style={styles.featureDescription}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </section>
            </main>

            <Footer />

            {/* Render Modal if open */}
            {isModalOpen && (
                <div style={styles.modalBackdrop} onClick={(e) => { 
                    // Close modal if backdrop is clicked, but not if content is clicked
                    if (e.target === e.currentTarget) closeModal(); 
                }}>
                    <SignInModalContent closeModal={closeModal} navigateToSignUp={navigateToSignUp} />
                </div>
            )}
        </div>
    );
};

export default JobSeekerHome;