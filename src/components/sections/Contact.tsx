'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Download, ArrowRight } from 'lucide-react';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import { personal } from '@/data/portfolio';

export default function Contact() {
  return (
    <section id="contact" className="relative py-40 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-indigo-600/4 blur-2xl" />
      </div>

      {/* Large background typography */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span className="text-[18vw] font-black text-white/[0.015] tracking-tighter">
          CONNECT
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Eyebrow */}
        <motion.p
          className="text-[10px] font-bold tracking-[0.3em] text-blue-400/60 uppercase mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          06 • GET IN TOUCH
        </motion.p>

        {/* Main heading */}
        <motion.h2
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="gradient-text">LET&apos;S BUILD</span>
          <br />
          <span className="text-white/20">SOMETHING</span>
          <br />
          <span className="gradient-text-blue">INTELLIGENT.</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-white/30 text-base sm:text-lg mb-14 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Have an idea, opportunity or project? Let&apos;s connect.
        </motion.p>

        {/* Contact links */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          {/* Email */}
          <motion.a
            href={`mailto:${personal.email}`}
            className="group flex items-center gap-3 glass px-6 py-4 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.03, borderColor: 'rgba(59,130,246,0.3)' }}
            whileTap={{ scale: 0.97 }}
            aria-label="Send email to M. Balaji"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Mail size={16} />
            </div>
            <div className="text-left">
              <p className="text-[9px] tracking-[0.2em] text-white/25 uppercase mb-0.5">Email</p>
              <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                {personal.email}
              </p>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 glass px-6 py-4 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.03, borderColor: 'rgba(59,130,246,0.3)' }}
            whileTap={{ scale: 0.97 }}
            aria-label="Connect with M. Balaji on LinkedIn"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <LinkedInIcon size={16} />
            </div>
            <div className="text-left">
              <p className="text-[9px] tracking-[0.2em] text-white/25 uppercase mb-0.5">LinkedIn</p>
              <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                Connect on LinkedIn
              </p>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href={`tel:${personal.phone.replace(/\s/g, '')}`}
            className="group flex items-center gap-3 glass px-6 py-4 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.03, borderColor: 'rgba(59,130,246,0.3)' }}
            whileTap={{ scale: 0.97 }}
            aria-label="Call M. Balaji"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Phone size={16} />
            </div>
            <div className="text-left">
              <p className="text-[9px] tracking-[0.2em] text-white/25 uppercase mb-0.5">Phone</p>
              <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                {personal.phone}
              </p>
            </div>
          </motion.a>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <motion.a
            href={`mailto:${personal.email}`}
            className="btn-primary btn-primary-solid group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Email M. Balaji"
          >
            EMAIL ME
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-primary-outline group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Connect on LinkedIn"
          >
            <LinkedInIcon size={14} />
            LINKEDIN
          </motion.a>

          <motion.a
            href={personal.resumePath}
            download="M-Balaji-Resume.pdf"
            className="btn-primary btn-primary-outline group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Download M. Balaji resume"
          >
            <Download size={14} />
            DOWNLOAD RESUME
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
