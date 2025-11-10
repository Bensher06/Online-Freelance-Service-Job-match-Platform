import React, { useState } from 'react';
// These icons are required for the social sign-in and form fields
import { Mail, Lock, Chrome, Github } from 'lucide-react'; 
// Import the DEDICATED CSS Module
import Styles from '../../styles/signInPage.module.css'; 

// Component for the Sign In Page
const SignInPage = ({ setPage }) => {
    // State to display a temporary message instead of using browser alerts
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder functionality
        setMessage('Sign In functionality is pending implementation.');
    };

    const handleSocialSignIn = (provider) => {
        // Placeholder functionality
        setMessage(`Signing in with ${provider} is pending implementation.`);
    };

    return (
        // The outer section provides the background and centers the form
        <section className={Styles.signInContainer}>
            <div className={Styles.signInCard}>
                
                <h2 className={Styles.signInTitle}>Welcome Back</h2>
                <p className={Styles.signInSubtitle}>Sign in to access your dashboard and applications.</p>
                
                {/* Alert/Message Box */}
                {message && (
                    <div className={Styles.messageBox} role="alert">
                        {message}
                    </div>
                )}

                {/* Social Sign-in Options */}
                <button 
                    className={Styles.socialButton} 
                    onClick={() => handleSocialSignIn('Google')}
                    aria-label="Sign in with Google"
                >
                    <Chrome size={20} className={Styles.socialIcon} /> 
                    Continue with Google
                </button>
                <button 
                    className={`${Styles.socialButton} ${Styles.socialButtonBottom}`} 
                    onClick={() => handleSocialSignIn('GitHub')}
                    aria-label="Sign in with GitHub"
                >
                    <Github size={20} className={Styles.socialIcon} />
                    Continue with GitHub
                </button>

                {/* Divider (The "or" line) */}
                <div className={Styles.divider}>
                    <span className={Styles.dividerText}>or</span>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleSubmit}>
                    <div className={Styles.inputGroup}>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <div className={Styles.inputWrapper}>
                            <Mail size={18} className={Styles.inputIcon} />
                            <input 
                                type="email" 
                                id="email" 
                                className={Styles.inputField} 
                                placeholder="Email address" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className={Styles.inputGroup}>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <div className={Styles.inputWrapper}>
                            <Lock size={18} className={Styles.inputIcon} />
                            <input 
                                type="password" 
                                id="password" 
                                className={Styles.inputField} 
                                placeholder="Password" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className={Styles.submitButton}>
                        Sign In
                    </button>
                </form>

                <p className={Styles.linkText} onClick={() => setMessage('Forgot password link clicked')}>
                    Forgot Password?
                </p>
                <p className={Styles.helperText}>
                    Don't have an account? <span onClick={() => setMessage('Create Account clicked. Should navigate to Sign Up.')}>Create one</span>
                </p>

            </div>
        </section>
    );
}

export default SignInPage;