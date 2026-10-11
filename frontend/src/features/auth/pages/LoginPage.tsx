// LoginPage — general sign-in for teachers and students.
// The role is NOT selectable here: it comes from the matched account when the
// session is created. Provides links to student registration and admin login.
//
import { useState } from 'react'
import type { FormEvent } from 'react'
import AuthLayout from '../components/AuthLayout'
import AuthInput from '../components/AuthInput'
import PasswordInput from '../components/PasswordInput'
import { useAuth } from '../useAuth'

type NavTarget = 'login' | 'register' | 'admin'

interface LoginPageProps {
  onNavigate: (screen: NavTarget) => void
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const result = login({ identifier, password })
    // On success the provider sets the session and App renders the dashboard.
    if (!result.ok) setError(result.error)
  }

  return (
    <AuthLayout>
      <div className="mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Sign in</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Enter your username or email to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthInput
          label="Username or email"
          name="identifier"
          value={identifier}
          onChange={(value) => {
            setIdentifier(value)
            setError(undefined)
          }}
          placeholder="e.g. teacher"
          autoComplete="username"
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={(value) => {
            setPassword(value)
            setError(undefined)
          }}
          autoComplete="current-password"
          required
          error={error}
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Sign in (demo)
        </button>
      </form>

      <div className="mt-5 space-y-2 text-sm">
        <p className="text-neutral-600">
          New student?{' '}
          <button
            type="button"
            onClick={() => onNavigate('register')}
            className="font-medium text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:underline"
          >
            Create a student account
          </button>
        </p>
        <p className="text-neutral-600">
          Administrator?{' '}
          <button
            type="button"
            onClick={() => onNavigate('admin')}
            className="font-medium text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:underline"
          >
            Admin login
          </button>
        </p>
      </div>
    </AuthLayout>
  )
}
