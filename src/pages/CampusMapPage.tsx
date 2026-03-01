import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Navigation, MapPin, X, Play, Pause, RotateCcw, ChevronRight, ChevronLeft,
  Building2, Stethoscope, AlertTriangle, Clock, Phone, Heart, FlaskConical,
  Hotel, ShoppingBag, Shield, List, ChevronDown, Info, Layers, Video
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

/* ─── Types ─── */
type BuildingType = 'hospital' | 'emergency' | 'research' | 'wellness' | 'hotel' | 'commercial' | 'admin';

interface BuildingData {
  id: number; name: string; shortName: string;
  x: number; z: number; w: number; d: number; floors: number;
  wing: 'west' | 'east' | 'center';
  shape: 'rect' | 'L' | 'U';
  type: BuildingType;
  phone: string; hours: string;
  description: string;
  services: string[];
}

/* ─── Color map by type ─── */
const TYPE_COLOR: Record<BuildingType, string> = {
  hospital: '#2563eb',
  emergency: '#dc2626',
  research: '#7c3aed',
  wellness: '#059669',
  hotel: '#d97706',
  commercial: '#db2777',
  admin: '#475569',
};
const TYPE_LABEL: Record<BuildingType, string> = {
  hospital: 'Hospital', emergency: 'Emergency', research: 'Research',
  wellness: 'Wellness', hotel: 'Hotel', commercial: 'Commercial', admin: 'Administration',
};
const TYPE_LABEL_AR: Record<BuildingType, string> = {
  hospital: 'مستشفى', emergency: 'طوارئ', research: 'أبحاث',
  wellness: 'عافية', hotel: 'فندق', commercial: 'تجاري', admin: 'إدارة',
};
const TYPE_ICON: Record<BuildingType, React.ElementType> = {
  hospital: Stethoscope, emergency: AlertTriangle, research: FlaskConical,
  wellness: Heart, hotel: Hotel, commercial: ShoppingBag, admin: Building2,
};

/* ─── Building Data ─── */
const buildings: BuildingData[] = [
  {
    id: 1, name: 'Rehabilitation, Cosmetics & Wellness Institute', shortName: 'Rehab & Wellness', x: -38, z: 18, w: 18, d: 14, floors: 3, wing: 'west', shape: 'L', type: 'wellness',
    phone: '+20-2-1234-5601', hours: 'Sun–Thu 8AM–8PM', description: 'A dedicated wellness hub offering rehabilitation therapy, cosmetic procedures, and holistic recovery programs.',
    services: ['Physical Therapy', 'Cosmetic Surgery', 'Hydrotherapy', 'Occupational Therapy']
  },
  {
    id: 2, name: 'UHC Phase 1 – 220 Beds, 36 Outpatient Clinics', shortName: 'UHC Phase 1', x: -30, z: 4, w: 22, d: 16, floors: 5, wing: 'west', shape: 'U', type: 'hospital',
    phone: '+20-2-1234-5602', hours: '24/7', description: 'First phase of the University Hospital Complex hosting outpatient clinics and inpatient wards across 5 floors.',
    services: ['General Surgery', 'Internal Medicine', 'Outpatient Clinics', 'Radiology']
  },
  {
    id: 3, name: 'University Hospital Center – 332 Beds', shortName: 'University Hospital', x: -36, z: -14, w: 26, d: 20, floors: 7, wing: 'west', shape: 'U', type: 'hospital',
    phone: '+20-2-1234-5603', hours: '24/7', description: 'The flagship hospital tower with 332 beds and a full spectrum of tertiary care services.',
    services: ['ICU', 'Surgical Suites', 'Labor & Delivery', 'Imaging Center', 'Pharmacy']
  },
  {
    id: 4, name: 'Emergency & Trauma Center', shortName: 'Emergency Center', x: -10, z: -16, w: 16, d: 12, floors: 4, wing: 'center', shape: 'rect', type: 'emergency',
    phone: '123', hours: '24/7 – Always Open', description: 'Level I Trauma Center with helicopter landing pad, rapid-response teams, and a full resuscitation suite.',
    services: ['Trauma Resuscitation', 'Helicopter Pad', 'Poison Control', 'Rapid Response Team']
  },
  {
    id: 5, name: 'Central Command Administration', shortName: 'Administration', x: -4, z: -28, w: 12, d: 10, floors: 3, wing: 'center', shape: 'rect', type: 'admin',
    phone: '+20-2-1234-5605', hours: 'Sun–Thu 9AM–5PM', description: 'Campus-wide administration, patient services, HR, and executive leadership offices.',
    services: ['Patient Services', 'HR Office', 'Finance', 'Executive Offices']
  },
  {
    id: 6, name: 'CapitalMed Hotel', shortName: 'Medical Hotel', x: -42, z: 30, w: 14, d: 12, floors: 6, wing: 'west', shape: 'rect', type: 'hotel',
    phone: '+20-2-1234-5606', hours: '24/7', description: 'On-campus luxury hotel designed for patients\' families and international medical tourists, steps from clinical care.',
    services: ['Concierge', 'Restaurant', 'Spa', 'Free Shuttle', 'Medical Concierge']
  },
  {
    id: 7, name: 'Central Utility Building', shortName: 'Utilities', x: -6, z: -4, w: 10, d: 8, floors: 2, wing: 'center', shape: 'rect', type: 'admin',
    phone: '+20-2-1234-5607', hours: '24/7', description: 'Houses campus power, HVAC, water treatment and medical gas systems.',
    services: ['Power Plant', 'HVAC Control', 'Water Treatment', 'Medical Gases']
  },
  {
    id: 8, name: 'La Plaza Commercial Mall', shortName: 'La Plaza Mall', x: -30, z: -28, w: 18, d: 12, floors: 2, wing: 'west', shape: 'L', type: 'commercial',
    phone: '+20-2-1234-5608', hours: 'Daily 9AM–10PM', description: 'Campus retail promenade with pharmacy, cafes, bank, gift shops, and essential services.',
    services: ['Pharmacy', 'Cafés & Restaurants', 'Bank & ATM', 'Gift Shop', 'Clothing']
  },
  {
    id: 9, name: 'Neurosciences Institute', shortName: 'Neurosciences', x: 14, z: -28, w: 16, d: 12, floors: 4, wing: 'east', shape: 'rect', type: 'hospital',
    phone: '+20-2-1234-5609', hours: '24/7', description: 'Specialized center for brain, spine and neurological conditions with advanced imaging and surgical suites.',
    services: ['Neurosurgery', 'Epilepsy Clinic', 'Spine Center', 'Neuroimaging']
  },
  {
    id: 10, name: 'Urinary Diseases & Urosurgery', shortName: 'Urology', x: 14, z: -14, w: 16, d: 12, floors: 4, wing: 'east', shape: 'L', type: 'hospital',
    phone: '+20-2-1234-5610', hours: 'Sun–Fri 8AM–10PM', description: 'Comprehensive urology services from minimally-invasive laparoscopy to robotic-assisted surgery.',
    services: ['Robotic Surgery', 'Kidney Stone Clinic', 'Urodynamics', 'Laparoscopy']
  },
  {
    id: 11, name: 'Cardiopulmonary Institute', shortName: 'Cardiopulmonary', x: 14, z: -2, w: 16, d: 12, floors: 5, wing: 'east', shape: 'rect', type: 'hospital',
    phone: '+20-2-1234-5611', hours: '24/7', description: 'Advanced heart and lung care including cardiac catheterization labs and pulmonary function testing.',
    services: ['Cath Lab', 'Cardiac Rehab', 'Pulmonology', 'Cardiac ICU', 'Echocardiography']
  },
  {
    id: 12, name: 'Hepatobiliary & Gastroenterology', shortName: 'Gastroenterology', x: 34, z: -28, w: 16, d: 12, floors: 4, wing: 'east', shape: 'rect', type: 'hospital',
    phone: '+20-2-1234-5612', hours: 'Sun–Fri 8AM–8PM', description: 'Expert diagnosis and treatment of liver, gallbladder, pancreas, and digestive tract conditions.',
    services: ['Endoscopy', 'Liver Transplant', 'Bariatric Surgery', 'Colonoscopy']
  },
  {
    id: 13, name: 'Advanced Medical Research', shortName: 'Research Lab', x: 34, z: -14, w: 16, d: 12, floors: 4, wing: 'east', shape: 'L', type: 'research',
    phone: '+20-2-1234-5613', hours: 'Sun–Thu 8AM–6PM', description: 'State-of-the-art research facility housing biobanks, genomics labs, and clinical trial coordination.',
    services: ['Genomics Lab', 'Biobank', 'Clinical Trials', 'AI Diagnostics', 'Publications']
  },
  {
    id: 14, name: 'Oncology Institute', shortName: 'Oncology', x: 34, z: -2, w: 16, d: 12, floors: 5, wing: 'east', shape: 'U', type: 'hospital',
    phone: '+20-2-1234-5614', hours: '24/7', description: 'Comprehensive cancer care with radiation therapy, chemotherapy suites, and a dedicated palliative care unit.',
    services: ['Radiation Therapy', 'Chemotherapy', 'Bone Marrow Transplant', 'Palliative Care']
  },
  {
    id: 15, name: 'Children & Women Institute', shortName: "Children & Women", x: 54, z: -26, w: 16, d: 16, floors: 5, wing: 'east', shape: 'U', type: 'hospital',
    phone: '+20-2-1234-5615', hours: '24/7', description: 'Child-friendly hospital with pediatric specialties, NICU, and a full obstetrics and gynecology department.',
    services: ['NICU', 'Pediatric Surgery', 'Obstetrics', 'Gynecology', 'Child Development']
  },
  {
    id: 16, name: 'Assisted Living Facilities', shortName: 'Assisted Living', x: 54, z: -10, w: 16, d: 12, floors: 3, wing: 'east', shape: 'rect', type: 'wellness',
    phone: '+20-2-1234-5616', hours: '24/7', description: 'Long-term assisted living for seniors and post-surgical patients requiring ongoing support.',
    services: ['24/7 Nursing', 'Physiotherapy', 'Social Activities', 'Nutritional Meals']
  },
  {
    id: 17, name: 'Behavioral & Mental Health', shortName: 'Mental Health', x: 54, z: 4, w: 16, d: 12, floors: 3, wing: 'east', shape: 'rect', type: 'wellness',
    phone: '+20-2-1234-5617', hours: '24/7', description: 'Compassionate psychiatric and psychological care in a serene, private environment.',
    services: ['Psychiatry', 'Counseling', 'Addiction Recovery', 'Group Therapy', 'Crisis Line']
  },
  {
    id: 18, name: 'Geriatric Health Care', shortName: 'Geriatrics', x: 34, z: 10, w: 16, d: 10, floors: 3, wing: 'east', shape: 'rect', type: 'hospital',
    phone: '+20-2-1234-5618', hours: 'Sun–Fri 8AM–8PM', description: 'Specialized care for older adults addressing age-related conditions with dignity and respect.',
    services: ['Memory Clinic', 'Falls Prevention', 'Chronic Disease Mgmt', 'Palliative Care']
  },
  {
    id: 19, name: 'Dental Institute', shortName: 'Dental', x: 14, z: 10, w: 12, d: 10, floors: 2, wing: 'east', shape: 'rect', type: 'hospital',
    phone: '+20-2-1234-5619', hours: 'Sun–Thu 8AM–6PM', description: 'Full-service dental center offering everything from routine cleanings to complex oral surgery.',
    services: ['Orthodontics', 'Oral Surgery', 'Cosmetic Dentistry', 'Pediatric Dentistry']
  },
];

