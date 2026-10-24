// ParulVerse 3D - Interactive 3D Campus Explorer Master View
// Coordinates 3D Scene, Minimap, Building Details, Search, Guided Tours, and AI Assistant

import React, { useState, useCallback, useEffect } from 'react';
import Header from '../components/Header.jsx';
import CampusScene from '../scene/CampusScene.jsx';
import BuildingPanel from '../components/BuildingPanel.jsx';
import Minimap from '../components/Minimap.jsx';
import SearchBar from '../components/SearchBar.jsx';
import TourOverlay from '../components/TourOverlay.jsx';
import AIAssistantModal from '../components/AIAssistantModal.jsx';
import AudioAmbient from '../components/AudioAmbient.jsx';
import { routeBetweenBuildings } from '../navigation/pathfinding.js';
import { GUIDED_TOURS, TOURS_BY_ID } from '../data/tours.js';
import { Navigation, X, Footprints, AlertCircle, Sparkles } from 'lucide-react';

export default function Explorer({
  initialBuildingId = null,
  initialTourId = null,
  onNavigateHome,
  onNavigateAdmin
}) {
  // Navigation & Scene States
  const [selectedBuildingId, setSelectedBuildingId] = useState(initialBuildingId);
  const [cameraMode, setCameraMode] = useState('explore'); // 'explore' | 'walk' | 'topDown'
  const [timeOfDay, setTimeOfDay] = useState('day'); // 'day' | 'sunset' | 'night'
  const [weather, setWeather] = useState('clear');
  const [audioMuted, setAudioMuted] = useState(true);

  // Active Walking Navigation Route
  const [activeRoute, setActiveRoute] = useState(null);
  const [playerPosition, setPlayerPosition] = useState([-270, 0]);

  // Guided Tour State
  const [activeTourId, setActiveTourId] = useState(initialTourId);
  const [currentTourStopIndex, setCurrentTourStopIndex] = useState(0);

  // 3D Interior Mode State
  const [interiorMode, setInteriorMode] = useState(false);
  const [interiorRoomId, setInteriorRoomId] = useState('central-library');

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Update selection if prop changes
  useEffect(() => {
    if (initialBuildingId) {
      setSelectedBuildingId(initialBuildingId);
    }
  }, [initialBuildingId]);

  useEffect(() => {
    if (initialTourId) {
      setActiveTourId(initialTourId);
      setCurrentTourStopIndex(0);
    }
  }, [initialTourId]);

  // Handle building selection
  const handleSelectBuilding = useCallback((id) => {
    setSelectedBuildingId(id);
    // If a tour was active, cancel it to allow free building inspection
    if (activeTourId) setActiveTourId(null);
  }, [activeTourId]);

  // Handle start route navigation
  const handleStartNavigation = useCallback((destBuildingId) => {
    // Route from current position or Main Gate 1
    const route = routeBetweenBuildings('gate1-main-vip', destBuildingId);
    if (route) {
      setActiveRoute(route);
      setSelectedBuildingId(destBuildingId);
    }
  }, []);

  // Handle guided tour start
  const handleStartTour = useCallback((tourId) => {
    setActiveTourId(tourId);
    setCurrentTourStopIndex(0);
    setSelectedBuildingId(null);
    setActiveRoute(null);
    setCameraMode('explore');
  }, []);

  const handleNextTourStop = useCallback(() => {
    const tour = TOURS_BY_ID[activeTourId];
    if (!tour) return;
    if (currentTourStopIndex < tour.stops.length - 1) {
      setCurrentTourStopIndex((prev) => prev + 1);
    } else {
      setActiveTourId(null); // Finished tour
    }
  }, [activeTourId, currentTourStopIndex]);

  const handlePrevTourStop = useCallback(() => {
    if (currentTourStopIndex > 0) {
      setCurrentTourStopIndex((prev) => prev - 1);
    }
  }, [currentTourStopIndex]);

  // Enter Interior
  const handleEnterInterior = useCallback((roomId) => {
    setInteriorRoomId(roomId || 'central-library');
    setInteriorMode(true);
  }, []);

  const handleExitInterior = useCallback(() => {
    setInteriorMode(false);
  }, []);

  // Reset View
  const handleResetView = useCallback(() => {
    setSelectedBuildingId(null);
    setActiveRoute(null);
    setActiveTourId(null);
    setCameraMode('explore');
  }, []);

  // Get active tour stop object
  const currentTourStop =
    activeTourId && TOURS_BY_ID[activeTourId]
      ? TOURS_BY_ID[activeTourId].stops[currentTourStopIndex]
      : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#18261F]">
      {/* 1. Header Control Bar */}
      <Header
        activeTab="explorer"
        cameraMode={cameraMode}
        setCameraMode={setCameraMode}
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        audioMuted={audioMuted}
        setAudioMuted={setAudioMuted}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onResetView={handleResetView}
        interiorMode={interiorMode}
        onExitInterior={handleExitInterior}
      />

      {/* 2. Main 3D Canvas Scene */}
      <CampusScene
        selectedBuildingId={selectedBuildingId}
        onSelectBuilding={handleSelectBuilding}
        cameraMode={cameraMode}
        timeOfDay={timeOfDay}
        weather={weather}
        activeRoute={activeRoute}
        tourStop={currentTourStop}
        interiorMode={interiorMode}
        interiorRoomId={interiorRoomId}
        onWalkPositionChange={(pos) => setPlayerPosition(pos)}
      />

      {/* 3. Turn-by-Turn Route Navigation Active Banner */}
      {activeRoute && !interiorMode && (
        <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4 pointer-events-none animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-[#183D32]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-[#83B7A1]/40 flex items-center justify-between gap-3 pointer-events-auto">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="p-2 bg-[#E2B357] text-[#183D32] rounded-xl font-bold">
                <Navigation className="w-4 h-4" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#E2B357] uppercase">
                    Active Walking Route
                  </span>
                  <span className="text-[10px] text-gray-300">
                    {activeRoute.distanceMeters}m · ~{activeRoute.walkingMinutes} min walk
                  </span>
                </div>
                <p className="text-xs font-semibold truncate text-white">
                  {activeRoute.directions[0]}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveRoute(null)}
              className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold shrink-0"
              title="Clear Route"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. First Person Walk Mode On-Screen Controls HUD */}
      {cameraMode === 'walk' && !interiorMode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-black/75 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 text-xs font-semibold flex items-center gap-3 shadow-2xl">
            <Footprints className="w-4 h-4 text-[#E2B357]" />
            <span>Use WASD or Arrow Keys to Walk · Click & Drag to Look Around</span>
          </div>
        </div>
      )}

      {/* 5. Building Details Panel */}
      {selectedBuildingId && !activeTourId && !interiorMode && (
        <BuildingPanel
          buildingId={selectedBuildingId}
          onClose={() => setSelectedBuildingId(null)}
          onStartNavigation={handleStartNavigation}
          onEnterInterior={handleEnterInterior}
        />
      )}

      {/* 6. Guided Tour Player Overlay */}
      {activeTourId && (
        <TourOverlay
          activeTourId={activeTourId}
          currentStopIndex={currentTourStopIndex}
          onNextStop={handleNextTourStop}
          onPrevStop={handlePrevTourStop}
          onExitTour={() => setActiveTourId(null)}
          audioMuted={audioMuted}
        />
      )}

      {/* 7. 2D Minimap */}
      {!interiorMode && (
        <Minimap
          selectedBuildingId={selectedBuildingId}
          onSelectBuilding={handleSelectBuilding}
          activeRoute={activeRoute}
          playerPosition={playerPosition}
        />
      )}

      {/* 8. Search Palette Modal */}
      <SearchBar
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectBuilding={handleSelectBuilding}
        onNavigateBuilding={handleStartNavigation}
      />

      {/* 9. AI Campus Assistant Drawer */}
      <AIAssistantModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onSelectBuilding={handleSelectBuilding}
        onStartNavigation={handleStartNavigation}
        onStartTour={handleStartTour}
      />

      {/* 10. Procedural Ambient Audio */}
      <AudioAmbient muted={audioMuted} timeOfDay={timeOfDay} />
    </div>
  );
}
