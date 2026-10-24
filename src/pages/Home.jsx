// ParulVerse 3D - University Landing Page & Campus Gateway
// Design Palette: Warm ivory (#F7F5EF), Forest green (#183D32), Sage (#83B7A1), Gold (#E2B357)

import React from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Building,
  GraduationCap,
  HeartPulse,
  Trophy,
  Users,
  ShieldCheck,
  Eye,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { BUILDINGS } from '../data/buildings.js';
import { GUIDED_TOURS } from '../data/tours.js';

export default function Home({ onStartExploring, onStartTour, onSelectBuilding }) {
  const featuredBuildings = [
    BUILDINGS.find((b) => b.id === 'c1-admin-library'),
    BUILDINGS.find((b) => b.id === 'a1-piet-main'),
    BUILDINGS.find((b) => b.id === 'e2-parul-sevashram-hospital'),
    BUILDINGS.find((b) => b.id === 'a25-cv-raman-centre'),
    BUILDINGS.find((b) => b.id === 'f1-central-food-court'),
    BUILDINGS.find((b) => b.id === 'g8-pu-sports-stadium')
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#262D2A] font-sans selection:bg-[#E2B357] selection:text-[#183D32]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#183D32] text-white pt-24 pb-20 sm:pt-32 sm:pb-28">
        {/* Background Decorative Mesh Pattern */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#E2B357] blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#83B7A1] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Accreditation Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#83B7A1]/30 text-xs font-semibold text-[#83B7A1] backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E2B357] animate-ping" />
            <span>NAAC A++ Accredited · Category-1 University</span>
          </div>

          {/* Main Hero Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto text-[#F7F5EF]">
            Explore Your Campus. <br />
            <span className="text-[#E2B357]">Discover Your Future.</span>
          </h1>

          <p className="mt-5 text-sm sm:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-normal">
            Step into <strong>ParulVerse 3D</strong>, the interactive geographically-aligned virtual
            campus tour of Parul University. Explore 250+ acres of world-class academic institutes,
            the 750-bed Sevashram Hospital, and enterable 3D facilities right in your browser.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onStartExploring()}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-[#E2B357] hover:bg-yellow-400 text-[#183D32] font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Compass className="w-5 h-5" />
              <span>Launch 3D Campus Explorer</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onStartTour('campus-highlights')}
              className="flex items-center gap-2 px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base rounded-2xl backdrop-blur-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#E2B357]" />
              <span>Take Guided Virtual Tour</span>
            </button>
          </div>

          {/* Key University Fast Stats */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-4xl mx-auto text-left">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black text-[#E2B357] block">250+</span>
              <span className="text-xs text-gray-300 font-medium mt-0.5 block">Lush Green Acres</span>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black text-[#E2B357] block">43,000+</span>
              <span className="text-xs text-gray-300 font-medium mt-0.5 block">Scholars (65+ Nations)</span>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black text-[#E2B357] block">750 Beds</span>
              <span className="text-xs text-gray-300 font-medium mt-0.5 block">Multi-Specialty Hospital</span>
            </div>
            <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black text-[#E2B357] block">36</span>
              <span className="text-xs text-gray-300 font-medium mt-0.5 block">Institutes & Faculties</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Campus Locations Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183D32] mb-1">
              <Building className="w-4 h-4 text-[#E2B357]" />
              <span>Campus Infrastructure</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#183D32] tracking-tight">
              Featured Campus Landmarks
            </h2>
          </div>
          <button
            onClick={() => onStartExploring()}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#183D32] hover:text-[#83B7A1] transition-colors"
          >
            <span>View All 42+ Campus Buildings</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Buildings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBuildings.map((b) => (
            <div
              key={b.id}
              onClick={() => {
                onSelectBuilding(b.id);
                onStartExploring();
              }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-200/80 transition-all duration-300 cursor-pointer flex flex-col transform hover:-translate-y-1"
            >
              {/* Photo Box */}
              <div className="relative h-48 w-full bg-[#183D32] overflow-hidden">
                <img
                  src={b.photoUrls?.[0] || '/images/buildings/c1_admin_library.jpg'}
                  alt={b.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-95"
                  onError={(e) => {
                    e.target.src = '/images/buildings/c1_admin_library.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-black bg-[#183D32] text-white rounded-xl shadow-md border border-[#83B7A1]/40">
                    {b.code}
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-white/90 text-[#183D32] rounded-lg shadow-sm">
                    {b.categoryLabel}
                  </span>
                </div>
                {b.hasInterior && (
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-[#E2B357] text-[#183D32] text-[10px] font-black rounded-lg shadow-md flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>3D Interior</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#183D32] group-hover:text-[#2B6CB0] transition-colors leading-snug">
                    {b.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-2 leading-relaxed">
                    {b.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#183D32]">
                  <span>Explore in 3D</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Guided Tours Section */}
      <section className="py-16 bg-[#EFECE3] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#183D32]">
              Curated Walkthroughs
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#183D32] tracking-tight mt-1">
              Guided 3D Virtual Tours
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Sit back and experience an automated camera flight with audio voice narration through
              different specialized campus zones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUIDED_TOURS.map((tour) => (
              <div
                key={tour.id}
                onClick={() => onStartTour(tour.id)}
                className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl border border-gray-200/90 transition-all cursor-pointer flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#D9E9DF] text-[#183D32]">
                      {tour.badge}
                    </span>
                    <span className="text-xs font-mono font-semibold text-gray-400">
                      {tour.duration}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#183D32] group-hover:text-[#2B6CB0] transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-3 leading-relaxed">
                    {tour.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#183D32]">
                  <span>{tour.stops.length} Guided Stops</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Start Tour <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Geographic Location & Campus Map Section */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#183D32] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#83B7A1] mb-3">
              <MapPin className="w-3.5 h-3.5 text-[#E2B357]" />
              <span>Vadodara, Gujarat, India</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Visit Parul University in Person
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 leading-relaxed">
              Located at Post Limda, Waghodia Taluka, Vadodara, Gujarat 391760. Conveniently
              connected via National Highway 8 and State Highway 158, approximately 18 km from
              Vadodara Junction Railway Station and 16 km from Vadodara Airport (BDQ).
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-[#E2B357]">
              <span>Latitude: 22.2887° N</span>
              <span>Longitude: 73.3638° E</span>
              <span>Elevation: 39m AMSL</span>
            </div>
          </div>

          <button
            onClick={() => onStartExploring()}
            className="px-6 py-3.5 bg-[#E2B357] hover:bg-yellow-400 text-[#183D32] font-black text-sm rounded-2xl shadow-xl transition-transform active:scale-95 shrink-0"
          >
            Launch Full 3D Campus
          </button>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="bg-[#122D25] text-gray-400 text-xs py-8 border-t border-[#83B7A1]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#E2B357] flex items-center justify-center font-black text-[#183D32] text-xs">
              PU
            </div>
            <span className="font-bold text-white text-sm">ParulVerse 3D</span>
            <span className="text-gray-500">| © 2026 Parul University. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <span>Aligned with Official Campus Guide Map</span>
            <span>·</span>
            <a
              href="https://www.paruluniversity.ac.in"
              target="_blank"
              rel="noreferrer"
              className="text-[#E2B357] hover:underline flex items-center gap-1"
            >
              <span>paruluniversity.ac.in</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
