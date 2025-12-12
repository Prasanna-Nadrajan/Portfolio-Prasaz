import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CommandHistory {
    command: string;
    output: string | React.ReactNode;
}

const Terminal = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([
        { command: 'help', output: 'Available commands: help, ls, cd, whoami, cat, clear' }
    ]);
    const [cmdHistoryValues, setCmdHistoryValues] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Auto-focus input
    useEffect(() => {
        inputRef.current?.focus();
    }, [history]);

    // Scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim();
        if (!trimmedCmd) return;

        // Add to command history for arrow navigation
        setCmdHistoryValues(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        const args = trimmedCmd.split(' ');
        const mainCmd = args[0].toLowerCase();
        let output: string | React.ReactNode = '';

        switch (mainCmd) {
            case 'help':
                output = (
                    <div className="text-gray-300">
                        <p className="mb-2">Available commands:</p>
                        <ul className="grid grid-cols-1 gap-1 ml-4">
                            <li><span className="text-neon-blue font-bold">ls</span> - List files/projects</li>
                            <li><span className="text-neon-blue font-bold">cd [dir]</span> - Navigate to a page</li>
                            <li><span className="text-neon-blue font-bold">cat [file]</span> - Read a file</li>
                            <li><span className="text-neon-blue font-bold">whoami</span> - Display user info</li>
                            <li><span className="text-neon-blue font-bold">clear</span> - Clear terminal</li>
                            <li><span className="text-neon-blue font-bold">exit</span> - Return to home</li>
                        </ul>
                    </div>
                );
                break;
            case 'ls':
                output = (
                    <div className="grid grid-cols-2 gap-4 text-neon-blue">
                        <span>about/</span>
                        <span>portfolio/</span>
                        <span>blog/</span>
                        <span>experience/</span>
                        <span>contact.txt</span>
                        <span>skills.json</span>
                    </div>
                );
                break;
            case 'whoami':
                output = "Prasanna Nadrajan | AI & Data Science Engineer | Full Stack Developer";
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'cd':
                if (args[1]) {
                    const target = args[1].replace('/', '');
                    const validRoutes = ['about', 'portfolio', 'blog', 'experience', 'platforms', 'resume', 'contact'];
                    if (target === '..') {
                        navigate(-1);
                        output = 'Navigating back...';
                    } else if (validRoutes.includes(target)) {
                        navigate('/' + target);
                        output = `Navigating to /${target}...`;
                    } else {
                        output = `cd: no such file or directory: ${target}`;
                    }
                } else {
                    navigate('/');
                    output = 'Navigating to root...';
                }
                break;
            case 'cat':
                if (args[1]) {
                    if (args[1] === 'contact.txt') {
                        output = 'Email: prasannanadrajan.r@gmail.com\nLinkedIn: linkedin.com/in/prasanna-nadrajan';
                    } else if (args[1] === 'skills.json') {
                        output = '["Python", "React", "TypeScript", "TensorFlow", "SQL"]';
                    } else {
                        output = `cat: ${args[1]}: No such file`;
                    }
                } else {
                    output = 'usage: cat [file]';
                }
                break;
            case 'exit':
                navigate('/');
                output = ' logging out...';
                break;
            default:
                output = `command not found: ${mainCmd}`;
        }

        setHistory(prev => [...prev, { command: trimmedCmd, output }]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistoryValues.length > 0) {
                const newIndex = historyIndex === -1 ? cmdHistoryValues.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(cmdHistoryValues[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = Math.min(cmdHistoryValues.length - 1, historyIndex + 1);
                setHistoryIndex(newIndex);
                setInput(cmdHistoryValues[newIndex]);

                if (historyIndex === cmdHistoryValues.length - 1) {
                    setHistoryIndex(-1);
                    setInput('');
                }
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-onyx text-neon-blue font-mono p-4 md:p-8 pt-24 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="max-w-4xl mx-auto">
                <div className="mb-4 text-gray-400">
                    <p>Welcome to Prasanna's Terminal [Version 1.0.0]</p>
                    <p>(c) 2025 Prasanna Nadrajan. All rights reserved.</p>
                    <p className="mt-2">Type <span className="text-neon-blue">help</span> for a list of commands.</p>
                </div>

                <div className="space-y-2">
                    {history.map((entry, i) => (
                        <div key={i} className="break-words">
                            <div className="flex gap-2">
                                <span className="text-green-500">guest@prasaz:~$</span>
                                <span className="text-gray-100">{entry.command}</span>
                            </div>
                            <div className="ml-0 mt-1 mb-2 text-gray-300 w-full whitespace-pre-wrap">
                                {entry.output}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-2 mt-2">
                    <span className="text-green-500">guest@prasaz:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent border-none outline-none text-gray-100 w-full caret-neon-blue"
                        autoFocus
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </motion.div>
    );
};

export default Terminal;
