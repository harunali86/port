'use client';

import React, { useRef, useId } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lottie from "lottie-react";
import Link from 'next/link';
import Image from 'next/image';

// Import Real Lotties
import socialMain from '@/public/lotties/social-main.json';
import socialSub from '@/public/lotties/social-sub.json';
import strategyMain from '@/public/lotties/strategy-main.json';
import strategySub from '@/public/lotties/strategy-sub.json';
import adsMain from '@/public/lotties/ads-main.json';
import adsSub from '@/public/lotties/ads-sub.json';
import brandingMain from '@/public/lotties/branding-main.json';
import brandingSub from '@/public/lotties/branding-sub.json';

// ServiceCardSVG - Exact from Weblyss
function ServiceCardSVG({ className }) {
  const uid = useId();
  const gradId1 = `card-grad-1-${uid}`;
  const gradId2 = `card-grad-2-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 302.15 413.7"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Bottom/Border - VERY DARK */}
        <linearGradient
          id={gradId1}
          x1="0"
          y1="206.85"
          x2="302.15"
          y2="206.85"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1a1820" />
          <stop offset="0.5" stopColor="#1f1d28" />
          <stop offset="1" stopColor="#1a1820" />
        </linearGradient>

        {/* Top - Purple gradient like Glimpse */}
        <linearGradient
          id={gradId2}
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#5a4878" />
          <stop offset="40%" stopColor="#7a5898" />
          <stop offset="70%" stopColor="#9a68b8" />
          <stop offset="100%" stopColor="#b878d0" />
        </linearGradient>
      </defs>

      <g>
        {/* Border - VERY DARK */}
        <path
          fill={`url(#${gradId1})`}
          d="M269.46,14.17c10.21,0,18.52,8.31,18.52,18.52V381.01c0,10.21-8.31,18.52-18.52,18.52H32.69c-10.21,0-18.52-8.31-18.52-18.52V32.69c0-10.21,8.31-18.52,18.52-18.52h236.77m0-14.17H32.69C14.64,0,0,14.64,0,32.69V381.01C0,399.07,14.64,413.7,32.69,413.7h236.77c18.05,0,32.69-14.64,32.69-32.69V32.69c0-18.05-14.64-32.69-32.69-32.69h0Z"
        />

        {/* Top Fill - Purple */}
        <rect
          fill={`url(#${gradId2})`}
          y="0"
          width="302.15"
          height="206.85"
          rx="32.69"
          ry="32.69"
        />
      </g>
    </svg>
  );
}

// Button3D - Simple version
function Button3D({ children }) {
  return (
    <button className="relative group overflow-hidden px-8 py-3 rounded-full border border-white/20 bg-transparent text-white font-medium transition-all duration-300 hover:bg-white hover:text-black">
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </button>
  );
}

const services = [
  {
    id: 1,
    title: 'Frontend',
    skills: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
    anim: socialMain,
    subAnim: socialSub,
    link: '#skills'
  },
  {
    id: 2,
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
    anim: strategyMain,
    subAnim: strategySub,
    link: '#skills'
  },
  {
    id: 3,
    title: 'DevOps',
    skills: ['Git/GitHub', 'Vercel', 'Docker', 'AWS'],
    anim: adsMain,
    subAnim: adsSub,
    link: '#skills'
  },
  {
    id: 4,
    title: 'AI & Data',
    skills: ['OpenAI/GPT', 'Python', 'Pandas', 'Gemini'],
    anim: brandingMain,
    subAnim: brandingSub,
    link: '#skills'
  }
];

export default function Skills() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative w-full py-6 md:py-10 overflow-hidden bg-black font-['Outfit']">
      {/* Background Elements - Exact Pixel Match from Reference */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/assets/services/bg.svg"
          alt="ripple"
          width={1475}
          height={876}
          className="absolute left-[-80px] top-[20px] w-[550px] h-auto md:w-[1475px] md:h-[876px] md:top-[50px] md:left-0 opacity-100"
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-6 relative z-10">
        {/* Title Section - Exact Match from section-title.css */}
        <div className="mb-4 md:mb-20 pl-[clamp(16px,8vw,155px)]">
          <div className="relative inline-block">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#FCDC00] via-[#FA954E] to-[#F83CB0]"></div>
              <span className="text-[14px] font-bold tracking-widest text-transparent [-webkit-text-stroke:1px_white] font-['Cera_Pro_Bold']">OUR SERVICES</span>
            </div>
            <h2 className="text-[3rem] font-bold text-white leading-none font-['Cera_Pro_Bold']">
              <span className="bg-gradient-to-r from-[#FCDC00] via-[#FA954E] to-[#F83CB0] bg-clip-text text-transparent">Services</span><span className="text-[#F83CB0]">.</span>
            </h2>
          </div>
        </div>

        {/* Cards Container - Grid for Mobile (2 cols), Flex for Desktop */}
        <div className="grid grid-cols-2 justify-items-center md:flex md:flex-wrap md:justify-center gap-3 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -100, filter: "blur(3px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: index * 0.1
              }}
              className="relative w-full aspect-[3/4] md:w-[230px] md:h-[280px] md:aspect-auto group cursor-pointer z-10"
            >
              {/* Clean SVG Background - NO glow */}
              <ServiceCardSVG className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-[1.02]" />

              {/* Inner Content Container */}
              <div className="relative h-full flex flex-col">

                {/* Header Content (Top Half) - CENTERED */}
                <Link href={service.link} className="absolute top-[10%] md:top-[25px] left-0 md:left-[15%] right-0 md:right-auto z-10 flex flex-col items-center md:block md:w-auto w-full">
                  <div className="mb-[4%] md:mb-[5%] w-[30%] md:w-14 md:h-14 aspect-square">
                    <Lottie animationData={service.anim} loop={true} autoplay={true} />
                  </div>
                  <h2 className="text-center md:text-left text-[clamp(12px,3.5vw,14px)] md:text-sm font-medium text-white leading-[1.2] tracking-wide">
                    {service.title}
                  </h2>
                </Link>

                {/* Bottom Content Area - Sub Icon + Skills List */}
                <div className="absolute top-[48%] md:top-[48%] left-0 md:left-[15%] right-0 md:right-[15%] w-full md:w-auto z-10 px-4 md:px-0">
                  <Link href={service.link} className="flex flex-col items-center md:items-start group-hover:translate-y-[-5px] transition-transform duration-300">
                    <div className="mb-[4%] md:mb-[3%] w-[25%] md:w-10 md:h-10 aspect-square opacity-80">
                      <Lottie animationData={service.subAnim} loop={true} autoplay={true} />
                    </div>
                    <div className="flex flex-col items-center md:items-start space-y-1">
                      {service.skills.map((skill, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-gray-300 hover:text-white transition-colors">
                          <div className="w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* All Services Button - Exact Match from index.css */}
        <div className="mt-16 flex justify-end pr-[clamp(16px,8vw,155px)]">
          <Link href="/services">
            <Button3D>
              All Services
            </Button3D>
          </Link>
        </div>
      </div>
    </section>
  );
}
