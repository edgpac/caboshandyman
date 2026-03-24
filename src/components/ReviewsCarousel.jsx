import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Maria G.",
    location: "Pedregal, Cabo San Lucas",
    rating: 5,
    text: "Best handyman service in Cabo! They fixed my AC in less than 2 hours during the hottest week of summer. Highly recommend!",
    response: "Thank you so much for the fantastic review, Maria! We're thrilled we could get your AC fixed so quickly during that heat wave. Fast, reliable service is what we're all about here at Cabos Handyman. We appreciate your trust!"
  },
  {
    name: "John & Sarah T.",
    location: "Cabo San Lucas",
    rating: 5,
    text: "Professional, punctual, and affordable. They remodeled our vacation rental kitchen and it looks amazing. Our guests love it!",
    response: "Thank you for the wonderful review! We truly appreciate property owners like you who trust us with vacation rentals. That kitchen turned out beautifully - we're honored to be your go-to team. Looking forward to our continued partnership!"
  },
  {
    name: "Kevin & Monica B.",
    location: "Pedregal, Cabo San Lucas",
    rating: 5,
    text: "Full kitchen remodel from scratch — new cabinets, quartz countertops, backsplash, and all new plumbing. Done in 12 days. We were shocked by the quality. Looks like something out of a magazine.",
    response: "Kevin & Monica, this one was a labor of love for our whole crew. Seeing the finished kitchen come together — the quartz against that backsplash — was one of those jobs we're genuinely proud of. Thank you for trusting us with something this important. Come back anytime!"
  },
  {
    name: "Lisa P.",
    location: "Property Manager, Cabo San Lucas",
    rating: 5,
    text: "We manage 5 rental properties and Cabos Handyman is our go-to for everything. Reliable, fast, and great pricing.",
    response: "Thank you, Lisa! We truly appreciate property managers like you who trust us with multiple units. Reliability and quality work are essential for vacation rentals. We're honored to be your go-to team!"
  },
  {
    name: "Carlos & Ana R.",
    location: "Cabo San Lucas",
    rating: 5,
    text: "Painted our entire house exterior in 3 days. Clean work, no mess, and the price was very fair. Excellent team!",
    response: "Thank you so much for your kind words! We're thrilled with how your exterior turned out. Clean work with no mess left behind - that's our standard. Our team takes great pride in quality craftsmanship!"
  },
  {
    name: "Michael D.",
    location: "Cabo Bello",
    rating: 5,
    text: "Electrical work can be scary, but these guys knew exactly what they were doing. Fixed all our outlet issues in one visit.",
    response: "Thank you, Michael! Safety is our #1 priority with electrical work. We're glad we could solve your outlet issues quickly and safely. Our certified electricians ensure everything meets code!"
  },
  {
    name: "Patricia L.",
    location: "El Tezal",
    rating: 5,
    text: "Built us a beautiful custom deck with palapa. It's now our favorite spot in the house. Quality craftsmanship!",
    response: "Thank you so much, Patricia! We're thrilled the deck with palapa turned out beautifully. Quality craftsmanship that lasts - that's our promise. Enjoy your new favorite spot!"
  },
  {
    name: "David W.",
    location: "California / Cabo vacation home",
    rating: 5,
    text: "As an absentee owner, I needed someone trustworthy. They send photos of completed work and bills are always accurate.",
    response: "Thank you, David! Honesty and transparency are core values at Cabos Handyman. We understand absentee owners need extra peace of mind - we treat every home like it's our own. We're grateful for your trust!"
  },
  {
    name: "Gabriela S.",
    location: "Cabo San Lucas",
    rating: 5,
    text: "Unclogged our drain, fixed a leaky faucet, and installed a new toilet - all in one appointment. Super efficient!",
    response: "Thank you, Gabriela! We're happy your plumbing is working perfectly now. Efficiency and getting everything done in one visit saves you time and money. We appreciate your business!"
  },
  {
    name: "Tom & Jennifer K.",
    location: "Cabo San Lucas",
    rating: 5,
    text: "Eddy and his team did a great job installing ledger stone on a large wall. They were clean, punctual, and true perfectionists.",
    response: "Thank you so much, Tom & Jennifer! We're thrilled the ledger stone wall turned out beautifully. Cleanliness and punctuality are priorities on every job. Our team takes great pride in that attention to detail you noticed. We truly appreciate your kind words and recommendation!"
  },
  {
    name: "Eduardo F.",
    location: "Cabo San Lucas",
    rating: 5,
    text: "They installed smart home devices throughout our house. Now we can control everything from our phones. Love it!",
    response: "Thank you, Eduardo! Smart home technology is the future, and we're glad we could modernize your home. Communication and professionalism are core to everything we do. Enjoy your new setup!"
  },
  {
    name: "Susan M.",
    location: "Cabo San Lucas",
    rating: 5,
    text: "Storm damage repair was done quickly and professionally. They worked with our insurance company too. Stress-free experience.",
    response: "Thank you, Susan! Storm damage is stressful, and we're glad we could help coordinate with your insurance company to make it stress-free. We're proud of how the repairs turned out!"
  },
  {
    name: "Francisco V.",
    location: "Cabo San Lucas",
    rating: 5,
    text: "Repaired our pool equipment and showed us how to maintain it properly. Great service and educational too!",
    response: "Thank you, Francisco! We love educating our clients on proper maintenance - it saves money in the long run. Your satisfaction is our top priority. Thanks for choosing Cabos Handyman!"
  },
  {
    name: "Amanda R.",
    location: "Commercial Property, Cabo",
    rating: 5,
    text: "Bilingual service made everything so easy. They explained everything in English and Spanish for our staff.",
    response: "Thank you, Amanda! Bilingual service is essential in Los Cabos. We're glad we could communicate clearly with your entire team. Communication and professionalism are core to everything we do!"
  },
  {
    name: "James & Linda H.",
    location: "Vacation Rental Owners, Cabo San Lucas",
    rating: 5,
    text: "5 years using their services for our vacation rentals. Never disappointed. They're like family now!",
    response: "Thank you so much, James & Linda! 5 years of partnership means the world to us. We're honored to be part of your team and grateful for your continued trust. Here's to many more years!"
  }
];

