/**
 * SITE CONFIGURATION — your contact details and links live here.
 *
 * Anything still set to a placeholder (values starting with "YOUR_",
 * "GITHUB_URL", "WHATSAPP_NUMBER", or containing "example.com") is treated
 * as "not configured": the related button is hidden for visitors and a
 * warning is shown only while running `npm run dev`.
 */
// Single source of truth for the contact email (also used by the form endpoint below).
const EMAIL = 'ernitinkumar14@gmail.com'

export const site = {
  name: 'Nitin Kumar',
  role: 'QA & Manufacturing Engineer',
  tagline: 'AI Automation | Data | IoT | Robotics',

  // Contact
  email: EMAIL,
  phone: '+917536855614', // used for the call link
  phoneDisplay: '+91 75368 55614', // shown to visitors
  // WhatsApp: digits only, with country code, no "+" or spaces, e.g. "9198XXXXXXXX"
  whatsapp: 'WHATSAPP_NUMBER',
  location: 'Gurugram, Haryana, India',

  // Profiles
  linkedin: 'https://www.linkedin.com/in/nitin-kumar-iitbhilai/',
  github: 'GITHUB_URL', // e.g. "https://github.com/your-username"

  // Files (placed in /public)
  resume: '/resume.pdf',
  profilePhoto: '/images/profile/nitin-kumar.jpg',

  // Live domain, used for canonical/SEO references
  url: 'YOUR_WEBSITE_URL',

  availability: 'Open to part-time and full-time freelance projects.',

  /**
   * Contact form delivery.
   *  - The form POSTs JSON to `formEndpoint`. Contact details are revealed to the
   *    visitor after they submit their own details.
   *  - With no endpoint it falls back to opening the visitor's email app (mailto:).
   */
  contact: {
    // Default: FormSubmit (free, no account). It emails visitor details to `email`.
    // IMPORTANT: the first submission sends YOU an "Activate form" email. Click it once.
    // Prefer Formspree or your own API? Set VITE_FORM_ENDPOINT (see .env.example).
    formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || `https://formsubmit.co/ajax/${EMAIL}`,
    subjectPrefix: 'Portfolio enquiry',
  },
}
