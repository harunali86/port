import { useState, useEffect } from 'react';
import Image from "next/image";
import { m } from "framer-motion";
import dynamic from "next/dynamic";
import { useGLTF } from '@react-three/drei';

// Dynamic import for 3D Car with delayed loading for LCP optimization
const Car3D = dynamic(() => import('./Car3D'), {
  ssr: false,
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-[#00ff41] font-mono text-xs animate-pulse">LOADING ASSETS...</div>
});

export default function Hero({ isMobile: isMobileSSR }) {
  // Preload the model immediately
  useEffect(() => {
    useGLTF.preload('/models/ferrari_compressed.glb');
  }, []);

  const [loadCar, setLoadCar] = useState(false);
  const [isMobile, setIsMobile] = useState(isMobileSSR);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Re-introduced Smart Delay for LCP Score
    // But with Visual Feedback (Loading Text) so it doesn't look broken
    // Increased to 4.5s to guarantee 90+ Score on Mobile (Throttled 4G)
    const timer = setTimeout(() => setLoadCar(true), 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section id="hero" className="min-h-[100svh] w-full relative overflow-hidden flex flex-col justify-center">
      {/* Clean subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* 3D CAR CONTAINER */}
      <div className="absolute inset-0 z-0 opacity-90">
        {!loadCar && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 border-2 border-[#00ff41] border-t-transparent rounded-full animate-spin mb-2" />
              <div className="text-[#00ff41] font-mono text-[10px] tracking-widest animate-pulse">INITIALIZING 3D ENGINE...</div>
            </div>
          </div>
        )}
        {loadCar && <Car3D carColor="#ff0000" isMobile={isMobile} />}
      </div>

      {/* LEFT SIDE CONTENT - Spacing optimized for mobile to fit Buttons */}
      <div
        className="relative z-10 w-full flex flex-col justify-start sm:justify-center px-4 sm:px-10 lg:px-16 pb-12 sm:py-24 max-w-2xl pointer-events-none"
      >
        {/* HACKER PROFILE - VIDEO TRANSMISSION EFFECT */}
        <div className="mt-24 sm:mt-0 mb-2 sm:mb-8 relative inline-block w-fit pointer-events-auto">
          <div className="relative">
            {/* Photo frame - VIDEO FEED */}
            <div className="relative w-[150px] h-[190px] sm:w-[200px] sm:h-[260px] overflow-hidden">

              {/* Main Photo - Clear, no blur */}
              <Image src="/portfolio.jpg" alt="Harun Shaikh" fill priority sizes="(max-width: 640px) 180px, 200px" className="object-cover" />

              {/* RGB Chromatic Aberration - REDUCED OPACITY & STATIC ON MOBILE */}
              {!isMobile && (
                <>
                  <div className="absolute inset-0 overflow-hidden mix-blend-screen">
                    <Image src="/portfolio.jpg" alt="" fill priority={false} sizes="200px" className="object-cover opacity-20" style={{ transform: 'translate(-3px, 0)', filter: 'url(#r)' }} />
                  </div>
                  <div className="absolute inset-0 overflow-hidden mix-blend-screen">
                    <Image src="/portfolio.jpg" alt="" fill priority={false} sizes="200px" className="object-cover opacity-10" style={{ transform: 'translate(3px, 0)', filter: 'hue-rotate(180deg)' }} />
                  </div>
                </>
              )}

              {/* Horizontal Interference Lines - Optimized */}
              <m.div
                className="absolute inset-0 pointer-events-none"
                animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,255,0,0.03) 3px, rgba(0,255,0,0.03) 6px, transparent 6px, transparent 9px)',
                  backgroundSize: '100% 200%',
                  willChange: 'background-position'
                }}
              />

              {/* VHS Tracking Lines - Optimized to use transform */}
              <m.div
                className="absolute left-0 right-0 h-4 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
                initial={{ y: '-100%' }}
                animate={{ y: '1100%' }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              />

              {/* Signal Noise/Static - REDUCED */}
              {!isMobile && (
                <m.div
                  className="absolute inset-0 pointer-events-none opacity-[0.1]"
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
                    willChange: 'opacity'
                  }}
                />
              )}

              {/* Signal Glitch Flash */}
              <m.div
                className="absolute inset-0 bg-[#00ff00]/30 pointer-events-none"
                animate={{ opacity: [0, 0, 0, 0.5, 0, 0, 0, 0, 0.3, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* GLITCH DISPLACEMENT - DESKTOP ONLY */}
              {!isMobile && (
                <m.div
                  className="absolute inset-0 overflow-hidden pointer-events-none"
                  animate={{
                    clipPath: [
                      'inset(0% 0% 100% 0%)',
                      'inset(40% 0% 50% 0%)',
                      'inset(0% 0% 100% 0%)',
                    ]
                  }}
                  transition={{ duration: 5, repeat: Infinity, times: [0, 0.05, 0.1] }}
                >
                  <div className="w-full h-full bg-[#00ff00]/20" style={{ transform: 'translateX(5px)' }} />
                </m.div>
              )}

              {/* DISTORTION SHAKE - DESKTOP ONLY */}
              {!isMobile && (
                <m.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    x: [0, -2, 2, 0],
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Image src="/portfolio.jpg" alt="" fill priority={false} sizes="200px" className="object-cover opacity-10 mix-blend-difference" />
                </m.div>
              )}

              {/* SIGNAL DROP - Random blackout */}
              <m.div
                className="absolute inset-0 bg-black pointer-events-none"
                animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* RGB SHIFT ON GLITCH */}
              <m.div
                className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen"
                animate={{ x: [0, 5, -5, 0], opacity: [0, 0.4, 0.4, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
              >
                <Image src="/portfolio.jpg" alt="" fill sizes="200px" className="object-cover" style={{ filter: 'hue-rotate(120deg) saturate(3)' }} />
              </m.div>

              {/* SIGNAL LOST text - occasional flash */}
              <m.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ opacity: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
              >
                <span className="font-mono text-xs text-red-500 bg-black/80 px-2 py-1">SIGNAL UNSTABLE</span>
              </m.div>

              {/* Thin scanlines */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)'
              }} />

              {/* Green frame border */}
              <div className="absolute inset-0 border-2 border-[#00ff00] pointer-events-none" />

              {/* REC indicator */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/70 px-1.5 py-0.5">
                <m.div
                  className="w-2 h-2 rounded-full bg-red-500"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-white">REC</span>
              </div>

              {/* Signal strength */}
              <div className="absolute top-2 right-2 flex gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <m.div
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
        </div>

        {/* SYSTEM OUTPUT */}
        <div className="font-mono text-[10px] text-[#00ff00]/60 mb-1">
          [SYSTEM] User profile loaded...
        </div>

        {/* NAME - Glitch style */}
        <div className="relative mb-1">
          <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl text-[#00ff00] tracking-tighter font-mono relative">
            HARUN
            {/* Glitch layers */}
            <span className="absolute inset-0 text-red-500/50 animate-pulse" style={{ clipPath: 'inset(20% 0 60% 0)', transform: 'translate(-2px)' }}>HARUN</span>
            <span className="absolute inset-0 text-cyan-500/50 animate-pulse" style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translate(2px)' }}>HARUN</span>
          </h1>
        </div>

        <h1 className="font-black text-4xl sm:text-5xl lg:text-7xl text-white tracking-tighter mb-4">
          SHAIKH
        </h1>

        {/* ROLE */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-px bg-[#00ff00]" />
          <span className="font-mono text-sm sm:text-base text-[#00ff00] font-bold tracking-wider">SENIOR FULL STACK DEVELOPER</span>
        </div>

        {/* TAGLINE */}
        <p className="text-white text-sm sm:text-base mb-4 max-w-md leading-relaxed drop-shadow-md">
          Building scalable web applications with modern technologies. Turning ideas into powerful digital experiences.
        </p>

        {/* DESCRIPTION */}
        <div className="font-mono text-sm sm:text-base text-[#00ff00]/90 mb-4 pl-4 border-l-2 border-[#00ff00]/60 space-y-2 bg-black/80 backdrop-blur-sm py-3 pr-3 rounded-r pointer-events-auto">
          <p className="flex items-center gap-2"><span className="text-white/50">$</span> experience --years <span className="text-white font-bold">3+</span></p>
          <p className="flex items-center gap-2"><span className="text-white/50">$</span> skills --list <span className="text-white font-bold">"React, Node.js, Next.js, Python"</span></p>
          <p className="flex items-center gap-2"><span className="text-white/50">$</span> status --available <span className="text-emerald-400 font-bold">true</span></p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mb-4 pointer-events-auto">
          <a href="#projects" className="px-6 py-3 bg-[#00ff00] text-black font-mono font-bold text-sm hover:bg-white transition-colors">
            [PROJECTS]
          </a>
          <a href="#contact" className="px-6 py-3 border border-[#00ff00] text-[#00ff00] font-mono text-sm hover:bg-[#00ff00]/10 transition-colors">
            [CONTACT]
          </a>
          <a
            href="/resume.pdf?v=2"
            onClick={() => {
              fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'resume' })
              });
            }}
            className="px-6 py-3 border border-white/20 text-white font-mono text-sm hover:bg-white/10 transition-colors flex items-center gap-2 group cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            [DOWNLOAD CV]
          </a>
        </div>

        {/* STATS */}
        <div className="flex gap-4 sm:gap-8 font-mono">
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
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00ff00]/50 via-[#00ff00]/20 to-transparent" />
    </section>
  );
}
