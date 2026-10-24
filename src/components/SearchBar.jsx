// ParulVerse 3D - Universal Campus Search & Facility Directory
// Instant fuzzy search across all buildings, departments, hostels, and facilities

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, MapPin, Building, ChevronRight, Layers } from 'lucide-react';
import { BUILDINGS, CATEGORIES } from '../data/buildings.js';

export default function SearchBar({
  isOpen,
  onClose,
  onSelectBuilding,
  onNavigateBuilding
}) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const inputRef = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered buildings calculation
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();

    return BUILDINGS.filter((b) => {
      // Category filter
      if (activeCategory !== 'all' && b.category !== activeCategory) {
        return false;
      }
      if (!q) return true;

      // Match code (e.g. C1, A19, E2)
      if (b.code.toLowerCase().includes(q)) return true;
      // Match building name & short name
      if (b.name.toLowerCase().includes(q) || b.shortName.toLowerCase().includes(q)) return true;
      // Match institute
      if (b.institute && b.institute.toLowerCase().includes(q)) return true;
      // Match departments
      if (b.departments && b.departments.some((d) => d.toLowerCase().includes(q))) return true;
      // Match facilities
      if (b.facilities && b.facilities.some((f) => f.toLowerCase().includes(q))) return true;

      return false;
    });
  }, [query, activeCategory]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#F7F5EF] w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Search Header Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200/80 bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#183D32]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search buildings, faculties (e.g. C1, PIET, Hospital, Hostel, Library)..."
            className="flex-1 text-sm sm:text-base font-medium text-[#262D2A] placeholder-gray-400 bg-transparent outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-xl text-xs font-semibold"
          >
            ESC
          </button>
        </div>

        {/* 2. Category Filter Chips */}
        <div className="px-4 py-2.5 bg-[#EFECE3] border-b border-gray-200/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#183D32] text-white shadow-sm'
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3. Search Results List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 divide-y divide-gray-100">
          {results.length > 0 ? (
            results.map((b) => (
              <div
                key={b.id}
                onClick={() => {
                  onSelectBuilding(b.id);
                  onClose();
                }}
                className="group p-3 sm:p-3.5 rounded-2xl hover:bg-white transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Building Code Badge */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm"
                    style={{
                      backgroundColor:
                        b.category === 'medical'
                          ? '#E05A47'
                          : b.category === 'sports'
                          ? '#38A169'
                          : b.category === 'hostel'
                          ? '#4A6FA5'
                          : '#183D32'
                    }}
                  >
                    {b.code}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#262D2A] truncate group-hover:text-[#183D32]">
                        {b.name}
                      </h4>
                      {b.hasInterior && (
                        <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#E2B357]/20 text-[#A67C1E] rounded-md shrink-0">
                          3D Interior
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {b.institute || b.categoryLabel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateBuilding(b.id);
                      onClose();
                    }}
                    className="hidden sm:inline-flex px-3 py-1.5 text-xs font-semibold bg-[#D9E9DF] text-[#183D32] hover:bg-[#83B7A1] rounded-xl transition-colors"
                  >
                    Directions
                  </button>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#183D32] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-500">
              <Building className="w-10 h-10 mx-auto text-gray-400 stroke-1 mb-2" />
              <p className="text-sm font-semibold">No campus buildings matched "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching by code like "C1", "A1", or facility like "Pharmacy", "Library", "Hostel".
              </p>
            </div>
          )}
        </div>

        {/* 4. Footer Note */}
        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-[11px] text-gray-500">
          <span>Showing {results.length} campus landmarks</span>
          <span className="hidden sm:inline">Use ↑↓ keys to navigate</span>
        </div>
      </div>
    </div>
  );
}
