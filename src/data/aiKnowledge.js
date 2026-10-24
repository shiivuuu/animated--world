// ParulVerse 3D - AI Campus Assistant Knowledge Base & Intent Engine
// Grounded strictly in verified Parul University facts and official campus data

export const QUICK_PROMPTS = [
  "Where is the Central Library?",
  "Take me to Parul Sevashram Hospital",
  "How to reach Engineering block (PIET)?",
  "What food options are at the Food Court?",
  "Tell me about Hostel accommodation",
  "Start the Campus Highlights Tour"
];

export const INTENT_HANDLERS = [
  {
    patterns: [/library/i, /kalam library/i, /books/i, /study reading/i],
    response: "The Dr. A.P.J. Abdul Kalam Central Library is located in Block C1 on the western campus sector. It spans 5 floors with over 150,000 academic books, digital research databases (IEEE, Scopus), and 800+ quiet study cubicles.",
    action: { type: "SELECT_BUILDING", buildingId: "c1-admin-library" }
  },
  {
    patterns: [/hospital/i, /sevashram/i, /emergency/i, /doctor/i, /trauma/i, /icu/i],
    response: "Parul Sevashram Hospital (Block E2) is a 750-bed multi-specialty tertiary hospital located at the southern campus edge near Gate 2. It operates 24/7 with emergency trauma care, 12 modular operation theaters, and an accredited blood bank.",
    action: { type: "NAVIGATE_TO", buildingId: "e2-parul-sevashram-hospital" }
  },
  {
    patterns: [/piet/i, /engineering/i, /mechanical/i, /computer science engineering/i, /robotics/i],
    response: "Parul Institute of Engineering & Technology (PIET) is located at Block A1 on the western avenue, featuring state-of-the-art supercomputing labs, AI robotics workstations, and hackathon halls.",
    action: { type: "SELECT_BUILDING", buildingId: "a1-piet-main" }
  },
  {
    patterns: [/ai center/i, /c\.?v\.? raman/i, /supercomputer/i, /gpu/i],
    response: "The C.V. Raman Centre of Excellence (Block A25) is situated on the eastern technology avenue. It houses GPU supercomputing clusters, enterprise server farms, and specialized artificial intelligence research facilities.",
    action: { type: "SELECT_BUILDING", buildingId: "a25-cv-raman-centre" }
  },
  {
    patterns: [/food/i, /canteen/i, /cafeteria/i, /subway/i, /nescafe/i, /hungry/i, /lunch/i],
    response: "The Central Campus Food Court (Block F1) sits at the heart of campus near the central promenade. It features 1,200 open-air seats with brands like Subway, Nescafe Coffee Lounge, Amul Ice Cream, and diverse multi-cuisine counters.",
    action: { type: "NAVIGATE_TO", buildingId: "f1-central-food-court" }
  },
  {
    patterns: [/hostel/i, /stay/i, /room/i, /residence/i, /dorm/i, /kalam bhawan/i, /teresa/i],
    response: "Parul University provides on-campus residential housing for over 10,000 students across named blocks like Kalam Bhawan (H12), Shastri Bhawan (H1) for boys, and Teresa Bhawan (H19), Shakuntala Bhawan (H23) for girls. Equipped with Wi-Fi, biometric security, dining mess, and gyms.",
    action: { type: "SELECT_BUILDING", buildingId: "h12-kalam-bhawan" }
  },
  {
    patterns: [/sports/i, /gym/i, /stadium/i, /cricket/i, /football/i, /swimming/i],
    response: "The campus features a multi-purpose 4,000-seat Sports Stadium (G8) with FIFA-size football turf and athletic tracks, an Olympic 50m swimming pool (S1), and outdoor tennis and basketball complexes (G7).",
    action: { type: "SELECT_BUILDING", buildingId: "g8-pu-sports-stadium" }
  },
  {
    patterns: [/tour/i, /walkthrough/i, /guided/i],
    response: "I've started the Campus Highlights Tour for you! Sit back and enjoy the automated 3D guided flight through our major landmarks.",
    action: { type: "START_TOUR", tourId: "campus-highlights" }
  },
  {
    patterns: [/gate 1/i, /main gate/i, /entrance/i, /sh-?158/i],
    response: "Main Campus VIP Gate 1 is located directly on State Highway 158 (Waghodia Road). It features iconic architectural arches, visitor reception kiosks, and automated security barriers.",
    action: { type: "SELECT_BUILDING", buildingId: "gate1-main-vip" }
  },
  {
    patterns: [/admission/i, /placement/i, /fees/i, /counselling/i, /apply/i],
    response: "Admissions and Career Development Cells operate in Block C2. The university offers 250+ undergraduate, postgraduate, and diploma programs across engineering, medicine, management, law, and arts.",
    action: { type: "SELECT_BUILDING", buildingId: "c2-admission-placement" }
  }
];

export function queryAssistant(userText) {
  const query = userText.trim();
  if (!query) return null;

  for (const handler of INTENT_HANDLERS) {
    for (const pattern of handler.patterns) {
      if (pattern.test(query)) {
        return {
          text: handler.response,
          action: handler.action
        };
      }
    }
  }

  // Fallback response with helpful hints
  return {
    text: "I am ParulVerse AI, your official campus guide. I can help you find buildings, calculate walking routes, answer questions about admissions, hostels, or hospital care. Try asking: 'Where is Central Library?', 'Navigate to Sevashram Hospital', or 'Show me the Sports Stadium'.",
    action: null
  };
}
