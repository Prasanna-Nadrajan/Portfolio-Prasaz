import { NavLink } from 'react-router-dom';
import { 
    IoPersonOutline, 
    IoBriefcaseOutline, 
    IoDocumentTextOutline, 
    IoLayersOutline, 
    IoStarOutline, 
    IoMailOutline 
} from 'react-icons/io5';

const Navbar = () => {
    const navItems = [
        { name: 'About', path: '/', icon: <IoPersonOutline size={20} /> },
        { name: 'Portfolio', path: '/portfolio', icon: <IoBriefcaseOutline size={20} /> },
        { name: 'Blog', path: '/blog', icon: <IoDocumentTextOutline size={20} /> },
        { name: 'Platforms', path: '/platforms', icon: <IoLayersOutline size={20} /> },
        { name: 'Experience', path: '/experience', icon: <IoStarOutline size={20} /> },
        { name: 'Contact', path: '/contact', icon: <IoMailOutline size={20} /> },
    ];

    return (
        <nav className="navbar fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-onyx/80 backdrop-blur-xl border border-jet rounded-3xl shadow-2xl z-50 md:static md:w-auto md:bg-transparent md:backdrop-blur-0 md:border-none md:shadow-none md:rounded-none md:ml-auto md:translate-x-0 md:max-w-none">
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
                            {/* Show Icon only on Mobile, Text on Desktop */}
                            <span className="md:hidden">{item.icon}</span>
                            <span className="hidden md:block">{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;