// Magnetic Button Component
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
            className={`inline-block ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
