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
            className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-violet-700 dark:hover:text-violet-500 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors duration-300"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />}
        </button>
    );
};

export default ThemeToggle;
