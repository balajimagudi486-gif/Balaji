'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Convert Lat/Lon to 3D Sphere Coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Geographical land test function
function isLand(lat: number, lon: number): boolean {
  if (lat < -62) return true; // Antarctica

  // North America
  if (lat >= 12 && lat <= 72 && lon >= -168 && lon <= -52) {
    if (lat > 50) return true; // Canada / Alaska
    if (lat >= 25 && lon >= -125 && lon <= -67) return true; // USA
    if (lat >= 12 && lat < 25 && lon >= -105 && lon <= -82) return true; // Mexico/Central America
    if (lat >= 60 && lon >= -55 && lon <= -18) return true; // Greenland
  }

  // South America
  if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) {
    if (lat >= -20 && lon >= -78 && lon <= -35) return true;
    if (lat < -20 && lon >= -74 && lon <= -45) return true;
  }

  // Europe
  if (lat >= 35 && lat <= 71 && lon >= -11 && lon <= 45) {
    if (lat >= 50 && lat <= 60 && lon >= -11 && lon <= 2) return true;
    if (lat >= 55 && lon >= 5 && lon <= 30) return true;
    if (lat >= 36 && lat <= 55 && lon >= -9 && lon <= 35) return true;
  }

  // Africa
  if (lat >= -35 && lat <= 38 && lon >= -18 && lon <= 52) {
    if (lat >= 15 && lon >= -17 && lon <= 40) return true;
    if (lat >= -10 && lat < 15 && lon >= -15 && lon <= 45) return true;
    if (lat < -10 && lon >= 12 && lon <= 38) return true;
    if (lat >= -26 && lat <= -12 && lon >= 43 && lon <= 51) return true;
  }

  // Asia
  if (lat >= 5 && lat <= 75 && lon >= 40 && lon <= 180) {
    if (lat >= 50) return true; // Siberia
    if (lat >= 8 && lat <= 36 && lon >= 68 && lon <= 92) return true; // India / South Asia
    if (lat >= 20 && lat < 50 && lon >= 75 && lon <= 125) return true; // China / East Asia
    if (lat >= 30 && lat <= 46 && lon >= 128 && lon <= 146) return true; // Japan
    if (lat >= 12 && lat <= 42 && lon >= 35 && lon <= 60) return true; // Middle East
    if (lat >= -10 && lat < 20 && lon >= 95 && lon <= 130) return true; // SE Asia
  }

  // Australia & Oceania
  if (lat >= -44 && lat <= -10 && lon >= 112 && lon <= 155) return true;
  if (lat >= -47 && lat <= -34 && lon >= 165 && lon <= 179) return true;

  return false;
}

// Major global technology hubs
const TECH_HUBS = [
  { name: 'India (Bengaluru)', lat: 12.97, lon: 77.59, primary: true },
  { name: 'Silicon Valley', lat: 37.77, lon: -122.42 },
  { name: 'London', lat: 51.51, lon: -0.13 },
  { name: 'Tokyo', lat: 35.68, lon: 139.77 },
  { name: 'Singapore', lat: 1.35, lon: 103.82 },
  { name: 'Frankfurt', lat: 50.11, lon: 8.68 },
  { name: 'New York', lat: 40.71, lon: -74.01 },
  { name: 'Sydney', lat: -33.87, lon: 151.21 },
];

// Connection routes between hubs
const ROUTES: [number, number][] = [
  [0, 1], // India -> Silicon Valley
  [0, 2], // India -> London
  [0, 4], // India -> Singapore
  [0, 3], // India -> Tokyo
  [1, 6], // Silicon Valley -> New York
  [6, 2], // New York -> London
  [2, 5], // London -> Frankfurt
  [1, 3], // Silicon Valley -> Tokyo
  [4, 7], // Singapore -> Sydney
];

const GLOBE_RADIUS = 2.0;

