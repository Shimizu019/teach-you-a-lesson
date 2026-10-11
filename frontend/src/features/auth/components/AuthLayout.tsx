// AuthLayout — shared page shell for the Login and Register screens.
// Frontend-only: provides branding, a neutral background, a centered white
// card and the prototype disclosure. Page-specific fields and headings
// belong in the children.
//
import type { ReactNode } from 'react'
import { GraduationCapIcon } from '../../../components/common/Icons'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mb-6 flex items-center gap-2.5 sm:mb-8">
        <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-indigo-600 text-white shadow-sm">
          <GraduationCapIcon className="h-6 w-6" />
        </span>
        <p className="text-lg font-semibold tracking-tight text-neutral-900">Teach You a Lesson</p>
      </div>
      <main className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div
          role="note"
          className="mb-5 rounded-xl border border-indigo-100 bg-indigo-50 px-3.5 py-2.5 text-xs leading-relaxed text-indigo-900"
        >
          <span className="font-semibold">Prototype.</span> No real accounts exist — nothing you
          enter is stored, sent, or checked. Submitting simply opens the demo dashboard.
        </div>
        {children}
      </main>
    </div>
  )
}
