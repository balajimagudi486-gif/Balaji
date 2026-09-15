'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass} mb-16`}>
      {eyebrow && (
        <motion.p
          className="text-[10px] font-bold tracking-[0.3em] text-blue-400/70 uppercase mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {number && <span className="text-white/20 mr-3">{number}</span>}
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        className="text-3xl md:text-5xl font-black tracking-tight gradient-text leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="mt-4 text-white/40 text-sm max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
