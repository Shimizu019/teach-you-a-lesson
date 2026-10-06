// Subjects — subject browsing page prototype with local search + category filters.
// Frontend-only: static mock data, no router, no backend.
//
import { useMemo, useState } from 'react'
import PlaceholderDialog from '../../components/common/PlaceholderDialog'
import SubjectCard from '../../components/common/SubjectCard'
import { SearchIcon } from '../../components/common/Icons'
import {
  categoryFilters,
  subjects,
  type CategoryFilter,
  type Subject,
} from './mockData'

interface DialogState {
  title: string
  description: string
}

export default function Subjects() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [dialog, setDialog] = useState<DialogState | null>(null)

  const counts = useMemo<Record<CategoryFilter, number>>(() => {
    const totals: Record<CategoryFilter, number> = {
      All: subjects.length,
      STEM: 0,
      Languages: 0,
      'Computer / IT': 0,
    }
    for (const subject of subjects) totals[subject.category] += 1
    return totals
  }, [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return subjects.filter((subject) => {
      const matchesCategory = category === 'All' || subject.category === category
      const matchesQuery =
        query.length === 0 ||
        `${subject.name} ${subject.description} ${subject.category}`
          .toLowerCase()
          .includes(query)
      return matchesCategory && matchesQuery
    })
  }, [search, category])

  const filtersActive = search.trim().length > 0 || category !== 'All'

  const resetFilters = () => {
    setSearch('')
    setCategory('All')
  }

  const openSubject = (subject: Subject) =>
    setDialog({
      title: subject.name,
      description: `${subject.lessonCount} lessons available. Subject lesson browsing will be implemented in a future version.`,
    })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Subjects
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Explore subjects and find lessons that match what you want to learn.
        </p>
      </div>

      {/* Search + category filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            aria-label="Search subjects"
            placeholder="Search subjects..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {categoryFilters.map((option) => {
            const active = option === category
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(option)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  active
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
                }`}
              >
                {option}
                <span
                  className={`text-[11px] font-semibold ${
                    active ? 'text-indigo-100' : 'text-neutral-500'
                  }`}
                >
                  {counts[option]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results meta */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium text-neutral-500">
          Showing {filtered.length} of {subjects.length} subjects
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-md text-xs font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Subject grid or empty state */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((subject) => (
            <SubjectCard
              key={subject.name}
              name={subject.name}
              description={subject.description}
              lessonCount={subject.lessonCount}
              iconChipClass={subject.iconChipClass}
              icon={subject.icon}
              category={subject.category}
              categoryClass={subject.categoryClass}
              completedLessons={subject.completedLessons}
              onSelect={() => openSubject(subject)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-base font-semibold text-neutral-900">No subjects found</h2>
          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-neutral-500">
            {search.trim() ? `Nothing matches “${search.trim()}”` : 'No subjects'}
            {category !== 'All' ? ` in category “${category}”` : ''}. Try a different search
            or reset the filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Show all subjects
          </button>
        </div>
      )}

      {dialog && (
        <PlaceholderDialog
          title={dialog.title}
          description={dialog.description}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  )
}
