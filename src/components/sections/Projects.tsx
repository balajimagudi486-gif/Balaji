'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/portfolio';
import SectionHeading from '@/components/SectionHeading';

function ProjectPanel({ project, index }: {
  project: typeof projects[0];
  index: number;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 20 });
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetMouse = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Procedural visual — gradient based on project accent
  const visualBg =
    index === 0
      ? 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(16,185,129,0.03) 50%, rgba(10,10,10,0) 100%)'
      : 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(251,191,36,0.03) 50%, rgba(10,10,10,0) 100%)';

  const accentColor = project.accent;

  return (
    <motion.div
      className="project-card relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1200, rotateX, rotateY }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
      data-cursor="view"
    >
      {/* Large project visual area */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        {/* Background visual */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: visualBg,
            x: imageX,
            y: imageY,
            scale: 1.1,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Project number — large background */}
        <div
          className="absolute -right-4 top-1/2 -translate-y-1/2 text-[10rem] sm:text-[14rem] font-black select-none pointer-events-none"
          style={{
            color: 'transparent',
            WebkitTextStroke: `1px ${accentColor}15`,
            lineHeight: 1,
          }}
          aria-hidden
        >
          {project.id}
        </div>

        {/* Accent glow */}
        <div
          className="absolute top-8 left-8 w-32 h-32 rounded-full blur-2xl opacity-20"
          style={{ background: accentColor }}
        />

        {/* Project number label + name overlay */}
        <div className="absolute inset-0 flex items-end p-8">
          <div>
            <p className="text-[10px] font-mono text-white/20 mb-1 tracking-widest">
              PROJECT {project.id}
            </p>
            <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {project.name.toUpperCase()}
            </h3>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="badge"
                style={{ borderColor: `${accentColor}30`, color: `${accentColor}90` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed max-w-lg">
            {project.description}
          </p>

          {/* Headline */}
          <p className="mt-3 text-white/70 text-base font-semibold italic">
            "{project.headline}"
          </p>
        </div>

        {/* CTA Button */}
        <motion.a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-6 py-3 rounded-lg border text-sm font-bold tracking-wide uppercase transition-all duration-300 flex-shrink-0"
          style={{
            borderColor: `${accentColor}40`,
            color: accentColor,
            background: `${accentColor}08`,
          }}
          whileHover={{
            scale: 1.04,
            borderColor: `${accentColor}80`,
            background: `${accentColor}15`,
          }}
          whileTap={{ scale: 0.97 }}
          aria-label={`View ${project.name} project`}
        >
          VIEW PROJECT
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </motion.a>
      </div>

      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
      />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div
        className="absolute bottom-0 right-0 text-[12vw] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter"
        aria-hidden
      >
        WORK
      </div>

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          number="04"
          eyebrow="SELECTED WORK"
          title="PROJECTS"
          subtitle="Intelligent solutions built to solve real-world problems."
        />

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectPanel key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
