import React, { useState } from 'react';
import { LogIn, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Reusable style objects
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
        maxWidth: '480px',
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
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'white',
        backgroundColor: loading ? '#93c5fd' : '#2563eb',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.15s ease-in-out',
    }),
    ctaButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid #2563eb',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#2563eb',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out',
    },
};

// Renamed component and updated prop for logical flow (Sign In -> Sign Up)
const EmployerSignInPage = ({ navigateToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Placeholder for authentication logic (using email and password)
        setTimeout(() => {
            console.log('Attempting login with:', { email, password });
            setMessage('Login attempt initiated. Check console for details. (Simulated Success)');
            setLoading(false);
            // In a real app, this would redirect to the employer dashboard
        }, 1500);
    };

    const Navigate = useNavigate();
    return (
        <div style={styles.container}>
            <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem', color: '#1d4ed8' }}>
                    <LogIn style={styles.headerIcon} />
                    <h2 style={styles.headerTitle}>
                        Employer Login
                    </h2>
                </div>
                <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#4b5563' }}>
                    Sign in to manage your job postings and applicants.
                </p>
            </div>

            <div style={styles.card}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                    
                    {/* Message Box */}
                    {message && (
                        <div style={{ padding: '0.75rem', backgroundColor: '#dbeafe', color: '#1e40af', borderRadius: '0.375rem', border: '1px solid #60a5fa', fontSize: '0.875rem' }}>
                            {message}
                        </div>
                    )}
                    
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" style={styles.inputLabel}>
                            <Mail style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#3b82f6' }} /> Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.inputField}
                            placeholder="Enter your company email"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" style={styles.inputLabel}>
                            <Lock style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#3b82f6' }} /> Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.inputField}
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '0.875rem' }}>
                        <a href="#" style={{ fontWeight: '500', color: '#2563eb', textDecoration: 'none' }}>
                            Forgot your password?
                        </a>
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
                                    Signing In...
                                </div>
                            ) : 'Sign In'}
                        </button>
                    </div>
                </form>

                {/* Sign Up CTA */}
                <div style={{ marginTop: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }} aria-hidden="true">
                            <div style={{ width: '100%', borderTop: '1px solid #d1d5db' }}></div>
                        </div>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', fontSize: '0.875rem' }}>
                            <span style={{ padding: '0 0.5rem', backgroundColor: 'white', color: '#6b7280' }}>
                                First time posting?
                            </span>
                        </div>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                        <button
                            onClick={navigateToSignUp || (() => Navigate('EmployerSignUp'))}
                            style={{ ...styles.ctaButton, backgroundColor: 'white' }}
                        >
                            Create an Employer Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerSignInPage;