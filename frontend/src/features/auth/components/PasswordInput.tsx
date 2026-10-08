// PasswordInput — password field with an accessible show/hide toggle.
// The visibility state is local only; the value travels exclusively through
// the same value/onChange contract as AuthInput (never logged or stored).
//
import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '../../../components/common/Icons'

interface PasswordInputProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  helperText?: string
  autoComplete?: string
}

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  autoComplete,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
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
      <div className="relative">
        <input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`block w-full rounded-xl border bg-neutral-50 py-2.5 pl-3 pr-11 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 ${
            error ? 'border-red-300' : 'border-neutral-200'
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          disabled={disabled}
          className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-xl text-neutral-500 transition-colors duration-150 hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {visible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
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
