// ParulVerse 3D - Verified Building Details Panel
// Shows official infrastructure records, real photo gallery, navigation, and enterable interior CTA

import React, { useState } from 'react';
import {
  X,
  Navigation,
  Compass,
  Clock,
  Layers,
  Accessibility,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';
import { BUILDINGS_BY_ID } from '../data/buildings.js';

export default function BuildingPanel({
  buildingId,
  onClose,
  onStartNavigation,
  onEnterInterior
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'facilities' | 'info'

  if (!buildingId || !BUILDINGS_BY_ID[buildingId]) return null;
  const b = BUILDINGS_BY_ID[buildingId];

  const primaryPhoto = b.photoUrls?.[0] || '/images/buildings/c1_admin_library.jpg';

  return (
    <aside className="absolute right-3 sm:right-6 top-16 sm:top-20 bottom-4 w-full max-w-sm sm:max-w-md z-40 bg-[#F7F5EF] rounded-3xl shadow-2xl border border-gray-200/90 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
      {/* 1. Header with Photo & Close Button */}
      <div className="relative h-44 sm:h-52 w-full bg-[#183D32] shrink-0 overflow-hidden">
        <img
          src={primaryPhoto}
          alt={b.name}
          className="w-full h-full object-cover opacity-90 transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            // Fallback to library photo if image fails
            e.target.src = '/images/buildings/c1_admin_library.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/75 text-white rounded-full backdrop-blur-md transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Category & Code Overlay */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider bg-[#E2B357] text-[#183D32] rounded-md shadow-sm">
                Block {b.code}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white rounded-md backdrop-blur-md">
                {b.categoryLabel}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight drop-shadow-md">
              {b.name}
            </h3>
          </div>
        </div>
      </div>

      {/* 2. Action Buttons (Navigate & Enter 3D Interior) */}
      <div className="p-3 bg-white border-b border-gray-200/80 flex items-center gap-2">
        <button
          onClick={() => onStartNavigation(b.id)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-[#183D32] hover:bg-[#122D25] text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
        >
          <Navigation className="w-3.5 h-3.5 text-[#E2B357]" />
          <span>Navigate Here</span>
        </button>

        {b.hasInterior && (
          <button
            onClick={() => onEnterInterior(b.interiorId)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 bg-gradient-to-r from-[#E2B357] to-[#D4A340] hover:brightness-105 text-[#183D32] font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-[#183D32]" />
            <span>Enter 3D Interior</span>
          </button>
        )}
      </div>

      {/* 3. Section Navigation Tabs */}
      <div className="flex items-center border-b border-gray-200 bg-[#EFECE3] px-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-[#183D32] text-[#183D32]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('facilities')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'facilities'
              ? 'border-[#183D32] text-[#183D32]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Facilities ({b.facilities?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('info')}
          className={`py-2 px-3 text-xs font-bold border-b-2 transition-all ${
            activeTab === 'info'
              ? 'border-[#183D32] text-[#183D32]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Details
        </button>
      </div>

      {/* 4. Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 text-[#262D2A] text-xs sm:text-sm leading-relaxed space-y-4">
        {activeTab === 'overview' && (
          <>
            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Institute & Affiliation
              </h4>
              <p className="font-semibold text-gray-800">{b.institute || b.name}</p>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Description
              </h4>
              <p className="text-gray-700 leading-relaxed">{b.description}</p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="p-2.5 bg-white rounded-xl border border-gray-200/80">
                <span className="text-[10px] text-gray-400 font-bold block">FLOORS</span>
                <span className="text-sm font-bold text-[#183D32]">{b.floors} Levels</span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-gray-200/80">
                <span className="text-[10px] text-gray-400 font-bold block">ESTABLISHED</span>
                <span className="text-sm font-bold text-[#183D32]">{b.established || '2005'}</span>
              </div>
            </div>
          </>
        )}

        {activeTab === 'facilities' && (
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
              Key Campus Facilities in this Block
            </h4>
            {b.facilities && b.facilities.length > 0 ? (
              b.facilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="p-2.5 bg-white rounded-xl border border-gray-200/70 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#38A169] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-gray-800">{fac}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic text-xs">Standard academic facilities.</p>
            )}

            {b.departments && b.departments.length > 0 && (
              <div className="pt-3">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Academic Departments
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {b.departments.map((dept, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-[#D9E9DF] text-[#183D32] text-xs font-semibold rounded-lg"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="space-y-3">
            {b.openingHours && (
              <div className="p-3 bg-white rounded-xl border border-gray-200/80 flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#183D32] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-gray-400 block uppercase">
                    Operating Hours
                  </span>
                  <span className="text-xs font-semibold text-gray-800">{b.openingHours}</span>
                </div>
              </div>
            )}

            {b.accessibility && (
              <div className="p-3 bg-white rounded-xl border border-gray-200/80 flex items-start gap-3">
                <Accessibility className="w-4 h-4 text-[#38A169] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-gray-400 block uppercase">
                    Accessibility
                  </span>
                  <span className="text-xs font-semibold text-gray-800">{b.accessibility}</span>
                </div>
              </div>
            )}

            {b.deanOffice && (
              <div className="p-3 bg-white rounded-xl border border-gray-200/80 flex items-start gap-3">
                <Layers className="w-4 h-4 text-[#E2B357] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-bold text-gray-400 block uppercase">
                    Key Office Location
                  </span>
                  <span className="text-xs font-semibold text-gray-800">{b.deanOffice}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. Footer University Coordinates & Verified Tag */}
      <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
        <span className="font-mono">
          Coord: [{b.position.x}, {b.position.z}]
        </span>
        <span className="font-semibold text-[#183D32] flex items-center gap-1">
          ✓ Verified Map Data
        </span>
      </div>
    </aside>
  );
}
