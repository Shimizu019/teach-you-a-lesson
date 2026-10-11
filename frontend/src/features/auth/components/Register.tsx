// Register — controlled account-creation form using shared auth components.
// Frontend-only prototype: value/onChange everywhere, no backend, no auth library.
// Local validation only; no data leaves the browser and no account is created.
import { useState, type FormEvent } from 'react'
import AuthLayout from './AuthLayout'
import AuthInput from './AuthInput'
import PasswordInput from './PasswordInput'
import RoleSelector from './RoleSelector'
import PasswordStrength from './PasswordStrength'
import type { UserRole } from '../types'

interface RegisterValues {
  firstName: string
  middleName: string
  lastName: string
  email: string
  password: string
  role: UserRole
  // Role-specific profile fields (see features/auth/types.ts):
  // teachers declare a department; students declare grade + section.
  department?: string
  grade?: string
  section?: string
}

interface RegisterProps {
  onSubmit: (values: RegisterValues) => void
  onSwitchMode: (mode: 'login' | 'register') => void
  onExit: () => void
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const GRADE_OPTIONS = Array.from({ length: 12 }, (_, index) => String(index + 1))

type FieldErrors = Partial<
  Record<'firstName' | 'lastName' | 'email' | 'password' | 'department' | 'grade' | 'section', string>
>

export default function Register({ onSubmit, onSwitchMode, onExit }: RegisterProps) {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('teacher')
  const [department, setDepartment] = useState('')
  const [grade, setGrade] = useState('')
  const [section, setSection] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // Local validation only — nothing leaves the browser.
    event.preventDefault()
    const next: FieldErrors = {}
    if (!firstName.trim()) next.firstName = 'First name is required.'
    if (!lastName.trim()) next.lastName = 'Last name is required.'
    if (!email.trim()) {
      next.email = 'Email is required.'
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    if (!password) {
      next.password = 'Password is required.'
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.'
    }
    if (role === 'teacher') {
      if (!department.trim()) next.department = 'Department is required.'
    } else {
      if (!grade) next.grade = 'Grade is required.'
      if (!section.trim()) next.section = 'Section is required.'
    }
    setErrors(next)
    if (Object.values(next).some(Boolean)) return
    onSubmit({
      firstName: firstName.trim(),
      middleName: middleName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password,
      role,
      ...(role === 'teacher'
        ? { department: department.trim() }
        : { grade, section: section.trim() }),
    })
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            Create your account
          </h1>
          <p className="text-sm text-neutral-500">
            Demo form — no account will actually be created and nothing is saved.
          </p>
        </div>

        <RoleSelector value={role} onChange={setRole} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <AuthInput
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={(value) => {
              setFirstName(value)
              clearError('firstName')
            }}
            placeholder="Maria"
            required
            error={errors.firstName}
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
            onChange={(value) => {
              setLastName(value)
              clearError('lastName')
            }}
            placeholder="Santos"
            required
            error={errors.lastName}
          />
        </div>

        {role === 'teacher' ? (
          <AuthInput
            label="Department"
            name="department"
            value={department}
            onChange={(value) => {
              setDepartment(value)
              clearError('department')
            }}
            placeholder="e.g., Mathematics"
            required
            error={errors.department}
            helperText="Where you teach — demo field, nothing is saved."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="auth-grade"
                className="mb-1 block text-sm font-medium text-neutral-700"
              >
                Grade
                <span aria-hidden="true" className="ml-1 text-red-600">
                  *
                </span>
              </label>
              <select
                id="auth-grade"
                name="grade"
                value={grade}
                onChange={(event) => {
                  setGrade(event.target.value)
                  clearError('grade')
                }}
                required
                aria-invalid={errors.grade ? true : undefined}
                aria-describedby={errors.grade ? 'auth-grade-error' : undefined}
                className={`block w-full rounded-xl border bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 transition-colors duration-150 hover:border-neutral-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
                  errors.grade ? 'border-red-300' : 'border-neutral-200'
                }`}
              >
                <option value="">Select grade</option>
                {GRADE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    Grade {option}
                  </option>
                ))}
              </select>
              {errors.grade && (
                <p id="auth-grade-error" className="mt-1 text-xs font-medium text-red-700">
                  {errors.grade}
                </p>
              )}
            </div>
            <AuthInput
              label="Section"
              name="section"
              value={section}
              onChange={(value) => {
                setSection(value)
                clearError('section')
              }}
              placeholder="e.g., 1-1"
              required
              error={errors.section}
            />
          </div>
        )}

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value)
            clearError('email')
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
            clearError('password')
          }}
          required
          autoComplete="new-password"
          error={errors.password}
          helperText="Min 8 characters."
        />

        <PasswordStrength password={password} />

        <button
          type="submit"
          className="w-full rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Create account (demo only)
        </button>

        <div className="flex flex-col items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => onSwitchMode('login')}
            className="font-medium text-indigo-700 transition-colors duration-150 hover:text-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            Already registered? Sign in (demo)
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
