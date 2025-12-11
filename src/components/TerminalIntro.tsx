import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalIntroProps {
    command: string;
    logs: string[];
    onComplete: () => void;
}

const TerminalIntro = ({ command, logs, onComplete }: TerminalIntroProps) => {
    const [typedCommand, setTypedCommand] = useState('');
    const [logIndex, setLogIndex] = useState(-1);
    const [isComplete, setIsComplete] = useState(false);

    // Typing effect for the command
    useEffect(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < command.length) {
                setTypedCommand(prev => prev + command.charAt(index));
                index++;
            } else {
                clearInterval(typeInterval);
                // Start showing logs after a brief pause
                setTimeout(() => setLogIndex(0), 400);
            }
        }, 40); // Slightly faster typing

        return () => clearInterval(typeInterval);
    }, [command]);

    // Log sequencing
    useEffect(() => {
        if (logIndex >= 0 && logIndex < logs.length) {
            const timeout = setTimeout(() => {
                setLogIndex(prev => prev + 1);
            }, Math.random() * 300 + 150); // Faster log scroll
            return () => clearTimeout(timeout);
        } else if (logIndex === logs.length) {
            // Logs done
            const timeout = setTimeout(() => {
                setIsComplete(true);
                setTimeout(onComplete, 500); // Shorter exit wait
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [logIndex, logs, onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                >
                    <div className="w-full max-w-3xl bg-[#1e1e1e] rounded-lg shadow-2xl font-mono text-sm md:text-base flex flex-col h-[60vh] md:h-[500px] select-none overflow-hidden border border-gray-800">
                        {/* macOS Title Bar */}
                        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center relative border-b border-[#333]">
                            {/* Window Controls (Left) */}
                            <div className="flex gap-2 absolute left-4">
                                <div className="w-3 h-3 bg-[#ff5f56] rounded-full border border-[#e0443e]"></div>
                                <div className="w-3 h-3 bg-[#ffbd2e] rounded-full border border-[#dea123]"></div>
                                <div className="w-3 h-3 bg-[#27c93f] rounded-full border border-[#1aab29]"></div>
                            </div>
                            {/* Title (Center) */}
                            <div className="flex-1 text-center text-xs text-gray-400 font-semibold flex items-center justify-center gap-1">
                                <span className="opacity-80">prasaz — </span>
                                <span className="opacity-80">-zsh</span>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden scrollbar-hide bg-[#1e1e1e] text-[#f0f0f0] font-menlo">
                            <div className="mb-2 text-xs text-gray-400">
                                Last login: {new Date().toDateString()} on ttys000
                            </div>

                            <div className="space-y-1 leading-relaxed">
                                <div className="break-all">
                                    <span className="text-[#27c93f] font-bold">prasaz@portfolio</span>
                                    <span className="text-white"> ~ % </span>
                                    <span className="text-[#f0f0f0]">{typedCommand}</span>
                                    {!isComplete && logIndex === -1 && (
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="w-2.5 h-5 bg-gray-500/50 inline-block align-middle ml-1"
                                        />
                                    )}
                                </div>

                                {logs.map((log, index) => (
                                    index < logIndex && (
                                        <div key={index} className="text-[#f0f0f0] break-words">
                                            {log}
                                        </div>
                                    )
                                ))}

                                {logIndex >= 0 && !isComplete && (
                                    <div className="mt-2">
                                        <span className="text-[#27c93f] font-bold">prasaz@portfolio</span>
                                        <span className="text-white"> ~ % </span>
                                        <motion.span
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.8 }}
                                            className="w-2.5 h-5 bg-gray-500/50 inline-block align-middle ml-1"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TerminalIntro;
