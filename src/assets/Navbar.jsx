import React, { useState } from "react";
import { Link } from "react-router-dom"; 

// --- Inline Styles Definition ---
const navStyles = {
    // 1. Main Container
    all: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        backgroundColor: '#ffffff', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
        position: 'sticky',
        top: 0,
        zIndex: 100,
        minHeight: '4rem',
        fontFamily: 'Inter, sans-serif',
    },
    // 2. Logo/Brand
    logo: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: '#1f2937', 
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
    },
    logoDot: {
        color: '#2563eb', 
        marginLeft: '2px',
    },
    // 3. Navigation Links Wrapper (Desktop)
    linksWrapper: {
        display: 'flex',
        gap: '1.5rem',
        flexGrow: 1,
        justifyContent: 'center',
    },
    // 4. Single Navigation Link Base Style
    navLinkBase: {
        color: '#4b5563', 
        textDecoration: 'none',
        fontSize: '0.95rem',
        fontWeight: '500',
        padding: '0.5rem',
        transition: 'color 0.15s ease-in-out',
        cursor: 'pointer',
    },
    // 5. Auth Actions Container
    authActions: {
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
        minWidth: '150px', 
        justifyContent: 'flex-end',
    },
    // 6. Login Button (Text/Link style)
    loginButtonBase: {
        padding: '0.5rem 1rem',
        color: '#4b5563', 
        textDecoration: 'none',
        fontWeight: '600',
        borderRadius: '0.5rem',
        transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out',
        backgroundColor: 'transparent',
        border: '1px solid transparent',
    },
    // 7. Sign Up Button (Primary style)
    signUpButtonBase: {
        padding: '0.5rem 1rem',
        backgroundColor: '#2563eb', 
        color: '#ffffff',
        border: 'none',
        borderRadius: '0.5rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease-in-out',
        boxShadow: '0 2px 4px rgba(37, 99, 235, 0.4)',
    },
    // Hover colors
    primaryBlueHover: '#1d4ed8',
    linkHoverColor: '#2563eb',
    linkBgHover: '#f3f4f6',
};

// Helper component to handle link hover effects since native inline styles don't support :hover
const HoverLink = ({ to, style, children }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const combinedStyle = { 
        ...style, 
        color: isHovered ? navStyles.linkHoverColor : style.color, 
    };
    
    return (
        <Link 
            to={to} 
            style={combinedStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </Link>
    );
};


function Navbar() {
    const [loginHover, setLoginHover] = useState(false);
    const [signUpHover, setSignUpHover] = useState(false);

    return (
        <div style={navStyles.all}>
            
            {/* Logo */}
            <Link to="/employee/home" style={navStyles.logo} aria-label="Go to homepage">
                Job<span style={navStyles.logoDot}>+</span>
            </Link>

            <div style={navStyles.linksWrapper}>
                {/* Navigation Links */}
                <HoverLink to="/employer/talent-search" style={navStyles.navLinkBase}>Find Talent</HoverLink>
                <HoverLink to="/employee/home" style={navStyles.navLinkBase}>Find Jobs</HoverLink>
                <HoverLink to="/about" style={navStyles.navLinkBase}>About</HoverLink>
            </div>

            <div style={navStyles.authActions}>
                {/* Universal Login (Link Button) */}
                <Link 
                    to="/login" 
                    style={{
                        ...navStyles.loginButtonBase,
                        backgroundColor: loginHover ? navStyles.linkBgHover : 'transparent',
                        color: loginHover ? navStyles.linkHoverColor : navStyles.loginButtonBase.color,
                        border: loginHover ? `1px solid ${navStyles.linkHoverColor}` : navStyles.loginButtonBase.border
                    }}
                    onMouseEnter={() => setLoginHover(true)}
                    onMouseLeave={() => setLoginHover(false)}
                >
                    Log in
                </Link>
                
                {/* Role Selection/Sign Up (Primary Button) */}
                <Link to="/role-select"> 
                    <button 
                        style={{
                            ...navStyles.signUpButtonBase,
                            backgroundColor: signUpHover ? navStyles.primaryBlueHover : navStyles.signUpButtonBase.backgroundColor, 
                        }}
                        onMouseEnter={() => setSignUpHover(true)}
                        onMouseLeave={() => setSignUpHover(false)}
                    >
                        Sign up
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;