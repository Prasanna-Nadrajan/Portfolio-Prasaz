import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoDownloadOutline, IoTerminal, IoCheckmarkCircle } from 'react-icons/io5';

const DownloadButton = () => {
    const [status, setStatus] = useState<'idle' | 'downloading' | 'complete'>('idle');
    const [progress, setProgress] = useState(0);

    const handleDownload = () => {
        setStatus('downloading');
        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 15;
            if (p >= 100) {
                p = 100;
                clearInterval(interval);
                setTimeout(() => {
                    setStatus('complete');
                    triggerFileDownload();
                    setTimeout(() => setStatus('idle'), 3000);
                }, 500);
            }
            setProgress(p);
        }, 200);
    };

    const triggerFileDownload = () => {
        // In a real app, this would be a link click
        const link = document.createElement('a');
        link.href = "/assets/Prasanna_Nadrajan_Resume.pdf"; // Update path as needed
        link.download = "Prasanna_Nadrajan_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="relative">
            <AnimatePresence mode='wait'>
                {status === 'idle' && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-gradient-to-r from-neon-blue to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
                    >
                        <IoDownloadOutline className="text-xl" />
                        <span>Resume</span>
                    </motion.button>
                )}

                {status === 'downloading' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-black border border-green-500 text-green-500 px-4 py-2 rounded-lg font-mono text-xs w-48 shadow-[0_0_10px_rgba(0,255,0,0.2)]"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <IoTerminal />
                            <span>wget resume.pdf</span>
                        </div>
                        <div className="w-full bg-green-900/30 h-1.5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-green-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="text-right mt-1">{Math.floor(progress)}%</div>
                    </motion.div>
                )}

                {status === 'complete' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 bg-green-500 text-black px-4 py-2 rounded-lg font-bold"
                    >
                        <IoCheckmarkCircle className="text-xl" />
                        <span>GRANTED</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DownloadButton;
