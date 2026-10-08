// AuthInput — reusable labeled text field for the auth screens.
// Generic on purpose: no Login/Register-specific field is hardcoded here.
// Errors and helper text are linked to the input through aria-describedby.
//
import type { HTMLInputTypeAttribute } from 'react'

interface AuthInputProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  type?: HTMLInputTypeAttribute
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
  autoComplete?: string
}

export default function AuthInput({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  autoComplete,
}: AuthInputProps) {
  const id = `auth-${name}`
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const describedBy =
    [error ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-neutral-700">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`block w-full rounded-xl border bg-neutral-50 px-3 py-2.5 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 ${
          error ? 'border-red-300' : 'border-neutral-200'
        }`}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
      {helperText && (
        <p id={helperId} className="mt-1 text-xs text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  )
}
