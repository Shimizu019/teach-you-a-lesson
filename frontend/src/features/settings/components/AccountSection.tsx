// AccountSection — account profile form with draft/save behavior.
// Typing only updates temporary form state; the saved values change
// solely after "Update Profile" is pressed (frontend-only, no backend).
import { useEffect, useState, type FormEvent } from 'react'
import SettingsCard from './SettingsCard'
import { UserIcon } from '../../../components/common/Icons'
import type { AccountValues, SettingsRole } from '../types'

interface AccountSectionProps {
  account: AccountValues
  role: SettingsRole
  onSave: (values: AccountValues) => void
}

type FieldErrors = Partial<Record<keyof AccountValues, string>>

const inputClass =
  'block w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30'
const labelClass = 'mb-1 block text-sm font-medium text-neutral-700'
const secondaryBtnClass =
  'rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50'
const primaryBtnClass =
  'rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const FIELDS: {
  key: keyof AccountValues
  label: string
  type: string
  placeholder: string
  full: boolean
}[] = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'e.g., Alex Rivera', full: false },
  { key: 'displayName', label: 'Display Name', type: 'text', placeholder: 'e.g., Alex', full: false },
  {
    key: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'e.g., alex.rivera@teachyoualesson.edu',
    full: true,
  },
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return 'U'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export default function AccountSection({ account, role, onSave }: AccountSectionProps) {
  const [form, setForm] = useState<AccountValues>(account)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [justSaved, setJustSaved] = useState(false)

  // Saved-account changes arrive through the submit handler; the component
  // remounts with fresh props whenever the role or account source changes.

  useEffect(() => {
    if (!justSaved) return undefined
    const timer = window.setTimeout(() => setJustSaved(false), 4000)
    return () => window.clearTimeout(timer)
  }, [justSaved])

  const dirty =
    form.name !== account.name ||
    form.displayName !== account.displayName ||
    form.email !== account.email

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.displayName.trim()) next.displayName = 'Display name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Enter a valid email address.'
    return next
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    const values: AccountValues = {
      name: form.name.trim(),
      displayName: form.displayName.trim(),
      email: form.email.trim(),
    }
    onSave(values)
    setForm(values)
    setJustSaved(true)
  }

  const handleCancel = () => {
    setForm(account)
    setErrors({})
  }

  const setField = (field: keyof AccountValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  return (
    <SettingsCard
      icon={UserIcon}
      title="Account"
      description="Your saved profile details. Edits stay in this form until you press Update Profile."
    >
      {/* Saved profile summary — reflects committed values only */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
          {getInitials(account.name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-neutral-900">{account.displayName}</p>
          <p className="truncate text-xs text-neutral-500">{account.email}</p>
        </div>
        <span className="flex-none rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
          Role: {role}
        </span>
      </div>

      {justSaved && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
        >
          Profile updated. Your changes are saved for this session.
        </p>
      )}
      {dirty && !justSaved && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
          You have unsaved changes.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FIELDS.map((field) => (
            <div key={field.key} className={field.full ? 'sm:col-span-2' : undefined}>
              <label htmlFor={`settings-account-${field.key}`} className={labelClass}>
                {field.label}
              </label>
              <input
                id={`settings-account-${field.key}`}
                type={field.type}
                value={form[field.key]}
                placeholder={field.placeholder}
                onChange={(event) => setField(field.key, event.target.value)}
                aria-invalid={errors[field.key] ? true : undefined}
                aria-describedby={
                  errors[field.key] ? `settings-account-${field.key}-error` : undefined
                }
                className={inputClass}
              />
              {errors[field.key] && (
                <p
                  id={`settings-account-${field.key}-error`}
                  className="mt-1 text-xs font-medium text-red-700"
                >
                  {errors[field.key]}
                </p>
              )}
            </div>
          ))}
        </div>
        <div>
          <p className={labelClass}>Role</p>
          <p className="inline-flex rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-700">
            {role === 'teacher' ? 'Teacher' : 'Student'}
          </p>
          <p className="mt-1.5 text-xs text-neutral-500">
            Your role is set by the header role switcher. Classroom management settings stay inside
            teacher classrooms and are never exposed here.
          </p>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={!dirty}
            className={secondaryBtnClass}
          >
            Cancel
          </button>
          <button type="submit" disabled={!dirty} className={primaryBtnClass}>
            Update Profile
          </button>
        </div>
      </form>
    </SettingsCard>
  )
}