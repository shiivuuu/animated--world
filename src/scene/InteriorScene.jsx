// ParulVerse 3D - Detailed Enterable 3D Interior Environments
// High-fidelity procedural room models for Central Library, Smart Lecture Hall & AI Supercomputing Lab

import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { INTERIOR_ROOMS } from '../data/interiorRooms.js';

export default function InteriorScene({ roomId = 'central-library', onHotspotSelect }) {
  const room = INTERIOR_ROOMS[roomId] || INTERIOR_ROOMS['central-library'];
  const [activeHotspot, setActiveHotspot] = useState(null);

  const { roomWidth: rw, roomLength: rl, ceilingHeight: ch, floorColor, wallColor } = room;

  return (
    <group name="interior-scene-root">
      {/* 1. Interior Lighting System */}
      <ambientLight intensity={0.75} color={room.ambientColor || '#FFFFFF'} />
      <directionalLight position={[0, ch - 0.5, 0]} intensity={1.4} color="#FFFDF0" />

      {/* Recessed Ceiling LED Grid Lights */}
      {[-rw / 3, 0, rw / 3].map((x, i) =>
        [-rl / 3, 0, rl / 3].map((z, j) => (
          <group key={`light-${i}-${j}`} position={[x, ch - 0.05, z]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <planeGeometry args={[1.8, 1.8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
            <pointLight intensity={0.65} distance={12} color="#FFF9EB" />
          </group>
        ))
      )}

      {/* 2. Room Shell (Floor, Ceiling, 4 Walls) */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[rw, rl]} />
        <meshStandardMaterial color={floorColor} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ch, 0]}>
        <planeGeometry args={[rw, rl]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
      </mesh>

      {/* Back Wall (North) */}
      <mesh position={[0, ch / 2, -rl / 2]}>
        <planeGeometry args={[rw, ch]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Front Wall (South with Entrance Double Doorway) */}
      <mesh position={[-rw / 4 - 1.5, ch / 2, rl / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[rw / 2 - 3, ch]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>
      <mesh position={[rw / 4 + 1.5, ch / 2, rl / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[rw / 2 - 3, ch]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>
      {/* Entrance Glass Doorway Frame */}
      <group position={[0, 1.4, rl / 2 - 0.1]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[3.2, 2.8]} />
          <meshStandardMaterial color="#183D32" roughness={0.2} metalness={0.7} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Left Wall (West) */}
      <mesh position={[-rw / 2, ch / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[rl, ch]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* Right Wall (East with Windows) */}
      <mesh position={[rw / 2, ch / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[rl, ch]} />
        <meshStandardMaterial color={wallColor} roughness={0.7} />
      </mesh>

      {/* 3. Room-Specific Furniture & Equipment */}
      {/* === ROOM A: CENTRAL LIBRARY === */}
      {room.id === 'central-library' && (
        <group name="library-furniture">
          {/* Main Circulation / Reception Counter */}
          <group position={[0, 0.6, 7]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[7, 1.2, 1.4]} />
              <meshStandardMaterial color="#3E2723" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.62, 0]}>
              <boxGeometry args={[7.2, 0.08, 1.6]} />
              <meshStandardMaterial color="#E0D2C0" roughness={0.3} />
            </mesh>
          </group>

          {/* Rows of Wooden Bookshelves with Books */}
          {[-7, 7].map((rowX, rIdx) =>
            [-7, -2, 3].map((rowZ, cIdx) => (
              <group key={`shelf-${rIdx}-${cIdx}`} position={[rowX, 1.5, rowZ]}>
                {/* Shelf Upright Frame */}
                <mesh castShadow>
                  <boxGeometry args={[1.4, 3.0, 4.2]} />
                  <meshStandardMaterial color="#4E342E" roughness={0.6} />
                </mesh>
                {/* Colorful Book Spines on Front & Back */}
                <mesh position={[0.72, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                  <planeGeometry args={[4.0, 2.6]} />
                  <meshStandardMaterial color="#C8963E" roughness={0.8} />
                </mesh>
                <mesh position={[-0.72, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                  <planeGeometry args={[4.0, 2.6]} />
                  <meshStandardMaterial color="#1B4965" roughness={0.8} />
                </mesh>
              </group>
            ))
          )}

          {/* Central Study Tables with Green Banker Lamps */}
          {[-3, 3].map((tZ, idx) => (
            <group key={`table-${idx}`} position={[0, 0.42, tZ]}>
              {/* Table Top */}
              <mesh castShadow receiveShadow>
                <boxGeometry args={[5.5, 0.08, 2.4]} />
                <meshStandardMaterial color="#5D4037" roughness={0.4} />
              </mesh>
              {/* Table Legs */}
              {[-2.5, 2.5].map((lx) =>
                [-1.0, 1.0].map((lz) => (
                  <mesh key={`leg-${lx}-${lz}`} position={[lx, -0.4, lz]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.8]} />
                    <meshStandardMaterial color="#212121" metalness={0.8} />
                  </mesh>
                ))
              )}
              {/* Brass / Emerald Banker Lamp */}
              <mesh position={[0, 0.22, 0]}>
                <cylinderGeometry args={[0.15, 0.15, 0.08, 16]} />
                <meshStandardMaterial color="#2E7D32" roughness={0.2} metalness={0.6} />
              </mesh>
              <pointLight position={[0, 0.35, 0]} intensity={0.6} distance={4} color="#FFF8E7" />
            </group>
          ))}
        </group>
      )}

      {/* === ROOM B: SMART CLASSROOM === */}
      {room.id === 'smart-classroom' && (
        <group name="classroom-furniture">
          {/* Tiered Lecture Stepped Floor */}
          {[1, 2, 3].map((tier, idx) => (
            <mesh key={`tier-${idx}`} position={[0, 0.25 * tier, tier * 3 - 2]}>
              <boxGeometry args={[rw - 2, 0.5 * tier, 2.8]} />
              <meshStandardMaterial color="#303A36" roughness={0.7} />
            </mesh>
          ))}

          {/* Front Teacher's Smart Digital Podium */}
          <group position={[-2.5, 0.65, -8.5]}>
            <mesh castShadow>
              <boxGeometry args={[1.4, 1.3, 0.9]} />
              <meshStandardMaterial color="#183D32" roughness={0.4} />
            </mesh>
            {/* Touchscreen Tablet Display */}
            <mesh position={[0, 0.7, 0]} rotation={[-0.4, 0, 0]}>
              <planeGeometry args={[0.7, 0.45]} />
              <meshBasicMaterial color="#00E5FF" />
            </mesh>
          </group>

          {/* Ultra-Wide 4K Laser Projection Screen */}
          <group position={[0, 2.8, -rl / 2 + 0.1]}>
            <mesh>
              <planeGeometry args={[11, 3.4]} />
              <meshStandardMaterial
                color="#001F3F"
                emissive="#003366"
                emissiveIntensity={0.6}
                roughness={0.2}
              />
            </mesh>
            {/* Screen Slide Title */}
            <Html position={[0, 0.3, 0.1]} center transform distanceFactor={14}>
              <div className="bg-slate-900/90 text-white p-4 rounded-xl border border-cyan-500/40 w-96 text-center select-none shadow-2xl">
                <p className="text-xs font-mono text-cyan-400">FACULTY OF ENGINEERING & TECHNOLOGY</p>
                <h4 className="text-base font-bold mt-1 text-[#E2B357]">Smart Lecture Hall 204</h4>
                <p className="text-xs text-slate-300 mt-1">Machine Learning & Neural Architectures</p>
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* === ROOM C: AI SUPERCOMPUTING LAB === */}
      {room.id === 'ai-lab' && (
        <group name="ai-lab-furniture">
          {/* Central Enterprise Server Racks with Blinking Status LEDs */}
          {[-6, 6].map((rx, rIdx) =>
            [-6, -1, 4].map((rz, cIdx) => (
              <group key={`rack-${rIdx}-${cIdx}`} position={[rx, 1.5, rz]}>
                {/* Black Matte Steel Server Cabinet */}
                <mesh castShadow>
                  <boxGeometry args={[1.8, 3.0, 1.2]} />
                  <meshStandardMaterial color="#0E1318" roughness={0.3} metalness={0.9} />
                </mesh>
                {/* Server Front Louvers with Glowing Cyan/Blue Status Lights */}
                <mesh position={[0, 0, 0.62]}>
                  <planeGeometry args={[1.5, 2.7]} />
                  <meshStandardMaterial
                    color="#00E5FF"
                    emissive="#0080FF"
                    emissiveIntensity={0.8}
                    wireframe
                  />
                </mesh>
              </group>
            ))
          )}

          {/* Central Autonomous Mobile Robot (AMR Rover Testbed) */}
          <group position={[0, 0.35, -1]}>
            <mesh castShadow>
              <boxGeometry args={[1.4, 0.5, 1.8]} />
              <meshStandardMaterial color="#FF9900" roughness={0.4} metalness={0.6} />
            </mesh>
            {/* LiDAR Top Turret */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
              <meshStandardMaterial color="#111111" metalness={0.9} />
            </mesh>
          </group>

          {/* Developer Workstations with Dual Monitors */}
          {[-2.5, 2.5].map((wx, idx) => (
            <group key={`workstation-${idx}`} position={[wx, 0.45, 6]}>
              <mesh castShadow>
                <boxGeometry args={[3.2, 0.08, 1.4]} />
                <meshStandardMaterial color="#2B3642" roughness={0.4} />
              </mesh>
              {/* Dual Monitors */}
              <mesh position={[-0.7, 0.45, -0.3]} rotation={[0, 0.1, 0]}>
                <boxGeometry args={[1.1, 0.65, 0.06]} />
                <meshBasicMaterial color="#00E5FF" />
              </mesh>
              <mesh position={[0.7, 0.45, -0.3]} rotation={[0, -0.1, 0]}>
                <boxGeometry args={[1.1, 0.65, 0.06]} />
                <meshBasicMaterial color="#76FF03" />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* 4. Interactive Hotspot Markers in 3D Space */}
      {room.hotspots.map((hs) => {
        const isSelected = activeHotspot?.id === hs.id;
        return (
          <group key={hs.id} position={hs.position}>
            {/* Glowing Pulsing Hotspot Sphere */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(hs);
                if (onHotspotSelect) onHotspotSelect(hs);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'auto';
              }}
            >
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#E2B357' : '#00E5FF'}
                emissive={isSelected ? '#FFA500' : '#00B0FF'}
                emissiveIntensity={1.0}
              />
            </mesh>

            {/* Floating HTML Label */}
            <Html position={[0, 0.55, 0]} center distanceFactor={12}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(hs);
                  if (onHotspotSelect) onHotspotSelect(hs);
                }}
                className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-lg border backdrop-blur-md transition-transform whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#183D32] text-white border-[#E2B357] scale-110 ring-2 ring-[#E2B357]'
                    : 'bg-white/90 text-slate-800 border-slate-300 hover:scale-105'
                }`}
              >
                {hs.title}
              </button>
            </Html>
          </group>
        );
      })}

      {/* Orbit Controls for Interior Inspection */}
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={2}
        maxDistance={Math.max(rw, rl) * 0.75}
        maxPolarAngle={Math.PI / 2.05} // Do not dip below room floor
      />
    </group>
  );
}
