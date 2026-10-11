// Header - top bar with page title, search, the authenticated user, and logout.
// No role switcher and no sign-in button: the role comes from the session and
// a signed-in user is always shown with a working logout action.
//
import { useState } from 'react'
import { MenuIcon, SearchIcon } from '../common/Icons'
import type { SessionUser } from '../../features/auth/types'

interface HeaderProps {
  onMenuToggle: () => void
  searchQuery: string
  onSearchChange: (value: string) => void
  user: SessionUser
  onLogout: () => void
}

export default function Header({
  onMenuToggle,
  searchQuery,
  onSearchChange,
  user,
  onLogout,
}: HeaderProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ')
  const initial = (user.firstName || user.email || '?').charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          className="grid h-10 w-10 flex-none place-items-center rounded-lg text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
        >
          <MenuIcon />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight text-neutral-900">
            Dashboard
          </h1>
          <p className="hidden truncate text-xs text-neutral-500 sm:block">
            Here&apos;s your learning overview for today.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative hidden md:block">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              aria-label="Search lessons"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-56 rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 lg:w-64"
            />
          </div>
          <button
            type="button"
            aria-label="Search"
            aria-expanded={mobileSearchOpen}
            aria-controls="mobile-search"
            onClick={() => setMobileSearchOpen((value) => !value)}
            className={`grid h-10 w-10 place-items-center rounded-lg transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 md:hidden ${
              mobileSearchOpen ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-600'
            }`}
          >
            <SearchIcon />
          </button>

          <span aria-hidden="true" className="hidden h-6 w-px bg-neutral-200 sm:block" />

          <div className="hidden items-center gap-2.5 sm:flex">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
              {initial}
            </span>
            <div className="min-w-0 leading-tight">
              <p className="max-w-[10rem] truncate text-sm font-medium text-neutral-900">{fullName}</p>
              <p className="truncate text-[11px] capitalize text-neutral-500">{user.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Log out
          </button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div id="mobile-search" className="border-t border-neutral-100 px-4 py-3 sm:px-6 md:hidden">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              aria-label="Search dashboard content"
              placeholder="Search lessons..."
              autoFocus
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-2.5 pl-10 pr-4 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
        </div>
      )}
    </header>
  )
}
