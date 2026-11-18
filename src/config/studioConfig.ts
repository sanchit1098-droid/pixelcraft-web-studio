import heroShowcaseImg from '../assets/images/hero_studio_showcase_1794735689052.jpg';
import hairsInnImg from '../assets/images/hairs_inn_bridal_1794735689157.jpg';
import sizzleHouseImg from '../assets/images/sizzle_house_restaurant_1794764982969.jpg';
import aurelleCoutureImg from '../assets/images/aurelle_indian_couture_1794994013559.jpg';
import aboutStudioImg from '../assets/images/about_studio_space_1794735690314.jpg';

/**
 * STUDIO CONTACT DETAILS
 */
export const STUDIO_CONTACT = {
  email: 'hello.pixelcraft.webstudio@gmail.com',
  instagramHandle: '@web.pixelcraftstudio',
  instagramUrl: 'https://www.instagram.com/web.pixelcraftstudio/',
} as const;

/**
 * PROMOTIONAL VIDEO CONFIGURATION
 * ---------------------------------------------------------------------------
 * Replace `externalVideoUrl` with your published video URL (e.g. YouTube,
 * Vimeo, or hosted MP4 link) whenever you publish the video externally.
 * Leave empty (`''`) to play the attached local video asset in the studio
 * theatre modal when clicking "Watch Project".
 */
export const NERA_VILLA_VIDEO_CONFIG = {
  localVideoSrc: '/assets/aistudio/A_PRIVATE_ESCAPE_20261116_081708_0000_2fe46471.mp4',
  externalVideoUrl: '',
} as const;

export const STUDIO_IMAGES = {
  heroShowcase: heroShowcaseImg,
  hairsInnBridal: hairsInnImg,
  aboutStudio: aboutStudioImg,
} as const;

