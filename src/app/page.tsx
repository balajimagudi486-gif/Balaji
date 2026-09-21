'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import FocusRevealOpening from '@/components/FocusRevealOpening';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Mail } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import { personal } from '@/data/portfolio';

export default function Home() {
  const [showOpening, setShowOpening] = useState(true);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    // Expose lenis for Three.js scroll sync
    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return (
    <main className="relative bg-[#0a0a0a] cursor-none">
      {showOpening && (
        <FocusRevealOpening onComplete={() => setShowOpening(false)} />
      )}
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <footer className="py-8 border-t border-white/5 text-center">
        <p className="text-[10px] tracking-[0.2em] text-white/20 uppercase mb-1">M. BALAJI</p>
        <p className="text-[10px] tracking-[0.15em] text-white/10 uppercase mb-3">
          AI DEVELOPER • ARTIFICIAL INTELLIGENCE & DATA SCIENCE
        </p>
        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-blue-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon size={13} />
            <span>LinkedIn</span>
          </a>
          <span className="text-white/10">•</span>
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-blue-400 transition-colors"
            aria-label="Email M. Balaji"
          >
            <Mail size={13} />
            <span>Email</span>
          </a>
        </div>
        <p className="text-[10px] text-white/15">© 2026 M. Balaji. Built with curiosity and code.</p>
      </footer>
    </main>
  );
}
