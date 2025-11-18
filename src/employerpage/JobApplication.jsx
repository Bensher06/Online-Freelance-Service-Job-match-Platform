import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, User, Filter, Trash2, Send, ChevronDown, ChevronUp } from 'lucide-react';
import Navbar from '../assets/Navbar';
import Footer from '../assets/Footer';

// --- Mock Data Structure ---
const MOCK_JOB_ID = 'job-12345';
const MOCK_JOB_TITLE = 'Senior Virtual Assistant for Executive Support';

const mockApplicants = [
    { id: 1, name: 'Anna K.', title: 'Executive VA', avatar: 'https://placehold.co/40x40/f0f0f0/333?text=AK', rate: '$15/hr', status: 'Interview', skills: ['Scheduling', 'Email Management', 'CRM'], appliedDate: '2025-10-28', profileLink: '/employee/profile/1' },
    { id: 2, name: 'Ben L.', title: 'Admin Assistant', avatar: 'https://placehold.co/40x40/f0f0f0/333?text=BL', rate: '$12/hr', status: 'New', skills: ['Data Entry', 'Microsoft Office', 'Invoicing'], appliedDate: '2025-11-01', profileLink: '/employee/profile/2' },
    { id: 3, name: 'Chloe T.', title: 'Senior Scheduler', avatar: 'https://placehold.co/40x40/f0f0f0/333?text=CT', rate: '$18/hr', status: 'Reviewing', skills: ['Trello', 'Project Management', 'Communication'], appliedDate: '2025-10-25', profileLink: '/employee/profile/3' },
    { id: 4, name: 'David M.', title: 'Data Specialist', avatar: 'https://placehold.co/40x40/f0f0f0/333?text=DM', rate: '$14/hr', status: 'Rejected', skills: ['Excel', 'SQL', 'Reporting'], appliedDate: '2025-10-20', profileLink: '/employee/profile/4' },
    { id: 5, name: 'Eve H.', title: 'Customer Support VA', avatar: 'https://placehold.co/40x40/f0f0f0/333?text=EH', rate: '$13/hr', status: 'New', skills: ['Zendesk', 'Chat Support', 'Typing'], appliedDate: '2025-11-03', profileLink: '/employee/profile/5' },
];

// Status mapping for colors
const statusColors = {
    New: { bg: '#dbeafe', text: '#1e40af' },
    Reviewing: { bg: '#fef3c7', text: '#b45309' },
    Interview: { bg: '#d1fae5', text: '#065f46' },
    Rejected: { bg: '#fee2e2', text: '#991b1b' },
};

// --- Reusable Components ---

const StatusBadge = ({ status }) => {
    const { bg, text } = statusColors[status] || statusColors.New;
    return (
        <span style={{ 
            backgroundColor: bg, 
            color: text, 
            padding: '4px 10px', 
            borderRadius: '12px', 
            fontSize: '12px',
            fontWeight: '600',
            minWidth: '90px',
            textAlign: 'center',
            display: 'inline-block',
        }}>
            {status}
        </span>
    );
};

