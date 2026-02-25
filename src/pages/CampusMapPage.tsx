import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, MapPin, X, Play, Pause, RotateCcw, ChevronRight, Building2, Stethoscope, AlertTriangle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';

/* ───────── Data ───────── */
const buildings = [
  { id: 1, name: 'Rehabilitation, Cosmetics & Wellness Institute', shortName: 'Rehab & Wellness', x: -38, z: 18, w: 18, d: 14, floors: 3, wing: 'west', shape: 'L' as const },
  { id: 2, name: 'UHC Phase 1 – 220 Beds, 36 Outpatient Clinics', shortName: 'UHC Phase 1', x: -30, z: 4, w: 22, d: 16, floors: 5, wing: 'west', shape: 'U' as const },
  { id: 3, name: 'University Hospital Center – 332 Beds', shortName: 'University Hospital', x: -36, z: -14, w: 26, d: 20, floors: 7, wing: 'west', shape: 'U' as const },
  { id: 4, name: 'Emergency & Trauma Center', shortName: 'Emergency Center', x: -10, z: -16, w: 16, d: 12, floors: 4, wing: 'center', shape: 'rect' as const },
  { id: 5, name: 'Central Command Administration', shortName: 'Administration', x: -4, z: -28, w: 12, d: 10, floors: 3, wing: 'center', shape: 'rect' as const },
  { id: 6, name: 'CapitalMed Hotel', shortName: 'Medical Hotel', x: -42, z: 30, w: 14, d: 12, floors: 6, wing: 'west', shape: 'rect' as const },
  { id: 7, name: 'Central Utility Building', shortName: 'Utilities', x: -6, z: -4, w: 10, d: 8, floors: 2, wing: 'center', shape: 'rect' as const },
  { id: 8, name: 'La Plaza Commercial Mall', shortName: 'La Plaza Mall', x: -30, z: -28, w: 18, d: 12, floors: 2, wing: 'west', shape: 'L' as const },
  { id: 9, name: 'Neurosciences Institute', shortName: 'Neurosciences', x: 14, z: -28, w: 16, d: 12, floors: 4, wing: 'east', shape: 'rect' as const },
  { id: 10, name: 'Urinary Diseases & Urosurgery', shortName: 'Urology', x: 14, z: -14, w: 16, d: 12, floors: 4, wing: 'east', shape: 'L' as const },
  { id: 11, name: 'Cardiopulmonary Institute', shortName: 'Cardiopulmonary', x: 14, z: -2, w: 16, d: 12, floors: 5, wing: 'east', shape: 'rect' as const },
  { id: 12, name: 'Hepatobiliary & Gastroenterology', shortName: 'Gastroenterology', x: 34, z: -28, w: 16, d: 12, floors: 4, wing: 'east', shape: 'rect' as const },
  { id: 13, name: 'Advanced Medical Research', shortName: 'Research Lab', x: 34, z: -14, w: 16, d: 12, floors: 4, wing: 'east', shape: 'L' as const },
  { id: 14, name: 'Oncology Institute', shortName: 'Oncology', x: 34, z: -2, w: 16, d: 12, floors: 5, wing: 'east', shape: 'U' as const },
  { id: 15, name: 'Children & Women Institute', shortName: "Children & Women", x: 54, z: -26, w: 16, d: 16, floors: 5, wing: 'east', shape: 'U' as const },
  { id: 16, name: 'Assisted Living Facilities', shortName: 'Assisted Living', x: 54, z: -10, w: 16, d: 12, floors: 3, wing: 'east', shape: 'rect' as const },
  { id: 17, name: 'Behavioral & Mental Health', shortName: 'Mental Health', x: 54, z: 4, w: 16, d: 12, floors: 3, wing: 'east', shape: 'rect' as const },
  { id: 18, name: 'Geriatric Health Care', shortName: 'Geriatrics', x: 34, z: 10, w: 16, d: 10, floors: 3, wing: 'east', shape: 'rect' as const },
  { id: 19, name: 'Dental Institute', shortName: 'Dental', x: 14, z: 10, w: 12, d: 10, floors: 2, wing: 'east', shape: 'rect' as const },
];

