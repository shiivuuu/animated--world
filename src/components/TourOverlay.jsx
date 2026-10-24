// ParulVerse 3D - Guided Virtual Tour Player & Voice Narrator
// Step-by-step camera navigation, text narration & speech synthesis

import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  X,
  Compass,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { GUIDED_TOURS } from '../data/tours.js';

export default function TourOverlay({
  activeTourId,
  currentStopIndex,
  onNextStop,
  onPrevStop,
  onExitTour,
  audioMuted = false
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const tour = GUIDED_TOURS.find((t) => t.id === activeTourId) || GUIDED_TOURS[0];
  const totalStops = tour.stops.length;
  const currentStop = tour.stops[currentStopIndex] || tour.stops[0];

  // Speech synthesis narration
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (!audioMuted && currentStop?.narration) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentStop.narration);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentStop, audioMuted]);

  const toggleSpeak = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (currentStop?.narration) {
      const utterance = new SpeechSynthesisUtterance(currentStop.narration);
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 pointer-events-none">
      <div className="bg-[#183D32]/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border border-[#83B7A1]/40 text-[#F7F5EF] pointer-events-auto flex flex-col gap-3">
        {/* 1. Tour Header & Progress Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-[#E2B357] text-[#183D32] rounded-xl font-bold">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#E2B357] uppercase tracking-wide">
                  {tour.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/15 text-gray-200">
                  Stop {currentStopIndex + 1} of {totalStops}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                {currentStop.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Voice Toggle */}
            <button
              onClick={toggleSpeak}
              className={`p-2 rounded-xl transition-all ${
                isSpeaking
                  ? 'bg-[#E2B357] text-[#183D32] animate-pulse'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={isSpeaking ? 'Mute Guide Voice' : 'Read Narration Voice'}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Exit Tour Button */}
            <button
              onClick={onExitTour}
              className="p-2 bg-white/10 hover:bg-red-500/80 text-white rounded-xl transition-colors"
              title="Exit Guided Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Step Progress Indicators */}
        <div className="flex items-center gap-1.5 w-full">
          {tour.stops.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full flex-1 transition-all ${
                idx === currentStopIndex
                  ? 'bg-[#E2B357]'
                  : idx < currentStopIndex
                  ? 'bg-[#83B7A1]'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* 3. Spoken Guide Narration Script */}
        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal bg-black/25 p-3 rounded-2xl border border-white/10">
          "{currentStop.narration}"
        </p>

        {/* 4. Controls: Prev & Next Navigation */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button
            onClick={onPrevStop}
            disabled={currentStopIndex === 0}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              currentStopIndex === 0
                ? 'opacity-40 cursor-not-allowed border-white/10 text-gray-400'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Stop</span>
          </button>

          <button
            onClick={onNextStop}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold bg-[#E2B357] hover:bg-yellow-400 text-[#183D32] rounded-xl shadow-lg transition-transform active:scale-95"
          >
            <span>{currentStopIndex === totalStops - 1 ? 'Finish Tour' : 'Next Stop'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
