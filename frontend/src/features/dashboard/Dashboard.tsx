// Dashboard — composes all dashboard sections using static mock data.
//
import ActivityItem from '../../components/common/ActivityItem'
import LessonCard from '../../components/common/LessonCard'
import StatCard from '../../components/common/StatCard'
import SubjectCard from '../../components/common/SubjectCard'
import { ArrowRightIcon } from '../../components/common/Icons'
import { activities, lessons, subjects, summaryStats } from './mockData'

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900">{title}</h2>
      {action && (
        <button
          type="button"
          className="rounded-md text-sm font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {action}
        </button>
      )}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome / hero */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          Tuesday, October 6, 2026
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Welcome back, Learner
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
          Continue where you left off, review your lessons, and keep your learning streak going.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Continue Learning
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 active:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Browse Subjects
          </button>
        </div>
      </section>

      {/* Learning overview */}
      <section
        aria-label="Learning overview"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
      >
        {summaryStats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Continue Learning */}
      <section aria-label="Continue learning">
        <SectionHeader title="Continue Learning" action="View all" />
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.title} {...lesson} />
          ))}
        </div>
      </section>

      {/* Subjects + Recent Activity */}
      <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader title="Subjects" action="View all" />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {subjects.map((subject) => (
              <SubjectCard key={subject.name} {...subject} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <SectionHeader title="Recent Activity" action="View all" />
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <ul className="divide-y divide-neutral-100">
              {activities.map((activity) => (
                <ActivityItem key={activity.title + activity.time} {...activity} />
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
