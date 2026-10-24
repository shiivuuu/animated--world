// ParulVerse 3D - Dynamic Lighting & Atmosphere
// Controls daylight, golden hour, and nighttime atmosphere with streetlamp and window illumination

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CampusLighting({ timeOfDay = 'day', weather = 'clear' }) {
  const dirLightRef = useRef();

  // Dynamic light values based on time of day
  const config = React.useMemo(() => {
    switch (timeOfDay) {
      case 'sunset': // Golden Hour
        return {
          sunPos: [200, 70, -150],
          sunColor: '#FFAE6A',
          sunIntensity: 1.8,
          hemiSkyColor: '#FFE6CC',
          hemiGroundColor: '#5E4B3C',
          hemiIntensity: 0.8,
          fogColor: '#E8A77E',
          fogDensity: weather === 'foggy' ? 0.005 : 0.0018,
          ambientColor: '#FFD3B0',
          ambientIntensity: 0.6
        };
      case 'night': // Night with glowing lights
        return {
          sunPos: [-100, 150, 100],
          sunColor: '#4A6984',
          sunIntensity: 0.25,
          hemiSkyColor: '#1A2938',
          hemiGroundColor: '#0E1722',
          hemiIntensity: 0.35,
          fogColor: '#0B131D',
          fogDensity: weather === 'foggy' ? 0.007 : 0.0022,
          ambientColor: '#203348',
          ambientIntensity: 0.3
        };
      case 'day':
      default: // Crisp Natural Daylight
        return {
          sunPos: [150, 220, 120],
          sunColor: '#FFFDF5',
          sunIntensity: 2.1,
          hemiSkyColor: '#83B7A1',
          hemiGroundColor: '#405B48',
          hemiIntensity: 0.85,
          fogColor: weather === 'rain' ? '#A2B0A8' : '#DCE8E0',
          fogDensity: weather === 'foggy' ? 0.006 : weather === 'rain' ? 0.0035 : 0.0012,
          ambientColor: '#FFFFFF',
          ambientIntensity: 0.7
        };
    }
  }, [timeOfDay, weather]);

  return (
    <>
      <color attach="background" args={[config.fogColor]} />
      <fog attach="fog" args={[config.fogColor, 120, weather === 'foggy' ? 450 : 800]} />

      <ambientLight color={config.ambientColor} intensity={config.ambientIntensity} />

      <hemisphereLight
        args={[config.hemiSkyColor, config.hemiGroundColor, config.hemiIntensity]}
      />

      <directionalLight
        ref={dirLightRef}
        position={config.sunPos}
        intensity={config.sunIntensity}
        color={config.sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={800}
        shadow-camera-left={-400}
        shadow-camera-right={400}
        shadow-camera-top={400}
        shadow-camera-bottom={-400}
        shadow-bias={-0.0005}
      />
    </>
  );
}
