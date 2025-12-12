import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAchievements } from '../context/AchievementContext';
import { IoTrophyOutline } from 'react-icons/io5';

const AchievementToast = () => {
    const { recentAchievement, clearRecentAchievement } = useAchievements();

    useEffect(() => {
        if (recentAchievement) {
            const timer = setTimeout(() => {
                clearRecentAchievement();
            }, 4000); // Disappear after 4 seconds
            return () => clearTimeout(timer);
        }
    }, [recentAchievement, clearRecentAchievement]);

    return (
        <AnimatePresence>
            {recentAchievement && (
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-24 right-4 z-[100] bg-gray-900/90 backdrop-blur-md border border-neon-blue rounded-lg p-4 shadow-[0_0_15px_rgba(56,189,248,0.3)] max-w-sm flex items-center gap-4 border-l-4 border-l-neon-blue"
                >
                    <div className="bg-neon-blue/20 p-2 rounded-full text-neon-blue">
                        <IoTrophyOutline size={24} />
                    </div>
                    <div>
                        <h4 className="text-neon-blue font-bold text-sm uppercase tracking-wider">Achievement Unlocked</h4>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl">{recentAchievement.icon}</span>
                            <div>
                                <p className="text-white font-semibold text-sm">{recentAchievement.title}</p>
                                <p className="text-gray-400 text-xs">{recentAchievement.description}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AchievementToast;
