// RoleSelector — controlled Teacher/Student radio group for the auth screens.
// Uses the shared UserRole type; the selected value lives entirely in the
// parent (never stored globally).
//
import type { ComponentType } from 'react'
import { CheckCircleIcon, GraduationCapIcon, UserIcon } from '../../../components/common/Icons'
import type { UserRole } from '../types'

interface RoleSelectorProps {
  value: UserRole
  onChange: (role: UserRole) => void
  disabled?: boolean
}

interface RoleOption {
  value: UserRole
  label: string
  hint: string
  Icon: ComponentType<{ className?: string }>
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    value: 'teacher',
    label: 'Teacher',
    hint: 'Create classrooms and guide lessons.',
    Icon: GraduationCapIcon,
  },
  {
    value: 'student',
    label: 'Student',
    hint: 'Join classrooms and track your progress.',
    Icon: UserIcon,
  },
]

export default function RoleSelector({ value, onChange, disabled = false }: RoleSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Account type"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
    >
      {ROLE_OPTIONS.map(({ value: role, label, hint, Icon }) => {
        const selected = value === role
        return (
          <label
            key={role}
            className={`block h-full ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input
              type="radio"
              name="auth-role"
              value={role}
              checked={selected}
              disabled={disabled}
              onChange={() => onChange(role)}
              className="peer sr-only"
            />
            <span
              className={`flex h-full items-start gap-3 rounded-xl border p-4 transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 ${
                selected
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
              } ${disabled ? 'opacity-60' : ''}`}
            >
              <span
                className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${
                  selected ? 'bg-white text-indigo-600' : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span
                    className={`block text-sm font-semibold ${
                      selected ? 'text-indigo-700' : 'text-neutral-900'
                    }`}
                  >
                    {label}
                  </span>
                  {selected && <CheckCircleIcon className="h-5 w-5 flex-none text-indigo-600" />}
                </span>
                <span className="mt-0.5 block text-xs text-neutral-500">{hint}</span>
              </span>
            </span>
          </label>
        )
      })}
    </div>
  )
}
