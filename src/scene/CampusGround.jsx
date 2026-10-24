// ParulVerse 3D - Campus Ground, Terrain & Boundaries
// Covers 250+ acres with realistic lush turf, perimeter walls, paved plazas and Highway SH-158

import React from 'react';
import * as THREE from 'three';

export default function CampusGround({ satelliteMode = false }) {
  return (
    <group name="campus-ground-group">
      {/* 1. Main Campus Lawn Terrain Plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 10]}
        receiveShadow
      >
        <planeGeometry args={[780, 880, 64, 64]} />
        <meshStandardMaterial
          color="#3A5C43" // Rich manicured campus lawn green
          roughness={0.88}
          metalness={0.05}
        />
      </mesh>

      {/* 2. Sub-soil Earth Base */}
      <mesh position={[0, -1.0, 10]}>
        <boxGeometry args={[782, 1.8, 882]} />
        <meshStandardMaterial color="#2B362F" roughness={0.9} />
      </mesh>

      {/* 3. Highway SH-158 (Waghodia Road) along Western Boundary */}
      <group position={[-340, 0.02, 10]}>
        {/* Highway Asphalt Road Bed */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[44, 880]} />
          <meshStandardMaterial color="#2A2E2F" roughness={0.7} />
        </mesh>
        {/* Yellow Central Median Line */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[0.8, 880]} />
          <meshBasicMaterial color="#E2B357" />
        </mesh>
        {/* Highway Sidewalk Curb */}
        <mesh position={[23, 0.25, 0]}>
          <boxGeometry args={[2, 0.5, 880]} />
          <meshStandardMaterial color="#A3A8A5" roughness={0.8} />
        </mesh>
      </group>

      {/* 4. Campus Perimeter Wall & Security Fencing */}
      {/* North Wall */}
      <mesh position={[0, 1.5, -425]}>
        <boxGeometry args={[720, 3, 1.2]} />
        <meshStandardMaterial color="#DDD6C8" roughness={0.8} />
      </mesh>
      {/* South Wall */}
      <mesh position={[0, 1.5, 445]}>
        <boxGeometry args={[720, 3, 1.2]} />
        <meshStandardMaterial color="#DDD6C8" roughness={0.8} />
      </mesh>
      {/* East Wall */}
      <mesh position={[385, 1.5, 10]}>
        <boxGeometry args={[1.2, 3, 870]} />
        <meshStandardMaterial color="#DDD6C8" roughness={0.8} />
      </mesh>
      {/* West Wall (with Gate Openings) */}
      <mesh position={[-317, 1.5, -210]}>
        <boxGeometry args={[1.2, 3, 410]} />
        <meshStandardMaterial color="#DDD6C8" roughness={0.8} />
      </mesh>
      <mesh position={[-317, 1.5, 230]}>
        <boxGeometry args={[1.2, 3, 420]} />
        <meshStandardMaterial color="#DDD6C8" roughness={0.8} />
      </mesh>

      {/* 5. Central Garden Fountain Base & Jay Sudha Promenade */}
      <group position={[0, 0.05, 0]}>
        {/* Circular Paved Plaza */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[32, 48]} />
          <meshStandardMaterial color="#C5BDB0" roughness={0.65} />
        </mesh>
        {/* Outer Decorative Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <ringGeometry args={[30, 33, 48]} />
          <meshStandardMaterial color="#183D32" roughness={0.8} />
        </mesh>
        {/* Fountain Water Pool */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
          <circleGeometry args={[12, 36]} />
          <meshStandardMaterial
            color="#2B8282"
            roughness={0.15}
            metalness={0.7}
            transparent
            opacity={0.88}
          />
        </mesh>
        {/* Fountain Tiered Stone Rim */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[12.4, 12.6, 0.7, 36, 1, true]} />
          <meshStandardMaterial color="#DDD4C5" roughness={0.7} />
        </mesh>
        {/* Center Fountain Spout Pedestal */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[1.8, 2.5, 1.6, 16]} />
          <meshStandardMaterial color="#E2B357" roughness={0.4} metalness={0.3} />
        </mesh>
      </group>

      {/* 6. Food Court Outdoor Seating Deck */}
      <mesh position={[30, 0.08, 60]} receiveShadow>
        <boxGeometry args={[65, 0.16, 45]} />
        <meshStandardMaterial color="#D8CFBF" roughness={0.7} />
      </mesh>

      {/* 7. Watcher's Park Amphitheater Tiered Grass Mounds */}
      <group position={[0, 0, -90]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[28, 32, 0.8, 32]} />
          <meshStandardMaterial color="#4A7550" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[20, 24, 0.8, 32]} />
          <meshStandardMaterial color="#55865C" roughness={0.9} />
        </mesh>
        {/* Amphitheater Circular Stage */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[9, 10, 0.4, 32]} />
          <meshStandardMaterial color="#D4C9B8" roughness={0.6} />
        </mesh>
      </group>

      {/* 8. Olympic Swimming Pool Water & Tile Basin */}
      <group position={[190, 0, -150]}>
        {/* Surrounding Pool Deck */}
        <mesh position={[0, 0.08, 0]} receiveShadow>
          <boxGeometry args={[60, 0.16, 42]} />
          <meshStandardMaterial color="#E8E2D7" roughness={0.6} />
        </mesh>
        {/* Pool Water Surface */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
          <planeGeometry args={[50, 25]} />
          <meshStandardMaterial
            color="#00A2C7"
            roughness={0.08}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Blue Tile Perimeter Border */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
          <ringGeometry args={[13.5, 14.5, 4]} />
          <meshBasicMaterial color="#005B82" />
        </mesh>
      </group>

      {/* 9. Sports Stadium (G8) Football Turf & Running Track */}
      <group position={[0, 0, -240]}>
        {/* 400m Synthetic Red Running Track */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
          <planeGeometry args={[116, 82]} />
          <meshStandardMaterial color="#A84332" roughness={0.85} />
        </mesh>
        {/* Inner Natural Grass Pitch */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]} receiveShadow>
          <planeGeometry args={[98, 64]} />
          <meshStandardMaterial color="#2E6B39" roughness={0.7} />
        </mesh>
        {/* White Pitch Field Markings */}
        {/* Outer boundary */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
          <planeGeometry args={[92, 58]} />
          <meshStandardMaterial color="#FFFFFF" wireframe />
        </mesh>
        {/* Center circle */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
          <circleGeometry args={[9.15, 32]} />
          <meshStandardMaterial color="#FFFFFF" wireframe />
        </mesh>
        {/* Concrete Spectator Grandstands (South & North) */}
        <mesh position={[0, 3.5, 44]}>
          <boxGeometry args={[100, 7, 8]} />
          <meshStandardMaterial color="#BFB7A8" roughness={0.8} />
        </mesh>
        <mesh position={[0, 3.5, -44]}>
          <boxGeometry args={[100, 7, 8]} />
          <meshStandardMaterial color="#BFB7A8" roughness={0.8} />
        </mesh>
      </group>

      {/* 10. G7 Multi-Purpose Hard Courts (Acrylic Blue & Green) */}
      <group position={[-80, 0, -170]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <planeGeometry args={[64, 44]} />
          <meshStandardMaterial color="#1D6FA5" roughness={0.7} />
        </mesh>
        {/* Basketball Key & Court White Lines */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
          <planeGeometry args={[56, 36]} />
          <meshStandardMaterial color="#FFFFFF" wireframe />
        </mesh>
      </group>
    </group>
  );
}
