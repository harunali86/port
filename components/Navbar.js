// K72-Style Navigation - Square Hamburger + Unique HARUN Logo
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#projects", label: "PROJECTS", hover: "VIEW MY WORK", media: { type: "video", src: "https://cdn.coverr.co/videos/coverr-typing-on-a-macbook-5765/1080p.mp4" } },
  { href: "#about", label: "ABOUT", hover: "KNOW ME BETTER", media: { type: "image", src: "/menu/about.png" } },
  { href: "#skills", label: "SKILLS", hover: "MY EXPERTISE", media: { type: "image", src: "/menu/skills.png" } },
  { href: "#services", label: "SERVICES", hover: "WHAT I OFFER", media: { type: "image", src: "/menu/services.png" } },
  { href: "#contact", label: "CONTACT", hover: "LET'S TALK", media: { type: "image", src: "/menu/contact.png" } }
];

// HARUN Full Logo - All 5 Letters
function HarunLogo({ variant = "default" }) {
  const isLight = variant === "light";
  const mainColor = isLight ? "#D3FD50" : "white";

  return (
    <svg viewBox="0 0 130 35" className="h-7 sm:h-8 lg:h-10 w-auto">
      {/* H */}
      <rect x="0" y="0" width="4" height="35" fill={mainColor} />
      <rect x="0" y="15" width="14" height="5" fill={mainColor} />
      <rect x="10" y="0" width="4" height="35" fill={mainColor} />

      {/* A */}
      <polygon points="22,35 28,0 34,35 30,35 28,24 26,35" fill={mainColor} />
      <rect x="24" y="20" width="8" height="4" fill={mainColor} />

      {/* R */}
      <rect x="42" y="0" width="4" height="35" fill="#D3FD50" />
      <path d="M42 0 L54 0 Q60 0 60 8 Q60 16 54 16 L46 16 L46 12 L52 12 Q56 12 56 8 Q56 4 52 4 L46 4 Z" fill="#D3FD50" />
      <polygon points="52,16 62,35 56,35 48,18" fill="#D3FD50" />

      {/* U */}
      <path d="M68 0 L68 25 Q68 35 78 35 Q88 35 88 25 L88 0 L84 0 L84 25 Q84 31 78 31 Q72 31 72 25 L72 0 Z" fill="#D3FD50" />

      {/* N */}
      <rect x="96" y="0" width="4" height="35" fill="#D3FD50" />
      <polygon points="96,0 100,0 116,28 116,0 120,0 120,35 116,35 100,7 100,35 96,35" fill="#D3FD50" />
    </svg>
  );
}

// K72 EXACT Hamburger - WIDE, thin lines
function K72Hamburger({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="h-10 lg:h-16 bg-black relative w-48 lg:w-[16vw] cursor-pointer overflow-hidden">
      {/* Green fill from TOP */}
      <motion.div
        className="absolute top-0 left-0 right-0 bg-[#D3FD50]"
        animate={{ height: hovered ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative h-full px-8 lg:px-12 flex flex-col justify-center items-end gap-0.5 lg:gap-1.5 z-10">
        {/* Thin lines like K72 */}
        <motion.div
          className="h-0.5 bg-white"
          style={{ width: 48 }}
          animate={{ backgroundColor: hovered ? "#000" : "#fff" }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className="h-0.5 bg-white"
          style={{ width: 24 }}
          animate={{ backgroundColor: hovered ? "#000" : "#fff" }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

const stairVariants = {
  closed: { height: 0 },
  open: (i) => ({ height: "100%", transition: { duration: 0.4, delay: 0.04 * (4 - i), ease: [0.65, 0, 0.35, 1] } }),
  exit: (i) => ({ height: 0, transition: { duration: 0.25, delay: 0.03 * i, ease: [0.65, 0, 0.35, 1] } })
};

const linkVariants = {
  closed: { opacity: 0, y: 30 },
  open: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] } }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.15 } }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
          <a href="#hero"><HarunLogo /></a>
        </div>
        <K72Hamburger onClick={() => setOpen(true)} />
      </nav>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div key="nav" className="fixed inset-0 z-50 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Stairs */}
            <div className="fixed inset-0 flex">
              {[...Array(5)].map((_, i) => (
                <motion.div key={i} className="w-1/5 bg-black origin-top" custom={i} initial="closed" animate="open" exit="exit" variants={stairVariants} />
              ))}
            </div>

            {/* Header */}
            <motion.div className="relative z-10 flex justify-between items-center p-4 sm:p-5 lg:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <a href="#hero" onClick={() => setOpen(false)}><HarunLogo variant="light" /></a>
              {/* X Close */}
              <button onClick={() => setOpen(false)} className="h-16 sm:h-20 lg:h-24 w-16 sm:w-20 lg:w-24 relative">
                <motion.div className="absolute top-0 left-1/2 w-1 bg-[#D3FD50] origin-top" initial={{ height: 0, rotate: -45, x: "-50%" }} animate={{ height: "100%", rotate: -45, x: "-50%" }} transition={{ delay: 0.4, duration: 0.25 }} />
                <motion.div className="absolute top-0 right-0 w-1 bg-[#D3FD50] origin-top" initial={{ height: 0, rotate: 45 }} animate={{ height: "100%", rotate: 45 }} transition={{ delay: 0.4, duration: 0.25 }} />
              </button>
            </motion.div>

            {/* Links */}
            <div className="relative z-10 flex flex-col justify-center items-center px-4 mt-4 sm:mt-8">
              {navLinks.map((link, i) => (
                <motion.div key={link.href} className="w-full border-t border-white/10 overflow-hidden" custom={i} initial="closed" animate="open" exit="exit" variants={linkVariants}>
                  <a href={link.href} onClick={() => setOpen(false)} className="group block relative overflow-hidden cursor-pointer">
                    <h1 className="font-black text-[7vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] text-white text-center leading-[1.4] py-2 sm:py-3 uppercase tracking-tight">
                      {link.label}
                    </h1>

                    {/* Marquee with Video/Image */}
                    <div className="absolute inset-0 bg-[#D3FD50] text-black flex items-center overflow-hidden translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                      <div className="flex animate-marquee whitespace-nowrap items-center">
                        {[...Array(6)].map((_, j) => (
                          <div key={j} className="flex items-center">
                            <span className="font-black text-[7vw] sm:text-[6vw] md:text-[5vw] lg:text-[4vw] leading-[1.4] py-2 sm:py-3 uppercase tracking-tight px-3 sm:px-4">
                              {link.hover}
                            </span>
                            <div className="h-10 sm:h-14 lg:h-16 w-28 sm:w-36 lg:w-44 rounded-full overflow-hidden shrink-0 mx-2 border-2 border-black/20">
                              {link.media.type === "video" ? (
                                <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                                  <source src={link.media.src} type="video/mp4" />
                                </video>
                              ) : (
                                <img src={link.media.src} alt="" className="h-full w-full object-cover" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <motion.div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex justify-between items-center border-t border-white/10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span className="text-white/40 text-xs sm:text-sm">INDIA • 2024</span>
              <div className="flex gap-2 sm:gap-3">
                {["GH", "LI", "TW", "IG"].map((s) => (
                  <a key={s} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-[#D3FD50] hover:border-[#D3FD50] hover:text-black transition-all text-xs font-bold">{s}</a>
                ))}
              </div>
            </motion.div>

            <style jsx global>{`
              @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
              .animate-marquee { animation: marquee 12s linear infinite; }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
