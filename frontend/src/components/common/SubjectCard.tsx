// SubjectCard — subject/category card for the dashboard.
//
import type { ComponentType } from 'react'

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
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${iconChipClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-neutral-900">{name}</h3>
      <p className="mt-1 text-sm text-neutral-500">{description}</p>
      <p className="mt-3 text-xs font-medium text-neutral-400">{lessonCount} lessons</p>
    </article>
  )
}
