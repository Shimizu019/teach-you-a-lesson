// Sidebar — application navigation with desktop/mobile behavior.
// Desktop: fixed visible sidebar. Mobile/tablet: off-canvas drawer.
//
import type { ComponentType } from 'react'
import {
  BookOpenIcon,
  ChartIcon,
  ChevronDownIcon,
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

function NavLabel({ children }: { children: string }) {
  return (
    <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
      {children}
    </p>
  )
}

function NavButton({ item }: { item: NavItem }) {
  const Icon = item.icon
  return (
    <button
      type="button"
      aria-current={item.active ? 'page' : undefined}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        item.active
          ? 'bg-indigo-50 font-semibold text-indigo-700'
          : 'font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
      }`}
    >
      <Icon
        className={`h-5 w-5 flex-none ${
          item.active
            ? 'text-indigo-600'
            : 'text-neutral-500 group-hover:text-neutral-700'
        }`}
      />
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
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 ease-out lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 flex-none items-center gap-3 border-b border-neutral-200 px-5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-indigo-600 text-white">
            <GraduationCapIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-neutral-900">
              Teach You a Lesson
            </p>
            <p className="truncate text-[11px] text-neutral-500">Learning platform</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5" aria-label="Main">
          <NavLabel>Menu</NavLabel>
          <ul className="space-y-1">
            {primaryNav.map((item) => (
              <li key={item.label}>
                <NavButton item={item} />
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <NavLabel>Preferences</NavLabel>
            <ul className="space-y-1">
              {secondaryNav.map((item) => (
                <li key={item.label}>
                  <NavButton item={item} />
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="flex-none border-t border-neutral-200 p-3">
          <button
            type="button"
            aria-label="Open profile"
            className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-indigo-600 text-sm font-medium text-white ring-2 ring-indigo-100">
              AR
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-neutral-900">
                Alex Rivera
              </span>
              <span className="block truncate text-xs text-neutral-500">Learner</span>
            </span>
            <ChevronDownIcon className="h-4 w-4 flex-none text-neutral-400" />
          </button>
        </div>
      </aside>
    </>
  )
}

