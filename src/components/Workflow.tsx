import { useState } from 'react';
import { WORKFLOW_STEPS } from '../config/studioConfig';
import { Reveal } from './Reveal';

export function Workflow() {
  const [activeStep, setActiveStep] = useState<string>('01');

  return (
    <section
      id="process"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#08090D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-[#8B7CFF]">
              OUR WORKFLOW
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white [text-wrap:balance]">
              From Initial Idea to Live Launch
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
            A clear, collaborative five-stage workflow designed so you always know what is
            being built and why.
          </p>
        </Reveal>

        {/* Desktop & Tablet Horizontal Timeline / Mobile Vertical Rail */}
        <div className="relative">
          {/* Connecting Hairline Track on Desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-6 right-6 h-[1px] bg-white/[0.08]"
          />

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {WORKFLOW_STEPS.map((item, index) => {
              const isActive = activeStep === item.step;
              return (
                <Reveal key={item.step} delay={index * 0.06}>
                  <li
                    onMouseEnter={() => setActiveStep(item.step)}
                    onClick={() => setActiveStep(item.step)}
                    className="relative group cursor-pointer"
                  >
                    {/* Step Node */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center font-mono text-sm font-medium tabular-nums transition-all duration-200 ${
                          isActive
                            ? 'bg-[#8B7CFF] border-[#8B7CFF] text-white shadow-[0_0_24px_rgba(139,124,255,0.4)]'
                            : 'bg-[#11131A] border-white/[0.12] text-white group-hover:border-[#8B7CFF]/60'
                        }`}
                      >
                        {item.step}
                      </div>
                      <span
                        aria-hidden="true"
                        className="lg:hidden flex-1 h-[1px] bg-white/[0.08]"
                      />
                    </div>

                    {/* Step Card */}
                    <div
                      className={`rounded-2xl p-6 border transition-colors duration-200 min-h-[152px] flex flex-col justify-between ${
                        isActive
                          ? 'bg-[#11131A] border-[#8B7CFF]/45'
                          : 'bg-[#11131A]/75 border-white/[0.08] group-hover:border-white/20'
                      }`}
                    >
                      <div>
                        <h3 className="font-display text-base font-bold tracking-wider text-white mb-2.5">
                          {item.title}
                        </h3>
                        <p className="text-sm text-[#A1A1AA] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className={`mt-4 block h-[2px] w-8 rounded-full transition-colors duration-200 ${
                          isActive ? 'bg-[#8B7CFF]' : 'bg-white/10'
                        }`}
                      />
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
