// ActivityItem — single recent-activity row.
//
import type { ComponentType } from 'react'

interface ActivityItemProps {
  title: string
  detail: string
  time: string
  iconChipClass: string
  icon: ComponentType<{ className?: string }>
}

export default function ActivityItem({
  title,
  detail,
  time,
  iconChipClass,
  icon: Icon,
}: ActivityItemProps) {
  return (
    <li className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
      <span className={`grid h-9 w-9 flex-none place-items-center rounded-lg ${iconChipClass}`}>
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-neutral-900">{title}</p>
        <p className="mt-0.5 truncate text-xs text-neutral-500">{detail}</p>
      </div>
      <span className="flex-none text-xs text-neutral-400">{time}</span>
    </li>
  )
}
