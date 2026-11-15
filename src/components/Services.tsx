import { Globe, Film, Check, ArrowRight } from 'lucide-react';
import { MAIN_SERVICES, type EnquiryServiceType } from '../config/studioConfig';
import { Reveal } from './Reveal';

interface ServicesProps {
  onSelectService: (serviceType: EnquiryServiceType) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  return (
    <section
      id="services"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#08090D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-[#8B7CFF]">
              SERVICES
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white [text-wrap:balance]">
              Two Core Disciplines. One Cohesive Brand Presence.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
            Focused website development and promotional video creation crafted to help
            modern businesses look credible, memorable, and ready for customers.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MAIN_SERVICES.map((service, index) => {
            const isWebsite = service.id === 'website-development';
            return (
              <Reveal key={service.id} delay={index * 0.08}>
                <article className="group h-full flex flex-col justify-between rounded-2xl bg-[#11131A] border border-white/[0.09] hover:border-[#8B7CFF]/45 p-7 sm:p-9 transition-all duration-200 hover:-translate-y-1">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-7">
                      <div className="w-12 h-12 rounded-xl bg-[#08090D] border border-white/[0.09] group-hover:border-[#8B7CFF]/45 flex items-center justify-center transition-colors duration-200">
                        {isWebsite ? (
                          <Globe className="w-5 h-5 text-[#8B7CFF]" aria-hidden="true" />
                        ) : (
                          <Film className="w-5 h-5 text-[#8B7CFF]" aria-hidden="true" />
                        )}
                      </div>
                      <span className="font-mono text-xs tracking-wider text-[#8B7CFF] tabular-nums">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-[1.65rem] font-bold text-white mb-3 tracking-tight">
                      {service.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-7">
                      {service.description}
                    </p>

                    <div className="pt-6 border-t border-white/[0.07]">
                      <p className="text-xs font-medium tracking-[0.14em] text-white/75 mb-4">
                        INCLUDED CAPABILITIES
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                        {service.offerings.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-white/90"
                          >
                            <Check
                              className="w-4 h-4 text-[#8B7CFF] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/[0.07] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => onSelectService(service.enquiryValue)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#08090D] hover:bg-[#8B7CFF] border border-white/15 hover:border-[#8B7CFF] text-white text-sm font-semibold transition-colors duration-150 cursor-pointer"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
