// RegisterPage — student self-registration.
// New accounts are ALWAYS students. There is no role selector and no way to
// self-assign teacher or admin. Teacher/admin accounts are created by the
// system (demo seed / future backend).
//
import { useState } from 'react'
import type { FormEvent } from 'react'
import AuthLayout from '../components/AuthLayout'
import AuthInput from '../components/AuthInput'
import PasswordInput from '../components/PasswordInput'
import PasswordStrength from '../components/PasswordStrength'
import { useAuth } from '../useAuth'
import type { StudentRegistrationInput } from '../types'

type NavTarget = 'login' | 'register' | 'admin'

interface RegisterPageProps {
  onNavigate: (screen: NavTarget) => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormKey = keyof StudentRegistrationInput

export default function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { registerStudent } = useAuth()
  const [form, setForm] = useState<StudentRegistrationInput>({
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    grade: '',
    section: '',
  })
  const [errors, setErrors] = useState<Partial<Record<FormKey, string>>>({})

  const update =
    (key: FormKey) =>
    (value: string): void => {
      setForm((prev) => ({ ...prev, [key]: value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  const validate = (): Partial<Record<FormKey, string>> => {
    const next: Partial<Record<FormKey, string>> = {}
    if (!form.firstName.trim()) next.firstName = 'First name is required.'
    if (!form.lastName.trim()) next.lastName = 'Last name is required.'
    if (!form.username.trim()) next.username = 'Username is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'Enter a valid email address.'
    if (!form.password) next.password = 'Password is required.'
    else if (form.password.length < 8) next.password = 'Use at least 8 characters.'
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.'
    return next
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    const result = registerStudent(form)
    if (!result.ok) setErrors({ email: result.error ?? 'Registration failed.' })
  }

  return (
    <AuthLayout>
      <div className="mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
          Create a student account
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Register to join classrooms and track your learning.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AuthInput
            label="First name"
            name="firstName"
            value={form.firstName}
            onChange={update('firstName')}
            autoComplete="given-name"
            required
            error={errors.firstName}
          />
          <AuthInput
            label="Middle name"
            name="middleName"
            value={form.middleName}
            onChange={update('middleName')}
            autoComplete="additional-name"
            helperText="Optional"
          />
          <AuthInput
            label="Last name"
            name="lastName"
            value={form.lastName}
            onChange={update('lastName')}
            autoComplete="family-name"
            required
            error={errors.lastName}
          />
          <AuthInput
            label="Username"
            name="username"
            value={form.username}
            onChange={update('username')}
            autoComplete="username"
            required
            error={errors.username}
          />
          <AuthInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={update('email')}
            autoComplete="email"
            required
            error={errors.email}
          />
          <div className="grid grid-cols-2 gap-4">
            <AuthInput
              label="Grade"
              name="grade"
              value={form.grade}
              onChange={update('grade')}
              placeholder="e.g. 11"
            />
            <AuthInput
              label="Section"
              name="section"
              value={form.section}
              onChange={update('section')}
              placeholder="e.g. A"
            />
          </div>
        </div>
        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={update('password')}
          autoComplete="new-password"
          required
          error={errors.password}
        />
        <PasswordStrength password={form.password} />
        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={update('confirmPassword')}
          autoComplete="new-password"
          required
          error={errors.confirmPassword}
        />

        <p className="rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-xs leading-relaxed text-neutral-600">
          New accounts are always created as{' '}
          <span className="font-semibold text-neutral-800">students</span>. Teacher and
          administrator roles cannot be self-selected.
        </p>

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Create student account (demo)
        </button>
      </form>

      <p className="mt-5 text-sm text-neutral-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="font-medium text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:underline"
        >
          Sign in
        </button>
      </p>
    </AuthLayout>
  )
}
