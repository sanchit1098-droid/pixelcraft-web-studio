import { useEffect, useState, type FormEvent } from 'react';
import {
  Mail,
  Instagram,
  Check,
  Copy,
  Send,
  ExternalLink,
  AlertCircle,
  Globe,
  Film,
} from 'lucide-react';
import { STUDIO_CONTACT, type EnquiryServiceType } from '../config/studioConfig';
import { Reveal } from './Reveal';

interface ContactProps {
  preselectedService: EnquiryServiceType;
}

interface FormValues {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  serviceType: EnquiryServiceType;
  projectDetails: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const ENQUIRY_SERVICE_OPTIONS: EnquiryServiceType[] = [
  'Website Development',
  'Promotional Video',
  'Both (Website + Promotional Video)',
];

export function Contact({ preselectedService }: ContactProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    serviceType: 'Website Development',
    projectDetails: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      serviceType: preselectedService,
    }));
  }, [preselectedService]);

  const selectQuickOption = (option: EnquiryServiceType) => {
    setValues((prev) => ({ ...prev, serviceType: option }));
    const nameInput = document.getElementById('fullName');
    if (nameInput instanceof HTMLInputElement) {
      nameInput.focus({ preventScroll: true });
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim() || values.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    if (!values.businessName.trim()) {
      nextErrors.businessName = 'Please enter your business or brand name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const phoneDigits = values.phone.replace(/[^\d+]/g, '');
    if (!values.phone.trim() || phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!values.serviceType) {
      nextErrors.serviceType = 'Please select what you need.';
    }
    if (!values.projectDetails.trim() || values.projectDetails.trim().length < 15) {
      nextErrors.projectDetails =
        'Please share a short overview of your project (at least 15 characters).';
    }
    return nextErrors;
  };

  const buildFormattedMessage = () => {
    return [
      `Hello PIXELCRAFT STUDIO,`,
      ``,
      `I would like to discuss a project:`,
      `• Full Name: ${values.fullName.trim()}`,
      `• Business Name: ${values.businessName.trim()}`,
      `• Email Address: ${values.email.trim()}`,
      `• Phone Number: ${values.phone.trim()}`,
      `• Service Needed: ${values.serviceType}`,
      ``,
      `Project Details:`,
      `${values.projectDetails.trim()}`,
    ].join('\n');
  };

  const buildMailtoUrl = () => {
    const subject = `${values.serviceType} Enquiry — ${values.businessName.trim() || values.fullName.trim()}`;
    const body = buildFormattedMessage();
    return `mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO_CONTACT.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(buildFormattedMessage());
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const directMailtoUrl = `mailto:${STUDIO_CONTACT.email}?subject=${encodeURIComponent(
    'New Project Enquiry — PIXELCRAFT STUDIO',
  )}`;

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#08090D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Enquiry Quick Options & Direct Channels */}
          <Reveal className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-medium tracking-[0.18em] text-[#8B7CFF]">
                CONTACT US
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white [text-wrap:balance]">
                Have a Business to Grow? Let&apos;s Talk.
              </h2>
              <p className="text-base text-[#A1A1AA] leading-relaxed">
                Whether you need a website, a promotional video, or both, let&apos;s
                create something that makes your business stand out.
              </p>
            </div>

            {/* Two Primary Enquiry Options */}
            <div className="space-y-2.5">
              <p className="text-xs font-medium tracking-[0.14em] text-white/75">
                CHOOSE YOUR ENQUIRY FOCUS
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => selectQuickOption('Website Development')}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    values.serviceType === 'Website Development'
                      ? 'bg-[#8B7CFF] border-[#8B7CFF] text-white shadow-[0_6px_24px_rgba(139,124,255,0.3)]'
                      : 'bg-[#11131A] border-white/[0.1] hover:border-[#8B7CFF]/50 text-white'
                  }`}
                >
                  <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>I Need a Website</span>
                </button>

                <button
                  type="button"
                  onClick={() => selectQuickOption('Promotional Video')}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    values.serviceType === 'Promotional Video'
                      ? 'bg-[#8B7CFF] border-[#8B7CFF] text-white shadow-[0_6px_24px_rgba(139,124,255,0.3)]'
                      : 'bg-[#11131A] border-white/[0.1] hover:border-[#8B7CFF]/50 text-white'
                  }`}
                >
                  <Film className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>I Need a Promotional Video</span>
                </button>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="space-y-3.5 pt-2 border-t border-white/[0.08]">
              {/* Email Contact Button */}
              <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[#11131A] border border-white/[0.08] hover:border-[#8B7CFF]/50 transition-colors duration-150">
                <a
                  href={directMailtoUrl}
                  className="flex items-center gap-3.5 min-w-0 flex-1 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#08090D] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#8B7CFF]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-[#8B7CFF] transition-colors">
                      Email Studio
                    </p>
                    <p className="text-xs text-[#A1A1AA] truncate">
                      {STUDIO_CONTACT.email}
                    </p>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy studio email address"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#08090D] hover:bg-[#171A24] border border-white/10 text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8B7CFF]" aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instagram Profile Card */}
              <a
                href={STUDIO_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#11131A] hover:bg-[#171A24] border border-white/[0.08] hover:border-[#8B7CFF]/50 transition-colors duration-150 group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#08090D] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Instagram
                      className="w-5 h-5 text-[#8B7CFF]"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white group-hover:text-[#8B7CFF] transition-colors">
                      Instagram
                    </p>
                    <p className="text-xs text-[#A1A1AA] truncate">
                      {STUDIO_CONTACT.instagramHandle}
                    </p>
                  </div>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-[#A1A1AA] group-hover:text-white shrink-0 transition-colors"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>

          {/* Right Column: Validated Project Enquiry Form */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-[#11131A] border border-white/[0.1] p-6 sm:p-8 space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-medium text-white/90"
                  >
                    Full Name <span className="text-[#8B7CFF]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={values.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors ${
                      errors.fullName
                        ? 'border-rose-400/80'
                        : 'border-white/[0.1] focus:border-[#8B7CFF]'
                    } focus:outline-none`}
                  />
                  {errors.fullName && (
                    <p
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Business Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="businessName"
                    className="block text-xs font-medium text-white/90"
                  >
                    Business Name <span className="text-[#8B7CFF]">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={values.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    aria-invalid={Boolean(errors.businessName)}
                    placeholder="Your Brand or Company"
                    className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors ${
                      errors.businessName
                        ? 'border-rose-400/80'
                        : 'border-white/[0.1] focus:border-[#8B7CFF]'
                    } focus:outline-none`}
                  />
                  {errors.businessName && (
                    <p
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.businessName}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-white/90"
                  >
                    Email Address <span className="text-[#8B7CFF]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors ${
                      errors.email
                        ? 'border-rose-400/80'
                        : 'border-white/[0.1] focus:border-[#8B7CFF]'
                    } focus:outline-none`}
                  />
                  {errors.email && (
                    <p
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="block text-xs font-medium text-white/90"
                  >
                    Phone Number <span className="text-[#8B7CFF]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={values.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    placeholder="+91 98000 00000"
                    className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors ${
                      errors.phone
                        ? 'border-rose-400/80'
                        : 'border-white/[0.1] focus:border-[#8B7CFF]'
                    } focus:outline-none`}
                  />
                  {errors.phone && (
                    <p
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-rose-400"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Service Needed: Website Development, Promotional Video, or Both */}
              <div className="space-y-1.5">
                <label
                  htmlFor="serviceType"
                  className="block text-xs font-medium text-white/90"
                >
                  What Do You Need? <span className="text-[#8B7CFF]">*</span>
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  value={values.serviceType}
                  onChange={(e) =>
                    handleChange('serviceType', e.target.value as EnquiryServiceType)
                  }
                  className="w-full px-4 py-3 rounded-lg bg-[#08090D] border border-white/[0.1] focus:border-[#8B7CFF] text-sm text-white focus:outline-none transition-colors"
                >
                  {ENQUIRY_SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option} className="bg-[#11131A] text-white">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Details */}
              <div className="space-y-1.5">
                <label
                  htmlFor="projectDetails"
                  className="block text-xs font-medium text-white/90"
                >
                  Project Details <span className="text-[#8B7CFF]">*</span>
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={4}
                  required
                  value={values.projectDetails}
                  onChange={(e) => handleChange('projectDetails', e.target.value)}
                  aria-invalid={Boolean(errors.projectDetails)}
                  placeholder="Tell us about your business, whether you need a website, a promotional video, or both, and what you want to showcase..."
                  className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors resize-y ${
                    errors.projectDetails
                      ? 'border-rose-400/80'
                      : 'border-white/[0.1] focus:border-[#8B7CFF]'
                  } focus:outline-none`}
                />
                {errors.projectDetails && (
                  <p
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-rose-400"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.projectDetails}</span>
                  </p>
                )}
              </div>

              {/* Honest Working Submission Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] text-white text-sm font-semibold transition-colors duration-150 cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Prepare Email Enquiry</span>
                </button>
              </div>

              {/* Honest Ready-to-Send Confirmation Panel */}
              {submitted && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-4 rounded-xl bg-[#08090D] border border-[#8B7CFF]/45 p-5 space-y-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white">
                      Your project brief is validated and ready to send
                    </p>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
                      This site operates without a server-side mail backend, so click below
                      to send your pre-filled enquiry directly to{' '}
                      <span className="text-white">{STUDIO_CONTACT.email}</span> or copy
                      the formatted text.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildMailtoUrl()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] text-white text-xs font-semibold transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open Email App</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#11131A] hover:bg-[#171A24] border border-white/15 text-xs font-medium text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedBrief ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#8B7CFF]" aria-hidden="true" />
                          <span>Brief Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Copy Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
