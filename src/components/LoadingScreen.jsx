// ParulVerse 3D - University Loading Screen with Progress & Campus Facts
// Displays initial load state and transitions smoothly into interactive 3D explorer

import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin } from 'lucide-react';

const CAMPUS_FACTS = [
  "Parul University spans 250+ lush green acres with 36 world-class institutes.",
  "Parul Sevashram Hospital features 750 beds and 24x7 Level-1 trauma emergency care.",
  "Dr. A.P.J. Abdul Kalam Central Library houses over 150,000 books across 5 floors.",
  "Over 43,000 students from 65+ countries study together at Parul University.",
  "The C.V. Raman Center delivers over 1.2 PetaFLOPS of GPU compute for AI research."
];

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(15);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish && onFinish(), 200);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 120);

    const factTimer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % CAMPUS_FACTS.length);
    }, 2400);

    return () => {
      clearInterval(timer);
      clearInterval(factTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-[#183D32] flex flex-col items-center justify-center p-6 text-[#F7F5EF] select-none">
      {/* University Crest / Logo */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-[#E2B357] flex items-center justify-center font-black text-[#183D32] text-3xl shadow-2xl animate-pulse">
          PU
        </div>
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#83B7A1] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#83B7A1]" />
        </span>
      </div>

      {/* Brand Title */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
        ParulVerse <span className="text-[#E2B357]">3D</span>
      </h1>
      <p className="text-xs sm:text-sm text-[#83B7A1] font-medium mt-1">
        Interactive 3D Virtual Campus Tour · Limda, Vadodara
      </p>

      {/* Progress Bar Container */}
      <div className="w-full max-w-xs sm:max-w-sm mt-8">
        <div className="flex items-center justify-between text-xs font-semibold mb-2 text-gray-300">
          <span>Loading 3D Campus Assets...</span>
          <span className="text-[#E2B357] font-mono">{Math.min(100, progress)}%</span>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-[#83B7A1] via-[#E2B357] to-[#E2B357] rounded-full transition-all duration-200"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      </div>

      {/* Rotating Campus Tip */}
      <div className="mt-8 max-w-md text-center p-3.5 bg-black/25 rounded-2xl border border-white/10">
        <p className="text-xs text-gray-200 leading-relaxed italic">
          "{CAMPUS_FACTS[factIndex]}"
        </p>
      </div>

      {/* Footer Tag */}
      <div className="absolute bottom-6 flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
        <MapPin className="w-3.5 h-3.5 text-[#E2B357]" />
        <span>Geographically Aligned with Official Parul University Campus Map</span>
      </div>
    </div>
  );
}
