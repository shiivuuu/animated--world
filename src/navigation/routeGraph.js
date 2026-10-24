// Parul University - Campus Road & Walkway Navigation Graph
// Graph nodes represent verified road intersections, building entrance portals, and gates
// Edges represent confirmed walkable pedestrian and transit pathways

export const ROUTE_NODES = [
  // Gates & Main Access Nodes
  { id: "node-gate1", x: -290, z: 0, label: "Main Gate 1 Entry Plaza" },
  { id: "node-gate2", x: -80, z: 400, label: "Hospital Gate 2 Entry" },
  { id: "node-gate3", x: 0, z: -300, label: "North Sports Gate 3 Entry" },

  // West Highway & Admin Sector Nodes
  { id: "node-w1", x: -240, z: 0, label: "Gate 1 Avenue Junction" },
  { id: "node-w2", x: -180, z: -30, label: "C1 Central Library Entrance" },
  { id: "node-w3", x: -180, z: 25, label: "C2 Admissions Entrance" },
  { id: "node-w4", x: -180, z: -80, label: "North-West Parking & C3 Junction" },
  { id: "node-w5", x: -140, z: -80, label: "C3 International Affairs Entrance" },
  { id: "node-w6", x: -110, z: -30, label: "B1 Central Bank Plaza" },

  // Engineering & South-West Sector Nodes
  { id: "node-eng-main", x: -180, z: 95, label: "PIET A1 Main Portico" },
  { id: "node-eng-diploma", x: -180, z: 145, label: "PIET A2 Diploma Entrance" },
  { id: "node-eng-dblock", x: -180, z: 195, label: "PIET A3 D-Block Entrance" },
  { id: "node-pharmacy", x: -140, z: 95, label: "A4 Pharmacy Entrance" },
  { id: "node-nursing", x: -140, z: 155, label: "A6 Nursing Entrance" },
  { id: "node-homoeo", x: -140, z: 215, label: "A7 Homoeopathy Entrance" },
  { id: "node-mgmt", x: -70, z: 95, label: "A14 Management Studies Entrance" },
  { id: "node-arch", x: -10, z: 125, label: "A16 Architecture Entrance" },
  { id: "node-poly", x: -75, z: 195, label: "A9 Polytechnic Entrance" },

  // Central Campus Nodes (Gardens & Food Court)
  { id: "node-center", x: 0, z: 0, label: "Jay Sudha Botanical Central Plaza" },
  { id: "node-c-west", x: -80, z: 0, label: "West-Central Promenade" },
  { id: "node-c-north", x: 0, z: -60, label: "Watcher's Park South Crossway" },
  { id: "node-c-south", x: 0, z: 60, label: "Food Court North Concourse" },
  { id: "node-food-court", x: 30, z: 60, label: "Central Food Court Entrance" },
  { id: "node-c-east", x: 80, z: 0, label: "East-Central Promenade" },
  { id: "node-c4", x: -50, z: -70, label: "C4 HR & Doctoral Entrance" },
  { id: "node-c5", x: 30, z: -60, label: "C5 Hostel Admin Office" },
  { id: "node-watchers", x: 0, z: -90, label: "Watcher's Park Amphitheater" },

  // North Sector (Sports, Stadium & North Hostels)
  { id: "node-stadium-s", x: 0, z: -170, label: "Stadium South Gateway" },
  { id: "node-stadium-w", x: -70, z: -240, label: "Stadium West Pavilion" },
  { id: "node-stadium-e", x: 70, z: -240, label: "Stadium East Pavilion & Track" },
  { id: "node-sports-complex", x: -80, z: -170, label: "G7 Sports Complex Entrance" },
  { id: "node-pool", x: 190, z: -150, label: "S1 Olympic Swimming Pool Entrance" },
  { id: "node-hostel-shastri", x: 190, z: -210, label: "H1 Shastri Bhawan Entry" },
  { id: "node-hostel-kalam", x: 250, z: -210, label: "H12 Kalam Bhawan Entry" },
  { id: "node-hostel-tagore", x: 260, z: -140, label: "H15 Tagore Bhawan Entry" },
  { id: "node-hostel-atal", x: 200, z: -270, label: "H25 Atal Bhawan Entry" },

  // East Sector (PIT, Computing, Media, Research)
  { id: "node-pit", x: 110, z: 95, label: "PIT A19 Technology Entrance" },
  { id: "node-workshops", x: 175, z: 120, label: "A20 Central Workshops" },
  { id: "node-sciences", x: 110, z: 25, label: "A21 Applied Sciences Entrance" },
  { id: "node-subhash", x: 90, z: -40, label: "A23 Subhash Chandra Bose Entrance" },
  { id: "node-bhagat", x: 160, z: -30, label: "A24 Bhagat Singh Bhawan Entrance" },
  { id: "node-cv-raman", x: 220, z: -30, label: "A25 C.V. Raman AI Center Entrance" },
  { id: "node-studio", x: 265, z: 40, label: "A26 24 Frames Studio Entrance" },

  // South-East Sector (Girls Hostels)
  { id: "node-hostel-teresa", x: 220, z: 180, label: "H19 Teresa Bhawan Entry Gate" },
  { id: "node-hostel-shakuntala", x: 220, z: 240, label: "H23 Shakuntala Bhawan Entry" },
  { id: "node-hostel-kalpana", x: 160, z: 240, label: "H28 Kalpana Bhawan Entry" },
  { id: "node-hostel-indira", x: 275, z: 210, label: "H8 Indira Bhawan Entry" },

  // South Hospital Complex
  { id: "node-med-junc", x: -80, z: 240, label: "Medical Avenue North Junction" },
  { id: "node-pimsr", x: -80, z: 275, label: "A12 PIMSR Medical College & Symphony Hall" },
  { id: "node-sevashram", x: -80, z: 350, label: "E2 Parul Sevashram Hospital Main Portico" },
  { id: "node-ayurved-hosp", x: 0, z: 335, label: "E1 Ayurved Hospital Entrance" },
  { id: "node-ayurved-clg", x: -10, z: 260, label: "A13 Ayurved College Entrance" },
  { id: "node-homeo-hosp", x: -140, z: 275, label: "E5 Homoeopathic Hospital Entrance" }
];

