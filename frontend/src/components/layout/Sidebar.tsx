// Sidebar — application navigation with desktop/mobile behavior.
// Desktop: fixed visible sidebar. Mobile/tablet: off-canvas overlay.
//
import type { ComponentType } from 'react'
import {
  BookOpenIcon,
  ChartIcon,
  DashboardIcon,
  GraduationCapIcon,
  LayersIcon,
  SettingsIcon,
} from '../common/Icons'

type IconType = ComponentType<{ className?: string }>

interface NavItem {
  label: string
  icon: IconType
  active?: boolean
}

const primaryNav: NavItem[] = [
  { label: 'Dashboard', icon: DashboardIcon, active: true },
  { label: 'My Lessons', icon: BookOpenIcon },
  { label: 'Subjects', icon: LayersIcon },
  { label: 'Progress', icon: ChartIcon },
]

const secondaryNav: NavItem[] = [{ label: 'Settings', icon: SettingsIcon }]

function NavButton({ item }: { item: NavItem }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      aria-current={item.active ? 'page' : undefined}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        item.active
          ? 'bg-indigo-50 text-indigo-700'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
      }`}
    >
      <Icon className="h-5 w-5 flex-none" />
      {item.label}
    </button>
  )
}

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-neutral-900/40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-neutral-100 px-5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-indigo-600 text-white">
            <GraduationCapIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-neutral-900">Teach You a Lesson</p>
            <p className="text-[11px] text-neutral-400">Learning platform</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main">
          <ul className="space-y-1">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <NavButton item={item} />
              </li>
            ))}
          </ul>
          <hr className="my-4 border-neutral-100" />
          <ul className="space-y-1">
            {secondaryNav.map((item) => (
              <li key={item.label}>
                <NavButton item={item} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-neutral-100 p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-indigo-600 text-sm font-medium text-white">
              AR
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-neutral-900">Alex Rivera</p>
              <p className="text-xs text-neutral-500">Learner</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
