'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import { education, valueAddedCourses } from '@/data/portfolio';
import SectionHeading from '@/components/SectionHeading';

export default function Education() {
  return (
    <section id="education" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <SectionHeading
          number="05"
          eyebrow="ACADEMIC BACKGROUND"
          title="EDUCATION"
        />

        {/* Education timeline */}
        <div className="space-y-6 mb-16">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="glass rounded-xl p-6 sm:p-8 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{ borderColor: 'rgba(59,130,246,0.2)' }}
            >
              {/* Index */}
              <div className="absolute top-6 right-6 text-[3rem] font-black text-white/[0.04] select-none">
                0{i + 1}
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1">
                  <GraduationCap size={18} />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="badge">{edu.year}</span>
                    <span className="badge" style={{ color: '#22c55e', borderColor: 'rgba(34,197,94,0.3)' }}>
                      {edu.status}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-white/40 text-sm mb-3">{edu.institution}</p>

                  {/* Score */}
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-400/50" />
                    <span className="text-blue-400/80 text-sm font-semibold">{edu.score}</span>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.4 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Value Added Courses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Award size={16} />
            </div>
            <p className="text-[10px] font-bold tracking-[0.25em] text-white/30 uppercase">
              VALUE ADDED COURSES
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {valueAddedCourses.map((course, i) => (
              <motion.div
                key={course}
                className="glass rounded-full px-5 py-2.5 flex items-center gap-2 group cursor-default"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 250, damping: 20 }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(59,130,246,0.3)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 group-hover:bg-blue-400 transition-colors" />
                <span className="text-xs font-semibold text-white/50 group-hover:text-white/80 transition-colors tracking-wide">
                  {course}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
