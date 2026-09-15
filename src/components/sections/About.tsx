'use client';

import { motion } from 'framer-motion';
import { personal } from '@/data/portfolio';

const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Science',
  'Full Stack Development',
  'Intelligent Applications',
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — large number */}
          <div className="relative">
            <motion.div
              className="section-number"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              01
            </motion.div>

            <motion.div
              className="absolute top-16 left-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[10px] font-bold tracking-[0.3em] text-blue-400/60 uppercase mb-3">
                ABOUT ME
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Curious mind.
                <br />
                <span className="text-white/30">Intelligent systems.</span>
                <br />
                Real-world impact.
              </h2>
            </motion.div>

            {/* Decorative blue accent bar */}
            <motion.div
              className="absolute bottom-0 left-0 w-16 h-0.5 bg-blue-500/40"
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>

          {/* Right — content */}
          <div className="pt-4 lg:pt-20">
            <motion.p
              className="text-white/50 text-base sm:text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {personal.bio}
            </motion.p>

            <motion.p
              className="text-white/30 text-sm leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Currently pursuing {personal.degree} at {personal.college} ({personal.year}), with a CGPA of {personal.cgpa}.
            </motion.p>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <p className="text-[10px] font-bold tracking-[0.25em] text-white/25 uppercase mb-4">
                AREAS OF INTEREST
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    className="badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.07 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/05">
              {[
                { value: 'III', label: 'Year B.Tech' },
                { value: '7.9', label: 'CGPA' },
                { value: '3+', label: 'Internships' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</p>
                  <p className="text-[10px] tracking-[0.2em] text-white/25 uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
