// ParulVerse 3D - Root Application & View Router
// Connects Landing Page, 3D Campus Explorer, and Admin CMS Portal

import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import Home from './pages/Home.jsx';
import Explorer from './pages/Explorer.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'explorer' | 'admin'

  // Pre-selected parameters when transitioning from Home to Explorer
  const [targetBuildingId, setTargetBuildingId] = useState(null);
  const [targetTourId, setTargetTourId] = useState(null);

  // Transition from Home into 3D Explorer
  const handleStartExploring = (buildingId = null) => {
    setTargetBuildingId(buildingId);
    setTargetTourId(null);
    setCurrentView('explorer');
  };

  const handleStartTour = (tourId) => {
    setTargetTourId(tourId);
    setTargetBuildingId(null);
    setCurrentView('explorer');
  };

  const handleSelectBuildingFromHome = (buildingId) => {
    setTargetBuildingId(buildingId);
    setTargetTourId(null);
    setCurrentView('explorer');
  };

  if (isLoading) {
    return <LoadingScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <div className="w-full h-full min-h-screen bg-[#F7F5EF] font-sans antialiased">
      {/* Top Floating View Navigation Switcher (when not on Explorer) */}
      {currentView !== 'explorer' && (
        <nav className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-gray-200 text-xs font-bold">
          <button
            onClick={() => setCurrentView('home')}
            className={`px-3 py-1 rounded-xl transition-all ${
              currentView === 'home'
                ? 'bg-[#183D32] text-white shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleStartExploring()}
            className={`px-3 py-1 rounded-xl transition-all ${
              currentView === 'explorer'
                ? 'bg-[#183D32] text-white shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            3D Explorer
          </button>
          <button
            onClick={() => setCurrentView('admin')}
            className={`px-3 py-1 rounded-xl transition-all ${
              currentView === 'admin'
                ? 'bg-[#183D32] text-white shadow-sm'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Admin CMS
          </button>
        </nav>
      )}

      {/* View Routing */}
      {currentView === 'home' && (
        <Home
          onStartExploring={handleStartExploring}
          onStartTour={handleStartTour}
          onSelectBuilding={handleSelectBuildingFromHome}
        />
      )}

      {currentView === 'explorer' && (
        <Explorer
          initialBuildingId={targetBuildingId}
          initialTourId={targetTourId}
          onNavigateHome={() => setCurrentView('home')}
          onNavigateAdmin={() => setCurrentView('admin')}
        />
      )}

      {currentView === 'admin' && (
        <Admin onBackToCampus={() => setCurrentView('explorer')} />
      )}
    </div>
  );
}
