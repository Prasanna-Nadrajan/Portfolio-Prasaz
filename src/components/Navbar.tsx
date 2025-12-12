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

    return (
        <>
            {/* Mobile Top Navbar */}
            <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-onyx/90 backdrop-blur-md border-b border-jet flex items-center justify-between px-4 md:hidden">
                <div className="flex items-center gap-3">
                    <figure className="w-10 h-10 rounded-full overflow-hidden border border-neon-blue">
                        <img
                            src="/assets/images/portfolio_image.png"
                            alt="Prasanna"
                            className="w-full h-full object-cover"
                        />
                    </figure>
                    <div className="flex flex-col">
                        <span className="text-main-text font-medium text-lg leading-tight">Prasanna</span>
                        <span className="text-xs text-neon-blue font-light">Data Analyst</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Mobile Update Button in Top Bar for quick access */}
                    {onShowUpdate && (
                        <button
                            onClick={onShowUpdate}
                            className="text-neon-blue p-2 rounded-lg hover:bg-jet/50 transition-colors animate-pulse"
                            aria-label="Show Updates"
                        >
                            <IoNotificationsOutline size={24} />
                        </button>
                    )}
                    <button
                        onClick={toggleMenu}
                        className="text-neon-blue p-2 rounded-lg hover:bg-jet/50 transition-colors"
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
                        className="fixed inset-0 z-40 bg-main-bg/95 backdrop-blur-xl pt-20 px-6 md:hidden flex flex-col overflow-y-auto"
                    >
                        <ul className="flex flex-col gap-4 mb-8">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${isActive
                                                ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                                                : 'text-secondary-text hover:text-main-text hover:bg-jet/30'
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
                        <div className="mt-auto mb-8 border-t border-jet pt-6">
                            <ul className="flex flex-col gap-4 mb-6">
                                <li className="flex items-center gap-4 text-secondary-text">
                                    <div className="p-2 bg-jet/50 rounded-lg text-neon-blue">
                                        <IoMailOutline size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-light-gray-70">Email</span>
                                        <a href={`mailto:${CONFIG.EMAIL}`} className="text-sm text-main-text hover:text-neon-blue transition-colors">
                                            {CONFIG.EMAIL}
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-center gap-4 text-secondary-text">
                                    <div className="p-2 bg-jet/50 rounded-lg text-neon-blue">
                                        <IoLocationOutline size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase text-light-gray-70">Location</span>
                                        <span className="text-sm text-main-text">{CONFIG.LOCATION}</span>
                                    </div>
                                </li>
                            </ul>

                            <div className="flex justify-center gap-6 mb-6">
                                <a href={CONFIG.LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-light-gray-70 hover:text-neon-blue transition-colors">
                                    <IoLogoLinkedin size={24} />
                                </a>
                                <a href={CONFIG.GITHUB} target="_blank" rel="noopener noreferrer" className="text-light-gray-70 hover:text-neon-blue transition-colors">
                                    <IoLogoGithub size={24} />
                                </a>
                            </div>

                            {/* Theme Toggle for Mobile */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-jet/50 p-2 rounded-xl flex items-center gap-3">
                                    <span className="text-sm text-light-gray-70">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>

                            <div className="mb-4 flex justify-center">
                                <DownloadButton />
                            </div>

                            <NavLink
                                to="/contact"
                                onClick={closeMenu}
                                className="flex items-center justify-center w-full py-4 bg-neon-blue text-white rounded-xl font-semibold shadow-neon hover:shadow-neon-hover transition-all"
                            >
                                Contact Me
                            </NavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Navbar (Existing Logic) */}
            <nav className="hidden md:flex items-center gap-4 navbar md:static md:w-auto md:bg-transparent md:backdrop-blur-0 md:border-none md:shadow-none md:rounded-none md:ml-auto md:translate-x-0 md:max-w-none">

                {/* Collapse/Expand Sidebar Button */}
                <button
                    onClick={onToggleSidebar}
                    className="p-2 bg-jet/50 rounded-lg text-neon-blue hover:text-white hover:bg-jet transition-colors shadow-neon"
                    title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
                >
                    {isSidebarOpen ? <IoChevronBack size={20} /> : <IoChevronForward size={20} />}
                </button>

                {/* Conditional Profile Picture when Sidebar is Closed */}
                {!isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 bg-container-bg border border-jet rounded-xl px-3 py-1 shadow-neon"
                    >
                        <figure className="w-8 h-8 rounded-full overflow-hidden border border-neon-blue">
                            <img
                                src="/assets/images/portfolio_image.png"
                                alt="Prasanna"
                                className="w-full h-full object-cover"
                            />
                        </figure>
                        <div className="flex flex-col">
                            <span className="text-main-text font-medium text-xs leading-tight">Prasanna Nadrajan</span>
                            <span className="text-[10px] text-neon-blue font-light">Data Analyst</span>
                        </div>
                    </motion.div>
                )}

                <ul className="navbar-list flex justify-between items-center px-6 py-3 md:bg-container-bg md:border md:border-jet md:rounded-tr-2xl md:rounded-bl-2xl md:px-8 md:shadow-neon md:gap-8 md:py-0">
                    {navItems.map((item) => (
                        <li key={item.name} className="navbar-item">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `navbar-link flex flex-col items-center gap-1 text-secondary-text text-[10px] md:text-sm py-1 md:py-5 px-2 transition-colors duration-300 hover:text-light-gray-70 ${isActive ? 'text-neon-blue font-medium' : ''
                                    }`
                                }
                            >
                                <span className="hidden md:block">{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </nav>
        </>
    );
};

export default Navbar;
