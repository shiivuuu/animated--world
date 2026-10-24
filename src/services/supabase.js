// ParulVerse 3D - Supabase Backend & Local Database Service
// Supports both live Supabase PostgreSQL backend and a local persistent fallback

import { createClient } from '@supabase/supabase-js';
import { BUILDINGS } from '../data/buildings.js';
import { GUIDED_TOURS } from '../data/tours.js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isLiveBackendConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isLiveBackendConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Local storage persistent storage keys
const STORAGE_KEYS = {
  BUILDINGS: 'parulverse_buildings_v1',
  TOURS: 'parulverse_tours_v1',
  FEEDBACK: 'parulverse_feedback_v1',
  ADMIN_USER: 'parulverse_admin_session_v1'
};

// Initialize local database with verified static defaults if not already set
function initLocalStore() {
  if (typeof window === 'undefined') return;
  if (!localStorage.getItem(STORAGE_KEYS.BUILDINGS)) {
    localStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(BUILDINGS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TOURS)) {
    localStorage.setItem(STORAGE_KEYS.TOURS, JSON.stringify(GUIDED_TOURS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.FEEDBACK)) {
    localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify([]));
  }
}

initLocalStore();

export const DatabaseService = {
  // Fetch all buildings
  async getBuildings() {
    if (isLiveBackendConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('buildings')
          .select('*')
          .eq('published', true);
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Supabase query failed, falling back to local dataset:', err);
      }
    }
    // Fallback to local storage or bundled dataset
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.BUILDINGS);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return BUILDINGS;
  },

  // Update a building (used in Admin CMS)
  async updateBuilding(buildingId, updates) {
    if (isLiveBackendConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('buildings')
          .update(updates)
          .eq('id', buildingId)
          .select();
        if (!error) return { success: true, data };
      } catch (err) {
        console.warn('Live update error:', err);
      }
    }

    // Local fallback update
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEYS.BUILDINGS);
      let items = raw ? JSON.parse(raw) : [...BUILDINGS];
      items = items.map((b) => (b.id === buildingId ? { ...b, ...updates } : b));
      localStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(items));
      return { success: true, message: 'Saved to local database' };
    }
    return { success: false, message: 'Storage not accessible' };
  },

  // Reset buildings to official defaults
  async resetBuildingsToDefault() {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(BUILDINGS));
      return true;
    }
    return false;
  },

  // Get tours
  async getTours() {
    if (isLiveBackendConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('tours').select('*');
        if (!error && data && data.length > 0) return data;
      } catch (err) {
        console.warn('Tours live fetch fallback:', err);
      }
    }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEYS.TOURS);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
    }
    return GUIDED_TOURS;
  },

  // Submit visitor feedback
  async submitFeedback(feedback) {
    const entry = {
      id: 'fb-' + Date.now(),
      created_at: new Date().toISOString(),
      ...feedback
    };

    if (isLiveBackendConfigured && supabase) {
      try {
        const { error } = await supabase.from('feedback').insert([entry]);
        if (!error) return { success: true };
      } catch (err) {
        console.warn('Feedback live insert failed:', err);
      }
    }

    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(entry);
      localStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(list));
      return { success: true };
    }
    return { success: false };
  },

  // Admin authentication (supports local mock or Supabase Auth)
  async adminLogin(email, password) {
    if (isLiveBackendConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data?.user) {
        return { success: true, user: data.user };
      }
    }

    // Default admin demo credentials for review and testing:
    // admin@paruluniversity.ac.in / parulverse2026
    if (
      (email === 'admin@paruluniversity.ac.in' || email === 'admin') &&
      password === 'parulverse2026'
    ) {
      const user = { email: 'admin@paruluniversity.ac.in', role: 'administrator' };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(user));
      }
      return { success: true, user };
    }

    return { success: false, message: 'Invalid credentials. Use demo admin login.' };
  },

  getAdminSession() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  adminLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    }
    if (isLiveBackendConfigured && supabase) {
      supabase.auth.signOut();
    }
  }
};
