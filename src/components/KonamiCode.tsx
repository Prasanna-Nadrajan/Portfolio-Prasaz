import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IoGameController } from 'react-icons/io5';
import { useAchievements } from '../context/AchievementContext';

const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
];

const KonamiCode = () => {
    const [, setInput] = useState<string[]>([]);
    const [activated, setActivated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { unlockAchievement } = useAchievements();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            setInput((prev) => {
                const updated = [...prev, key].slice(-KONAMI_CODE.length);

                if (updated.join('') === KONAMI_CODE.join('')) {
                    activateGodMode();
                    return [];
                }
                return updated;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activated]); // Add activated to deps if used in activateGodMode closure, or functional update

    const activateGodMode = () => {
        if (document.documentElement.classList.contains('god-mode')) {
            document.documentElement.classList.remove('god-mode');
            setActivated(false);
            showToastNotification("God Mode Deactivated");
        } else {
            document.documentElement.classList.add('god-mode');
            setActivated(true);
            playGlitchSound();
            unlockAchievement('hacker');
            showToastNotification("CHEAT CODE ACTIVATED: GOD MODE");
        }
    };

    const showToastNotification = (msg: string) => {
        setToastMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const playGlitchSound = () => {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(110, audioCtx.currentTime); // Low freq
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5); // Slide up

        gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    };

    return (
        <AnimatePresence>
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -50 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-8 z-[200] bg-green-900 border border-green-500 text-green-100 px-6 py-4 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.5)] font-mono flex items-center gap-3"
                >
                    <IoGameController className="text-2xl animate-pulse" />
                    <div>
                        <h4 className="font-bold text-sm tracking-widest uppercase">System Override</h4>
                        <p className="text-xs">{toastMessage}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default KonamiCode;
