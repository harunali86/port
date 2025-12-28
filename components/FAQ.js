// FAQ Component with Schema-ready content for GEO/AEO
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
    {
        question: "What services does Harun Shaikh offer?",
        answer: "I offer full stack web development services including custom React and Next.js applications, Node.js backend development, AI/ML integration, e-commerce solutions, mobile-responsive websites, and API development. With 3+ years of experience, I deliver scalable, high-performance web solutions."
    },
    {
        question: "What technologies do you specialize in?",
        answer: "I specialize in React, Next.js, Node.js, Python, TypeScript, MongoDB, PostgreSQL, Three.js, Framer Motion, and AI/ML technologies including OpenAI integration. I build modern, performant web applications using cutting-edge tools and frameworks."
    },
    {
        question: "How many years of experience do you have?",
        answer: "I have over 3 years of professional experience as a Full Stack Developer, having completed 50+ projects with 100% client satisfaction. I have worked with startups, enterprises, and individual clients worldwide."
    },
    {
        question: "How can I contact you for a project?",
        answer: "You can contact me through the contact form on this website, via email at harunilahishaikh@gmail.com, or through WhatsApp. I typically respond within 24 hours and offer free initial consultations for new projects."
    },
    {
        question: "Do you work with international clients?",
        answer: "Yes, I work with clients worldwide. I have experience collaborating with teams across different time zones and provide services to clients in India, USA, UK, UAE, and other countries. All communication is in English."
    },
    {
        question: "What is your development process?",
        answer: "I follow an agile development process: 1) Discovery & Planning - understanding requirements, 2) Design & Prototyping - creating wireframes and mockups, 3) Development - building with clean, maintainable code, 4) Testing & QA - ensuring quality and performance, 5) Deployment & Support - launching and ongoing maintenance."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="py-20 relative overflow-hidden" aria-labelledby="faq-heading">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#0a0a0a] to-[#030303]" />

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className="flex items-center justify-center gap-4 mb-6"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="w-16 h-[2px]"
                            style={{ background: 'linear-gradient(90deg, transparent, #00ff41)' }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[#00ff41] text-xs font-mono tracking-[0.4em] px-4 py-2 border border-[#00ff41]/30 rounded">
                            FAQ.db
                        </span>
                        <motion.div
                            className="w-16 h-[2px]"
                            style={{ background: 'linear-gradient(90deg, #00ff41, transparent)' }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>

                    <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-black font-mono mb-4">
                        <span className="text-white">FREQUENTLY</span>
                        <motion.span
                            className="text-[#00ff41]"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >_</motion.span>
                        <span className="text-[#00ff41]">ASKED</span>
                    </h2>

                    <p className="text-gray-500 font-mono text-sm">
                        {'>'} Common questions answered for your convenience
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="border border-[#1a1a1a] rounded-lg overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-sm"
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#111] transition-colors"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-[#00ff41] font-mono text-sm">
                                        [{String(index + 1).padStart(2, '0')}]
                                    </span>
                                    <span className="text-white font-medium text-sm sm:text-base" itemProp="name">
                                        {faq.question}
                                    </span>
                                </span>
                                <motion.span
                                    className="text-[#00ff41] text-xl font-mono flex-shrink-0 ml-4"
                                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    +
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        id={`faq-answer-${index}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                        itemScope
                                        itemProp="acceptedAnswer"
                                        itemType="https://schema.org/Answer"
                                    >
                                        <div className="px-6 pb-5 pt-0">
                                            <div className="pl-12 border-l-2 border-[#00ff41]/30">
                                                <p className="text-gray-400 text-sm leading-relaxed font-mono" itemProp="text">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 font-mono text-sm mb-4">
                        Still have questions?
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-[#00ff41] text-[#00ff41] font-mono text-sm hover:bg-[#00ff41]/10 transition-colors rounded"
                    >
                        <span>[</span>
                        <span>CONTACT_ME</span>
                        <span>]</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
