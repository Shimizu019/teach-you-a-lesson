// StatCard — summary statistic card for the dashboard overview.
//
import type { ComponentType } from 'react'

interface StatCardProps {
  label: string
  value: string
  hint: string
  hintClass: string
  iconChipClass: string
  icon: ComponentType<{ className?: string }>
}

export default function StatCard({
  label,
  value,
  hint,
  hintClass,
  iconChipClass,
  icon: Icon,
}: StatCardProps) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow duration-150 hover:shadow-md">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${iconChipClass}`}>
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-4 text-[1.75rem] font-semibold leading-none tracking-tight text-neutral-900">
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-neutral-500">{label}</p>
      <p className={`mt-1.5 text-xs font-medium ${hintClass}`}>{hint}</p>
    </article>
  )
}
