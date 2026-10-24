// Parul University - Pre-configured Guided 3D Virtual Tours
// Each tour includes sequenced camera waypoints, building IDs, narrative audio scripts, and highlights

export const GUIDED_TOURS = [
  {
    id: "campus-highlights",
    name: "Campus Highlights & General Tour",
    tagline: "The essential 360° introduction to Parul University",
    duration: "6 mins",
    icon: "Compass",
    color: "#183D32",
    badge: "Most Popular",
    description: "Explore the core landmarks of Parul University, starting from the iconic Main Gate on SH-158, through the 5-story Central Library, lush Botanical Gardens, Central Food Court, and Olympic sports grounds.",
    stops: [
      {
        sequence: 1,
        buildingId: "gate1-main-vip",
        title: "Main Campus VIP Gate 1",
        cameraPosition: { x: -350, y: 35, z: 40 },
        cameraTarget: { x: -300, y: 5, z: 0 },
        narration: "Welcome to Parul University, Vadodara, Gujarat. Spanning across 250 lush green acres, this NAAC A++ accredited university welcomes over 43,000 scholars from all Indian states and 65+ countries worldwide through its iconic entrance on State Highway 158."
      },
      {
        sequence: 2,
        buildingId: "c1-admin-library",
        title: "Dr. A.P.J. Abdul Kalam Central Library & Administration",
        cameraPosition: { x: -220, y: 40, z: -70 },
        cameraTarget: { x: -180, y: 10, z: -30 },
        narration: "Here stands Block C1, the administrative nerve center and the Dr. A.P.J. Abdul Kalam Central Library. Holding over 150,000 physical volumes, digital journal repositories, and 800+ reading cubicles, it serves as the vibrant intellectual heart of our campus."
      },
      {
        sequence: 3,
        buildingId: "a1-piet-main",
        title: "Parul Institute of Engineering & Technology (PIET)",
        cameraPosition: { x: -250, y: 38, z: 70 },
        cameraTarget: { x: -210, y: 10, z: 95 },
        narration: "Parul Institute of Engineering & Technology (PIET) is one of Gujarat's premier engineering institutions, featuring state-of-the-art supercomputing workstations, AI robotics labs, and industry tie-ups with leading tech giants."
      },
      {
        sequence: 4,
        buildingId: "l2-jay-sudha-botanical-garden",
        title: "Jay Sudha Botanical Garden & Central Fountain",
        cameraPosition: { x: -30, y: 25, z: -40 },
        cameraTarget: { x: 0, y: 2, z: 0 },
        narration: "At the geographical center of campus is the Jay Sudha Botanical Garden and Musical Fountain. A soothing green sanctuary where students stroll between classes amidst diverse indigenous flora and shaded study pergolas."
      },
      {
        sequence: 5,
        buildingId: "f1-central-food-court",
        title: "Central Food Court & Student Activity Center",
        cameraPosition: { x: 70, y: 30, z: 90 },
        cameraTarget: { x: 30, y: 5, z: 60 },
        narration: "The Central Food Court is the social epicenter of student life. Featuring international food chains like Subway, Nescafe coffee lounges, and regional cuisine counters, seating more than 1,200 students in an open-air vibrant atmosphere."
      },
      {
        sequence: 6,
        buildingId: "g8-pu-sports-stadium",
        title: "Multi-Purpose Sports Stadium & Football Pitch",
        cameraPosition: { x: 0, y: 55, z: -170 },
        cameraTarget: { x: 0, y: 5, z: -240 },
        narration: "Our tour concludes at the massive Parul University Sports Stadium. Featuring a full-size FIFA-regulation football pitch, floodlights for night cricket leagues, and a 400m synthetic athletic running track with seating for 4,000 spectators."
      }
    ]
  },
  {
    id: "engineering-tech",
    name: "Engineering & Innovation Tour",
    tagline: "Explore cutting-edge laboratories, workshops and AI centers",
    duration: "5 mins",
    icon: "Cpu",
    color: "#2B6CB0",
    badge: "Tech & Research",
    description: "A specialized walkthrough of the Faculty of Engineering & Technology, Advanced Computing Centers, Robotics labs, and the C.V. Raman Center of Excellence.",
    stops: [
      {
        sequence: 1,
        buildingId: "a1-piet-main",
        title: "PIET Main Academic Block",
        cameraPosition: { x: -250, y: 40, z: 70 },
        cameraTarget: { x: -210, y: 10, z: 95 },
        narration: "We begin at PIET Block A1, housing Computer Science, AI, and Mechanical departments. Notice the multi-story modern facade with large interactive lecture halls."
      },
      {
        sequence: 2,
        buildingId: "a20-engineering-workshops",
        title: "Central Engineering Workshops & FabLab",
        cameraPosition: { x: 140, y: 30, z: 95 },
        cameraTarget: { x: 175, y: 6, z: 120 },
        narration: "Here in the Central Engineering Workshops, students gain hands-on industrial expertise with CNC milling machines, laser cutters, foundry bays, and formula student race car fabrication."
      },
      {
        sequence: 3,
        buildingId: "a19-pit-technology",
        title: "Parul Institute of Technology (PIT)",
        cameraPosition: { x: 80, y: 35, z: 65 },
        cameraTarget: { x: 110, y: 10, z: 95 },
        narration: "Parul Institute of Technology (PIT) is dedicated to cyber security, cloud architecture, and game engineering, alongside the state-of-the-art Hotel Management training kitchens."
      },
      {
        sequence: 4,
        buildingId: "a24-bhagat-singh-bhawan",
        title: "Bhagat Singh Bhawan (Computer Applications)",
        cameraPosition: { x: 120, y: 35, z: -55 },
        cameraTarget: { x: 160, y: 10, z: -30 },
        narration: "Bhagat Singh Bhawan is the powerhouse of BCA and MCA programs, housing over 600 high-speed networked computing nodes and active software developer clubs."
      },
      {
        sequence: 5,
        buildingId: "a25-cv-raman-centre",
        title: "C.V. Raman Centre - AI Center of Excellence",
        cameraPosition: { x: 255, y: 38, z: -60 },
        cameraTarget: { x: 220, y: 10, z: -30 },
        narration: "Our final tech stop is the C.V. Raman Centre of Excellence. Home to high-performance GPU clusters, quantum computing simulators, and enterprise AI research labs."
      }
    ]
  },
  {
    id: "medical-health",
    name: "Medical & Healthcare Hub Tour",
    tagline: "Inside Gujarat's premier health sciences & hospital campus",
    duration: "4 mins",
    icon: "HeartPulse",
    color: "#E05A47",
    badge: "Medical Sciences",
    description: "Discover the 750-bed multi-specialty Sevashram Hospital, PIMSR Medical College, Symphony Hall, and the Ayurvedic & Homoeopathic hospitals.",
    stops: [
      {
        sequence: 1,
        buildingId: "gate2-hospital-entry",
        title: "Hospital Gate 2 (Emergency Access)",
        cameraPosition: { x: -80, y: 25, z: 460 },
        cameraTarget: { x: -80, y: 6, z: 420 },
        narration: "Entering through Hospital Gate 2, designed specifically for rapid emergency access, dedicated ambulance green corridors, and round-the-clock patient intake."
      },
      {
        sequence: 2,
        buildingId: "e2-parul-sevashram-hospital",
        title: "Parul Sevashram Hospital (750 Beds)",
        cameraPosition: { x: -130, y: 45, z: 320 },
        cameraTarget: { x: -80, y: 15, z: 350 },
        narration: "Parul Sevashram Hospital is a NABH-accredited 750-bed multi-specialty tertiary care teaching hospital. Equipped with 12 modular operation theaters, modern ICU/NICU units, and emergency trauma wings."
      },
      {
        sequence: 3,
        buildingId: "a12-pimsr-medical",
        title: "PIMSR Medical College & Symphony Hall",
        cameraPosition: { x: -130, y: 42, z: 250 },
        cameraTarget: { x: -80, y: 12, z: 275 },
        narration: "Directly adjacent is the Parul Institute of Medical Sciences & Research, recognized by the National Medical Commission for MBBS and MD programs, along with the magnificent 1500-seat Symphony Hall."
      },
      {
        sequence: 4,
        buildingId: "e1-parul-ayurved-hospital",
        title: "Parul Ayurved Hospital & Wellness Retreat",
        cameraPosition: { x: 45, y: 35, z: 310 },
        cameraTarget: { x: 0, y: 10, z: 335 },
        narration: "Completing our medical circuit is the Parul Ayurved Hospital, integrating authentic ancient Ayurvedic therapies, Panchakarma rejuvenation wings, and a 600-species herbal garden."
      }
    ]
  },
  {
    id: "student-life",
    name: "Student Life & Residential Tour",
    tagline: "Experience dorm life, athletics, food courts and recreation",
    duration: "5 mins",
    icon: "Smile",
    color: "#E2B357",
    badge: "Campus Life",
    description: "Take a tour through modern student residences, dining halls, recreation hubs, Olympic swimming pool, and student hangouts.",
    stops: [
      {
        sequence: 1,
        buildingId: "f1-central-food-court",
        title: "Central Food Court & Hangout Plaza",
        cameraPosition: { x: 70, y: 28, z: 85 },
        cameraTarget: { x: 30, y: 6, z: 60 },
        narration: "Start your campus life journey at the bustling Central Food Court, where students gather daily for breakfast, discussions, and international culinary options."
      },
      {
        sequence: 2,
        buildingId: "l1-watchers-park",
        title: "Watcher's Park & Open-Air Cinema",
        cameraPosition: { x: -40, y: 25, z: -110 },
        cameraTarget: { x: 0, y: 3, z: -90 },
        narration: "Watcher's Park provides the perfect relaxation zone with shaded grass lawns, open-air movie screening amphitheater, and acoustic band performance areas."
      },
      {
        sequence: 3,
        buildingId: "s1-olympic-swimming-pool",
        title: "Olympic Swimming Pool & Gym Complex",
        cameraPosition: { x: 150, y: 30, z: -170 },
        cameraTarget: { x: 190, y: 6, z: -150 },
        narration: "Stay fit at the 50-meter Olympic regulation swimming pool, diving boards, and two-story air-conditioned fitness gymnasium."
      },
      {
        sequence: 4,
        buildingId: "h12-kalam-bhawan",
        title: "Kalam Bhawan (International Boys Residence)",
        cameraPosition: { x: 220, y: 40, z: -180 },
        cameraTarget: { x: 250, y: 12, z: -210 },
        narration: "Kalam Bhawan offers premier air-conditioned and non-AC rooms, high-speed Wi-Fi, recreation rooms, and a dedicated multi-cuisine dining mess."
      },
      {
        sequence: 5,
        buildingId: "h19-teresa-bhawan",
        title: "Teresa Bhawan (Girls Residence Wings A-D)",
        cameraPosition: { x: 180, y: 40, z: 160 },
        cameraTarget: { x: 220, y: 12, z: 180 },
        narration: "Teresa Bhawan is a modern gated girls residential enclave featuring 24/7 security, manicured courtyard gardens, in-house salon, and biometric turnstiles."
      }
    ]
  }
];

export const TOURS_BY_ID = GUIDED_TOURS.reduce((acc, t) => {
  acc[t.id] = t;
  return acc;
}, {});
