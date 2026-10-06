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
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <span
        className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-medium ${subjectClass}`}
      >
        {subject}
      </span>
      <h3 className="mt-3 text-base font-semibold text-neutral-900">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{description}</p>
      <div className="mt-auto pt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-neutral-500">Progress</span>
          <span className="font-medium text-neutral-700">{progress}%</span>
        </div>
        <ProgressBar value={progress} />
        <button
          type="button"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue
          <ArrowRightIcon className="h-4 w-4" />
        </button>
      </div>
    </article>
  )
}
