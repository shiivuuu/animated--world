// ParulVerse 3D - Campus Landscaping, Trees, Shrubs & Streetlamps
// Places palm avenues, garden trees, and functional evening street lighting

import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function CampusVegetation({ timeOfDay = 'day' }) {
  const isNight = timeOfDay === 'night';
  const isSunset = timeOfDay === 'sunset';
  const showLampLights = isNight || isSunset;

  // Generate deterministic coordinates for palm avenues along Main Gate 1
  const palmAvenue = useMemo(() => {
    const list = [];
    for (let x = -290; x <= -185; x += 15) {
      list.push({ x, z: 9, scale: 0.95 + Math.sin(x) * 0.1 });
      list.push({ x, z: -9, scale: 0.95 + Math.cos(x) * 0.1 });
    }
    return list;
  }, []);

  // Garden shade trees in Jay Sudha Botanical Garden & Watcher's Park
  const gardenTrees = useMemo(() => {
    const list = [];
    // Jay Sudha Garden clusters
    const angles = [0, 0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6];
    angles.forEach((a, i) => {
      const r = 18 + (i % 3) * 6;
      list.push({
        x: Math.cos(a) * r,
        z: Math.sin(a) * r,
        type: 'deciduous',
        scale: 1.1 + (i % 2) * 0.2
      });
    });

    // Watcher's Park clusters
    for (let dx = -25; dx <= 25; dx += 12) {
      for (let dz = -115; dz <= -70; dz += 15) {
        if (Math.hypot(dx, dz - (-90)) > 14) {
          list.push({
            x: dx + (dz % 5),
            z: dz + (dx % 4),
            type: 'broadleaf',
            scale: 1.0 + (dx * dz) % 0.3
          });
        }
      }
    }

    // West Avenue Tree Line
    for (let z = -60; z <= 240; z += 24) {
      list.push({ x: -168, z, type: 'deciduous', scale: 1.15 });
      list.push({ x: -192, z, type: 'deciduous', scale: 1.05 });
    }

    // East Campus Green Belts
    for (let z = -120; z <= 120; z += 30) {
      list.push({ x: 155, z, type: 'deciduous', scale: 1.1 });
      list.push({ x: 65, z, type: 'broadleaf', scale: 1.0 });
    }

    return list;
  }, []);

  // Streetlamps positioned along main arterial boulevards
  const streetlamps = useMemo(() => {
    const list = [];
    // Gate 1 Avenue
    for (let x = -280; x <= -190; x += 30) {
      list.push({ x, z: 8.5 });
      list.push({ x, z: -8.5 });
    }
    // West Spine
    for (let z = -60; z <= 220; z += 40) {
      list.push({ x: -172, z });
    }
    // Central East-West
    for (let x = -140; x <= 220; x += 45) {
      list.push({ x, z: 8.5 });
    }
    // North Sports Spine
    for (let z = -40; z >= -220; z -= 45) {
      list.push({ x: 8.5, z });
    }
    // South Hospital Spine
    for (let z = 60; z <= 340; z += 50) {
      list.push({ x: -72, z });
    }
    return list;
  }, []);

  return (
    <group name="campus-vegetation-group">
      {/* 1. Royal Palm Trees (Cylinder Trunk + Feather Frond Crown) */}
      {palmAvenue.map((p, idx) => (
        <group key={`palm-${idx}`} position={[p.x, 0, p.z]} scale={p.scale}>
          {/* Slender Curved Trunk */}
          <mesh position={[0, 4.5, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.45, 9, 8]} />
            <meshStandardMaterial color="#6B5B4D" roughness={0.9} />
          </mesh>
          {/* Palm Frond Crown (Multi-angled domes) */}
          <group position={[0, 9, 0]}>
            <mesh position={[0, 0.3, 0]}>
              <sphereGeometry args={[2.8, 8, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#2E6B39" roughness={0.7} />
            </mesh>
            <mesh position={[0, -0.2, 0]} rotation={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.1, 3.8, 1.2, 7]} />
              <meshStandardMaterial color="#387C44" roughness={0.8} />
            </mesh>
          </group>
        </group>
      ))}

      {/* 2. Deciduous & Broadleaf Shade Trees */}
      {gardenTrees.map((t, idx) => (
        <group key={`tree-${idx}`} position={[t.x, 0, t.z]} scale={t.scale}>
          {/* Tree Trunk */}
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.35, 0.6, 4.4, 8]} />
            <meshStandardMaterial color="#4A3C31" roughness={0.95} />
          </mesh>
          {/* Tree Foliage Canopy (Volumetric low-poly spheres) */}
          <mesh position={[0, 5.2, 0]} castShadow receiveShadow>
            <dodecahedronGeometry args={[2.8, 1]} />
            <meshStandardMaterial
              color={t.type === 'broadleaf' ? '#295E35' : '#3F7D48'}
              roughness={0.85}
              metalness={0.05}
            />
          </mesh>
          {/* Second overlapping canopy puff for organic shape */}
          <mesh position={[0.7, 6.2, 0.4]} castShadow>
            <dodecahedronGeometry args={[2.1, 1]} />
            <meshStandardMaterial color="#4B8C55" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 3. Campus Streetlamps with Functional Illumination */}
      {streetlamps.map((lamp, idx) => (
        <group key={`lamp-${idx}`} position={[lamp.x, 0, lamp.z]}>
          {/* Metal Post */}
          <mesh position={[0, 2.6, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 5.2, 8]} />
            <meshStandardMaterial color="#183D32" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Lamp Arm Horizontal */}
          <mesh position={[0.4, 5.1, 0]}>
            <boxGeometry args={[0.9, 0.08, 0.08]} />
            <meshStandardMaterial color="#183D32" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Lamp Lantern Head */}
          <mesh position={[0.8, 4.9, 0]}>
            <coneGeometry args={[0.3, 0.4, 8]} />
            <meshStandardMaterial
              color={showLampLights ? '#FFF0C2' : '#FFFFFF'}
              emissive={showLampLights ? '#FFA500' : '#000000'}
              emissiveIntensity={showLampLights ? 1.0 : 0}
            />
          </mesh>
          {/* Selective Night Point Lights (Subset for 60fps performance) */}
          {showLampLights && idx % 4 === 0 && (
            <pointLight
              position={[0.8, 4.7, 0]}
              color="#FFE199"
              intensity={isNight ? 1.4 : 0.8}
              distance={24}
              decay={2}
            />
          )}
        </group>
      ))}
    </group>
  );
}
