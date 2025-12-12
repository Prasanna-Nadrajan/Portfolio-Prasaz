import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CHARS = 'XYZ0101010101';

const MatrixRain = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = CHARS[Math.floor(Math.random() * CHARS.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />;
};

export default function HackingGame({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<'intro' | 'game' | 'win' | 'fail'>('intro');
    const [code, setCode] = useState('');
    const [targetCode, setTargetCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(10);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (step === 'intro') {
            const timer = setTimeout(() => {
                setTargetCode(Math.random().toString(36).substring(2, 8).toUpperCase());
                setStep('game');
                setTimeLeft(10);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    useEffect(() => {
        if (step === 'game') {
            inputRef.current?.focus();
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setStep('fail');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setCode(val);
        if (val === targetCode) {
            setStep('win');
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black flex items-center justify-center font-mono overflow-hidden"
            >
                <MatrixRain />

                <div className="relative z-10 p-10 border border-green-500 bg-black/80 shadow-[0_0_50px_rgba(0,255,0,0.3)] max-w-lg w-full text-center">

                    <button
                        onClick={onClose}
                        className="absolute top-2 right-4 text-green-500 hover:text-white"
                    >X</button>

                    {step === 'intro' && (
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="text-green-500 text-xl"
                        >
                            INITIALIZING HACK SEQUENCE...
                            <div className="mt-4 w-full bg-green-900/30 h-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2 }}
                                    className="h-full bg-green-500"
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 'game' && (
                        <div className="space-y-6">
                            <h2 className="text-red-500 text-3xl font-bold animate-pulse">BREACH FIREWALL</h2>
                            <div className="text-green-400">
                                <p>TARGET HASH: <span className="text-white text-xl bg-green-900/50 px-2">{targetCode}</span></p>
                                <p className="mt-2 text-sm text-gray-400">TIME REMAINING: {timeLeft}s</p>
                            </div>

                            <input
                                ref={inputRef}
                                type="text"
                                value={code}
                                onChange={handleInput}
                                className="w-full bg-black border-2 border-green-500 text-green-500 text-center text-2xl p-2 outline-none focus:shadow-[0_0_20px_rgba(0,255,0,0.5)]"
                                placeholder="ENTER CODE"
                                autoFocus
                            />
                        </div>
                    )}

                    {step === 'win' && (
                        <div className="text-green-500">
                            <h2 className="text-4xl font-bold mb-4">ACCESS GRANTED</h2>
                            <p>Secret Project Unlocked: "Dark Matter UI"</p>
                            <div className="mt-6 flex justify-center">
                                <button className="bg-green-600 text-black px-6 py-2 bg-green-500 hover:bg-green-400 font-bold" onClick={onClose}>
                                    ENTER SYSTEM
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 'fail' && (
                        <div className="text-red-500">
                            <h2 className="text-4xl font-bold mb-4">ACCESS DENIED</h2>
                            <p>Trace complete. Connection terminated.</p>
                            <button className="mt-6 border border-red-500 text-red-500 px-6 py-2 hover:bg-red-500 hover:text-black" onClick={onClose}>
                                DISCONNECT
                            </button>
                        </div>
                    )}

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
