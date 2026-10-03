import { useState } from 'react'
import { AlertCircle, CheckCircle2, Send } from 'lucide-react'
import Button from '../ui/Button'
import { site } from '../../config/site'
import { isConfigured } from '../../utils/config'

export const PROJECT_TYPES = [
  'AI Automation',
  'Data Analytics',
  'Excel Automation',
  'Python Automation',
  'IoT',
  'Dashboard',
  'Manufacturing Quality Analytics',
  'Technical Consulting',
  'Other',
]

export const ENGAGEMENTS = ['Part-time', 'Full-time', 'One-off project', 'Not sure yet']

export const BUDGETS = ['Under ₹5,000', '₹5,000–₹10,000', '₹10,000–₹25,000', '₹25,000+']

const EMPTY = { name: '', email: '', phone: '', projectType: '', engagement: '', budget: '', message: '', company_website: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.phone.trim() && !/^[+()\-\s\d]{7,20}$/.test(values.phone.trim())) errors.phone = 'Please enter a valid phone number, or leave it empty.'
  if (!values.projectType) errors.projectType = 'Please choose a project type.'
  if (values.message.trim().length < 10) errors.message = 'Please describe your project in a few words (10+ characters).'
  return errors
}

function buildBody(v) {
  return `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || 'Not provided'}\nProject type: ${v.projectType}\nEngagement: ${v.engagement || 'Not specified'}\nBudget: ${v.budget || 'Not specified'}\n\n${v.message}`
}

const inputClass =
  'mt-1.5 w-full rounded-lg border bg-surface px-3.5 py-2.5 text-[0.98rem] text-fg placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

/**
 * Delivery (honest about what actually happens):
 *  1. Endpoint configured → POST JSON. "Sent" is shown only on a 2xx response.
 *  2. No endpoint         → open the visitor's email app with a pre-filled message.
 *
 * `onSubmitted` runs once the visitor has submitted their details, which is when
 * the parent reveals the contact information. If delivery fails the visitor is
 * told so, and still gets the contact details so they can reach out directly.
 */
