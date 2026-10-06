// PlaceholderView — stand-in view for navigation items not yet implemented.
// Frontend-only; the real views arrive in later feature phases.
//
import { BookOpenIcon } from './Icons'

interface PlaceholderViewProps {
  title: string
  onBack: () => void
}

export default function PlaceholderView({ title, onBack }: PlaceholderViewProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm sm:p-12">
      <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-indigo-50 text-indigo-600">
        <BookOpenIcon className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-xl font-semibold tracking-tight text-neutral-900">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-neutral-500">
        This section is planned for a later phase. The {title} view will be built when its
        feature phase begins — this is a UI prototype.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        Back to Dashboard
      </button>
    </section>
  )
}
