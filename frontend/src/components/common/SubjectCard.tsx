// SubjectCard — interactive subject card for the dashboard.
// Clicking provides frontend-only placeholder feedback.
//
import type { ComponentType } from 'react'
import { ChevronRightIcon } from './Icons'

interface SubjectCardProps {
  name: string
  description: string
  lessonCount: number
  iconChipClass: string
  icon: ComponentType<{ className?: string }>
  onSelect: () => void
}

export default function SubjectCard({
  name,
  description,
  lessonCount,
  iconChipClass,
  icon: Icon,
  onSelect,
}: SubjectCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open subject ${name}`}
      className="group block w-full rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:shadow-sm"
    >
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${iconChipClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="mt-4 block text-base font-semibold tracking-tight text-neutral-900">
        {name}
      </span>
      <span className="mt-1 block text-sm leading-relaxed text-neutral-500">{description}</span>
      <span className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
        <span className="text-xs font-medium text-neutral-500">{lessonCount} lessons</span>
        <ChevronRightIcon className="h-4 w-4 text-neutral-400 transition-colors duration-150 group-hover:text-indigo-600" />
      </span>
    </button>
  )
}
