// SubjectCard — interactive subject card.
// Optional props (category, progress) extend it for the Subjects page;
// the Dashboard usage renders unchanged without them.
//
import type { ComponentType } from 'react'
import { ChevronRightIcon } from './Icons'
import ProgressBar from './ProgressBar'

interface SubjectCardProps {
  name: string
  description: string
  lessonCount: number
  iconChipClass: string
  icon: ComponentType<{ className?: string }>
  onSelect: () => void
  category?: string
  categoryClass?: string
  completedLessons?: number
  actionLabel?: string
}

export default function SubjectCard({
  name,
  description,
  lessonCount,
  iconChipClass,
  icon: Icon,
  onSelect,
  category,
  categoryClass,
  completedLessons,
  actionLabel,
}: SubjectCardProps) {
  const progress =
    typeof completedLessons === 'number' && lessonCount > 0
      ? Math.round((completedLessons / lessonCount) * 100)
      : null

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open subject ${name}`}
      className="group block w-full rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:shadow-sm"
    >
      <span className="flex items-start justify-between gap-3">
        <span className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${iconChipClass}`}>
          <Icon className="h-5 w-5" />
        </span>
        {category && (
          <span
            className={`inline-flex flex-none rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${categoryClass ?? 'bg-neutral-100 text-neutral-600'}`}
          >
            {category}
          </span>
        )}
      </span>
      <span className="mt-4 block text-base font-semibold tracking-tight text-neutral-900">
        {name}
      </span>
      <span className="mt-1 line-clamp-2 block min-h-10 text-sm leading-relaxed text-neutral-500">
        {description}
      </span>
      <span className="mt-4 block border-t border-neutral-100 pt-3">
        {progress !== null && (
          <span className="mb-2.5 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">
              {completedLessons} of {lessonCount} lessons
            </span>
            <span className="text-xs font-semibold text-neutral-900">{progress}%</span>
          </span>
        )}
        <span className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500">
            {progress !== null ? (
              <span className="sr-only">
                {completedLessons} of {lessonCount} lessons completed
              </span>
            ) : (
              `${lessonCount} lessons`
            )}
            <span aria-hidden="true" className="text-xs font-medium text-indigo-600">
              {actionLabel ?? 'View Lessons'}
            </span>
          </span>
          <ChevronRightIcon className="h-4 w-4 text-neutral-400 transition-colors duration-150 group-hover:text-indigo-600" />
        </span>
        {progress !== null && (
          <span className="mt-2 block">
            <ProgressBar value={progress} />
          </span>
        )}
      </span>
    </button>
  )
}