export default function ReviewsCarousel() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const cards = carousel.querySelectorAll('.review-card');
    const cardWidth = cards[0].offsetWidth + 32; // card width + gap
    const totalWidth = cardWidth * reviews.length;

    // Clone cards for seamless loop
    reviews.forEach((_, index) => {
      const clone = cards[index].cloneNode(true);
      carousel.appendChild(clone);
    });

    // GSAP infinite scroll animation
    timelineRef.current = gsap.to(carousel, {
      x: -totalWidth,
      duration: reviews.length * 5, // 5 seconds per review
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 0, duration: 0.3 });
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (timelineRef.current) {
      gsap.to(timelineRef.current, { timeScale: 1, duration: 0.3 });
    }
  };

  return (
    <section className="py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #02af9f 0%, #028f82 100%)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Reviews from customers across Los Cabos
          </p>
        </div>

        <div 
          className="overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={carouselRef}
            className="flex gap-8"
            style={{ width: 'fit-content' }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="review-card flex-shrink-0 w-[420px] bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Main Review Card */}
                <div className="p-8">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={22}
                        fill="#FFD700"
                        stroke="#FFD700"
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-900 text-base leading-relaxed mb-6">
                    "{review.text}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <p className="font-bold text-gray-900 text-lg">
                      {review.name}
                    </p>
                    <p className="text-sm text-gray-900 mt-1">
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Owner Response */}
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src="/CHLOGO.png"
                        alt="Cabos Handyman"
                        className="w-10 h-10 rounded-full object-contain bg-white border-2 border-teal-500"
                        width="40"
                        height="40"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Response from the owner
                      </p>
                      <p className="text-gray-900 text-sm leading-relaxed">
                        {review.response}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pause Indicator */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm">
            {isPaused ? '⏸ Paused - move cursor away to resume' : '▶ Hover over any review to pause'}
          </p>
        </div>
      </div>
    </section>
  );
}