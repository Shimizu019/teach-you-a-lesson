// SettingsCard — shared white card wrapper used by every settings section.
//
import type { ComponentType, ReactNode } from 'react'

interface SettingsCardProps {
  title: string
  description?: string
  icon?: ComponentType<{ className?: string }>
  children: ReactNode
}

export default function SettingsCard({ title, description, icon: Icon, children }: SettingsCardProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-indigo-50 text-indigo-600">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-tight text-neutral-900">{title}</h2>
          {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}