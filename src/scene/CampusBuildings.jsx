// ParulVerse 3D - Procedural & Detailed Architectural 3D Campus Buildings
// Full interactive meshes for all 42+ campus buildings with hover, selection, and custom landmarks

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { BUILDINGS } from '../data/buildings.js';

export default function CampusBuildings({
  selectedBuildingId,
  onSelectBuilding,
  timeOfDay = 'day'
}) {
  const [hoveredId, setHoveredId] = useState(null);

  const isNight = timeOfDay === 'night';
  const isSunset = timeOfDay === 'sunset';

  return (
    <group name="campus-buildings-group">
      {BUILDINGS.map((b) => {
        const isSelected = selectedBuildingId === b.id;
        const isHovered = hoveredId === b.id;

        const { x, y, z } = b.position;
        const { width: w, depth: d, height: h } = b.dimensions;

        // Facade color with dynamic emissive highlight
        const baseColor = b.color || '#E8E2D7';
        const roofColor = b.roofColor || '#183D32';

        // Window glow in evening/night
        const windowColor = isNight ? '#FFE599' : '#3C5261';
        const windowEmissive = isNight ? '#FFA500' : isSunset ? '#FF7A00' : '#000000';
        const windowEmissiveIntensity = isNight ? 0.9 : isSunset ? 0.35 : 0;

        return (
          <group
            key={b.id}
            position={[x, y, z]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectBuilding(b.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(b.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredId(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* 1. Building Plinth / Base Foundation */}
            <mesh position={[0, 0.4, 0]} receiveShadow castShadow>
              <boxGeometry args={[w + 1.2, 0.8, d + 1.2]} />
              <meshStandardMaterial
                color="#8F877A"
                roughness={0.8}
              />
            </mesh>

            {/* 2. Main Architectural Building Mass */}
            <mesh position={[0, h / 2 + 0.8, 0]} castShadow receiveShadow>
              <boxGeometry args={[w, h, d]} />
              <meshStandardMaterial
                color={isSelected ? '#F0D078' : isHovered ? '#DFE9E3' : baseColor}
                roughness={0.65}
                metalness={0.15}
                emissive={isSelected ? '#E2B357' : isHovered ? '#83B7A1' : '#000000'}
                emissiveIntensity={isSelected ? 0.35 : isHovered ? 0.2 : 0}
              />
            </mesh>

            {/* 3. Horizontal Ribbon Windows for each floor */}
            {Array.from({ length: Math.min(b.floors || 4, 6) }).map((_, fIdx) => {
              const floorHeight = h / (b.floors || 4);
              const floorY = 0.8 + floorHeight * fIdx + floorHeight * 0.45;
              const winH = floorHeight * 0.38;

              return (
                <group key={`floors-${fIdx}`}>
                  {/* Front & Back Window Ribbons */}
                  <mesh position={[0, floorY, d / 2 + 0.08]}>
                    <planeGeometry args={[w * 0.88, winH]} />
                    <meshStandardMaterial
                      color={windowColor}
                      roughness={0.2}
                      metalness={0.7}
                      emissive={windowEmissive}
                      emissiveIntensity={windowEmissiveIntensity}
                    />
                  </mesh>
                  <mesh
                    position={[0, floorY, -d / 2 - 0.08]}
                    rotation={[0, Math.PI, 0]}
                  >
                    <planeGeometry args={[w * 0.88, winH]} />
                    <meshStandardMaterial
                      color={windowColor}
                      roughness={0.2}
                      metalness={0.7}
                      emissive={windowEmissive}
                      emissiveIntensity={windowEmissiveIntensity}
                    />
                  </mesh>
                  {/* Left & Right Side Window Ribbons */}
                  <mesh
                    position={[w / 2 + 0.08, floorY, 0]}
                    rotation={[0, Math.PI / 2, 0]}
                  >
                    <planeGeometry args={[d * 0.82, winH]} />
                    <meshStandardMaterial
                      color={windowColor}
                      roughness={0.2}
                      metalness={0.7}
                      emissive={windowEmissive}
                      emissiveIntensity={windowEmissiveIntensity}
                    />
                  </mesh>
                  <mesh
                    position={[-w / 2 - 0.08, floorY, 0]}
                    rotation={[0, -Math.PI / 2, 0]}
                  >
                    <planeGeometry args={[d * 0.82, winH]} />
                    <meshStandardMaterial
                      color={windowColor}
                      roughness={0.2}
                      metalness={0.7}
                      emissive={windowEmissive}
                      emissiveIntensity={windowEmissiveIntensity}
                    />
                  </mesh>
                </group>
              );
            })}

            {/* 4. Rooftop Parapet Wall & Roof Deck */}
            <mesh position={[0, h + 0.9, 0]} receiveShadow>
              <boxGeometry args={[w - 0.4, 0.4, d - 0.4]} />
              <meshStandardMaterial color={roofColor} roughness={0.7} />
            </mesh>
            {/* Parapet Rim */}
            <mesh position={[0, h + 1.3, 0]}>
              <boxGeometry args={[w + 0.2, 0.6, d + 0.2]} />
              <meshStandardMaterial color="#8F877A" roughness={0.8} />
            </mesh>
            {/* Rooftop HVAC Utility Pods & Solar Arrays */}
            <mesh position={[w * 0.2, h + 1.6, -d * 0.15]} castShadow>
              <boxGeometry args={[w * 0.25, 1.4, d * 0.25]} />
              <meshStandardMaterial color="#68737D" roughness={0.5} metalness={0.5} />
            </mesh>

            {/* 5. Entrance Grand Portico Canopy with Pillars */}
            <group position={[0, 0, d / 2 + 3.5]}>
              {/* Canopy Roof Slab */}
              <mesh position={[0, 4.2, 0]} castShadow>
                <boxGeometry args={[w * 0.4, 0.6, 6]} />
                <meshStandardMaterial color={roofColor} roughness={0.5} />
              </mesh>
              {/* Left & Right Support Colonnade Pillars */}
              <mesh position={[-w * 0.16, 2.1, 2.2]} castShadow>
                <cylinderGeometry args={[0.4, 0.5, 4.2, 16]} />
                <meshStandardMaterial color="#DDD6C8" roughness={0.6} />
              </mesh>
              <mesh position={[w * 0.16, 2.1, 2.2]} castShadow>
                <cylinderGeometry args={[0.4, 0.5, 4.2, 16]} />
                <meshStandardMaterial color="#DDD6C8" roughness={0.6} />
              </mesh>
              {/* Glass Entrance Double Doors */}
              <mesh position={[0, 1.8, -3.2]}>
                <planeGeometry args={[4.5, 3.2]} />
                <meshStandardMaterial
                  color="#263238"
                  roughness={0.1}
                  metalness={0.8}
                />
              </mesh>
            </group>

            {/* 6. Special Landmark Customization */}
            {/* Main Gate 1 Triumphal Archway */}
            {b.id === 'gate1-main-vip' && (
              <group position={[0, 4, 0]}>
                {/* Central Arch Header */}
                <mesh position={[0, 6, 0]} castShadow>
                  <boxGeometry args={[26, 3.5, 6]} />
                  <meshStandardMaterial color="#183D32" roughness={0.5} />
                </mesh>
                {/* Gold Inscription Plaque */}
                <mesh position={[0, 6, 3.1]}>
                  <planeGeometry args={[20, 2]} />
                  <meshStandardMaterial
                    color="#E2B357"
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
              </group>
            )}

            {/* Central Library C1 Golden Rotunda Dome */}
            {b.id === 'c1-admin-library' && (
              <group position={[0, h + 1.2, 0]}>
                <mesh position={[0, 2.5, 0]} castShadow>
                  <cylinderGeometry args={[7, 9, 4, 32]} />
                  <meshStandardMaterial
                    color="#4A7568"
                    roughness={0.3}
                    metalness={0.4}
                  />
                </mesh>
                <mesh position={[0, 5.5, 0]} castShadow>
                  <sphereGeometry args={[4.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial
                    color="#E2B357"
                    metalness={0.85}
                    roughness={0.2}
                  />
                </mesh>
              </group>
            )}

            {/* Sevashram Hospital E2 Red Cross Emergency Crest */}
            {b.id === 'e2-parul-sevashram-hospital' && (
              <group position={[0, h + 2.5, d / 2 + 0.1]}>
                {/* White circular badge */}
                <mesh position={[0, 0, 0]}>
                  <circleGeometry args={[3, 32]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
                {/* Red cross vertical bar */}
                <mesh position={[0, 0, 0.05]}>
                  <planeGeometry args={[1.2, 4.4]} />
                  <meshBasicMaterial color="#E02424" />
                </mesh>
                {/* Red cross horizontal bar */}
                <mesh position={[0, 0, 0.06]}>
                  <planeGeometry args={[4.4, 1.2]} />
                  <meshBasicMaterial color="#E02424" />
                </mesh>
              </group>
            )}

            {/* C.V. Raman Centre A25 High-Tech Glowing Data Core */}
            {b.id === 'a25-cv-raman-centre' && (
              <mesh position={[0, h + 2, 0]}>
                <octahedronGeometry args={[3.5]} />
                <meshStandardMaterial
                  color="#00E5FF"
                  emissive="#00B0FF"
                  emissiveIntensity={0.8}
                  roughness={0.1}
                  metalness={0.9}
                  wireframe
                />
              </mesh>
            )}

            {/* 7. Floating 3D Badge Pin (Visible when hovered or selected, or high zoom) */}
            <Html
              position={[0, h + 5.5, 0]}
              center
              distanceFactor={180}
              zIndexRange={[10, 50]}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectBuilding(b.id);
                }}
                className={`transition-all duration-300 cursor-pointer select-none flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg font-sans whitespace-nowrap text-xs font-semibold ${
                  isSelected
                    ? 'bg-[#183D32] text-white ring-4 ring-[#E2B357] scale-125 z-50'
                    : isHovered
                    ? 'bg-[#83B7A1] text-[#183D32] ring-2 ring-white scale-110'
                    : 'bg-white/95 text-[#262D2A] border border-gray-200/80 hover:bg-[#F7F5EF]'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{
                    backgroundColor:
                      b.category === 'medical'
                        ? '#E05A47'
                        : b.category === 'sports'
                        ? '#38A169'
                        : b.category === 'hostel'
                        ? '#4A6FA5'
                        : '#183D32'
                  }}
                />
                <span className="font-bold text-[11px] text-[#183D32]">{b.code}</span>
                <span className="max-w-[130px] truncate text-[11px]">{b.shortName || b.name}</span>
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