type BuildingData = typeof buildings[number];

const mainRoad = [
  { x: 0, z: 42 },
  { x: 0, z: 35 },
  { x: 0, z: 28 },
  { x: 0, z: 20 },
  { x: 0, z: 12 },
  { x: 0, z: 4 },
  { x: 0, z: -4 },
  { x: 0, z: -12 },
  { x: 0, z: -20 },
  { x: 0, z: -28 },
  { x: 0, z: -36 },
];

function getPathToBuilding(b: BuildingData) {
  const tx = b.x + b.w / 2;
  const tz = b.z + b.d / 2;
  let ci = 0, cd = Infinity;
  mainRoad.forEach((p, i) => { const d = Math.abs(p.z - tz); if (d < cd) { cd = d; ci = i; } });
  const path: { x: number; z: number }[] = [];
  for (let i = 0; i <= ci; i++) path.push(mainRoad[i]);
  path.push({ x: tx, z: mainRoad[ci].z });
  path.push({ x: tx, z: tz });
  return path;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

const categories = [
  { icon: Building2, label: 'Directory', filter: 'all' },
  { icon: Stethoscope, label: 'Medical', filter: 'medical' },
  { icon: AlertTriangle, label: 'Emergency', filter: 'emergency' },
];

/* ───────── 3D Building Component ───────── */
const FLOOR_H = 1.6;
const concreteMat = new THREE.MeshStandardMaterial({ color: '#c8c0b8', roughness: 0.85, metalness: 0.05 });
const stoneMat = new THREE.MeshStandardMaterial({ color: '#d4cdc4', roughness: 0.9, metalness: 0.02 });
const glassMat = new THREE.MeshPhysicalMaterial({ color: '#88aabb', roughness: 0.05, metalness: 0.3, transmission: 0.4, transparent: true, opacity: 0.7 });
const darkMat = new THREE.MeshStandardMaterial({ color: '#6b7280', roughness: 0.7, metalness: 0.1 });
const canopyMat = new THREE.MeshStandardMaterial({ color: '#e8e4de', roughness: 0.6, metalness: 0.15 });
const roofEquipMat = new THREE.MeshStandardMaterial({ color: '#8a8a8a', roughness: 0.5, metalness: 0.4 });

interface Building3DProps {
  data: BuildingData;
  isSelected: boolean;
  isTarget: boolean;
  arrived: boolean;
  onClick: () => void;
}

const Building3D: React.FC<Building3DProps> = React.memo(({ data, isSelected, isTarget, arrived, onClick }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const h = data.floors * FLOOR_H;
  const { w, d } = data;

  useFrame((_, delta) => {
    if (pulseRef.current && arrived && isTarget) {
      pulseRef.current.scale.x += delta * 3;
      pulseRef.current.scale.z += delta * 3;
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity -= delta * 0.5;
      if (mat.opacity <= 0) {
        pulseRef.current.scale.set(1, 1, 1);
        mat.opacity = 0.4;
      }
    }
  });

  // Build multi-volume composition
  const volumes = useMemo(() => {
    const vols: { px: number; pz: number; vw: number; vd: number; vh: number; mat: 'concrete' | 'stone' | 'glass' }[] = [];

    if (data.shape === 'U') {
      // Main back bar
      vols.push({ px: 0, pz: -d * 0.35, vw: w, vd: d * 0.3, vh: h, mat: 'concrete' });
      // Left wing
      vols.push({ px: -w * 0.35, pz: d * 0.1, vw: w * 0.3, vd: d * 0.7, vh: h * 0.85, mat: 'stone' });
      // Right wing
      vols.push({ px: w * 0.35, pz: d * 0.1, vw: w * 0.3, vd: d * 0.7, vh: h * 0.85, mat: 'stone' });
      // Glass connector
      vols.push({ px: 0, pz: d * 0.35, vw: w * 0.4, vd: d * 0.15, vh: h * 0.5, mat: 'glass' });
    } else if (data.shape === 'L') {
      // Main bar
      vols.push({ px: -w * 0.15, pz: 0, vw: w * 0.7, vd: d, vh: h, mat: 'concrete' });
      // Extension
      vols.push({ px: w * 0.3, pz: -d * 0.25, vw: w * 0.4, vd: d * 0.5, vh: h * 0.75, mat: 'stone' });
      // Glass link
      vols.push({ px: w * 0.1, pz: -d * 0.15, vw: w * 0.15, vd: d * 0.3, vh: h * 0.55, mat: 'glass' });
    } else {
      // Main volume with setback
      vols.push({ px: 0, pz: 0, vw: w * 0.85, vd: d * 0.85, vh: h, mat: 'concrete' });
      // Recessed facade section
      vols.push({ px: w * 0.1, pz: d * 0.3, vw: w * 0.5, vd: d * 0.2, vh: h * 0.7, mat: 'glass' });
      // Side accent
      vols.push({ px: -w * 0.35, pz: 0, vw: w * 0.15, vd: d * 0.6, vh: h * 0.6, mat: 'stone' });
    }

    return vols;
  }, [data.shape, w, d, h]);

  const getMat = (type: string) => {
    if (type === 'glass') return glassMat;
    if (type === 'stone') return stoneMat;
    return concreteMat;
  };

  return (
    <group ref={groupRef} position={[data.x + w / 2, 0, data.z + d / 2]} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Building volumes */}
      {volumes.map((v, i) => (
        <group key={i} position={[v.px, v.vh / 2, v.pz]}>
          <mesh castShadow receiveShadow material={getMat(v.mat)}>
            <boxGeometry args={[v.vw, v.vh, v.vd]} />
          </mesh>

          {/* Window grid overlay (front face) */}
          {v.mat !== 'glass' && (
            <>
              {/* Front windows */}
              <mesh position={[0, 0, v.vd / 2 + 0.02]}>
                <planeGeometry args={[v.vw * 0.9, v.vh * 0.85]} />
                <meshStandardMaterial color="#6899aa" roughness={0.1} metalness={0.4} transparent opacity={0.3} />
              </mesh>
              {/* Window mullions - horizontal */}
              {Array.from({ length: Math.floor(v.vh / FLOOR_H) }).map((_, fi) => (
                <mesh key={`wh${fi}`} position={[0, -v.vh / 2 + (fi + 1) * FLOOR_H, v.vd / 2 + 0.03]}>
                  <planeGeometry args={[v.vw * 0.92, 0.08]} />
                  <meshStandardMaterial color="#9a9590" roughness={0.7} />
                </mesh>
              ))}
              {/* Window mullions - vertical */}
              {Array.from({ length: Math.max(2, Math.floor(v.vw / 3)) }).map((_, vi) => {
                const spacing = v.vw * 0.9 / (Math.max(2, Math.floor(v.vw / 3)) + 1);
                return (
                  <mesh key={`wv${vi}`} position={[-v.vw * 0.45 + spacing * (vi + 1), 0, v.vd / 2 + 0.03]}>
                    <planeGeometry args={[0.06, v.vh * 0.88]} />
                    <meshStandardMaterial color="#9a9590" roughness={0.7} />
                  </mesh>
                );
              })}
              {/* Side windows */}
              <mesh position={[v.vw / 2 + 0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[v.vd * 0.85, v.vh * 0.8]} />
                <meshStandardMaterial color="#6899aa" roughness={0.1} metalness={0.4} transparent opacity={0.25} />
              </mesh>
            </>
          )}

          {/* Parapet */}
          <mesh position={[0, v.vh / 2, 0]} castShadow material={darkMat}>
            <boxGeometry args={[v.vw + 0.3, 0.3, v.vd + 0.3]} />
          </mesh>
        </group>
      ))}

      {/* Entrance canopy */}
      <mesh position={[0, 1.8, d * 0.5 + 1]} castShadow material={canopyMat}>
        <boxGeometry args={[w * 0.35, 0.15, 2.5]} />
      </mesh>
      {/* Canopy pillars */}
      {[-w * 0.12, w * 0.12].map((cx, ci) => (
        <mesh key={ci} position={[cx, 0.9, d * 0.5 + 2]} castShadow material={darkMat}>
          <cylinderGeometry args={[0.12, 0.12, 1.8, 8]} />
        </mesh>
      ))}

      {/* Roof equipment (HVAC) */}
      {data.floors >= 4 && (
        <>
          <mesh position={[w * 0.2, h + 0.5, -d * 0.15]} castShadow material={roofEquipMat}>
            <boxGeometry args={[2.5, 1, 2]} />
          </mesh>
          <mesh position={[-w * 0.15, h + 0.3, d * 0.1]} castShadow material={roofEquipMat}>
            <boxGeometry args={[1.5, 0.6, 1.5]} />
          </mesh>
        </>
      )}

      {/* Selection / target highlight ring */}
      {(isSelected || isTarget) && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(w, d) * 0.55, Math.max(w, d) * 0.6, 48]} />
          <meshBasicMaterial color={isTarget ? '#00b4e5' : '#0088cc'} transparent opacity={0.5} />
        </mesh>
      )}

      {/* Arrival pulse */}
      {arrived && isTarget && (
        <mesh ref={pulseRef} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(w, d) * 0.5, Math.max(w, d) * 0.55, 48]} />
          <meshBasicMaterial color="#00b4e5" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Floating label using Html for reliable rendering */}
      <Html position={[0, h + 2, 0]} center distanceFactor={60} style={{ pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.6)', fontFamily: 'Montserrat, sans-serif' }}>
            {data.shortName}
          </div>
          <div style={{ fontSize: '9px', color: '#ccc', textShadow: '0 1px 3px rgba(0,0,0,0.5)', fontFamily: 'Montserrat, sans-serif' }}>
            Building {data.id}
          </div>
        </div>
      </Html>
    </group>
  );
});

