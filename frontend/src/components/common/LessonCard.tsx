// LessonCard — lesson card with progress bar and a status-aware action.
// Optional props (status, study time, module) extend it for My Lessons;
// the Dashboard usage renders unchanged without them.
//
import { ArrowRightIcon, ClockIcon } from './Icons'
import ProgressBar from './ProgressBar'

interface LessonCardProps {
  subject: string
  subjectClass: string
  title: string
  description: string
  progress: number
  onContinue: () => void
  status?: string
  statusClass?: string
  studyTime?: string
  moduleInfo?: string
  actionLabel?: string
}

export default function LessonCard({
  subject,
  subjectClass,
  title,
  description,
  progress,
  onContinue,
  status,
  statusClass,
  studyTime,
  moduleInfo,
  actionLabel,
}: LessonCardProps) {
  const label = actionLabel ?? 'Continue'
  return (
    <article className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${subjectClass}`}
        >
          {subject}
        </span>
        {status && (
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusClass ?? 'bg-neutral-100 text-neutral-600'}`}
          >
            {status}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight text-neutral-900">
        {title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-neutral-500">
        {description}
      </p>
      {(studyTime || moduleInfo) && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-neutral-500">
          <ClockIcon className="h-4 w-4 flex-none text-neutral-400" />
          {studyTime}
          {moduleInfo && <span className="text-neutral-400">· {moduleInfo}</span>}
        </p>
      )}
      <div className="mt-auto pt-5">
        <div className="border-t border-neutral-100 pt-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Progress</span>
            <span className="text-sm font-semibold text-neutral-900">{progress}%</span>
          </div>
          <ProgressBar value={progress} />
          <button
            type="button"
            onClick={onContinue}
            aria-label={`${label} lesson ${title}`}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            {label}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
