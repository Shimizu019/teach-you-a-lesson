// SecuritySection — password, two-factor authentication and sessions.
// All controls are prototype-only and open placeholder dialogs; no real
// authentication, password change or 2FA is implemented.
import SettingsCard from './SettingsCard'
import { LockIcon, MonitorIcon, ShieldIcon, SmartphoneIcon } from '../../../components/common/Icons'

export type SecurityAction = 'password' | 'twofa' | 'session'

interface SecuritySectionProps {
  onAction: (action: SecurityAction) => void
}

const secondaryBtnClass =
  'rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
const smallBtnClass =
  'rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
const primaryBtnClass =
  'rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2'

export default function SecuritySection({ onAction }: SecuritySectionProps) {
  return (
    <div className="space-y-6">
      <SettingsCard icon={LockIcon} title="Password" description="Last updated recently.">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => onAction('password')}
            className={secondaryBtnClass}
          >
            Change Password
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={ShieldIcon}
        title="Two-Factor Authentication"
        description="Protect your account with an additional verification step."
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-neutral-600">
            Disabled
          </span>
          <button type="button" onClick={() => onAction('twofa')} className={primaryBtnClass}>
            Enable 2FA
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        icon={SmartphoneIcon}
        title="Active Sessions"
        description="Devices that are currently signed in to your account."
      >
        <ul className="divide-y divide-neutral-100">
          <li className="flex flex-wrap items-center gap-3 py-3">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-indigo-50 text-indigo-600">
              <MonitorIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-neutral-900">Windows / Chrome</p>
              <p className="text-xs text-neutral-500">Current session — Manila, Philippines</p>
            </div>
            <span className="flex-none rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
              Active now
            </span>
          </li>
          <li className="flex flex-wrap items-center gap-3 py-3">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-indigo-50 text-indigo-600">
              <SmartphoneIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-neutral-900">Android Device</p>
              <p className="text-xs text-neutral-500">Last active 2 hours ago</p>
            </div>
            <button
              type="button"
              onClick={() => onAction('session')}
              className={`flex-none ${smallBtnClass}`}
            >
              Sign out
            </button>
          </li>
        </ul>
        <p className="mt-3 text-xs text-neutral-500">
          Session controls are prototype-only — no real devices are connected.
        </p>
      </SettingsCard>
    </div>
  )
}