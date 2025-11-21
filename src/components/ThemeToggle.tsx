import { useState, useEffect } from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-onyx border border-jet text-neon-blue hover:bg-jet transition-colors duration-300 shadow-neon"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />}
        </button>
    );
};

export default ThemeToggle;