export const ROUTE_EDGES = [
  // Gate 1 to West Spine
  { from: "node-gate1", to: "node-w1" },
  { from: "node-w1", to: "node-w2" },
  { from: "node-w1", to: "node-w3" },
  { from: "node-w2", to: "node-w4" },
  { from: "node-w4", to: "node-w5" },
  { from: "node-w2", to: "node-w6" },
  { from: "node-w6", to: "node-c-west" },
  { from: "node-w3", to: "node-c-west" },

  // West Spine to Engineering
  { from: "node-w3", to: "node-eng-main" },
  { from: "node-eng-main", to: "node-eng-diploma" },
  { from: "node-eng-diploma", to: "node-eng-dblock" },
  { from: "node-eng-main", to: "node-pharmacy" },
  { from: "node-pharmacy", to: "node-nursing" },
  { from: "node-nursing", to: "node-homoeo" },
  { from: "node-eng-main", to: "node-mgmt" },
  { from: "node-mgmt", to: "node-arch" },
  { from: "node-arch", to: "node-c-south" },
  { from: "node-pharmacy", to: "node-poly" },
  { from: "node-poly", to: "node-med-junc" },

  // Central Hub Connections
  { from: "node-c-west", to: "node-center" },
  { from: "node-center", to: "node-c-north" },
  { from: "node-center", to: "node-c-south" },
  { from: "node-center", to: "node-c-east" },
  { from: "node-c-south", to: "node-food-court" },
  { from: "node-c-north", to: "node-watchers" },
  { from: "node-c-north", to: "node-c4" },
  { from: "node-c-north", to: "node-c5" },
  { from: "node-w5", to: "node-c4" },

  // Central to North Sector (Sports & North Hostels)
  { from: "node-watchers", to: "node-stadium-s" },
  { from: "node-stadium-s", to: "node-stadium-w" },
  { from: "node-stadium-s", to: "node-stadium-e" },
  { from: "node-stadium-w", to: "node-sports-complex" },
  { from: "node-w4", to: "node-sports-complex" },
  { from: "node-stadium-s", to: "node-gate3" },
  { from: "node-stadium-e", to: "node-pool" },
  { from: "node-pool", to: "node-hostel-shastri" },
  { from: "node-hostel-shastri", to: "node-hostel-kalam" },
  { from: "node-hostel-kalam", to: "node-hostel-atal" },
  { from: "node-hostel-kalam", to: "node-hostel-tagore" },
  { from: "node-hostel-shastri", to: "node-gate3" },

  // Central to East Sector (PIT, Computing, Media)
  { from: "node-c-east", to: "node-sciences" },
  { from: "node-c-east", to: "node-subhash" },
  { from: "node-food-court", to: "node-pit" },
  { from: "node-pit", to: "node-workshops" },
  { from: "node-pit", to: "node-sciences" },
  { from: "node-subhash", to: "node-bhagat" },
  { from: "node-bhagat", to: "node-cv-raman" },
  { from: "node-sciences", to: "node-bhagat" },
  { from: "node-cv-raman", to: "node-studio" },
  { from: "node-pool", to: "node-cv-raman" },
  { from: "node-hostel-tagore", to: "node-bhagat" },

  // East Sector to South-East Hostels
  { from: "node-pit", to: "node-hostel-teresa" },
  { from: "node-hostel-teresa", to: "node-hostel-shakuntala" },
  { from: "node-hostel-shakuntala", to: "node-hostel-kalpana" },
  { from: "node-hostel-teresa", to: "node-hostel-indira" },
  { from: "node-workshops", to: "node-hostel-teresa" },

  // South-West to Hospital Sector
  { from: "node-homoeo", to: "node-homeo-hosp" },
  { from: "node-homeo-hosp", to: "node-pimsr" },
  { from: "node-med-junc", to: "node-pimsr" },
  { from: "node-pimsr", to: "node-sevashram" },
  { from: "node-sevashram", to: "node-gate2" },
  { from: "node-sevashram", to: "node-ayurved-hosp" },
  { from: "node-ayurved-hosp", to: "node-ayurved-clg" },
  { from: "node-ayurved-clg", to: "node-c-south" },
  { from: "node-ayurved-clg", to: "node-hostel-kalpana" }
];

