// LanguageSection — language selector prototype control.
// Updates the selected value in UI state only; no translation is applied.
import SettingsCard from './SettingsCard'
import { CheckCircleIcon, GlobeIcon } from '../../../components/common/Icons'
import type { Language } from '../types'

interface LanguageSectionProps {
  language: Language
  onLanguageChange: (language: Language) => void
}

interface LanguageOption {
  value: Language
  label: string
  hint: string
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'English', label: 'English', hint: 'Default interface language.' },
  { value: 'Filipino', label: 'Filipino', hint: 'Wikang Filipino.' },
]

export default function LanguageSection({ language, onLanguageChange }: LanguageSectionProps) {
  return (
    <SettingsCard
      icon={GlobeIcon}
      title="Language"
      description="Pick the language used across the application."
    >
      <div
        role="radiogroup"
        aria-label="Language"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {LANGUAGE_OPTIONS.map((option) => {
          const selected = language === option.value
          return (
            <label key={option.value} className="block cursor-pointer">
              <input
                type="radio"
                name="settings-language"
                value={option.value}
                checked={selected}
                onChange={() => onLanguageChange(option.value)}
                className="peer sr-only"
              />
              <span
                className={`flex items-center gap-3 rounded-xl border p-4 transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <span
                  className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${
                    selected ? 'bg-white text-indigo-600' : 'bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <GlobeIcon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-sm font-semibold ${
                      selected ? 'text-indigo-700' : 'text-neutral-900'
                    }`}
                  >
                    {option.label}
                  </span>
                  <span className="block text-xs text-neutral-500">{option.hint}</span>
                </span>
                {selected && <CheckCircleIcon className="h-5 w-5 flex-none text-indigo-600" />}
              </span>
            </label>
          )
        })}
      </div>
      <p role="status" aria-live="polite" className="mt-4 text-sm text-neutral-600">
        Current language: <span className="font-semibold text-neutral-900">{language}</span>
      </p>
      <p className="mt-1 text-xs text-neutral-500">
        Full translation is not wired up yet — this selector is a prototype control.
      </p>
    </SettingsCard>
  )
}