'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import { navLinks, personal } from '@/data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const lenis = (window as Window & { __lenis?: { scrollTo: (el: Element, opts: object) => void } }).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="/"
          className="text-white font-black text-lg sm:text-xl tracking-tight hover:text-blue-400 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Balaji M
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-[11px] font-semibold tracking-[0.15em] transition-colors ${
                activeSection === link.href.replace('#', '')
                  ? 'text-white'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Status indicator & LinkedIn */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all text-xs"
            aria-label="LinkedIn Profile"
          >
            <LinkedInIcon size={13} className="text-blue-400" />
            <span className="text-[10px] font-semibold tracking-wider">LINKEDIN</span>
          </a>
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] text-blue-400 font-semibold tracking-[0.15em]">
              AI DEVELOPER
            </span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass-nav border-t border-white/05"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-[12px] font-semibold tracking-[0.15em] text-white/50 hover:text-white transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="pt-2 border-t border-white/10">
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <LinkedInIcon size={14} />
                  LINKEDIN PROFILE
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
