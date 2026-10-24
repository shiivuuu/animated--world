// ParulVerse 3D - Adaptive Camera & Navigation Controls
// Supports Explore (Orbit), Walk (First-Person WASD), Top-Down Map, and Guided Tour Camera Flight

import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { BUILDINGS_BY_ID } from '../data/buildings.js';

export default function CameraControls({
  cameraMode = 'explore', // 'explore' | 'walk' | 'topDown'
  selectedBuildingId,
  tourStop, // current guided tour stop if active
  onWalkPositionChange
}) {
  const { camera, gl } = useThree();
  const orbitRef = useRef();

  // First person walk state
  const walkState = useRef({
    position: new THREE.Vector3(-270, 1.8, 0), // Start near Gate 1
    rotation: 0,
    pitch: 0,
    keys: { forward: false, backward: false, left: false, right: false },
    isDragging: false,
    prevMouse: { x: 0, y: 0 }
  });

  // Target camera state for smooth transitions
  const targetCam = useRef({
    pos: new THREE.Vector3(-140, 130, 240),
    lookAt: new THREE.Vector3(0, 0, 0),
    transitioning: false
  });

  // Handle building selection camera flight
  useEffect(() => {
    if (tourStop) {
      // Tour Stop transition
      targetCam.current.pos.set(
        tourStop.cameraPosition.x,
        tourStop.cameraPosition.y,
        tourStop.cameraPosition.z
      );
      targetCam.current.lookAt.set(
        tourStop.cameraTarget.x,
        tourStop.cameraTarget.y,
        tourStop.cameraTarget.z
      );
      targetCam.current.transitioning = true;
    } else if (selectedBuildingId && BUILDINGS_BY_ID[selectedBuildingId]) {
      const b = BUILDINGS_BY_ID[selectedBuildingId];
      const offsetDist = Math.max(b.dimensions.width, b.dimensions.depth) * 1.8;
      targetCam.current.pos.set(
        b.position.x - offsetDist * 0.7,
        b.dimensions.height + 25,
        b.position.z + offsetDist * 0.9
      );
      targetCam.current.lookAt.set(
        b.position.x,
        b.dimensions.height * 0.5,
        b.position.z
      );
      targetCam.current.transitioning = true;
    }
  }, [selectedBuildingId, tourStop]);

  // Handle Top-Down switch
  useEffect(() => {
    if (cameraMode === 'topDown') {
      targetCam.current.pos.set(0, 480, 20);
      targetCam.current.lookAt.set(0, 0, 10);
      targetCam.current.transitioning = true;
    } else if (cameraMode === 'walk') {
      // Position player at entrance of selected building or Gate 1
      if (selectedBuildingId && BUILDINGS_BY_ID[selectedBuildingId]) {
        const b = BUILDINGS_BY_ID[selectedBuildingId];
        walkState.current.position.set(b.position.x, 1.8, b.position.z + b.dimensions.depth / 2 + 8);
      }
    }
  }, [cameraMode]);

  // Keyboard controls listener for Walk Mode
  useEffect(() => {
    if (cameraMode !== 'walk') return;

    const onKeyDown = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          walkState.current.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          walkState.current.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          walkState.current.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          walkState.current.keys.right = true;
          break;
      }
    };

    const onKeyUp = (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          walkState.current.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          walkState.current.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          walkState.current.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          walkState.current.keys.right = false;
          break;
      }
    };

    const canvas = gl.domElement;
    const onMouseDown = (e) => {
      walkState.current.isDragging = true;
      walkState.current.prevMouse = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e) => {
      if (!walkState.current.isDragging) return;
      const dx = e.clientX - walkState.current.prevMouse.x;
      const dy = e.clientY - walkState.current.prevMouse.y;
      walkState.current.prevMouse = { x: e.clientX, y: e.clientY };

      walkState.current.rotation -= dx * 0.0035;
      walkState.current.pitch = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, walkState.current.pitch - dy * 0.003)
      );
    };
    const onMouseUp = () => {
      walkState.current.isDragging = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [cameraMode, gl]);

  // Per-frame camera update & lerp
  useFrame((state, delta) => {
    if (cameraMode === 'walk') {
      const speed = 26 * delta; // 26 m/s in walk mode
      const { forward, backward, left, right } = walkState.current.keys;
      const rot = walkState.current.rotation;

      // Compute movement direction vector
      const dir = new THREE.Vector3(0, 0, 0);
      if (forward) dir.z -= 1;
      if (backward) dir.z += 1;
      if (left) dir.x -= 1;
      if (right) dir.x += 1;

      if (dir.lengthSq() > 0) {
        dir.normalize();
        // Rotate dir by current view yaw
        dir.applyAxisAngle(new THREE.Vector3(0, 1, 0), rot);
        walkState.current.position.addScaledVector(dir, speed);

        // Clamping inside campus boundary
        walkState.current.position.x = Math.max(
          -320,
          Math.min(350, walkState.current.position.x)
        );
        walkState.current.position.z = Math.max(
          -380,
          Math.min(410, walkState.current.position.z)
        );

        if (onWalkPositionChange) {
          onWalkPositionChange([
            walkState.current.position.x,
            walkState.current.position.z
          ]);
        }
      }

      // Update camera position
      camera.position.copy(walkState.current.position);
      camera.position.y = 1.8; // Standard eye level

      // Set camera rotation
      const forwardTarget = new THREE.Vector3(
        walkState.current.position.x - Math.sin(rot) * Math.cos(walkState.current.pitch),
        walkState.current.position.y + Math.sin(walkState.current.pitch),
        walkState.current.position.z - Math.cos(rot) * Math.cos(walkState.current.pitch)
      );
      camera.lookAt(forwardTarget);
    } else {
      // Explore & TopDown modes
      if (targetCam.current.transitioning) {
        camera.position.lerp(targetCam.current.pos, 0.06);
        if (orbitRef.current) {
          orbitRef.current.target.lerp(targetCam.current.lookAt, 0.07);
          orbitRef.current.update();
        }
        if (camera.position.distanceTo(targetCam.current.pos) < 1.5) {
          targetCam.current.transitioning = false;
        }
      }
    }
  });

  if (cameraMode === 'walk') {
    return null; // Handled directly via custom useFrame
  }

  return (
    <OrbitControls
      ref={orbitRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={cameraMode === 'topDown' ? 0.01 : Math.PI / 2.05} // Do not clip below ground
      minDistance={15}
      maxDistance={650}
      screenSpacePanning={false}
    />
  );
}
