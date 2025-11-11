import React, { useState } from 'react';
import { UserPlus, Mail, Lock, User, Briefcase, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Reusable style objects (inherited and adapted from SignInPage)
const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        fontFamily: 'Inter, sans-serif',
    },
    card: {
        backgroundColor: 'white',
        padding: '2rem 2.5rem',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        borderRadius: '0.5rem',
        borderTop: '4px solid #2563eb',
        maxWidth: '560px', /* Slightly wider card for more fields */
        width: '100%',
        margin: '2rem auto 0',
    },
    headerIcon: {
        width: '2rem',
        height: '2rem',
        marginRight: '0.5rem',
        color: '#1d4ed8',
    },
    headerTitle: {
        fontSize: '1.875rem',
        fontWeight: '800',
        color: '#1f2937',
        textAlign: 'center',
    },
    inputLabel: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.25rem',
    },
    inputField: {
        display: 'block',
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        fontSize: '0.875rem',
        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
        outline: 'none',
    },
    submitButton: (loading) => ({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0.75rem 1rem',
        border: 'none',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        fontSize: '1rem',
        fontWeight: '600',
        color: 'white',
        backgroundColor: loading ? '#93c5fd' : '#2563eb',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.15s ease-in-out',
        marginTop: '0.5rem',
    }),
    linkStyle: {
        fontWeight: '500', 
        color: '#2563eb', 
        textDecoration: 'none', 
        fontSize: '0.875rem'
    },
    // New style for the back button
    backButton: {
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        padding: '0.5rem',
        backgroundColor: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#4b5563',
        fontWeight: '500',
        textDecoration: 'none',
        transition: 'background-color 0.15s ease-in-out',
    }
};

const EmployerSignUp = ({ navigateToSignIn, navigateToVerification, navigateToHome }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        jobTitle: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setMessage('Error: Passwords do not match.');
            return;
        }

        if (!formData.acceptTerms) {
            setMessage('Error: You must accept the Terms and Conditions.');
            return;
        }

        setLoading(true);
        
        // Placeholder for account registration logic
        setTimeout(() => {
            console.log('Attempting registration with:', formData);
            setMessage('Registration successful! Redirecting to Business Verification...');
            setLoading(false);
            
            // Success: Automatically navigate to the next step
            setTimeout(() => {
                navigateToVerification && navigateToVerification();
            }, 1000);

        }, 2000);
    };

    const InputField = ({ id, label, name, type = 'text', icon: Icon, placeholder, required = true, width = '100%' }) => (
        <div style={{ width: width, marginBottom: '0.5rem' }}>
            <label htmlFor={id} style={styles.inputLabel}>
                <Icon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#3b82f6' }} /> {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                required={required}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                style={styles.inputField}
            />
        </div>
    );

    const navigate = useNavigate();

    return (
        <div style={{ ...styles.container, position: 'relative' }}> {/* Added position: relative for absolute button positioning */}
            
            {/* Back Button (New Element) */}
            <button 
                // Updated handler and text to navigate back to the Employer Home page
                onClick={navigateToHome || (() => navigate('../EmployerHome'))}
                style={styles.backButton}
            >
                <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} />
                Back to Home
            </button>

            <div style={{ maxWidth: '560px', width: '100%', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem', color: '#1d4ed8' }}>
                    <UserPlus style={styles.headerIcon} />
                    <h2 style={styles.headerTitle}>
                        Register as an Employer
                    </h2>
                </div>
                <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#4b5563' }}>
                    Create your account to start posting local jobs.
                </p>
            </div>

            <div style={styles.card}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
                    
                    {/* Message Box */}
                    {message && (
                        <div style={{ 
                            padding: '0.75rem', 
                            backgroundColor: message.startsWith('Error') ? '#fee2e2' : '#dbeafe', 
                            color: message.startsWith('Error') ? '#ef4444' : '#1e40af', 
                            borderRadius: '0.375rem', 
                            border: `1px solid ${message.startsWith('Error') ? '#fca5a5' : '#60a5fa'}`, 
                            fontSize: '0.875rem' 
                        }}>
                            {message}
                        </div>
                    )}

                    {/* Personal Details */}
                    <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Your Contact Details</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '0 -0.5rem' }}>
                            <InputField
                                id="fullName"
                                label="Your Full Name"
                                name="fullName"
                                placeholder="Jane Doe"
                                icon={User}
                                width="calc(50% - 0.5rem)"
                            />
                            <InputField
                                id="jobTitle"
                                label="Your Job Title/Role"
                                name="jobTitle"
                                placeholder="Hiring Manager"
                                icon={Briefcase}
                                width="calc(50% - 0.5rem)"
                            />
                        </div>
                    </div>

                    {/* Account Credentials */}
                    <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem', marginBottom: '0.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>Account Credentials</h3>
                        <InputField
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="your.email@company.com"
                            icon={Mail}
                            width="100%"
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', margin: '0 -0.5rem' }}>
                            <InputField
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                placeholder="8+ characters"
                                icon={Lock}
                                width="calc(50% - 0.5rem)"
                            />
                            <InputField
                                id="confirmPassword"
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                placeholder="Re-enter password"
                                icon={Lock}
                                width="calc(50% - 0.5rem)"
                            />
                        </div>
                    </div>
                    
                    {/* Terms and Conditions */}
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', marginBottom: '1rem' }}>
                        <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            style={{ width: '1rem', height: '1rem', border: '1px solid #d1d5db', borderRadius: '0.125rem', marginRight: '0.5rem', accentColor: '#2563eb' }}
                            required
                        />
                        <label htmlFor="acceptTerms" style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                            I agree to the <a href="#" style={styles.linkStyle}>Terms and Conditions</a>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={styles.submitButton(loading)}
                        >
                            {loading ? (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <svg className="animate-spin" style={{ animation: 'spin 1s linear infinite', width: '1.25rem', height: '1.25rem', marginRight: '0.75rem' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Registering...
                                </div>
                            ) : 'Register Account & Proceed to Verification'}
                        </button>
                    </div>
                </form>

                {/* Sign In Link */}
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                        Already have an account? 
                        <a 
                            href="EmployerSignInPage" // Updated to reference the sign-in page file name
                            onClick={(e) => { e.preventDefault(); navigateToSignIn && navigateToSignIn(); }} 
                            style={{ ...styles.linkStyle, marginLeft: '0.25rem' }}
                        >
                            Sign in here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmployerSignUp;