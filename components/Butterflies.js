import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import butterfly1 from '@/public/lotties/butterfly1.json';
import butterfly2 from '@/public/lotties/butterfly2.json';
import butterfly3 from '@/public/lotties/butterfly3.json';

const Butterflies = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* Top right - flies to center and back */}
            <motion.div
                className="absolute top-[5%] right-[5%] w-14 h-14 opacity-85"
                animate={{
                    x: [0, -150, -200, -150, 0],
                    y: [0, 80, 120, 80, 0],
                    rotate: [0, 20, 0, -20, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Lottie animationData={butterfly1} loop autoplay />
            </motion.div>

            {/* Left side - flies to center and back */}
            <motion.div
                className="absolute top-[40%] left-[2%] w-20 h-20 opacity-90"
                animate={{
                    x: [0, 120, 180, 120, 0],
                    y: [0, -30, 0, 30, 0],
                    rotate: [0, -15, 0, 15, 0],
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            >
                <Lottie animationData={butterfly2} loop autoplay />
            </motion.div>

            {/* Bottom right - flies to center and back */}
            <motion.div
                className="absolute bottom-[10%] right-[8%] w-24 h-24 opacity-80"
                animate={{
                    x: [0, -100, -160, -100, 0],
                    y: [0, -80, -140, -80, 0],
                    rotate: [0, 25, 0, -25, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4,
                }}
            >
                <Lottie animationData={butterfly3} loop autoplay />
            </motion.div>

            {/* Bottom left - flies to center and back */}
            <motion.div
                className="absolute bottom-[20%] left-[5%] w-16 h-16 opacity-75"
                animate={{
                    x: [0, 100, 150, 100, 0],
                    y: [0, -60, -100, -60, 0],
                    rotate: [0, -20, 0, 20, 0],
                }}
                transition={{
                    duration: 13,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            >
                <Lottie animationData={butterfly1} loop autoplay />
            </motion.div>
        </div>
    );
};

export default Butterflies;
