import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    IoSearch,
    IoHomeOutline,
    IoPersonOutline,
    IoCodeSlashOutline,
    IoNewspaperOutline,
    IoMailOutline,
    IoLogoGithub,
    IoLogoLinkedin,
    IoMoonOutline,
    IoSunnyOutline,
    IoCopyOutline
} from 'react-icons/io5';

interface CommandItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    action: () => void;
    shortcut?: string;
    type: 'navigation' | 'external' | 'action';
}

const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    // Toggle open/close with Cmd+K / Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            }

            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    // Prevent scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const toggleTheme = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    const copyEmail = () => {
        navigator.clipboard.writeText('prasannanadrajan.r@gmail.com');
        // Ideally show a toast here
        alert('Email copied to clipboard!');
    };

    const items: CommandItem[] = [
        // Navigation
        { id: 'home', title: 'Home', icon: <IoHomeOutline />, type: 'navigation', action: () => navigate('/') },
        { id: 'about', title: 'About', icon: <IoPersonOutline />, type: 'navigation', action: () => navigate('/') },
        { id: 'portfolio', title: 'Portfolio', icon: <IoCodeSlashOutline />, type: 'navigation', action: () => navigate('/portfolio') },
        { id: 'blog', title: 'Blog', icon: <IoNewspaperOutline />, type: 'navigation', action: () => navigate('/blog') },
        { id: 'contact', title: 'Contact', icon: <IoMailOutline />, type: 'navigation', action: () => navigate('/contact') },

        // External
        { id: 'github', title: 'GitHub', icon: <IoLogoGithub />, type: 'external', action: () => window.open('https://github.com/Prasanna-Nadrajan', '_blank') },
        { id: 'linkedin', title: 'LinkedIn', icon: <IoLogoLinkedin />, type: 'external', action: () => window.open('https://www.linkedin.com/in/prasannanadrajan/', '_blank') },

        // Actions
        { id: 'theme', title: 'Toggle Theme', icon: <IoMoonOutline />, type: 'action', action: toggleTheme, shortcut: 'T' },
        { id: 'email', title: 'Copy Email', icon: <IoCopyOutline />, type: 'action', action: copyEmail, shortcut: 'E' },
    ];

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard navigation for the list
    useEffect(() => {
        const handleNavigation = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filteredItems[selectedIndex]) {
                    filteredItems[selectedIndex].action();
                    setIsOpen(false);
                    setQuery('');
                }
            }
        };

        window.addEventListener('keydown', handleNavigation);
        return () => window.removeEventListener('keydown', handleNavigation);
    }, [isOpen, filteredItems, selectedIndex]);

    // Reset selection when query changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="w-full max-w-2xl bg-container-bg border border-border-color rounded-xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[60vh]"
                        >
                            {/* Search Header */}
                            <div className="flex items-center px-4 py-4 border-b border-border-color">
                                <IoSearch className="text-light-gray-70 text-xl mr-3" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent border-none outline-none text-main-text placeholder-light-gray-70 text-lg"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <div className="hidden md:flex gap-1">
                                    <span className="text-xs bg-onyx text-light-gray-70 px-2 py-1 rounded">ESC</span>
                                </div>
                            </div>

                            {/* Results List */}
                            <div className="overflow-y-auto py-2">
                                {filteredItems.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-light-gray-70">
                                        No results found.
                                    </div>
                                ) : (
                                    <>
                                        <div className="px-3 mb-2 text-xs font-semibold text-light-gray-70 uppercase tracking-wider">
                                            Suggestions
                                        </div>
                                        {filteredItems.map((item, index) => (
                                            <div
                                                key={item.id}
                                                onClick={() => {
                                                    item.action();
                                                    setIsOpen(false);
                                                }}
                                                onMouseEnter={() => setSelectedIndex(index)}
                                                className={`px-4 py-3 mx-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${index === selectedIndex
                                                        ? 'bg-neon-blue/10 text-neon-blue'
                                                        : 'text-main-text hover:bg-onyx'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`${index === selectedIndex ? 'text-neon-blue' : 'text-light-gray-70'}`}>
                                                        {item.icon}
                                                    </span>
                                                    <span>{item.title}</span>
                                                </div>
                                                {item.shortcut && (
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-xs text-light-gray-70 bg-onyx px-1.5 py-0.5 rounded">{item.shortcut}</span>
                                                    </div>
                                                )}
                                                {item.type === 'navigation' && (
                                                    <span className="text-xs text-light-gray-70 opacity-0 group-hover:opacity-100 transition-opacity">Jump to</span>
                                                )}
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>

                            <div className="px-4 py-2 border-t border-border-color bg-onyx/50 text-xs text-light-gray-70 flex justify-between">
                                <div className="flex gap-4">
                                    <span><kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> to navigate</span>
                                    <span><kbd className="font-sans">↵</kbd> to select</span>
                                </div>
                                <div>
                                    Open commands with <kbd className="font-sans">Cmd+K</kbd>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;
