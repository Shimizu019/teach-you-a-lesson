// SubjectCard — subject/category card for the dashboard.
//
import type { ComponentType } from 'react'
import { ChevronRightIcon } from './Icons'

interface SubjectCardProps {
  name: string
  description: string
  lessonCount: number
  iconChipClass: string
  icon: ComponentType<{ className?: string }>
}

export default function SubjectCard({
  name,
  description,
  lessonCount,
  iconChipClass,
  icon: Icon,
}: SubjectCardProps) {
  return (
    <article className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${iconChipClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-neutral-900">{name}</h3>
      <p className="mt-1 text-sm leading-relaxed text-neutral-500">{description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
        <span className="text-xs font-medium text-neutral-500">{lessonCount} lessons</span>
        <ChevronRightIcon className="h-4 w-4 text-neutral-400 transition-colors duration-150 group-hover:text-indigo-600" />
      </div>
    </article>
  )
}
