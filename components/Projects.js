import { m, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";

// Import Weblyss process Lottie icons
import researchAnim from '@/public/lotties/process/research.json';
import strategyAnim from '@/public/lotties/process/strategy.json';
import developmentAnim from '@/public/lotties/process/development.json';
import designAnim from '@/public/lotties/process/design.json';

const projects = [
  {
    title: "Enterprise E-Commerce",
    image: "/img1.jpg",
    lottie: researchAnim,
    status: "ONLINE",
    desc: "Modern e-commerce with sleek UI/UX, secure checkout, and admin dashboard.",
    stats: [
      { value: 10000, suffix: "+", label: "USERS" },
      { value: 98, suffix: "+", label: "SCORE" },
      { value: 50, suffix: "L+", prefix: "₹", label: "GMV" },
    ],
    tech: ["Next.js 14", "TypeScript", "MongoDB", "Stripe"],
    icons: ["/icons/cart.svg", "/icons/enterprise.svg", "/icons/web.svg"],
    color: "#00ff41",
    id: "PRJ_001",
  },
  {
    title: "AI Data Analysis Agent",
    image: "/img2.jpg",
    lottie: strategyAnim,
    status: "BETA",
    desc: "ML platform analyzing datasets and generating auto-visualizations.",
    stats: [
      { value: 85, suffix: "%", label: "ACCURACY" },
      { value: 1, suffix: "M+", label: "DATA" },
      { value: 50, suffix: "+", label: "MODELS" },
    ],
    tech: ["Python", "OpenAI", "PostgreSQL", "React"],
    icons: ["/icons/ai.svg", "/icons/automation.svg", "/icons/software.svg"],
    color: "#ff00ff",
    id: "PRJ_002",
  },
  {
    title: "Web Dev Showcase",
    image: "/img3.jpg",
    lottie: developmentAnim,
    status: "ONLINE",
    desc: "Interactive showcase of modern patterns and best practices.",
    stats: [
      { value: 100, label: "SCORE" },
      { value: 15, suffix: "+", label: "DEMOS" },
      { value: 100, suffix: "%", label: "RESPONSIVE" },
    ],
    tech: ["Next.js", "Three.js", "Framer Motion"],
    icons: ["/icons/web.svg", "/icons/mobile.svg", "/icons/content.svg"],
    color: "#00d4ff",
    id: "PRJ_003",
  },
];

function CyberCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 60, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
      style={{
        transform: glitchActive ? `translateX(${Math.random() * 4 - 2}px)` : 'none',
        perspective: '1000px'
      }}
    >
      {/* Animated neon glow */}
      <m.div
        className="absolute -inset-[2px] rounded-lg"
        style={{ background: project.color, filter: 'blur(10px)' }}
        animate={{ opacity: hovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Main card */}
      <div
        className="relative bg-[#0a0a0a] rounded-lg overflow-hidden"
        style={{
          border: `2px solid ${hovered ? project.color : '#151515'}`,
          boxShadow: hovered ? `0 0 30px ${project.color}30, inset 0 0 30px ${project.color}10` : 'none',
          transition: 'all 0.4s'
        }}
      >
        {/* Animated top bar */}
        <div className="h-[2px] w-full relative overflow-hidden" style={{ background: project.color }}>
          <m.div
            className="absolute inset-0 bg-white"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            style={{ opacity: 0.5 }}
          />
        </div>

        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a] bg-gradient-to-r from-[#0a0a0a] to-[#0f0f0f]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <m.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: i === 0 ? '#ff5f56' : i === 1 ? '#ffbd2e' : '#27ca40' }}
                  animate={hovered ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [`0 0 0px`, `0 0 8px ${i === 0 ? '#ff5f56' : i === 1 ? '#ffbd2e' : '#27ca40'}`, `0 0 0px`]
                  } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1, repeat: hovered ? Infinity : 0 }}
                />
              ))}
            </div>
            <m.span
              className="text-xs font-mono"
              style={{ color: project.color }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {project.id}
            </m.span>
          </div>

          <m.div
            className="flex items-center gap-2 px-3 py-1 rounded"
            style={{ background: `${project.color}15`, border: `1px solid ${project.color}40` }}
            animate={hovered ? {
              boxShadow: [`0 0 5px ${project.color}30`, `0 0 15px ${project.color}50`, `0 0 5px ${project.color}30`]
            } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <m.div
              className="w-2 h-2 rounded-full"
              style={{ background: project.color }}
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <span className="text-[10px] font-mono font-bold tracking-wider" style={{ color: project.color }}>
              {project.status}
            </span>
          </m.div>
        </div>

        {/* Image with effects */}
        <div className="relative h-36 overflow-hidden">
          <m.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{
              scale: hovered ? 1.15 : 1,
              filter: hovered ? 'brightness(1.2) saturate(1.3)' : 'brightness(0.6) saturate(0.8)'
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-30" style={{
            background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)'
          }} />

          {/* Hover scan effect */}
          <AnimatePresence>
            {hovered && (
              <m.div
                className="absolute left-0 right-0 h-[2px] pointer-events-none"
                style={{ background: project.color, boxShadow: `0 0 20px ${project.color}` }}
                initial={{ top: '0%', opacity: 0 }}
                animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </AnimatePresence>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

          {/* Lottie Icon with pulse */}
          <m.div
            className="absolute bottom-3 left-3 w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
            style={{
              background: 'rgba(10,10,10,0.95)',
              border: `2px solid ${project.color}`,
            }}
            animate={{
              boxShadow: [`0 0 10px ${project.color}30`, `0 0 20px ${project.color}50`, `0 0 10px ${project.color}30`],
              scale: hovered ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Lottie
              animationData={project.lottie}
              loop={true}
              autoplay={true}
              className="w-7 h-7"
            />
          </m.div>

          {/* Data readout */}
          <m.div
            className="absolute top-3 left-3 font-mono text-[9px] space-y-1"
            style={{ color: project.color }}
            animate={{ opacity: hovered ? 1 : 0.5 }}
          >
            <m.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
              SYS.STATUS: ACTIVE
            </m.div>
            <div className="opacity-60">UPTIME: 99.9%</div>
          </m.div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title with blinking cursor */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <m.span
                className="text-xl font-mono"
                style={{ color: project.color }}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                &gt;
              </m.span>
              <h3 className="text-base font-bold font-mono text-white group-hover:tracking-wider group-hover:text-[var(--accent)] transition-all duration-300" style={{ '--accent': project.color }}>
                {project.title}
              </h3>
              {hovered && (
                <m.span
                  className="w-2 h-5"
                  style={{ background: project.color }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              )}
            </div>
            <p className="text-gray-400 text-xs font-mono leading-relaxed pl-6">{project.desc}</p>
          </div>

          {/* Stats with animated borders */}
          <div className="grid grid-cols-3 gap-2">
            {project.stats.map((stat, i) => (
              <m.div
                key={stat.label}
                className="relative p-2 text-center font-mono rounded overflow-hidden"
                style={{ background: `${project.color}08`, border: `1px solid ${project.color}25` }}
                whileHover={{ scale: 1.08, borderColor: project.color, boxShadow: `0 0 15px ${project.color}40` }}
              >
                {/* Animated bottom line */}
                <m.div
                  className="absolute bottom-0 left-0 h-[2px]"
                  style={{ background: project.color }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
                />
                <div className="text-lg font-bold" style={{ color: project.color }}>
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-[8px] text-gray-400 tracking-wider">{stat.label}</div>
              </m.div>
            ))}
          </div>

          {/* Tech with pop animation */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <m.span
                key={tech}
                className="px-2 py-1 text-[9px] font-mono font-semibold rounded cursor-default"
                style={{
                  color: project.color,
                  border: `1px solid ${project.color}50`,
                  background: hovered ? `${project.color}15` : 'rgba(0,0,0,0)'
                }}
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.1, background: `${project.color}30`, boxShadow: `0 0 15px ${project.color}50` }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                {tech}
              </m.span>
            ))}
          </div>

          {/* SVG Icons Row */}
          <div className="flex items-center gap-2">
            {project.icons?.map((icon, i) => (
              <m.img
                key={i}
                src={icon}
                alt=""
                className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
                style={{ filter: `drop-shadow(0 0 3px ${project.color})` }}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              />
            ))}
          </div>

          {/* CTA with power effect */}
          <m.button
            className="w-full py-2.5 font-mono text-xs tracking-wider flex items-center justify-center gap-2 rounded relative overflow-hidden"
            style={{ border: `2px solid ${project.color}`, color: project.color }}
            whileHover={{ background: `${project.color}20`, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Sweep animation */}
            <m.div
              className="absolute inset-0"
              style={{ background: `linear-gradient(90deg, transparent, ${project.color}30, transparent)` }}
              animate={hovered ? { x: ['-100%', '200%'] } : { x: '-100%' }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="relative z-10 font-bold">[ ACCESS_PROJECT ]</span>
            <m.span
              className="relative z-10"
              animate={hovered ? { x: [0, 6, 0] } : { x: 0 }}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
              →
            </m.span>
          </m.button>
        </div>

        {/* Animated corner markers */}
        {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
          <m.div
            key={i}
            className="absolute w-5 h-5"
            style={{
              [y ? 'bottom' : 'top']: 0,
              [x ? 'right' : 'left']: 0,
              borderTop: y ? 'none' : `2px solid ${project.color}`,
              borderBottom: y ? `2px solid ${project.color}` : 'none',
              borderLeft: x ? 'none' : `2px solid ${project.color}`,
              borderRight: x ? `2px solid ${project.color}` : 'none',
            }}
            animate={hovered ? {
              boxShadow: [`0 0 5px ${project.color}`, `0 0 15px ${project.color}`, `0 0 5px ${project.color}`]
            } : {}}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}

        {/* Data stream */}
        <div className="absolute top-0 right-0 w-[2px] h-full overflow-hidden opacity-60">
          <m.div
            className="w-full h-16"
            style={{ background: `linear-gradient(to bottom, transparent, ${project.color}, transparent)` }}
            animate={{ y: ['-100%', '500%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </m.div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-28 min-h-screen w-full flex flex-col items-center relative overflow-hidden bg-[#030303]">

      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20 relative z-10"
      >
        <m.div
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        >
          <m.div
            className="w-20 h-[2px]"
            style={{ background: 'linear-gradient(90deg, transparent, #00ff41)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[#00ff41] text-xs font-mono tracking-[0.4em] px-4 py-2 border border-[#00ff41]/30 rounded">
            PROJECTS.exe
          </span>
          <m.div
            className="w-20 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #00ff41, transparent)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </m.div>

        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-mono mb-4">
          <span className="text-white">FEATURED</span>
          <m.span
            className="text-[#00ff41]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >_</m.span>
          <span className="text-[#00ff41]">WORK</span>
        </h2>

        <m.p
          className="text-gray-700 text-sm font-mono"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {'>'} Loading project database... <span className="text-[#00ff41]">COMPLETE</span>
        </m.p>
      </m.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 w-full max-w-7xl px-4 sm:px-6 relative z-10" style={{ perspective: '2000px' }}>
        {projects.map((project, index) => (
          <CyberCard key={project.title} project={project} index={index} />
        ))}
      </div>

      {/* Bottom glow */}
      <m.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="mt-24 w-full max-w-5xl h-[2px] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent" />
        <m.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-60"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </m.div>
    </section>
  );
}
