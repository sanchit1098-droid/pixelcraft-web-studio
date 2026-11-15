import { ArrowUpRight } from 'lucide-react';
import { STUDIO_IMAGES } from '../config/studioConfig';
import { Reveal } from './Reveal';

interface AboutProps {
  onStartProject: () => void;
}

export function About({ onStartProject }: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#0B0D13]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          {/* Left Column: Authentic Studio Overview */}
          <Reveal className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-medium tracking-[0.18em] text-[#8B7CFF]">
                ABOUT PIXELCRAFT STUDIO
              </p>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.12] [text-wrap:balance]">
                Creativity Meets Technology.
              </h2>

              <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
                PIXELCRAFT STUDIO is a creative digital studio focused on building modern
                websites and engaging promotional videos. We combine thoughtful design,
                visual storytelling, and technology to help businesses build a stronger
                digital presence.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="font-display text-sm font-semibold text-white mb-1">
                  Thoughtful Design
                </p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Clean visual hierarchy structured to build clarity and trust.
                </p>
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-white mb-1">
                  Visual Storytelling
                </p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Cinematic promotional videos tailored to showcase spaces and brands.
                </p>
              </div>
              <div>
                <p className="font-display text-sm font-semibold text-white mb-1">
                  Modern Technology
                </p>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Responsive, fast-loading builds engineered for everyday devices.
                </p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#11131A] hover:bg-[#171A24] border border-white/15 hover:border-[#8B7CFF]/50 text-white text-sm font-medium transition-colors duration-150 cursor-pointer"
              >
                <span>Start a Conversation</span>
                <ArrowUpRight className="w-4 h-4 text-[#8B7CFF]" aria-hidden="true" />
              </button>
            </div>
          </Reveal>

          {/* Right Column: Architectural Visual */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="h-full min-h-[300px] rounded-2xl overflow-hidden bg-[#11131A] border border-white/[0.1] relative">
              <img
                src={STUDIO_IMAGES.heroShowcase}
                alt="Architectural light and minimal geometry representing PIXELCRAFT STUDIO's design philosophy"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full lg:h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#08090D]/85 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-mono text-[#8B7CFF] mb-1">
                  WEBSITES &amp; PROMOTIONAL VIDEOS
                </p>
                <p className="font-display text-base font-semibold text-white">
                  Thoughtful design, visual storytelling, and technology working together.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
