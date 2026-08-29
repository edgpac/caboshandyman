const services = [
  { path: '/bathroom-services-cabo', name: 'Bathroom Services', icon: '🛁' },
  { path: '/electrical-services-cabo', name: 'Electrical Services', icon: '⚡' },
  { path: '/kitchen-services-cabo', name: 'Kitchen Remodeling', icon: '🍳' },
  { path: '/plumber-cabo-san-lucas', name: 'Plumbing Services', icon: '🔧' },
  { path: '/tv-mounting-cabo', name: 'TV Mounting', icon: '📺' },
  { path: '/ceiling-fan-installation-cabo', name: 'Ceiling Fans', icon: '💨' },
  { path: '/furniture-assembly-cabo', name: 'Furniture Assembly', icon: '🪑' },
  { path: '/toilet-tub-unclogging-cabo', name: 'Drain Cleaning', icon: '🚿' },
  { path: '/property-care-plans', name: 'Property Care Plans', icon: '🛡️' },
  { path: '/property-setup-cabo', name: 'Property Setup', icon: '🏠' },
  { path: '/ac-installation-cabo-san-lucas', name: 'AC Installation & Repair', icon: '❄️' },
];

const relatedMap: Record<string, string[]> = {
  '/bathroom-services-cabo': ['/plumber-cabo-san-lucas', '/kitchen-services-cabo', '/toilet-tub-unclogging-cabo', '/electrical-services-cabo'],
  '/electrical-services-cabo': ['/ac-installation-cabo-san-lucas', '/ceiling-fan-installation-cabo', '/tv-mounting-cabo', '/property-setup-cabo'],
  '/kitchen-services-cabo': ['/bathroom-services-cabo', '/plumber-cabo-san-lucas', '/electrical-services-cabo', '/furniture-assembly-cabo'],
  '/plumber-cabo-san-lucas': ['/toilet-tub-unclogging-cabo', '/bathroom-services-cabo', '/kitchen-services-cabo', '/electrical-services-cabo'],
  '/tv-mounting-cabo': ['/furniture-assembly-cabo', '/ceiling-fan-installation-cabo', '/electrical-services-cabo', '/property-setup-cabo'],
  '/ceiling-fan-installation-cabo': ['/electrical-services-cabo', '/tv-mounting-cabo', '/property-setup-cabo', '/bathroom-services-cabo'],
  '/furniture-assembly-cabo': ['/tv-mounting-cabo', '/property-setup-cabo', '/ceiling-fan-installation-cabo', '/kitchen-services-cabo'],
  '/toilet-tub-unclogging-cabo': ['/plumber-cabo-san-lucas', '/bathroom-services-cabo', '/kitchen-services-cabo', '/property-care-plans'],
  '/ac-installation-cabo-san-lucas': ['/electrical-services-cabo', '/property-care-plans', '/property-setup-cabo', '/ceiling-fan-installation-cabo'],
};

export default function RelatedServices({ currentPath }: { currentPath: string }) {
  const relatedPaths = relatedMap[currentPath] || services.filter(s => s.path !== currentPath).slice(0, 4).map(s => s.path);
  const related = relatedPaths.map(p => services.find(s => s.path === p)).filter(Boolean);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Related Handyman Services in Cabo San Lucas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map(service => (
            <a
              key={service!.path}
              href={service!.path}
              className="bg-white rounded-lg p-5 text-center hover:shadow-lg transition-shadow border border-gray-200 group"
            >
              <div className="text-3xl mb-2">{service!.icon}</div>
              <div className="font-semibold text-gray-900 text-sm group-hover:text-teal-600 transition-colors">
                {service!.name}
              </div>
            </a>
          ))}
        </div>
        <p className="text-center mt-6">
          <a href="/services" className="text-teal-600 hover:underline font-medium">
            View All Services & Pricing →
          </a>
        </p>
      </div>
    </section>
  );
}
