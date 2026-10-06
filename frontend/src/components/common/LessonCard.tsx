// LessonCard — lesson in-progress card with progress bar and continue action.
//
import { ArrowRightIcon } from './Icons'
import ProgressBar from './ProgressBar'

interface LessonCardProps {
  subject: string
  subjectClass: string
  title: string
  description: string
  progress: number
}

export default function LessonCard({
  subject,
  subjectClass,
  title,
  description,
  progress,
}: LessonCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md">
      <span
        className={`inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${subjectClass}`}
      >
        {subject}
      </span>
      <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-neutral-900">
        {title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
      <div className="mt-auto pt-5">
        <div className="border-t border-neutral-100 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Progress</span>
            <span className="text-sm font-semibold text-neutral-900">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
          <button
            type="button"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Continue
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
