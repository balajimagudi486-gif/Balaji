'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [isLarge, setIsLarge] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 400, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 28, mass: 0.5 });

  useEffect(() => {
    // Detect touch/mobile
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      // Detect cursor context
      const target = e.target as HTMLElement;
      const closest = target.closest('[data-cursor]') as HTMLElement | null;
      const cursorType = closest?.dataset.cursor ?? '';

      if (cursorType === 'explore') {
        setLabel('EXPLORE');
        setIsLarge(true);
      } else if (cursorType === 'view') {
        setLabel('VIEW');
        setIsLarge(true);
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      ) {
        setLabel('');
        setIsLarge(true);
      } else {
        setLabel('');
        setIsLarge(false);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('resize', checkMobile);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  const size = isLarge ? (label ? 64 : 40) : 10;

  return (
    <>
      {/* Main cursor dot/ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          borderRadius: '50%',
          border: isLarge ? '1px solid rgba(59,130,246,0.6)' : 'none',
          background: isLarge
            ? 'rgba(59,130,246,0.08)'
            : 'rgba(255,255,255,0.85)',
          backdropFilter: isLarge ? 'blur(4px)' : 'none',
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease, border 0.2s ease',
        }}
      >
        {label && (
          <span className="text-[9px] font-bold tracking-[0.15em] text-blue-400">
            {label}
          </span>
        )}
      </motion.div>

      {/* Small center dot when ring is large */}
      {isLarge && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999]"
          style={{
            x: springX,
            y: springY,
            width: 4,
            height: 4,
            marginLeft: -2,
            marginTop: -2,
            borderRadius: '50%',
            background: '#3b82f6',
            opacity: visible ? 0.8 : 0,
          }}
        />
      )}
    </>
  );
}
