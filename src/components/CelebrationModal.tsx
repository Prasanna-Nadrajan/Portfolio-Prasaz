import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { IoClose, IoRocketSharp, IoStarSharp } from 'react-icons/io5';

interface CelebrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    viewCount?: number;
}

const CelebrationModal = ({ isOpen, onClose, viewCount = 0 }: CelebrationModalProps) => {

    const fireConfetti = () => {
        // "Glitter papers falling down in the sides"
        const duration = 3000;
        const animationEnd = Date.now() + duration;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 20 * (timeLeft / duration);

            // Left side
            confetti({
                particleCount,
                startVelocity: 30,
                spread: 80,
                origin: { x: 0, y: 0.2 },
                colors: ['#00BFFF', '#FFD700', '#C0C0C0', '#FFFFFF'], // Cyan, Gold, Silver, White
                shapes: ['square', 'circle'],
                zIndex: 9999
            });

            // Right side
            confetti({
                particleCount,
                startVelocity: 30,
                spread: 80,
                origin: { x: 1, y: 0.2 },
                colors: ['#00BFFF', '#FFD700', '#C0C0C0', '#FFFFFF'],
                shapes: ['square', 'circle'],
                zIndex: 9999
            });

        }, 250);

        // Also a big burst in the middle at start
        confetti({
            particleCount: 100,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#00BFFF', '#FFD700'],
            zIndex: 9999
        });
    };

    useEffect(() => {
        if (isOpen) {
            fireConfetti();
        }
    }, [isOpen]);

    const handleCelebrateParams = () => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#00BFFF', '#FFD700', '#FF00FF'],
            zIndex: 10000
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
                    onClick={onClose}
                >
                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 100 }}
                        transition={{ type: "spring", damping: 15, stiffness: 100 }}
                        className="glass-card max-w-lg w-full relative p-8 text-center border border-neon-blue/30 shadow-[0_0_80px_rgba(0,191,255,0.2)] bg-gradient-to-b from-gray-900 to-black overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-neon-blue/20 rounded-full blur-[40px]"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px]"></div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <IoClose size={24} />
                        </button>

                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-purple-600 p-[2px] shadow-lg animate-pulse-glow">
                                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                    <IoRocketSharp className="text-3xl text-white" />
                                </div>
                            </div>
                        </div>

                        <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2 font-pixelated tracking-wider">
                            MILESTONE UNLOCKED
                        </h2>

                        <div className="my-8 relative group cursor-default">
                            <div className="absolute inset-0 bg-neon-blue/20 blur-xl group-hover:bg-neon-blue/30 transition-all duration-500 rounded-full"></div>
                            <div className="relative text-7xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,191,255,0.8)] font-sans">
                                {Math.floor(viewCount / 100) * 100}+
                            </div>
                            <div className="relative text-sm text-neon-blue tracking-[0.2em] uppercase mt-2 font-medium">
                                Views Reached
                            </div>
                        </div>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-sm mx-auto font-light">
                            My portfolio views reached past <strong className="text-white">{Math.floor(viewCount / 100) * 100}</strong>!
                            <br />
                            <span className="text-sm mt-2 block text-gray-400">Thank you for your cooperation and support.</span>
                        </p>

                        <button
                            onClick={handleCelebrateParams}
                            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-cyan-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute inset-0 border border-neon-blue/50 rounded-lg group-hover:border-neon-blue transition-colors"></div>
                            <span className="relative flex items-center justify-center gap-2 text-neon-blue group-hover:text-white font-medium transition-colors">
                                <IoStarSharp />
                                <span>Celebrate</span>
                                <IoStarSharp />
                            </span>
                        </button>

                        <div className="mt-6 text-[10px] text-gray-600 font-mono">
                            SYSTEM_MSG_ID: {Math.floor(viewCount / 100) * 100}_VIEWS_ACK
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CelebrationModal;
