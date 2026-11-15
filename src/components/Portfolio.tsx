import { useRef, useState } from 'react';
import {
  ExternalLink,
  Monitor,
  Smartphone,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Globe,
  Maximize2,
} from 'lucide-react';
import {
  WEBSITE_PROJECT,
  VIDEO_PROJECT,
  type EnquiryServiceType,
} from '../config/studioConfig';
import { Reveal } from './Reveal';
import { VideoModal } from './VideoModal';

interface PortfolioProps {
  onContactUs: (serviceType?: EnquiryServiceType) => void;
}

export function Portfolio({ onContactUs }: PortfolioProps) {
  const [websiteViewport, setWebsiteViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);

  const toggleInlinePlay = () => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;

    if (videoEl.paused) {
      void videoEl.play();
      setIsPlayingInline(true);
    } else {
      videoEl.pause();
      setIsPlayingInline(false);
    }
  };

  const toggleMute = () => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl) return;
    const nextMuted = !isMuted;
    videoEl.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleOpenWatchModal = () => {
    if (inlineVideoRef.current && !inlineVideoRef.current.paused) {
      inlineVideoRef.current.pause();
      setIsPlayingInline(false);
    }
    setIsVideoModalOpen(true);
  };

  const hasExternalVideoUrl = Boolean(VIDEO_PROJECT.externalVideoUrl.trim());

  return (
    <section
      id="portfolio"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#0B0D13]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-[#8B7CFF]">
              FEATURED PROJECTS
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white [text-wrap:balance]">
              Selected Projects
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
            Independent concept builds across website development and promotional video
            creation, presented transparently as studio demonstrations.
          </p>
        </Reveal>

        <div className="space-y-14">
          {/* CATEGORY 1: WEBSITE PROJECTS */}
          <Reveal>
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3.5">
                <Globe className="w-4 h-4 text-[#8B7CFF]" aria-hidden="true" />
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight">
                  Website Projects
                </h3>
              </div>

              <article className="rounded-2xl bg-[#11131A] border border-white/[0.09] hover:border-[#8B7CFF]/45 transition-colors duration-200 p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Browser Mockup Frame */}
                  <div className="lg:col-span-7">
                    <div className="rounded-xl bg-[#08090D] border border-white/[0.1] overflow-hidden">
                      <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-[#0C0E14] border-b border-white/[0.07]">
                        <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
                          <span className="w-2 h-2 rounded-full bg-white/15" />
                          <span className="w-2 h-2 rounded-full bg-white/15" />
                          <span className="w-2 h-2 rounded-full bg-white/15" />
                        </div>

                        <div className="flex-1 min-w-0 px-2.5 py-0.5 rounded bg-[#11131A] border border-white/[0.06] text-[11px] font-mono text-[#A1A1AA] truncate text-center">
                          {WEBSITE_PROJECT.domainPreview}
                        </div>

                        <div className="flex items-center gap-0.5 p-0.5 rounded bg-[#11131A] border border-white/[0.06] shrink-0">
                          <button
                            type="button"
                            onClick={() => setWebsiteViewport('desktop')}
                            aria-label="Desktop mockup view for Hair's Inn Bridal Studio"
                            aria-pressed={websiteViewport === 'desktop'}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              websiteViewport === 'desktop'
                                ? 'bg-[#8B7CFF] text-white'
                                : 'text-[#A1A1AA] hover:text-white'
                            }`}
                          >
                            <Monitor className="w-3 h-3" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setWebsiteViewport('mobile')}
                            aria-label="Mobile mockup view for Hair's Inn Bridal Studio"
                            aria-pressed={websiteViewport === 'mobile'}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              websiteViewport === 'mobile'
                                ? 'bg-[#8B7CFF] text-white'
                                : 'text-[#A1A1AA] hover:text-white'
                            }`}
                          >
                            <Smartphone className="w-3 h-3" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="relative aspect-[16/10] bg-[#08090D] flex items-center justify-center overflow-hidden">
                        {websiteViewport === 'desktop' ? (
                          <div className="relative w-full h-full group">
                            <img
                              src={WEBSITE_PROJECT.image}
                              alt={WEBSITE_PROJECT.imageAlt}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                            <div
                              aria-hidden="true"
                              className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/35 to-black/20"
                            />
                            <div className="absolute inset-x-0 top-0 px-4 py-3 flex items-center justify-between text-[11px] text-white/85">
                              <span className="font-display font-semibold tracking-wide">
                                {WEBSITE_PROJECT.name}
                              </span>
                              <span className="text-white/70 hidden sm:inline">
                                Services · Bridal Work · Enquiries
                              </span>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                              <p className="text-[11px] font-mono text-[#8B7CFF] mb-1">
                                {WEBSITE_PROJECT.previewTagline}
                              </p>
                              <p className="font-display text-base sm:text-lg font-semibold text-white leading-snug max-w-md">
                                {WEBSITE_PROJECT.previewHeadline}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="h-[88%] aspect-[9/16] rounded-xl border-2 border-white/20 bg-[#11131A] overflow-hidden shadow-2xl flex flex-col">
                            <div className="h-4 bg-[#0C0E14] border-b border-white/10 flex items-center justify-center">
                              <span className="w-6 h-1 rounded-full bg-white/20" />
                            </div>
                            <div className="relative flex-1 overflow-hidden">
                              <img
                                src={WEBSITE_PROJECT.image}
                                alt={WEBSITE_PROJECT.imageAlt}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 bg-gradient-to-t from-[#08090D] via-[#08090D]/40 to-transparent"
                              />
                              <div className="absolute inset-x-0 bottom-0 p-3 space-y-1">
                                <p className="text-[9px] font-mono text-[#8B7CFF] truncate">
                                  {WEBSITE_PROJECT.previewTagline}
                                </p>
                                <p className="font-display text-xs font-semibold text-white leading-tight">
                                  {WEBSITE_PROJECT.name}
                                </p>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#8B7CFF] text-[9px] font-medium text-white">
                                  {WEBSITE_PROJECT.previewCta}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="lg:col-span-5 space-y-5">
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      <span className="text-[#8B7CFF] font-medium">
                        {WEBSITE_PROJECT.category}
                      </span>
                      <span aria-hidden="true" className="mx-1.5 text-white/30">
                        ·
                      </span>
                      <span>{WEBSITE_PROJECT.conceptLabel}</span>
                    </p>

                    <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {WEBSITE_PROJECT.name}
                    </h4>

                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                      {WEBSITE_PROJECT.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={WEBSITE_PROJECT.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap"
                      >
                        <span>View Website</span>
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onContactUs('Website Development')}
                        className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-[#08090D] hover:bg-[#171A24] border border-white/15 hover:border-[#8B7CFF]/50 text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        Request Similar Site
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </Reveal>

          {/* CATEGORY 2: PROMOTIONAL VIDEO PROJECTS */}
          <Reveal delay={0.08}>
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b border-white/[0.08] pb-3.5">
                <Film className="w-4 h-4 text-[#8B7CFF]" aria-hidden="true" />
                <h3 className="font-display text-lg sm:text-xl font-semibold text-white tracking-tight">
                  Promotional Video Projects
                </h3>
              </div>

              <article className="rounded-2xl bg-[#11131A] border border-white/[0.09] hover:border-[#8B7CFF]/45 transition-colors duration-200 p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Real Promotional Video Player Frame (Preserves Original 16:9 Quality & Aspect Ratio) */}
                  <div className="lg:col-span-7">
                    <div className="rounded-xl bg-[#08090D] border border-white/[0.1] overflow-hidden shadow-xl">
                      {/* Cinema Player Top Bar */}
                      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[#0C0E14] border-b border-white/[0.07]">
                        <div className="flex items-center gap-2 min-w-0">
                          <Film
                            className="w-3.5 h-3.5 text-[#8B7CFF] shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-xs font-mono text-[#A1A1AA] truncate">
                            Nera Villa — Promotional Reel (16:9)
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={toggleMute}
                            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                            className="p-1.5 rounded bg-[#11131A] border border-white/[0.08] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                          >
                            {isMuted ? (
                              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                            ) : (
                              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={handleOpenWatchModal}
                            aria-label="Open full video player"
                            className="p-1.5 rounded bg-[#11131A] border border-white/[0.08] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {/* Original Aspect Ratio 16:9 Video Area */}
                      <div className="relative aspect-video bg-black overflow-hidden group">
                        <video
                          ref={inlineVideoRef}
                          src={VIDEO_PROJECT.videoSrc}
                          muted={isMuted}
                          playsInline
                          preload="metadata"
                          controls={isPlayingInline}
                          onPlay={() => setIsPlayingInline(true)}
                          onPause={() => setIsPlayingInline(false)}
                          onEnded={() => setIsPlayingInline(false)}
                          aria-label="Nera Villa — A Private Escape promotional video"
                          className="w-full h-full object-contain bg-black"
                        />

                        {/* Play Button Overlay when paused */}
                        {!isPlayingInline && (
                          <button
                            type="button"
                            onClick={toggleInlinePlay}
                            aria-label="Play Nera Villa promotional video"
                            className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 hover:bg-black/25 transition-colors cursor-pointer group"
                          >
                            <span className="w-16 h-16 rounded-full bg-[#8B7CFF] group-hover:bg-[#7A69FF] text-white flex items-center justify-center shadow-[0_0_35px_rgba(139,124,255,0.5)] transition-transform duration-150 group-hover:scale-105">
                              <Play className="w-7 h-7 fill-current ml-0.5" aria-hidden="true" />
                            </span>
                            <span className="mt-3 text-xs font-medium tracking-wider uppercase text-white/90">
                              Play Promotional Video
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Video Project Details */}
                  <div className="lg:col-span-5 space-y-5">
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      <span className="text-[#8B7CFF] font-medium">
                        {VIDEO_PROJECT.category}
                      </span>
                      <span aria-hidden="true" className="mx-1.5 text-white/30">
                        ·
                      </span>
                      <span>{VIDEO_PROJECT.conceptLabel}</span>
                    </p>

                    <h4 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {VIDEO_PROJECT.name}
                    </h4>

                    <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                      {VIDEO_PROJECT.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      {hasExternalVideoUrl ? (
                        <a
                          href={VIDEO_PROJECT.externalVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap"
                        >
                          <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                          <span>Watch Project</span>
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={handleOpenWatchModal}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] text-white text-sm font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer"
                        >
                          <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                          <span>Watch Project</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={toggleInlinePlay}
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#08090D] hover:bg-[#171A24] border border-white/15 hover:border-[#8B7CFF]/50 text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap cursor-pointer"
                      >
                        {isPlayingInline ? (
                          <>
                            <Pause className="w-4 h-4 text-[#8B7CFF]" aria-hidden="true" />
                            <span>Pause Preview</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 text-[#8B7CFF]" aria-hidden="true" />
                            <span>Play Inline</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onEnquireVideo={() => onContactUs('Promotional Video')}
      />
    </section>
  );
}
