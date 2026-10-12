// ActivitiesQuizzes.tsx — the Activities & Quizzes listing page.
// Frontend-only prototype: filters, search, summary cards, and navigation into
// the activity submission and quiz-taking flows. No backend, no persistence.
//
import { useMemo, useState } from 'react'
import StatCard from '../../components/common/StatCard'
import {
  BookOpenIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  ClockIcon,
  SearchIcon,
} from '../../components/common/Icons'
import { formatShortDate } from '../../utils/dates'
import { assignmentSubjects } from './mockData'
import { useAssignments } from './useAssignments'
import { DUE_SOON_DAYS, daysUntilDue, isFinishedStatus } from './assignmentUtils'
import { assignmentStatusMeta } from './statusMeta'
import type { Activity, AssignmentStatus, Quiz } from './types'

type TypeFilter = 'All' | 'Activities' | 'Quizzes'
type StatusFilter = 'All' | 'Pending' | 'Completed' | 'Overdue'

const typeFilters: TypeFilter[] = ['All', 'Activities', 'Quizzes']
const statusFilters: StatusFilter[] = ['All', 'Pending', 'Completed', 'Overdue']

interface ActivitiesQuizzesProps {
  onOpenActivity: (activity: Activity) => void
  onOpenQuiz: (quiz: Quiz) => void
}

function StatusChip({ status }: { status: AssignmentStatus }) {
  const meta = assignmentStatusMeta[status]
  return (
    <span className={`inline-flex flex-none rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.chipClass}`}>
      {meta.label}
    </span>
  )
}

function dueLabel(item: Activity | Quiz): string {
  if (!item.dueDate) return 'No due date'
  const days = daysUntilDue(item.dueDate)
  const date = formatShortDate(item.dueDate)
  if (days < 0) return `Overdue · ${date}`
  if (days === 0) return `Due today · ${date}`
  return `Due ${date}`
}

/** Primary action label derived from the item's effective status. */
function actionLabel(item: Activity | Quiz, status: AssignmentStatus): string {
  if (isFinishedStatus(status)) return item.kind === 'quiz' ? 'View results' : 'View submission'
  if (status === 'draft' || status === 'in-progress') {
    return item.kind === 'quiz' ? 'Resume quiz' : 'Continue'
  }
  return item.kind === 'quiz' ? 'Start quiz' : 'Start activity'
}