const ApplicantCard = ({ applicant, updateStatus }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleStatusChange = (newStatus) => {
        updateStatus(applicant.id, newStatus);
        setIsMenuOpen(false);
    };

    const StatusOption = ({ status }) => (
        <button
            onClick={() => handleStatusChange(status)}
            style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = statusColors[status].bg}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
        >
            <StatusBadge status={status} />
        </button>
    );

    return (
        <div style={applicantCardStyle.container}>
            {/* Applicant Info */}
            <div style={applicantCardStyle.info}>
                <img src={applicant.avatar} alt={applicant.name} style={applicantCardStyle.avatar} />
                <div style={applicantCardStyle.nameDetails}>
                    <a href={applicant.profileLink} style={applicantCardStyle.nameLink}>
                        {applicant.name}
                    </a>
                    <p style={applicantCardStyle.title}>{applicant.title}</p>
                </div>
            </div>

            {/* Skills / Rate / Date */}
            <div style={applicantCardStyle.details}>
                <div style={applicantCardStyle.skillList}>
                    {applicant.skills.slice(0, 3).map(skill => (
                        <span key={skill} style={applicantCardStyle.skillTag}>{skill}</span>
                    ))}
                </div>
                <div style={applicantCardStyle.meta}>
                    <p>Rate: <span style={{ fontWeight: '600' }}>{applicant.rate}</span></p>
                    <p>Applied: {applicant.appliedDate}</p>
                </div>
            </div>

            {/* Status & Actions */}
            <div style={applicantCardStyle.actions}>
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={applicantCardStyle.statusButton}
                    >
                        <StatusBadge status={applicant.status} />
                        {isMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {isMenuOpen && (
                        <div style={applicantCardStyle.statusMenu}>
                            {Object.keys(statusColors).map(status => (
                                <StatusOption key={status} status={status} />
                            ))}
                        </div>
                    )}
                </div>
                <button title="Contact Applicant" style={applicantCardStyle.actionIcon}>
                    <Send size={18} />
                </button>
                <button title="Archive Application" style={applicantCardStyle.actionIcon}>
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};

// --- Inline Styles for Applicant Card (Responsive) ---
const applicantCardStyle = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        margin: '12px 0',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        borderLeft: '4px solid #2563eb',
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        minWidth: '200px',
        flexBasis: '100%', 
        '@media (min-width: 768px)': {
            flexBasis: '30%',
        },
    },
    avatar: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        marginRight: '12px',
    },
    nameDetails: {
        textAlign: 'left',
    },
    nameLink: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#1f2937',
        textDecoration: 'none',
    },
    title: {
        fontSize: '13px',
        color: '#4b5563',
        margin: '2px 0 0 0',
    },
    details: {
        flexBasis: '100%', 
        marginTop: '12px',
        '@media (min-width: 768px)': {
            flexBasis: '35%',
            marginTop: '0',
            paddingLeft: '20px',
        },
    },
    skillList: {
        marginBottom: '8px',
    },
    skillTag: {
        display: 'inline-block',
        backgroundColor: '#f3f4f6',
        color: '#4b5563',
        padding: '4px 8px',
        borderRadius: '6px',
        fontSize: '11px',
        marginRight: '6px',
        marginBottom: '4px',
    },
    meta: {
        fontSize: '12px',
        color: '#6b7280',
        display: 'flex',
        gap: '16px',
    },
    actions: {
        flexBasis: '100%', 
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '12px',
        marginTop: '12px',
        '@media (min-width: 768px)': {
            flexBasis: '30%',
            justifyContent: 'flex-end',
            marginTop: '0',
        },
    },
    statusButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
    },
    statusMenu: {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: 'white',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 50,
        minWidth: '150px',
        marginTop: '4px',
    },
    actionIcon: {
        border: 'none',
        backgroundColor: 'transparent',
        color: '#6b7280',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '4px',
        transition: 'color 0.1s',
    }
};

const JobApplications = () => {
    // State to hold and manage applicants
    const [applicants, setApplicants] = useState(mockApplicants);
    const [activeFilter, setActiveFilter] = useState('All');

    const updateApplicantStatus = (id, newStatus) => {
        setApplicants(prev => prev.map(a => 
            a.id === id ? { ...a, status: newStatus } : a
        ));
    };

    const filteredApplicants = applicants.filter(a => 
        activeFilter === 'All' || a.status === activeFilter
    );

    return (
        <React.Fragment>
            <Navbar />

            <div style={mainStyles.container}>
                {/* Header Section */}
                <div style={mainStyles.header}>
                    <h1 style={mainStyles.title}>
                        Applicants for: {MOCK_JOB_TITLE}
                    </h1>
                    <p style={mainStyles.subtitle}>
                        <Briefcase size={16} style={{ marginRight: '5px' }} /> 
                        Job ID: {MOCK_JOB_ID} | Total Applicants: {applicants.length}
                    </p>
                </div>

                {/* Filter and Controls */}
                <div style={mainStyles.controls}>
                    <div style={mainStyles.filterButtons}>
                        {['All', 'New', 'Reviewing', 'Interview', 'Rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setActiveFilter(status)}
                                style={{
                                    ...mainStyles.filterButton,
                                    backgroundColor: activeFilter === status ? '#2563eb' : '#f3f4f6',
                                    color: activeFilter === status ? 'white' : '#4b5563',
                                }}
                            >
                                {status} ({applicants.filter(a => status === 'All' || a.status === status).length})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Applicant Listings */}
                <div style={mainStyles.listingContainer}>
                    {filteredApplicants.length > 0 ? (
                        filteredApplicants.map(applicant => (
                            <ApplicantCard 
                                key={applicant.id} 
                                applicant={applicant} 
                                updateStatus={updateApplicantStatus}
                            />
                        ))
                    ) : (
                        <div style={mainStyles.emptyState}>
                            <Filter size={24} style={{ marginBottom: '10px' }}/>
                            <p>No applicants match the current filter: **{activeFilter}**.</p>
                            <button 
                                onClick={() => setActiveFilter('All')} 
                                style={{ ...mainStyles.filterButton, backgroundColor: '#f3f4f6' }}
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </React.Fragment>
    );
};

// --- Main Page Layout Styles ---
const mainStyles = {
    container: {
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '0 15px',
        minHeight: '80vh',
    },
    header: {
        padding: '20px 0',
        borderBottom: '2px solid #e5e7eb',
        marginBottom: '20px',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#1f2937',
        marginBottom: '5px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#4b5563',
        display: 'flex',
        alignItems: 'center',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
    },
    filterButtons: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
    },
    filterButton: {
        padding: '8px 16px',
        borderRadius: '20px',
        border: '1px solid #d1d5db',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'background-color 0.1s, color 0.1s',
    },
    listingContainer: {
        // Grid or column layout for cards
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        color: '#6b7280',
        marginTop: '30px',
    }
};

export default JobApplications;