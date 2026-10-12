// ActivitiesQuizzes.tsx — activities + quizzes page prototype.
// Frontend-only: static mock data, no submissions, no scoring, no backend.
//
// Activities and quizzes are listed as two clearly separated groups so the
// student can tell them apart. Nothing here records or claims submissions.
//
import { useState } from 'react'
import PlaceholderDialog from '../../components/common/PlaceholderDialog'
import { CheckCircleIcon, ClockIcon } from '../../components/common/Icons'
import { formatShortDate, isToday } from '../../utils/dates'
import { activities, assignmentStatusMeta, quizzes, type Assignment, type Quiz } from './mockData'

interface DialogState {
  title: string
  description: string
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-sm">
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-neutral-500">{message}</p>
    </div>
  )
}

function StatusChip({ status }: { status: Assignment['status'] }) {
  const meta = assignmentStatusMeta[status]
  return (
    <span
      className={`inline-flex flex-none rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.chipClass}`}
    >
      {meta.label}
    </span>
  )
}

/** Card used for activity assignments. */
function ActivityCard({ activity, onOpen }: { activity: Assignment; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group block w-full rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:shadow-sm"
    >
      <span className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          Activity
        </span>
        <StatusChip status={activity.status} />
      </span>
      <span className="mt-3 block text-base font-semibold tracking-tight text-neutral-900">
        {activity.title}
      </span>
      <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
        <span className={`rounded-full px-2 py-0.5 font-medium ${activity.subjectClass}`}>
          {activity.subject}
        </span>
        <span>{activity.teacher}</span>
      </span>
      <span className="mt-3 block border-t border-neutral-100 pt-3 text-xs text-neutral-500">
        {activity.detail}
      </span>
      <span className="mt-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-700">
          <ClockIcon className="h-3.5 w-3.5" />
          Due {formatShortDate(activity.dueDate)}
          {isToday(activity.dueDate) ? ' (today)' : ''}
        </span>
        <span className="text-xs font-medium text-indigo-600 group-hover:text-indigo-700">
          Open activity
        </span>
      </span>
    </button>
  )
}

/** Compact row used for quizzes, which carry questions/due/status. */
function QuizRow({ quiz, onOpen }: { quiz: Quiz; onOpen: () => void }) {
  return (
    <li className="flex flex-col gap-3 border-b border-neutral-100 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-neutral-900">{quiz.title}</p>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
          <span className={`rounded-full px-2 py-0.5 font-medium ${quiz.subjectClass}`}>
            {quiz.subject}
          </span>
          <span>{quiz.teacher}</span>
          <span>{quiz.questions} questions</span>
          <span>Due {formatShortDate(quiz.dueDate)}</span>
        </p>
      </div>
      <div className="flex flex-none items-center gap-3">
        <StatusChip status={quiz.status} />
        <button
          type="button"
          onClick={onOpen}
          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-indigo-600 transition-colors duration-150 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Open
        </button>
      </div>
    </li>
  )
}

export default function ActivitiesQuizzes() {
  const [dialog, setDialog] = useState<DialogState | null>(null)

  const openQuiz = (quiz: Quiz) =>
    setDialog({
      title: quiz.title,
      description:
        `The quiz engine is not implemented yet, so "${quiz.title}" cannot be taken here — ` +
        `this is a UI prototype using mock data. Status shown: ${assignmentStatusMeta[quiz.status].label}.`,
    })

  const openActivity = (activity: Assignment) =>
    setDialog({
      title: activity.title,
      description:
        'Activity submission is not implemented yet — this is a UI prototype using mock data. ' +
        `Status shown: ${assignmentStatusMeta[activity.status].label}.`,
    })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Activities &amp; Quizzes
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Assignments from your enrolled subjects. Activities and quizzes are listed separately so
          you can tell them apart.
        </p>
      </div>

      <section aria-label="Activities" className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
          Activities
          <span className="ml-2 text-sm font-medium text-neutral-500">
            {activities.length} assigned
          </span>
        </h2>
        {activities.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onOpen={() => openActivity(activity)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No activities yet"
            message="When a teacher assigns an activity it will appear here."
          />
        )}
      </section>

      <section aria-label="Quizzes" className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
            Quizzes
            <span className="ml-2 text-sm font-medium text-neutral-500">
              {quizzes.length} total
            </span>
          </h2>
          <p className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
            <CheckCircleIcon className="h-3.5 w-3.5" />
            Taking a quiz is not implemented in this prototype
          </p>
        </div>
        {quizzes.length > 0 ? (
          <ul className="rounded-2xl border border-neutral-200 bg-white px-5 shadow-sm">
            {quizzes.map((quiz) => (
              <QuizRow key={quiz.id} quiz={quiz} onOpen={() => openQuiz(quiz)} />
            ))}
          </ul>
        ) : (
          <EmptyState
            title="No quizzes yet"
            message="When a teacher publishes a quiz it will appear here."
          />
        )}
      </section>

      {dialog && (
        <PlaceholderDialog
          title={dialog.title}
          description={dialog.description}
          onClose={() => setDialog(null)}
        />
      )}
    </div>
  )
}

