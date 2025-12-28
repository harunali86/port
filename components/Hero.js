import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import for 3D Car
const Car3D = dynamic(() => import('./Car3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#00ff00]/30 border-t-[#00ff00] rounded-full animate-spin" />
    </div>
  )
});

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="hero" className="min-h-screen w-full relative overflow-hidden">
      {/* Clean subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* 3D CAR - Floating in background */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Car3D carColor="#ff0000" />
      </div>

      {/* LEFT SIDE CONTENT */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 min-h-screen flex flex-col justify-center px-4 sm:px-10 lg:px-16 py-20 sm:py-24 max-w-2xl"
      >
        {/* HACKER PROFILE - VIDEO TRANSMISSION EFFECT */}
        <motion.div variants={itemVariants} className="mb-8 relative inline-block w-fit">
          <div className="relative">
            {/* Photo frame - VIDEO FEED */}
            <div className="relative w-[180px] h-[230px] sm:w-[200px] sm:h-[260px] overflow-hidden">

              {/* Main Photo - Clear, no blur */}
              <Image src="/portfolio.jpg" alt="Harun Shaikh" fill className="object-cover" />

              {/* RGB Chromatic Aberration */}
              <div className="absolute inset-0 overflow-hidden mix-blend-screen">
                <Image src="/portfolio.jpg" alt="" fill className="object-cover opacity-30" style={{ transform: 'translate(-3px, 0)', filter: 'url(#r)' }} />
              </div>
              <div className="absolute inset-0 overflow-hidden mix-blend-screen">
                <Image src="/portfolio.jpg" alt="" fill className="object-cover opacity-20" style={{ transform: 'translate(3px, 0)', filter: 'hue-rotate(180deg)' }} />
              </div>

              {/* Horizontal Interference Lines - IGI style */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,255,0,0.03) 3px, rgba(0,255,0,0.03) 6px, transparent 6px, transparent 9px)',
                  backgroundSize: '100% 200%'
                }}
              />

              {/* VHS Tracking Lines - Moving */}
              <motion.div
                className="absolute left-0 right-0 h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Signal Noise/Static */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-[0.15]"
                animate={{ opacity: [0.1, 0.2, 0.05, 0.15] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")'
                }}
              />

              {/* Signal Glitch Flash */}
              <motion.div
                className="absolute inset-0 bg-[#00ff00]/30 pointer-events-none"
                animate={{ opacity: [0, 0, 0, 0.5, 0, 0, 0, 0, 0.3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* GLITCH DISPLACEMENT - Horizontal Tear */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                animate={{
                  clipPath: [
                    'inset(0% 0% 100% 0%)',
                    'inset(40% 0% 50% 0%)',
                    'inset(0% 0% 100% 0%)',
                    'inset(70% 0% 20% 0%)',
                    'inset(0% 0% 100% 0%)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.35, 0.7, 0.75] }}
              >
                <div className="w-full h-full bg-[#00ff00]/20" style={{ transform: 'translateX(10px)' }} />
              </motion.div>

              {/* DISTORTION SHAKE */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  x: [0, -2, 3, -1, 0, 2, -3, 0],
                  y: [0, 1, -1, 2, 0, -1, 1, 0]
                }}
                transition={{ duration: 0.3, repeat: Infinity, repeatType: 'loop' }}
              >
                <Image src="/portfolio.jpg" alt="" fill className="object-cover opacity-10 mix-blend-difference" />
              </motion.div>

              {/* SIGNAL DROP - Random blackout */}
              <motion.div
                className="absolute inset-0 bg-black pointer-events-none"
                animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* RGB SHIFT ON GLITCH */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen"
                animate={{ x: [0, 5, -5, 0], opacity: [0, 0.4, 0.4, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
              >
                <Image src="/portfolio.jpg" alt="" fill className="object-cover" style={{ filter: 'hue-rotate(120deg) saturate(3)' }} />
              </motion.div>

              {/* SIGNAL LOST text - occasional flash */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <span className="font-mono text-xs text-red-500 bg-black/80 px-2 py-1">SIGNAL UNSTABLE</span>
              </motion.div>

              {/* Thin scanlines */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)'
              }} />

              {/* Green frame border */}
              <div className="absolute inset-0 border-2 border-[#00ff00] pointer-events-none" />

              {/* REC indicator */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/70 px-1.5 py-0.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-white">REC</span>
              </div>

              {/* Signal strength */}
              <div className="absolute top-2 right-2 flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-[#00ff00]"
                    style={{ height: i * 3 }}
                    animate={{ opacity: i <= 2 ? [1, 0.3, 1] : 0.3 }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
              </div>
            </div>

            {/* Corner brackets */}
            <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#00ff00]" />
            <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#00ff00]" />
            <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#00ff00]" />
            <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#00ff00]" />

            {/* Status bar */}
            <div className="absolute -bottom-1 left-3 right-3 bg-black border border-[#00ff00]/70 px-2 py-1 flex justify-between items-center">
              <span className="font-mono text-[9px] text-[#00ff00]">FEED: LIVE</span>
              <span className="font-mono text-[9px] text-[#00ff00]/60">H4RUN_D3V</span>
            </div>
          </div>
        </motion.div>

        {/* SYSTEM OUTPUT */}
        <motion.div variants={itemVariants} className="font-mono text-[10px] text-[#00ff00]/60 mb-2">
          [SYSTEM] User profile loaded...
        </motion.div>

        {/* NAME - Glitch style */}
        <motion.div variants={itemVariants} className="relative mb-1">
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl text-[#00ff00] tracking-tighter font-mono relative">
            HARUN
            {/* Glitch layers */}
            <span className="absolute inset-0 text-red-500/50 animate-pulse" style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-2px)' }}>HARUN</span>
            <span className="absolute inset-0 text-cyan-500/50 animate-pulse" style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translate(2px)' }}>HARUN</span>
          </h1>
        </motion.div>

        <motion.h1 variants={itemVariants} className="font-black text-4xl sm:text-5xl lg:text-7xl text-white tracking-tighter mb-4">
          SHAIKH
        </motion.h1>

        {/* ROLE */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-[#00ff00]" />
          <span className="font-mono text-sm sm:text-base text-[#00ff00] font-bold tracking-wider">SENIOR FULL STACK DEVELOPER</span>
        </motion.div>

        {/* TAGLINE */}
        <motion.p variants={itemVariants} className="text-white/80 text-sm sm:text-base mb-4 max-w-md leading-relaxed">
          Building scalable web applications with modern technologies. Turning ideas into powerful digital experiences.
        </motion.p>

        {/* DESCRIPTION */}
        <motion.div variants={itemVariants} className="font-mono text-sm sm:text-base text-[#00ff00]/90 mb-6 pl-4 border-l-2 border-[#00ff00]/60 space-y-2 bg-black/40 py-3 pr-3 rounded-r">
          <p className="flex items-center gap-2"><span className="text-white/50">$</span> experience --years <span className="text-white font-bold">3+</span></p>
          <p className="flex items-center gap-2"><span className="text-white/50">$</span> skills --list <span className="text-white font-bold">"React, Node.js, Next.js, Python"</span></p>
          <p className="flex items-center gap-2"><span className="text-white/50">$</span> status --available <span className="text-emerald-400 font-bold">true</span></p>
        </motion.div>

        {/* BUTTONS */}
        <motion.div variants={itemVariants} className="flex gap-4 mb-8">
          <a href="#projects" className="px-6 py-3 bg-[#00ff00] text-black font-mono font-bold text-sm hover:bg-white transition-colors">
            [PROJECTS]
          </a>
          <a href="#contact" className="px-6 py-3 border border-[#00ff00] text-[#00ff00] font-mono text-sm hover:bg-[#00ff00]/10 transition-colors">
            [CONTACT]
          </a>
        </motion.div>

        {/* STATS */}
        <motion.div variants={itemVariants} className="flex gap-4 sm:gap-8 font-mono">
          <div>
            <div className="text-2xl font-bold text-[#00ff00]">3+</div>
            <div className="text-[10px] text-white/30">YEARS_EXP</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#00ff00]">50+</div>
            <div className="text-[10px] text-white/30">PROJECTS</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-[10px] text-[#00ff00]">PASSION</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00ff00]/50 via-[#00ff00]/20 to-transparent" />
    </section>
  );
}
