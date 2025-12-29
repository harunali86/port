// K72-Style Navigation - SCROLLABLE + ALL SERVICES
import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/#projects", label: "PROJECTS", hover: "VIEW MY WORK" },
  { href: "/#about", label: "ABOUT", hover: "KNOW ME BETTER" },
  { href: "/#skills", label: "SKILLS", hover: "MY EXPERTISE" },
  { href: "/#services", label: "SERVICES", hover: "WHAT I OFFER", hasSubmenu: true },
  { href: "/blog", label: "BLOG", hover: "READ ARTICLES" },
  { href: "/#contact", label: "CONTACT", hover: "LET'S TALK" }
];

const serviceLinks = [
  { name: 'Web Development', url: '/services/web-development' },
  { name: 'Mobile Apps', url: '/services/mobile-apps' },
  { name: 'UI/UX Design', url: '/services/ui-ux-design' },
  { name: 'AI & Agents', url: '/services/ai-agents' },
  { name: 'Backend & APIs', url: '/services/backend-apis' },
  { name: 'SEO / GEO', url: '/services/seo-optimization' }
];

function HarunLogo({ variant = "default" }) {
  const isLight = variant === "light";
  const accentColor = "#D3FD50"; // Lime
  const textColor = isLight ? "#D3FD50" : "white";

  return (
    <div className="flex items-center gap-2 group">
      {/* Icon - Code Brackets with Gradient */}
      <div className="relative">
        <svg viewBox="0 0 40 40" className="w-8 h-8 sm:w-9 sm:h-9">
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentColor} />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          {/* Outer Circle */}
          <circle cx="20" cy="20" r="18" fill="none" stroke="url(#logoGrad)" strokeWidth="2" className="group-hover:stroke-[3] transition-all" />
          {/* Code Brackets */}
          <path d="M14 13 L8 20 L14 27" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 13 L32 20 L26 27" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Slash */}
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


function K72Hamburger({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} aria-label="Open Menu"
      className="h-10 lg:h-16 bg-black relative w-48 lg:w-[16vw] cursor-pointer overflow-hidden border-none p-0 outline-none group focus:ring-2 focus:ring-[#D3FD50]">
      {/* CSS Transition Background */}
      <div className="absolute top-0 left-0 right-0 bg-[#D3FD50] h-0 group-hover:h-full transition-all duration-300 ease-in-out" />

      <div className="relative h-full px-8 lg:px-12 flex flex-col justify-center items-end gap-0.5 lg:gap-1.5 z-10 w-full">
        <div className="h-0.5 w-[48px] bg-white group-hover:bg-black transition-colors duration-300" />
        <div className="h-0.5 w-[24px] bg-white group-hover:bg-black transition-colors duration-300" />
      </div>
    </button>
  );
}

const stairVariants = {
  closed: { height: 0 },
  open: (i) => ({ height: "100%", transition: { duration: 0.4, delay: 0.04 * (4 - i), ease: [0.65, 0, 0.35, 1] } }),
  exit: (i) => ({ height: 0, transition: { duration: 0.25, delay: 0.03 * i, ease: [0.65, 0, 0.35, 1] } })
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center">
        <div className="p-4 sm:p-5 lg:p-6">
          <Link href="/" aria-label="Harun Home"><HarunLogo /></Link>
        </div>
        <K72Hamburger onClick={() => setOpen(true)} />
      </nav>

      <AnimatePresence mode="wait">
        {open && (
          <m.div key="nav" className="fixed inset-0 z-50 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Stairs Background */}
            <div className="fixed inset-0 flex">
              {[...Array(5)].map((_, i) => (
                <m.div key={i} className="w-1/5 bg-black origin-top" custom={i} initial="closed" animate="open" exit="exit" variants={stairVariants} />
              ))}
            </div>

            {/* Header - Fixed at Top */}
            <m.div className="relative z-10 flex justify-between items-center p-4 sm:p-5 lg:p-6 shrink-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <Link href="/" onClick={() => setOpen(false)} aria-label="Home"><HarunLogo variant="light" /></Link>
              <button onClick={() => setOpen(false)} aria-label="Close Menu" className="h-12 w-12 relative outline-none group">
                <div className="absolute top-0 left-1/2 w-1 bg-[#D3FD50] origin-top h-full -rotate-45 -translate-x-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-100 ease-out origin-top" />
                <div className="absolute top-0 right-0 w-1 bg-[#D3FD50] origin-top h-full rotate-45 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-100 ease-out origin-top" />
                {/* Fallback visible X for UX */}
                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#D3FD50] -translate-x-1/2 -translate-y-1/2 rotate-45" />
                <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-[#D3FD50] -translate-x-1/2 -translate-y-1/2 -rotate-45" />
              </button>
            </m.div>

            {/* SCROLLABLE Links Container */}
            <div className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-8 py-4">
              {navLinks.map((link, i) => (
                // Use CSS animation for entry staggers instead of JS variants if possible, 
                // but for staggered exit we might still need Motion. 
                // Let's keep Motion for EXIT staggering but simplify the content.
                <m.div
                  key={link.href}
                  className="border-t border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.4 }}
                >
                  {link.hasSubmenu ? (
                    // SERVICES with Submenu
                    <div>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full group relative overflow-hidden"
                      >
                        {/* Base Text */}
                        <div className="flex items-center justify-center py-3">
                          <h1 className="font-black text-[8vw] sm:text-[5vw] lg:text-[4vw] text-white uppercase tracking-tight group-hover:text-[#D3FD50] transition-colors duration-300">
                            {link.label}
                          </h1>
                          <ChevronDown className={`text-[#D3FD50] ml-4 transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} size={28} />
                        </div>
                      </button>

                      {/* All 6 Service Subpages */}
                      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 px-2 overflow-hidden transition-all duration-500 ease-in-out ${servicesOpen ? 'max-h-[500px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                        {serviceLinks.map((s, idx) => (
                          <Link key={idx} href={s.url} onClick={() => setOpen(false)}
                            className="text-sm font-semibold text-[#D3FD50] hover:text-black hover:bg-[#D3FD50] px-4 py-3 rounded-lg transition-all border border-[#D3FD50]/30 text-center">
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Regular Links
                    <Link href={link.href} onClick={() => setOpen(false)} className="block group">
                      <h1 className="font-black text-[8vw] sm:text-[5vw] lg:text-[4vw] text-white text-center py-3 uppercase tracking-tight group-hover:text-[#D3FD50] transition-colors duration-300">
                        {link.label}
                      </h1>
                    </Link>
                  )}
                </m.div>
              ))}
            </div>

            {/* Footer - Fixed at Bottom */}
            <m.div
              className="relative z-10 p-4 flex justify-between items-center border-t border-white/10 shrink-0 bg-black/80 backdrop-blur"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-white/40 text-xs">
                INDIA • 2024
                <Link href="/admin" className="ml-2 hover:text-white transition-colors">• ADMIN</Link>
              </span>
              <div className="flex gap-2">
                {[
                  { icon: Github, href: "https://github.com/harunali86" },
                  { icon: Linkedin, href: "https://linkedin.com/in/harunshaikh" },
                  { icon: Twitter, href: "https://twitter.com/harunshaikh" },
                  { icon: Instagram, href: "https://instagram.com/harunshaikh" }
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Social ${i}`}
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-[#D3FD50] hover:border-[#D3FD50] hover:text-black transition-all">
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

