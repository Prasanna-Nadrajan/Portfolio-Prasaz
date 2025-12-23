import { useState, useEffect } from 'react';
import { IoChevronDown, IoMailOutline, IoLocationOutline, IoLogoLinkedin, IoLogoGithub, IoNotificationsOutline } from 'react-icons/io5';
import AvailabilityStatus from './AvailabilityStatus';

const roles = [
    "Sophomore at REC",
    "Data Analyst",
    "Business Intelligence Enthusiast",
    "Data Storyteller"
];

interface SidebarProps {
    onShowUpdate?: () => void;
    onShowLinkedInUpdate?: () => void;
    viewCount?: number;
}

const Sidebar = ({ onShowUpdate, onShowLinkedInUpdate, viewCount = 0 }: SidebarProps) => {
    const [isActive, setIsActive] = useState(false);

    // Typewriter State
    const [text, setText] = useState('');
    const [roleIndex, setRoleIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    // Typewriter Logic
    useEffect(() => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Deleting Phase
            if (text.length > 0) {
                const timeout = setTimeout(() => {
                    setText(prev => prev.slice(0, -1));
                }, 50);
                return () => clearTimeout(timeout);
            } else {
                // Finished deleting, wait 500ms then switch to typing next word
                const timeout = setTimeout(() => {
                    setIsDeleting(false);
                    setRoleIndex(prev => (prev + 1) % roles.length);
                }, 500);
                return () => clearTimeout(timeout);
            }
        } else {
            // Typing Phase
            if (text.length < currentRole.length) {
                const timeout = setTimeout(() => {
                    setText(currentRole.slice(0, text.length + 1));
                }, 100);
                return () => clearTimeout(timeout);
            } else {
                // Finished typing, wait 1000ms then switch to deleting
                const timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 1000);
                return () => clearTimeout(timeout);
            }
        }
    }, [text, isDeleting, roleIndex]);

    return (
        <div className="sidebar-wrapper md:sticky md:top-28 md:h-fit">
            <aside
                className={`sidebar bg-container-bg/50 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-neon z-10 transition-all duration-500 ease-in-out overflow-hidden hidden md:block ${isActive ? 'max-h-[500px]' : 'max-h-[120px] md:max-h-full'}`}
                data-sidebar
            >
                <div className="sidebar-info flex flex-col md:flex-col gap-4 relative">

                    <figure className="avatar-box bg-bg-gradient-onyx rounded-2xl overflow-hidden w-64 mx-auto md:w-11/12">
                        <img
                            src="/assets/images/portfolio_image.jpg"
                            alt="Prasanna Nadrajan"
                            className="w-full h-auto"
                        />
                    </figure>

                    <div className="info-content text-center">
                        <h1 className="name text-main-text text-xl font-medium mb-2" title="Prasanna Nadrajan">
                            Prasanna Nadrajan
                        </h1>

                        {/* Dynamic Typewriter Role */}
                        <p className="title bg-onyx text-main-text text-xs font-light px-3 py-1 rounded-lg inline-block min-w-[150px]">
                            {text}
                            <span className="animate-pulse">|</span>
                        </p>
                    </div>

                    <button
                        className="info_more-btn md:hidden absolute top-0 right-0 text-neon-blue bg-border-gradient-onyx p-2 rounded-tr-xl rounded-bl-xl shadow-neon z-10"
                        onClick={toggleSidebar}
                    >
                        <span className='hidden'>Show Contacts</span>
                        <IoChevronDown className={`transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className={`sidebar-info_more opacity-0 md:opacity-100 md:visible transition-opacity duration-500 ${isActive ? 'opacity-100 visible mt-6' : 'invisible h-0 md:h-auto md:mt-6'}`}>

                    <div className="separator w-full h-[1px] bg-jet my-4"></div>

                    <ul className="contacts-list grid grid-cols-1 gap-4">
                        <li className="contact-item flex items-center gap-4">
                            <div className="icon-box">
                                <IoMailOutline />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title text-light-gray-70 text-xs uppercase mb-1">Email</p>
                                <a href="mailto:prasannanadrajan.r@gmail.com" className="contact-link text-main-text text-sm hover:text-light-gray-70 break-all">
                                    prasannanadrajan.r@gmail.com
                                </a>
                            </div>
                        </li>

                        <li className="contact-item flex items-center gap-4">
                            <div className="icon-box">
                                <IoLocationOutline />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title text-light-gray-70 text-xs uppercase mb-1">Location</p>
                                <address className="text-main-text text-sm not-italic">Chennai, India</address>
                            </div>
                        </li>
                    </ul>

                    <div className="separator w-full h-[1px] bg-jet my-4"></div>

                    <ul className="social-list flex justify-center items-center gap-4">
                        <li className="social-item">
                            <a href="https://www.linkedin.com/in/prasannanadrajan/" className="social-link text-light-gray-70 text-lg hover:text-secondary-text">
                                <IoLogoLinkedin />
                            </a>
                        </li>
                        <li className="social-item">
                            <a href="https://github.com/Prasanna-Nadrajan" className="social-link text-light-gray-70 text-lg hover:text-secondary-text">
                                <IoLogoGithub />
                            </a>
                        </li>
                    </ul>

                    <div className="flex justify-center mt-4">
                        <AvailabilityStatus available={true} />
                    </div>
                </div>
            </aside>

            {/* Bottom Buttons Container */}
            <div className="hidden md:flex justify-center mt-4 gap-4">
                {/* Update Button - Floating below sidebar on desktop */}
                {
                    onShowUpdate && (
                        <button
                            onClick={onShowUpdate}
                            className="relative w-12 h-12 bg-container-bg/50 backdrop-blur-xl border border-white/20 rounded-xl shadow-neon flex items-center justify-center text-neon-blue hover:bg-jet/30 hover:scale-105 transition-all duration-300 group"
                            aria-label="View Updates"
                            title="New Updates Available"
                        >
                            <IoNotificationsOutline size={24} />

                            {/* Red Dot for Update - positioned at upper right with explicit styling */}
                            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>

                            {/* Tooltip style label on hover */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {Math.floor(viewCount / 100) * 100}+ Views
                            </span>
                        </button>
                    )
                }

                {/* LinkedIn Celebration Button */}
                {
                    onShowLinkedInUpdate && (
                        <button
                            onClick={onShowLinkedInUpdate}
                            className="relative w-12 h-12 bg-container-bg/50 backdrop-blur-xl border border-white/20 rounded-xl shadow-neon flex items-center justify-center text-neon-blue hover:bg-jet/30 hover:scale-105 transition-all duration-300 group"
                            aria-label="LinkedIn 5000+ Impressions"
                            title="LinkedIn Milestone Reached!"
                        >
                            <IoLogoLinkedin size={24} />

                            {/* Blue Dot for Update */}
                            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                            </span>

                            {/* Tooltip style label on hover */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                5000+ Impressions
                            </span>
                        </button>
                    )
                }
            </div>
        </div >
    );
};

export default Sidebar;