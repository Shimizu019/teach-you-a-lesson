// My Lessons — lessons page prototype with local search + status filters.
// Frontend-only: static mock data, no router, no backend.
//
import { useMemo, useState } from 'react'
import LessonCard from '../../components/common/LessonCard'
import PlaceholderDialog from '../../components/common/PlaceholderDialog'
import { SearchIcon } from '../../components/common/Icons'
import {
  actionLabels,
  myLessons,
  statusFilters,
  type MyLesson,
  type StatusFilter,
} from './mockData'

interface DialogState {
  title: string
  description: string
}

export default function MyLessons() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [dialog, setDialog] = useState<DialogState | null>(null)

  const counts = useMemo<Record<StatusFilter, number>>(() => {
    const totals: Record<StatusFilter, number> = {
      All: myLessons.length,
      'In Progress': 0,
      Completed: 0,
      'Not Started': 0,
    }
    for (const lesson of myLessons) totals[lesson.status] += 1
    return totals
  }, [])

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase()
    return myLessons.filter((lesson) => {
      const matchesStatus = status === 'All' || lesson.status === status
      const matchesQuery =
        query.length === 0 ||
        `${lesson.subject} ${lesson.title} ${lesson.description} ${lesson.moduleInfo}`
          .toLowerCase()
          .includes(query)
      return matchesStatus && matchesQuery
    })
  }, [search, status])

  const filtersActive = search.trim().length > 0 || status !== 'All'

  const resetFilters = () => {
    setSearch('')
    setStatus('All')
  }

  const openLesson = (lesson: MyLesson) =>
    setDialog({
      title: `${actionLabels[lesson.status]} lesson`,
      description: `“${lesson.title}” would open here. The lesson player is not implemented yet — this is a UI prototype.`,
    })

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          My Lessons
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Continue your lessons, review completed topics, and keep your learning progress moving.
        </p>
      </div>

      {/* Search + status filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            aria-label="Search my lessons"
            placeholder="Search lessons..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter by status"
        >
          {statusFilters.map((option) => {
            const active = option === status
            return (
              <button
                key={option}
                type="button"
                aria-pressed={active}
                onClick={() => setStatus(option)}
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
          Showing {filtered.length} of {myLessons.length} lessons
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

      {/* Lesson grid or empty state */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {filtered.map((lesson) => (
            <LessonCard
              key={lesson.title}
              {...lesson}
              actionLabel={actionLabels[lesson.status]}
              onContinue={() => openLesson(lesson)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-base font-semibold text-neutral-900">No lessons found</h2>
          <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-neutral-500">
            {search.trim() ? `Nothing matches “${search.trim()}”` : 'No lessons'}
            {status !== 'All' ? ` with status “${status}”` : ''}. Try a different search or reset
            the filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Show all lessons
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