/* ─── Path helpers ─── */
const mainRoad = Array.from({ length: 11 }, (_, i) => ({ x: 0, z: 42 - i * 8 }));
function getPathToBuilding(b: BuildingData) {
  const tx = b.x + b.w / 2, tz = b.z + b.d / 2;
  let ci = 0, cd = Infinity;
  mainRoad.forEach((p, i) => { const d = Math.abs(p.z - tz); if (d < cd) { cd = d; ci = i; } });
  const path: { x: number; z: number }[] = [];
  for (let i = 0; i <= ci; i++)path.push(mainRoad[i]);
  path.push({ x: tx, z: mainRoad[ci].z });
  path.push({ x: tx, z: tz });
  return path;
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

/* ─── 3D Materials ─── */
const FLOOR_H = 1.6;
const concreteMat = new THREE.MeshStandardMaterial({ color: '#c8c0b8', roughness: 0.6, metalness: 0.1 });
const stoneMat = new THREE.MeshStandardMaterial({ color: '#d4cdc4', roughness: 0.7, metalness: 0.05 });
const glassMat = new THREE.MeshPhysicalMaterial({ color: '#88aabb', roughness: 0.1, metalness: 0.7, transmission: 0.85, transparent: true, opacity: 0.8, ior: 1.5 });
const darkMat = new THREE.MeshStandardMaterial({ color: '#4a5568', roughness: 0.5, metalness: 0.2 });
const canopyMat = new THREE.MeshStandardMaterial({ color: '#e8e4de', roughness: 0.4, metalness: 0.15 });
const roofEquipMat = new THREE.MeshStandardMaterial({ color: '#718096', roughness: 0.5, metalness: 0.6 });
const asphaltMat = new THREE.MeshStandardMaterial({ color: '#4a5568', roughness: 0.9, metalness: 0.05 });
const curbMat = new THREE.MeshStandardMaterial({ color: '#a0aec0', roughness: 0.7 });

/* ─── Building3D ─── */
interface B3DProps { data: BuildingData; isSelected: boolean; isTarget: boolean; arrived: boolean; onClick: () => void; }
const Building3D: React.FC<B3DProps> = React.memo(({ data, isSelected, isTarget, arrived, onClick }) => {
  const pulseRef = useRef<THREE.Mesh>(null);
  const h = data.floors * FLOOR_H;
  const { w, d } = data;
  const typeColor = TYPE_COLOR[data.type];

  useFrame((_, delta) => {
    if (pulseRef.current && arrived && isTarget) {
      pulseRef.current.scale.x += delta * 3; pulseRef.current.scale.z += delta * 3;
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity -= delta * 0.5;
      if (mat.opacity <= 0) { pulseRef.current.scale.set(1, 1, 1); mat.opacity = 0.4; }
    }
  });

  const accentMat = useMemo(() => new THREE.MeshStandardMaterial({ color: typeColor, roughness: 0.4, metalness: 0.3 }), [typeColor]);

  const volumes = useMemo(() => {
    const vols: { px: number; pz: number; vw: number; vd: number; vh: number; mat: 'concrete' | 'stone' | 'glass' }[] = [];
    if (data.shape === 'U') {
      vols.push({ px: 0, pz: -d * 0.35, vw: w, vd: d * 0.3, vh: h, mat: 'concrete' });
      vols.push({ px: -w * 0.35, pz: d * 0.1, vw: w * 0.3, vd: d * 0.7, vh: h * 0.85, mat: 'stone' });
      vols.push({ px: w * 0.35, pz: d * 0.1, vw: w * 0.3, vd: d * 0.7, vh: h * 0.85, mat: 'stone' });
      vols.push({ px: 0, pz: d * 0.35, vw: w * 0.4, vd: d * 0.15, vh: h * 0.5, mat: 'glass' });
    } else if (data.shape === 'L') {
      vols.push({ px: -w * 0.15, pz: 0, vw: w * 0.7, vd: d, vh: h, mat: 'concrete' });
      vols.push({ px: w * 0.3, pz: -d * 0.25, vw: w * 0.4, vd: d * 0.5, vh: h * 0.75, mat: 'stone' });
      vols.push({ px: w * 0.1, pz: -d * 0.15, vw: w * 0.15, vd: d * 0.3, vh: h * 0.55, mat: 'glass' });
    } else {
      vols.push({ px: 0, pz: 0, vw: w * 0.85, vd: d * 0.85, vh: h, mat: 'concrete' });
      vols.push({ px: w * 0.1, pz: d * 0.3, vw: w * 0.5, vd: d * 0.2, vh: h * 0.7, mat: 'glass' });
      vols.push({ px: -w * 0.35, pz: 0, vw: w * 0.15, vd: d * 0.6, vh: h * 0.6, mat: 'stone' });
    }
    return vols;
  }, [data.shape, w, d, h]);

  const getMat = (t: string) => { if (t === 'glass') return glassMat; if (t === 'stone') return stoneMat; return concreteMat; };

  return (
    <group position={[data.x + w / 2, 0, data.z + d / 2]} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {volumes.map((v, i) => (
        <group key={i} position={[v.px, v.vh / 2, v.pz]}>
          <mesh castShadow receiveShadow material={getMat(v.mat)}>
            <boxGeometry args={[v.vw, v.vh, v.vd]} />
          </mesh>
          {v.mat !== 'glass' && (
            <mesh position={[0, v.vh / 2 + 0.18, 0]} material={accentMat}>
              <boxGeometry args={[v.vw + 0.1, 0.35, v.vd + 0.1]} />
            </mesh>
          )}
          <mesh position={[0, v.vh / 2 + 0.01, 0]} castShadow material={darkMat}>
            <boxGeometry args={[v.vw + 0.3, 0.25, v.vd + 0.3]} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 1.8, d * 0.5 + 1]} castShadow material={canopyMat}>
        <boxGeometry args={[w * 0.35, 0.15, 2.5]} />
      </mesh>
      {[-w * 0.12, w * 0.12].map((cx, ci) => (
        <mesh key={ci} position={[cx, 0.9, d * 0.5 + 2]} castShadow material={darkMat}>
          <cylinderGeometry args={[0.12, 0.12, 1.8, 8]} />
        </mesh>
      ))}
      {data.floors >= 4 && (
        <mesh position={[w * 0.2, h * data.floors * FLOOR_H / 2 + 0.5, -d * 0.15]} castShadow material={roofEquipMat}>
          <boxGeometry args={[2.5, 1, 2]} />
        </mesh>
      )}
      {(isSelected || isTarget) && (
        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(w, d) * 0.55, Math.max(w, d) * 0.6, 48]} />
          <meshBasicMaterial color={isTarget ? '#00b4e5' : '#0088cc'} transparent opacity={0.6} />
        </mesh>
      )}
      {arrived && isTarget && (
        <mesh ref={pulseRef} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(w, d) * 0.5, Math.max(w, d) * 0.55, 48]} />
          <meshBasicMaterial color="#00b4e5" transparent opacity={0.4} />
        </mesh>
      )}
      <Html position={[0, h + 2.2, 0]} center distanceFactor={60} style={{ pointerEvents: 'none' }}>
        <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
          <div style={{
            fontSize: '12px', fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.7)', fontFamily: 'Inter,sans-serif',
            background: typeColor + 'cc', borderRadius: 4, padding: '1px 6px', backdropFilter: 'blur(4px)'
          }}>
            {data.shortName}
          </div>
        </div>
      </Html>
    </group>
  );
});
Building3D.displayName = 'Building3D';

