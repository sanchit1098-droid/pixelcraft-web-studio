import { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  MonitorSmartphone,
  Film,
  Target,
  Globe,
  Play,
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import {
  NERA_VILLA_VIDEO_CONFIG,
  STUDIO_IMAGES,
  WEBSITE_PROJECT,
} from '../config/studioConfig';

interface HeroProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

type HeroMode = 'website' | 'video';

export function Hero({ onExploreWork, onStartProject }: HeroProps) {
  const [activeMode, setActiveMode] = useState<HeroMode>('website');
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden studio-grid-bg border-b border-white/[0.06]"
    >
      {/* Subtle atmospheric accent illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[10%] w-[520px] h-[520px] rounded-full bg-[#8B7CFF]/[0.11] blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-10%] w-[420px] h-[420px] rounded-full bg-[#8B7CFF]/[0.06] blur-[120px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Dual-Service Value Proposition */}
          <div className="lg:col-span-6 space-y-7">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span aria-hidden="true" className="h-[1px] w-8 bg-[#8B7CFF]" />
              <p className="text-xs sm:text-[13px] font-medium tracking-[0.18em] text-[#8B7CFF]">
                WEBSITE DEVELOPMENT &amp; PROMOTIONAL VIDEO STUDIO
              </p>
            </motion.div>

            <motion.h1
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-white tracking-[-0.025em] leading-[1.06] text-[clamp(2.25rem,4vw,3.75rem)] [text-wrap:balance]"
            >
              Websites That Impress. Videos That Sell.
            </motion.h1>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-xl"
            >
              We build beautiful, high-performing websites and create cinematic promotional
              videos that help businesses attract attention, showcase their brand, and win
              more customers.
            </motion.p>

            {/* Primary & Secondary CTA Buttons */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <button
                type="button"
                onClick={onExploreWork}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] text-white text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_8px_30px_rgba(139,124,255,0.28)] hover:shadow-[0_12px_34px_rgba(139,124,255,0.38)]"
              >
                <span>Explore Our Work</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#11131A] hover:bg-[#171A24] border border-white/15 hover:border-[#8B7CFF]/50 text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Let&apos;s Build Something</span>
                <ArrowUpRight className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
              </button>
            </motion.div>

            {/* Three Studio Highlights */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                <MonitorSmartphone
                  className="w-4 h-4 text-[#8B7CFF] shrink-0"
                  aria-hidden="true"
                />
                <span className="text-white/90 font-medium">Responsive Websites</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                <Film className="w-4 h-4 text-[#8B7CFF] shrink-0" aria-hidden="true" />
                <span className="text-white/90 font-medium">Promotional Videos</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#A1A1AA]">
                <Target className="w-4 h-4 text-[#8B7CFF] shrink-0" aria-hidden="true" />
                <span className="text-white/90 font-medium">Brand Storytelling</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dual-Discipline Interactive Showcase */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Back Depth Layer Frame */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -top-4 -right-3 left-6 bottom-6 rounded-2xl bg-[#11131A]/70 border border-white/[0.07]"
              />

              {/* Main Interactive Showcase Window */}
              <div className="relative rounded-2xl bg-[#11131A] border border-white/[0.12] shadow-2xl overflow-hidden">
                {/* Top Chrome + Interactive Mode Switcher */}
                <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#0C0E14] border-b border-white/[0.08]">
                  <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                  </div>

                  <div className="hidden sm:block flex-1 min-w-0 max-w-[220px] mx-auto px-3 py-1 rounded-md bg-[#11131A] border border-white/[0.06] text-[11px] font-mono text-[#A1A1AA] truncate text-center">
                    {activeMode === 'website'
                      ? WEBSITE_PROJECT.domainPreview
                      : 'nera-villa-promo-reel.mp4'}
                  </div>

                  <div
                    role="tablist"
                    aria-label="Studio showcase mode"
                    className="flex items-center gap-1 p-0.5 rounded-md bg-[#11131A] border border-white/[0.06] shrink-0"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeMode === 'website'}
                      onClick={() => setActiveMode('website')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
                        activeMode === 'website'
                          ? 'bg-[#8B7CFF] text-white'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      <Globe className="w-3 h-3" aria-hidden="true" />
                      <span>Website</span>
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeMode === 'video'}
                      onClick={() => setActiveMode('video')}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer whitespace-nowrap ${
                        activeMode === 'video'
                          ? 'bg-[#8B7CFF] text-white'
                          : 'text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      <Play className="w-3 h-3" aria-hidden="true" />
                      <span>Promo Video</span>
                    </button>
                  </div>
                </div>

                {/* Viewport Area */}
                <div className="relative aspect-[16/10] bg-[#08090D] overflow-hidden">
                  {activeMode === 'website' ? (
                    <img
                      src={STUDIO_IMAGES.heroShowcase}
                      alt="Architectural web design showcase by PIXELCRAFT STUDIO"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={NERA_VILLA_VIDEO_CONFIG.localVideoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      aria-label="Nera Villa promotional video concept reel preview"
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/35 to-transparent"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                    <div className="space-y-1 max-w-md">
                      <p className="text-[11px] font-mono tracking-wider text-[#8B7CFF]">
                        {activeMode === 'website'
                          ? 'WEBSITE DEVELOPMENT · RESPONSIVE UI'
                          : 'PROMOTIONAL VIDEO · NERA VILLA CONCEPT'}
                      </p>
                      <p className="font-display text-lg sm:text-xl font-semibold text-white leading-snug">
                        {activeMode === 'website'
                          ? 'Modern Digital Storefronts Built to Convert'
                          : 'Cinematic Storytelling for Brands & Properties'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onExploreWork}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-medium text-white transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>View Work</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Secondary Card: Dual Creative Disciplines */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="mt-4 sm:mt-0 sm:absolute sm:-bottom-7 sm:-left-6 w-full sm:w-60 rounded-xl glass-panel border border-white/[0.12] p-3.5 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-2.5">
                  <span className="text-[11px] font-medium text-white">
                    Dual Studio Craft
                  </span>
                  <span className="text-[11px] font-mono text-[#8B7CFF]">Web + Video</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden border border-white/10 shrink-0 bg-[#08090D]">
                    <img
                      src={STUDIO_IMAGES.hairsInnBridal}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <p className="text-xs font-medium text-white truncate">
                      Cohesive Brand Presence
                    </p>
                    <p className="text-[11px] text-[#A1A1AA] leading-snug">
                      Sites built to convert &amp; reels cut to engage
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Top-Right Cinema Card */}
              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                className="hidden md:block absolute -top-5 -right-4 w-48 rounded-xl glass-panel border border-white/[0.12] p-3.5 shadow-xl"
              >
                <p className="text-[11px] font-medium text-[#A1A1AA] mb-2">
                  Deliverable Formats
                </p>
                <div className="space-y-1.5 text-[11px] font-mono text-white/85">
                  <div className="flex items-center justify-between">
                    <span>Websites</span>
                    <span className="text-[#8B7CFF]">Responsive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Promo Reels</span>
                    <span className="text-[#8B7CFF]">16:9 · 9:16</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
