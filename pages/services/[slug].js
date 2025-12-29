import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { m, useMotionValue } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AIHero from '../../components/services/AIHero';
import { Zap, CheckCircle, ArrowRight, Code, Smartphone, Palette, Brain, Database, BarChart3, Globe, Server, Search } from 'lucide-react';

// ... (keep TechLogos and servicesData data) ...

// Remove the inline AIHero constant definition if it exists in the prompt range, but here I'm operating on the file.
// I will just replace the heroMap line to use the imported component.
// Wait, I need to Import it at the top first. 

// Actually, let's do this in chunks.

// --- TECH LOGOS (Comprehensive) ---
const TechLogos = {
    "Next.js": <svg viewBox="0 0 180 180" fill="none"><mask id="mask0_408_134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180"><circle cx="90" cy="90" r="90" fill="black" /></mask><g mask="url(#mask0_408_134)"><circle cx="90" cy="90" r="90" fill="black" /><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" /><path d="M115.79 54V125.97H127.904V54H115.79Z" fill="white" /></g></svg>,
    "React": <svg viewBox="0 0 24 24" fill="none"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38a2.167 2.167 0 0 0-1.092-.278z" fill="#61DAFB" /></svg>,
    "React Native": <svg viewBox="0 0 24 24" fill="none"><path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236z" fill="#61DAFB" /><circle cx="12" cy="12" r="11" stroke="#61DAFB" strokeWidth="1" /></svg>,
    "Expo": <svg viewBox="0 0 24 24" fill="white"><path d="M0 20.084c.043.53.23 1.063.718 1.778.58.849 1.576 1.315 2.399.878.544-.288 5.673-9.7 8.883-14.934 3.21 5.234 8.34 14.646 8.884 14.934.822.437 1.818-.029 2.398-.878.488-.715.675-1.248.718-1.778 0-1.148-.467-2.106-.703-2.543C17.313 6.839 13.188.876 12.64.136a.97.97 0 0 0-.64-.136.97.97 0 0 0-.64.136C10.813.877 6.687 6.839 0.703 17.54.467 17.978 0 18.936 0 20.084z" /></svg>,
    "TypeScript": <svg viewBox="0 0 24 24" fill="#3178C6"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" /></svg>,
    "Node": <svg viewBox="0 0 24 24" fill="#339933"><path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675a1.854 1.854 0 0 1-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15a1.86 1.86 0 0 1-.924 1.604l-8.795 5.078c-.28.163-.599.247-.924.247z" /></svg>,
    "Python": <svg viewBox="0 0 24 24" fill="none"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05z" fill="#3776AB" /></svg>,
    "Figma": <svg viewBox="0 0 24 24" fill="url(#figma_grad)"><defs><linearGradient id="figma_grad"><stop offset="0%" stopColor="#F24E1E" /><stop offset="100%" stopColor="#A259FF" /></linearGradient></defs><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491z" /></svg>,
    "OpenAI": <svg viewBox="0 0 24 24" fill="white"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z" /></svg>,
    "LangChain": <svg viewBox="0 0 24 24" fill="white"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="5" fill="black" /></svg>,
    "Pinecone": <svg viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    "Docker": <svg viewBox="0 0 24 24" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185" /></svg>,
    "Supabase": <svg viewBox="0 0 24 24" fill="#3ECF8E"><path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" /></svg>,
    "Go": <svg viewBox="0 0 24 24" fill="#00ADD8"><path d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082z" /></svg>,
    "Kubernetes": <svg viewBox="0 0 24 24" fill="#326CE5"><path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.002.006a.44.44 0 0 0-.046.8l-.004.01 1.354 2.22a5.167 5.167 0 0 0 1.86-2.756l-2.692-.595-.474.315z" /></svg>,
    "Firebase": <svg viewBox="0 0 24 24" fill="#FFCA28"><path d="M3.89 15.673L6.255.461A.542.542 0 0 1 7.27.289l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 0 0-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 0 0 1.588 0zM14.3 7.148l-1.82-3.482a.542.542 0 0 0-.96 0L3.53 17.984z" /></svg>,
    "Framer": <svg viewBox="0 0 24 24" fill="white"><path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" /></svg>,
    "Ahrefs": <svg viewBox="0 0 24 24" fill="#f05b29"><circle cx="12" cy="12" r="10" /></svg>,
    "Semrush": <svg viewBox="0 0 24 24" fill="#eb5822"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>,
    "Analytics": <svg viewBox="0 0 24 24" fill="#F9AB00"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /></svg>,
    "n8n": <svg viewBox="0 0 24 24" fill="#FF6D5A"><path d="M12 2L2 7l4 2 6-3 6 3 4-2-10-5z" /><rect x="8" y="10" width="8" height="8" rx="2" /></svg> // Simplified placeholder for n8n
};

