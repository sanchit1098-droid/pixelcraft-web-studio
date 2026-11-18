import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Mail,
  Instagram,
  Check,
  Copy,
  Send,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Loader2,
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
  service: EnquiryServiceType;
  budget: string;
  message: string;
  websiteUrl: string; // honeypot
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const ENQUIRY_SERVICE_OPTIONS: EnquiryServiceType[] = [
  'Website Design',
  'Promotional Videos',
  'Both',
];

export function Contact({ preselectedService }: ContactProps) {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: 'Website Design',
    budget: '',
    message: '',
    websiteUrl: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formStartedAtRef = useRef<number>(Date.now());

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      service: preselectedService,
    }));
  }, [preselectedService]);

  const selectQuickOption = (option: EnquiryServiceType) => {
    setValues((prev) => ({ ...prev, service: option }));
    if (submitStatus?.type === 'success') {
      setSubmitStatus(null);
    }
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const phoneDigits = values.phone.replace(/[^\d]/g, '');
    if (!values.phone.trim() || phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }
    if (!ENQUIRY_SERVICE_OPTIONS.includes(values.service)) {
      nextErrors.service = 'Please select a service option.';
    }
    if (!values.message.trim() || values.message.trim().length < 15) {
      nextErrors.message =
        'Please share your project requirements (at least 15 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitStatus(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          businessName: values.businessName.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          service: values.service,
          budget: values.budget.trim(),
          message: values.message.trim(),
          websiteUrl: values.websiteUrl,
          formStartedAt: formStartedAtRef.current,
        }),
      });

      let data: {
        ok?: boolean;
        message?: string;
        error?: string;
        fieldErrors?: Record<string, string>;
      } = {};

      try {
        data = (await response.json()) as typeof data;
      } catch {
        data = {};
      }

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setErrors(data.fieldErrors as FormErrors);
        }
        setSubmitStatus({
          type: 'error',
          text:
            data.error ||
            'Something went wrong while submitting your enquiry. Please try again.',
        });
        return;
      }

      setValues({
        fullName: '',
        businessName: '',
        email: '',
        phone: '',
        service: preselectedService,
        budget: '',
        message: '',
        websiteUrl: '',
      });
      setErrors({});
      formStartedAtRef.current = Date.now();
      setSubmitStatus({
        type: 'success',
        text:
          data.message ||
          "Thank you for contacting PixelCraft Studio! Your enquiry has been submitted successfully. We'll get back to you soon.",
      });
    } catch {
      setSubmitStatus({
        type: 'error',
        text: 'Network error while sending your enquiry. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitStatus) {
      setSubmitStatus(null);
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

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-b border-white/[0.06] bg-[#08090D]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Enquiry Quick Options & Direct Contact Info */}
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
                  onClick={() => selectQuickOption('Website Design')}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    values.service === 'Website Design'
                      ? 'bg-[#8B7CFF] border-[#8B7CFF] text-white shadow-[0_6px_24px_rgba(139,124,255,0.3)]'
                      : 'bg-[#11131A] border-white/[0.1] hover:border-[#8B7CFF]/50 text-white'
                  }`}
                >
                  <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>I Need a Website</span>
                </button>

                <button
                  type="button"
                  onClick={() => selectQuickOption('Promotional Videos')}
                  className={`flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap ${
                    values.service === 'Promotional Videos'
                      ? 'bg-[#8B7CFF] border-[#8B7CFF] text-white shadow-[0_6px_24px_rgba(139,124,255,0.3)]'
                      : 'bg-[#11131A] border-white/[0.1] hover:border-[#8B7CFF]/50 text-white'
                  }`}
                >
                  <Film className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>I Need a Promotional Video</span>
                </button>
              </div>
            </div>

            {/* Studio Email Display Card (No mailto link) & Instagram Profile */}
            <div className="space-y-3.5 pt-2 border-t border-white/[0.08]">
              <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-[#11131A] border border-white/[0.08]">
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-[#08090D] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#8B7CFF]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">Studio Email</p>
                    <p className="text-xs text-[#A1A1AA] truncate">
                      {STUDIO_CONTACT.email}
                    </p>
                  </div>
                </div>
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

          {/* Right Column: Server-Backed Enquiry Form */}
          <Reveal delay={0.08} className="lg:col-span-7">
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl bg-[#11131A] border border-white/[0.1] p-6 sm:p-8 space-y-5"
            >
              {/* Hidden Honeypot Field for Automated Spam Protection */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="websiteUrl">Leave this field empty</label>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.websiteUrl}
                  onChange={(e) => handleChange('websiteUrl', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name (Required) */}
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
                    disabled={isSubmitting}
                    value={values.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    aria-invalid={Boolean(errors.fullName)}
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors disabled:opacity-60 ${
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

                {/* Business Name (Optional) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="businessName"
                    className="block text-xs font-medium text-white/90"
                  >
                    Business Name{' '}
                    <span className="text-[#A1A1AA] font-normal">(Optional)</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    disabled={isSubmitting}
                    value={values.businessName}
                    onChange={(e) => handleChange('businessName', e.target.value)}
                    placeholder="Your Brand or Company"
                    className="w-full px-4 py-3 rounded-lg bg-[#08090D] border border-white/[0.1] focus:border-[#8B7CFF] text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors disabled:opacity-60 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Address (Required) */}
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
                    disabled={isSubmitting}
                    value={values.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    placeholder="you@company.com"
                    className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors disabled:opacity-60 ${
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

                {/* Phone Number (Required) */}
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
                    disabled={isSubmitting}
                    value={values.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    placeholder="+91 98000 00000"
                    className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors disabled:opacity-60 ${
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service Interested In */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="service"
                    className="block text-xs font-medium text-white/90"
                  >
                    Service Interested In <span className="text-[#8B7CFF]">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    disabled={isSubmitting}
                    value={values.service}
                    onChange={(e) =>
                      handleChange('service', e.target.value as EnquiryServiceType)
                    }
                    className="w-full px-4 py-3 rounded-lg bg-[#08090D] border border-white/[0.1] focus:border-[#8B7CFF] text-sm text-white focus:outline-none transition-colors disabled:opacity-60"
                  >
                    {ENQUIRY_SERVICE_OPTIONS.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-[#11131A] text-white"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Project Budget (Optional) */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="budget"
                    className="block text-xs font-medium text-white/90"
                  >
                    Project Budget{' '}
                    <span className="text-[#A1A1AA] font-normal">(Optional)</span>
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    disabled={isSubmitting}
                    value={values.budget}
                    onChange={(e) => handleChange('budget', e.target.value)}
                    placeholder="e.g. Flexible, ₹25,000, or $500 – $1,500"
                    className="w-full px-4 py-3 rounded-lg bg-[#08090D] border border-white/[0.1] focus:border-[#8B7CFF] text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors disabled:opacity-60 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message / Project Requirements (Required) */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-white/90"
                >
                  Message / Project Requirements <span className="text-[#8B7CFF]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  disabled={isSubmitting}
                  value={values.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  placeholder="Tell us about your business, goals, timeline, or what you would like to build..."
                  className={`w-full px-4 py-3 rounded-lg bg-[#08090D] border text-sm text-white placeholder:text-[#A1A1AA]/50 transition-colors resize-y disabled:opacity-60 ${
                    errors.message
                      ? 'border-rose-400/80'
                      : 'border-white/[0.1] focus:border-[#8B7CFF]'
                  } focus:outline-none`}
                />
                {errors.message && (
                  <p
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-rose-400"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Enquiry Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#8B7CFF] hover:bg-[#7A69FF] disabled:bg-[#8B7CFF]/60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors duration-150 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>
              </div>

              {/* Server Response Feedback Banner */}
              {submitStatus && (
                <div
                  role={submitStatus.type === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                  className={`rounded-xl p-4 border flex items-start gap-3 ${
                    submitStatus.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-400/35 text-emerald-200'
                      : 'bg-rose-500/10 border-rose-400/35 text-rose-200'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2
                      className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <AlertCircle
                      className="w-5 h-5 text-rose-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                  <p className="text-sm leading-relaxed">{submitStatus.text}</p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
