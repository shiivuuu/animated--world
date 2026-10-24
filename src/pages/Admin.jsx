// ParulVerse 3D - Campus Admin CMS Dashboard
// Content management for verified buildings, facilities, tours, and database status

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Building,
  Edit,
  Save,
  RotateCcw,
  LogOut,
  CheckCircle,
  AlertCircle,
  Database,
  Search,
  MessageSquare,
  X
} from 'lucide-react';
import { DatabaseService, isLiveBackendConfigured } from '../services/supabase.js';
import { BUILDINGS } from '../data/buildings.js';

export default function Admin({ onBackToCampus }) {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBuilding, setEditingBuilding] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Check existing session
  useEffect(() => {
    const existing = DatabaseService.getAdminSession();
    if (existing) {
      setSession(existing);
      loadBuildings();
    } else {
      setLoading(false);
    }
  }, []);

  const loadBuildings = async () => {
    setLoading(true);
    const data = await DatabaseService.getBuildings();
    setBuildings(data || BUILDINGS);
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    const res = await DatabaseService.adminLogin(email, password);
    if (res.success) {
      setSession(res.user);
      loadBuildings();
    } else {
      setLoginError(res.message || 'Invalid credentials');
    }
  };

  const handleLogout = () => {
    DatabaseService.adminLogout();
    setSession(null);
  };

  const handleSaveBuilding = async (e) => {
    e.preventDefault();
    if (!editingBuilding) return;

    setSaveStatus('Saving changes...');
    const res = await DatabaseService.updateBuilding(editingBuilding.id, {
      description: editingBuilding.description,
      openingHours: editingBuilding.openingHours,
      accessibility: editingBuilding.accessibility,
      published: editingBuilding.published
    });

    if (res.success) {
      setSaveStatus('Saved successfully!');
      loadBuildings();
      setTimeout(() => {
        setEditingBuilding(null);
        setSaveStatus('');
      }, 700);
    } else {
      setSaveStatus('Error saving changes');
    }
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset all buildings back to verified official defaults?')) {
      await DatabaseService.resetBuildingsToDefault();
      loadBuildings();
    }
  };

  // Filtered buildings list
  const filtered = buildings.filter(
    (b) =>
      b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 1. Login View
  if (!session) {
    return (
      <div className="min-h-screen bg-[#183D32] flex items-center justify-center p-4">
        <div className="bg-[#F7F5EF] w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 text-[#262D2A]">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#183D32] text-[#E2B357] font-black text-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              PU
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#183D32]">ParulVerse Admin CMS</h2>
            <p className="text-xs text-gray-500 mt-1">
              Campus Content & Facility Management Portal
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                Admin Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@paruluniversity.ac.in"
                className="w-full text-xs font-medium px-4 py-3 bg-white rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#183D32]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs font-medium px-4 py-3 bg-white rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-[#183D32]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#183D32] hover:bg-[#122D25] text-white font-bold text-xs rounded-xl shadow-lg transition-transform active:scale-95 mt-2"
            >
              Sign In to Admin Portal
            </button>
          </form>

          {/* Quick Demo Credentials Hint */}
          <div className="mt-6 p-3 bg-[#D9E9DF] rounded-xl text-[11px] text-[#183D32]">
            <span className="font-bold block mb-0.5">Demo Credentials:</span>
            <span>admin@paruluniversity.ac.in / parulverse2026</span>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onBackToCampus}
              className="text-xs text-gray-500 hover:text-[#183D32] font-semibold underline"
            >
              ← Return to 3D Campus Explorer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Admin Dashboard View
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#262D2A] flex flex-col">
      {/* Admin Header */}
      <header className="bg-[#183D32] text-white px-4 sm:px-8 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E2B357] flex items-center justify-center font-black text-[#183D32] text-sm">
            PU
          </div>
          <div>
            <h1 className="text-base font-bold">ParulVerse 3D Admin CMS</h1>
            <p className="text-[11px] text-gray-300">
              Database: {isLiveBackendConfigured ? 'Supabase Live Connected' : 'Local Persistent Storage'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onBackToCampus}
            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-semibold rounded-xl text-white transition-colors"
          >
            Go to 3D Explorer
          </button>
          <button
            onClick={handleLogout}
            className="p-2 bg-white/10 hover:bg-red-500/80 rounded-xl transition-colors text-white"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter buildings by code, name, category..."
              className="w-full pl-9 pr-4 py-2.5 bg-white rounded-xl border border-gray-200 text-xs font-medium outline-none focus:ring-2 focus:ring-[#183D32]"
            />
          </div>

          <button
            onClick={handleResetDefaults}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 rounded-xl shadow-sm transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Official Defaults</span>
          </button>
        </div>

        {/* Buildings Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-gray-100">
              <thead className="bg-[#EFECE3] text-gray-600 uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Code</th>
                  <th className="py-3 px-4">Building Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Floors</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-black text-[#183D32]">{b.code}</td>
                    <td className="py-3 px-4 font-semibold text-[#262D2A] max-w-xs truncate">
                      {b.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#D9E9DF] text-[#183D32]">
                        {b.categoryLabel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500">{b.floors} Levels</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.published !== false
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {b.published !== false ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setEditingBuilding(b)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#183D32] hover:bg-[#122D25] text-white text-[11px] font-bold rounded-lg transition-colors"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* 3. Building Edit Modal Drawer */}
      {editingBuilding && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#F7F5EF] w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-gray-200 text-[#262D2A] animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-[#183D32] text-white text-xs font-black rounded-lg">
                  {editingBuilding.code}
                </span>
                <h3 className="font-bold text-sm sm:text-base">{editingBuilding.name}</h3>
              </div>
              <button
                onClick={() => setEditingBuilding(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBuilding} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-500 uppercase block mb-1">
                  Verified Description
                </label>
                <textarea
                  rows={4}
                  value={editingBuilding.description || ''}
                  onChange={(e) =>
                    setEditingBuilding({ ...editingBuilding, description: e.target.value })
                  }
                  className="w-full p-3 bg-white rounded-xl border border-gray-300 outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-gray-500 uppercase block mb-1">
                  Operating Hours
                </label>
                <input
                  type="text"
                  value={editingBuilding.openingHours || ''}
                  onChange={(e) =>
                    setEditingBuilding({ ...editingBuilding, openingHours: e.target.value })
                  }
                  className="w-full p-2.5 bg-white rounded-xl border border-gray-300 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-500 uppercase block mb-1">
                  Accessibility Information
                </label>
                <input
                  type="text"
                  value={editingBuilding.accessibility || ''}
                  onChange={(e) =>
                    setEditingBuilding({ ...editingBuilding, accessibility: e.target.value })
                  }
                  className="w-full p-2.5 bg-white rounded-xl border border-gray-300 outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishedCheck"
                  checked={editingBuilding.published !== false}
                  onChange={(e) =>
                    setEditingBuilding({ ...editingBuilding, published: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#183D32]"
                />
                <label htmlFor="publishedCheck" className="font-bold text-gray-700">
                  Published and visible in 3D Campus Explorer
                </label>
              </div>

              {saveStatus && (
                <p className="text-center text-xs font-bold text-[#183D32] animate-pulse">
                  {saveStatus}
                </p>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingBuilding(null)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-[#183D32] hover:bg-[#122D25] text-white font-bold rounded-xl shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
