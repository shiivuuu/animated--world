// ParulVerse 3D - Campus Road Network, Walkways & Parking Lots
// Accurate road grid aligned with official Parul University guide map

import React from 'react';
import * as THREE from 'three';

export default function CampusRoads() {
  // Road segments: [x, z, width, length, isHorizontal]
  const roads = [
    // 1. Gate 1 Main Entrance Avenue (West to East)
    { pos: [-240, 0], size: [130, 14], rot: 0 },

    // 2. West Spine Boulevard (Runs North-South past Admin and Engineering)
    { pos: [-180, 50], size: [14, 340], rot: 0 },

    // 3. Central East-West Boulevard (Crosses from West Admin, through Garden, to East Campus)
    { pos: [20, 0], size: [340, 14], rot: 0 },

    // 4. North Sports Boulevard (From Central Garden up to Stadium and Gate 3)
    { pos: [0, -170], size: [14, 300], rot: 0 },

    // 5. South Hospital Boulevard (From Central Garden down to Sevashram Hospital & Gate 2)
    { pos: [-80, 210], size: [14, 400], rot: 0 },

    // 6. East Technology Avenue (Connects Applied Sciences, PIT, Bhagat Singh, C.V. Raman)
    { pos: [140, 30], size: [14, 240], rot: 0 },

    // 7. South-East Residential Loop (Girls Hostels: Teresa, Shakuntala, Kalpana)
    { pos: [220, 190], size: [12, 170], rot: 0 },
    { pos: [180, 250], size: [110, 12], rot: 0 },

    // 8. North-East Residential Loop (Boys Hostels: Kalam, Shastri, Atal, Pool)
    { pos: [220, -190], size: [12, 190], rot: 0 },
    { pos: [140, -150], size: [140, 12], rot: 0 },

    // 9. Engineering Inner Link Road (Between PIET and Management)
    { pos: [-140, 95], size: [100, 10], rot: 0 },
    { pos: [-70, 140], size: [12, 110], rot: 0 }
  ];

  // Parking Zones: [x, z, width, length, label]
  const parkings = [
    { pos: [-240, -45], size: [60, 45], label: "P1 Visitor Parking" },
    { pos: [-180, -115], size: [45, 35], label: "P2 Staff 2-Wheeler" },
    { pos: [-140, -115], size: [45, 35], label: "P3 Student 2-Wheeler" },
    { pos: [70, -290], size: [80, 50], label: "P4 Bus Terminal & Pick-Up" },
    { pos: [290, -110], size: [45, 40], label: "P5 Staff 4-Wheeler" },
    { pos: [-5, -60], size: [35, 25], label: "P6 Admin Parking" },
    { pos: [-80, 140], size: [40, 35], label: "P7 Management Parking" },
    { pos: [-130, 350], size: [50, 40], label: "P8 Hospital Emergency Parking" }
  ];

  return (
    <group name="campus-roads-group">
      {/* 1. Asphalt Road Segments */}
      {roads.map((road, idx) => (
        <group key={`road-${idx}`} position={[road.pos[0], 0.02, road.pos[1]]}>
          {/* Main Dark Asphalt Surface */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[road.size[0], road.size[1]]} />
            <meshStandardMaterial
              color="#282B2D" // Realistic smooth road asphalt
              roughness={0.82}
              metalness={0.1}
            />
          </mesh>

          {/* Concrete Sidewalk Borders (Left and Right) */}
          {road.size[0] > road.size[1] ? (
            // Horizontal Road: sidewalks on top and bottom
            <>
              <mesh position={[0, 0.08, road.size[1] / 2 + 1]}>
                <boxGeometry args={[road.size[0], 0.16, 2]} />
                <meshStandardMaterial color="#B0A99E" roughness={0.7} />
              </mesh>
              <mesh position={[0, 0.08, -road.size[1] / 2 - 1]}>
                <boxGeometry args={[road.size[0], 0.16, 2]} />
                <meshStandardMaterial color="#B0A99E" roughness={0.7} />
              </mesh>
              {/* White Dashed Center Lane Marking */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[road.size[0] * 0.9, 0.35]} />
                <meshBasicMaterial color="#E8ECE9" />
              </mesh>
            </>
          ) : (
            // Vertical Road: sidewalks on left and right
            <>
              <mesh position={[road.size[0] / 2 + 1, 0.08, 0]}>
                <boxGeometry args={[2, 0.16, road.size[1]]} />
                <meshStandardMaterial color="#B0A99E" roughness={0.7} />
              </mesh>
              <mesh position={[-road.size[0] / 2 - 1, 0.08, 0]}>
                <boxGeometry args={[2, 0.16, road.size[1]]} />
                <meshStandardMaterial color="#B0A99E" roughness={0.7} />
              </mesh>
              {/* White Dashed Center Lane Marking */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <planeGeometry args={[0.35, road.size[1] * 0.9]} />
                <meshBasicMaterial color="#E8ECE9" />
              </mesh>
            </>
          )}
        </group>
      ))}

      {/* 2. Campus Parking Lots (P1 - P8) */}
      {parkings.map((pkg, idx) => (
        <group key={`pkg-${idx}`} position={[pkg.pos[0], 0.03, pkg.pos[1]]}>
          {/* Parking Paved Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[pkg.size[0], pkg.size[1]]} />
            <meshStandardMaterial color="#353A3D" roughness={0.8} />
          </mesh>
          {/* Parking Kerb Border */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[pkg.size[0] + 0.8, 0.12, pkg.size[1] + 0.8]} />
            <meshStandardMaterial color="#948E84" roughness={0.7} wireframe />
          </mesh>
          {/* Parking Stall White Lines */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <planeGeometry args={[pkg.size[0] * 0.85, pkg.size[1] * 0.85]} />
            <meshBasicMaterial color="#CBD5E1" wireframe />
          </mesh>
        </group>
      ))}

      {/* 3. Zebra Crosswalks at Key Intersections */}
      {[
        [-180, 0], // West Spine & Central Blvd
        [0, 0],    // Central Garden Circle
        [0, -120], // Watcher's Park & Stadium
        [-80, 80], // Food Court & Mgmt junction
        [140, 0]   // East Tech & Central Blvd
      ].map((pos, idx) => (
        <group key={`crosswalk-${idx}`} position={[pos[0], 0.035, pos[1]]}>
          {[-4, -2, 0, 2, 4].map((offset, i) => (
            <mesh key={`bar-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[offset, 0, 0]}>
              <planeGeometry args={[1.2, 8]} />
              <meshBasicMaterial color="#FFFFFF" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
