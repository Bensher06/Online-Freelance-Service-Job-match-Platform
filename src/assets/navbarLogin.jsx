import React, { useState } from 'react';
import { Menu, X, Briefcase, LogOut, Settings, User } from 'lucide-react';
import Styles from "../styles/navbarLogin.module.css"

// Assume this component is only rendered when the user is logged in
const NavBarLoggedIn = ({ user, handleLogout }) => { 
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Using placeholder user data if not passed as prop
    const defaultUser = { name: "Krizzia Vallecer", initials: "KZ" };
    const activeUser = user || defaultUser; 

    const primaryNavItems = [
        { name: 'Find Jobs', href: '/employee/home' },
        { name: 'Hire VAs', href: '/employer/talent-search' },
        { name: 'How It Works', href: '/about' },
    ];

    const userMenuItems = [
        { name: 'Profile Settings', href: '/employee/profile/edit', Icon: Settings },
        { name: 'Dashboard', href: '/employee/profile/edit', Icon: Briefcase }, // Assuming employee dashboard is profile edit for simplicity
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // The component assumes the user is logged in, removing the redundant isLoggedIn check inside JSX

    return (
        <nav className={Styles.navContainer}>
            <div className={Styles.navContent}>
                <div className={Styles.navFlex}>
                    
                    {/* Logo/Brand Name */}
                    <div className={Styles.logoContainer}>
                        <span className={Styles.logoText}>
                            Job<span className={Styles.logoDot}>+</span>
                        </span>
                    </div>

                    <div className={Styles.desktopNavWrapper}>
                        {/* Desktop Navigation Links */}
                        <div className={Styles.desktopNavLinks}>
                            <div className={Styles.navLinksList}>
                                {primaryNavItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={Styles.navLink}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Desktop User Buttons (Right Section) */}
                    <div className={Styles.desktopUserWrapper}>
                        {/* User Avatar & Name */}
                        <div className={Styles.userInfo}>
                            <div className={Styles.avatar}>
                                {activeUser.initials}
                            </div>
                            <span className={Styles.userName}>{activeUser.name}</span>
                        </div>

                        {/* Dashboard Link (Fixed to Job Seeker Profile Edit) */}
                        <a
                            href="/employee/profile/edit"
                            className={Styles.dashboardLink}
                        >
                            <Briefcase size={16} className="mr-1" />
                            Dashboard
                        </a>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout} 
                            className={Styles.logoutButton}
                        >
                            <LogOut size={16} className="mr-1" />
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className={Styles.mobileMenuButtonWrapper}>
                        <button
                            onClick={toggleMenu}
                            className={Styles.mobileMenuButton}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`${Styles.mobileMenuDropdownBase} ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className={Styles.mobileLinksList}>
                    
                    {/* Primary Links */}
                    {primaryNavItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className={Styles.mobileNavLink}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </a>
                    ))}

                    <>
                        <div className={Styles.mobileDivider}></div>

                        {/* Mobile User Info */}
                        <div className={Styles.mobileUserInfo}>
                            <div className={Styles.mobileAvatar}>
                                {activeUser.initials}
                            </div>
                            <span className={Styles.mobileUserName}>{activeUser.name}</span>
                        </div>

                        {/* User Menu Items */}
                        {userMenuItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={Styles.mobileNavLink}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <item.Icon size={20} className="inline mr-2 align-middle" /> {item.name}
                            </a>
                        ))}

                        {/* Mobile Logout Button */}
                        <button
                            onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                            className={Styles.mobileLogoutButton}
                        >
                            <LogOut size={20} className="mr-2" /> Logout
                        </button>
                    </>
                </div>
            </div>
        </nav>
    );
};

export default NavBarLoggedIn;