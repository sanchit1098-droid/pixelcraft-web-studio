import { Eye, Heart, Sparkles, Share2, ArrowRight } from 'lucide-react';
import { WHY_VIDEO_BENEFITS, type WhyVideoBenefit } from '../config/studioConfig';
import { Reveal } from './Reveal';

interface WhyPromotionalVideosProps {
  onRequestVideo: () => void;
}

function BenefitIcon({ name }: { name: WhyVideoBenefit['iconName'] }) {
  const cls = 'w-5 h-5 text-[#8B7CFF]';
  switch (name) {
    case 'eye':
      return <Eye className={cls} aria-hidden="true" />;
    case 'heart':
      return <Heart className={cls} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={cls} aria-hidden="true" />;
    case 'share2':
      return <Share2 className={cls} aria-hidden="true" />;
  }
}

export function WhyPromotionalVideos({ onRequestVideo }: WhyPromotionalVideosProps) {
  return (
    <section
      id="why-videos"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#08090D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] text-[#8B7CFF]">
              WHY PROMOTIONAL VIDEOS?
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white [text-wrap:balance]">
              Make Your Business Impossible to Ignore.
            </h2>
          </div>

          <button
            type="button"
            onClick={onRequestVideo}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#11131A] hover:bg-[#171A24] border border-white/15 hover:border-[#8B7CFF]/50 text-white text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
          >
            <span>Plan a Promotional Video</span>
            <ArrowRight className="w-4 h-4 text-[#8B7CFF]" aria-hidden="true" />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WHY_VIDEO_BENEFITS.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.06}>
              <article className="group h-full rounded-2xl bg-[#11131A] border border-white/[0.08] hover:border-[#8B7CFF]/45 p-7 transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#08090D] border border-white/[0.08] group-hover:border-[#8B7CFF]/40 flex items-center justify-center transition-colors duration-200">
                    <BenefitIcon name={item.iconName} />
                  </div>
                  <span className="font-mono text-xs text-[#A1A1AA] tabular-nums">
                    {item.number}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-white mb-2.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
