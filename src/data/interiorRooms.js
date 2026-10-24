// Parul University - Enterable 3D Interior Spaces
// Verified configurations for interactive virtual interior walkthroughs

export const INTERIOR_ROOMS = {
  "central-library": {
    id: "central-library",
    title: "Dr. A.P.J. Abdul Kalam Central Library - Reading & Digital Wing",
    buildingId: "c1-admin-library",
    buildingCode: "C1",
    subtitle: "Ground Floor Main Reading Hall & Digital Reference Section",
    ambientColor: "#F7F5EF",
    wallColor: "#EAE5DA",
    floorColor: "#7A6855", // warm polished wood
    ceilingHeight: 4.5,
    roomWidth: 24,
    roomLength: 30,
    cameraStart: { position: [0, 1.8, 11], target: [0, 1.5, 0] },
    hotspots: [
      {
        id: "lib-catalog",
        position: [-6, 1.2, 3],
        title: "Digital OPAC Catalog & Search Kiosks",
        description: "Touchscreen terminals allowing students to search over 150,000 physical volumes, reserve books, and query international research journals.",
        category: "Digital Resource"
      },
      {
        id: "lib-rare-books",
        position: [7, 1.5, -4],
        title: "Dr. Kalam Memorial Rare Manuscripts Section",
        description: "Archived collection of scientific literature, doctoral theses, and rare historical engineering journals donated by eminent scholars.",
        category: "Archives"
      },
      {
        id: "lib-study-cubicles",
        position: [-7, 1.2, -6],
        title: "Silent Research Cubicles",
        description: "Individual private study pods equipped with high-speed Ethernet ports, power sockets, and ergonomic seating for undisturbed study.",
        category: "Study Zone"
      },
      {
        id: "lib-circulation",
        position: [0, 1.2, 8],
        title: "RFID Automated Book Issue & Return Counter",
        description: "Self-service smart kiosks enabling instant issue and return of textbooks in under 10 seconds using student RFID smart cards.",
        category: "Circulation"
      }
    ],
    features: [
      "150,000+ Printed Academic Books",
      "Subscriptions to IEEE, ScienceDirect & Scopus",
      "Air-Conditioned 800+ Seat Capacity",
      "24x7 Exam Night Reading Lounges"
    ]
  },

  "smart-classroom": {
    id: "smart-classroom",
    title: "PIET Advanced Interactive Lecture Theater (Hall 204)",
    buildingId: "a1-piet-main",
    buildingCode: "A1",
    subtitle: "Tiered Multimedia Smart Classroom with 4K Laser Projection",
    ambientColor: "#F7F5EF",
    wallColor: "#E2DACF",
    floorColor: "#3A4440", // dark acoustic carpet
    ceilingHeight: 5.0,
    roomWidth: 20,
    roomLength: 24,
    cameraStart: { position: [0, 2.0, 9], target: [0, 1.6, -5] },
    hotspots: [
      {
        id: "cls-podium",
        position: [-3, 1.2, -7],
        title: "Interactive Smart Lectern & Digital Stylus",
        description: "Equipped with dual-touch digital tablets, mic integration, and direct feed to campus cloud video lecture recording servers.",
        category: "Teaching Tech"
      },
      {
        id: "cls-screen",
        position: [0, 2.8, -9.8],
        title: "4K Laser Projection & Live Remote Collaboration",
        description: "Ultra-wide laser projection surface supporting split-screen live coding, 3D CAD model rendering, and remote guest lectures from global experts.",
        category: "Display"
      },
      {
        id: "cls-seating",
        position: [4, 1.5, 2],
        title: "Tiered Ergonomic Student Seating with Power & LAN",
        description: "Acoustically treated tiered seating for 120 scholars with individual laptop charging sockets and high-density 5GHz Wi-Fi.",
        category: "Student Facilities"
      }
    ],
    features: [
      "Acoustically Tuned Surround Sound System",
      "Automated Lecture Capture for Canvas LMS",
      "Dynamic Climate Control",
      "Capacity: 120 Students"
    ]
  },

  "ai-lab": {
    id: "ai-lab",
    title: "C.V. Raman Center - Supercomputing & AI Lab",
    buildingId: "a25-cv-raman-centre",
    buildingCode: "A25",
    subtitle: "Enterprise GPU Clusters, Robotics Testbed & Server Racks",
    ambientColor: "#0D1B2A",
    wallColor: "#1B263B",
    floorColor: "#151F28", // anti-static raised server floor
    ceilingHeight: 4.2,
    roomWidth: 22,
    roomLength: 26,
    cameraStart: { position: [0, 1.8, 9], target: [0, 1.4, 0] },
    hotspots: [
      {
        id: "ai-servers",
        position: [-7, 1.8, -4],
        title: "Nvidia GPU Supercomputing Cluster",
        description: "Dedicated enterprise GPU server racks delivering over 1.2 PetaFLOPS of AI compute for deep neural network training and computer vision.",
        category: "High Performance Compute"
      },
      {
        id: "ai-workstations",
        position: [5, 1.2, 2],
        title: "Dual-Monitor Deep Learning Developer Terminals",
        description: "High-spec workstations running PyTorch, TensorFlow, ROS (Robot Operating System), and Unreal Engine 5 simulation pipelines.",
        category: "Developer Stations"
      },
      {
        id: "ai-robotics",
        position: [0, 0.8, -2],
        title: "Autonomous Robotics Navigation Arena",
        description: "Test arena with LiDAR positioning and motion capture cameras for testing autonomous mobile robots and drone stabilization algorithms.",
        category: "Robotics"
      }
    ],
    features: [
      "1.2 PetaFLOPS GPU Accelerated Compute",
      "Precision Chilled Air Server Environment",
      "High-Speed 40 Gbps Fiber Network",
      "Autonomous Ground Vehicle Test Track"
    ]
  }
};
