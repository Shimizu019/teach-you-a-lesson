// Header — top bar with page title, search, and profile area.
//
import { ChevronDownIcon, MenuIcon, SearchIcon } from '../common/Icons'

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
        >
          <MenuIcon />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-neutral-900 sm:text-lg">
            Dashboard
          </h1>
          <p className="hidden truncate text-xs text-neutral-500 sm:block">
            Here&apos;s your learning overview for today.
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              aria-label="Search lessons"
              placeholder="Search lessons..."
              className="w-52 rounded-lg border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 lg:w-64"
            />
          </div>
          <button
            type="button"
            aria-label="Search"
            className="rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:hidden"
          >
            <SearchIcon />
          </button>

          <button
            type="button"
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:px-3"
          >
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-indigo-600 text-xs font-medium text-white">
              AR
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium leading-tight text-neutral-900">
                Alex Rivera
              </span>
              <span className="block text-xs leading-tight text-neutral-500">Learner</span>
            </span>
            <ChevronDownIcon className="hidden h-4 w-4 text-neutral-400 sm:block" />
          </button>
        </div>
      </div>
    </header>
  )
}
