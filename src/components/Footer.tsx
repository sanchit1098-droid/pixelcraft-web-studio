import { Mail, Instagram } from 'lucide-react';
import {
  MAIN_SERVICES,
  NAV_LINKS,
  STUDIO_CONTACT,
  type EnquiryServiceType,
} from '../config/studioConfig';

interface FooterProps {
  onSelectService: (serviceType: EnquiryServiceType) => void;
}

export function Footer({ onSelectService }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090D] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Studio Brand & Short Description */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="inline-flex items-center gap-2.5 text-white font-display font-bold tracking-tight text-lg"
            >
              <span
                aria-hidden="true"
                className="w-7 h-7 rounded-md bg-[#11131A] border border-white/15 flex items-center justify-center"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" fill="#8B7CFF" />
                  <rect
                    x="8"
                    y="1.5"
                    width="4.5"
                    height="4.5"
                    rx="1"
                    fill="#FFFFFF"
                    fillOpacity="0.9"
                  />
                  <rect
                    x="1.5"
                    y="8"
                    width="4.5"
                    height="4.5"
                    rx="1"
                    fill="#FFFFFF"
                    fillOpacity="0.45"
                  />
                  <rect
                    x="8"
                    y="8"
                    width="4.5"
                    height="4.5"
                    rx="1"
                    fill="#8B7CFF"
                    fillOpacity="0.55"
                  />
                </svg>
              </span>
              <span>PIXELCRAFT STUDIO</span>
            </a>
            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-xs">
              Creative digital studio building modern, responsive websites and cinematic
              promotional videos for ambitious businesses.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <p className="text-xs font-medium tracking-[0.16em] text-white/90">
              NAVIGATION
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className="text-sm text-[#A1A1AA] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#why-videos"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('why-videos');
                  }}
                  className="text-sm text-[#A1A1AA] hover:text-white transition-colors"
                >
                  Why Promotional Videos
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3 space-y-3.5">
            <p className="text-xs font-medium tracking-[0.16em] text-white/90">
              SERVICES
            </p>
            <ul className="space-y-2.5">
              {MAIN_SERVICES.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.enquiryValue)}
                    className="text-sm text-[#A1A1AA] hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => onSelectService('Both')}
                  className="text-sm text-[#A1A1AA] hover:text-white transition-colors text-left cursor-pointer"
                >
                  Website + Video Package
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact Links */}
          <div className="lg:col-span-3 space-y-3.5">
            <p className="text-xs font-medium tracking-[0.16em] text-white/90">
              CONNECT
            </p>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors break-all text-left cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#8B7CFF] shrink-0" aria-hidden="true" />
                  <span>{STUDIO_CONTACT.email}</span>
                </button>
              </li>
              <li>
                <a
                  href={STUDIO_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#8B7CFF] shrink-0" aria-hidden="true" />
                  <span>Instagram ({STUDIO_CONTACT.instagramHandle})</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#A1A1AA]">
          <p>&copy; {currentYear} PIXELCRAFT STUDIO. All rights reserved.</p>
          <p>Website Development &amp; Promotional Video Creation</p>
        </div>
      </div>
    </footer>
  );
}
