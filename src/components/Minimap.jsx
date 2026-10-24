// ParulVerse 3D - 2D Synchronized Campus Minimap
// Renders real official map diagram / satellite composite with active route and player location

import React, { useState } from 'react';
import { Maximize2, Minimize2, MapPin, Compass, Navigation } from 'lucide-react';
import { BUILDINGS } from '../data/buildings.js';

export default function Minimap({
  selectedBuildingId,
  onSelectBuilding,
  activeRoute = null,
  playerPosition = [-180, 0] // [x, z] in 3D coordinates
}) {
  const [expanded, setExpanded] = useState(false);
  const [mapStyle, setMapStyle] = useState('diagram'); // 'diagram' | 'satellite'

  // Map 3D scene coordinate space [-340..340, -400..420] into normalized 0..100%
  // 3D X: -340 (West/Left) to 340 (East/Right) -> % X = (x - (-340)) / 680 * 100
  // 3D Z: -400 (North/Top) to 420 (South/Bottom) -> % Y = (z - (-400)) / 820 * 100
  const projectCoord = (x, z) => {
    const px = Math.max(2, Math.min(98, ((x + 340) / 680) * 100));
    const py = Math.max(2, Math.min(98, ((z + 400) / 820) * 100));
    return { x: px, y: py };
  };

  const playerCoord = projectCoord(playerPosition[0], playerPosition[1]);

  return (
    <div
      className={`absolute bottom-4 left-3 sm:left-6 z-40 transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 backdrop-blur-md bg-[#183D32]/90 ${
        expanded
          ? 'w-[320px] sm:w-[420px] h-[340px] sm:h-[420px]'
          : 'w-[190px] sm:w-[230px] h-[150px] sm:h-[175px]'
      }`}
    >
      {/* 1. Minimap Header & Controls */}
      <div className="absolute top-0 left-0 right-0 z-20 px-3 py-2 bg-gradient-to-b from-black/70 to-transparent flex items-center justify-between text-white text-xs font-bold pointer-events-auto">
        <div className="flex items-center gap-1.5 drop-shadow">
          <Compass className="w-3.5 h-3.5 text-[#E2B357]" />
          <span className="text-[11px] font-bold">Campus Minimap</span>
        </div>

        <div className="flex items-center gap-1">
          {expanded && (
            <button
              onClick={() => setMapStyle(mapStyle === 'diagram' ? 'satellite' : 'diagram')}
              className="px-2 py-0.5 text-[9px] bg-white/20 hover:bg-white/30 rounded-md transition-colors"
            >
              {mapStyle === 'diagram' ? 'Satellite' : 'Guide Map'}
            </button>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 text-white/80 hover:text-white rounded-lg transition-transform active:scale-95"
            title={expanded ? 'Collapse Minimap' : 'Expand Minimap'}
          >
            {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2. Map Canvas Surface */}
      <div className="relative w-full h-full bg-[#203D2E] overflow-hidden">
        {/* Base Map Graphic */}
        <img
          src={
            mapStyle === 'satellite'
              ? '/maps/parul_satellite.jpg'
              : '/maps/campus_guide_map.png'
          }
          alt="Parul University Campus Map"
          className="w-full h-full object-cover opacity-85 select-none pointer-events-none"
        />

        {/* 3. SVG Route Line Overlay */}
        {activeRoute && activeRoute.nodes && activeRoute.nodes.length > 1 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <polyline
              points={activeRoute.nodes
                .map((n) => {
                  const pt = projectCoord(n.x, n.z);
                  return `${pt.x}%,${pt.y}%`;
                })
                .join(' ')}
              fill="none"
              stroke="#38A169"
              strokeWidth="4"
              strokeDasharray="4 2"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        )}

        {/* 4. Clickable Building Markers */}
        {BUILDINGS.map((b) => {
          const pt = projectCoord(b.position.x, b.position.z);
          const isSelected = selectedBuildingId === b.id;

          return (
            <div
              key={`minimap-pin-${b.id}`}
              onClick={() => onSelectBuilding(b.id)}
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform ${
                isSelected ? 'scale-125 z-30' : 'hover:scale-125'
              }`}
              title={`${b.code} - ${b.name}`}
            >
              <div
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center font-black text-[7px] text-white shadow-md border ${
                  isSelected
                    ? 'bg-[#E2B357] text-[#183D32] border-white ring-2 ring-[#E2B357]'
                    : b.category === 'medical'
                    ? 'bg-[#E05A47] border-white'
                    : b.category === 'sports'
                    ? 'bg-[#38A169] border-white'
                    : 'bg-[#183D32] border-white/70'
                }`}
              >
                {b.code.slice(0, 2)}
              </div>
            </div>
          );
        })}

        {/* 5. Player / Live Camera Indicator */}
        <div
          style={{ left: `${playerCoord.x}%`, top: `${playerCoord.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        >
          <div className="relative flex items-center justify-center">
            <span className="absolute w-5 h-5 rounded-full bg-[#00E5FF] opacity-60 animate-ping" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#00E5FF] border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
        </div>

        {/* 6. Cardinal North Indicator */}
        <div className="absolute bottom-2 right-2 z-20 bg-black/60 text-white text-[9px] font-black px-1.5 py-0.5 rounded backdrop-blur-md">
          ▲ N
        </div>
      </div>
    </div>
  );
}
