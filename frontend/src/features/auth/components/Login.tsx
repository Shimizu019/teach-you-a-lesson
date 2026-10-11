// Login — controlled sign-in form using shared auth components.
// Frontend-only prototype: value/onChange everywhere, no backend, no auth library.
// Submitting performs local validation only, then hands control back to App —
// no credentials are checked, stored, or transmitted.
import { useState, type FormEvent } from 'react'
import AuthLayout from './AuthLayout'
import AuthInput from './AuthInput'
import PasswordInput from './PasswordInput'
import RoleSelector from './RoleSelector'
import PasswordStrength from './PasswordStrength'

interface LoginProps {
  onSubmit: (values: { email: string; password: string; role: 'teacher' | 'student' }) => void
  onSwitchMode: (mode: 'login' | 'register') => void
  onExit: () => void
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login({ onSubmit, onSwitchMode, onExit }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'teacher' | 'student'>('teacher')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Local validation only — nothing leaves the browser.
    event.preventDefault()
    const nextErrors: { email?: string; password?: string } = {}
    if (!email.trim()) {
      nextErrors.email = 'Email is required.'
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!password) {
      nextErrors.password = 'Password is required.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    onSubmit({ email: email.trim(), password, role })
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Sign in</h1>
          <p className="text-sm text-neutral-500">
            Demo form — no credentials are checked and no session is created.
          </p>
        </div>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value)
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
          }}
          placeholder="you@example.com"
          required
          autoComplete="email"
          error={errors.email}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={(value) => {
            setPassword(value)
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
          }}
          required
          autoComplete="current-password"
          error={errors.password}
        />

        <PasswordStrength password={password} />

        <RoleSelector value={role} onChange={setRole} />

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Sign in (demo only)
        </button>

        <div className="flex flex-col items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onSwitchMode('register')}
            className="font-medium text-indigo-700 transition-colors duration-150 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            No account yet? Register (demo)
          </button>
          <button
            type="button"
            onClick={onExit}
            className="text-neutral-500 transition-colors duration-150 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            Back to dashboard
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}