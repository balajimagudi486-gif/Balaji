'use client';

import { motion } from 'framer-motion';

interface GlobeFallbackProps {
  mouseX?: number;
  mouseY?: number;
}

export default function GlobeFallback({ mouseX = 0, mouseY = 0 }: GlobeFallbackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      {/* Radial backlight */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute w-48 h-48 rounded-full bg-cyan-400/10 blur-2xl pointer-events-none" />

      {/* Holographic Technical Globe SVG */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          rotateZ: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          transform: `perspective(900px) rotateY(${mouseX * 20}deg) rotateX(${-mouseY * 20}deg)`,
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]"
        >
          <defs>
            <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="#030712" stopOpacity="0.9" />
              <stop offset="90%" stopColor="#082f49" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
            </radialGradient>
            <linearGradient id="cyanArc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <filter id="globeGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Globe base sphere */}
          <circle cx="160" cy="160" r="110" fill="url(#globeGrad)" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.5" />

          {/* Latitude rings */}
          <ellipse cx="160" cy="160" rx="110" ry="28" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.35" fill="none" />
          <ellipse cx="160" cy="115" rx="98" ry="24" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 4" fill="none" />
          <ellipse cx="160" cy="205" rx="98" ry="24" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 4" fill="none" />
          <ellipse cx="160" cy="80" rx="74" ry="18" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.2" fill="none" />
          <ellipse cx="160" cy="240" rx="74" ry="18" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.2" fill="none" />

          {/* Longitude meridians */}
          <ellipse cx="160" cy="160" rx="36" ry="110" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.35" fill="none" />
          <ellipse cx="160" cy="160" rx="74" ry="110" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" fill="none" />
          <line x1="160" y1="50" x2="160" y2="270" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Outer Gyro Ring */}
          <circle cx="160" cy="160" r="135" stroke="url(#cyanArc)" strokeWidth="1" strokeDasharray="6 8" strokeOpacity="0.4" fill="none" />
          <circle cx="160" cy="160" r="148" stroke="#38bdf8" strokeWidth="0.75" strokeDasharray="2 12" strokeOpacity="0.3" fill="none" />

          {/* Tech Hub Beacons */}
          {/* India */}
          <circle cx="195" cy="148" r="4.5" fill="#60a5fa" filter="url(#globeGlow)" />
          <circle cx="195" cy="148" r="9" stroke="#93c5fd" strokeWidth="1" strokeOpacity="0.7" fill="none" />

          {/* Silicon Valley */}
          <circle cx="105" cy="125" r="3.5" fill="#38bdf8" filter="url(#globeGlow)" />
          {/* London */}
          <circle cx="152" cy="115" r="3.5" fill="#38bdf8" filter="url(#globeGlow)" />
          {/* Tokyo */}
          <circle cx="230" cy="132" r="3.5" fill="#38bdf8" filter="url(#globeGlow)" />

          {/* Arcs */}
          <path d="M 105 125 Q 150 95 195 148" stroke="url(#cyanArc)" strokeWidth="1.5" strokeDasharray="3 3" fill="none" opacity="0.8" />
          <path d="M 152 115 Q 175 125 195 148" stroke="url(#cyanArc)" strokeWidth="1.5" fill="none" opacity="0.85" />
          <path d="M 195 148 Q 215 138 230 132" stroke="url(#cyanArc)" strokeWidth="1.5" fill="none" opacity="0.85" />
        </svg>
      </motion.div>
    </div>
  );
}
