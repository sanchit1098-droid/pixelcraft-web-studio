import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyPromotionalVideos } from './components/WhyPromotionalVideos';
import { WhyPixelcraft } from './components/WhyPixelcraft';
import { Workflow } from './components/Workflow';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { EnquiryServiceType } from './config/studioConfig';

export default function App() {
  const [selectedService, setSelectedService] =
    useState<EnquiryServiceType>('Website Design');

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireService = (serviceType?: EnquiryServiceType) => {
    if (serviceType) {
      setSelectedService(serviceType);
    }
    scrollToSection('contact');
    setTimeout(() => {
      const nameInput = document.getElementById('fullName');
      if (nameInput instanceof HTMLInputElement) {
        nameInput.focus({ preventScroll: true });
      }
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-white flex flex-col">
      <Navbar onNavigateToContact={() => handleInquireService()} />

      <main className="flex-1">
        <Hero
          onExploreWork={() => scrollToSection('portfolio')}
          onStartProject={() => handleInquireService()}
        />

        <Services onSelectService={(serviceType) => handleInquireService(serviceType)} />

        <Portfolio onContactUs={(serviceType) => handleInquireService(serviceType)} />

        <WhyPromotionalVideos
          onRequestVideo={() => handleInquireService('Promotional Videos')}
        />

        <WhyPixelcraft />

        <Workflow />

        <About onStartProject={() => handleInquireService()} />

        <Contact preselectedService={selectedService} />
      </main>

      <Footer onSelectService={(serviceType) => handleInquireService(serviceType)} />
    </div>
  );
}
