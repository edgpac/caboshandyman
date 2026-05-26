import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Lisa P.",
    location: "Property Manager, Cabo San Lucas",
    text: "We manage 5 rental properties and Cabos Handyman is our go-to for everything. We've been on their Property Care Plan for over a year — all units stay in top shape without us having to chase anyone down.",
    response: "Thank you, Lisa! Reliability and quality work are essential for vacation rentals. We're honored to be your go-to team!",
  },
  {
    name: "James & Linda H.",
    location: "Vacation Rental Owners, Cabo San Lucas",
    text: "We signed up for their Property Care Plan two years ago and haven't looked back — everything just gets handled. Never disappointed. They're like family now!",
    response: "Thank you so much, James & Linda! 5 years of partnership means the world to us. We're honored to be part of your team.",
  },
  {
    name: "David W.",
    location: "California / Cabo vacation home",
    text: "As an absentee owner, I needed someone trustworthy. They send photos of completed work and bills are always accurate. Couldn't ask for more from 2,000 miles away.",
    response: "Thank you, David! We treat every home like it's our own. Honesty and transparency are core values here — we're grateful for your trust!",
  },
  {
    name: "Maria G.",
    location: "Pedregal, Cabo San Lucas",
    text: "Best handyman service in Cabo! They fixed my AC in less than 2 hours during the hottest week of summer. The 24/7 emergency response is worth every penny.",
    response: "Thank you so much, Maria! Fast, reliable service is what we're all about. We're thrilled we could get your AC fixed so quickly!",
  },
  {
    name: "John & Sarah T.",
    location: "Cabo San Lucas",
    text: "Professional, punctual, and affordable. They remodeled our vacation rental kitchen and it looks amazing. Our guests love it and our ratings jumped after.",
    response: "Thank you for the wonderful review! We're honored to be your go-to team. That kitchen turned out beautifully — looking forward to our continued partnership!",
  },
  {
    name: "Susan M.",
    location: "Cabo San Lucas",
    text: "Storm damage repair was done quickly and professionally. They worked with our insurance company too. As a remote owner, having someone handle this locally was a lifesaver.",
    response: "Thank you, Susan! Storm damage is stressful and we're glad we could coordinate with your insurance company to make it stress-free.",
  },
  {
    name: "Amanda R.",
    location: "Commercial Property, Cabo",
    text: "Bilingual service made everything so easy. They explained everything in English and Spanish for our staff. Perfect for international property owners.",
    response: "Thank you, Amanda! Bilingual service is essential in Los Cabos. We're glad we could communicate clearly with your entire team!",
  },
  {
    name: "Kevin & Monica B.",
    location: "Pedregal, Cabo San Lucas",
    text: "Full kitchen remodel from scratch — new cabinets, quartz countertops, backsplash, and all new plumbing. Done in 12 days. We were shocked by the quality.",
    response: "Kevin & Monica, this one was a labor of love for our whole crew. Thank you for trusting us with something this important. Come back anytime!",
  },
  {
    name: "Tom & Jennifer K.",
    location: "Cabo San Lucas",
    text: "Eddy and his team did a great job installing ledger stone on a large wall. They were clean, punctual, and true perfectionists. Exactly what you want for a rental property.",
    response: "Thank you so much! Cleanliness and punctuality are priorities on every job. Our team takes great pride in that attention to detail you noticed.",
  },
  {
    name: "Gabriela S.",
    location: "Cabo San Lucas",
    text: "Unclogged our drain, fixed a leaky faucet, and installed a new toilet — all in one appointment. Super efficient. The monthly plan makes this routine now.",
    response: "Thank you, Gabriela! Efficiency and getting everything done in one visit saves you time and money. We appreciate your business!",
  },
  {
    name: "Patricia L.",
    location: "El Tezal",
    text: "Built us a beautiful custom deck with palapa. It's now our favorite spot in the house. Quality craftsmanship — and they were done ahead of schedule.",
    response: "Thank you so much, Patricia! Quality craftsmanship that lasts — that's our promise. Enjoy your new favorite spot!",
  },
];

export default function PropertyPlanReviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cards = track.querySelectorAll<HTMLElement>('.pm-review-card');
    if (!cards.length) return;

    const cardW = cards[0].offsetWidth + 16;
    const total = cardW * reviews.length;

    reviews.forEach((_, i) => {
      track.appendChild(cards[i].cloneNode(true));
    });

    tlRef.current = gsap.to(track, {
      x: -total,
      duration: reviews.length * 4.5,
      ease: 'none',
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x: number) => x % total) },
    });

    return () => { tlRef.current?.kill(); };
  }, []);

  const pause = () => {
    setIsPaused(true);
    if (tlRef.current) gsap.to(tlRef.current, { timeScale: 0, duration: 0.3 });
  };

  const resume = () => {
    setIsPaused(false);
    if (tlRef.current) gsap.to(tlRef.current, { timeScale: 1, duration: 0.3 });
  };

  return (
    <div className="my-8 -mx-6 px-0 bg-gray-50 py-7 overflow-hidden">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-[#06756b] mb-5 px-6">
        What plan members say
      </p>

      <div
        className="overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          ref={trackRef}
          className="flex gap-4 pl-6"
          style={{ width: 'fit-content' }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className="pm-review-card flex-shrink-0 w-[272px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-4">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} fill="#FFD700" stroke="#FFD700" />
                  ))}
                </div>
                <p className="text-gray-800 text-sm leading-relaxed mb-3 line-clamp-3">
                  {r.text}
                </p>
                <div className="border-t border-gray-100 pt-3">
                  <p className="font-semibold text-gray-900 text-xs">{r.name}</p>
                  <p className="text-xs text-gray-500">{r.location}</p>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 border-t border-gray-100 flex items-start gap-2">
                <img
                  src="/CHLOGO.png"
                  alt="Cabos Handyman"
                  className="w-7 h-7 rounded-full object-contain bg-white border border-teal-400 flex-shrink-0 mt-0.5"
                  width="28"
                  height="28"
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-xs text-gray-600 leading-snug line-clamp-2">{r.response}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-4 px-6">
        {isPaused ? '⏸ Paused — move cursor away to resume' : '▶ Hover to pause'}
      </p>
    </div>
  );
}
