'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Brain, Database, Code } from 'lucide-react';
import { skills } from '@/data/portfolio';
import SectionHeading from '@/components/SectionHeading';

const iconMap: Record<string, React.ReactNode> = {
  brain: <Brain size={18} />,
  database: <Database size={18} />,
  code: <Code size={18} />,
};

function SkillCard({ category, icon, items, index }: {
  category: string;
  icon: string;
  items: string[];
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="skill-card h-full"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouse}
        onMouseLeave={resetMouse}
        whileHover={{ scale: 1.02 }}
      >
        {/* Category header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            {iconMap[icon]}
          </div>
          <p className="text-[10px] font-bold tracking-[0.25em] text-white/40 uppercase">
            {category}
          </p>
        </div>

        {/* Skill items */}
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + i * 0.07 + 0.3 }}
            >
              <div className="w-1 h-1 rounded-full bg-blue-400/50 flex-shrink-0" />
              <span className="text-white/70 text-sm font-medium">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Subtle accent bar at bottom */}
        <motion.div
          className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15 + 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Large background text */}
      <div
        className="absolute bottom-8 right-0 text-[12vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter"
        aria-hidden
      >
        SKILLS
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="02"
          eyebrow="CAPABILITIES"
          title="SKILLS"
          subtitle="Technologies and disciplines I work with to build intelligent systems."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {skills.map((skill, i) => (
            <SkillCard
              key={skill.category}
              category={skill.category}
              icon={skill.icon}
              items={skill.items}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
