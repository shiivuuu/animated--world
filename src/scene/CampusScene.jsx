// ParulVerse 3D - Master Campus 3D Canvas & Scene Coordinator
// Integrates all procedural terrain, architecture, vegetation, lighting, and camera modes

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CampusLighting from './CampusLighting.jsx';
import CampusGround from './CampusGround.jsx';
import CampusRoads from './CampusRoads.jsx';
import CampusBuildings from './CampusBuildings.jsx';
import CampusVegetation from './CampusVegetation.jsx';
import RoutePath3D from './RoutePath3D.jsx';
import CameraControls from './CameraControls.jsx';
import InteriorScene from './InteriorScene.jsx';

export default function CampusScene({
  selectedBuildingId,
  onSelectBuilding,
  cameraMode = 'explore',
  timeOfDay = 'day',
  weather = 'clear',
  activeRoute = null,
  tourStop = null,
  interiorMode = false,
  interiorRoomId = 'central-library',
  onHotspotSelect = null,
  onWalkPositionChange = null
}) {
  return (
    <div className="relative w-full h-full bg-[#18261F] overflow-hidden select-none">
      <Canvas
        shadows
        camera={{
          position: [-160, 130, 240],
          fov: 45,
          near: 0.5,
          far: 2000
        }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance'
        }}
      >
        <Suspense fallback={null}>
          {interiorMode ? (
            <InteriorScene
              roomId={interiorRoomId}
              onHotspotSelect={onHotspotSelect}
            />
          ) : (
            <>
              {/* Dynamic Day/Night Lighting & Sky Atmosphere */}
              <CampusLighting timeOfDay={timeOfDay} weather={weather} />

              {/* 250-Acre Campus Terrain, Plazas & Highway SH-158 */}
              <CampusGround />

              {/* Asphalt Road Network, Sidewalks & Parking Bays */}
              <CampusRoads />

              {/* All 42+ Campus Buildings with Interactive Portals */}
              <CampusBuildings
                selectedBuildingId={selectedBuildingId}
                onSelectBuilding={onSelectBuilding}
                timeOfDay={timeOfDay}
              />

              {/* Royal Palms, Botanical Trees & Evening Streetlights */}
              <CampusVegetation timeOfDay={timeOfDay} />

              {/* A* Animated 3D Navigation Path Ribbon */}
              <RoutePath3D activeRoute={activeRoute} />

              {/* Camera System (Explore / Walk / TopDown / Tour) */}
              <CameraControls
                cameraMode={cameraMode}
                selectedBuildingId={selectedBuildingId}
                tourStop={tourStop}
                onWalkPositionChange={onWalkPositionChange}
              />
            </>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
