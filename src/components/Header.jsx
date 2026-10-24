// ParulVerse 3D - University Header & Control Bar
// Design palette: Warm ivory (#F7F5EF), Forest green (#183D32), Sage (#83B7A1), Gold (#E2B357)

import React from 'react';
import {
  Compass,
  Footprints,
  Map as MapIcon,
  Sun,
  Sunset,
  Moon,
  Volume2,
  VolumeX,
  Sparkles,
  Search,
  BookOpen,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  cameraMode,
  setCameraMode,
  timeOfDay,
  setTimeOfDay,
  audioMuted,
  setAudioMuted,
  onOpenSearch,
  onOpenAI,
  onResetView,
  interiorMode,
  onExitInterior
}) {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 flex items-center justify-between pointer-events-none">
      {/* 1. Left University Brand & Identity */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="bg-[#183D32] text-white p-2 sm:p-2.5 rounded-2xl shadow-xl border border-[#83B7A1]/30 flex items-center gap-2.5 backdrop-blur-md">
          <div className="w-8 h-8 rounded-xl bg-[#E2B357] flex items-center justify-center font-black text-[#183D32] text-sm shadow-md">
            PU
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-[#F7F5EF]">
                ParulVerse <span className="text-[#E2B357]">3D</span>
              </h1>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-[#83B7A1]/20 text-[#83B7A1] rounded">
                NAAC A++
              </span>
            </div>
            <p className="text-[10px] text-gray-300 hidden sm:block">
              Parul University Interactive Virtual Campus Tour
            </p>
          </div>
        </div>

        {/* Interior Mode Exit Action Banner */}
        {interiorMode && (
          <button
            onClick={onExitInterior}
            className="flex items-center gap-2 px-3 py-2 bg-[#E2B357] text-[#183D32] font-bold text-xs rounded-xl shadow-lg hover:bg-yellow-400 transition-transform active:scale-95 animate-pulse"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Return to Campus</span>
          </button>
        )}
      </div>

      {/* 2. Center Top Navigation Controls (Camera & Views) */}
      {!interiorMode && (
        <div className="hidden md:flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-1.5 rounded-2xl shadow-xl border border-gray-200 pointer-events-auto">
          {/* Explore Orbit Camera */}
          <button
            onClick={() => setCameraMode('explore')}
            title="Explore Mode (Orbit, Pan, Zoom)"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              cameraMode === 'explore'
                ? 'bg-[#183D32] text-white shadow-md'
                : 'text-gray-700 hover:bg-[#D9E9DF]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore</span>
          </button>

          {/* First Person Walk Mode */}
          <button
            onClick={() => setCameraMode('walk')}
            title="First-Person Walk Mode (WASD + Mouse)"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              cameraMode === 'walk'
                ? 'bg-[#183D32] text-white shadow-md'
                : 'text-gray-700 hover:bg-[#D9E9DF]'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>Walk Mode</span>
          </button>

          {/* Top-Down Map View */}
          <button
            onClick={() => setCameraMode('topDown')}
            title="Top-Down Aerial Map View"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              cameraMode === 'topDown'
                ? 'bg-[#183D32] text-white shadow-md'
                : 'text-gray-700 hover:bg-[#D9E9DF]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Aerial Map</span>
          </button>
        </div>
      )}

      {/* 3. Right Action Tools (Lighting, Search, AI, Audio) */}
      <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
        {/* Reset View Button */}
        {!interiorMode && (
          <button
            onClick={onResetView}
            title="Reset Campus View"
            className="p-2 sm:p-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200 transition-transform active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* Search Trigger */}
        <button
          onClick={onOpenSearch}
          title="Search Buildings & Departments"
          className="flex items-center gap-2 px-3 py-2 sm:py-2.5 bg-white/90 hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200 transition-all text-xs font-medium"
        >
          <Search className="w-4 h-4 text-[#183D32]" />
          <span className="hidden sm:inline">Search Campus</span>
        </button>

        {/* Day / Golden Hour / Night Atmosphere Switcher */}
        {!interiorMode && (
          <div className="flex items-center bg-white/90 rounded-xl p-1 shadow-lg border border-gray-200">
            <button
              onClick={() => setTimeOfDay('day')}
              title="Daylight"
              className={`p-1.5 rounded-lg transition-colors ${
                timeOfDay === 'day' ? 'bg-[#183D32] text-[#E2B357]' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('sunset')}
              title="Golden Hour"
              className={`p-1.5 rounded-lg transition-colors ${
                timeOfDay === 'sunset' ? 'bg-[#183D32] text-[#FFAE6A]' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTimeOfDay('night')}
              title="Night Lights"
              className={`p-1.5 rounded-lg transition-colors ${
                timeOfDay === 'night' ? 'bg-[#183D32] text-cyan-300' : 'text-gray-600 hover:text-black'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Ambient Campus Audio Toggle */}
        <button
          onClick={() => setAudioMuted(!audioMuted)}
          title={audioMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
          className={`p-2 sm:p-2.5 rounded-xl shadow-lg border transition-all ${
            audioMuted
              ? 'bg-white/90 text-gray-400 border-gray-200'
              : 'bg-[#183D32] text-[#E2B357] border-[#83B7A1]'
          }`}
        >
          {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* AI Campus Assistant Button */}
        <button
          onClick={onOpenAI}
          title="UniGuide AI Assistant"
          className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 bg-gradient-to-r from-[#183D32] to-[#2B6CB0] text-white font-bold text-xs rounded-xl shadow-lg border border-[#83B7A1]/40 hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#E2B357] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="hidden sm:inline">Ask AI</span>
        </button>
      </div>
    </header>
  );
}
