// Content from single-service pages that were merged into their hub pages
// (the old URLs 301 to the hub). Each entry renders as one H3 section on the
// hub, so the hub covers those searches instead of several thin pages.

export interface MergedServiceFaq {
  question: string;
  answer: string;
}

export interface MergedService {
  id: string;
  title: string;
  intro: string;
  items: string[];
  faqs: MergedServiceFaq[];
}

export interface MergedServiceGroup {
  heading: string;
  intro: string;
  services: MergedService[];
}

export type MergedServiceHub = 'bathroom' | 'electrical' | 'kitchen' | 'sink' | 'carpentry';

export const MERGED_SERVICES: Record<MergedServiceHub, MergedServiceGroup> = {
  bathroom: {
    heading: 'More Bathroom Services in Cabo San Lucas',
    intro:
      'Smaller bathroom jobs we handle on the same visit as bigger work — or on their own. Most walls in Cabo San Lucas homes are concrete block or tile, so every fixture is mounted with anchors rated for the wall and the load.',
    services: [
      {
        id: 'towel-racks',
        title: 'Towel Racks & Bathroom Accessories',
        intro:
          'Towel bars, towel rings, toilet paper holders, robe hooks and full accessory sets, mounted securely in tile, concrete and drywall. Accessories that fall off the wall are a sign of poor installation — we use the right anchor for every wall type.',
        items: [
          'Towel bar and double towel bar installation',
          'Towel ring and robe hook installation',
          'Toilet paper holder installation',
          'Heated towel rack installation',
          'Full bathroom accessory sets',
          'Old towel rack removal and replacement',
        ],
        faqs: [
          {
            question: 'Can towel racks be mounted in tile walls?',
            answer: 'Yes — we drill into tile and use proper anchors for a secure mount that won’t pull out.',
          },
          {
            question: 'How long does a full set of accessories take?',
            answer: 'A full set (towel bar, toilet paper holder, robe hooks) typically takes 1–2 hours.',
          },
        ],
      },
      {
        id: 'mirrors',
        title: 'Mirror & Medicine Cabinet Installation',
        intro:
          'Bathroom mirrors, large decorative mirrors, framed mirrors and medicine cabinets — hung level and secure in tile, concrete and stucco walls.',
        items: [
          'Bathroom and vanity mirror installation',
          'Large decorative mirror mounting',
          'Framed mirror installation',
          'Medicine cabinet installation',
          'Smart (TV) mirror installation',
          'Mirror removal and replacement',
        ],
        faqs: [
          {
            question: 'Can you hang a large, heavy mirror?',
            answer:
              'Yes — we use proper wall anchors and French cleats for large heavy mirrors, and bring a second person for oversized pieces.',
          },
          {
            question: 'Can mirrors be mounted on concrete walls?',
            answer: 'Yes — most walls in Cabo San Lucas are concrete block, and we use the right anchors for a permanent hold.',
          },
        ],
      },
      {
        id: 'bathroom-shelving',
        title: 'Bathroom Shelving & Storage',
        intro:
          'Floating shelves, over-toilet storage, shower niche shelves and wall-mounted cabinets, installed in tile, concrete block and stucco with anchors rated for the load.',
        items: [
          'Floating bathroom shelves',
          'Over-toilet storage',
          'Shower niche and shelf installation',
          'Wall-mounted bathroom cabinets',
          'Linen closet shelving',
          'Bathroom storage unit assembly',
        ],
        faqs: [
          {
            question: 'How long does bathroom shelf installation take?',
            answer: 'A single shelf takes 30–60 minutes. Several shelves or a full storage setup typically takes 2–3 hours.',
          },
        ],
      },
      {
        id: 'shower-heads',
        title: 'Shower Head & Valve Replacement',
        intro:
          'Whether your shower head drips, is clogged with mineral deposits, or you want a rain shower, we handle shower head and valve work in Cabo San Lucas quickly and correctly.',
        items: [
          'Shower head replacement (all types)',
          'Rain shower head installation',
          'Handheld shower installation',
          'Shower valve and thermostatic valve replacement',
          'Shower arm and flange replacement',
          'Low water pressure diagnosis and fix',
        ],
        faqs: [
          {
            question: 'How long does shower head replacement take?',
            answer: 'Most shower head replacements take 30 minutes to 1 hour. Shower valve replacements may take 2–3 hours.',
          },
          {
            question: 'Can you fix low water pressure in my shower?',
            answer:
              'Yes — we diagnose and fix low pressure, including clogged shower heads, faulty pressure regulators and supply line issues.',
          },
        ],
      },
      {
        id: 'bathroom-lighting',
        title: 'Bathroom Lighting',
        intro:
          'Vanity lights, recessed shower lighting, exhaust fans with lights and GFCI-protected fixtures, installed safely and to code.',
        items: [
          'Vanity light bar and mirror light installation',
          'Recessed shower lighting',
          'Exhaust fan with light installation',
          'Sconce installation',
          'Dimmer switches for bathroom lighting',
          'GFCI-protected fixture installation',
        ],
        faqs: [
          {
            question: 'Is GFCI protection required in bathrooms?',
            answer: 'Yes — fixtures near water need GFCI protection. We install and test GFCI circuits on every bathroom job.',
          },
        ],
      },
    ],
  },
  electrical: {
    heading: 'Lighting Installation for Homes, Offices and HOAs',
    intro:
      'Lighting projects beyond a single fixture — for offices, condo common areas, patios and vacation rentals in Cabo San Lucas.',
    services: [
      {
        id: 'office-lighting',
        title: 'Office Lighting',
        intro:
          'Good lighting improves productivity and creates a professional environment. We handle complete office lighting installations in Cabo San Lucas, from small offices to larger commercial spaces.',
        items: [
          'LED panel light installation',
          'Track and task lighting',
          'Conference room and reception area lighting',
          'Fluorescent to LED conversion',
          'Commercial lighting layout',
          'Dimmer and smart switch installation',
        ],
        faqs: [
          {
            question: 'Do you convert fluorescent fixtures to LED?',
            answer: 'Yes — we handle the full retrofit, including fixture and ballast removal.',
          },
          {
            question: 'How long does office lighting installation take?',
            answer: 'A small office takes about 1 day. Larger commercial spaces may take 2–3 days depending on the number of fixtures.',
          },
        ],
      },
      {
        id: 'common-area-lighting',
        title: 'Common Area Lighting for Condos and HOAs',
        intro:
          'We work with HOAs, condo associations and property managers in Cabo San Lucas to install and repair lighting in hallways, parking areas, pool areas and walkways.',
        items: [
          'Hallway and corridor lighting',
          'Parking lot lighting',
          'Pool area and walkway lighting',
          'Emergency exit lighting',
          'Community entrance lighting',
          'Motion sensor lights',
          'Burned-out fixture replacement',
        ],
        faqs: [
          {
            question: 'Can you handle lighting for an entire condo complex?',
            answer: 'Yes — call us and we’ll assess the scope and give you a quote.',
          },
        ],
      },
      {
        id: 'decorative-lighting',
        title: 'Decorative & Patio Lighting',
        intro:
          'String lights, bistro lights, LED strips and accent lighting for patios, palapas, restaurants and vacation rentals in Cabo San Lucas.',
        items: [
          'String and bistro light installation',
          'LED strip lighting (under-cabinet, stair, cove)',
          'Accent and mood lighting',
          'Outdoor patio and palapa lighting',
          'Pool and garden accent lighting',
          'Pergola and beam light mounting',
          'Smart RGB lights',
        ],
        faqs: [
          {
            question: 'Can you hang string lights on my patio or palapa?',
            answer: 'Yes — we mount them safely and wire them to an outdoor outlet.',
          },
          {
            question: 'Can decorative lighting be connected to a smart switch or timer?',
            answer: 'Yes — we can connect it to dimmers, timers or smart switches.',
          },
        ],
      },
    ],
  },
  kitchen: {
    heading: 'Cabinet Hardware and Pantry Shelving',
    intro: 'Quick kitchen upgrades that don’t need a full remodel.',
    services: [
      {
        id: 'kitchen-hardware',
        title: 'Kitchen Hardware Installation',
        intro:
          'New handles, pulls, knobs and hinges are one of the easiest ways to refresh a kitchen or bathroom. We drill precisely for a clean, straight result on every cabinet brand and door style.',
        items: [
          'Cabinet handle, pull and knob installation',
          'Soft-close hinge installation',
          'Cabinet door hinge replacement',
          'Bathroom vanity hardware',
          'Full kitchen hardware upgrade',
          'Misaligned door and drawer adjustment',
        ],
        faqs: [
          {
            question: 'Can you do all my cabinets in one visit?',
            answer: 'Yes — a full kitchen of 20–30 doors and drawers typically takes 1–2 hours.',
          },
          {
            question: 'Can I supply my own hardware?',
            answer: 'Yes — bring your own handles, pulls or knobs, or tell us what you need and we can source it locally.',
          },
        ],
      },
      {
        id: 'pantry-shelving',
        title: 'Pantry & Closet Shelving',
        intro:
          'From a single pantry shelf to a full walk-in closet system, anchored properly into the concrete block, drywall or wood walls common in Cabo San Lucas homes.',
        items: [
          'Pantry shelf installation',
          'Walk-in closet shelving systems',
          'Floating and wall shelves',
          'Wire shelving',
          'Laundry room, garage and utility shelving',
          'Built-in storage and niche shelves',
        ],
        faqs: [
          {
            question: 'Can I supply my own shelving?',
            answer: 'Yes — we install IKEA, custom-cut wood, wire or any shelving system you provide.',
          },
          {
            question: 'How long does pantry shelving take?',
            answer: 'A typical pantry takes 1–3 hours depending on the number of shelves and the wall type.',
          },
        ],
      },
    ],
  },
  sink: {
    heading: 'Commercial Sink Installation',
    intro:
      'Restaurants, commercial kitchens and food service businesses in Cabo San Lucas need sinks installed to health code. We handle commercial sinks from connection to final check.',
    services: [
      {
        id: 'commercial-sinks',
        title: 'Restaurant and Commercial Sinks',
        intro:
          'Three-compartment sinks, hand wash stations, prep sinks and bar sinks for restaurants, offices and retail spaces.',
        items: [
          'Three-compartment restaurant sinks',
          'Hand wash stations',
          'Commercial kitchen and prep sinks',
          'Bar sink and drain installation',
          'Utility sinks',
          'Commercial faucet and pre-rinse sprayer installation',
          'Grease trap connection',
        ],
        faqs: [
          {
            question: 'Do you install three-compartment sinks for restaurants?',
            answer: 'Yes — we install them and connect them to drain and supply lines.',
          },
          {
            question: 'Can you source commercial sink equipment?',
            answer: 'We can help source equipment from local suppliers, or install equipment you’ve already purchased.',
          },
        ],
      },
    ],
  },
  carpentry: {
    heading: 'Bars and Booth Seating',
    intro: 'Custom builds for homes and restaurants that combine carpentry with plumbing and electrical.',
    services: [
      {
        id: 'bar-installation',
        title: 'Bar Installation',
        intro:
          'Home bars, restaurant bars and outdoor palapa bars — countertop work, cabinetry, sink plumbing and bar lighting handled as one coordinated project.',
        items: [
          'Home bar installation',
          'Restaurant bar counters',
          'Outdoor and palapa bars',
          'Bar cabinets, shelving and back-bar displays',
          'Bar sink and plumbing connection',
          'Bar lighting',
          'Bar stool mounting',
        ],
        faqs: [
          {
            question: 'Can you build a bar from scratch?',
            answer: 'Yes — we work with your design or help develop one, and coordinate the carpentry, plumbing and electrical.',
          },
          {
            question: 'How long does bar installation take?',
            answer: 'A typical bar takes 1–2 days depending on complexity and whether plumbing and electrical are involved.',
          },
        ],
      },
      {
        id: 'booth-installation',
        title: 'Booth & Banquette Seating',
        intro:
          'Restaurant booths and banquette seating — assembled, placed and anchored to concrete floors, for new restaurants and dining room renovations in Cabo San Lucas.',
        items: [
          'Restaurant booth seating',
          'Banquette seating',
          'Back-to-back, L-shaped and corner booths',
          'Booth assembly and wall mounting',
          'Booth base anchoring to concrete floors',
        ],
        faqs: [
          {
            question: 'How long does booth installation take?',
            answer: 'A set of 4–6 booths typically takes 4–8 hours depending on complexity and anchoring.',
          },
        ],
      },
    ],
  },
};
