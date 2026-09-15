'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import TechnicalGlobe from './TechnicalGlobe';
import FloatingParticles from './FloatingParticles';

interface ScrollKeySceneProps {
  scrollProgress: number; // 0..1
  mouseX: number; // -1..1 normalized
  mouseY: number; // -1..1 normalized
}

export default function ScrollKeyScene({
  scrollProgress,
  mouseX,
  mouseY,
}: ScrollKeySceneProps) {
  const globeWrapperRef = useRef<THREE.Group>(null);
  const dampedRef = useRef({ rotX: 0, rotY: 0, posY: 0 });

  useFrame(() => {
    if (!globeWrapperRef.current) return;
    const d = dampedRef.current;
    const lerp = 0.04;

    // Subtle scroll tilt and mouse reactivity layered beneath 360 OrbitControls
    const targetRotX = (scrollProgress * 0.4) + (-mouseY * 0.15);
    const targetPosY = -scrollProgress * 0.35;

    d.rotX += (targetRotX - d.rotX) * lerp;
    d.posY += (targetPosY - d.posY) * lerp;

    globeWrapperRef.current.position.y = d.posY;
  });

  return (
    <>
      {/* 360 Degree Interactive Orbit Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.9}
        rotateSpeed={0.7}
        enableDamping={true}
        dampingFactor={0.06}
      />

      {/* Cyber/Tech Balanced Lighting */}
      <ambientLight intensity={0.8} color="#dbeafe" />

      {/* Primary Key light */}
      <directionalLight position={[6, 8, 8]} intensity={2.8} color="#ffffff" />

      {/* Electric cyan rim light */}
      <directionalLight position={[-8, 4, -4]} intensity={3.5} color="#38bdf8" />

      {/* Deep indigo bottom-up glow */}
      <pointLight position={[0, -5, 4]} intensity={1.5} color="#6366f1" />

      {/* Cool white backlight */}
      <directionalLight position={[0, 6, -8]} intensity={2.2} color="#93c5fd" />

      {/* Blue frontal accent */}
      <pointLight position={[0, 0, 6]} intensity={1.0} color="#60a5fa" />

      {/* Technical World Globe */}
      <group ref={globeWrapperRef}>
        <TechnicalGlobe />
      </group>

      {/* Ambient Data Particles floating in space */}
      <FloatingParticles />
    </>
  );
}
