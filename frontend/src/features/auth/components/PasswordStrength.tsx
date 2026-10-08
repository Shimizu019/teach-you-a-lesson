// PasswordStrength — UI-only password strength hint for the auth screens.
// This is a visual helper, NOT security validation: a "Strong" label makes no
// claim that the password is secure, and nothing is stored or checked
// beyond this component.
//
interface PasswordStrengthProps {
  password: string
}

const STRENGTH = {
  Weak: { bars: 1, textClass: 'text-red-700', barClass: 'bg-red-500' },
  Medium: { bars: 2, textClass: 'text-amber-600', barClass: 'bg-amber-500' },
  Strong: { bars: 3, textClass: 'text-emerald-600', barClass: 'bg-emerald-500' },
} as const

type StrengthLevel = keyof typeof STRENGTH

function calcStrength(password: string): StrengthLevel {
  const types =
    Number(/[a-z]/.test(password)) +
    Number(/[A-Z]/.test(password)) +
    Number(/[0-9]/.test(password)) +
    Number(/[^a-zA-Z0-9]/.test(password))
  if (password.length >= 12 && types >= 3) return 'Strong'
  if (password.length >= 8 && types >= 2) return 'Medium'
  return 'Weak'
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const level = calcStrength(password)
  const config = STRENGTH[level]

  return (
    <div role="status" className="mt-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-neutral-600">Password strength</span>
        <span className={`text-xs font-semibold ${config.textClass}`}>{level}</span>
      </div>
      <div aria-hidden="true" className="mt-1.5 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-1.5 rounded-full ${
              index < config.bars ? config.barClass : 'bg-neutral-200'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
