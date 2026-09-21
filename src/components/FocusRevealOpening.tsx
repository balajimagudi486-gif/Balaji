'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

interface FocusRevealOpeningProps {
  onComplete?: () => void;
}

const letters = ['H', 'E', 'L', 'L', 'O'];

export default function FocusRevealOpening({ onComplete }: FocusRevealOpeningProps) {
  const [activeStep, setActiveStep] = useState<number>(-1); // -1: starting, 0..4: letter focus, 5: all locked
  const [isFinished, setIsFinished] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  // 3D Parallax Mouse Tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { stiffness: 120, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 24); // Degrees of 3D tilt
    mouseY.set(-y * 24);
  };

  useEffect(() => {
    // Sequence of focus sweep
    const t0 = setTimeout(() => setActiveStep(0), 400);   // Focus 'H'
    const t1 = setTimeout(() => setActiveStep(1), 800);   // Focus 'E'
    const t2 = setTimeout(() => setActiveStep(2), 1150);  // Focus 'L'
    const t3 = setTimeout(() => setActiveStep(3), 1500);  // Focus 'L'
    const t4 = setTimeout(() => setActiveStep(4), 1850);  // Focus 'O'
    const t5 = setTimeout(() => setActiveStep(5), 2300);  // All locked & reveal
    const t6 = setTimeout(() => {
      setIsFinished(true);
      onComplete?.();
    }, 3300); // Transition out

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsSkipped(true);
    setIsFinished(true);
    onComplete?.();
  };

  if (isFinished || isSkipped) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080a] select-none overflow-hidden cursor-default"
        initial={{ opacity: 1 }}
        exit={{
          opacity: 0,
          scale: 1.05,
          filter: 'blur(10px)',
          transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Subtle Cyber Grid Background with Radial Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Ambient Floating Dust / Light Specks */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/20"
              style={{
                left: `${(i * 19) % 95}%`,
                top: `${(i * 27) % 90}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 4 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Top Camera HUD Bar */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between pointer-events-none text-[11px] font-mono text-white/30 tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-white/60 font-semibold">REC [4K 60FPS]</span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline">FOCAL LENS: 50mm f/1.2</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-400/70">
              {activeStep >= 5 ? 'AF LOCK: 100%' : 'AUTO-FOCUSING...'}
            </span>
            <button
              onClick={handleSkip}
              className="pointer-events-auto px-3 py-1 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 text-white/60 hover:text-white transition-all text-[10px] tracking-wider"
            >
              SKIP INTRO ✕
            </button>
          </div>
        </div>

        {/* 3D Scene Viewport */}
        <motion.div
          className="relative flex flex-col items-center justify-center p-8"
          style={{
            perspective: 1200,
            rotateX: mouseY,
            rotateY: mouseX,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Viewfinder Bounding Focus Box */}
          <motion.div
            className="absolute pointer-events-none"
            initial={false}
            animate={
              activeStep === -1
                ? {
                    width: 70,
                    height: 100,
                    x: -160,
                    opacity: 0,
                    scale: 0.9,
                  }
                : activeStep >= 0 && activeStep < 5
                ? {
                    width: 75,
                    height: 110,
                    x: -160 + activeStep * 80,
                    opacity: 1,
                    scale: 1,
                  }
                : {
                    // Step 5: Frame expands to encapsulate all letters
                    width: 440,
                    height: 130,
                    x: 0,
                    opacity: 1,
                    scale: 1.02,
                  }
            }
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 24,
              mass: 0.8,
            }}
          >
            {/* Camera Viewfinder Corners */}
            <div className="relative w-full h-full">
              {/* Top-Left Corner */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-blue-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              {/* Top-Right Corner */}
              <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              {/* Bottom-Left Corner */}
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-blue-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              {/* Bottom-Right Corner */}
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-blue-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />

              {/* Viewfinder Center Crosshair Reticle */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                <div className="w-2 h-2 rounded-full border border-blue-400/80" />
              </div>

              {/* Subdued HUD Telemetry on the Frame */}
              <div className="absolute -top-6 left-0 text-[9px] font-mono text-blue-400/70 tracking-widest whitespace-nowrap">
                {activeStep >= 5 ? 'TARGET: ACQUIRED' : `FOCUS: [0${activeStep + 1} // 05]`}
              </div>
            </div>
          </motion.div>

          {/* Letter Row with 3D Depth & Focus Reveal */}
          <div className="flex items-center gap-5 sm:gap-8 relative z-10">
            {letters.map((char, index) => {
              // A letter is in focus if the activeStep is currently on it, or if all are locked (step 5)
              const isCurrentFocus = activeStep === index;
              const hasBeenFocused = activeStep > index || activeStep >= 5;
              const isFocused = isCurrentFocus || hasBeenFocused;

              return (
                <motion.div
                  key={index}
                  className="relative flex items-center justify-center w-14 sm:w-16 h-24 sm:h-28"
                  animate={{
                    filter: isFocused ? 'blur(0px)' : 'blur(12px)',
                    opacity: isFocused ? 1 : 0.18,
                    scale: isCurrentFocus ? 1.08 : isFocused ? 1 : 0.94,
                    y: isCurrentFocus ? -4 : 0,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span
                    className={`font-black text-6xl sm:text-7xl md:text-8xl tracking-tight transition-colors duration-300 ${
                      isFocused
                        ? 'text-white drop-shadow-[0_0_24px_rgba(56,189,248,0.45)]'
                        : 'text-white/20'
                    }`}
                  >
                    {char}
                  </span>

                  {/* Micro Index label under each letter */}
                  <span className="absolute -bottom-5 text-[9px] font-mono text-white/20 tracking-wider">
                    0{index + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Subtitle / Status Reveal */}
          <motion.div
            className="mt-12 flex flex-col items-center gap-2 text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={
              activeStep >= 4
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 15 }
            }
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              M. BALAJI • PORTFOLIO
            </div>
            <p className="text-white/40 text-xs tracking-[0.25em] uppercase font-mono mt-1">
              AI DEVELOPER & DATA SCIENTIST
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Status / Tech HUD Details */}
        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pointer-events-none text-[10px] font-mono text-white/20 tracking-widest">
          <span>SYS.VER // 2026.04</span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-white/40">CALIBRATING EXPERIENCE...</span>
          </div>
          <span className="hidden sm:inline">FOCUS REVEAL ENGINE</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
