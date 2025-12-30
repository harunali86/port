// K72-Style Navigation - GSAP CLONE
import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from "next/link";

// Custom Harun Logo
function HarunLogo({ variant = "default" }) {
  const isLight = variant === "light";
  const accentColor = "#D3FD50"; // Lime
  const textColor = isLight ? "#D3FD50" : "white";

  return (
    <div className="flex items-center gap-2 group">
      {/* Icon - Code Brackets with Gradient */}
      <div className="relative">
        <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-9 sm:h-9">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="none" stroke="url(#logoGrad)" strokeWidth="2" className="group-hover:stroke-[3] transition-all" />
          <path d="M14 13 L8 20 L14 27" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 13 L32 20 L26 27" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="22" y1="12" x2="18" y2="28" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Text - HARUN */}
      <div className="flex flex-col leading-none">
        <span className="font-black text-lg sm:text-xl tracking-tight" style={{ color: textColor }}>
          <span style={{ color: accentColor }}>H</span>ARUN
        </span>
        <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase opacity-50" style={{ color: textColor }}>
          Full Stack Dev
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [puneTime, setPuneTime] = useState('');
  const navGreenRef = useRef(null);
  const fullScreenRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Real-time Pune clock (IST - Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setPuneTime(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animation Logic - K72 Reference (600ms total)
  const gsapAnimation = () => {
    const tl = gsap.timeline();
    // Instant display
    tl.set('.fullscreennav', { display: 'block' });
    // Stairs slide DOWN from top (staggered right-to-left = negative stagger)
    tl.to('.stairing', {
      height: '100%',
      duration: 0.4,
      ease: 'power2.out',
      stagger: { amount: -0.2, from: 'end' }
    });
    // Links reveal with rotateX (3D flip) - starts slightly before stairs finish
    tl.to('.link', {
      opacity: 1,
      rotateX: 0,
      duration: 0.3,
      ease: 'power2.out',
      stagger: { amount: 0.15 }
    }, "-=0.2");
    // Nav content fades in
    tl.to('.navlink', { opacity: 1, duration: 0.15 }, "-=0.2");
  };

  const gsapAnimationReverse = () => {
    const tl = gsap.timeline();
    // Links hide first
    tl.to('.link', {
      opacity: 0,
      rotateX: 90,
      duration: 0.2,
      ease: 'power2.in',
      stagger: { amount: 0.1 }
    });
    // Stairs slide UP (staggered right-to-left)
    tl.to('.stairing', {
      height: 0,
      duration: 0.4,
      ease: 'power2.in',
      stagger: { amount: -0.2, from: 'end' }
    }, "-=0.1");
    // Hide nav content and container
    tl.to('.navlink', { opacity: 0, duration: 0.1 }, "-=0.3");
    tl.set('.fullscreennav', { display: 'none' });
  };

  useGSAP(() => {
    // Only run animations if elements exist (prevents console errors)
    const elements = document.querySelectorAll('.stairing, .link, .fullscreennav');
    if (elements.length === 0) return;

    if (open) {
      gsapAnimation();
    } else {
      gsapAnimationReverse();
    }
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      <nav className="fixed top-0 w-full flex items-start justify-between z-40 selection:bg-[#D3FD50] selection:text-black">

        {/* Logo Container */}
        <div className="lg:p-5 p-4">
          <Link href="/" aria-label="Home">
            <div className="lg:w-36 w-24">
              <HarunLogo color="white" />
            </div>
          </Link>
        </div>

        {/* Hamburger */}
        <div
          className="lg:h-16 h-10 bg-black relative lg:w-[16vw] w-48 cursor-pointer group"
          onClick={() => setOpen(true)}
          onMouseEnter={() => { if (navGreenRef.current) navGreenRef.current.style.height = '100%' }}
          onMouseLeave={() => { if (navGreenRef.current) navGreenRef.current.style.height = '0%' }}
        >
          <div ref={navGreenRef} className='bg-[#D3FD50] transition-all duration-300 ease-in-out absolute top-0 h-0 w-full'></div>
          <div className='relative h-full lg:px-12 px-8 flex flex-col justify-center items-end lg:gap-1.5 gap-0.5 pointer-events-none'>
            <div className="lg:w-18 w-12 h-0.5 bg-white transition-colors duration-300"></div>
            <div className="lg:w-10 w-6 h-0.5 bg-white transition-colors duration-300"></div>
          </div>
        </div>
      </nav>

      {/* Full Screen Nav Overlay - GSAP Targeted */}
      <div ref={fullScreenRef} className='fullscreennav hidden text-white overflow-hidden h-[100dvh] w-full z-[9999] fixed inset-0'>

        {/* Stair Backgrounds */}
        <div className='absolute inset-0 w-full h-full flex pointer-events-none z-0'>
          <div className='stairing h-0 w-1/5 bg-black'></div>
          <div className='stairing h-0 w-1/5 bg-black'></div>
          <div className='stairing h-0 w-1/5 bg-black'></div>
          <div className='stairing h-0 w-1/5 bg-black'></div>
          <div className='stairing h-0 w-1/5 bg-black'></div>
        </div>

        {/* Content Container */}
        <div className='relative z-10 flex flex-col h-full opacity-0 navlink'>

          {/* Header */}
          <div className="flex justify-between items-start lg:p-5 p-4 shrink-0">
            <div className="lg:w-36 w-24">
              <HarunLogo color="white" />
            </div>
            <div onClick={() => setOpen(false)} className="cursor-pointer w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center hover:rotate-90 transition-transform duration-300">
              <svg viewBox="0 0 24 24" className="w-10 h-10 lg:w-14 lg:h-14" stroke="#D3FD50" strokeWidth="1.5" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </div>
          </div>

          {/* Main Links - with .link class for GSAP stagger */}
          <div className="flex-1 flex flex-col justify-start lg:justify-center w-full px-4 lg:px-0 overflow-y-auto lg:overflow-visible pb-40 lg:pb-0 pt-10 lg:pt-0 no-scrollbar">


            {/* WORK */}
            <div className="w-full border-t border-white link opacity-0 origin-top relative group" style={{ transformStyle: 'preserve-3d' }}>
              <Link href="/#projects" onClick={() => setOpen(false)} className="block py-4">
                <h1 className="font-black text-5xl lg:text-8xl text-center uppercase leading-[0.8] lg:pt-4 pt-2 transition-colors duration-300">
                  WORK
                </h1>
              </Link>

              <div className="moveLink absolute flex text-black top-0 left-0 w-full h-full items-center bg-[#D3FD50] overflow-hidden pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">VIEW WORK</span>
                  <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=300&q=80" alt="UI" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">VIEW WORK</span>
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80" alt="Art" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">VIEW WORK</span>
                </div>
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">VIEW WORK</span>
                  <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=300&q=80" alt="UI" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">VIEW WORK</span>
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80" alt="Art" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">VIEW WORK</span>
                </div>
              </div>
            </div>

            {/* AGENCY */}
            <div className="w-full border-t border-white link opacity-0 origin-top relative group" style={{ transformStyle: 'preserve-3d' }}>
              <Link href="/#services" onClick={() => setOpen(false)} className="block py-4">
                <h1 className="font-black text-5xl lg:text-8xl text-center uppercase leading-[0.8] lg:pt-4 pt-2 transition-colors duration-300">
                  AGENCY
                </h1>
              </Link>
              <div className="moveLink absolute flex text-black top-0 left-0 w-full h-full items-center bg-[#D3FD50] overflow-hidden pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">ALL SERVICES</span>
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80" alt="Office" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">ALL SERVICES</span>
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80" alt="Strategy" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                </div>
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">ALL SERVICES</span>
                  <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80" alt="Office" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">ALL SERVICES</span>
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80" alt="Strategy" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div className="w-full border-t border-white link opacity-0 origin-top relative group" style={{ transformStyle: 'preserve-3d' }}>
              <Link href="/#contact" onClick={() => setOpen(false)} className="block py-4">
                <h1 className="font-black text-5xl lg:text-8xl text-center uppercase leading-[0.8] lg:pt-4 pt-2 transition-colors duration-300">
                  CONTACT
                </h1>
              </Link>
              <div className="moveLink absolute flex text-black top-0 left-0 w-full h-full items-center bg-[#D3FD50] overflow-hidden pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">CONTACT ME</span>
                  <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=300&q=80" alt="Phone" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">CONTACT ME</span>
                  <img src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=300&q=80" alt="Email" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                </div>
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">CONTACT ME</span>
                  <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=300&q=80" alt="Phone" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-7xl uppercase leading-none px-4">CONTACT ME</span>
                  <img src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=300&q=80" alt="Email" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                </div>
              </div>
            </div>

            {/* BLOG */}
            <div className="w-full border-y border-white link opacity-0 origin-top relative mb-20 lg:mb-0 group" style={{ transformStyle: 'preserve-3d' }}>
              <Link href="/blog" onClick={() => setOpen(false)} className="block py-4">
                <h1 className="font-black text-5xl lg:text-8xl text-center uppercase leading-[0.8] lg:pt-4 pt-2 transition-colors duration-300">
                  BLOG
                </h1>
              </Link>
              <div className="moveLink absolute flex text-black top-0 left-0 w-full h-full items-center bg-[#D3FD50] overflow-hidden pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">READ MORE</span>
                  <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=300&q=80" alt="Writing" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">READ MORE</span>
                  <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=300&q=80" alt="Coffee" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                </div>
                <div className="moveX flex items-center shrink-0">
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">READ MORE</span>
                  <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=300&q=80" alt="Writing" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                  <span className="font-black text-5xl lg:text-8xl uppercase leading-none px-4">READ MORE</span>
                  <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=300&q=80" alt="Coffee" className="h-16 w-32 lg:h-20 lg:w-40 object-cover rounded-full mx-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full p-2 lg:p-4 flex flex-col-reverse lg:flex-row justify-between items-start lg:items-end text-[8px] lg:text-[10px] font-mono uppercase tracking-widest text-white/50 bg-black gap-2 lg:gap-0 z-20">
            <div className="flex flex-col gap-1 w-full lg:w-auto text-center lg:text-left">
              <span>PUNE_{puneTime}</span>
              <span>PRIVACY POLICY</span>
              <span>ETHICS REPORT</span>
            </div>
            <div className="flex gap-2 w-full lg:w-auto justify-center lg:justify-end">
              {['FB', 'IG', 'IN', 'BE'].map((txt, i) => (
                <div key={i} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#D3FD50] hover:text-black hover:border-transparent transition-all cursor-pointer">
                  {txt}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
