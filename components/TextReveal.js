// Text Reveal Animation Component using Framer Motion
import { motion } from 'framer-motion';

// Staggered text reveal - reveals each word with a delay
export function TextReveal({ children, className = '', delay = 0 }) {
    const words = children.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
        },
    };

    return (
        <motion.span
            className={`inline-flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="mr-[0.25em] inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Letter by letter reveal animation
export function LetterReveal({ children, className = '', delay = 0 }) {
    const letters = Array.from(children);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: delay },
        },
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 12,
                stiffness: 200,
            },
        },
        hidden: {
            opacity: 0,
            y: 50,
        },
    };

    return (
        <motion.span
            className={`inline-block ${className}`}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            {letters.map((letter, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block"
                    style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Slide up reveal for sections
export function SlideReveal({ children, className = '', delay = 0, direction = 'up' }) {
    const directions = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 },
    };

    return (
        <motion.div
            className={className}
            initial={{
                opacity: 0,
                ...directions[direction]
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                x: 0
            }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.7,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

// Scale reveal animation
export function ScaleReveal({ children, className = '', delay = 0 }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

// Staggered children reveal
export function StaggerReveal({ children, className = '', staggerDelay = 0.1 }) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className = '' }) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}
