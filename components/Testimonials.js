import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
    {
        name: "Sarah Chen",
        role: "CTO, FinVault",
        text: "Harun transformed our legacy codebase into a lightning-fast React application. His attention to performance optimization is unmatched.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
        name: "Marcus Weber",
        role: "Lead Engineer, Berlin",
        text: "I've worked with many developers, but Harun's ability to architect scalable backend systems is truly world-class.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
        name: "Elena Rodriguez",
        role: "Product Director, Nexus",
        text: "The AI integration Harun built increased user engagement by 400%. He understands both tech and business goals.",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
        name: "David Park",
        role: "Founder, Stratos",
        text: "Incredible eye for design and detail. The mobile app feels native and animations are butter smooth.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
        name: "Priya Patel",
        role: "VP Engineering, Lumo",
        text: "Harun is a machine. He delivered a complex dashboard in half the estimated time with zero bugs.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    }
];

export default function Testimonials() {
    return (
        <section className="py-20 bg-[#050505] overflow-hidden relative border-t border-[#111]">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-20" />

            <div className="container mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                    Trusted by <span className="text-[#00ff41]">Industry Leaders</span>
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Delivering high-impact solutions for startups and enterprises worldwide.
                </p>
            </div>

            {/* MOVING MARQUEE CARDS */}
            <div className="relative w-full">
                {/* Gradient Fade Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

                <div className="flex gap-6 animate-marquee hover:pause-animation">
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[350px] min-h-[200px] bg-[#0a0a0a] border border-[#1a1a1a] p-6 rounded-2xl shrink-0 hover:border-[#00ff41]/50 transition-colors group relative overflow-hidden flex flex-col justify-between"
                        >
                            {/* Quote Icon */}
                            <div className="absolute top-3 right-4 text-5xl text-[#111] font-serif group-hover:text-[#00ff41]/10 transition-colors">"</div>

                            <p className="text-gray-300 text-sm leading-relaxed relative z-10 mb-4">
                                "{t.text}"
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#333] relative shrink-0">
                                    <Image
                                        src={t.image}
                                        alt={t.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm">{t.name}</h4>
                                    <p className="text-[#00ff41] text-xs font-mono">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-marquee:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}