function FilterPill({
  active,
  onClick,
  children,
  hint,
}: {
  active: boolean
  onClick: () => void
  children: string
  hint?: number
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
        active
          ? 'border-indigo-600 bg-indigo-600 text-white'
          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
      }`}
    >
      {children}
      {typeof hint === 'number' && hint > 0 && (
        <span className={`text-[11px] font-semibold ${active ? 'text-indigo-100' : 'text-neutral-500'}`}>
          {hint}
        </span>
      )}
    </button>
  )
}

export default function ActivitiesQuizzes({ onOpenActivity, onOpenQuiz }: ActivitiesQuizzesProps) {
  const { allAssignments, getStatus, isOverdue, counts } = useAssignments()
  const [type, setType] = useState<TypeFilter>('All')
  const [status, setStatus] = useState<StatusFilter>('All')
  const [subject, setSubject] = useState('All')
  const [query, setQuery] = useState('')

  const subjects = useMemo(() => assignmentSubjects(), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allAssignments.filter((item) => {
      if (type === 'Activities' && item.kind !== 'activity') return false
      if (type === 'Quizzes' && item.kind !== 'quiz') return false
      if (subject !== 'All' && item.subject !== subject) return false
      const effective = getStatus(item.id)
      if (status === 'Pending' && isFinishedStatus(effective)) return false
      if (status === 'Completed' && !isFinishedStatus(effective)) return false
      if (status === 'Overdue' && !isOverdue(item)) return false
      if (q.length > 0 && !item.title.toLowerCase().includes(q)) return false
      return true
    })
  }, [allAssignments, type, status, subject, query, getStatus, isOverdue])

  const resetFilters = () => {
    setType('All')
    setStatus('All')
    setSubject('All')
    setQuery('')
  }
  const filtersActive =
    type !== 'All' || status !== 'All' || subject !== 'All' || query.trim() !== ''

  const open = (item: Activity | Quiz) => {
    if (item.kind === 'activity') onOpenActivity(item)
    else onOpenQuiz(item)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Activities &amp; Quizzes
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-500">
          View your assignments, complete quizzes, and track your progress.
        </p>
      </div>

      {/* Summary cards — counts derived from the same records as the list */}
      <section aria-label="Assignment summary" className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        <StatCard
          label="Pending"
          value={String(counts.pending)}
          hint="Still to complete"
          hintClass="text-indigo-600"
          iconChipClass="bg-indigo-50 text-indigo-600"
          icon={ClipboardListIcon}
        />
        <StatCard
          label="Due Soon"
          value={String(counts.dueSoon)}
          hint={`Within ${DUE_SOON_DAYS} days`}
          hintClass="text-amber-600"
          iconChipClass="bg-amber-50 text-amber-600"
          icon={ClockIcon}
        />
        <StatCard
          label="Completed"
          value={String(counts.completed)}
          hint="Submitted or graded"
          hintClass="text-emerald-600"
          iconChipClass="bg-emerald-50 text-emerald-600"
          icon={CheckCircleIcon}
        />
      </section>

      {/* Filters + search */}
      <div className="space-y-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="relative w-full sm:max-w-xs">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            aria-label="Search assignments"
            placeholder="Search by title…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 transition-colors duration-150 placeholder:text-neutral-400 hover:border-neutral-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {typeFilters.map((option) => (
            <FilterPill key={option} active={option === type} onClick={() => setType(option)}>
              {option}
            </FilterPill>
          ))}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
          {statusFilters.map((option) => (
            <FilterPill
              key={option}
              active={option === status}
              onClick={() => setStatus(option)}
              hint={option === 'Overdue' ? counts.overdue : undefined}
            >
              {option}
            </FilterPill>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="subject-filter" className="text-xs font-medium text-neutral-500">
            Subject
          </label>
          <select
            id="subject-filter"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-900 transition-colors duration-150 hover:border-neutral-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          >
            {['All', ...subjects].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
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
      </div>


      {/* Results */}
      <section aria-label="Assignments">
        <div className="mb-3 text-xs font-medium text-neutral-500">
          Showing {filtered.length} of {allAssignments.length} assignments
        </div>
        {filtered.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {filtered.map((item) => {
              const effective = getStatus(item.id)
              const overdue = isOverdue(item)
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => open(item)}
                    className="group flex h-full w-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:shadow-sm"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                        {item.kind === 'quiz' ? (
                          <CheckCircleIcon className="h-3.5 w-3.5" />
                        ) : (
                          <BookOpenIcon className="h-3.5 w-3.5" />
                        )}
                        {item.kind === 'quiz' ? 'Quiz' : 'Activity'}
                      </span>
                      <StatusChip status={effective} />
                    </span>
                    <span className="mt-3 block text-base font-semibold tracking-tight text-neutral-900">
                      {item.title}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
                      <span className={`rounded-full px-2 py-0.5 font-medium ${item.subjectClass}`}>
                        {item.subject}
                      </span>
                      <span>{item.teacher}</span>
                    </span>
                    {item.kind === 'quiz' && (
                      <span className="mt-2 text-xs text-neutral-500">
                        {item.questions.length} questions ·{' '}
                        {item.questions.reduce((sum, question) => sum + question.points, 0)} pts
                      </span>
                    )}
                    <span className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                      <span
                        className={`flex items-center gap-1.5 text-xs font-medium ${
                          overdue ? 'text-red-600' : 'text-neutral-600'
                        }`}
                      >
                        <ClockIcon className="h-3.5 w-3.5" />
                        {dueLabel(item)}
                      </span>
                      <span className="text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
                        {actionLabel(item, effective)}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm">
            <h3 className="text-base font-semibold text-neutral-900">No assignments match</h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-neutral-500">
              Nothing matches the selected filters. Try a different search or reset the filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

