import { useState } from 'react'
import { LockKeyhole, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import Section from '../ui/Section'
import Reveal from '../ui/Reveal'
import CopyButton from '../ui/CopyButton'
import { WhatsappIcon } from '../ui/icons'
import ContactForm from './ContactForm'
import { site } from '../../config/site'
import { isConfigured } from '../../utils/config'

const rowClass = 'flex items-center gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-primary/50'
const UNLOCK_KEY = 'contact-unlocked'

function readUnlocked() {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === '1'
  } catch {
    return false
  }
}

/** Contact details are shown only after the visitor has shared their own details through the form. */
function ContactDetails() {
  const hasEmail = isConfigured(site.email)
  const hasPhone = isConfigured(site.phone)
  const hasWhatsapp = isConfigured(site.whatsapp)
  const whatsappDigits = hasWhatsapp ? site.whatsapp.replace(/\D/g, '') : ''

  return (
    <div className="space-y-3" aria-label="Contact details">
      <p className="flex items-center gap-2 text-sm font-semibold text-success">
        <ShieldCheck size={16} aria-hidden="true" /> Thank you. Here is how to reach me directly.
      </p>
      {hasEmail && (
        <div className={rowClass}>
          <Mail size={20} className="shrink-0 text-primary" aria-hidden="true" />
          <a href={`mailto:${site.email}`} className="min-w-0 flex-1 truncate font-medium text-fg hover:text-primary">
            {site.email}
          </a>
          <CopyButton value={site.email} />
        </div>
      )}
      {hasPhone && (
        <div className={rowClass}>
          <Phone size={20} className="shrink-0 text-primary" aria-hidden="true" />
          <a href={`tel:${site.phone}`} className="min-w-0 flex-1 truncate font-medium text-fg hover:text-primary">
            {site.phoneDisplay || site.phone}
          </a>
          <CopyButton value={site.phoneDisplay || site.phone} />
        </div>
      )}
      {hasWhatsapp && (
        <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className={rowClass}>
          <WhatsappIcon size={20} className="shrink-0 text-success" />
          <span className="flex-1">
            <span className="block font-medium text-fg">WhatsApp</span>
            <span className="block text-sm text-muted">Quick questions about a project</span>
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function LockedCard() {
  return (
    <div className="rounded-xl border border-dashed border-line-strong bg-surface p-5" aria-label="Contact details locked">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
          <LockKeyhole size={19} aria-hidden="true" />
        </span>
        <div>
          <p className="font-semibold text-fg">My email and phone number</p>
          <p className="mt-1 text-sm text-muted">Share your details in the form and my contact information appears here straight away.</p>
        </div>
      </div>
      <div className="mt-4 space-y-2" aria-hidden="true">
        <div className="h-10 rounded-lg bg-surface-2 blur-[3px]" />
        <div className="h-10 rounded-lg bg-surface-2 blur-[3px]" />
      </div>
    </div>
  )
}

export default function Contact() {
  const [unlocked, setUnlocked] = useState(readUnlocked)

  function handleSubmitted() {
    setUnlocked(true)
    try {
      sessionStorage.setItem(UNLOCK_KEY, '1')
    } catch {
      /* storage blocked: details still show for this visit */
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      description="Share your details and what you need. My direct contact information is shown as soon as you submit, and your message reaches my inbox."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
        <Reveal className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted">
            <span className="pulse-dot h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            {site.availability}
          </p>

          <div aria-live="polite">{unlocked ? <ContactDetails /> : <LockedCard />}</div>

          <div className="flex items-center gap-3 p-4 text-muted">
            <MapPin size={20} className="shrink-0 text-subtle" aria-hidden="true" />
            <span>{site.location}. Remote projects welcome.</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm onSubmitted={handleSubmitted} />
        </Reveal>
      </div>
    </Section>
  )
}
