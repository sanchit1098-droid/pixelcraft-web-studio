import {
  Palette,
  Smartphone,
  Zap,
  MessageSquare,
  Search,
  Sliders,
} from 'lucide-react';
import { WHY_CHOOSE_ITEMS, type WhyChooseItem } from '../config/studioConfig';
import { Reveal } from './Reveal';

function WhyIcon({ name }: { name: WhyChooseItem['iconName'] }) {
  const cls = 'w-5 h-5 text-[#8B7CFF]';
  switch (name) {
    case 'palette':
      return <Palette className={cls} aria-hidden="true" />;
    case 'smartphone':
      return <Smartphone className={cls} aria-hidden="true" />;
    case 'zap':
      return <Zap className={cls} aria-hidden="true" />;
    case 'messageSquare':
      return <MessageSquare className={cls} aria-hidden="true" />;
    case 'search':
      return <Search className={cls} aria-hidden="true" />;
    case 'sliders':
      return <Sliders className={cls} aria-hidden="true" />;
  }
}

export function WhyPixelcraft() {
  return (
    <section
      id="why-pixelcraft"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#0B0D13]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl space-y-3 mb-14">
          <p className="text-xs font-medium tracking-[0.18em] text-[#8B7CFF]">
            WHY PIXELCRAFT
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white [text-wrap:balance]">
            Why Businesses Choose Better Websites
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed pt-1">
            A website is often the first impression a customer has of your business. Every
            detail we craft focuses on clarity, speed, and genuine brand trust.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, index) => (
            <Reveal key={item.number} delay={index * 0.05}>
              <div className="h-full rounded-2xl bg-[#11131A] border border-white/[0.08] p-7 hover:border-white/20 transition-colors duration-200">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#08090D] border border-white/[0.08] flex items-center justify-center">
                    <WhyIcon name={item.iconName} />
                  </div>
                  <span className="font-mono text-xs text-[#A1A1AA] tabular-nums">
                    {item.number}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2.5 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
