# 🏛️ ParulVerse 3D — Parul University Interactive Virtual Campus Tour

> **"Explore your campus. Discover your future."**  
> An interactive, geographically-aligned 3D virtual tour and navigation web application for **Parul University** (Limda, Waghodia, Vadodara, Gujarat).

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-r183-black.svg)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF.svg)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com)
[![Accreditation](https://img.shields.io/badge/NAAC-A%2B%2B%20Grade-success.svg)](https://www.paruluniversity.ac.in)

---

## 📍 Geographic Alignment & Official References

- **Official Location**: Post Limda, Waghodia Taluka, Vadodara, Gujarat 391760, India
- **Campus Coordinates**: `22.28875° N, 73.36384° E`
- **Total Campus Area**: 250+ Acres
- **Population**: 43,000+ Scholars representing all Indian States & 65+ International Nations
- **Official References**:
  - Parul University Official Campus Guide Map (`A3-PU-Campus-Map-2023-R1-c2c_latest.pdf`)
  - Parul University Interactive Campus Map (`https://www.paruluniversity.ac.in/campusmap/`)
  - Satellite composite & OpenStreetMap geographic datum

---

## 🌟 Key Application Features

### 1. 🎓 Geographically Mapped 3D Campus Scene
- **42+ Verified Campus Buildings**: Modeled with realistic scale, architectural colors, window bands, entrance porticos, HVAC pods, solar arrays, and custom landmarks:
  - **Main Gate 1**: Iconic grand triumphal entrance arches on SH-158 (Waghodia Road)
  - **Block C1**: Central Administrative Headquarters & 5-story **Dr. A.P.J. Abdul Kalam Central Library** with golden rotunda dome
  - **Block A1**: Parul Institute of Engineering & Technology (PIET) Main Academic Wing
  - **Block E2**: Parul Sevashram Hospital (750-bed multi-specialty tertiary teaching hospital with red cross crest and emergency trauma bays)
  - **Block A25**: C.V. Raman Center of Excellence for Advanced Computational Skills & AI with holographic quantum data core
  - **Block G8**: Multi-purpose Sports Stadium & FIFA-dimension football pitch with 400m synthetic running track and 4,000-seat grandstands
  - **Block S1**: Olympic 50m 8-lane swimming pool and two-story fitness arena
  - **Block F1**: Central Food Court (1,200 seats, Subway, Nescafe, Amul, multi-cuisine outlets)
  - **Jay Sudha Botanical Garden & Watcher's Park**: Central illuminated musical fountain and open-air movie amphitheater
  - **Residential Hostels**: Kalam Bhawan, Shastri Bhawan, Atal Bhawan, Teresa Bhawan, Shakuntala Bhawan, and Kalpana Bhawan

### 2. 🎮 Multi-Mode Camera & Navigation Controls
- **Explore Mode**: Orbit, zoom, pan, and smooth camera flight when selecting buildings.
- **First-Person Walk Mode**: Ground-level exploration at realistic human eye height (1.8m) using keyboard (**WASD** or **Arrow Keys**) and mouse look, clamped within the 250-acre boundary.
- **Top-Down Aerial Map**: High-angle orthogonal bird's-eye view for quick spatial orientation.

### 3. 🚶‍♂️ A* Campus Pathfinding & 3D Glowing Route Ribbon
- Integrated campus pedestrian graph containing verified road intersections, portals, and gate access nodes.
- Shortest walkable path calculation using the **A\* algorithm** with Euclidean road weights.
- Visualized in real-time as an **animated glowing 3D path ribbon** with animated chevrons and a holographic rotating beacon pin at the target building.
- Turn-by-turn navigation banner displaying real-world distance (in meters) and estimated walking time.

### 4. 🗺️ Synchronized 2D Minimap
- Positioned in the viewport with expand/collapse capability.
- Dual visual styles: **Campus Guide Diagram** or **High-Resolution Satellite Composite**.
- Real-time player coordinates and facing direction indicator.
- Interactive building pin overlay with click-to-select.
- SVG route path overlay synchronized with the active 3D navigation route.

### 5. 🚪 Enterable 3D Virtual Interiors
- **Dr. A.P.J. Abdul Kalam Central Library**: Bookshelves, reading desks with green banker lamps, OPAC digital kiosks, and circulation desks.
- **Smart Interactive Classroom (Hall 204)**: Tiered stepped seating, 4K laser projection screen, and digital teacher podium.
- **AI Supercomputing Lab**: Enterprise GPU server cabinets with blinking status LEDs, dual-monitor workstations, and an autonomous robotics rover testbed.
- Interactive 3D information hotspot spheres with pop-up descriptions and a "Return to Campus" quick-action.

### 6. 🎧 Voice-Narrated Guided Tours
- Curated tours covering:
  1. **Campus Highlights Tour** (6 mins)
  2. **Engineering & Innovation Tour** (5 mins)
  3. **Medical & Healthcare Hub Tour** (4 mins)
  4. **Student Life & Residential Tour** (5 mins)
- Automated camera flight transitions from stop to stop.
- **Browser Text-to-Speech Voice Narration** (HTML5 Web Speech API) with mute and step-by-step progress tracking.

### 7. 🤖 UniGuide AI — Intelligent Campus Assistant
- Grounded query engine that answers questions about course faculties, admissions, hostels, and hospital emergency care.
- Resolves natural language user intents and triggers live 3D actions:
  - *“Where is Central Library?”* → Focuses camera and highlights Block C1.
  - *“Navigate to Sevashram Hospital”* → Computes walking route and displays 3D glowing path.
  - *“Start campus tour”* → Launches guided walkthrough.

### 8. ☀️ Dynamic Atmosphere & Procedural Web Audio
- **Time of Day Toggles**: Daylight, Golden Hour (Sunset), and Night Lights (illuminated windows and functional streetlamps).
- **Procedural Audio Engine**: Web Audio API synthesizer generating subtle campus breeze, bird chirps during the day, and peaceful crickets at night without external audio file dependencies.

### 9. 🛠️ Admin CMS Dashboard
- Administrative access for managing campus data.
- **Live Supabase PostgreSQL Backend** integration with a persistent local storage fallback.
- Building record editor: update descriptions, operational hours, accessibility status, and published state.
- Database status indicator and "Reset to Official Defaults" recovery action.
- **Demo Admin Credentials**: `admin@paruluniversity.ac.in` / `parulverse2026`.

---

## 💻 Tech Stack & Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + Vite 8 | Ultra-fast build pipeline & reactive component tree |
| **Styling & UI** | Tailwind CSS v4 | Warm ivory, forest green, sage & gold palette |
| **3D Rendering Engine** | Three.js + React Three Fiber + Drei | Interactive WebGL campus scene & 3D models |
| **Navigation & Pathfinding** | Custom A\* Algorithm + Route Graph | Walkable campus route computation |
| **Geographic Mapping** | OpenStreetMap + Leaflet + Satellite | 2D Minimap & spatial alignment |
| **Backend & Storage** | Supabase PostgreSQL + LocalStorage | Database service & CMS dashboard |
| **Icons & Sound** | Lucide React + Web Audio API | Vector icons & procedural audio soundscape |

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or newer recommended, tested on Node v24)
- [npm](https://npmjs.com) (v9+)

### Installation
```bash
# 1. Clone repository
git clone https://github.com/shiivuuu/animated--world.git
cd animated--world

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ⚙️ Environment Variables (Optional)

Create a `.env` file in the project root if connecting to a live Supabase project:

```env
VITE_SUPABASE_URL=https://your-supabase-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-public-key
```

*Note: If no `.env` is configured, ParulVerse 3D automatically operates in standalone mode using persistent local storage.*

---

## 📦 Production Build & Deployment

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Deploying to Vercel
1. Push code to your GitHub repository (`shiivuuu/animated--world`).
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Deploy!

---

## 🎨 Design Palette

| Swatch | Color Name | Hex Code | Usage |
|---|---|---|---|
| 🟡 | **Gold Accent** | `#E2B357` | University crest, active highlights, key CTAs |
| 🌲 | **Forest Green** | `#183D32` | Primary brand tone, headers, roofs, buttons |
| 🌿 | **Sage** | `#83B7A1` | Secondary accents, badges, selection states |
| 🍃 | **Mint** | `#D9E9DF` | Soft backgrounds, category tags |
| 📜 | **Warm Ivory** | `#F7F5EF` | Page background, panels, card containers |
| ⬛ | **Charcoal** | `#262D2A` | Typography, roads, high contrast elements |

---

## 👥 Credits & Verification

- **Author / Developer**: Shivam Yadav ([@shiivuuu](https://github.com/shiivuuu))
- **Institution**: Parul University, Vadodara, Gujarat
- Aligned strictly with the **ParulVerse 3D Full Implementation Plan**.
