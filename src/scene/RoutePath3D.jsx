// ParulVerse 3D - Animated Walking Route Ribbon & Destination Beacon
// Renders dynamic glowing path calculated by A* pathfinder

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RoutePath3D({ activeRoute }) {
  const lineRef = useRef();
  const beaconRef = useRef();

  // Create curve and tubular geometry from 3D points
  const { curve, endPoint, startPoint } = useMemo(() => {
    if (!activeRoute || !activeRoute.points3D || activeRoute.points3D.length < 2) {
      return { curve: null, endPoint: null, startPoint: null };
    }

    const vectors = activeRoute.points3D.map(
      (p) => new THREE.Vector3(p[0], 0.45, p[2])
    );

    const catmull = new THREE.CatmullRomCurve3(vectors, false, 'catmullrom', 0.15);
    return {
      curve: catmull,
      startPoint: vectors[0],
      endPoint: vectors[vectors.length - 1]
    };
  }, [activeRoute]);

  // Animate pulse & beacon rotation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beaconRef.current) {
      beaconRef.current.rotation.y = t * 2.5;
      beaconRef.current.position.y = endPoint.y + 4 + Math.sin(t * 3) * 0.8;
    }
  });

  if (!curve) return null;

  return (
    <group name="route-path-3d">
      {/* 1. Glowing Pathway Tube / Ribbon */}
      <mesh ref={lineRef}>
        <tubeGeometry args={[curve, 80, 0.45, 8, false]} />
        <meshStandardMaterial
          color="#38A169"
          emissive="#83B7A1"
          emissiveIntensity={0.85}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* 2. Flat Ground Indicator Ribbon under the tube */}
      {activeRoute.points3D.slice(0, -1).map((p, i) => {
        const next = activeRoute.points3D[i + 1];
        const midX = (p[0] + next[0]) / 2;
        const midZ = (p[2] + next[2]) / 2;
        const dist = Math.hypot(next[0] - p[0], next[2] - p[2]);
        const angle = Math.atan2(next[0] - p[0], next[2] - p[2]);

        return (
          <mesh
            key={`seg-${i}`}
            position={[midX, 0.12, midZ]}
            rotation={[-Math.PI / 2, 0, -angle + Math.PI / 2]}
          >
            <planeGeometry args={[dist, 1.4]} />
            <meshBasicMaterial
              color="#38A169"
              transparent
              opacity={0.45}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}

      {/* 3. Start Point Pulse Ring */}
      {startPoint && (
        <group position={[startPoint.x, 0.2, startPoint.z]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.2, 1.8, 32]} />
            <meshBasicMaterial color="#183D32" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshStandardMaterial color="#183D32" emissive="#38A169" emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}

      {/* 4. Destination Holographic Animated Beacon Pin */}
      {endPoint && (
        <group position={[endPoint.x, endPoint.y, endPoint.z]}>
          {/* Pulsing Target Rings on Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
            <ringGeometry args={[2.5, 3.2, 32]} />
            <meshBasicMaterial color="#E2B357" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.16, 0]}>
            <circleGeometry args={[1.5, 32]} />
            <meshBasicMaterial color="#E05A47" />
          </mesh>

          {/* Floating Rotating Beacon Diamond */}
          <group ref={beaconRef}>
            <mesh>
              <octahedronGeometry args={[2.0]} />
              <meshStandardMaterial
                color="#E2B357"
                emissive="#E2B357"
                emissiveIntensity={0.8}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* Downward Laser Light Guide */}
            <mesh position={[0, -2, 0]}>
              <cylinderGeometry args={[0.08, 0.6, 4, 16]} />
              <meshBasicMaterial color="#E2B357" transparent opacity={0.6} />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
}