/* ─── Ground / Roads / Trees ─── */
const Ground: React.FC = () => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
    <planeGeometry args={[200, 200]} />
    <meshStandardMaterial color="#c4b494" roughness={0.95} />
  </mesh>
);

const Roads: React.FC = () => (
  <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow material={asphaltMat}>
      <planeGeometry args={[6, 90]} />
    </mesh>
    {Array.from({ length: 25 }).map((_, i) => (
      <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, -42 + i * 3.5]} material={new THREE.MeshStandardMaterial({ color: '#ddd', roughness: 0.4 })}>
        <planeGeometry args={[0.15, 1.5]} />
      </mesh>
    ))}
    {[-3.1, 3.1].map((cx, ci) => (
      <mesh key={ci} position={[cx, 0.12, 0]} material={curbMat}>
        <boxGeometry args={[0.25, 0.25, 90]} />
      </mesh>
    ))}
    {[-14, -4, 10, 24].map((z, i) => (
      <mesh key={`w${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-22, 0.02, z]} receiveShadow material={asphaltMat}>
        <planeGeometry args={[40, 4]} />
      </mesh>
    ))}
    {[-22, -8, 4, 12].map((z, i) => (
      <mesh key={`e${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[38, 0.02, z]} receiveShadow material={asphaltMat}>
        <planeGeometry args={[50, 4]} />
      </mesh>
    ))}
  </group>
);

const Tree: React.FC<{ position: [number, number, number]; scale?: number }> = ({ position, scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.15, 0.2, 2.4, 6]} /><meshStandardMaterial color="#6b5b45" /></mesh>
    <mesh position={[0, 3, 0]}><sphereGeometry args={[1.4, 8, 6]} /><meshStandardMaterial color="#5a7a3a" /></mesh>
  </group>
);

