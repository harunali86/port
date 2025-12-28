// Custom Animated Cursor - Emerald Theme
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function AnimatedCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [mounted, setMounted] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        setMounted(true);

        // Hide cursor on touch devices
        if ('ontouchstart' in window) return;

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-cursor-hover]')
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-cursor-hover]')
            ) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [cursorX, cursorY]);

    // Don't render on touch devices or server
    if (!mounted || (typeof window !== 'undefined' && 'ontouchstart' in window)) {
        return null;
    }

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        scale: isClicking ? 0.5 : isHovering ? 0.5 : 1,
                        backgroundColor: isHovering ? '#10b981' : '#ffffff',
                    }}
                    transition={{ duration: 0.15 }}
                    className="w-3 h-3 rounded-full"
                />
            </motion.div>

            {/* Cursor ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.8 : 1,
                        borderColor: isHovering ? '#10b981' : 'rgba(255,255,255,0.5)',
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-8 h-8 rounded-full border-2"
                />
            </motion.div>

            {/* Hide default cursor */}
            <style jsx global>{`
                @media (hover: hover) and (pointer: fine) {
                    * {
                        cursor: none !important;
                    }
                }
            `}</style>
        </>
    );
}
