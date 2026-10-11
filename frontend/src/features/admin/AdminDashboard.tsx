// AdminDashboard — administrator shell + overview.
//
// FRONTEND-ONLY PROTOTYPE. All figures and the user table are MOCK DATA.
// User management, account creation, and any database operations are NOT
// implemented — this is a foundation/placeholder only, clearly labelled below.
//
import { useState } from 'react'
import {
  DashboardIcon,
  GraduationCapIcon,
  SettingsIcon,
  ShieldIcon,
  UsersIcon,
} from '../../components/common/Icons'
import type { AdminAccount } from '../auth/types'

interface AdminDashboardProps {
  user: AdminAccount
  onLogout: () => void
}

// Mock system-level figures (not real data).
const STATS = [
  { label: 'Total users', value: '1,284' },
  { label: 'Teachers', value: '42' },
  { label: 'Students', value: '1,238' },
  { label: 'Active classes', value: '96' },
]

// Mock user rows for the placeholder management table.
const MOCK_USERS = [
  { name: 'Demo Teacher', role: 'Teacher', status: 'Active' },
  { name: 'Admin Benju', role: 'Administrator', status: 'Active' },
  { name: 'Juan Dela Cruz', role: 'Student', status: 'Active' },
  { name: 'Maria Santos', role: 'Student', status: 'Inactive' },
]

type AdminNav = 'Overview' | 'Users' | 'System'

const NAV: { label: AdminNav; icon: typeof DashboardIcon }[] = [
  { label: 'Overview', icon: DashboardIcon },
  { label: 'Users', icon: UsersIcon },
  { label: 'System', icon: SettingsIcon },
]

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeNav, setActiveNav] = useState<AdminNav>('Overview')
  const fullName = `${user.firstName} ${user.lastName}`.trim()

  return (
    <div className="min-h-screen bg-neutral-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-neutral-200 bg-white lg:flex">
        <div className="flex h-16 flex-none items-center gap-3 border-b border-neutral-200 px-5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-indigo-600 text-white">
            <GraduationCapIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight text-neutral-900">
              Teach You a Lesson
            </p>
            <p className="truncate text-[11px] text-neutral-500">Admin console</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5" aria-label="Admin">
          {NAV.map((item) => {
            const Icon = item.icon
            const active = item.label === activeNav
            return (
              <button
                key={item.label}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => setActiveNav(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  active
                    ? 'bg-indigo-50 font-semibold text-indigo-700'
                    : 'font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <Icon className={`h-5 w-5 flex-none ${active ? 'text-indigo-600' : 'text-neutral-500'}`} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div className="flex-none border-t border-neutral-200 p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {(user.firstName || 'A').charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-900">{fullName}</p>
              <p className="truncate text-xs capitalize text-neutral-500">{user.role}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="mt-1 w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Log out
          </button>
        </div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white lg:hidden">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-neutral-900">
                  Administrator
                </h1>
                <p className="hidden text-xs text-neutral-500 sm:block">
                  System overview and user management
                </p>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="hidden text-sm text-neutral-600 sm:block">{fullName}</span>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
              >
                Log out
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div
            role="note"
            className="mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900"
          >
            <span className="font-semibold">Prototype.</span> The figures and user list below are
            mock data. User management, account creation, and database operations are not
            implemented yet.
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-base font-semibold tracking-tight text-neutral-900">
                User management
              </h2>
              <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Placeholder
              </span>
            </div>
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Role</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {MOCK_USERS.map((row) => (
                    <tr key={row.name}>
                      <td className="px-4 py-3 font-medium text-neutral-900">{row.name}</td>
                      <td className="px-4 py-3 text-neutral-600">{row.role}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            row.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              Actions such as creating, editing, or removing accounts are not available in this
              prototype.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
