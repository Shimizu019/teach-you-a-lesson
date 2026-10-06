// Progress — part 1: header, overall progress, statistics.
import { useMemo, useState } from 'react'
import PlaceholderDialog from '../../components/common/PlaceholderDialog'
import ProgressBar from '../../components/common/ProgressBar'
import StatCard from '../../components/common/StatCard'
import { ClockIcon } from '../../components/common/Icons'
import {
  achievements,
  overallProgress,
  progressStats,
  subjectProgress,
  weeklyActivity,
  type Achievement,
  type SubjectProgress,
} from './mockData'

interface DialogState {
  title: string
  description: string
}

export default function Progress() {
  const [dialog, setDialog] = useState<DialogState | null>(null)

  const maxHours = useMemo(
    () => Math.max(...weeklyActivity.map((entry) => entry.hours), 1),
    [],
  )
  const weekTotal = useMemo(
    () => weeklyActivity.reduce((total, entry) => total + entry.hours, 0),
    [],
  )

  const openSubject = (subject: SubjectProgress) => {
    const percent = Math.round((subject.completedLessons / subject.totalLessons) * 100)
    setDialog({
      title: subject.name,
      description: `${subject.completedLessons} of ${subject.totalLessons} lessons done (${percent}%). Details coming in a future version.`,
    })
  }

  const openAchievement = (achievement: Achievement) =>
    setDialog({
      title: achievement.title,
      description: `${achievement.description} Details coming in a future version.`,
    })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Your Progress
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Track your learning progress and see how far you&apos;ve come.
        </p>
      </div>

      <section
        aria-labelledby="overall-progress-heading"
        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-none items-center justify-center">
            <div
              className="grid h-28 w-28 place-items-center rounded-full bg-indigo-50"
              role="img"
              aria-label={`Overall progress ${overallProgress.percent} percent`}
            >
              <p className="text-3xl font-semibold tracking-tight text-indigo-700">
                {overallProgress.percent}%
              </p>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2
              id="overall-progress-heading"
              className="text-lg font-semibold tracking-tight text-neutral-900"
            >
              Overall Progress
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-neutral-500">
              {overallProgress.completedLessons} of {overallProgress.totalLessons} lessons
              completed
            </p>
            <div className="mt-3">
              <ProgressBar value={overallProgress.percent} />
            </div>
            <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              <div>
                <dt className="text-xs font-medium text-neutral-500">Remaining</dt>
                <dd className="mt-0.5 text-sm font-semibold text-neutral-900">
                  {overallProgress.remainingLessons} lessons
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-neutral-500">Studied</dt>
                <dd className="mt-0.5 flex items-center gap-1.5 text-sm font-semibold text-neutral-900">
                  <ClockIcon className="h-4 w-4 text-neutral-400" />
                  {overallProgress.studyTime}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section aria-label="Progress statistics">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {progressStats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
              hintClass={stat.hintClass}
              iconChipClass={stat.iconChipClass}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="subject-progress-heading">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2
            id="subject-progress-heading"
            className="text-lg font-semibold tracking-tight text-neutral-900"
          >
            Subject Progress
          </h2>
          <p className="text-xs font-medium text-neutral-500">
            {subjectProgress.length} subjects
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {subjectProgress.map((subject) => {
            const percent = Math.round(
              (subject.completedLessons / subject.totalLessons) * 100,
            )
            const Icon = subject.icon
            return (
              <button
                key={subject.name}
                type="button"
                onClick={() => openSubject(subject)}
                aria-label={`View ${subject.name} progress`}
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition-all duration-150 hover:border-neutral-300 hover:shadow-md active:border-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`grid h-9 w-9 flex-none place-items-center rounded-xl ${subject.iconChipClass}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold tracking-tight text-neutral-900">
                      {subject.name}
                    </span>
                    <span className="block text-xs text-neutral-500">
                      {subject.completedLessons} / {subject.totalLessons} lessons
                    </span>
                  </span>
                  <span className="ml-auto flex-none text-sm font-semibold text-neutral-900">
                    {percent}%
                  </span>
                </span>
                <span className="mt-3 block">
                  <ProgressBar value={percent} />
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
        <section
          aria-labelledby="weekly-activity-heading"
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h2
              id="weekly-activity-heading"
              className="text-lg font-semibold tracking-tight text-neutral-900"
            >
              Weekly Activity
            </h2>
            <p className="text-xs font-medium text-neutral-500">
              {weekTotal.toFixed(1)}h total
            </p>
          </div>
          <div
            className="mt-5 flex items-end justify-between gap-2"
            role="img"
            aria-label="Study time per day this week"
          >
            {weeklyActivity.map((entry) => {
              const barHeight =
                entry.hours === 0 ? 4 : Math.max(12, (entry.hours / maxHours) * 96)
              return (
                <div
                  key={entry.day}
                  className="flex min-w-0 flex-1 flex-col items-center gap-2"
                >
                  <span className="text-[11px] font-medium text-neutral-500">
                    {entry.hours === 0 ? '—' : entry.hours.toFixed(1)}
                  </span>
                  <div
                    title={`${entry.day}: ${entry.hours.toFixed(1)}h`}
                    className={`w-full max-w-10 rounded-lg ${
                      entry.hours === 0 ? 'bg-neutral-100' : 'bg-indigo-600/90'
                    }`}
                    style={{ height: `${barHeight}px` }}
                  />
                  <span className="text-[11px] font-medium text-neutral-500">
                    {entry.shortDay}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="mt-4 border-t border-neutral-100 pt-3 text-xs leading-relaxed text-neutral-500">
            Hours studied each day this week.
          </p>
        </section>

        <section
          aria-labelledby="achievements-heading"
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <h2
              id="achievements-heading"
              className="text-lg font-semibold tracking-tight text-neutral-900"
            >
              Recent Achievements
            </h2>
            <p className="text-xs font-medium text-neutral-500">
              {achievements.length} earned
            </p>
          </div>
          <ul className="mt-2 divide-y divide-neutral-100">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <li key={achievement.title}>
                  <button
                    type="button"
                    onClick={() => openAchievement(achievement)}
                    aria-label={`View achievement: ${achievement.title}`}
                    className="flex w-full items-center gap-3.5 rounded-xl py-3.5 text-left transition-colors duration-150 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    <span
                      className={`grid h-10 w-10 flex-none place-items-center rounded-xl ${achievement.iconChipClass}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug text-neutral-900">
                        {achievement.title}
                      </span>
                      <span className="block truncate text-xs leading-relaxed text-neutral-500">
                        {achievement.description}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

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
