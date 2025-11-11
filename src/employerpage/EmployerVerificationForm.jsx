import React, { useState } from 'react';
import { Briefcase, FileText, Globe, User, Phone, Mail, CheckCircle } from 'lucide-react';

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
    formWrapper: {
        backgroundColor: 'white',
        padding: '2.5rem 3rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        borderRadius: '0.75rem',
        borderTop: '8px solid #2563eb',
        maxWidth: '960px',
        width: '100%',
        margin: '2rem auto 0',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
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
    },
    fieldset: {
        border: '1px solid #d1d5db',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
    },
    legend: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: '#1f2937',
        padding: '0 0.5rem',
        display: 'flex',
        alignItems: 'center',
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
        transition: 'border-color 0.15s ease-in-out',
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
        fontSize: '1.125rem',
        fontWeight: '500',
        color: 'white',
        backgroundColor: loading ? '#93c5fd' : '#2563eb',
        cursor: loading ? 'not-allowed' : 'pointer',
        transition: 'background-color 0.15s ease-in-out',
        marginTop: '1.25rem',
    }),
};

const BusinessVerification = () => {
    const [formData, setFormData] = useState({
        legalName: '',
        ein: '',
        website: '',
        officialEmail: '',
        contactName: '',
        contactTitle: '',
        contactPhone: '',
        contactEmail: '', // Added contact email
    });
    const [verificationStatus, setVerificationStatus] = useState('pending'); // 'pending', 'submitted', 'error'
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setVerificationStatus('pending');

        // Placeholder for API submission
        setTimeout(() => {
            console.log('Verification data submitted:', formData);
            setLoading(false);
            setVerificationStatus('submitted');
            // In a real app, this would submit to Firestore and await manual review
        }, 2500);
    };

    const InputField = ({ id, label, name, type = 'text', icon: Icon, placeholder, required = true, width = '100%' }) => (
        <div style={{ width: width, marginBottom: '1rem' }}>
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

    if (verificationStatus === 'submitted') {
        return (
            <div style={{ ...styles.container, alignItems: 'center' }}>
                <div style={{ maxWidth: '480px', width: '100%', backgroundColor: 'white', padding: '2.5rem', borderRadius: '0.75rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center', borderTop: '4px solid #10b981' }}>
                    <CheckCircle style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem', color: '#10b981' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem' }}>Verification Submitted!</h2>
                    <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>
                        Thank you for providing your business details. We are now reviewing your submission to ensure legitimacy. 
                        This process typically takes 1-2 business days.
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        You will receive an email notification at your provided official contact email once your account is fully verified.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem', color: '#1d4ed8' }}>
                    <Briefcase style={styles.headerIcon} />
                    <h2 style={styles.headerTitle}>
                        Verify Your Business
                    </h2>
                </div>
                <p style={{ fontSize: '1rem', color: '#4b5563', padding: '0 1rem' }}>
                    To ensure a safe environment for job seekers, please provide the following details. Your information is kept confidential.
                </p>
            </div>

            <div style={styles.formWrapper}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={handleSubmit}>
                    
                    {/* Section 1: Legal Details */}
                    <fieldset style={{ ...styles.fieldset, backgroundColor: '#eff6ff80' }}>
                        <legend style={styles.legend}>
                            <FileText style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', color: '#2563eb' }} /> 1. Legal & Registration Details
                        </legend>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Must match official government records.</p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            <InputField
                                id="legalName"
                                label="Official Registered Business Name"
                                name="legalName"
                                placeholder="e.g., Acme Corporation LLC"
                                icon={Briefcase}
                                width="calc(50% - 0.5rem)" // Simple responsive approximation
                            />
                            <InputField
                                id="ein"
                                label="Tax ID / EIN / Registration Number"
                                name="ein"
                                placeholder="Required for legal verification"
                                icon={FileText}
                                width="calc(50% - 0.5rem)" // Simple responsive approximation
                            />
                        </div>
                        
                        {/* Placeholder for Document Upload (simulated) */}
                        <div style={{ marginTop: '1.5rem' }}>
                            <label style={styles.inputLabel}>
                                <FileText style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#3b82f6' }} /> Business License Upload
                            </label>
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '1.25rem 1.5rem', border: '2px dashed #d1d5db', borderRadius: '0.375rem' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <svg style={{ margin: '0 auto', height: '3rem', width: '3rem', color: '#9ca3af' }} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H15a4 4 0 01-4-4v-4m32-4V9a4 4 0 00-4-4h-8m-4-2h-4a2 2 0 00-2 2v10a2 2 0 002 2h4a2 2 0 002-2V4z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div style={{ display: 'flex', fontSize: '0.875rem', color: '#4b5563', justifyContent: 'center' }}>
                                        <label htmlFor="file-upload" style={{ position: 'relative', cursor: 'pointer', backgroundColor: 'white', borderRadius: '0.375rem', fontWeight: '500', color: '#2563eb', paddingRight: '0.25rem' }}>
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }} disabled />
                                        </label>
                                        <p>or drag and drop (Max 10MB)</p>
                                    </div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>Accepts PDF, JPG, PNG only. *Disabled in this demo.</p>
                        </div>
                    </fieldset>

                    {/* Section 2: Digital Presence & Contact */}
                    <fieldset style={styles.fieldset}>
                        <legend style={styles.legend}>
                            <Globe style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', color: '#2563eb' }} /> 2. Digital & Contact Information
                        </legend>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Ensure this matches your public-facing information.</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            <InputField
                                id="website"
                                label="Official Company Website"
                                name="website"
                                type="url"
                                placeholder="https://www.yourcompany.com"
                                icon={Globe}
                                width="calc(50% - 0.5rem)"
                            />
                            <InputField
                                id="officialEmail"
                                label="Official HR/Recruitment Email (Domain-based)"
                                name="officialEmail"
                                type="email"
                                placeholder="hr@yourcompany.com"
                                icon={Mail}
                                width="calc(50% - 0.5rem)"
                            />
                        </div>
                        
                        <h4 style={{ fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1f2937', borderTop: '1px solid #d1d5db', paddingTop: '1rem' }}>Primary Contact Person for Verification</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            <InputField
                                id="contactName"
                                label="Full Name"
                                name="contactName"
                                placeholder="Jane Doe"
                                icon={User}
                                width="calc(50% - 0.5rem)"
                            />
                            <InputField
                                id="contactTitle"
                                label="Title/Role"
                                name="contactTitle"
                                placeholder="HR Manager"
                                icon={Briefcase}
                                width="calc(50% - 0.5rem)"
                            />
                            <InputField
                                id="contactPhone"
                                label="Direct Phone Number"
                                name="contactPhone"
                                type="tel"
                                placeholder="(555) 555-5555"
                                icon={Phone}
                                width="calc(50% - 0.5rem)"
                            />
                            <InputField
                                id="contactEmail"
                                label="Verification Contact Email"
                                name="contactEmail"
                                type="email"
                                placeholder="jane.doe@yourcompany.com"
                                icon={Mail}
                                width="calc(50% - 0.5rem)"
                            />
                        </div>
                    </fieldset>

                    {/* Submit Button */}
                    <div style={{ paddingTop: '1.25rem' }}>
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
                                    Submitting for Review...
                                </div>
                            ) : 'Submit for Verification'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessVerification;