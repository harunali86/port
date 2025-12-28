// Preloader Component - Emerald + White theme
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        onComplete?.();
                    }, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    const letterVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            },
        }),
    };

    const name = 'HARUN';

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0f0d]"
                >
                    {/* Animated background orbs - Emerald theme */}
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.15, 0.3, 0.15],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/15 to-yellow-500/15 blur-3xl"
                        />
                    </div>

                    {/* Logo/Name animation - Emerald + White */}
                    <div className="relative z-10 flex gap-1 mb-8">
                        {name.split('').map((letter, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-6xl md:text-8xl font-black"
                                style={{
                                    background: i % 2 === 0
                                        ? 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'
                                        : 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>

                    {/* Progress bar - Emerald gradient */}
                    <div className="relative z-10 w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-white rounded-full"
                        />
                    </div>

                    {/* Loading text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative z-10 mt-4 text-white/60 text-sm font-medium tracking-widest"
                    >
                        LOADING {Math.min(Math.round(progress), 100)}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
