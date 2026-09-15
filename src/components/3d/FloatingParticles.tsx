'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return { positions, count };
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#3b82f6',
        size: 0.025,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.06;
    pointsRef.current.rotation.y = t;
    pointsRef.current.rotation.x = t * 0.3;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
