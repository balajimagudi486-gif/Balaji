'use client';

import { motion } from 'framer-motion';

interface KeyFallbackProps {
  mouseX?: number;
  mouseY?: number;
}

export default function KeyFallback({ mouseX = 0, mouseY = 0 }: KeyFallbackProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative select-none">
      {/* Radial backlight */}
      <div className="absolute w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Holographic Key SVG */}
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          y: [-8, 8, -8],
          rotateZ: [-2, 2, -2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          transform: `perspective(800px) rotateY(${mouseX * 15}deg) rotateX(${-mouseY * 15}deg)`,
        }}
      >
        <svg
          width="200"
          height="340"
          viewBox="0 0 200 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_0_35px_rgba(59,130,246,0.35)]"
        >
          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="200" y2="340" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#94a3b8" />
              <stop offset="60%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="blueEdge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Key Bow (circular head) */}
          <circle
            cx="100"
            cy="70"
            r="60"
            stroke="url(#metalGrad)"
            strokeWidth="16"
            fill="none"
          />
          <circle
            cx="100"
            cy="70"
            r="60"
            stroke="url(#blueEdge)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            opacity="0.7"
          />

          {/* Key Bow Inner Hole */}
          <circle
            cx="100"
            cy="70"
            r="28"
            stroke="url(#metalGrad)"
            strokeWidth="8"
            fill="#0a0a0a"
          />
          <circle
            cx="100"
            cy="70"
            r="12"
            fill="#3b82f6"
            opacity="0.3"
            filter="url(#glow)"
          />

          {/* Key Shaft */}
          <rect
            x="91"
            y="130"
            width="18"
            height="160"
            rx="4"
            fill="url(#metalGrad)"
            stroke="url(#blueEdge)"
            strokeWidth="1"
          />

          {/* Subtle center groove on shaft */}
          <line
            x1="100"
            y1="140"
            x2="100"
            y2="280"
            stroke="#60a5fa"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Key Teeth */}
          <path
            d="M109 210 H135 V226 H109 Z"
            fill="url(#metalGrad)"
            stroke="url(#blueEdge)"
            strokeWidth="1"
          />
          <path
            d="M109 240 H142 V258 H109 Z"
            fill="url(#metalGrad)"
            stroke="url(#blueEdge)"
            strokeWidth="1"
          />
          <path
            d="M109 270 H130 V286 H109 Z"
            fill="url(#metalGrad)"
            stroke="url(#blueEdge)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
}
