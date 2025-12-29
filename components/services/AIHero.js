import { useRef, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { Brain } from 'lucide-react';

const ParticleNetwork = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let width = 0;
        let height = 0;

        const resize = () => {
            if (containerRef.current) {
                width = containerRef.current.offsetWidth;
                height = containerRef.current.offsetHeight;
                canvas.width = width;
                canvas.height = height;
                initParticles();
            }
        };

        const initParticles = () => {
            const particleCount = Math.min(width * 0.05, 100); // Responsive count
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(168, 85, 247, 0.5)'; // Purple
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 150;

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * (1 - dist / maxDist)})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <div ref={containerRef} className="absolute inset-0 z-0"><canvas ref={canvasRef} className="w-full h-full" /></div>;
};

export default function AIHero({ service }) {
    return (
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black w-full">
            {/* 1. The Neural Network Background (Canvas) */}
            <ParticleNetwork />

            {/* 2. The Plasma Orb (CSS) */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-[80px] opacity-40 animate-pulse" />
                <div className="absolute inset-10 bg-gradient-to-tr from-fuchsia-500 to-cyan-500 rounded-full blur-[60px] opacity-30 mix-blend-screen animate-spin-slow" />
            </div>

            {/* 3. The Content (Glitch) */}
            <div className="z-10 text-center relative px-6">
                <m.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative inline-block mb-6"
                >
                    <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                    <Brain className="w-20 h-20 sm:w-24 sm:h-24 text-white relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                </m.div>

                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-purple-400 mb-6 tracking-tight drop-shadow-2xl">
                    AI & <span className="text-purple-400">AGENTS</span>
                </h1>

                <m.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-xl sm:text-2xl text-purple-200/80 font-mono tracking-wide">
                        {service.tagline}
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {["LLMs", "RAG", "Automation", "Python"].map((tag, i) => (
                            <span key={i} className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-900/10 text-purple-300 text-sm font-bold font-mono uppercase backdrop-blur-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                </m.div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 pointer-events-none" />
        </div>
    );
}