// --- COMPREHENSIVE SERVICE DATA ---
const servicesData = {
    "web-development": {
        title: "Web Engineering",
        tagline: "Speed. Scalability. Innovation.",
        heroIcon: Code,
        theme: "web",
        color: "#00ff41",
        tech: ["Next.js", "React", "TypeScript", "Node", "Supabase"],
        intro: "We don't just build websites. We engineer digital ecosystems that scale from zero to millions.",
        sections: [
            {
                title: "Why Next.js 14?", items: [
                    { label: "Server Components", desc: "Zero JS shipped to client. Faster loads, better SEO." },
                    { label: "Edge Runtime", desc: "Execute code globally. <50ms response times worldwide." },
                    { label: "App Router", desc: "File-based routing with layouts, loading states built-in." }
                ]
            },
            {
                title: "Our Stack Advantage", items: [
                    { label: "TypeScript First", desc: "Type safety catches bugs before production." },
                    { label: "Supabase Backend", desc: "Postgres + Real-time + Auth. Open-source Firebase." },
                    { label: "Vercel Deploy", desc: "Git push to production. Preview URLs for every PR." }
                ]
            }
        ],
        stats: [{ value: "99+", label: "Lighthouse" }, { value: "<1s", label: "LCP" }, { value: "50%", label: "Cost Cut" }]
    },
    "mobile-apps": {
        title: "Mobile Apps",
        tagline: "iOS. Android. One Codebase.",
        heroIcon: Smartphone,
        theme: "mobile",
        color: "#00d4ff",
        tech: ["React Native", "Expo", "TypeScript", "Firebase"],
        intro: "Ship to App Store and Play Store simultaneously. React Native + Expo gives you 95% code sharing with native performance.",
        sections: [
            {
                title: "Cross-Platform Power", items: [
                    { label: "Single Codebase", desc: "Write once, deploy everywhere. No separate iOS/Android teams." },
                    { label: "OTA Updates", desc: "Push fixes instantly via Expo Updates. No app store review." },
                    { label: "Native Modules", desc: "Access camera, sensors, payments natively when needed." }
                ]
            },
            {
                title: "Why React Native?", items: [
                    { label: "60 FPS", desc: "Native rendering, not WebView. Buttery smooth animations." },
                    { label: "Hot Reloading", desc: "See changes instantly during development. 10x faster." },
                    { label: "Massive Ecosystem", desc: "npm packages, community components, enterprise support." }
                ]
            }
        ],
        stats: [{ value: "45%", label: "Faster Launch" }, { value: "60 FPS", label: "Performance" }, { value: "95%", label: "Code Share" }]
    },
    "ui-ux-design": {
        title: "Product Design",
        tagline: "Empathy Driven Interfaces.",
        heroIcon: Palette,
        theme: "ui",
        color: "#ff00e5",
        tech: ["Figma", "Framer", "React"],
        intro: "Design is how it works, not just how it looks. We craft user journeys that convert.",
        sections: [
            {
                title: "Design Process", items: [
                    { label: "Discovery", desc: "User interviews, competitor analysis, stakeholder workshops." },
                    { label: "Wireframing", desc: "Low-fidelity prototypes to validate flows before visual design." },
                    { label: "High-Fidelity", desc: "Pixel-perfect Figma designs with interactive prototypes." }
                ]
            },
            {
                title: "Design Systems", items: [
                    { label: "Component Library", desc: "Reusable components with variants for consistency." },
                    { label: "Design Tokens", desc: "Colors, typography, spacing as code." },
                    { label: "Documentation", desc: "Storybook integration. Same language across teams." }
                ]
            }
        ],
        stats: [{ value: "300%", label: "ROI" }, { value: "Zero", label: "Friction" }, { value: "2x", label: "Conversion" }]
    },
    "ai-agents": {
        title: "AI & Agents",
        tagline: "Automate. Optimize. Innovate.",
        heroIcon: Brain,
        theme: "ai",
        color: "#a855f7",
        tech: ["OpenAI", "LangChain", "n8n", "Pinecone", "Python"],
        intro: "Deploy autonomous AI agents that handle support, analyze data, and automate workflows 24/7.",
        sections: [
            {
                title: "LLM Integration", items: [
                    { label: "Custom Agents", desc: "Bots trained on YOUR data. Brand voice, product knowledge." },
                    { label: "RAG Pipeline", desc: "Retrieval-Augmented Generation. Ground AI in your data." },
                    { label: "Function Calling", desc: "AI that takes action. Book appointments, update CRM." }
                ]
            },
            {
                title: "Enterprise AI", items: [
                    { label: "Vector Search", desc: "Semantic search over millions of documents." },
                    { label: "Fine-Tuning", desc: "Custom models for domain-specific tasks." },
                    { label: "Guardrails", desc: "Content moderation, PII filtering, compliance." }
                ]
            }
        ],
        stats: [{ value: "24/7", label: "Operations" }, { value: "90%", label: "Ticket Cut" }, { value: "10x", label: "Speed" }]
    },
    "backend-apis": {
        title: "Backend & APIs",
        tagline: "Scale to Infinity.",
        heroIcon: Database,
        theme: "backend",
        color: "#10b981",
        tech: ["Node", "Go", "Docker", "Kubernetes"],
        intro: "Bulletproof APIs that scale from 100 to 10M users. Microservices, GraphQL, real-time.",
        sections: [
            {
                title: "Architecture", items: [
                    { label: "Microservices", desc: "Decoupled services for independent scaling." },
                    { label: "Event-Driven", desc: "Async processing with message queues." },
                    { label: "CQRS", desc: "Separate read/write models for complex domains." }
                ]
            },
            {
                title: "API Design", items: [
                    { label: "REST + GraphQL", desc: "Choose the right tool for each use case." },
                    { label: "Rate Limiting", desc: "Protect your APIs from abuse." },
                    { label: "Observability", desc: "Distributed tracing, metrics, logs." }
                ]
            }
        ],
        stats: [{ value: "99.9%", label: "Uptime" }, { value: "<10ms", label: "Latency" }, { value: "∞", label: "Scale" }]
    },
    "seo-optimization": {
        title: "SEO & Growth",
        tagline: "Dominate Search.",
        heroIcon: BarChart3,
        theme: "seo",
        color: "#6366f1",
        tech: ["Next.js", "Ahrefs", "Semrush", "Analytics"],
        intro: "Technical SEO + Content Strategy + AI-powered optimization for high-intent traffic.",
        sections: [
            {
                title: "SEO vs AEO vs GEO", items: [
                    { label: "SEO (Search Engine)", desc: "Traditional optimization. Keywords, backlinks. Google, Bing." },
                    { label: "AEO (Answer Engine)", desc: "Optimize for AI answers. ChatGPT, Perplexity, Google SGE." },
                    { label: "GEO (Generative Engine)", desc: "Get cited by AI. Authoritative content, entity optimization." }
                ]
            },
            {
                title: "Our SEO Stack", items: [
                    { label: "Technical Audit", desc: "Core Web Vitals, crawl errors, site architecture." },
                    { label: "Content Strategy", desc: "Keyword research, topic clusters, content calendar." },
                    { label: "Link Building", desc: "High-DA backlinks, digital PR, guest posting." }
                ]
            }
        ],
        stats: [{ value: "+400%", label: "Traffic" }, { value: "#1", label: "Rankings" }, { value: "10x", label: "Visibility" }]
    }
};