export default function ContactForm({ onSubmitted }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const endpoint = site.contact.formEndpoint
  const hasEmail = isConfigured(site.email)
  const mode = endpoint ? 'endpoint' : hasEmail ? 'mailto' : 'none'

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((err) => ({ ...err, [field]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`cf-${first}`)?.focus()
      return
    }

    // Honeypot: real visitors never see or fill this field.
    if (values.company_website) {
      setStatus({ type: 'success', message: 'Thank you.' })
      return
    }

    const subject = `${site.contact.subjectPrefix}: ${values.projectType} (${values.name})`

    if (mode === 'endpoint') {
      setStatus({ type: 'sending', message: 'Sending…' })
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            phone: values.phone || 'Not provided',
            project_type: values.projectType,
            engagement: values.engagement || 'Not specified',
            budget: values.budget || 'Not specified',
            message: values.message,
            _subject: subject,
            _template: 'table',
            _captcha: 'false',
          }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setValues(EMPTY)
        setStatus({ type: 'success', message: 'Thank you. Your details have been sent to me and I will get back to you soon. My contact information is now shown beside this form.' })
        onSubmitted?.('sent')
      } catch {
        setStatus({
          type: 'error',
          message: 'Your details could not be sent right now. My contact information is shown beside this form, so please reach out to me directly.',
        })
        onSubmitted?.('failed')
      }
      return
    }

    if (mode === 'mailto') {
      const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody(values))}`
      window.location.href = href
      setStatus({
        type: 'info',
        message: `Your email app should open with this message pre-filled. Press send there to deliver it. My contact information is also shown beside this form.`,
      })
      onSubmitted?.('mailto')
      return
    }

    setStatus({
      type: 'info',
      message: 'Online messages are not enabled yet. Please contact me on LinkedIn, and include the details above.',
    })
  }

  const fieldError = (field) =>
    errors[field] ? (
      <p id={`cf-${field}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
        {errors[field]}
      </p>
    ) : null

  const a11y = (field) => ({
    id: `cf-${field}`,
    name: field,
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `cf-${field}-error` : undefined,
    className: `${inputClass} ${errors[field] ? 'border-red-500' : 'border-line'}`,
  })

  const statusStyles = {
    success: 'border-success/40 bg-success-soft text-success',
    error: 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400',
    info: 'border-primary/40 bg-primary-soft text-fg',
    sending: 'border-line bg-surface-2 text-muted',
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form" className="relative rounded-2xl border border-line bg-surface p-5 shadow-card md:p-8">
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-company_website">Leave this field empty</label>
        <input type="text" id="cf-company_website" name="company_website" tabIndex={-1} autoComplete="off" value={values.company_website} onChange={update('company_website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="text-sm font-medium text-fg">
            Name <span className="text-subtle">(required)</span>
          </label>
          <input type="text" autoComplete="name" value={values.name} onChange={update('name')} {...a11y('name')} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="cf-email" className="text-sm font-medium text-fg">
            Email <span className="text-subtle">(required)</span>
          </label>
          <input type="email" autoComplete="email" value={values.email} onChange={update('email')} {...a11y('email')} />
          {fieldError('email')}
        </div>
        <div>
          <label htmlFor="cf-phone" className="text-sm font-medium text-fg">
            Phone <span className="text-subtle">(optional)</span>
          </label>
          <input type="tel" autoComplete="tel" inputMode="tel" value={values.phone} onChange={update('phone')} {...a11y('phone')} />
          {fieldError('phone')}
        </div>
        <div>
          <label htmlFor="cf-projectType" className="text-sm font-medium text-fg">
            Project type <span className="text-subtle">(required)</span>
          </label>
          <select value={values.projectType} onChange={update('projectType')} {...a11y('projectType')}>
            <option value="">Select a project type</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {fieldError('projectType')}
        </div>
        <div>
          <label htmlFor="cf-engagement" className="text-sm font-medium text-fg">
            Engagement <span className="text-subtle">(optional)</span>
          </label>
          <select value={values.engagement} onChange={update('engagement')} {...a11y('engagement')}>
            <option value="">Part-time, full-time or one-off?</option>
            {ENGAGEMENTS.map((e) => (
              <option key={e}>{e}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-budget" className="text-sm font-medium text-fg">
            Budget <span className="text-subtle">(optional)</span>
          </label>
          <select value={values.budget} onChange={update('budget')} {...a11y('budget')}>
            <option value="">Select a budget range</option>
            {BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="text-sm font-medium text-fg">
            Message <span className="text-subtle">(required)</span>
          </label>
          <textarea
            rows={5}
            value={values.message}
            onChange={update('message')}
            placeholder="What is the task, what data or hardware is involved, and when do you need it?"
            {...a11y('message')}
          />
          {fieldError('message')}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-subtle">
          {mode === 'endpoint' && 'Your details go to my inbox through a third-party form service (FormSubmit) and are used only to reply to you.'}
          {mode === 'mailto' && 'Submitting opens your email app with the message ready to send.'}
          {mode === 'none' && 'Prefer LinkedIn? Use the link alongside this form.'}
        </p>
        <Button type="submit" size="lg" disabled={status.type === 'sending'}>
          <Send size={17} aria-hidden="true" /> {status.type === 'sending' ? 'Sending…' : 'Send & show contact details'}
        </Button>
      </div>

      <div aria-live="polite" role="status">
        {status.type !== 'idle' && (
          <p className={`mt-5 flex gap-2 rounded-lg border p-3 text-sm ${statusStyles[status.type]}`}>
            {status.type === 'success' ? (
              <CheckCircle2 size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
            )}
            {status.message}
          </p>
        )}
      </div>
    </form>
  )
}
