export type EnquiryServiceOption = 'Website Design' | 'Promotional Videos' | 'Both';

export interface EnquiryPayload {
  fullName: string;
  businessName?: string;
  email: string;
  phone: string;
  service: EnquiryServiceOption;
  budget?: string;
  message: string;
  websiteUrl?: string; // honeypot
  formStartedAt?: number;
}

export interface EnquiryHandlerResult {
  status: number;
  body: {
    ok: boolean;
    message?: string;
    error?: string;
    fieldErrors?: Record<string, string>;
  };
}

const VALID_SERVICES: ReadonlySet<string> = new Set([
  'Website Design',
  'Promotional Videos',
  'Both',
]);

// Sliding-window rate limiter: max 5 requests per 15 minutes per IP
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitStore.get(clientIp) ?? []).filter(
    (ts) => ts > windowStart,
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(clientIp, timestamps);
    return true;
  }

  timestamps.push(now);
  rateLimitStore.set(clientIp, timestamps);

  // Prevent unbounded memory growth in long-running server instances
  if (rateLimitStore.size > 2000) {
    for (const [ip, list] of rateLimitStore.entries()) {
      const fresh = list.filter((ts) => ts > windowStart);
      if (fresh.length === 0) {
        rateLimitStore.delete(ip);
      } else {
        rateLimitStore.set(ip, fresh);
      }
    }
  }

  return false;
}

function sanitizeSingleLine(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function sanitizeMultiLine(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function extractClientIp(
  headers: Record<string, string | string[] | undefined>,
  fallbackIp?: string,
): string {
  const forwarded = headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].split(',')[0].trim();
  }
  const realIp = headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim();
  }
  return fallbackIp || 'unknown';
}

export async function processEnquirySubmission(
  rawBody: unknown,
  clientIp: string,
): Promise<EnquiryHandlerResult> {
  if (!rawBody || typeof rawBody !== 'object') {
    return {
      status: 400,
      body: {
        ok: false,
        error: 'Invalid request payload.',
      },
    };
  }

  const input = rawBody as Record<string, unknown>;

  // Honeypot check
  const honeypot = sanitizeSingleLine(input.websiteUrl, 200);
  if (honeypot.length > 0) {
    return {
      status: 400,
      body: {
        ok: false,
        error: 'Unable to process this submission.',
      },
    };
  }

  // Minimum human interaction time check (1.2 seconds)
  if (typeof input.formStartedAt === 'number' && Number.isFinite(input.formStartedAt)) {
    const elapsed = Date.now() - input.formStartedAt;
    if (elapsed >= 0 && elapsed < 1200) {
      return {
        status: 400,
        body: {
          ok: false,
          error: 'Please take a moment to review your enquiry before submitting.',
        },
      };
    }
  }

  // IP Rate limiting
  if (isRateLimited(clientIp)) {
    return {
      status: 429,
      body: {
        ok: false,
        error:
          'Too many enquiry attempts from your connection. Please wait a few minutes before trying again.',
      },
    };
  }

  const fullName = sanitizeSingleLine(input.fullName, 120);
  const businessName = sanitizeSingleLine(input.businessName, 150);
  const email = sanitizeSingleLine(input.email, 254);
  const phone = sanitizeSingleLine(input.phone, 40);
  const service = sanitizeSingleLine(input.service, 60);
  const budget = sanitizeSingleLine(input.budget, 100);
  const message = sanitizeMultiLine(input.message, 4000);

  const fieldErrors: Record<string, string> = {};

  if (!fullName || fullName.length < 2) {
    fieldErrors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.';
  }

  const phoneDigits = phone.replace(/[^\d]/g, '');
  if (!phone || phoneDigits.length < 7 || phoneDigits.length > 15) {
    fieldErrors.phone = 'Please enter a valid phone number.';
  }

  if (!VALID_SERVICES.has(service)) {
    fieldErrors.service = 'Please select a valid service option.';
  }

  if (!message || message.length < 15) {
    fieldErrors.message =
      'Please share your project requirements (at least 15 characters).';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 400,
      body: {
        ok: false,
        error: 'Please check the highlighted fields and try again.',
        fieldErrors,
      },
    };
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail =
    process.env.ENQUIRY_TO_EMAIL?.trim() || 'hello.pixelcraft.webstudio@gmail.com';
  const fromEmail =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'PixelCraft Studio <onboarding@resend.dev>';

  if (!resendApiKey) {
    console.error('[enquiry] Missing RESEND_API_KEY environment variable.');
    return {
      status: 503,
      body: {
        ok: false,
        error:
          'Email delivery is not configured on the server yet. Please configure RESEND_API_KEY or contact hello.pixelcraft.webstudio@gmail.com directly.',
      },
    };
  }

  const safeBusiness = businessName || 'Not provided';
  const safeBudget = budget || 'Not specified';

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #08090D; color: #FFFFFF; padding: 32px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #11131A; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden;">
        <div style="padding: 24px 28px; border-bottom: 1px solid rgba(255,255,255,0.08); background-color: #0C0E14;">
          <p style="margin: 0 0 6px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #8B7CFF; font-weight: 600;">PIXELCRAFT STUDIO</p>
          <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #FFFFFF;">New Website Enquiry</h1>
        </div>
        <div style="padding: 24px 28px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #A1A1AA; width: 165px; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">Full Name</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">${escapeHtml(fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A1A1AA; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">Business Name</td>
              <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.06);">${escapeHtml(safeBusiness)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A1A1AA; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">Email Address</td>
              <td style="padding: 10px 0; color: #8B7CFF; border-bottom: 1px solid rgba(255,255,255,0.06);">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A1A1AA; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">Phone Number</td>
              <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.06);">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A1A1AA; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">Service Interested In</td>
              <td style="padding: 10px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.06);">${escapeHtml(service)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A1A1AA; vertical-align: top; border-bottom: 1px solid rgba(255,255,255,0.06);">Project Budget</td>
              <td style="padding: 10px 0; color: #FFFFFF; border-bottom: 1px solid rgba(255,255,255,0.06);">${escapeHtml(safeBudget)}</td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="margin: 0 0 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #A1A1AA;">Message / Project Requirements</p>
            <div style="padding: 16px; border-radius: 8px; background-color: #08090D; border: 1px solid rgba(255,255,255,0.08); color: #FFFFFF; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</div>
          </div>
        </div>
      </div>
    </div>
  `.trim();

  const textContent = [
    'New Website Enquiry – PixelCraft Studio',
    '---------------------------------------',
    `Full Name: ${fullName}`,
    `Business Name: ${safeBusiness}`,
    `Email Address: ${email}`,
    `Phone Number: ${phone}`,
    `Service Interested In: ${service}`,
    `Project Budget: ${safeBudget}`,
    '',
    'Message / Project Requirements:',
    message,
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: 'New Website Enquiry – PixelCraft Studio',
        html: htmlContent,
        text: textContent,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error(
        `[enquiry] Resend API error (${resendResponse.status}): ${errorText.slice(0, 300)}`,
      );
      return {
        status: 502,
        body: {
          ok: false,
          error:
            'We could not deliver your enquiry right now. Please try again in a moment.',
        },
      };
    }

    return {
      status: 200,
      body: {
        ok: true,
        message:
          "Thank you for contacting PixelCraft Studio! Your enquiry has been submitted successfully. We'll get back to you soon.",
      },
    };
  } catch (error) {
    console.error('[enquiry] Failed to connect to Resend API:', error);
    return {
      status: 502,
      body: {
        ok: false,
        error:
          'A network error occurred while sending your enquiry. Please try again shortly.',
      },
    };
  }
}
