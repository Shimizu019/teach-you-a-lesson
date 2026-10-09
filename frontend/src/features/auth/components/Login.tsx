// Login — controlled sign-in form using shared auth components.
// Frontend-only prototype: value/onChange everywhere, no backend, no auth library.
import { useState, type FormEvent } from 'react'
import AuthLayout from './AuthLayout'
import AuthInput from './AuthInput'
import PasswordInput from './PasswordInput'
import RoleSelector from './RoleSelector'
import PasswordStrength from './PasswordStrength'
import { LockIcon } from '../../../components/common/Icons'

interface LoginProps {
  onSubmit: (values: { email: string; password: string; role: 'teacher' | 'student' }) => void
}

export default function Login({ onSubmit }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'teacher' | 'student'>('teacher')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Email and password are required.')
      return
    }
    onSubmit({ email: email.trim(), password, role })
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Sign in</h1>
          <p className="text-sm text-neutral-500">Use your account to continue.</p>
        </div>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          required
          autoComplete="email"
          error={error && !email.trim() ? 'Email is required' : undefined}
          helperText={!error ? undefined : undefined}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="current-password"
          helperText="Min 8 characters."
        />

        <PasswordStrength password={password} />

        <RoleSelector value={role} onChange={setRole} />

        {error && (
          <p className="text-sm font-medium text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <span className="flex items-center justify-center gap-2">
            <LockIcon className="h-4 w-4" />
            Sign in
          </span>
        </button>
      </form>
    </AuthLayout>
  )
}