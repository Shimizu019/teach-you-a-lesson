// AdminLoginPage — restricted administrator sign-in.
// There is NO admin registration. Administrators cannot be created from the
// UI and students/teachers cannot reach this. Validates against the demo admin
// account only (frontend-only; not production security).
//
import { useState } from 'react'
import type { FormEvent } from 'react'
import AuthLayout from '../components/AuthLayout'
import AuthInput from '../components/AuthInput'
import PasswordInput from '../components/PasswordInput'
import { useAuth } from '../useAuth'
import { ShieldIcon } from '../../../components/common/Icons'

type NavTarget = 'login' | 'register' | 'admin'

interface AdminLoginPageProps {
  onNavigate: (screen: NavTarget) => void
}

export default function AdminLoginPage({ onNavigate }: AdminLoginPageProps) {
  const { loginAdmin } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const result = loginAdmin({ username, password })
    if (!result.ok) setError(result.error)
  }

  return (
    <AuthLayout>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-indigo-600 text-white">
          <ShieldIcon className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-neutral-900">
            Administrator sign in
          </h1>
          <p className="mt-0.5 text-sm text-neutral-500">Restricted access.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <AuthInput
          label="Administrator username"
          name="admin-username"
          value={username}
          onChange={(value) => {
            setUsername(value)
            setError(undefined)
          }}
          autoComplete="off"
          required
        />
        <PasswordInput
          label="Password"
          name="admin-password"
          value={password}
          onChange={(value) => {
            setPassword(value)
            setError(undefined)
          }}
          autoComplete="off"
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

      <p className="mt-5 text-sm text-neutral-600">
        Not an administrator?{' '}
        <button
          type="button"
          onClick={() => onNavigate('login')}
          className="font-medium text-indigo-700 hover:text-indigo-800 focus-visible:outline-none focus-visible:underline"
        >
          Back to sign in
        </button>
      </p>
    </AuthLayout>
  )
}
