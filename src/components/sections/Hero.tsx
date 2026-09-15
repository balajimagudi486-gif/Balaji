'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import dynamic from 'next/dynamic';
import { personal } from '@/data/portfolio';

const ScrollKeyCanvas = dynamic(
  () => import('@/components/3d/ScrollKeyCanvas'),
  { ssr: false }
);

const floatingWords = [
  { text: 'INTELLIGENCE', x: '8%', y: '18%', opacity: 0.04, scale: 1.4, speed: 0.3 },
  { text: 'DATA', x: '80%', y: '12%', opacity: 0.05, scale: 1.0, speed: 0.5 },
  { text: 'SYSTEMS', x: '70%', y: '75%', opacity: 0.04, scale: 1.1, speed: 0.4 },
  { text: 'AI', x: '5%', y: '72%', opacity: 0.06, scale: 1.8, speed: 0.35 },
  { text: 'NEURAL', x: '55%', y: '88%', opacity: 0.03, scale: 0.9, speed: 0.25 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const lenis = (window as Window & { __lenis?: { scrollTo: (el: Element, opts: object) => void } }).__lenis;
      if (lenis) lenis.scrollTo(el, { offset: -80 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-2xl" />
      </motion.div>

      {/* Floating background typography */}
      {floatingWords.map((word, i) => (
        <motion.div
          key={word.text}
          className="absolute pointer-events-none select-none font-black"
          style={{
            left: word.x,
            top: word.y,
            opacity: word.opacity,
            fontSize: `clamp(2rem, ${word.scale * 4}vw, ${word.scale * 6}rem)`,
            color: 'white',
            letterSpacing: '0.1em',
            whiteSpace: 'nowrap',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: word.opacity }}
          transition={{ duration: 2, delay: i * 0.2 }}
        >
          {word.text}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left — typography */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          {/* Eyebrow */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-[10px] font-bold tracking-[0.35em] text-blue-400/60 uppercase">
              AI DEVELOPER • B.TECH AI & DATA SCIENCE
            </span>
          </motion.div>

          {/* Main name */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="gradient-text">M. BALAJI</span>
          </motion.h1>

          {/* Headline */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/60 leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            Building Intelligent
            <br />
            <span className="text-white/90">Digital Experiences.</span>
          </motion.h2>

          {/* Body */}
          <motion.p
            className="text-white/35 text-sm sm:text-base leading-relaxed max-w-lg mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            AI Developer focused on machine learning, data processing, full-stack
            development and intelligent real-world solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <motion.button
              onClick={() => handleScrollTo('#projects')}
              className="btn-primary btn-primary-solid group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              data-cursor="view"
            >
              View Projects
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.a
              href={personal.resumePath}
              download="M-Balaji-Resume.pdf"
              className="btn-primary btn-primary-outline group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} />
              Download Resume
            </motion.a>
            <motion.a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-primary-outline group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              aria-label="LinkedIn Profile"
            >
              <LinkedInIcon size={14} />
              LinkedIn
            </motion.a>
          </motion.div>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="status-pill w-fit">
              <span className="status-dot" />
              {personal.status}
            </div>
          </motion.div>
        </div>

        {/* Right — 3D Canvas */}
        <motion.div
          className="order-1 lg:order-2 relative h-[50vh] sm:h-[60vh] lg:h-[90vh]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScrollKeyCanvas className="w-full h-full" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
