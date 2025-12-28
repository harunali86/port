import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    { icon: Mail, href: "mailto:harunshaikh270599@gmail.com", label: "Email", color: "#00ff41" },
    { icon: Github, href: "https://github.com/harunshaikh", label: "GitHub", color: "#fff" },
    { icon: Linkedin, href: "https://linkedin.com/in/harunshaikh", label: "LinkedIn", color: "#0077b5" },
    { icon: Twitter, href: "https://twitter.com/harunshaikh", label: "Twitter", color: "#1da1f2" },
    { icon: Instagram, href: "https://instagram.com/harunshaikh", label: "Instagram", color: "#e4405f" },
  ];

  return (
    <footer className="w-full py-10 px-6 bg-[#030303] border-t border-[#111]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <span className="text-2xl font-black">
              <span className="text-[#00ff41]">H</span>
              <span className="text-white">ARUN</span>
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-[#1a1a1a] flex items-center justify-center text-gray-500 transition-all"
                whileHover={{
                  scale: 1.1,
                  borderColor: link.color,
                  color: link.color,
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <span className="text-gray-600 text-sm">
              © {new Date().getFullYear()}{" "}
              <span className="text-white font-medium">Harun Shaikh</span>
              . All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