export default function TechnicalGlobe() {
  const globeGroupRef = useRef<THREE.Group>(null);
  const outerRingsRef = useRef<THREE.Group>(null);
  const packetMeshesRef = useRef<THREE.Mesh[]>([]);

  // 1. Continental Dot Matrix & Ocean Grid
  const { landPointsGeo, oceanPointsGeo } = useMemo(() => {
    const landCoords: number[] = [];
    const oceanCoords: number[] = [];

    // Dense grid sampling: lat from -85 to 85, lon from -180 to 180
    const latStep = 2.8;
    const lonStep = 3.6;

    for (let lat = -85; lat <= 85; lat += latStep) {
      // Circumference decreases near poles, adjust lon step to keep dot density uniform
      const cosLat = Math.cos((lat * Math.PI) / 180);
      const adjustedLonStep = Math.max(lonStep / Math.max(cosLat, 0.2), lonStep);

      for (let lon = -180; lon < 180; lon += adjustedLonStep) {
        const v = latLonToVector3(lat, lon, GLOBE_RADIUS + 0.02);
        if (isLand(lat, lon)) {
          landCoords.push(v.x, v.y, v.z);
        } else if (Math.random() < 0.12) {
          // Sparse subtle ocean grid dots
          oceanCoords.push(v.x, v.y, v.z);
        }
      }
    }

    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute('position', new THREE.Float32BufferAttribute(landCoords, 3));

    const oceanGeo = new THREE.BufferGeometry();
    oceanGeo.setAttribute('position', new THREE.Float32BufferAttribute(oceanCoords, 3));

    return { landPointsGeo: landGeo, oceanPointsGeo: oceanGeo };
  }, []);

  // 2. Wireframe Parallels & Meridians (Lat/Long technical lattice)
  const gridLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];

    // Latitude rings
    const lats = [-60, -30, 0, 30, 60];
    lats.forEach((lat) => {
      const pts: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 4) {
        pts.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.005));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    });

    // Longitude rings
    const lons = [0, 45, 90, 135, 180, 225, 270, 315];
    lons.forEach((lon) => {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 3) {
        pts.push(latLonToVector3(lat, lon, GLOBE_RADIUS + 0.005));
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(pts));
    });

    return lines;
  }, []);

  // 3. Arcs connecting tech hubs
  const { arcGeometries, arcCurves } = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];
    const curves: THREE.QuadraticBezierCurve3[] = [];

    ROUTES.forEach(([iA, iB]) => {
      const hubA = TECH_HUBS[iA];
      const hubB = TECH_HUBS[iB];

      const vA = latLonToVector3(hubA.lat, hubA.lon, GLOBE_RADIUS);
      const vB = latLonToVector3(hubB.lat, hubB.lon, GLOBE_RADIUS);

      // Compute elevated mid point for great-circle arch
      const mid = new THREE.Vector3().addVectors(vA, vB).multiplyScalar(0.5);
      const dist = vA.distanceTo(vB);
      // Elevate mid above globe surface proportional to distance
      const elevation = GLOBE_RADIUS + Math.min(dist * 0.35, 1.1) + 0.15;
      mid.normalize().multiplyScalar(elevation);

      const curve = new THREE.QuadraticBezierCurve3(vA, mid, vB);
      curves.push(curve);

      const points = curve.getPoints(45);
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      geometries.push(geo);
    });

    return { arcGeometries: geometries, arcCurves: curves };
  }, []);

  // Pre-instantiated Three.js Line / LineLoop objects to prevent JSX SVG element name clash
  const gridLineObjects = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: '#1d4ed8',
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    return gridLines.map((geo) => new THREE.LineLoop(geo, mat));
  }, [gridLines]);

  const arcLineObjects = useMemo(() => {
    const matPrimary = new THREE.LineBasicMaterial({
      color: '#60a5fa',
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const matSecondary = new THREE.LineBasicMaterial({
      color: '#38bdf8',
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    return arcGeometries.map((geo, idx) => new THREE.Line(geo, idx < 4 ? matPrimary : matSecondary));
  }, [arcGeometries]);

  // Hub 3D positions
  const hubPositions = useMemo(() => {
    return TECH_HUBS.map((hub) => ({
      pos: latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS + 0.03),
      isPrimary: Boolean(hub.primary),
      name: hub.name,
    }));
  }, []);

  // Animation frame loop: packet flow + subtle rotation + orbital rings spin
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Slowly spin outer cyber rings
    if (outerRingsRef.current) {
      outerRingsRef.current.rotation.z = time * 0.08;
      outerRingsRef.current.rotation.x = 0.4 + Math.sin(time * 0.2) * 0.05;
    }

    // Move glowing data packets along the arcs
    packetMeshesRef.current.forEach((mesh, index) => {
      if (!mesh) return;
      const curve = arcCurves[index % arcCurves.length];
      if (!curve) return;
      // Staggered loop
      const speed = 0.35 + (index % 3) * 0.08;
      const progress = ((time * speed + index * 0.22) % 1);
      const pt = curve.getPoint(progress);
      mesh.position.copy(pt);
    });
  });

  return (
    <group ref={globeGroupRef}>
      {/* 1. Base Core Sphere: Deep dark cyber blue */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS - 0.02, 64, 64]} />
        <meshStandardMaterial
          color="#040914"
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* 2. Atmosphere / Glow Outer Layer */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.04, 48, 48]} />
        <meshStandardMaterial
          color="#0284c7"
          transparent
          opacity={0.09}
          roughness={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Atmospheric Halo */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.18, 32, 32]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Continental Landmass Matrix (Glowing Cyan/Electric-Blue Dots) */}
      <points geometry={landPointsGeo}>
        <pointsMaterial
          color="#38bdf8"
          size={0.038}
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. Sparse Ocean Ambient Dots (Deep Blue Matrix) */}
      <points geometry={oceanPointsGeo}>
        <pointsMaterial
          color="#1e3a8a"
          size={0.022}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* 5. Lat/Long Technical Wireframe Lines */}
      {gridLineObjects.map((obj, idx) => (
        <primitive key={`grid-${idx}`} object={obj} />
      ))}

      {/* 6. Glowing Network Connection Arcs between Tech Hubs */}
      {arcLineObjects.map((obj, idx) => (
        <primitive key={`arc-${idx}`} object={obj} />
      ))}

      {/* 7. Animated Traveling Data Packets along Arcs */}
      {arcCurves.map((_, idx) => (
        <mesh
          key={idx}
          ref={(el) => {
            if (el) packetMeshesRef.current[idx] = el;
          }}
        >
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color={idx === 0 ? '#93c5fd' : '#38bdf8'}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}

      {/* 8. Tech Hub Nodes & Beacons */}
      {hubPositions.map((hub, idx) => (
        <group key={idx} position={hub.pos}>
          {/* Core Hub Dot */}
          <mesh>
            <sphereGeometry args={[hub.isPrimary ? 0.075 : 0.05, 16, 16]} />
            <meshBasicMaterial
              color={hub.isPrimary ? '#60a5fa' : '#38bdf8'}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          {/* Pulsing Beacon Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[hub.isPrimary ? 0.08 : 0.06, hub.isPrimary ? 0.12 : 0.08, 24]} />
            <meshBasicMaterial
              color={hub.isPrimary ? '#93c5fd' : '#38bdf8'}
              transparent
              opacity={0.65}
              side={THREE.DoubleSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* 9. Technical Outer Orbital Rings (Gyroscopic Tech Rings) */}
      <group ref={outerRingsRef}>
        {/* Equator Outer Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.45, GLOBE_RADIUS + 0.47, 64]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Tilted Satellite Track */}
        <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <ringGeometry args={[GLOBE_RADIUS + 0.7, GLOBE_RADIUS + 0.72, 64]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Orbiting Tech Satellite / Beacon */}
        <mesh position={[GLOBE_RADIUS + 0.71, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial
            color="#67e8f9"
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}
