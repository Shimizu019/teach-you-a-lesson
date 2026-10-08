// AppearanceSection — theme selector (Light / Dark / System).
// Selecting an option applies the theme immediately across the app.
import type { ComponentType } from 'react'
import SettingsCard from './SettingsCard'
import { CheckCircleIcon, MonitorIcon, MoonIcon, SunIcon } from '../../../components/common/Icons'
import type { Theme } from '../types'

interface AppearanceSectionProps {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

interface ThemeOption {
  value: Theme
  label: string
  hint: string
  Icon: ComponentType<{ className?: string }>
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: 'light', label: 'Light', hint: 'Bright, neutral surfaces.', Icon: SunIcon },
  { value: 'dark', label: 'Dark', hint: 'Dimmed surfaces for low light.', Icon: MoonIcon },
  { value: 'system', label: 'System', hint: 'Match your device setting.', Icon: MonitorIcon },
]

export default function AppearanceSection({ theme, onThemeChange }: AppearanceSectionProps) {
  return (
    <SettingsCard
      icon={SunIcon}
      title="Appearance"
      description="Choose how the app looks. The selection applies across the interface immediately."
    >
      <div role="radiogroup" aria-label="Theme" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {THEME_OPTIONS.map(({ value, label, hint, Icon }) => {
          const selected = theme === value
          return (
            <label key={value} className="block h-full cursor-pointer">
              <input
                type="radio"
                name="settings-theme"
                value={value}
                checked={selected}
                onChange={() => onThemeChange(value)}
                className="peer sr-only"
              />
              <span
                className={`flex h-full flex-col gap-3 rounded-xl border p-4 transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 peer-focus-visible:ring-offset-2 ${
                  selected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <span className="flex items-center justify-between gap-2">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-lg ${
                      selected ? 'bg-white text-indigo-600' : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {selected && <CheckCircleIcon className="h-5 w-5 text-indigo-600" />}
                </span>
                <span className="block">
                  <span
                    className={`block text-sm font-semibold ${
                      selected ? 'text-indigo-700' : 'text-neutral-900'
                    }`}
                  >
                    {label}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-500">{hint}</span>
                </span>
              </span>
            </label>
          )
        })}
      </div>
      <p className="mt-4 text-xs text-neutral-500">
        System follows your operating system light or dark preference.
      </p>
    </SettingsCard>
  )
}