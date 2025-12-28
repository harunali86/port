// K72-Style Premium Hamburger Menu
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function K72Hamburger({ isOpen, onClick }) {
    const ref = useRef(null);

    // Magnetic effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 300, damping: 20 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = (e.clientX - centerX) * 0.3;
        const distY = (e.clientY - centerY) * 0.3;
        x.set(distX);
        y.set(distY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative w-16 h-16 flex items-center justify-center cursor-pointer"
            style={{ x: xSpring, y: ySpring }}
            whileTap={{ scale: 0.9 }}
            aria-label="Menu"
        >
            {/* Outer circle - appears on hover */}
            <motion.div
                className="absolute inset-0 rounded-full border-2"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                animate={{
                    borderColor: isOpen ? "#fbbf24" : "#10b981",
                    rotate: isOpen ? 90 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{ borderColor: isOpen ? "#fbbf24" : "rgba(16, 185, 129, 0.5)" }}
            />

            {/* Inner circle - background */}
            <motion.div
                className="absolute inset-2 rounded-full"
                animate={{
                    backgroundColor: isOpen ? "rgba(251, 191, 36, 0.1)" : "rgba(16, 185, 129, 0.1)",
                    scale: isOpen ? 1.1 : 1,
                }}
                whileHover={{ backgroundColor: isOpen ? "rgba(251, 191, 36, 0.2)" : "rgba(16, 185, 129, 0.2)" }}
                transition={{ duration: 0.2 }}
            />

            {/* Hamburger lines container */}
            <div className="relative w-7 h-5 flex flex-col justify-between items-center z-10">
                {/* Top line */}
                <motion.span
                    className="absolute top-0 left-0 h-[2.5px] rounded-full origin-center"
                    animate={{
                        width: isOpen ? "100%" : "100%",
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 9 : 0,
                        backgroundColor: isOpen ? "#fbbf24" : "#ffffff",
                    }}
                    whileHover={{ width: "100%", backgroundColor: "#10b981" }}
                    transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                    style={{ width: "100%" }}
                />

                {/* Middle line */}
                <motion.span
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-[2.5px] rounded-full"
                    animate={{
                        width: isOpen ? 0 : "60%",
                        opacity: isOpen ? 0 : 1,
                        x: isOpen ? 15 : 0,
                        backgroundColor: "#ffffff",
                    }}
                    whileHover={{ width: isOpen ? 0 : "80%", backgroundColor: "#10b981" }}
                    transition={{ duration: 0.2 }}
                    style={{ width: "60%" }}
                />

                {/* Bottom line */}
                <motion.span
                    className="absolute bottom-0 left-0 h-[2.5px] rounded-full origin-center"
                    animate={{
                        width: isOpen ? "100%" : "80%",
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -9 : 0,
                        backgroundColor: isOpen ? "#fbbf24" : "#ffffff",
                    }}
                    whileHover={{ width: "100%", backgroundColor: "#10b981" }}
                    transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                    style={{ width: "80%" }}
                />
            </div>

            {/* Text label on hover */}
            <motion.span
                className="absolute -bottom-6 text-xs font-bold tracking-wider"
                initial={{ opacity: 0, y: -5 }}
                whileHover={{ opacity: 1, y: 0 }}
                animate={{ color: isOpen ? "#fbbf24" : "#10b981" }}
            >
                {isOpen ? "CLOSE" : "MENU"}
            </motion.span>
        </motion.button>
    );
}
