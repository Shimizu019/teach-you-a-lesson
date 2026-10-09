// Register — controlled account-creation form using shared auth components.
// Frontend-only prototype: value/onChange everywhere, no backend, no auth library.
import { useState, type FormEvent } from 'react'
import AuthLayout from './AuthLayout'
import AuthInput from './AuthInput'
import PasswordInput from './PasswordInput'
import RoleSelector from './RoleSelector'
import PasswordStrength from './PasswordStrength'
import { LockIcon } from '../../../components/common/Icons'
import type { UserRole } from '../types'

interface RegisterValues {
  firstName: string
  middleName: string
  lastName: string
  email: string
  password: string
  role: UserRole
}

interface RegisterProps {
  onSubmit: (values: RegisterValues) => void
}

export default function Register({ onSubmit }: RegisterProps) {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('teacher')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.')
      return
    }
    onSubmit({ firstName: firstName.trim(), middleName: middleName.trim(), lastName: lastName.trim(), email: email.trim(), password, role })
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Create your account</h1>
          <p className="text-sm text-neutral-500">Choose a role below. You can update this later.</p>
        </div>

        <RoleSelector value={role} onChange={setRole} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <AuthInput
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={setFirstName}
            placeholder="Maria"
            required
          />
          <AuthInput
            label="Middle Name"
            name="middleName"
            value={middleName}
            onChange={setMiddleName}
            placeholder="(optional)"
          />
          <AuthInput
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={setLastName}
            placeholder="Santos"
            required
          />
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
        />

        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
          required
          autoComplete="new-password"
          helperText="Min 8 characters."
        />

        <PasswordStrength password={password} />

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
            Create account
          </span>
        </button>
      </form>
    </AuthLayout>
  )
}
