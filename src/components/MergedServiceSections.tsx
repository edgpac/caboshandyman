import { CheckCircle2 } from 'lucide-react';
import { MERGED_SERVICES, type MergedServiceHub } from '@/data/mergedServices';

export default function MergedServiceSections({ hub }: { hub: MergedServiceHub }) {
  const group = MERGED_SERVICES[hub];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{group.heading}</h2>
        <p className="text-gray-700 mb-10 text-center max-w-3xl mx-auto">{group.intro}</p>
        <div className="space-y-8">
          {group.services.map((service) => (
            <div key={service.id} id={service.id} className="border border-gray-200 rounded-xl p-6 scroll-mt-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-700 mb-4">{service.intro}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-800">
                      <CheckCircle2 className="text-[#06756b] mt-0.5 shrink-0" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 text-sm text-gray-700">
                  {service.faqs.map((faq) => (
                    <div key={faq.question}>
                      <p className="font-semibold text-gray-900">{faq.question}</p>
                      <p>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