const Vegetation: React.FC = () => (
  <group>
    {([-50, -48, -52, -45, -8, 5, 8, -5, 70, 72, 68, 74, -55, -52, 10, 28, 48, 65, -35, -15] as number[]).map((x, i) => (
      <Tree key={i} position={[x, 0, [-30, -5, 15, 35, -38, -40, 38, 35, -10, 5, 20, -30, 0, 25, 25, 18, 18, 12, 38, 35][i]]} scale={0.8} />
    ))}
  </group>
);

/* ─── Nav Path / User Marker / Camera ─── */
const NavPath3D: React.FC<{ path: { x: number; z: number }[]; progress: number }> = ({ path, progress }) => (
  <group>
    {path.map((p, i) => {
      const t = i / (path.length - 1);
      if (t > progress) return null;
      return <mesh key={i} position={[p.x, 0.15, p.z]}><sphereGeometry args={[0.3, 8, 8]} /><meshBasicMaterial color="#00b4e5" transparent opacity={0.6} /></mesh>;
    })}
  </group>
);

const UserMarker: React.FC<{ position: { x: number; z: number } }> = ({ position }) => {
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ringRef.current) {
      const s = ringRef.current.scale; s.x += delta * 1.5; s.z += delta * 1.5;
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity -= delta * 0.4; if (mat.opacity <= 0) { s.set(1, 1, 1); mat.opacity = 0.5; }
    }
  });
  return (
    <group position={[position.x, 0.3, position.z]}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[1, 1.3, 32]} /><meshBasicMaterial color="#0078c8" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh castShadow><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#0088dd" emissive="#0066aa" emissiveIntensity={0.5} roughness={0.3} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[0.65, 0.85, 32]} /><meshBasicMaterial color="#ffffff" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const CameraController: React.FC<{ userPos: { x: number; z: number }; isNavigating: boolean }> = ({ userPos, isNavigating }) => {
  const controlsRef = useRef<any>(null);
  useFrame(() => {
    if (isNavigating && controlsRef.current) {
      controlsRef.current.target.set(lerp(controlsRef.current.target.x, userPos.x, 0.03), 0, lerp(controlsRef.current.target.z, userPos.z, 0.03));
    }
  });
  return <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.08} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 3} minDistance={25} maxDistance={120} enablePan panSpeed={0.8} />;
};

