import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IoMenu,
    IoClose,
    IoMailOutline,
    IoLocationOutline,
    IoLogoLinkedin,
    IoLogoGithub,
    IoChevronBack,
    IoChevronForward
} from 'react-icons/io5';
import ThemeToggle from './ThemeToggle';
import LeetCodeCelebration, { useLeetCodeCelebration } from './LeetCodeCelebration';
import DownloadButton from './DownloadButton';
import { navItems } from '../data/navigation';
import { CONFIG } from '../constants/config';

import { IoNotificationsOutline } from 'react-icons/io5';

interface NavbarProps {
    isSidebarOpen?: boolean;
    onToggleSidebar?: () => void;
    onShowUpdate?: () => void;
}

const Navbar = ({ isSidebarOpen = true, onToggleSidebar, onShowUpdate }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const { isActive, trigger, closeCelebration } = useLeetCodeCelebration();

    return (
        <>
            <LeetCodeCelebration isActive={isActive} onComplete={closeCelebration} />
            {/* Mobile Top Navbar */}
            <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-surface/90 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:hidden">
                <div className="flex items-center gap-3 cursor-pointer select-none" onClick={trigger}>
                    <figure className="w-10 h-10 rounded-full overflow-hidden border border-border">
                        <img
                            src="/assets/images/portfolio_image.png"
                            alt="Prasanna"
                            className="w-full h-full object-cover"
                        />
                    </figure>
                    <div className="flex flex-col">
                        <span className="text-text-main font-medium text-lg leading-tight">Prasanna</span>
                        <span className="text-xs text-text-muted font-light">Data Analyst</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Mobile Update Button in Top Bar for quick access */}
                    {onShowUpdate && (
                        <button
                            onClick={onShowUpdate}
                            className="text-primary p-2 rounded-lg hover:bg-surface-hover transition-colors animate-pulse"
                            aria-label="Show Updates"
                        >
                            <IoNotificationsOutline size={24} />
                        </button>
                    )}
                    <button
                        onClick={toggleMenu}
                        className="text-primary p-2 rounded-lg hover:bg-surface-hover transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Full Screen Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-20 px-6 md:hidden flex flex-col overflow-y-auto"
                    >
                        <ul className="flex flex-col gap-4 mb-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isActive
                                                ? 'bg-primary/10 text-primary border border-primary/20'
                                                : 'text-text-secondary hover:text-text-main hover:bg-surface-hover'
                                            }`
                                        }
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-lg font-medium">{item.name}</span>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>

                        {/* Sidebar Content Migrated to Menu */}
                        <div className="mt-auto mb-8 border-t border-border pt-6">
                            <ul className="flex flex-col gap-4 mb-6">
                                <li className="flex items-center gap-4 text-text-secondary">
                                    <div className="p-2 bg-surface-hover rounded-lg text-primary">
                                        <IoMailOutline size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-text-muted">Email</span>
                                        <a href={`mailto:${CONFIG.EMAIL}`} className="text-sm text-text-main hover:text-primary transition-colors">
                                            {CONFIG.EMAIL}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4 text-text-secondary">
                                    <div className="p-2 bg-surface-hover rounded-lg text-primary">
                                        <IoLocationOutline size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-text-muted">Location</span>
                                        <span className="text-sm text-text-main">{CONFIG.LOCATION}</span>
                                    </div>
                                </li>
                            </ul>

                            <div className="flex justify-center gap-6 mb-6">
                                <a href={CONFIG.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                                    <IoLogoLinkedin size={24} />
                                </a>
                                <a href={CONFIG.GITHUB} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-primary transition-colors">
                                    <IoLogoGithub size={24} />
                                </a>
                            </div>

                            {/* Theme Toggle for Mobile */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-surface-hover p-2 rounded-xl flex items-center gap-3">
                                    <span className="text-sm text-text-muted">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>

                            <div className="mb-4 flex justify-center">
                                <DownloadButton />
                            </div>

                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                                className="flex items-center justify-center w-full py-4 bg-primary text-background rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                Contact Me
                            </NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Navbar */}
            <nav className="glass-nav hidden md:block">
                <div className="container mx-auto px-4 md:px-16 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Collapse/Expand Sidebar Button - Integrated into Navbar */}
                        <button
                            onClick={onToggleSidebar}
                            className="p-2 bg-surface hover:bg-surface-hover rounded-lg text-primary hover:text-primary-dark transition-colors shadow-sm border border-border"
                            title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                        >
                            {isSidebarOpen ? <IoChevronBack size={20} /> : <IoChevronForward size={20} />}
                        </button>

                        {/* Profile Picture - Always visible for Celebration Trigger */}
                        <div
                            className="flex items-center gap-3 cursor-pointer select-none"
                            onClick={trigger}
                        >
                            <figure className="w-10 h-10 rounded-full overflow-hidden border border-border">
                                <img
                                    src="/assets/images/portfolio_image.jpg"
                                    alt="Prasanna"
                                    className="w-full h-full object-cover"
                                />
                            </figure>
                            <div className="flex flex-col">
                                <span className="text-text-main font-medium text-sm leading-tight">Prasanna Nadrajan</span>
                                <span className="text-xs text-text-muted font-light">Data Analyst</span>
                            </div>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <ul className="flex items-center gap-8">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `text-sm font-medium transition-colors hover:text-primary ${isActive
                                            ? 'text-primary'
                                            : 'text-text-secondary'
                                        }`
                                    }
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Right side actions - empty for now but keeps layout balanced */}
                    <div className="flex items-center gap-4">
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
