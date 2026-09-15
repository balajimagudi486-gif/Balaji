'use client';

import { useEffect, useRef, useState, useCallback, Component, ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import ScrollKeyScene from './ScrollKeyScene';
import GlobeFallback from './GlobeFallback';
import Lenis from 'lenis';

interface ScrollKeyCanvasProps {
  className?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Canvas rendering encountered an issue, displaying fallback:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function ScrollKeyCanvas({ className = '' }: ScrollKeyCanvasProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setWebglSupported(Boolean(gl));
    } catch {
      setWebglSupported(false);
    }

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Scroll tracking — syncs with Lenis if available
  useEffect(() => {
    const handleScroll = () => {
      const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
      let progress = 0;
      if (lenis) {
        progress = lenis.progress ?? 0;
      } else {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      }
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse tracking on canvas element
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    setMouseX(x);
    setMouseY(y);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(0);
    setMouseY(0);
  }, []);

  const fallbackUI = <GlobeFallback mouseX={mouseX} mouseY={mouseY} />;

  if (webglSupported === false) {
    return (
      <div
        ref={canvasRef}
        className={`relative overflow-hidden ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-cursor="explore"
      >
        <div className="absolute inset-0 radial-glow pointer-events-none z-0" />
        {fallbackUI}
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="explore"
    >
      {/* Radial glow behind globe */}
      <div className="absolute inset-0 radial-glow pointer-events-none z-0" />

      {/* 360 Interactive Hint Badge */}
      <div className="absolute bottom-6 right-6 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-blue-500/25 text-[10px] tracking-wider text-blue-300 font-mono select-none backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>360° VIEW • DRAG TO ROTATE</span>
      </div>

      <CanvasErrorBoundary fallback={fallbackUI}>
        <Canvas
          dpr={[1, typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 1.5) : 1]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'default',
          }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.addEventListener(
              'webglcontextlost',
              (e) => {
                e.preventDefault();
                setWebglSupported(false);
              },
              false
            );
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5.8]} fov={45} />
          <Suspense fallback={null}>
            <ScrollKeyScene
              scrollProgress={prefersReducedMotion ? 0 : scrollProgress}
              mouseX={prefersReducedMotion ? 0 : mouseX}
              mouseY={prefersReducedMotion ? 0 : mouseY}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}

