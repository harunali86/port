import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Lottie from "lottie-react";

// Import Weblyss Lottie animations (using -main files which are complete)
import socialAnim from '@/public/lotties/social-main.json';
import brandingAnim from '@/public/lotties/branding-main.json';
import strategyAnim from '@/public/lotties/strategy-main.json';
import adsAnim from '@/public/lotties/ads-main.json';
import researchAnim from '@/public/lotties/process/research.json';
import developmentAnim from '@/public/lotties/process/development.json';

const services = [
    {
        id: "01",
        title: "Web Development",
        desc: "Custom web apps, SaaS platforms, and dashboards built with React & Next.js",
        tech: ["React", "Next.js", "Node.js", "TypeScript"],
        lottie: socialAnim,
    },
    {
        id: "02",
        title: "Mobile Apps",
        desc: "Cross-platform iOS & Android apps with native performance",
        tech: ["React Native", "Flutter", "Expo"],
        lottie: adsAnim,
    },
    {
        id: "03",
        title: "UI/UX Design",
        desc: "Beautiful interfaces with smooth micro-interactions",
        tech: ["Figma", "Framer", "Motion"],
        lottie: brandingAnim,
    },
    {
        id: "04",
        title: "AI & Agents",
        desc: "Chatbots, RAG systems & autonomous AI agents",
        tech: ["GPT-4", "Claude", "LangChain"],
        lottie: strategyAnim,
    },
    {
        id: "05",
        title: "Backend & APIs",
        desc: "Scalable APIs, databases & cloud infrastructure",
        tech: ["GraphQL", "PostgreSQL", "AWS"],
        lottie: developmentAnim,
    },
    {
        id: "06",
        title: "SEO / GEO / AEO",
        desc: "AI search optimization for Perplexity & Google SGE",
        tech: ["SEO", "GEO", "AEO", "Schema"],
        lottie: researchAnim,
    },
];

export default function ServicesSection() {
    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);

    return (
        <section
            id="services"
            className="py-32 min-h-screen w-full bg-[#0a0a0a] relative"
        >
            {/* Header */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-[#00ff41] font-mono text-sm">003</span>
                        <div className="w-12 h-[1px] bg-[#222]" />
                        <span className="text-[#333] font-mono text-sm uppercase tracking-widest">Services</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-white leading-none">
                        What I
                        <br />
                        <span className="text-[#1a1a1a] [-webkit-text-stroke:1px_#333]">Build</span>
                    </h2>
                </motion.div>
            </div>

            {/* Service List */}
            <div className="max-w-6xl mx-auto px-6">
                {services.map((service, index) => {
                    const isActive = active === index;
                    const isHovered = hovered === index;

                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => setActive(isActive ? null : index)}
                            className="group cursor-pointer"
                        >
                            {/* Divider */}
                            <div className="h-[1px] bg-[#1a1a1a] group-hover:bg-[#333] transition-colors" />

                            {/* Row */}
                            <div className="py-8 flex items-center gap-8">
                                {/* Number */}
                                <span className={`font-mono text-sm transition-colors duration-300 ${isHovered ? 'text-[#00ff41]' : 'text-[#333]'}`}>
                                    {service.id}
                                </span>

                                {/* Lottie - only visible on hover */}
                                <motion.div
                                    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0"
                                    initial={{ width: 0, opacity: 0 }}
                                    animate={{
                                        width: isHovered || isActive ? 64 : 0,
                                        opacity: isHovered || isActive ? 1 : 0,
                                        marginRight: isHovered || isActive ? 0 : -32
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{ background: 'rgba(255,255,255,0.03)' }}
                                >
                                    <Lottie
                                        animationData={service.lottie}
                                        loop={true}
                                        autoplay={true}
                                        className="w-16 h-16"
                                    />
                                </motion.div>

                                {/* Title */}
                                <h3 className={`text-3xl md:text-4xl font-bold flex-grow transition-all duration-300 ${isHovered ? 'text-white translate-x-2' : 'text-[#666]'}`}>
                                    {service.title}
                                </h3>

                                {/* Arrow */}
                                <motion.div
                                    className="w-12 h-12 rounded-full border border-[#222] flex items-center justify-center"
                                    animate={{
                                        rotate: isActive ? 90 : 0,
                                        borderColor: isHovered ? '#00ff41' : '#222',
                                        background: isActive ? '#00ff41' : 'rgba(0,0,0,0)'
                                    }}
                                >
                                    <span className={`text-lg transition-colors ${isActive ? 'text-black' : isHovered ? 'text-[#00ff41]' : 'text-[#333]'}`}>
                                        →
                                    </span>
                                </motion.div>
                            </div>

                            {/* Expanded content */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8 pl-[72px] md:pl-[88px]">
                                            <p className="text-[#555] text-lg mb-6 max-w-xl">
                                                {service.desc}
                                            </p>

                                            <div className="flex flex-wrap gap-3">
                                                {service.tech.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-4 py-2 border border-[#222] text-[#444] font-mono text-sm hover:border-[#00ff41] hover:text-[#00ff41] transition-colors"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}

                {/* Final divider */}
                <div className="h-[1px] bg-[#1a1a1a]" />
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto px-6 mt-24"
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                    <div>
                        <p className="text-[#333] text-lg mb-2">Ready to start?</p>
                        <p className="text-white text-3xl font-bold">Let's build something great.</p>
                    </div>

                    <motion.a
                        href="#contact"
                        className="group flex items-center gap-4"
                        whileHover={{ x: 10 }}
                    >
                        <span className="text-[#00ff41] font-mono">Get in touch</span>
                        <div className="w-12 h-12 rounded-full bg-[#00ff41] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <span className="text-black">→</span>
                        </div>
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}