Building3D.displayName = 'Building3D';

/* ───────── Ground ───────── */
const Ground: React.FC = () => {
  const groundMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c4b494',
    roughness: 0.95,
    metalness: 0,
  }), []);

  return (
    <>
      {/* Main ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow material={groundMat}>
        <planeGeometry args={[200, 200]} />
      </mesh>

      {/* Subtle terrain patches */}
      {[
        { x: -30, z: -25, s: 25 },
        { x: 40, z: 15, s: 20 },
        { x: -20, z: 30, s: 18 },
        { x: 55, z: -20, s: 22 },
      ].map((p, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[p.x, -0.03, p.z]} receiveShadow>
          <circleGeometry args={[p.s, 32]} />
          <meshStandardMaterial color="#baa882" roughness={1} transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
};

/* ───────── Roads ───────── */
const asphaltMat = new THREE.MeshStandardMaterial({ color: '#555555', roughness: 0.8, metalness: 0.05 });
const markingMat = new THREE.MeshStandardMaterial({ color: '#dddddd', roughness: 0.4 });
const curbMat = new THREE.MeshStandardMaterial({ color: '#999999', roughness: 0.7 });

const Roads: React.FC = () => {
  return (
    <group>
      {/* Main road (north-south) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow material={asphaltMat}>
        <planeGeometry args={[6, 90]} />
      </mesh>
      {/* Center line dashes */}
      {Array.from({ length: 25 }).map((_, i) => (
        <mesh key={`cl${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -42 + i * 3.5]} material={markingMat}>
          <planeGeometry args={[0.15, 1.5]} />
        </mesh>
      ))}
      {/* Curbs */}
      {[-3.1, 3.1].map((cx, ci) => (
        <mesh key={`curb${ci}`} position={[cx, 0.12, 0]} material={curbMat}>
          <boxGeometry args={[0.25, 0.25, 90]} />
        </mesh>
      ))}

      {/* West side roads */}
      {[-14, -4, 10, 24].map((z, i) => (
        <group key={`wr${i}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-22, 0.02, z]} receiveShadow material={asphaltMat}>
            <planeGeometry args={[40, 4]} />
          </mesh>
          {[-22 - 18, -22 + 18].map((cx, ci) => (
            <mesh key={ci} position={[cx, 0.1, z]} material={curbMat}>
              <boxGeometry args={[0.2, 0.2, 4.2]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* East side roads */}
      {[-22, -8, 4, 12].map((z, i) => (
        <group key={`er${i}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[38, 0.02, z]} receiveShadow material={asphaltMat}>
            <planeGeometry args={[50, 4]} />
          </mesh>
        </group>
      ))}

      {/* Parking areas */}
      {[
        { x: -48, z: -14, w: 8, d: 18 },
        { x: 68, z: -24, w: 6, d: 22 },
      ].map((p, i) => (
        <group key={`park${i}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[p.x, 0.015, p.z]} receiveShadow>
            <planeGeometry args={[p.w, p.d]} />
            <meshStandardMaterial color="#606060" roughness={0.85} />
          </mesh>
          {/* Parking lines */}
          {Array.from({ length: 6 }).map((_, li) => (
            <mesh key={li} rotation={[-Math.PI / 2, 0, 0]} position={[p.x - p.w / 2 + (li + 1) * (p.w / 7), 0.025, p.z]}>
              <planeGeometry args={[0.08, p.d * 0.9]} />
              <meshStandardMaterial color="#aaaaaa" roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};

/* ───────── Trees ───────── */
const Tree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => {
  const trunkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#6b5b45', roughness: 0.9 }), []);
  const leafMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5a7a3a', roughness: 0.8 }), []);

  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.2, 0]} castShadow material={trunkMat}>
        <cylinderGeometry args={[0.15, 0.2, 2.4, 6]} />
      </mesh>
      <mesh position={[0, 3, 0]} castShadow material={leafMat}>
        <sphereGeometry args={[1.4, 8, 6]} />
      </mesh>
      <mesh position={[0.5, 2.5, 0.3]} castShadow material={leafMat}>
        <sphereGeometry args={[0.9, 8, 6]} />
      </mesh>
    </group>
  );
};

const Vegetation: React.FC = () => {
  const trees = useMemo(() => [
    [-50, 0, -30], [-48, 0, -5], [-52, 0, 15], [-45, 0, 35],
    [-8, 0, -38], [5, 0, -40], [8, 0, 38], [-5, 0, 35],
    [70, 0, -10], [72, 0, 5], [68, 0, 20], [74, 0, -30],
    [-55, 0, 0], [-52, 0, 25], [10, 0, 25], [28, 0, 18],
    [48, 0, 18], [65, 0, 12], [-35, 0, 38], [-15, 0, 35],
  ] as [number, number, number][], []);

  return (
    <group>
      {trees.map((pos, i) => (
        <Tree key={i} position={pos} scale={0.7 + Math.random() * 0.5} />
      ))}
    </group>
  );
};

/* ───────── Navigation Path 3D ───────── */
const NavPath3D: React.FC<{ path: { x: number; z: number }[]; progress: number }> = ({ path, progress }) => {

  if (path.length < 2) return null;

  return (
    <group>
      {/* Glowing dots along path */}
      {path.map((p, i) => {
        const t = i / (path.length - 1);
        if (t > progress) return null;
        return (
          <mesh key={i} position={[p.x, 0.15, p.z]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshBasicMaterial color="#00b4e5" transparent opacity={0.6} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ───────── User Marker 3D ───────── */
const UserMarker: React.FC<{ position: { x: number; z: number } }> = ({ position }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      const s = ringRef.current.scale;
      s.x += delta * 1.5;
      s.z += delta * 1.5;
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity -= delta * 0.4;
      if (mat.opacity <= 0) {
        s.set(1, 1, 1);
        mat.opacity = 0.5;
      }
    }
  });

  return (
    <group position={[position.x, 0.3, position.z]}>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[1, 1.3, 32]} />
        <meshBasicMaterial color="#0078c8" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {/* Main dot */}
      <mesh castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#0088dd" emissive="#0066aa" emissiveIntensity={0.5} roughness={0.3} />
      </mesh>
      {/* White border ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.65, 0.85, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/* ───────── Camera Controller ───────── */
const CameraController: React.FC<{ target: { x: number; z: number } | null; userPos: { x: number; z: number }; isNavigating: boolean }> = ({ target, userPos, isNavigating }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (isNavigating && controlsRef.current) {
      const targetX = lerp(controlsRef.current.target.x, userPos.x, 0.03);
      const targetZ = lerp(controlsRef.current.target.z, userPos.z, 0.03);
      controlsRef.current.target.set(targetX, 0, targetZ);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 3}
      minDistance={25}
      maxDistance={120}
      enablePan
      panSpeed={0.8}
    />
  );
};

/* ───────── Main Scene ───────── */
const WALK_SPEED = 0.003;

const CampusMapPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<BuildingData | null>(null);
  const [userPos, setUserPos] = useState({ x: 0, z: 42 });
  const [arrived, setArrived] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [navigationPath, setNavigationPath] = useState<{ x: number; z: number }[]>([]);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  const filteredBuildings = buildings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === 'emergency') return b.id === 4;
    if (activeCategory === 'medical') return ![5, 6, 7, 8].includes(b.id);
    return matchesSearch;
  });

  const searchResults = searchQuery.length > 0
    ? buildings.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.shortName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const navigateTo = useCallback((building: BuildingData) => {
    const path = getPathToBuilding(building);
    setNavigationPath(path);
    setNavigatingTo(building);
    setArrived(false);
    setCurrentSegment(0);
    setSegmentProgress(0);
    setIsWalking(true);
    setSelectedBuilding(null);
    setSearchQuery('');
    setUserPos(path[0]);
  }, []);

  useEffect(() => {
    if (!isWalking || navigationPath.length < 2) return;
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setSegmentProgress(prev => {
        const from = navigationPath[currentSegment];
        const to = navigationPath[currentSegment + 1];
        if (!from || !to) return prev;
        const segLength = Math.sqrt((to.x - from.x) ** 2 + (to.z - from.z) ** 2);
        const speed = WALK_SPEED * (60 / Math.max(segLength, 1));
        const next = prev + speed * (delta / 16);
        const newX = lerp(from.x, to.x, Math.min(next, 1));
        const newZ = lerp(from.z, to.z, Math.min(next, 1));
        setUserPos({ x: newX, z: newZ });
        if (next >= 1) {
          const nextSeg = currentSegment + 1;
          if (nextSeg >= navigationPath.length - 1) {
            setIsWalking(false);
            setArrived(true);
            return 0;
          }
          setCurrentSegment(nextSeg);
          return 0;
        }
        return next;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    lastTimeRef.current = 0;
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isWalking, currentSegment, navigationPath]);

  const resetNavigation = () => {
    cancelAnimationFrame(animRef.current);
    setNavigatingTo(null);
    setArrived(false);
    setIsWalking(false);
    setNavigationPath([]);
    setUserPos({ x: 0, z: 42 });
  };

  const toggleWalking = () => { if (!arrived) setIsWalking(p => !p); };
  const totalSegments = navigationPath.length - 1;
  const totalProgress = totalSegments > 0 ? (currentSegment + segmentProgress) / totalSegments : 0;
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <div className="relative h-screen pt-16">
        {/* 3D Canvas */}
        <Canvas
          shadows
          camera={{ position: [0, 60, 80], fov: 45 }}
          className="absolute inset-0"
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
          style={{ background: 'linear-gradient(180deg, #c8dae8 0%, #e8dcc8 60%, #d4c8a8 100%)' }}
        >
          <Suspense fallback={null}>
            {/* Lighting — realistic daylight */}
            <ambientLight intensity={0.5} color="#f0e8d8" />
            <directionalLight
              position={[40, 60, 30]}
              intensity={2}
              color="#fff5e0"
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-left={-80}
              shadow-camera-right={80}
              shadow-camera-top={80}
              shadow-camera-bottom={-80}
              shadow-camera-near={1}
              shadow-camera-far={200}
              shadow-bias={-0.001}
            />
            <directionalLight position={[-20, 30, -20]} intensity={0.3} color="#a8c4e0" />
            <hemisphereLight args={['#b8d0e8', '#c4b494', 0.5]} />
            <fog attach="fog" args={['#d8cfc0', 100, 220]} />

            <CameraController target={navigatingTo ? { x: navigatingTo.x, z: navigatingTo.z } : null} userPos={userPos} isNavigating={!!navigatingTo && !arrived} />

            <Ground />
            <Roads />
            <Vegetation />

            {/* Buildings */}
            {buildings.map(b => (
              <Building3D
                key={b.id}
                data={b}
                isSelected={selectedBuilding?.id === b.id}
                isTarget={navigatingTo?.id === b.id}
                arrived={arrived}
                onClick={() => setSelectedBuilding(selectedBuilding?.id === b.id ? null : b)}
              />
            ))}

            {/* Navigation path */}
            {navigationPath.length > 1 && (
              <NavPath3D path={navigationPath} progress={totalProgress} />
            )}

            {/* User marker */}
            <UserMarker position={userPos} />
          </Suspense>
        </Canvas>

        {/* ─── UI Overlays ─── */}

        {/* Search Bar */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4"
        >
          <div className="relative backdrop-blur-xl bg-white/70 border border-white/60 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter your destination..."
              className="w-full bg-transparent border-0 pl-12 pr-4 py-4 text-foreground placeholder:text-muted-foreground text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="mt-2 backdrop-blur-xl bg-white/90 border border-white/60 rounded-xl overflow-hidden shadow-lg max-h-64 overflow-y-auto">
                {searchResults.map((b) => (
                  <button key={b.id} onClick={() => navigateTo(b)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left">
                    <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center text-xs font-semibold text-muted-foreground">{b.id}</div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{b.shortName}</p>
                      <p className="text-xs text-muted-foreground">{b.wing === 'west' ? 'West Wing' : b.wing === 'east' ? 'East Wing' : 'Central'}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/50 ml-auto" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:block"
        >
          <div className="backdrop-blur-xl bg-white/60 border border-white/50 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-2 flex flex-col gap-1">
            {categories.map((cat) => (
              <button key={cat.label} onClick={() => { setActiveCategory(cat.filter); setShowSidebar(true); }}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-left min-w-[130px] ${activeCategory === cat.filter ? 'bg-white/80 shadow-sm text-foreground' : 'text-muted-foreground hover:bg-white/40 hover:text-foreground'}`}>
                <cat.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.label}</span>
              </button>
            ))}
            <div className="border-t border-border/30 mt-1 pt-1">
              <button onClick={resetNavigation} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/40 transition-all w-full">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Reset</span>
              </button>
            </div>
            <div className="border-t border-border/30 mt-1 pt-2 px-3 pb-1">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{timeStr}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile bottom bar */}
        <div className="md:hidden absolute bottom-4 left-4 right-4 z-20 flex gap-2">
          {categories.map((cat) => (
            <button key={cat.label} onClick={() => { setActiveCategory(cat.filter); setShowSidebar(true); }}
              className="flex-1 backdrop-blur-xl bg-white/70 border border-white/50 rounded-xl py-2.5 flex flex-col items-center gap-1">
              <cat.icon className="w-4 h-4 text-foreground" />
              <span className="text-[10px] font-medium text-foreground">{cat.label}</span>
            </button>
          ))}
          <button onClick={resetNavigation}
            className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-xl px-3 py-2.5 flex flex-col items-center gap-1">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">Reset</span>
          </button>
        </div>

        {/* Directory Panel */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute left-0 md:left-[170px] top-20 md:top-28 bottom-16 md:bottom-8 z-20 w-full md:w-80 backdrop-blur-xl bg-white/80 border border-white/50 md:rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="flex items-center justify-between p-4 border-b border-border/30">
                <h3 className="font-semibold text-sm text-foreground">
                  {activeCategory === 'emergency' ? 'Emergency' : activeCategory === 'medical' ? 'Medical Services' : 'Campus Directory'}
                </h3>
                <button onClick={() => setShowSidebar(false)}>
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
              <div className="overflow-y-auto h-full pb-20 scrollbar-thin">
                {filteredBuildings.map((b, i) => (
                  <motion.button key={b.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                    onClick={() => { navigateTo(b); setShowSidebar(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/60 transition-colors text-left border-b border-border/20">
                    <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center text-sm font-semibold text-muted-foreground shrink-0">{b.id}</div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{b.shortName}</p>
                      <p className="text-xs text-muted-foreground truncate">{b.name}</p>
                    </div>
                    <Navigation className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0 ml-auto" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Walking Controls */}
        <AnimatePresence>
          {navigatingTo && !arrived && (
            <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4">
              <div className="backdrop-blur-xl bg-white/80 border border-white/50 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-muted border border-border flex items-center justify-center text-sm font-bold text-muted-foreground">{navigatingTo.id}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">Navigating to {navigatingTo.shortName}</p>
                    <p className="text-xs text-muted-foreground">{Math.round(totalProgress * 100)}% • Walking</p>
                  </div>
                  <button onClick={toggleWalking} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-primary/30 bg-primary/10 text-primary">
                    {isWalking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full bg-primary" animate={{ width: `${totalProgress * 100}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Building Info */}
        <AnimatePresence>
          {selectedBuilding && !navigatingTo && (
            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4">
              <div className="backdrop-blur-xl bg-white/85 border border-white/50 rounded-2xl p-5 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-lg font-bold text-muted-foreground shrink-0">{selectedBuilding.id}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-foreground">{selectedBuilding.shortName}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{selectedBuilding.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedBuilding.wing === 'west' ? 'West Wing' : selectedBuilding.wing === 'east' ? 'East Wing' : 'Central Campus'}
                      <span className="mx-1">•</span>
                      {selectedBuilding.floors} floors
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => navigateTo(selectedBuilding)} className="flex-1 rounded-xl h-10 text-sm font-semibold">
                    <Navigation className="w-4 h-4 mr-2" />Navigate
                  </Button>
                  <Button onClick={() => setSelectedBuilding(null)} variant="outline" className="rounded-xl h-10">Close</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Arrival */}
        <AnimatePresence>
          {arrived && navigatingTo && (
            <motion.div initial={{ y: -80, opacity: 0, scale: 0.9 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -80, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-30 w-auto max-w-[90vw]">
              <div className="backdrop-blur-xl bg-white/90 border border-white/60 rounded-2xl px-5 md:px-6 py-4 shadow-lg flex items-center gap-3">
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <MapPin className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">You have arrived at</p>
                  <p className="text-base font-bold text-foreground">{navigatingTo.shortName}</p>
                </div>
                <button onClick={resetNavigation} className="ml-4">
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CampusMapPage;
