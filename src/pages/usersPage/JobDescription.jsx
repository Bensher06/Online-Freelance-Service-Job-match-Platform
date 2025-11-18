import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, User, Calendar, MapPin, ArrowLeft } from 'lucide-react'; 
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// --- Consolidated Styles (Internalized CSS Module) ---
const styles = {
    // --- CSS VARIABLES (Used for visual consistency) ---
    primaryBlue: '#2563eb',
    primaryBlueDark: '#1d4ed8',
    darkText: '#1f2937',
    mediumText: '#4b5563',
    white: '#fff',
    lightGrayBg: '#f9fafb',
    cardBg: '#ffffff',
    borderColor: '#d1d5db',
    errorBg: '#fee2e2',
    errorText: '#ef4444',
    successBg: '#dbeafe',
    successText: '#1e40af',

    // === 1. GLOBAL & CONTAINER ===
    container: {
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif',
        position: 'relative', 
    },
    // === 2. BACK BUTTON STYLE ===
    backButton: {
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        display: 'flex',
        alignItems: 'center',
        color: '#4b5563',
        fontWeight: '500',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out',
    },
    // === 3. Main Content/Card Container ===
    mainContent: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3rem 1.5rem',
    },
    centerCard: {
        backgroundColor: '#ffffff',
        padding: '3rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.15)',
        borderRadius: '0.75rem',
        borderTop: '5px solid #2563eb',
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1f2937',
        marginBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: '0.875rem',
        color: '#6b7280',
        marginTop: '0.5rem',
        marginBottom: '1.5rem',
    },
    // === 4. Form and Input Styles ===
    messageBoxError: {
        padding: '0.75rem',
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        borderRadius: '0.375rem',
        border: `1px solid #fca5a5`,
        fontSize: '0.875rem',
        marginBottom: '1rem',
        textAlign: 'left',
    },
    messageBoxSuccess: {
        padding: '0.75rem',
        backgroundColor: '#dbeafe',
        color: '#1e40af',
        borderRadius: '0.375rem',
        border: `1px solid #60a5fa`,
        fontSize: '0.875rem',
        marginBottom: '1rem',
        textAlign: 'left',
    },
    form: {
        textAlign: 'left',
    },
    field: {
        marginBottom: '1rem',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '0.25rem',
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
        boxSizing: 'border-box',
        transition: 'border-color 0.15s ease-in-out',
    },
    labelCheck: {
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
    },
    inputCheck: {
        marginRight: '0.4rem',
        accentColor: '#2563eb',
        width: '1rem',
        height: '1rem',
    },
    submitButton: (loading) => ({
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
    loadingContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    spinner: {
        width: '1.25rem',
        height: '1.25rem',
        marginRight: '0.75rem',
        animation: 'spin 1s linear infinite',
        color: 'white',
    },
    link: {
        fontWeight: '600',
        color: '#2563eb',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'color 0.15s ease-in-out',
    },
    signupText: {
        textAlign: 'center',
        marginTop: '1.5rem',
        fontSize: '0.875rem',
        color: '#4b5563',
    },
};
// --- End Styles ---


function JobSeekerSignUpPage({ navigateToHome, navigateToLogin }) { 
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        placeOfBirth: '',
        nationality: '',
        acceptTerms: false,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    // 1. Initialize Firebase and sign in
    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                const firebaseConfig = JSON.parse(__firebase_config);
                const app = initializeApp(firebaseConfig);
                const firestoreDb = getFirestore(app);
                const firebaseAuth = getAuth(app);
                
                setDb(firestoreDb);
                setAuth(firebaseAuth);

                if (typeof __initial_auth_token !== 'undefined') {
                    await signInWithCustomToken(firebaseAuth, __initial_auth_token);
                } else {
                    console.error("Firebase auth token not available.");
                }

            } catch (error) {
                console.error("Firebase initialization or sign-in failed:", error);
                setMessage(`Error initializing app: ${error.message}`);
            }
        };

        initializeFirebase();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // 2. Handle Form Submission and Firebase Registration
    const handleSubmit = async (e) => {
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
        
        if (!auth || !db) {
            setMessage('Error: Application is still connecting to the database. Please wait.');
            setLoading(false);
            return;
        }
        
        try {
            // 2a. Create user with Email and Password (Firebase Auth)
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            
            // 2b. Save additional user details (Firestore)
            const userProfile = {
                fullName: formData.fullName,
                dateOfBirth: formData.dateOfBirth,
                placeOfBirth: formData.placeOfBirth,
                nationality: formData.nationality,
                isJobSeeker: true, // Mark role
                registeredAt: new Date().toISOString(),
                // NOTE: Do not save password in Firestore
            };

            // Path: /artifacts/{appId}/users/{userId}/profiles/{docId}
            const profileRef = doc(db, `artifacts/${appId}/users/${user.uid}/profiles`, 'jobseekerProfile');
            await setDoc(profileRef, userProfile);

            setMessage('Registration successful! You are now logged in and redirected to the login page.');
            
            // 2c. Redirect to login after successful registration
            setTimeout(() => { 
                navigateToLogin && navigateToLogin(); 
            }, 1500);

        } catch (error) {
            console.error("Registration failed:", error);
            // Handle common Firebase errors
            if (error.code === 'auth/email-already-in-use') {
                setMessage('Error: This email address is already in use.');
            } else if (error.code === 'auth/weak-password') {
                 setMessage('Error: Password should be at least 6 characters.');
            } else {
                setMessage(`Error: Registration failed. ${error.message}`);
            }
            setLoading(false);
        }
    };

    const InputField = ({ id, label, name, type = 'text', icon: Icon, placeholder, required = true, isFullWidth = true }) => {
        // Determine if the input should have left padding for the icon
        const showIconPadding = type !== 'date';
        
        return (
            <div style={{ ...styles.field, width: isFullWidth ? '100%' : 'auto' }}>
                <label htmlFor={id} style={styles.label}>
                    <Icon style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: styles.primaryBlue }} /> {label}
                </label>
                <div style={styles.inputWrapper}>
                    <input
                        id={id}
                        name={name}
                        type={type}
                        required={required}
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        style={{
                            ...styles.inputField,
                            paddingLeft: showIconPadding ? '2.5rem' : '0.75rem',
                        }}
                    />
                    {/* Render icon inside wrapper only if necessary (not for date) */}
                    {showIconPadding && <Icon style={styles.inputIcon} />}
                </div>
            </div>
        );
    };
    
    return (
        <div style={styles.container}>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            
            {/* Back Button */}
            <button 
                onClick={(e) => { e.preventDefault(); navigateToHome && navigateToHome(); }}
                style={styles.backButton}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
            >
                <ArrowLeft style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem' }} />
                Back to Home
            </button>

            <main style={styles.mainContent}>
                <div style={styles.centerCard}>
                    
                    <h1 style={styles.title} >
                        <UserPlus style={{ width: '1.75rem', height: '1.75rem', marginRight: '0.5rem', color: styles.primaryBlueDark }} />
                        Create Job Seeker Account
                    </h1>
                    <p style={styles.subtitle}>Start your journey to finding local work.</p>
                    
                    {/* Alert/Message Box */}
                    {message && (
                        <div style={message.startsWith('Error') ? styles.messageBoxError : styles.messageBoxSuccess} role="alert">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={styles.form}>
                        
                        {/* --- ACCOUNT DETAILS --- */}
                        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: styles.darkText, marginBottom: '1rem' }}>Account Credentials</h2>
                            
                            <InputField
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                icon={Mail}
                                placeholder="you@example.com"
                            />
                            
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '50%' }}>
                                    <InputField
                                        id="password"
                                        label="Password (min 6 characters)"
                                        name="password"
                                        type="password"
                                        icon={Lock}
                                        placeholder="8+ characters"
                                        isFullWidth={false}
                                    />
                                </div>
                                <div style={{ width: '50%' }}>
                                    <InputField
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        icon={Lock}
                                        placeholder="Re-enter password"
                                        isFullWidth={false}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- PERSONAL DETAILS --- */}
                        <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: styles.darkText, marginBottom: '1rem' }}>Personal Information</h2>

                            <InputField
                                id="fullName"
                                label="Full Legal Name"
                                name="fullName"
                                type="text"
                                icon={User}
                                placeholder="Jane D. Doe"
                            />

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ width: '50%' }}>
                                    {/* Date input is tricky with custom styling, removing icon padding for native appearance */}
                                    <InputField
                                        id="dateOfBirth"
                                        label="Date of Birth"
                                        name="dateOfBirth"
                                        type="date"
                                        icon={Calendar}
                                        required={true}
                                        isFullWidth={false}
                                    />
                                </div>
                                <div style={{ width: '50%' }}>
                                    <InputField
                                        id="nationality"
                                        label="Nationality"
                                        name="nationality"
                                        type="text"
                                        icon={MapPin}
                                        placeholder="e.g., Filipino, American"
                                        isFullWidth={false}
                                    />
                                </div>
                            </div>
                            
                            <InputField
                                id="placeOfBirth"
                                label="Place of Birth (City/Country)"
                                name="placeOfBirth"
                                type="text"
                                icon={MapPin}
                                placeholder="e.g., Manila, Philippines"
                            />
                        </div>
                        
                        {/* Terms and Conditions */}
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', marginBottom: '1rem', justifyContent: 'flex-start' }}>
                            <label style={{ ...styles.labelCheck, margin: '0' }}>
                                <input
                                    id="acceptTerms"
                                    name="acceptTerms"
                                    type="checkbox"
                                    checked={formData.acceptTerms}
                                    onChange={handleChange}
                                    style={styles.inputCheck}
                                    required
                                />
                                I agree to the <a href="#" style={{ ...styles.link, marginLeft: '0.25rem' }}>Terms and Conditions</a>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" style={styles.submitButton(loading)} disabled={loading}>
                            {loading ? (
                                <div style={styles.loadingContainer}>
                                    <svg style={styles.spinner} viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25"></circle>
                                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                                    </svg>
                                    Registering...
                                </div>
                            ) : 'Create Account'}
                        </button>

                        {/* Sign In Link */}
                        <p style={styles.signupText}>
                            Already have an account?{" "}
                            <a 
                                onClick={(e) => { e.preventDefault(); navigateToLogin && navigateToLogin(); }} 
                                style={styles.link}
                            >
                                Log in
                            </a>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default JobSeekerSignUpPage;