// Mapping from Building ID to the closest primary navigation graph node
export const BUILDING_TO_NODE_MAP = {
  "gate1-main-vip": "node-gate1",
  "gate2-hospital-entry": "node-gate2",
  "gate3-sports-hostel": "node-gate3",
  "c1-admin-library": "node-w2",
  "c2-admission-placement": "node-w3",
  "c3-international-affairs": "node-w5",
  "c4-cultural-doctoral": "node-c4",
  "c5-hostel-office": "node-c5",
  "a1-piet-main": "node-eng-main",
  "a2-piet-diploma": "node-eng-diploma",
  "a3-piet-dblock": "node-eng-dblock",
  "a4-pharmacy-pip": "node-pharmacy",
  "a6-nursing": "node-nursing",
  "a7-homeopathy-physio": "node-homoeo",
  "a9-polytechnic": "node-poly",
  "a12-pimsr-medical": "node-pimsr",
  "a13-ayurved-college": "node-ayurved-clg",
  "a14-piba-management": "node-mgmt",
  "a16-architecture-piad": "node-arch",
  "a19-pit-technology": "node-pit",
  "a20-engineering-workshops": "node-workshops",
  "a21-applied-sciences": "node-sciences",
  "a23-subhash-chandra-bose": "node-subhash",
  "a24-bhagat-singh-bhawan": "node-bhagat",
  "a25-cv-raman-centre": "node-cv-raman",
  "a26-24-frames-studio": "node-studio",
  "e2-parul-sevashram-hospital": "node-sevashram",
  "e1-parul-ayurved-hospital": "node-ayurved-hosp",
  "e5-homeopathic-hospital": "node-homeo-hosp",
  "h1-shastri-bhawan": "node-hostel-shastri",
  "h12-kalam-bhawan": "node-hostel-kalam",
  "h15-tagore-bhawan": "node-hostel-tagore",
  "h19-teresa-bhawan": "node-hostel-teresa",
  "h23-shakuntala-bhawan": "node-hostel-shakuntala",
  "h25-atal-bhawan": "node-hostel-atal",
  "h28-kalpana-bhawan": "node-hostel-kalpana",
  "h8-indira-bhawan": "node-hostel-indira",
  "g8-pu-sports-stadium": "node-stadium-s",
  "g7-athletic-training": "node-sports-complex",
  "s1-olympic-swimming-pool": "node-pool",
  "f1-central-food-court": "node-food-court",
  "b1-banking-plaza": "node-w6",
  "l1-watchers-park": "node-watchers",
  "l2-jay-sudha-botanical-garden": "node-center"
};

export const NODES_BY_ID = ROUTE_NODES.reduce((acc, n) => {
  acc[n.id] = n;
  return acc;
}, {});
