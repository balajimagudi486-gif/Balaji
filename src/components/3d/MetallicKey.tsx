'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function buildKeyShape(): THREE.Shape {
  const shape = new THREE.Shape();

  // --- Key Bow (circular head) ---
  const bowRadius = 0.9;
  shape.absarc(0, 0, bowRadius, 0, Math.PI * 2, false);

  // Hole in the bow
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.42, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return shape;
}

function buildShaftShape(): THREE.Shape {
  // Rectangular shaft
  const shape = new THREE.Shape();
  const w = 0.18;
  const h = 2.2;
  shape.moveTo(-w, -0.92);
  shape.lineTo(w, -0.92);
  shape.lineTo(w, -0.92 - h);
  shape.lineTo(-w, -0.92 - h);
  shape.closePath();
  return shape;
}

function buildToothShape(offsetY: number, toothW: number, toothH: number): THREE.Shape {
  const shape = new THREE.Shape();
  shape.moveTo(0.18, offsetY);
  shape.lineTo(0.18 + toothW, offsetY);
  shape.lineTo(0.18 + toothW, offsetY - toothH);
  shape.lineTo(0.18, offsetY - toothH);
  shape.closePath();
  return shape;
}

const extrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.18,
  bevelEnabled: true,
  bevelThickness: 0.04,
  bevelSize: 0.04,
  bevelSegments: 6,
  steps: 1,
};

const shaftExtrudeSettings: THREE.ExtrudeGeometryOptions = {
  depth: 0.18,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.02,
  bevelSegments: 4,
  steps: 1,
};

export default function MetallicKey() {
  const groupRef = useRef<THREE.Group>(null);

  const { bowGeo, shaftGeo, tooth1Geo, tooth2Geo, tooth3Geo, innerRingGeo, material, accentMaterial } = useMemo(() => {
    const bowGeo = new THREE.ExtrudeGeometry(buildKeyShape(), extrudeSettings);
    const shaftGeo = new THREE.ExtrudeGeometry(buildShaftShape(), shaftExtrudeSettings);
    const tooth1Geo = new THREE.ExtrudeGeometry(
      buildToothShape(-1.35, 0.35, 0.22),
      shaftExtrudeSettings
    );
    const tooth2Geo = new THREE.ExtrudeGeometry(
      buildToothShape(-1.78, 0.42, 0.22),
      shaftExtrudeSettings
    );
    const tooth3Geo = new THREE.ExtrudeGeometry(
      buildToothShape(-2.25, 0.28, 0.18),
      shaftExtrudeSettings
    );

    // Center geometries
    [bowGeo, shaftGeo, tooth1Geo, tooth2Geo, tooth3Geo].forEach((geo) => {
      geo.center();
    });

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#d4dbe4'),
      metalness: 0.9,
      roughness: 0.22,
    });

    const accentMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3b82f6'),
      metalness: 0.8,
      roughness: 0.3,
      emissive: new THREE.Color('#1d4ed8'),
      emissiveIntensity: 0.4,
    });

    const innerRingGeo = new THREE.TorusGeometry(0.42, 0.035, 16, 48);

    return { bowGeo, shaftGeo, tooth1Geo, tooth2Geo, tooth3Geo, innerRingGeo, material, accentMaterial };
  }, []);

  // Gentle idle float
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.07;
  });

  return (
    <group ref={groupRef}>
      {/* Bow */}
      <mesh geometry={bowGeo} material={material} position={[0, 1.1, 0]} />
      {/* Inner illuminated accent ring */}
      <mesh geometry={innerRingGeo} material={accentMaterial} position={[0, 1.1, 0]} />
      {/* Shaft */}
      <mesh geometry={shaftGeo} material={material} position={[0, -0.45, 0]} />
      {/* Teeth */}
      <mesh geometry={tooth1Geo} material={material} position={[0.38, -0.92, 0]} />
      <mesh geometry={tooth2Geo} material={material} position={[0.42, -1.35, 0]} />
      <mesh geometry={tooth3Geo} material={material} position={[0.30, -1.82, 0]} />
    </group>
  );
}
