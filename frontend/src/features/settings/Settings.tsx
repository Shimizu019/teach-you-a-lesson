// Settings — settings page prototype for teachers and students.
// Left settings navigation + content area; all state is frontend-only.
import { useRef, useState, type ComponentType } from 'react'
import PlaceholderDialog from '../../components/common/PlaceholderDialog'
import {
  DownloadIcon,
  GlobeIcon,
  SettingsIcon,
  ShieldIcon,
  SunIcon,
  UserIcon,
} from '../../components/common/Icons'
import AccountSection from './components/AccountSection'
import AppearanceSection from './components/AppearanceSection'
import DataSection from './components/DataSection'
import LanguageSection from './components/LanguageSection'
import SecuritySection from './components/SecuritySection'
import type { AccountValues, Language, SettingsRole, Theme } from './types'

interface SettingsProps {
  role: SettingsRole
  theme: Theme
  onThemeChange: (theme: Theme) => void
  language: Language
  onLanguageChange: (language: Language) => void
  account: AccountValues
  onAccountSave: (values: AccountValues) => void
}

type SectionId = 'account' | 'appearance' | 'language' | 'security' | 'data'

type DialogId = 'password' | 'twofa' | 'session' | 'backup' | 'export' | 'import'

interface NavItem {
  id: SectionId
  label: string
  icon: ComponentType<{ className?: string }>
}

const NAV_GROUPS: { group: string; items: NavItem[] }[] = [
  {
    group: 'General',
    items: [
      { id: 'account', label: 'Account', icon: UserIcon },
      { id: 'appearance', label: 'Appearance', icon: SunIcon },
      { id: 'language', label: 'Language', icon: GlobeIcon },
    ],
  },
  { group: 'Security', items: [{ id: 'security', label: 'Security & 2FA', icon: ShieldIcon }] },
  { group: 'Data', items: [{ id: 'data', label: 'Backup & Export', icon: DownloadIcon }] },
]

const DIALOG_CONTENT: Record<DialogId, { title: string; description: string }> = {
  password: {
    title: 'Change password',
    description:
      'Password changes are not connected to a backend yet — no real authentication is implemented.',
  },
  twofa: {
    title: 'Enable two-factor authentication',
    description:
      '2FA is a UI prototype only and is not linked to any real authentication service.',
  },
  session: {
    title: 'Sign out device',
    description:
      'Session management is frontend-only — no real devices exist for this prototype.',
  },
  backup: {
    title: 'Create backup',
    description:
      'Backups require backend storage. Nothing is saved to a server in this prototype.',
  },
  export: {
    title: 'Export data',
    description:
      'No export service is connected yet — your data remains in local React state.',
  },
  import: {
    title: 'Import data',
    description:
      'Importing requires backend parsing. This control is a prototype placeholder.',
  },
}

export default function Settings({
  role,
  theme,
  onThemeChange,
  language,
  onLanguageChange,
  account,
  onAccountSave,
}: SettingsProps) {
  const [activeSection, setActiveSection] = useState<SectionId>('account')
  const [dialog, setDialog] = useState<DialogId | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleSelectSection = (id: SectionId) => {
    setActiveSection(id)
    if (window.matchMedia('(max-width: 1023px)').matches) {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="space-y-6">
      {/* Page header with the current role displayed clearly */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-indigo-50 text-indigo-600">
              <SettingsIcon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                Settings
              </h1>
              <p className="mt-1 text-sm text-neutral-500">
                Manage your account, appearance, language, security, and data. Frontend prototype —
                nothing is sent to a server.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
              Role
            </p>
            <p className="text-sm font-semibold capitalize text-neutral-900">{role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Settings navigation — grouped chips on mobile, list on desktop */}
        <nav aria-label="Settings" className="lg:sticky lg:top-6 lg:self-start">
          {NAV_GROUPS.map((group) => (
            <div key={group.group} className="mb-5 last:mb-0">
              <p className="hidden pb-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 lg:block">
                {group.group}
              </p>
              <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active = activeSection === item.id
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        aria-current={active ? 'true' : undefined}
                        onClick={() => handleSelectSection(item.id)}
                        className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                          active
                            ? 'border-indigo-200 bg-indigo-50 font-semibold text-indigo-700'
                            : 'border-neutral-200 bg-white font-medium text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900'
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 flex-none ${
                            active ? 'text-indigo-600' : 'text-neutral-500'
                          }`}
                        />
                        {item.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Settings content */}
        <div ref={contentRef} className="min-w-0 space-y-6 scroll-mt-6">
          {activeSection === 'account' && (
            <AccountSection account={account} role={role} onSave={onAccountSave} />
          )}
          {activeSection === 'appearance' && (
            <AppearanceSection theme={theme} onThemeChange={onThemeChange} />
          )}
          {activeSection === 'language' && (
            <LanguageSection language={language} onLanguageChange={onLanguageChange} />
          )}
          {activeSection === 'security' && (
            <SecuritySection onAction={(action) => setDialog(action)} />
          )}
          {activeSection === 'data' && <DataSection onAction={(action) => setDialog(action)} />}
        </div>
      </div>

      {dialog && (
        <PlaceholderDialog
          title={DIALOG_CONTENT[dialog].title}
          description={DIALOG_CONTENT[dialog].description}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  )
}