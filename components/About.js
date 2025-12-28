import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiExpress, SiTailwindcss, SiMongodb, SiPostgresql, SiTypescript, SiPython } from "react-icons/si";
import { PiGraduationCapDuotone } from "react-icons/pi";
import { FaCloud } from "react-icons/fa";
import Butterflies from "./Butterflies";

export default function About() {
  return (
    <section id="about" className="w-full flex flex-col items-center py-16 min-h-[65vh] relative">
      {/* Butterflies Animation */}
      <Butterflies />

      {/* Main about box */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.7 }}
        className="max-w-3xl w-full mx-auto rounded-xl shadow bg-neutral-900/75 px-8 py-9 border border-neutral-700/40"
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-cyan-400 leading-tight mb-2 tracking-tight">About Me</h2>
        <div className="text-xl font-semibold text-fuchsia-300 mb-2">Senior Full Stack Web Developer</div>
        <p className="text-white/85 text-base sm:text-lg mb-1 font-medium">
          <span className="font-semibold text-cyan-300">3+ years</span> crafting robust web UIs & scalable backends using <span className="font-semibold text-blue-400">React</span>, <span className="font-semibold text-cyan-400">Next.js</span>, <span className="text-emerald-300 font-semibold">Express.js</span>, <span className="text-fuchsia-300 font-semibold">Tailwind CSS</span>, <span className="text-green-300 font-semibold">MongoDB</span>, <span className="text-blue-200 font-semibold">PostgreSQL</span> & <span className="text-yellow-200 font-semibold">Python</span>. Obsessed with modern UI/UX, performance, and real problem solving. Clean, creative, reliable!
        </p>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-9 px-4">
        {/* Degree */}
        <motion.div
          whileHover={{ scale: 1.025, y: -6 }}
          transition={{ type: "spring", stiffness: 120, damping: 13 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/80 border border-neutral-700/40 rounded-xl px-7 py-7 shadow flex flex-col items-center"
        >
          <PiGraduationCapDuotone className="text-4xl text-cyan-300 mb-2" />
          <span className="font-bold text-lg text-cyan-200 mb-1">B.Tech Computer Science</span>
          <div className="text-white/90 text-center mb-3 text-base">SVERI&apos;s College of Engineering, Pandharpur</div>
          <div className="flex flex-wrap gap-2">
            <Pill color="bg-blue-400/90" text="2023 Graduate" />
            <Pill color="bg-fuchsia-400/70" text="78.78% Score" />
            <Pill color="bg-cyan-400/80" text="3+ Years Exp." />
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          whileHover={{ scale: 1.025, y: -6 }}
          transition={{ type: "spring", stiffness: 120, damping: 13 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
          className="bg-neutral-900/80 border border-neutral-700/40 rounded-xl px-8 py-7 shadow flex flex-col items-start"
        >
          <div className="flex flex-wrap gap-3 items-center mb-3">
            <SiReact className="text-2xl text-cyan-400" />
            <SiNextdotjs className="text-2xl text-neutral-200" />
            <SiExpress className="text-2xl text-emerald-300" />
            <SiTailwindcss className="text-2xl text-cyan-300" />
            <SiMongodb className="text-2xl text-green-300" />
            <SiPostgresql className="text-2xl text-blue-200" />
            <SiTypescript className="text-2xl text-blue-500" />
            <SiPython className="text-2xl text-yellow-200" />
            <FaCloud className="text-2xl text-blue-300" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full font-medium text-white/90">
            <Skill icon={<SiReact className="text-cyan-300" />} text="React & Next.js" />
            <Skill icon={<SiExpress className="text-emerald-300" />} text="Express.js API" />
            <Skill icon={<SiTailwindcss className="text-cyan-200" />} text="Tailwind UI/UX" />
            <Skill icon={<SiMongodb className="text-green-300" />} text="MongoDB" />
            <Skill icon={<SiPostgresql className="text-blue-200" />} text="PostgreSQL" />
            <Skill icon={<SiTypescript className="text-blue-400" />} text="TypeScript" />
            <Skill icon={<SiPython className="text-yellow-200" />} text="Python Scripting" />
            <Skill icon={<FaCloud className="text-blue-300" />} text="Cloud Hosting" />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Pill color="bg-blue-400/80" text="Cloud & Deployment" />
            <Pill color="bg-fuchsia-500/60" text="Agile Teamwork" />
            <Pill color="bg-cyan-500/60" text="Best Practices" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pill({ color, text }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-sm ${color}`}>
      {text}
    </span>
  );
}

function Skill({ icon, text }) {
  return (
    <span className="flex items-center gap-2 px-4 py-2 rounded bg-neutral-800/80 border border-neutral-700/20 shadow-sm hover:bg-slate-800/50 hover:text-cyan-100 hover:shadow-cyan-600 transition-all duration-120 cursor-pointer">
      {icon}
      {text}
    </span>
  );
}