/* ─── Legend ─── */
const LEGEND_TYPES: BuildingType[] = ['hospital', 'emergency', 'research', 'wellness', 'hotel', 'commercial', 'admin'];
const Legend: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  return (
    <div className="absolute bottom-4 right-4 z-20 backdrop-blur-xl bg-white/80 border border-white/50 rounded-xl p-3 shadow-lg rtl:left-4 rtl:right-auto rtl:text-right">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1"><Layers className="w-3 h-3" />{t('map.legend')}</p>
      <div className="flex flex-col gap-1">
        {LEGEND_TYPES.map(t => (
          <div key={t} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: TYPE_COLOR[t] }} />
            <span className="text-[10px] text-foreground/80 font-medium">{isAr ? TYPE_LABEL_AR[t] : TYPE_LABEL[t]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── Building Info Panel (right side) ─── */
const InfoPanel: React.FC<{ building: BuildingData; onClose: () => void; onNavigate: (b: BuildingData) => void }> = ({ building, onClose, onNavigate }) => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const Icon = TYPE_ICON[building.type];
  const color = TYPE_COLOR[building.type];
  return (
    <motion.div initial={{ x: 340, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 340, opacity: 0 }} transition={{ type: 'spring', damping: 25 }}
      className="absolute right-0 top-16 bottom-0 z-30 w-80 backdrop-blur-xl bg-white/90 border-l border-white/50 shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/30 relative" style={{ background: `${color}18` }}>
        <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/60 flex items-center justify-center hover:bg-white transition-colors">
          <X className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-3 mb-2 pr-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}22` }}>
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>{isAr ? TYPE_LABEL_AR[building.type] : TYPE_LABEL[building.type]}</p>
            <h3 className="text-sm font-bold text-foreground leading-tight">{building.shortName}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{building.wing === 'west' ? (isAr ? 'الجناح الغربي' : 'West Wing') : building.wing === 'east' ? (isAr ? 'الجناح الشرقي' : 'East Wing') : (isAr ? 'الحرم المركزي' : 'Central Campus')}</span>
          <span className="mx-1">•</span>
          <span>{building.floors} {isAr ? 'طوابق' : (building.floors > 1 ? 'Floors' : 'Floor')}</span>
          <span className="mx-1">•</span>
          <span>{t('map.bldg')} {building.id}</span>
        </div>
      </div>
      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <p className="text-xs text-muted-foreground leading-relaxed">{building.description}</p>
        {/* Contact */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t('map.contact')}</p>
          <div className="flex items-center gap-2 text-xs"><Phone className="w-3.5 h-3.5 text-muted-foreground" /><span>{building.phone}</span></div>
          <div className="flex items-center gap-2 text-xs"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span>{building.hours}</span></div>
        </div>
        {/* Services */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">{t('map.services')}</p>
          <div className="flex flex-wrap gap-1.5">
            {building.services.map(s => (
              <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium border" style={{ background: `${color}12`, borderColor: `${color}30`, color }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-border/30">
        <button onClick={() => onNavigate(building)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: color }}>
          <Navigation className="w-4 h-4" />
          {isAr ? 'انتقل إلى هنا' : 'Navigate Here'}
        </button>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ─── */
const WALK_SPEED = 0.003;
type CategoryFilter = 'all' | BuildingType;

const CampusMapPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<BuildingData | null>(null);
  const [userPos, setUserPos] = useState({ x: 0, z: 42 });
  const [arrived, setArrived] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [showDirectory, setShowDirectory] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [currentSegment, setCurrentSegment] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [navigationPath, setNavigationPath] = useState<{ x: number; z: number }[]>([]);
  const [isVirtualTour, setIsVirtualTour] = useState(false);
  const [tourIndex, setTourIndex] = useState(0);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef(0);

  // Grouped buildings
  const categories = useMemo(() => {
    const types = [...new Set(buildings.map(b => b.type))] as BuildingType[];
    return [
      { type: 'all' as CategoryFilter, label: 'All Buildings', count: buildings.length, icon: List, color: '#334155' },
      ...types.map(t => ({ type: t as CategoryFilter, label: TYPE_LABEL[t], count: buildings.filter(b => b.type === t).length, icon: TYPE_ICON[t], color: TYPE_COLOR[t] }))
    ];
  }, []);

  const filteredBuildings = useMemo(() => buildings.filter(b => {
    const matchSearch = searchQuery === '' || b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.shortName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === 'all' || b.type === activeCategory;
    return matchSearch && matchCat;
  }), [searchQuery, activeCategory]);

  const searchResults = useMemo(() => searchQuery.length > 0 ? buildings.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) || b.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [], [searchQuery]);

  const navigateTo = useCallback((building: BuildingData) => {
    const path = getPathToBuilding(building);
    setNavigationPath(path); setNavigatingTo(building); setArrived(false);
    setCurrentSegment(0); setSegmentProgress(0); setIsWalking(true);
    setSelectedBuilding(null); setSearchQuery(''); setUserPos(path[0]);
    setShowDirectory(false);
  }, []);

  useEffect(() => {
    if (!isWalking || navigationPath.length < 2) return;
    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current; lastTimeRef.current = time;
      setSegmentProgress(prev => {
        const from = navigationPath[currentSegment], to = navigationPath[currentSegment + 1];
        if (!from || !to) return prev;
        const segLength = Math.sqrt((to.x - from.x) ** 2 + (to.z - from.z) ** 2);
        const speed = WALK_SPEED * (60 / Math.max(segLength, 1));
        const next = prev + speed * (delta / 16);
        setUserPos({ x: lerp(from.x, to.x, Math.min(next, 1)), z: lerp(from.z, to.z, Math.min(next, 1)) });
        if (next >= 1) {
          const ns = currentSegment + 1;
          if (ns >= navigationPath.length - 1) { setIsWalking(false); setArrived(true); return 0; }
          setCurrentSegment(ns); return 0;
        }
        return next;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    lastTimeRef.current = 0; animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isWalking, currentSegment, navigationPath]);

  const resetNavigation = () => {
    cancelAnimationFrame(animRef.current); setNavigatingTo(null); setArrived(false);
    setIsWalking(false); setNavigationPath([]); setUserPos({ x: 0, z: 42 });
    setIsVirtualTour(false);
  };

  useEffect(() => {
    if (isVirtualTour && buildings.length > 0) {
      const b = buildings[tourIndex];
      setUserPos({ x: b.x, z: b.z + 15 });
      setNavigatingTo(b);
      setSelectedBuilding(null);
      const timer = setTimeout(() => {
        setTourIndex(i => (i + 1) % buildings.length);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [isVirtualTour, tourIndex]);

  const totalSegments = navigationPath.length - 1;
  const totalProgress = totalSegments > 0 ? (currentSegment + segmentProgress) / totalSegments : 0;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header />
      <div className="relative h-screen pt-16">
        {/* ─── 3D Canvas ─── */}
        <Canvas shadows camera={{ position: [0, 60, 80], fov: 45 }} className="absolute inset-0"
          dpr={[1, 1.5]}
          gl={{ antialias: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0, powerPreference: "high-performance", preserveDrawingBuffer: true }}
          style={{ background: 'linear-gradient(180deg,#c8dae8 0%,#e8dcc8 60%,#d4c8a8 100%)' }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.4} color="#f0e8d8" />
            <directionalLight position={[40, 60, 30]} intensity={1.5} color="#fff5e0" castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-left={-80} shadow-camera-right={80} shadow-camera-top={80} shadow-camera-bottom={-80} shadow-bias={-0.001} />
            <directionalLight position={[-20, 30, -20]} intensity={0.2} color="#a8c4e0" />
            <hemisphereLight args={['#b8d0e8', '#c4b494', 0.4]} />
            <fog attach="fog" args={['#d8cfc0', 100, 250]} />
            <CameraController userPos={userPos} isNavigating={!!navigatingTo && !arrived} />
            <Ground /><Roads /><Vegetation />
            <ContactShadows position={[0, 0.1, 0]} opacity={0.5} scale={150} blur={2} far={20} />
            {buildings.map(b => (
              <Building3D key={b.id} data={b}
                isSelected={selectedBuilding?.id === b.id}
                isTarget={navigatingTo?.id === b.id}
                arrived={arrived}
                onClick={() => setSelectedBuilding(selectedBuilding?.id === b.id ? null : b)} />
            ))}
            {navigationPath.length > 1 && <NavPath3D path={navigationPath} progress={totalProgress} />}
            <UserMarker position={userPos} />
          </Suspense>
        </Canvas>

        {/* ─── Search Bar ─── */}
        <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, type: 'spring' }}
          className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
          <div className="relative backdrop-blur-xl bg-white/75 border border-white/60 rounded-2xl shadow-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search buildings, departments..."
              className="w-full bg-transparent border-0 pl-11 pr-10 py-3.5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0" />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-muted-foreground" /></button>}
          </div>
          <AnimatePresence>
            {searchResults.length > 0 && !isVirtualTour && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="mt-2 backdrop-blur-xl bg-white/90 border border-white/60 rounded-xl overflow-hidden shadow-xl max-h-72 overflow-y-auto">
                {searchResults.map(b => {
                  const Icon = TYPE_ICON[b.type]; const color = TYPE_COLOR[b.type]; return (
                    <button key={b.id} onClick={() => navigateTo(b)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left border-b border-border/20 last:border-0">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{b.shortName}</p>
                        <p className="text-xs text-muted-foreground truncate">{b.hours}</p>
                      </div>
                      <Navigation className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─── Virtual Tour Overlay ─── */}
        <AnimatePresence>
          {isVirtualTour && (
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
              <div className="backdrop-blur-xl bg-white/95 border border-white/50 rounded-2xl p-5 shadow-2xl text-center relative overflow-hidden">
                <Badge variant="outline" className="mb-3 bg-accent/10 text-accent border-accent/20">
                  <Video className="w-3 h-3 mr-1" /> {t('map.virtualTour')}
                </Badge>
                <h3 className="text-lg font-bold text-foreground mb-2">{buildings[tourIndex]?.name}</h3>
                <p className="text-xs text-muted-foreground mb-5 line-clamp-2">{buildings[tourIndex]?.description}</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setTourIndex(i => (i - 1 + buildings.length) % buildings.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"><ChevronLeft className="w-4 h-4 text-foreground" /></button>
                  <button onClick={() => { setIsVirtualTour(false); resetNavigation(); }} className="px-6 rounded-full bg-destructive text-destructive-foreground font-semibold text-xs hover:bg-destructive/90 shadow-lg shadow-destructive/20">{t('map.endTour')}</button>
                  <button onClick={() => setTourIndex(i => (i + 1) % buildings.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"><ChevronRight className="w-4 h-4 text-foreground" /></button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Left Sidebar: Categories + Quick Access ─── */}
        <motion.div initial={{ x: -80, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
          className="absolute left-3 top-24 z-20 hidden md:block">
          <div className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-2xl shadow-lg p-2 flex flex-col gap-0.5 min-w-[160px]">
            {/* Emergency quick access */}
            <button onClick={() => navigateTo(buildings[3])}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold">{t('map.emergency')}</span>
            </button>
            <div className="border-t border-border/30 my-1 pt-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-1">{t('map.filter')}</p>
            </div>
            {categories.map(cat => {
              const Icon = cat.icon; return (
                <button key={cat.type} onClick={() => setActiveCategory(cat.type)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-left ${activeCategory === cat.type ? 'bg-white/80 shadow-sm' : 'hover:bg-white/40 text-muted-foreground hover:text-foreground'}`}>
                  <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: activeCategory === cat.type ? cat.color : undefined }} />
                  <span className="text-xs font-medium flex-1">{cat.label}</span>
                  <span className="text-[10px] text-muted-foreground/60 font-mono">{cat.count}</span>
                </button>
              );
            })}
            <div className="border-t border-border/30 mt-1 pt-1">
              <button onClick={() => { setIsVirtualTour(true); setTourIndex(0); setShowDirectory(false); }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-all w-full mb-1">
                <Video className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">{t('map.virtualTour')}</span>
              </button>
              <button onClick={() => setShowDirectory(d => !d)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/40 text-muted-foreground hover:text-foreground transition-all w-full">
                <List className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{t('map.directory')}</span>
                <ChevronDown className={`w-3 h-3 ml-auto transition-transform ${showDirectory ? 'rotate-180' : ''}`} />
              </button>
              <button onClick={resetNavigation}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/40 text-muted-foreground hover:text-foreground transition-all w-full">
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{t('map.reset')}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ─── Directory Panel ─── */}
        <AnimatePresence>
          {showDirectory && (
            <motion.div initial={{ x: -320, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -320, opacity: 0 }} transition={{ type: 'spring', damping: 25 }}
              className={`absolute top-16 bottom-0 z-20 w-72 backdrop-blur-xl bg-white/85 shadow-xl flex flex-col ${isAr ? 'right-0 md:right-[175px] border-l' : 'left-0 md:left-[175px] border-r'} border-white/50`}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/30">
                <h3 className="text-sm font-bold">{t('map.campusDirectory')}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{filteredBuildings.length} {isAr ? 'مبنى' : 'buildings'}</span>
                  <button onClick={() => setShowDirectory(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
                </div>
              </div>
              <div className="overflow-y-auto flex-1 pb-4">
                {LEGEND_TYPES.filter(t => filteredBuildings.some(b => b.type === t) || activeCategory === 'all').map(type => {
                  const group = filteredBuildings.filter(b => b.type === type);
                  if (!group.length) return null;
                  const color = TYPE_COLOR[type];
                  return (
                    <div key={type}>
                      <div className="flex items-center gap-2 px-4 py-2 sticky top-0 bg-white/80 backdrop-blur-sm border-b border-border/20">
                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color }}>{TYPE_LABEL[type]}</p>
                        <span className="text-[10px] text-muted-foreground ml-auto">{group.length}</span>
                      </div>
                      {group.map((b, i) => (
                        <motion.button key={b.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
                          onClick={() => { setSelectedBuilding(b); setShowDirectory(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/60 transition-colors text-left border-b border-border/10">
                          <div className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 text-white" style={{ background: color }}>
                            {b.id}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-foreground truncate">{b.shortName}</p>
                            <p className="text-[10px] text-muted-foreground">{b.hours}</p>
                          </div>
                          <Info className="w-3 h-3 text-muted-foreground/40 shrink-0" />
                        </motion.button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Building Info Panel (right) ─── */}
        <AnimatePresence>
          {selectedBuilding && !navigatingTo && (
            <InfoPanel building={selectedBuilding} onClose={() => setSelectedBuilding(null)} onNavigate={navigateTo} />
          )}
        </AnimatePresence>

        {/* ─── Navigation Progress Bar ─── */}
        <AnimatePresence>
          {navigatingTo && !arrived && (
            <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4">
              <div className="backdrop-blur-xl bg-white/85 border border-white/50 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl text-white text-sm font-bold flex items-center justify-center shrink-0"
                    style={{ background: TYPE_COLOR[navigatingTo.type] }}>
                    {navigatingTo.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{isAr ? `التوجه إلى ${navigatingTo.shortName}` : `Navigating to ${navigatingTo.shortName}`}</p>
                    <p className="text-xs text-muted-foreground">{isAr ? `مكتمل بنسبة ${Math.round(totalProgress * 100)}%` : `${Math.round(totalProgress * 100)}% complete`}</p>
                  </div>
                  <button onClick={() => setIsWalking(p => !p)}
                    className="w-9 h-9 rounded-full border border-primary/30 bg-primary/10 text-primary flex items-center justify-center">
                    {isWalking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={resetNavigation} className="w-9 h-9 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div className="h-full rounded-full" style={{ background: TYPE_COLOR[navigatingTo.type] }}
                    animate={{ width: `${totalProgress * 100}%` }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Arrived Banner ─── */}
        <AnimatePresence>
          {arrived && navigatingTo && (
            <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-sm px-4">
              <div className="backdrop-blur-xl bg-white/90 border border-white/50 rounded-2xl p-4 shadow-xl text-center">
                <p className="text-sm font-bold text-foreground mb-0.5">✅ {isAr ? `وصلت إلى ${navigatingTo.shortName}` : `Arrived at ${navigatingTo.shortName}`}</p>
                <p className="text-xs text-muted-foreground mb-3">{navigatingTo.hours}</p>
                <div className="flex gap-2">
                  <button onClick={() => { setSelectedBuilding(navigatingTo); setNavigatingTo(null); setArrived(false); }}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold border border-border hover:bg-muted transition-colors">
                    {isAr ? 'عرض المعلومات' : 'View Info'}
                  </button>
                  <button onClick={resetNavigation}
                    className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ background: TYPE_COLOR[navigatingTo.type] }}>
                    {isAr ? 'تم' : 'Done'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Legend ─── */}
        <Legend />

        {/* ─── Mobile bottom bar ─── */}
        <div className="md:hidden absolute bottom-24 left-4 right-4 z-20 flex gap-2">
          <button onClick={() => navigateTo(buildings[3])}
            className="flex-[0.8] backdrop-blur-xl bg-red-500/80 border border-red-400/50 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-white">
            <AlertTriangle className="w-4 h-4" /><span className="text-[11px] font-bold">{isAr ? 'طوارئ' : 'ER'}</span>
          </button>
          <button onClick={() => { setIsVirtualTour(true); setTourIndex(0); setShowDirectory(false); }}
            className="flex-1 backdrop-blur-xl bg-primary/90 border border-primary/50 rounded-xl py-2.5 flex items-center justify-center gap-1.5 text-white">
            <Video className="w-4 h-4" /><span className="text-[11px] font-bold">{t('map.tour')}</span>
          </button>
          <button onClick={() => setShowDirectory(d => !d)}
            className="flex-1 backdrop-blur-xl bg-white/70 border border-white/50 rounded-xl py-2.5 flex items-center justify-center gap-1.5">
            <List className="w-4 h-4 text-foreground" /><span className="text-[11px] font-semibold">{t('map.directory')}</span>
          </button>
          <button onClick={resetNavigation}
            className="backdrop-blur-xl bg-white/70 border border-white/50 rounded-xl px-3 py-2.5 flex items-center justify-center">
            <RotateCcw className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CampusMapPage;
