import Lottie from 'lottie-react';
import { m } from 'framer-motion';
import butterfly1 from '@/public/lotties/butterfly1.json';
import butterfly2 from '@/public/lotties/butterfly2.json';
import butterfly3 from '@/public/lotties/butterfly3.json';

const Butterflies = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {/* 1. Top Left of Card - Hovering */}
            <m.div
                className="hidden md:block absolute top-[10%] left-[15%] w-32 h-32 opacity-90"
                animate={{
                    x: [0, 50, 0, 50, 0],
                    y: [0, -30, 0, -30, 0],
                    rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <Lottie animationData={butterfly1} loop autoplay />
            </m.div>

            {/* 2. Top Right of Card - Hovering */}
            <m.div
                className="hidden md:block absolute top-[10%] right-[15%] w-36 h-36 opacity-90"
                animate={{
                    x: [0, -60, 0, -60, 0],
                    y: [0, 40, 0, 40, 0],
                    rotate: [0, -15, 15, -15, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
            >
                <Lottie animationData={butterfly3} loop autoplay />
            </m.div>

            {/* 3. Center Top (Above Text) - Floating */}
            <m.div
                className="absolute top-[5%] left-[45%] w-40 h-40 opacity-85"
                animate={{
                    x: [0, 20, -20, 20, 0],
                    y: [0, 15, 0, 15, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                }}
            >
                <Lottie animationData={butterfly2} loop autoplay />
            </m.div>

            {/* 4. Center Bottom (Near text bottom) - Floating */}
            <m.div
                className="absolute top-[20%] left-[55%] w-28 h-28 opacity-80"
                animate={{
                    x: [0, -30, 30, -30, 0],
                    y: [0, -20, 20, -20, 0],
                    rotate: [0, 5, -5, 5, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            >
                <Lottie animationData={butterfly1} loop autoplay />
            </m.div>
        </div>
    );
};

export default Butterflies;
