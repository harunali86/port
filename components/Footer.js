import { m } from "framer-motion";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020202] pt-12 pb-6 relative overflow-hidden font-['Outfit'] border-t border-[#111]">

      {/* Background Glow - Reduced */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff41] to-transparent opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* COMPACT GRID: 4 + 2 + 3 + 3 = 12 Cols exactly */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">

          {/* Brand Column (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" aria-label="Harun Home">
              <h2 className="text-2xl font-black text-white tracking-tighter cursor-pointer">
                HARUN<span className="text-[#00ff41]">.DEV</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Engineering scalable digital solutions with a focus on performance. Building the future, one line of code at a time.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { icon: FaGithub, href: "https://github.com/harunali86", label: "GitHub" },
                { icon: FaLinkedin, href: "https://linkedin.com/in/harunshaikh", label: "LinkedIn" },
                { icon: FaTwitter, href: "https://twitter.com/harunshaikh", label: "Twitter" }
              ].map((social, i) => (
                <m.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${social.label}`}
                  className="w-8 h-8 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-gray-400 hover:bg-[#00ff41] hover:text-black hover:border-[#00ff41] transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </m.a>
              ))}
            </div>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Explore</h4>
            <ul className="space-y-2 text-sm">
              {['About', 'Skills', 'Projects', 'Services', 'Blog'].map((item) => (
                <li key={item}>
                  <Link href={item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`} className="text-gray-500 hover:text-[#00ff41] transition-colors flex items-center group w-fit">
                    <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services (3 Cols) - WITH SUBPAGE LINKS */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Expertise</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Full Stack Development', href: '/services/web-development' },
                { label: 'Mobile Apps', href: '/services/mobile-apps' },
                { label: 'AI & Agents', href: '/services/ai-agents' },
                { label: 'UI/UX Design', href: '/services/ui-ux-design' },
                { label: 'SEO / GEO', href: '/services/seo-optimization' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-500 hover:text-white transition-colors cursor-pointer block w-fit">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
                <FaEnvelope className="text-[#00ff41] w-3.5 h-3.5" />
                <a href="mailto:harunshaikh270599@gmail.com" className="truncate">harunshaikh...</a>
              </li>
              <li className="flex items-center gap-2 group hover:text-white transition-colors">
                <FaMapMarkerAlt className="text-[#00ff41] w-3.5 h-3.5" />
                <span>Pune, India (Remote Available)</span>
              </li>
            </ul>

            {/* Stauts Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00ff41]/10 border border-[#00ff41]/20 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41] animate-pulse" />
              <span className="text-[10px] font-mono text-[#00ff41] font-bold">AVAILABLE</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar - Ultra Compact */}
        <div className="border-t border-[#111] pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono order-2 md:order-1">
            © {currentYear} Harun Shaikh.
          </p>

          <div className="flex items-center gap-4 order-1 md:order-2">
            <Link href="/admin" className="text-gray-700 hover:text-[#00ff41] text-xs transition-colors flex items-center gap-1 group" aria-label="Admin Access">
              <MdAdminPanelSettings className="group-hover:animate-spin" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