// --- 6 UNIQUE HERO ANIMATIONS ---
const WebHero = ({ service }) => {
    const [lines, setLines] = useState([]);
    useEffect(() => {
        const int = setInterval(() => setLines(p => [...p.slice(-30), { id: Math.random(), x: Math.random() * 100, c: ['</>', '{}', '()', '[]'][Math.floor(Math.random() * 4)] }]), 100);
        return () => clearInterval(int);
    }, []);
    return (
        <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            {lines.map(l => <m.span key={l.id} initial={{ y: -50, opacity: 1 }} animate={{ y: '100vh', opacity: 0 }} transition={{ duration: 3 }} className="absolute text-[#00ff41]/30 text-sm font-mono" style={{ left: `${l.x}%` }}>{l.c}</m.span>)}
            <m.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="z-10 text-center">
                <Code className="w-16 h-16 mx-auto mb-6 text-[#00ff41]" />
                <h1 className="text-5xl md:text-8xl font-black text-white mb-4">{service.title}</h1>
                <p className="text-xl text-gray-400">{service.tagline}</p>
            </m.div>
        </div>
    );
};

const MobileHero = ({ service }) => {
    const x = useMotionValue(0), y = useMotionValue(0);
    useEffect(() => { const h = e => { x.set((e.clientX - window.innerWidth / 2) / 30); y.set((e.clientY - window.innerHeight / 2) / 30 * -1); }; window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h); }, []);
    return (
        <div className="relative min-h-[80vh] flex flex-col lg:flex-row items-center justify-center gap-12 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-black px-6" style={{ perspective: '1000px' }}>
            <div className="z-10 text-center lg:text-left">
                <Smartphone className="w-16 h-16 mb-6 text-cyan-400 mx-auto lg:mx-0" />
                <h1 className="text-5xl md:text-7xl font-black text-white mb-4">{service.title}</h1>
                <p className="text-xl text-cyan-200">{service.tagline}</p>
            </div>
            <m.div style={{ rotateY: x, rotateX: y }} className="w-[260px] h-[520px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden shrink-0" >
                <m.div animate={{ y: [0, -200] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} className="p-4 space-y-3">
                    {[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-white/10 rounded-2xl" />)}
                </m.div>
            </m.div>
        </div>
    );
};

const UIHero = ({ service }) => (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 to-purple-200">
        <m.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-br from-pink-400 to-purple-500 rounded-3xl opacity-40" />
        <m.div animate={{ y: [0, 30, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full opacity-30" />
        <m.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/3 right-1/3 w-32 h-32 bg-yellow-400 rounded-2xl rotate-12 opacity-30" />
        <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="z-10 text-center">
            <Palette className="w-16 h-16 mx-auto mb-6 text-purple-600" />
            <h1 className="text-5xl md:text-8xl font-black text-gray-900 mb-4">{service.title}</h1>
            <p className="text-xl text-gray-600">{service.tagline}</p>
        </m.div>
    </div>
);


const BackendHero = ({ service }) => (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-20">
            {[...Array(7)].map((_, i) => <m.div key={i} className="w-10 h-40 bg-emerald-500/40 rounded" animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1, 0.8] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }} />)}
        </div>
        <m.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="z-10 text-center">
            <Server className="w-16 h-16 mx-auto mb-6 text-emerald-500" />
            <h1 className="text-5xl md:text-8xl font-black text-white mb-4">{service.title}</h1>
            <p className="text-xl text-emerald-300">{service.tagline}</p>
        </m.div>
    </div>
);

const SEOHero = ({ service }) => (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-950 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[400px] h-[400px] border border-indigo-500/20 rounded-full" />
            <div className="w-[300px] h-[300px] border border-indigo-500/30 rounded-full absolute" />
            <div className="w-[200px] h-[200px] border border-indigo-500/40 rounded-full absolute" />
            <m.div animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} className="w-[400px] h-[400px] absolute">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1/2 bg-gradient-to-t from-indigo-500 to-transparent" />
            </m.div>
        </div>
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-10 text-center">
            <Globe className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
            <h1 className="text-5xl md:text-8xl font-black text-white mb-4">{service.title}</h1>
            <p className="text-xl text-indigo-300">{service.tagline}</p>
        </m.div>
    </div>
);

// --- RUNNING MARQUEE ---
const TechMarquee = ({ tech, color }) => (
    <section className="py-4 border-y overflow-hidden" style={{ borderColor: `${color}30`, background: `${color}08` }}>
        <m.div animate={{ x: ['-50%', '0%'] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} className="flex gap-12 w-max items-center">
            {[...tech, ...tech, ...tech, ...tech, ...tech].map((t, i) => (
                <div key={i} className="flex items-center gap-2 shrink-0">
                    <div className="w-8 h-8 text-white">{TechLogos[t] || <div className="w-full h-full bg-gray-600 rounded" />}</div>
                    <span className="text-base font-bold text-white/60">{t}</span>
                </div>
            ))}
        </m.div>
    </section>
);

// --- SECTIONS ---
const IntroSection = ({ intro }) => <section className="py-16 px-6"><div className="container mx-auto max-w-3xl text-center"><p className="text-xl text-gray-300 leading-relaxed">{intro}</p></div></section>;

const InfoSections = ({ sections, color }) => (
    <section className="py-20 px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-6xl">
            {sections.map((s, idx) => (
                <m.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-16 last:mb-0">
                    <h2 className="text-3xl font-bold text-white mb-8">{s.title}</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {s.items.map((item, i) => (
                            <m.div key={i} whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-[#111] border border-white/10" style={{ borderColor: `${color}25` }}>
                                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center text-sm font-bold text-black" style={{ backgroundColor: color }}>{i + 1}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{item.label}</h3>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </m.div>
                        ))}
                    </div>
                </m.div>
            ))}
        </div>
    </section>
);

const StatsSection = ({ stats, color }) => (
    <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
            <div className="grid grid-cols-3 gap-4">
                {stats.map((s, i) => (
                    <m.div key={i} initial={{ scale: 0.8 }} whileInView={{ scale: 1 }} className="text-center p-6 rounded-xl" style={{ background: `${color}15` }}>
                        <div className="text-3xl font-black" style={{ color }}>{s.value}</div>
                        <div className="text-xs text-gray-400 uppercase">{s.label}</div>
                    </m.div>
                ))}
            </div>
        </div>
    </section>
);

const CTASection = ({ color }) => (
    <section className="py-16 px-6 bg-[#050505]">
        <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Start?</h2>
            <m.a href="/#contact" whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-black" style={{ backgroundColor: color }}>
                Get in Touch <ArrowRight size={18} />
            </m.a>
        </div>
    </section>
);

// --- MAIN ---
export default function ServicePage() {
    const router = useRouter();
    const { slug } = router.query;
    const service = servicesData[slug];

    if (!service) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="animate-spin w-6 h-6 border-2 border-white rounded-full border-t-transparent" /></div>;

    const heroMap = { web: WebHero, mobile: MobileHero, ui: UIHero, ai: AIHero, backend: BackendHero, seo: SEOHero };
    const Hero = heroMap[service.theme];

    return (
        <>
            <Head><title>{service.title} | Harun</title></Head>
            <Navbar />
            <main className="bg-black">
                <Hero service={service} />
                <TechMarquee tech={service.tech} color={service.color} />
                <IntroSection intro={service.intro} />
                <InfoSections sections={service.sections} color={service.color} />
                <StatsSection stats={service.stats} color={service.color} />
                <CTASection color={service.color} />
            </main>
            <Footer />
        </>
    );
}
