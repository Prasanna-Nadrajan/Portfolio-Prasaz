import { Link } from 'react-router-dom';
import {
    IoLogoGithub,
    IoLogoLinkedin,
    IoMailOutline,
    IoLogoInstagram,
    IoHomeOutline,
    IoPersonOutline,
    IoBriefcaseOutline,
    IoDocumentTextOutline,
    IoCallOutline
} from 'react-icons/io5';
import VisitorCounter from './VisitorCounter';
import SecretHint from './SecretHint';

const Footer = () => {
    const navLinks = [
        { name: 'Home', path: '/', icon: <IoHomeOutline /> },
        { name: 'About', path: '/', icon: <IoPersonOutline /> },
        { name: 'Portfolio', path: '/portfolio', icon: <IoBriefcaseOutline /> },
        { name: 'Resume', path: '/resume', icon: <IoDocumentTextOutline /> },
        { name: 'Contact', path: '/contact', icon: <IoCallOutline /> },
    ];

    return (
        <footer className="mt-auto pt-16 pb-8 border-t border-jet bg-onyx/30 backdrop-blur-sm relative overflow-hidden">
            <SecretHint hint="Some text looks glitchy..." position="bottom-right" delay={10000} />
            {/* Dot Pattern Background - Bolder */}
            <div className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                    // Increased dot size to 2px for a "bold" look
                    backgroundImage: 'radial-gradient(#999 2px, transparent 2px)',
                    backgroundSize: '30px 30px' // Slightly spaced out to prevent clutter with larger dots
                }}
            ></div>

            {/* Gradient Overlay to fade dots at edges (Optional aesthetics) */}
            <div className="absolute inset-0 bg-gradient-to-t from-main-bg/80 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">

                {/* 1. Visitor Counter Section */}
                <VisitorCounter />

                {/* 2. Navigation Links */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10 mt-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="flex items-center gap-2 text-secondary-text hover:text-neon-blue transition-colors duration-300 text-sm md:text-base font-medium group"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform duration-300">{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* 3. Quote / Text */}
                <div className="text-center mb-8 px-4">
                    <p className="text-light-gray-70 text-sm md:text-base italic font-light leading-relaxed">
                        "Thanks for giving me my targeted bounce rate. Hope this was better than an ATS-friendly text."
                    </p>
                </div>

                {/* 4. Credits */}
                <div className="text-center mb-8">
                    <p className="text-main-text text-sm font-medium">
                        ~ Designed and Developed by <span className="text-neon-blue">Prasanna Nadrajan</span> ~
                    </p>
                </div>

                {/* 5. Social Icons */}
                <div className="flex justify-center gap-6">
                    <a
                        href="https://github.com/Prasanna-Nadrajan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-gray-70 hover:text-neon-blue transition-all duration-300 hover:scale-125 hover:rotate-6"
                        aria-label="GitHub"
                    >
                        <IoLogoGithub size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/prasanna-nadrajan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-gray-70 hover:text-neon-blue transition-all duration-300 hover:scale-125 hover:-rotate-6"
                        aria-label="LinkedIn"
                    >
                        <IoLogoLinkedin size={24} />
                    </a>
                    <a
                        href="mailto:prasannanadrajan.r@gmail.com"
                        className="text-light-gray-70 hover:text-neon-blue transition-all duration-300 hover:scale-125 hover:rotate-6"
                        aria-label="Email"
                    >
                        <IoMailOutline size={24} />
                    </a>
                    <a
                        href="https://www.instagram.com/prasanna_nadrajan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-gray-70 hover:text-neon-blue transition-all duration-300 hover:scale-125 hover:-rotate-6"
                        aria-label="Instagram"
                    >
                        <IoLogoInstagram size={24} />
                    </a>
                </div>

                <div className="mt-8 text-center text-[10px] text-jet">
                    <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;