'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { experience } from '@/data/portfolio';
import SectionHeading from '@/components/SectionHeading';

function ExperienceItem({ item, index }: {
  item: typeof experience[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="relative flex gap-8 pb-16 last:pb-0">
      {/* Timeline column */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-12">
        {/* Dot */}
        <motion.div
          className="relative z-10 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0a0a0a] mt-1 flex-shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30" />
        </motion.div>

        {/* Connecting line */}
        <motion.div
          className="absolute top-4 bottom-0 left-1/2 -translate-x-1/2 w-px"
          style={{
            background: 'linear-gradient(180deg, rgba(59,130,246,0.4) 0%, transparent 100%)',
          }}
          initial={{ scaleY: 0, originY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1, delay: index * 0.2 + 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 pb-2"
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.2 + 0.15 }}
      >
        {/* ID + type */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-white/20">{item.id}</span>
          <span className="badge">{item.type}</span>
        </div>

        {/* Company */}
        <h3 className="text-xl sm:text-2xl font-black text-white mb-1">
          {item.company}
        </h3>

        {/* Role */}
        <p className="text-sm text-blue-400/80 font-semibold tracking-wide mb-4">
          {item.role}
        </p>

        {/* Description */}
        <p className="text-white/35 text-sm leading-relaxed mb-5">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        className="absolute top-8 left-0 text-[12vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter"
        aria-hidden
      >
        EXP
      </div>

      <div className="max-w-4xl mx-auto">
        <SectionHeading
          number="03"
          eyebrow="INTERNSHIPS"
          title="EXPERIENCE"
          subtitle="Real-world exposure through hands-on and virtual internships."
        />

        <div className="relative">
          {experience.map((item, i) => (
            <ExperienceItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
