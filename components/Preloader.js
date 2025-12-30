import { m } from "framer-motion";
import { useEffect } from "react";

export default function Preloader({ onComplete }) {
    useEffect(() => {
        // Ultra-fast preloader for best LCP scores (300ms on all devices)
        const duration = 300;
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, duration);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <m.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                y: -20,
                transition: { duration: 0.8, ease: "easeInOut" }
            }}
        >
            <div className="w-full max-w-xs px-8 text-center">
                <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
                        HARUN<span className="text-[#00ff41]">.DEV</span>
                    </h1>

                    {/* CSS-Only Progress Bar to save Main Thread */}
                    <div className="h-1 w-full bg-[#1a2e22] rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#00ff41] origin-left animate-progress"
                        />
                    </div>
                </m.div>

                <div className="flex justify-between text-xs font-mono text-[#00ff41]">
                    <span>SYSTEM_BOOT</span>
                    {/* CSS Animation for counter is complex, simplified to static 'LOADING...' or just removing percentage to save CPU */}
                    <span className="animate-pulse">INITIALIZING...</span>
                </div>
            </div>

            {/* Inline styles for the animation to allow Tailwind JIT to work or just raw CSS */}
            <style jsx>{`
@keyframes progress {
    0% { width: 0%; }
    20% { width: 10%; }
    50% { width: 40%; }
    80% { width: 80%; }
    100% { width: 100%; }
}
        .animate-progress {
    animation: progress 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
`}</style>
        </m.div>
    );
}
