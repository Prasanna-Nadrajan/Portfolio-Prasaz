import { IoLogoGithub, IoLogoLinkedin, IoMailOutline } from 'react-icons/io5';

const Footer = () => {
    return (
        <footer className="mt-auto pt-10 pb-6 border-t border-jet bg-onyx/30 backdrop-blur-sm">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-semibold text-white mb-2">Prasanna Nadrajan</h3>
                        <p className="text-sm text-light-gray-70">
                            Building digital experiences with <span className="text-neon-blue">React</span> & <span className="text-neon-blue">Tailwind</span>
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a
                            href="https://github.com/Prasanna-Nadrajan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-jet rounded-lg text-light-gray-70 hover:text-neon-blue hover:bg-onyx transition-all duration-300 shadow-neon-hover"
                            aria-label="GitHub"
                        >
                            <IoLogoGithub size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/prasanna-nadrajan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-jet rounded-lg text-light-gray-70 hover:text-neon-blue hover:bg-onyx transition-all duration-300 shadow-neon-hover"
                            aria-label="LinkedIn"
                        >
                            <IoLogoLinkedin size={20} />
                        </a>
                        <a
                            href="mailto:prasannanadrajan.r@gmail.com"
                            className="p-2 bg-jet rounded-lg text-light-gray-70 hover:text-neon-blue hover:bg-onyx transition-all duration-300 shadow-neon-hover"
                            aria-label="Email"
                        >
                            <IoMailOutline size={20} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 text-center text-xs text-light-gray-70">
                    <p>&copy; {new Date().getFullYear()} Prasanna Nadrajan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
