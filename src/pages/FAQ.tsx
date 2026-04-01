import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function FAQ() {
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
    setOpenQuestion(null);
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  // All 50 FAQ questions organized by section
  const faqSections = [
    {
     title: "Common Handyman Questions",
     questions: [
    {
      id: "common-1",
      question: "What is the most requested handyman service?",
      answer: "Door lock replacement, updating electrical fixtures, screen replacements, updating light switch hardware, sliding door repairs, toilet fill valve replacements, mounting TV, furniture assembly, and plumbing are the most requested handyman services. At Cabos Handyman in Cabo San Lucas, we handle all of these services daily. Call +52 612 169 8328 for any handyman service!"
    },
    {
      id: "common-2",
      question: "What would a handyman do?",
      answer: "Cabos Handyman's main job is to problem solve and find solutions. Our technicians are skilled in a wide variety of household jobs. They are responsible for completing routine maintenance, undertaking repairs, and tackling a range of other practical tasks in Cabo San Lucas. Call +52 612 169 8328 for professional handyman services!"
    },
    {
      id: "common-3",
      question: "What are the duties of a handyman?",
      answer: "The Handyman conducts basic maintenance on various businesses or homes. His/Her main duties include repairing, installing, and plumbing, as well as assembling furniture, electrical fixtures, and more. At Cabos Handyman, we serve all of Cabo San Lucas with professional maintenance services. Call +52 612 169 8328!"
    },
    {
      id: "common-4",
      question: "What should a handyman know?",
      answer: "If you're looking to become a skilled handyman, it's essential to have a basic understanding of electrical and plumbing systems. This knowledge will allow you to tackle common household issues, such as leaky faucets, electrical outages, or malfunctioning household units. At Cabos Handyman, our technicians are trained in all these areas to serve Cabo San Lucas properties. Call +52 612 169 8328!"
    },
    {
      id: "common-5",
      question: "What makes a good handyman?",
      answer: "A trustworthy handyman is: precise, punctual, and detail-oriented; sets accurate/realistic deadlines for all projects; and is proficient in a variety of tasks, with perhaps a few specialties. At Cabos Handyman, we pride ourselves on these qualities while serving Cabo San Lucas. Call +52 612 169 8328 for reliable handyman services!"
    },
    {
      id: "common-6",
      question: "What is the hardest part of being a handyman?",
      answer: "One of the primary challenges for handymen is the sheer breadth of knowledge required to competently handle a wide array of tasks. Plumbing, electrical work, carpentry, painting, and appliance repair are just the tip of the iceberg. At Cabos Handyman in Cabo San Lucas, our team specializes in diverse skills to meet all your maintenance needs. Call +52 612 169 8328!"
    }
  ]
  },
    {
      title: "Emergency & Quick Fix Services",
      questions: [
        {
          id: "emergency-1",
          question: "My toilet is overflowing right now! Can you help immediately?",
          answer: "YES! Call us RIGHT NOW at +52 612 169 8328. We offer 24/7 emergency plumbing services for Property Care Plan members, and 7am-6pm emergency response for all other customers. Toilet overflows, clogs, and plumbing emergencies are our specialty. For immediate shutoff, turn the valve behind the toilet clockwise to stop water flow, then call us. We typically arrive within 1-2 hours for genuine emergencies in Cabo San Lucas. Our emergency plumbing service includes drain snaking, clog removal, and leak repairs. The $60 diagnostic visit fee applies for diagnosis and first hour of work."
        },
        {
          id: "emergency-2",
          question: "I have guests checking in tomorrow and my AC just stopped working. What can you do?",
          answer: "We completely understand the urgency! Call +52 612 169 8328 immediately. For vacation rental owners, we prioritize same-day service when guests are checking in within 24-48 hours. Our HVAC technicians can diagnose and repair most AC issues on the spot including refrigerant leaks, compressor problems, electrical issues, and thermostat malfunctions. If you're a Property Care Plan member (starts at $99/month), you get priority emergency response 24/7. For non-members, we offer 7am-6pm emergency service. Most AC repairs in Cabo San Lucas can be completed same-day. The $60 diagnostic visit fee includes diagnosis and first hour of labor, and is credited toward the repair cost."
        },
        {
          id: "emergency-3",
          question: "There's water leaking from my ceiling. How fast can you get here?",
          answer: "Water damage emergencies require IMMEDIATE action! Call us now at +52 612 169 8328. We respond to water leaks and ceiling damage within 1-2 hours during business hours (7am-6pm), and within 2-4 hours for 24/7 Property Care Plan members. First, we'll help you stop the water source over the phone if possible. Our emergency water damage service includes leak detection and repair, water shutoff, temporary patching, drywall damage assessment, and mold prevention treatment. Water damage gets worse by the hour, so speed is critical. The $60 diagnostic visit includes diagnosis and first hour of labor. For extensive damage, we provide free estimates for complete restoration."
        },
        {
          id: "emergency-4",
          question: "My garbage disposal is completely jammed and smells terrible. Can you fix it today?",
          answer: "Absolutely! Garbage disposal problems are common in Cabo San Lucas due to the hard water. Call +52 612 169 8328 before noon for same-day service. We can typically repair or replace garbage disposals the same day. Common issues we fix: jammed blades from food debris, electrical problems and circuit breaker trips, leaking disposal seals, loud grinding or humming noises, and complete motor failure. Disposal repairs typically cost $80-$150, while full replacement with a new unit runs $200-$350 depending on the disposal brand and power. The $60 diagnostic visit fee is credited toward the work. Pro tip: Never put coffee grounds, eggshells, or fibrous vegetables down disposal units - they cause most jams!"
        },
        {
          id: "emergency-5",
          question: "A ceiling fan just fell down! Is this dangerous? What should I do?",
          answer: "DO NOT USE THE FAN OR TOUCH ANY WIRES! Turn off the circuit breaker for that room immediately for safety. Call us at +52 612 169 8328 right away - this is a serious electrical safety hazard. Fallen ceiling fans usually indicate improper installation, inadequate ceiling support box, stripped mounting screws, or ceiling joist damage. We provide emergency ceiling fan reinstallation with proper bracing the same day. Our service includes inspecting ceiling structure, installing proper fan-rated junction box, securing to ceiling joists with lag bolts, balancing the fan properly, and ensuring all electrical connections meet code. Emergency ceiling fan repair/reinstallation typically costs $150-$300 depending on ceiling damage. Your safety is our priority - we'll make sure it's installed correctly this time."
        }
      ]
    },
    {
      title: "Vacation Rental & Airbnb Services",
      questions: [
        {
          id: "rental-1",
          question: "Do you offer maintenance plans specifically for vacation rental properties in Cabo?",
          answer: "YES! Our Property Care Plans are PERFECT for vacation rental owners and property managers. We offer three tiers: Basic Plan ($99/month) includes monthly property inspection, priority scheduling, 10% discount on all repairs, quarterly HVAC filter replacement, and detailed monthly reports. Premium Plan ($199/month) adds 24/7 emergency access, bi-weekly inspections, 15% discount on repairs, pest control coordination, and guest turnover inspections. Elite Plan ($299/month) includes weekly inspections, 20% discount, dedicated account manager, preventive maintenance, and same-day emergency response guarantee. Most vacation rental owners choose Premium or Elite plans to protect their investment and keep 5-star reviews. Call +52 612 169 8328 to customize a plan for your property!"
        },
        {
          id: "rental-2",
          question: "Can you schedule repairs between guest checkouts? My turnover window is only 4-6 hours.",
          answer: "Absolutely! We specialize in vacation rental turnover maintenance. We coordinate directly with your cleaning team and property manager to schedule repairs during the narrow window between guest checkout (usually 11am) and next check-in (usually 3-4pm). Our rapid turnover services include: fixing damage from previous guests, replacing broken items (toilet seats, cabinet handles, light bulbs), minor plumbing repairs, touch-up painting, furniture repairs, and TV/remote troubleshooting. We understand that cancellations cost you thousands in lost revenue, so we prioritize speed and reliability. Property Care Plan members get priority turnover scheduling. The $60 diagnostic visit fee applies for on-site diagnosis, and most turnover repairs are completed within 2-3 hours. We'll send before/after photos for your records."
        },
        {
          id: "rental-3",
          question: "My property manager said the TV mounting is loose and the remote doesn't work. Can you fix both in one visit?",
          answer: "Yes! We handle multiple repairs in a single visit to save you money and time. For the loose TV mount, we'll re-secure it properly to the wall studs using heavy-duty anchors - most TV mounting failures happen because the original installer used drywall anchors instead of finding studs. For the remote, we'll troubleshoot the issue (usually dead batteries, unpaired remote, or wrong input source). Our vacation rental TV service includes: re-mounting or tightening TV brackets, replacing universal remotes, labeling inputs for guests, cable management to hide wires, and creating simple instruction cards for guests. Total cost for both repairs typically runs $120-$180 including the $60 diagnostic visit. We'll also do a quick check of other common guest damage items while we're there."
        },
        {
          id: "rental-4",
          question: "I'm setting up a new Airbnb property from scratch. What services do you recommend?",
          answer: "Congratulations on your new vacation rental! We offer complete Property Setup Services specifically for new Airbnb, VRBO, and vacation rental properties in Cabo San Lucas. Our New Rental Setup Package includes: professional TV mounting (all bedrooms and living areas), ceiling fan installation (essential for Cabo heat), extra electrical outlets near beds (guests need device charging), bathroom exhaust fan installation (prevents mold), door lock upgrades (smart locks available), window treatments (blackout curtains), safety equipment (smoke/CO detectors), kitchen upgrades (modern faucets, lighting), outdoor furniture assembly, and pool equipment inspection. We work with many home stagers and property managers. Full property setups range from $1,500-$5,000 depending on property size. We waive the $60 diagnostic visit fee for projects over $1,000. Call +52 612 169 8328 for a free walkthrough estimate!"
        },
        {
          id: "rental-5",
          question: "Guests keep breaking the same bathroom faucet handle. Can you install something more durable?",
          answer: "This is a VERY common problem with vacation rentals! Guests are rough on faucets, especially cheap builder-grade fixtures. We recommend upgrading to commercial-grade faucets designed for high-traffic use. Our vacation rental faucet upgrade service includes: removing old faucet completely, installing heavy-duty commercial-grade faucet (Moen Commercial or Delta Commercial series), upgrading supply lines to braided steel, adding shut-off valves if missing, and testing for leaks thoroughly. Commercial faucets cost more upfront ($180-$300 installed vs. $120-$180 for standard), but they last 5-10 years in rental environments versus 1-2 years for cheap faucets. Many property managers switch ALL their units to commercial fixtures after repeated failures. We stock commercial-grade fixtures specifically for vacation rentals. The investment pays for itself in reduced maintenance calls."
        }
      ]
    },
    {
      title: "Plumbing Services & Repairs",
      questions: [
        {
          id: "plumbing-1",
          question: "My kitchen sink won't drain at all. How much does drain cleaning cost in Cabo?",
          answer: "Kitchen sink clogs are extremely common in Cabo San Lucas due to hard water buildup and grease accumulation. Our drain cleaning service costs $60 diagnostic visit + $80-$150 for snaking depending on severity. For completely clogged drains, we use professional drain snakes and hydro-jetting equipment. The process includes: diagnosing the clog location (usually in P-trap or further down line), snaking the drain line (up to 50 feet), clearing grease/food buildup, testing water flow, and recommending preventive measures. If the clog is in the main sewer line (affects multiple drains), the cost increases to $200-$400 for hydro-jetting. We also offer enzyme drain treatments for $30/month as preventive maintenance. Call +52 612 169 8328 for same-day drain cleaning. Most kitchen clogs are cleared within 1 hour."
        },
        {
          id: "plumbing-2",
          question: "I hear water running in the walls but don't see any leaks. What does leak detection cost?",
          answer: "Hidden water leaks are serious and can cause massive damage! Our professional leak detection service costs $150-$250 and includes thermal imaging cameras, acoustic leak detection, moisture meters, and pressure testing. We can find leaks behind walls, under floors, in ceilings, and underground. Common hidden leak locations in Cabo properties include: behind shower walls (very common), under slab foundations, in ceiling/roof areas, behind toilets, and in hot water heater connections. Once we locate the leak, we provide a written estimate for repair. Leak repairs typically range from $200-$800 depending on accessibility and damage. The $150 leak detection fee is credited toward repair if you proceed with work. Don't wait - hidden leaks waste water and cause mold growth. Our leak detection has saved clients thousands in water damage repairs!"
        },
        {
          id: "plumbing-3",
          question: "Can you replace a toilet in Cabo? How much does toilet installation cost?",
          answer: "Yes! We install new toilets regularly in both residential and vacation rental properties. Complete toilet replacement costs $250-$450 including the new toilet and installation labor. This includes: removing old toilet completely, inspecting and replacing wax ring seal, checking flange condition (replace if damaged for +$80), installing new toilet with proper sealing, connecting water supply line, caulking base to floor, and testing for leaks and proper flush. We recommend Toto or American Standard toilets for durability in Cabo's hard water ($180-$350 for the toilet itself). For vacation rentals, we suggest comfort-height toilets - guests prefer them and they reduce complaints. If you already have the toilet, installation-only costs $120-$180. We can usually complete toilet replacement in 1-2 hours. Call +52 612 169 8328 to schedule!"
        },
        {
          id: "plumbing-4",
          question: "My water heater is leaking from the bottom. Can it be repaired or does it need replacement?",
          answer: "Water heaters leaking from the bottom usually need REPLACEMENT, not repair. Bottom leaks indicate internal tank corrosion which cannot be fixed. However, we'll inspect it first to confirm - sometimes it's just a loose drain valve ($80-$120 repair). Our water heater replacement service includes: draining old water heater safely, disconnecting gas/electric and water lines, removing old unit and hauling away, installing new water heater (tankless or traditional), connecting all lines to code, testing for leaks and proper operation, and adjusting temperature settings. Traditional tank water heater replacement: $800-$1,400 installed (40-50 gallon). Tankless water heater installation: $1,800-$3,200 (more expensive but unlimited hot water and energy savings). Most water heaters in Cabo last 8-12 years due to hard water. We offer free estimates for water heater replacement over $1,000."
        },
        {
          id: "plumbing-5",
          question: "Do you install water filtration systems? Our water in Cabo is very hard and tastes bad.",
          answer: "Absolutely! Hard water is a MAJOR issue in Cabo San Lucas - it damages appliances, leaves residue, and tastes terrible. We install whole-house water filtration and softener systems regularly. Our water treatment options include: Whole-house water softener ($1,200-$2,500 installed) - removes hard minerals, protects appliances. Reverse osmosis drinking water system ($400-$800 installed) - purifies drinking water, improves taste. Whole-house carbon filter ($600-$1,200) - removes chlorine and odors. Combined softener + RO system ($1,800-$3,500) - complete solution. Salt-free descaler ($800-$1,500) - prevents scale without salt. We recommend starting with an under-sink RO system for drinking water ($400-$600 installed) and upgrading to whole-house softener if budget allows. Hard water destroys coffee makers, dishwashers, and water heaters prematurely. Call +52 612 169 8328 for free water testing and filtration estimate!"
        }
      ]
    },
    {
      title: "Electrical & Lighting Services",
      questions: [
        {
          id: "electrical-1",
          question: "My ceiling fan wobbles terribly and makes noise. Can you fix it or does it need replacement?",
          answer: "Most wobbly ceiling fans can be fixed without replacement! Wobbling is usually caused by: unbalanced blades (we rebalance with weights - $60-$100), loose mounting screws (tighten all connections - $60-$80), bent blade arms (straighten or replace - $80-$120), improper installation/not secured to joist (reinstall properly - $120-$180), or worn motor bearings (replace fan - $200-$400). We'll diagnose the cause during our $60 diagnostic visit. If the fan is old or the motor is failing, replacement makes more sense than repair. New ceiling fan installation costs $180-$350 depending on fan quality. For vacation rentals, we recommend Hunter or Harbor Breeze commercial-grade fans ($150-$250) that withstand constant use. We can usually fix wobbling same-day. Call +52 612 169 8328 before noon for same-day service!"
        },
        {
          id: "electrical-2",
          question: "I need more outlets in my bedroom for phone charging. Can you add outlets to existing walls?",
          answer: "Yes! Adding electrical outlets is one of our most requested services, especially in older Cabo homes and vacation rentals where guests need device charging. Outlet installation cost: $120-$180 per new outlet (includes running wire through walls, cutting drywall, installing box and outlet, patching and painting). Adding USB charging outlets: $150-$200 per outlet (very popular for rentals!). If there's an existing outlet nearby, we can often add a new outlet for $100-$150 by tapping into the existing circuit. For bedrooms, we recommend adding outlets on both sides of the bed for guest convenience. We'll check your electrical panel capacity first to ensure the circuit can handle additional outlets. All work meets Mexican electrical code (NOM standards). We can typically install 2-3 new outlets in a single visit. Call +52 612 169 8328 for a free estimate!"
        },
        {
          id: "electrical-3",
          question: "Can you install outdoor lighting around my pool area? I want it to look nice for evening events.",
          answer: "Absolutely! Outdoor pool lighting dramatically improves ambiance and safety for evening entertaining. Our outdoor lighting installation services include: LED pool deck lighting ($200-$400 for 4-6 fixtures), landscape pathway lighting ($150-$300 per run), string/bistro lights over patio ($250-$500), underwater pool lights (if pool-ready - $400-$800), motion sensor security lights ($120-$200 per fixture), and timer/smart home integration ($150-$250). For vacation rentals, good outdoor lighting is essential for guest safety and creates beautiful listing photos. We recommend waterproof LED fixtures rated for coastal environments (salt air in Cabo corrodes cheap fixtures quickly). Most outdoor lighting projects run $800-$2,500 depending on scope. We provide free design consultations and estimates over $1,000. All electrical work is code-compliant and uses GFCI protection for outdoor safety."
        },
        {
          id: "electrical-4",
          question: "My circuit breaker keeps tripping when I use the air conditioner. What's wrong?",
          answer: "Circuit breakers tripping repeatedly indicate a serious electrical problem! Common causes include: overloaded circuit (AC unit drawing too much power), failing circuit breaker (needs replacement), loose wire connections (fire hazard!), AC compressor failure (hard start drawing excess amps), or undersized circuit for AC load. Our electrical diagnostic service ($60 diagnostic visit) includes testing circuit load, inspecting breaker panel, checking AC amp draw, testing wire connections, and measuring voltage. Solutions depend on diagnosis: Replace failing breaker ($80-$150), Upgrade circuit to higher amperage ($300-$600), Repair loose connections ($100-$200), Install hard start capacitor on AC ($150-$250), or Replace AC unit if compressor failing ($2,000-$5,000). DO NOT keep resetting a tripping breaker - it's a fire hazard! Call +52 612 169 8328 immediately for electrical safety inspection."
        },
        {
          id: "electrical-5",
          question: "Can you install a whole-house surge protector? We have frequent power fluctuations in Cabo.",
          answer: "YES! Power surges and fluctuations are extremely common in Cabo San Lucas and destroy expensive electronics, appliances, and AC units. Whole-house surge protection is one of the BEST investments you can make. Our surge protection service includes: Whole-house surge protector installation at main panel ($400-$600) - protects entire home. Individual surge protection outlets for expensive equipment ($120-$180 per outlet). Voltage stabilizer installation ($600-$1,200) - regulates inconsistent voltage. Generator transfer switch with surge protection ($800-$1,500) - for backup power. For vacation rentals, surge protection prevents guest damage claims when their devices get fried. Cabo's electrical grid experiences frequent voltage spikes that kill AC units, refrigerators, TVs, and pool pumps. A $500 surge protector can save you $5,000+ in destroyed equipment. We recommend surge protection for ALL Cabo properties. Call +52 612 169 8328 for free surge protection consultation!"
        }
      ]
    },
    {
      title: "Furniture Assembly & Installation",
      questions: [
        {
          id: "furniture-1",
          question: "I bought furniture from Costco/Home Depot in Cabo but it needs assembly. Do you assemble furniture?",
          answer: "Yes! Furniture assembly is one of our most popular services. We assemble furniture from ALL major retailers: Costco, Home Depot, Liverpool, Coppel, IKEA (shipped to Cabo), Amazon, and custom furniture. Our assembly service costs $60-$120 per piece depending on complexity. Common assemblies include: bedroom sets (beds, dressers, nightstands) - $180-$350 for complete bedroom, dining tables and chairs - $80-$150, office desks and bookcases - $60-$120 per piece, outdoor patio furniture - $100-$250, entertainment centers - $120-$200, and exercise equipment - $150-$300. For vacation rental owners furnishing entire properties, we offer package rates. We bring all necessary tools and complete most assemblies in 1-3 hours. The $60 diagnostic visit fee is waived for furniture assembly orders over $200. Call +52 612 169 8328 to schedule assembly!"
        },
        {
          id: "furniture-2",
          question: "Can you mount a 75-inch TV on my living room wall? How much does TV mounting cost?",
          answer: "Absolutely! We mount TVs of all sizes regularly. TV mounting costs vary by size: 32-50 inch TV mounting: $120-$180, 55-65 inch TV mounting: $180-$250, 70-85 inch TV mounting: $250-$350 (requires two installers for safety). Our professional TV mounting includes: finding wall studs (NEVER drywall anchors for large TVs!), installing heavy-duty wall mount, mounting TV securely, concealing cables in wall or cable raceway, connecting all devices (cable box, soundbar, etc.), programming remote and testing all inputs, and leveling perfectly. For 75-inch TVs, we charge $250-$300 including mount hardware. We can also add a soundbar ($80-$120) and hide all wires for a clean look. For vacation rentals, we recommend locking TV mounts to prevent theft. Call +52 612 169 8328 for same-day TV mounting!"
        },
        {
          id: "furniture-3",
          question: "I'm a home stager and need furniture assembly for multiple properties. Do you offer discounts for bulk work?",
          answer: "YES! We work with many home stagers, interior designers, and real estate professionals in Cabo San Lucas. We offer volume discounts for staging companies: 10% discount for 5+ furniture pieces in one visit, 15% discount for full property staging (10+ pieces), 20% discount for ongoing monthly accounts, and priority scheduling for staging deadlines. Our furniture staging services include: assembling all furniture pieces, mounting TVs and artwork, installing curtain rods and window treatments, hanging mirrors and shelving, installing lighting fixtures, and minor repairs to prepare property for photos. Many stagers use us exclusively because we're fast, reliable, and understand tight staging deadlines before listing photos. We can typically stage a 3-bedroom property in one day ($800-$1,500 depending on furniture quantity). Net-30 payment terms available for established staging companies. Call +52 612 169 8328 to set up a commercial staging account!"
        },
        {
          id: "furniture-4",
          question: "Can you hang heavy artwork and mirrors without damaging my walls?",
          answer: "Yes! Proper artwork and mirror hanging requires skill - especially in Cabo's drywall construction. Our picture hanging service costs $40-$80 per piece depending on size and weight. We provide: lightweight items (under 20 lbs) - $40-$60 using appropriate anchors, heavy artwork/mirrors (20-50 lbs) - $60-$100 secured to studs, very heavy mirrors (50+ lbs) - $100-$150 with French cleats or toggle bolts, and gallery wall arrangements (multiple pieces) - $150-$300 for layout and installation. We use professional tools including stud finders, levels, and heavy-duty anchors. For vacation rentals, we install theft-deterrent hardware on valuable artwork. We'll patch any existing holes from previous hangings for free during installation. Most clients combine picture hanging with other services to maximize the $60 diagnostic visit value. For example, hang 5 pieces of artwork for $200-$300 total. Call +52 612 169 8328!"
        },
        {
          id: "furniture-5",
          question: "My outdoor patio furniture needs repairs - broken welds, torn fabric, wobbly legs. Can you fix it?",
          answer: "Yes! Cabo's salt air and sun destroy outdoor furniture quickly. We repair outdoor patio furniture regularly. Our outdoor furniture repair services include: welding broken metal frames ($100-$200 per chair), replacing torn sling fabric ($80-$150 per piece), tightening wobbly legs and bolts ($60-$100), refinishing rusted metal (sanding + painting - $150-$300), replacing broken glass table tops ($200-$400), and repairing broken umbrella mechanisms ($80-$150). For severely damaged furniture, replacement often makes more sense than repair - we'll give honest recommendations. We can also upgrade your patio with new furniture assembly ($100-$250 per set). Outdoor furniture in coastal Cabo lasts only 3-5 years on average before needing major repairs or replacement. For vacation rentals, we recommend commercial-grade aluminum furniture that resists salt corrosion better than steel. Call +52 612 169 8328 for outdoor furniture repair estimate!"
        }
      ]
    },
    {
      title: "Kitchen & Bathroom Remodeling",
      questions: [
        {
          id: "remodel-1",
          question: "How much does a complete kitchen remodel cost in Cabo San Lucas?",
          answer: "Kitchen remodeling costs in Cabo San Lucas vary widely based on size, materials, and scope. Typical ranges: Budget kitchen remodel: $5,000-$10,000 (paint cabinets, new countertops, update hardware, new faucet/sink, backsplash tile). Mid-range kitchen remodel: $10,000-$25,000 (new cabinets, granite/quartz counters, tile backsplash, new appliances, updated lighting, new flooring). High-end kitchen remodel: $25,000-$50,000+ (custom cabinets, premium stone counters, high-end appliances, complete electrical/plumbing updates, custom tile work). Our kitchen remodeling process includes free design consultation, detailed written estimate, 3D renderings for major remodels, professional installation of all components, and final walkthrough. Most kitchen remodels take 2-4 weeks depending on scope. We provide FREE estimates for all kitchen remodeling projects. Call +52 612 169 8328 to schedule your free kitchen consultation!"
        },
        {
          id: "remodel-2",
          question: "Can you install quartz countertops in my existing kitchen without replacing cabinets?",
          answer: "Absolutely! Countertop replacement is one of the most impactful kitchen upgrades you can make. Quartz countertop installation costs in Cabo: Standard quartz (Silestone, Caesarstone): $80-$120 per square foot installed. Premium quartz (exotic patterns): $120-$180 per square foot installed. Typical kitchen (25-35 sq ft): $2,500-$4,500 total. Our countertop installation includes: removing old countertops (laminate, tile, or stone), inspecting cabinets for level and strength, templating for perfect fit, fabricating quartz slabs, installing new countertops, cutting sink and cooktop openings, installing undermount sink if requested, sealing edges and seams, and cleanup and haul-away of old countertops. Quartz is PERFECT for Cabo because it's heat-resistant, stain-resistant, and doesn't need sealing like granite. Installation takes 1-2 days after templating. Free estimates for all countertop projects!"
        },
        {
          id: "remodel-3",
          question: "My bathroom shower leaks and the tile is cracked. Can you retile the shower?",
          answer: "Yes! Shower retiling is a common job in Cabo - old grout fails and tiles crack due to settling and water damage. Complete shower retiling costs $1,500-$4,000 depending on shower size and tile choice. Our shower retiling service includes: removing all old tile (and underlying backer board if damaged), inspecting for water damage and repairing studs if needed, installing new waterproof cement backer board, applying waterproofing membrane (critical in showers!), installing new tile (ceramic, porcelain, or natural stone), grouting with waterproof grout, sealing grout, installing new shower fixtures if requested, and caulking all seams. We recommend upgrading to larger format tiles (12x24 or bigger) to reduce grout lines and maintenance. Shower retiling takes 3-5 days including drying time. We provide free estimates for all bathroom tile projects. Don't delay shower repairs - water damage gets exponentially worse!"
        },
        {
          id: "remodel-4",
          question: "I want to replace my bathroom vanity. Does that include plumbing work?",
          answer: "Yes! Vanity replacement is a complete service including plumbing connections. Bathroom vanity installation costs: Basic vanity replacement (similar size): $400-$700 (includes vanity, installation, plumbing hookup). Upgraded vanity with double sinks: $800-$1,500 (includes vanity, installation, dual plumbing). Custom vanity installation: $1,200-$2,500 (includes custom cabinet, stone top, plumbing). Our vanity installation includes: removing old vanity completely, checking plumbing connections and replacing supply lines if corroded, installing new vanity and securing to wall, connecting faucet and drain plumbing, installing new countertop (granite, quartz, or marble), mounting new sink(s), applying caulk and sealant, and testing for leaks thoroughly. For vacation rentals, we recommend wall-mounted vanities (easier cleaning underneath). Installation typically takes 4-6 hours. Free estimates for vanity replacement projects!"
        },
        {
          id: "remodel-5",
          question: "Can you install a walk-in shower to replace my bathtub? I never use the tub.",
          answer: "Absolutely! Tub-to-shower conversions are increasingly popular in Cabo, especially for vacation rentals where guests prefer showers. Complete tub-to-shower conversion costs $3,500-$8,000 depending on finishes. Our conversion service includes: demolishing existing tub and removing, repairing and waterproofing walls, installing new shower pan or tile base, installing cement backer board on walls, waterproofing membrane application, tiling walls and floor, installing new shower fixtures (valve, showerhead, handheld), installing frameless glass door or curtain rod, grouting and sealing everything, and final plumbing connections and testing. Walk-in showers are safer (no stepping over tub edge), easier to clean, more modern looking, and preferred by most vacation rental guests. Installation takes 5-7 days including tile drying time. We provide free design consultations and estimates for all shower conversions. Call +52 612 169 8328 to discuss your shower conversion project!"
        }
      ]
    },
    {
      title: "Pricing, Payment & Estimates",
      questions: [
        {
          id: "pricing-1",
          question: "What does the $60 diagnostic visit include?",
          answer: "Our $60 USD diagnostic visit fee covers the cost of sending a professional technician to your property for diagnosis and estimate. It includes: professional on-site diagnosis of your issue, first hour of labor, detailed written estimate for additional work needed, expert recommendations and options, and travel time to your location in Cabo San Lucas. The $60 fee is FULLY CREDITED toward any work you approve. For example, if we quote $300 for a repair and you proceed, you only pay $240 more. The diagnostic visit fee is WAIVED for: projects over $1,000 (kitchen/bathroom remodels, major repairs), Property Care Plan members (all tiers), established commercial accounts, and emergency service for certain urgent situations. Call +52 612 169 8328 to schedule service!"
        },
        {
          id: "pricing-2",
          question: "Do you accept credit cards or only cash? Can I pay in USD or pesos?",
          answer: "We accept multiple payment methods for your convenience: Cash in USD or Mexican Pesos (MXN), Credit Cards (Visa, Mastercard, American Express) - 3.5% processing fee applies, Debit Cards, Bank Transfers (Mexican banks and international wire transfers), Zelle (for US-based clients) - NO FEES!, PayPal (for international clients), and NET-30 invoicing for established property management companies. We accept BOTH USD and MXN at current exchange rates. For large projects over $5,000, we offer payment plans: 50% deposit to start, 40% at midpoint, and 10% upon completion. Most clients pay via Zelle (+52 612 169 8328) or cash USD to avoid credit card fees. We provide detailed invoices with RFC for Factura if you need tax receipts in Mexico. Call to discuss payment options for your specific project!"
        },
        {
          id: "pricing-3",
          question: "Can you provide a Factura with IVA for tax purposes in Mexico?",
          answer: "Yes! We can provide official Mexican Facturas (tax receipts) with IVA (16% VAT) for clients who need them. Our invoicing options: Standard invoice (USD, no IVA) - for most residential clients and foreigners. Factura with IVA (MXN, 16% VAT included) - for Mexican businesses and those claiming tax deductions. Detailed itemized invoice for property managers - shows materials and labor separately. To receive a Factura with IVA, we need your RFC (tax ID), legal business name, and fiscal address. IVA adds 16% to the total cost, so a $1,000 project becomes $1,160 MXN equivalent. Many vacation rental owners operating legal businesses in Mexico request Facturas for deducting maintenance expenses. We can issue Facturas on the same day service is completed. Let us know at time of booking if you need Factura with IVA!"
        },
        {
          id: "pricing-4",
          question: "Do you offer free estimates for big projects like remodeling?",
          answer: "YES! We provide completely FREE estimates for all remodeling projects and jobs over $1,000. Free estimate services include: kitchen remodeling (any scope), bathroom remodeling, painting projects (interior/exterior), tile work, major electrical upgrades, major plumbing projects, property setup for new vacation rentals, and commercial projects. For smaller repairs and diagnostic visits (under $1,000), the $60 diagnostic visit fee applies, but is fully credited toward work if you proceed. Our free estimate process: schedule convenient appointment time, detailed on-site consultation (30-60 minutes), discuss options and material choices, receive written estimate within 24-48 hours, review and modify as needed, and no pressure to proceed - estimate is valid for 30 days. We encourage getting multiple estimates to compare - we're confident our pricing, quality, and professionalism will win your business. Call +52 612 169 8328 to schedule free estimate!"
        },
        {
          id: "pricing-5",
          question: "How much do Property Care Plans cost and what's included in each tier?",
          answer: "Our Property Care Plans are designed specifically for vacation rentals, second homes, and investment properties in Cabo. Three tiers available: BASIC PLAN - $99/month includes: monthly property inspection with photo report, priority scheduling (within 24-48 hours), 10% discount on all repairs and services, quarterly HVAC filter replacement, pest control coordination, and email/phone support. PREMIUM PLAN - $199/month includes everything in Basic PLUS: 24/7 emergency access and support, bi-weekly property inspections, 15% discount on all repairs, guest turnover inspections (verify condition between guests), minor repairs included (up to $100/month), and dedicated account manager. ELITE PLAN - $299/month includes everything in Premium PLUS: weekly property inspections, 20% discount on all repairs, same-day emergency response guarantee, preventive maintenance program (catch issues before they become expensive), major repairs included (up to $200/month), and concierge services (coordinating contractors, deliveries, etc.). Most vacation rental owners choose Premium or Elite to protect their investment and maintain 5-star guest reviews. Call +52 612 169 8328 to customize a plan for your property!"
        }
      ]
    },
    {
      title: "Areas Served & Response Times",
      questions: [
        {
          id: "areas-1",
          question: "Do you service San José del Cabo or only Cabo San Lucas?",
          answer: "We focus exclusively on Cabo San Lucas and immediate surrounding areas to ensure the fastest response times and highest quality service. Our service area includes: Downtown Cabo San Lucas, Pedregal and Pedregal Hills, El Medano and Medano Beach area, Pacific side developments, Marina and Marina Golden Zone, Cabo Bello and residential areas, and properties within 10-15 minutes of downtown Cabo. We do NOT regularly service San José del Cabo, Corridor hotels, or areas east of the airport due to distance. This focused service area allows us to offer same-day service, 24/7 emergency response, and maintain multiple service calls per day without excessive travel time. For San José del Cabo, we recommend contacting local handymen based in that area. Call +52 612 169 8328 to confirm we service your specific Cabo San Lucas location!"
        },
        {
          id: "areas-2",
          question: "What are your business hours? Do you work weekends?",
          answer: "Our standard business hours are Monday-Friday, 7:00 AM - 6:00 PM, and Saturday, 8:00 AM - 2:00 PM (half day). We're closed Sundays except for emergencies. HOWEVER, for Property Care Plan members, we offer 24/7 emergency service - call anytime day or night for urgent repairs! For non-members, emergency service is available 7:00 AM - 6:00 PM daily. Weekend service is available with advance scheduling (book Thursday for Saturday service). We're also available on most Mexican holidays except: Christmas Day (December 25), New Year's Day (January 1), and Easter Sunday - limited emergency-only service on these days. For vacation rental owners, we understand guests don't take days off, so we maintain flexible scheduling to handle guest-impacting emergencies even on weekends and holidays. Call +52 612 169 8328 to schedule service!"
        },
        {
          id: "areas-3",
          question: "How fast can you respond to emergency calls? What counts as an emergency?",
          answer: "Our emergency response times: Property Care Plan members: 1-2 hours, 24/7 (guaranteed same-day). Non-members during business hours (7am-6pm): 2-4 hours same-day response. After-hours emergencies for non-members: Next business day morning (or upgrade to Property Care Plan for 24/7 access!). What qualifies as an emergency: plumbing leaks or burst pipes (active water damage), toilets overflowing or completely clogged (especially with guests present), no hot water (for vacation rentals with guests), electrical issues or power outages, broken AC in summer heat (Cabo gets to 100°F+), broken door locks or lock-outs, storm damage (broken windows, roof leaks), and any issue causing immediate property damage or guest safety concern. What's NOT an emergency: cosmetic repairs, slow drains (not completely clogged), minor electrical issues (single outlet not working), furniture assembly, and routine maintenance. Emergency service includes $60 diagnostic visit fee + repair costs. Call +52 612 169 8328 NOW for emergency service!"
        },
        {
          id: "areas-4",
          question: "Can you give me a same-day appointment if I call this morning?",
          answer: "YES! Same-day service is available for calls received before 12:00 PM (noon) on business days, Monday-Friday. Our same-day service policy: Call before noon: We'll schedule you for same afternoon (usually 2-6pm window). Call after noon: Next business day morning (usually 8-11am window). Emergencies any time: We prioritize based on severity (water leaks get priority over cosmetic repairs). Property Care Plan members: Priority same-day scheduling regardless of call time. Same-day service is subject to availability and our current schedule - busy seasons (November-April high tourist season) may have limited same-day slots. For guaranteed scheduling, we recommend booking 24-48 hours in advance. However, we do our absolute best to accommodate urgent needs - vacation rental owners with guest check-ins get priority treatment. Call +52 612 169 8328 before noon for same-day service!"
        },
        {
          id: "areas-5",
          question: "Do you service condos and gated communities in Cabo? Any access restrictions?",
          answer: "Yes! We regularly service condos, gated communities, and private residential developments throughout Cabo San Lucas including: Pedregal gated community, Marina developments (Puerta Azul, Marina Sol, etc.), El Medano condos and complexes, Cabo Bello residential, Pacific side gated communities, and luxury villas with security. For gated community access, we need: resident name and unit number, gate code or security contact number, parking instructions (visitor parking location), and any HOA requirements or access procedures. Please provide this information when booking. Some buildings require advance registration of contractors - let us know at least 24 hours before service if your building has this requirement. We carry liability insurance and can provide certificates of insurance (COI) to HOAs if required. Our technicians are professional, uniformed, and carry company ID. We respect all community rules and parking regulations. Call +52 612 169 8328 to schedule service in your gated community!"
        }
      ]
    },
    {
      title: "Property Management & Commercial",
      questions: [
        {
          id: "commercial-1",
          question: "I manage 15 vacation rental properties in Cabo. Do you offer commercial accounts with NET-30 payment terms?",
          answer: "Absolutely! We specialize in working with property management companies and offer commercial accounts with NET-30 payment terms for established businesses. Commercial account benefits include: NET-30 payment terms (invoice due 30 days after service), consolidated monthly billing (one invoice for all properties), priority scheduling for all your properties, dedicated account manager who knows your portfolio, volume discounts (10-20% based on monthly volume), 24/7 emergency access for guest-impacting issues, detailed photo documentation for property owners, and same-day emergency response for guest check-in issues. To set up a commercial account, we require: business registration information, 3 trade references, principal contact information, and typical monthly service volume estimate. After initial verification, NET-30 terms are approved. Many of the largest property management companies in Cabo San Lucas use our services exclusively. Call +52 612 169 8328 to set up your commercial property management account!"
        },
        {
          id: "commercial-2",
          question: "Can you handle maintenance for an HOA or condo association?",
          answer: "Yes! We provide comprehensive maintenance services for HOAs, condo associations, and community developments in Cabo San Lucas. Our HOA maintenance services include: common area maintenance (lighting, painting, repairs), pool equipment repair and maintenance, gate and security system repairs, landscape lighting installation, parking lot maintenance, clubhouse maintenance, emergency repairs to common areas, scheduled preventive maintenance programs, and vendor coordination and management. HOA billing options: individual unit billing (each owner pays directly for their unit), association master account (HOA pays for common areas), or hybrid approach (common areas via HOA, individual units billed to owners). We attend HOA board meetings if requested to discuss maintenance needs and budgets. Volume discounts available for associations with 20+ units. We provide detailed monthly reports for HOA boards. Many Cabo condo associations use our services for reliable, professional maintenance at competitive pricing. Call +52 612 169 8328 to discuss HOA maintenance contracts!"
        },
        {
          id: "commercial-3",
          question: "Do you work on commercial properties like restaurants, offices, or retail shops?",
          answer: "Yes! We provide handyman and maintenance services for commercial properties throughout Cabo San Lucas. Commercial services include: RESTAURANTS: kitchen equipment installation, walk-in cooler repairs, ventilation hood installation, dining area maintenance, bathroom repairs, bar setup and repairs. OFFICES: furniture assembly, electrical upgrades, lighting installation, door repairs, painting, minor renovations. RETAIL SHOPS: shelving installation, display fixtures, lighting, signage installation, storefront maintenance, security system installation. HOTELS/RENTALS: room maintenance, appliance repairs, furniture repair, painting, tile work, emergency repairs. Commercial pricing is project-based - we provide free estimates for commercial jobs. We work flexible hours including nights and weekends to minimize disruption to your business. Business licensing and insurance certificates available upon request. Many Cabo restaurants, shops, and offices use our services for reliable commercial maintenance. Call +52 612 169 8328 for commercial services!"
        },
        {
          id: "commercial-4",
          question: "Can you provide ongoing preventive maintenance for my vacation rental business?",
          answer: "Absolutely! Preventive maintenance is the SMARTEST investment for vacation rental owners. Our preventive maintenance programs include: QUARTERLY PREVENTIVE MAINTENANCE ($299/quarter per property): deep property inspection, HVAC filter replacement, check all plumbing fixtures for leaks, test all electrical outlets and switches, ceiling fan maintenance, door and lock lubrication, caulk inspection and touch-up, smoke detector battery replacement, and detailed 20-point inspection report with photos. MONTHLY PREVENTIVE MAINTENANCE (included in Premium/Elite Property Care Plans): everything in quarterly plan PLUS bi-weekly or weekly inspections, immediate repairs of small issues before guests notice, preventive replacement of wear items, and proactive maintenance scheduling. Why preventive maintenance matters: catches small issues before they become expensive emergencies, prevents bad guest reviews due to maintenance issues, extends life of appliances and fixtures, maintains property value, and reduces costly emergency repair calls. Most successful vacation rental owners do quarterly or monthly preventive maintenance. Call +52 612 169 8328 to set up preventive maintenance for your rental property!"
        },
        {
          id: "commercial-5",
          question: "I'm a real estate agent preparing properties for sale. Can you help with pre-listing repairs and improvements?",
          answer: "Absolutely! We work with many real estate agents, brokers, and sellers preparing Cabo San Lucas properties for listing. Our pre-listing services include: ESSENTIAL PRE-SALE REPAIRS: fix all plumbing leaks, repair electrical issues, patch drywall holes and cracks, fix broken tiles, repair or replace broken fixtures, ensure all doors and windows operate properly, address any safety issues. COSMETIC IMPROVEMENTS TO INCREASE VALUE: fresh paint (interior/exterior), update light fixtures to modern styles, replace outdated faucets and hardware, install new ceiling fans, upgrade kitchen/bathroom fixtures, professional landscaping or curb appeal work, and deep cleaning and handyman punch list. STAGING PREPARATION: furniture assembly for staging, TV and artwork mounting, minor renovations to modernize appearance, and lighting upgrades for better listing photos. Pre-listing handyman services typically cost $1,500-$5,000 depending on property condition but can increase sale price by $10,000-$30,000+. We provide free pre-listing consultations and estimates. Fast turnaround available for urgent listings. Call +52 612 169 8328 to discuss your pre-sale property preparation!"
        }
      ]
    },
    {
      title: "About Us & Why Choose Cabos Handyman",
      questions: [
        {
          id: "about-1",
          question: "How long have you been in business in Cabo San Lucas?",
          answer: "Cabos Handyman has been serving Cabo San Lucas for many years! We've been part of the Cabo community, through multiple hurricanes, economic ups and downs, and Cabo's transformation into a world-class destination. Our track record: 600+ completed projects (from small repairs to major remodels), hundreds of 5-star reviews from satisfied clients, trusted by major property management companies, and deep relationships with local suppliers and contractors. We've watched Cabo grow and have grown with it. We understand Cabo's unique challenges: salt air corrosion, hard water issues, unique building styles, dealing with Mexican contractors and suppliers, and the specific needs of vacation rental owners and expats. When you hire Cabos Handyman, you're hiring local experts who will be here tomorrow, next month, and next year. Call +52 612 169 8328 to work with Cabo's most experienced handyman company!"
        },
        {
          id: "about-2",
          question: "Are your technicians employees or subcontractors? Who actually does the work?",
          answer: "ALL our technicians are full-time employees of Cabos Handyman, NOT subcontractors. This is a major difference between us and many other handyman services in Cabo. Why this matters: consistent quality control - all technicians trained to our standards, accountability - we directly supervise all work, insurance coverage - all workers covered by our liability insurance, no surprises, you won't get different people with different quality each time, background checked all employees vetted for professionalism and honesty, and uniformed and identified - all technicians wear company uniforms. Our team includes: licensed electricians for electrical work, licensed plumbers for plumbing work, experienced carpenters for woodworking and cabinetry, tile specialists for bathroom/kitchen tile, and general handymen for smaller repairs and installations. We do NOT subcontract work to random contractors - everything is done by our trained, employed team. This is why we can guarantee our work and maintain consistent 5-star quality. Call +52 612 169 8328 to work with our professional employee team!"
        },
        {
          id: "about-3",
          question: "Do you guarantee your work? What if something breaks after you fix it?",
          answer: "YES! We stand behind all our work with comprehensive warranties and guarantees. Our warranty policy: LABOR WARRANTY: 90 days on all labor and workmanship. If something we installed or repaired fails due to our work, we'll fix it FREE within 90 days. PARTS/MATERIALS WARRANTY: manufacturer's warranty applies (typically 1-5 years depending on product). We'll help you file warranty claims if needed. SPECIFIC GUARANTEES: plumbing repairs - guaranteed leak-free for 90 days, electrical work - code-compliant and guaranteed for 90 days, tile work - guaranteed against cracking from installation issues for 1 year, painting - guaranteed against peeling/bubbling from prep issues for 1 year, and remodeling projects - 90-day workmanship warranty on all aspects. What's NOT covered: damage from misuse, normal wear and tear, damage from other contractors, natural disasters (hurricanes, earthquakes), or pre-existing conditions we warned you about. We're confident in our work and want you 100% satisfied. If you have any concerns after service, call +52 612 169 8328 immediately and we'll make it right!"
        },
        {
          id: "about-4",
          question: "Why should I choose Cabos Handyman over other handymen in Cabo?",
          answer: "Great question! Here's what makes Cabos Handyman the #1 choice in Cabo San Lucas: EXPERIENCE: 20+ years in Cabo San Lucas specifically, 600+ completed projects, we know every neighborhood and building style in Cabo. COMMUNICATION: fully bilingual (English/Spanish), answer phone calls promptly, regular updates during projects, detailed written estimates. RELIABILITY: show up on time or call if delayed, complete projects on promised schedule, available 24/7 for emergencies (Property Care members), consistent quality every time. PROFESSIONALISM: licensed and insured, uniformed employees (not random subcontractors), background-checked team members, respect your property and time. COMPREHENSIVE SERVICES: handle everything from small repairs to major remodels, no job too small or too large, one company for all your needs. VALUE: competitive pricing, transparent estimates with no hidden fees, volume discounts for property managers, work is guaranteed. Many clients have told us: 'I wish I'd found you years ago!' or 'You're the first handyman in Cabo who actually showed up on time and did what you promised.' Call +52 612 169 8328 to experience the Cabos Handyman difference!"
        },
        {
          id: "about-5",
          question: "Can I see examples of your previous work or get references from past clients?",
          answer: "Absolutely! We're proud of our work and happy to provide references and portfolio examples. How to see our work: ONLINE REVIEWS: check Google reviews for Cabos Handyman (4.8+ star average), read testimonials on our website, see before/after photos on our social media. CLIENT REFERENCES: we can provide contact information for 5-10 recent clients (with their permission), speak directly with property managers who use us regularly, and connect you with vacation rental owners in your development. PROJECT PORTFOLIO: we maintain before/after photos of major remodeling projects, kitchen and bathroom renovation galleries, examples of tile work, cabinetry, painting, etc., and emergency repair photos showing problem diagnosis and resolution. PROPERTY TOURS: for major remodeling clients, we can sometimes arrange tours of recently completed projects (with owner permission). We have nothing to hide - our work speaks for itself. We're confident that when you talk to our past clients, you'll hear consistent praise for quality, professionalism, and reliability. Call +52 612 169 8328 and ask for references specific to your project type (kitchen remodel, vacation rental maintenance, emergency repairs, etc.)!"
        }
      ]
    }
  ];

  // Generate Schema.org JSON-LD for all 50 questions
  const generateSchemaMarkup = () => {
    const allQuestions = faqSections.flatMap(section =>
      section.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    );

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allQuestions
    };
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Cabos Handyman | 50+ FAQ About Handyman Services in Cabo San Lucas</title>
        <meta name="description" content="Get answers to 50+ common questions about handyman services, emergency repairs, vacation rental maintenance, plumbing, electrical, remodeling, pricing, and more in Cabo San Lucas. 24/7 emergency service available!" />
        <link rel="canonical" href="https://www.caboshandyman.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify(generateSchemaMarkup())}
        </script>
      </Helmet>

      <Navigation />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            Everything you need to know about Cabos Handyman services
          </p>
          <p className="text-lg mt-4 max-w-3xl mx-auto">
            50+ FAQ covering emergency services, vacation rentals, pricing, remodeling, and more
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 flex justify-between items-center group"
              >
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                  {section.title}
                </h2>
                <ChevronDown
                  size={28}
                  className={`text-teal-600 transition-transform duration-300 flex-shrink-0 ml-4 ${
                    openSection === sectionIndex ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Section Questions */}
              {openSection === sectionIndex && (
                <div className="mt-4 space-y-3 animate-fadeIn">
                  {section.questions.map((q) => (
                    <div key={q.id} className="bg-gray-50 rounded-lg border-2 border-gray-200">
                      {/* Question */}
                      <button
                        onClick={() => toggleQuestion(q.id)}
                        className="w-full p-5 flex justify-between items-start hover:bg-gray-100 transition-colors rounded-lg"
                      >
                        <h3 className="text-left text-lg font-semibold text-gray-800 pr-4">
                          {q.question}
                        </h3>
                        <ChevronDown
                          size={20}
                          className={`text-teal-500 transition-transform duration-300 flex-shrink-0 mt-1 ${
                            openQuestion === q.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Answer */}
                      {openQuestion === q.id && (
                        <div className="px-5 pb-5 pt-2">
                          <div className="text-gray-700 leading-relaxed whitespace-pre-line border-t-2 border-gray-200 pt-4">
                            {q.answer.split(/(\+52 612 169 8328|https?:\/\/[^\s]+)/g).map((part, i) => {
                              if (part === '+52 612 169 8328') {
                                return (
                                  <a
                                    key={i}
                                    href="tel:+526121698328"
                                    className="text-teal-600 font-bold hover:text-teal-700 underline"
                                  >
                                    {part}
                                  </a>
                                );
                              }
                              if (part.startsWith('http')) {
                                return (
                                  <a
                                    key={i}
                                    href={part}
                                    className="text-teal-600 font-semibold hover:text-teal-700 underline"
                                  >
                                    {part}
                                  </a>
                                );
                              }
                              return part;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white py-16 px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Call us now for immediate assistance or visit our contact page
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+526121698328"
              className="inline-block bg-white text-teal-600 px-8 py-4 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Call +52 612 169 8328
            </a>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-[#2dd4bf] via-[#049d8e] to-[#06756b] text-white border-2 border-white px-8 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-all shadow-lg"
            >
              Contact Page
            </a>
          </div>
          <p className="mt-8 text-lg">
            24/7 Emergency Service Available for Property Care Plan Members
          </p>
          <a href="/about" className="inline-block mt-4 text-white/80 hover:text-white underline text-sm">
            Learn more about our company &rarr;
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <Footer />
    </>
  );
}