export interface NavLinkItem {
  label: string;
  href: string;
  id: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export type EnquiryServiceType =
  | 'Website Design'
  | 'Promotional Videos'
  | 'Both';

export interface MainServiceCategory {
  id: 'website-development' | 'promotional-video';
  number: string;
  title: string;
  description: string;
  offerings: string[];
  enquiryValue: EnquiryServiceType;
  ctaLabel: string;
}

export const MAIN_SERVICES: MainServiceCategory[] = [
  {
    id: 'website-development',
    number: 'SERVICE 01',
    title: 'Website Development',
    description:
      'Modern, responsive websites designed to build trust, showcase your business, and turn visitors into customers.',
    offerings: [
      'Business websites',
      'Salon and beauty websites',
      'Hotel and villa websites',
      'Restaurant websites',
      'Portfolio websites',
      'Website redesign',
    ],
    enquiryValue: 'Website Design',
    ctaLabel: 'I Need a Website',
  },
  {
    id: 'promotional-video',
    number: 'SERVICE 02',
    title: 'Promotional Video Creation',
    description:
      'Eye-catching promotional videos that present your business, products, and spaces through engaging visuals and cinematic storytelling.',
    offerings: [
      'Luxury villa and hotel promotional videos',
      'Business promotional videos',
      'Social media reels and short-form videos',
      'Property showcase videos',
      'Brand introduction videos',
      'AI-assisted promotional video concepts',
    ],
    enquiryValue: 'Promotional Videos',
    ctaLabel: 'I Need a Promotional Video',
  },
];

export interface WebsiteProjectItem {
  id: string;
  name: string;
  category: string;
  conceptLabel?: string;
  description: string;
  liveUrl: string;
  buttonLabel: string;
  domainPreview: string;
  image: string;
  imageAlt: string;
  previewTopNav: string;
  previewTagline: string;
  previewHeadline: string;
  previewCta: string;
}

export const WEBSITE_PROJECT: WebsiteProjectItem = {
  id: 'hairs-inn-bridal-studio',
  name: "Hair's Inn Bridal Studio",
  category: 'Website Projects',
  conceptLabel: 'Independent Concept Project · Not a commissioned client project',
  description:
    'An unofficial concept website designed to showcase how a bridal studio can present its services, portfolio, and brand online.',
  liveUrl: 'https://hair-s-inn-bridal-st-ecoo.bolt.host/',
  buttonLabel: 'View Website',
  domainPreview: 'hair-s-inn-bridal-st-ecoo.bolt.host',
  image: hairsInnImg,
  imageAlt:
    "Hair's Inn Bridal Studio website concept featuring a calm travertine bridal vanity and hair styling scene",
  previewTopNav: 'Services · Bridal Work · Enquiries',
  previewTagline: 'Bridal Hair & Beauty Atelier',
  previewHeadline: 'Timeless bridal artistry crafted for your milestone day.',
  previewCta: 'Explore Services',
};

export const SIZZLE_HOUSE_PROJECT: WebsiteProjectItem = {
  id: 'the-sizzle-house',
  name: 'THE SIZZLE HOUSE',
  category: 'Restaurant Website Design',
  description:
    'A premium restaurant website concept designed to showcase delicious food, an elegant dining experience and a modern restaurant brand.',
  liveUrl: 'https://upscale-restaurant-w-pyb2.bolt.host',
  buttonLabel: 'VIEW LIVE DEMO',
  domainPreview: 'upscale-restaurant-w-pyb2.bolt.host',
  image: sizzleHouseImg,
  imageAlt:
    'THE SIZZLE HOUSE upscale contemporary restaurant interior with warm evening lighting and plated dish',
  previewTopNav: 'Menu · Reservations · Dining',
  previewTagline: 'Contemporary Dining & Grill',
  previewHeadline: 'Elevated dishes, warm ambiance, and a modern dining experience.',
  previewCta: 'Explore Menu',
};

export const AURELLE_PROJECT: WebsiteProjectItem = {
  id: 'aurelle-indian-couture-edit',
  name: 'AURELLE – The Indian Couture Edit',
  category: 'Website Design / Fashion & Boutique',
  conceptLabel:
    'AI-generated concept project by PixelCraft Studio · Not a commissioned client project',
  description:
    'A premium Indian fashion boutique website concept showcasing designer collections, bridal couture, new arrivals and custom-order enquiries.',
  liveUrl: 'https://aurelle-indian-fashi-a4mk.bolt.host',
  buttonLabel: 'View Live Website',
  domainPreview: 'aurelle-indian-fashi-a4mk.bolt.host',
  image: aurelleCoutureImg,
  imageAlt:
    'AURELLE – The Indian Couture Edit luxury Indian fashion and bridal couture boutique interior showcase',
  previewTopNav: 'Collections · Bridal Couture · Custom Orders',
  previewTagline: 'The Indian Couture Edit',
  previewHeadline:
    'Designer collections, bridal couture, and bespoke Indian silhouettes.',
  previewCta: 'Explore Collection',
};

export const WEBSITE_PROJECTS: WebsiteProjectItem[] = [
  WEBSITE_PROJECT,
  SIZZLE_HOUSE_PROJECT,
  AURELLE_PROJECT,
];

export const VIDEO_PROJECT = {
  id: 'nera-villa-private-escape',
  name: 'Nera Villa — A Private Escape',
  category: 'Promotional Video Projects',
  conceptLabel: 'AI-Assisted Concept Project · Promotional Video',
  description:
    'A luxury villa promotional video concept created to demonstrate cinematic storytelling, premium visual presentation, and property marketing.',
  videoSrc: NERA_VILLA_VIDEO_CONFIG.localVideoSrc,
  externalVideoUrl: NERA_VILLA_VIDEO_CONFIG.externalVideoUrl,
} as const;

export interface WhyVideoBenefit {
  number: string;
  title: string;
  description: string;
  iconName: 'eye' | 'heart' | 'sparkles' | 'share2';
}

export const WHY_VIDEO_BENEFITS: WhyVideoBenefit[] = [
  {
    number: '01',
    title: 'Present Properties & Businesses Attractively',
    description:
      'Present their property or business attractively with smooth motion, balanced framing, and intentional visual pacing.',
    iconName: 'eye',
  },
  {
    number: '02',
    title: 'Build Emotional Connection',
    description:
      'Build an emotional connection with potential customers by conveying mood, atmosphere, and brand personality in seconds.',
    iconName: 'heart',
  },
  {
    number: '03',
    title: 'Showcase Facilities, Products & Experiences',
    description:
      'Showcase facilities, products, and experiences far more vividly than static images or plain text descriptions alone.',
    iconName: 'sparkles',
  },
  {
    number: '04',
    title: 'Multi-Channel Ready Content',
    description:
      'Create content for Instagram, websites, and advertisements so your visual message stays cohesive across every platform.',
    iconName: 'share2',
  },
];

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
  iconName: 'palette' | 'smartphone' | 'zap' | 'messageSquare' | 'search' | 'sliders';
}

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Premium Visual Design',
    description:
      'Custom layouts, refined typography, and cinematic pacing crafted to reflect the quality of your business.',
    iconName: 'palette',
  },
  {
    number: '02',
    title: 'Mobile-First Experience',
    description:
      'Websites and video formats structured to look sharp on smartphones first, scaling smoothly across tablets and desktops.',
    iconName: 'smartphone',
  },
  {
    number: '03',
    title: 'Fast Loading Performance',
    description:
      'Clean frontend code and optimized media delivery keep pages responsive and effortless to browse on any connection.',
    iconName: 'zap',
  },
  {
    number: '04',
    title: 'Easy Customer Communication',
    description:
      'Clear calls to action, structured enquiry pathways, and direct email or Instagram options make reaching you frictionless.',
    iconName: 'messageSquare',
  },
  {
    number: '05',
    title: 'SEO-Friendly Structure',
    description:
      'Semantic HTML headings, clean metadata, and logical content hierarchy give search engines a clear picture of your business.',
    iconName: 'search',
  },
  {
    number: '06',
    title: 'Personalized Creative Direction',
    description:
      'Every website and promotional video concept is tailored directly around your brand goals rather than forced into a generic mold.',
    iconName: 'sliders',
  },
];

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    description: 'Understand the business, audience, and brand goals.',
  },
  {
    step: '02',
    title: 'DESIGN',
    description: 'Create the visual direction, website layout, or video story.',
  },
  {
    step: '03',
    title: 'DEVELOP',
    description: 'Build the responsive website and craft the promotional video.',
  },
  {
    step: '04',
    title: 'REFINE',
    description: 'Review, polish, and improve every visual and functional detail.',
  },
  {
    step: '05',
    title: 'LAUNCH',
    description: 'Deliver the final website and video assets ready for customers.',
  },
];
