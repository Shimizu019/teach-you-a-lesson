// Dashboard — composes dashboard sections using static mock data.
// All interactions are frontend-only prototype behaviors.
//
import { useState } from 'react'
import ActivityItem from '../../components/common/ActivityItem'
import LessonCard from '../../components/common/LessonCard'
import PlaceholderDialog from '../../components/common/PlaceholderDialog'
import StatCard from '../../components/common/StatCard'
import SubjectCard from '../../components/common/SubjectCard'
import { ArrowRightIcon } from '../../components/common/Icons'
import { activities, lessons, subjects, summaryStats } from './mockData'

interface DialogState {
  title: string
  description: string
}

interface DashboardProps {
  searchQuery: string
  onClearSearch: () => void
}

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

export default function Dashboard({ searchQuery, onClearSearch }: DashboardProps) {
  const [dialog, setDialog] = useState<DialogState | null>(null)

  const query = searchQuery.trim().toLowerCase()
  const isSearching = query.length > 0

  const filteredLessons = isSearching
    ? lessons.filter((lesson) =>
        `${lesson.subject} ${lesson.title} ${lesson.description}`.toLowerCase().includes(query),
      )
    : lessons
  const filteredSubjects = isSearching
    ? subjects.filter((subject) =>
        `${subject.name} ${subject.description}`.toLowerCase().includes(query),
      )
    : subjects
  const filteredActivities = isSearching
    ? activities.filter((activity) =>
        `${activity.title} ${activity.detail}`.toLowerCase().includes(query),
      )
    : activities

  const noResults =
    isSearching &&
    filteredLessons.length === 0 &&
    filteredSubjects.length === 0 &&
    filteredActivities.length === 0

  const openLesson = (title: string) =>
    setDialog({
      title: 'Continue lesson',
      description: `“${title}” would open here. The lesson player is not implemented yet — this is a UI prototype.`,
    })

  const openSubject = (name: string, lessonCount: number) =>
    setDialog({
      title: name,
      description: `The ${name} subject view is not implemented yet — it will hold ${lessonCount} lessons in a later phase. This is a UI prototype.`,
    })

  const handleHeroContinue = () => {
    const next = filteredLessons[0] ?? lessons[0]
    openLesson(next.title)
  }

  const handleBrowseSubjects = () => {
    document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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
            onClick={handleHeroContinue}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-indigo-700 active:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Continue Learning
            <ArrowRightIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleBrowseSubjects}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 active:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Browse Subjects
          </button>
        </div>
      </section>

      {/* Search: no results */}
      {noResults && (
        <section className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-semibold text-neutral-900">
            No results for &ldquo;{searchQuery.trim()}&rdquo;
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Try a different keyword, or clear the search.
          </p>
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-300 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Clear search
          </button>
        </section>
      )}

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
        {filteredLessons.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {filteredLessons.map((lesson) => (
              <LessonCard
                key={lesson.title}
                {...lesson}
                onContinue={() => openLesson(lesson.title)}
              />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-neutral-500">No lessons match your search.</p>
        )}
      </section>

      {/* Subjects + Recent Activity */}
      <section className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
        <div id="subjects" className="scroll-mt-24 lg:col-span-2">
          <SectionHeader title="Subjects" action="View all" />
          {filteredSubjects.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              {filteredSubjects.map((subject) => (
                <SubjectCard
                  key={subject.name}
                  {...subject}
                  onSelect={() => openSubject(subject.name, subject.lessonCount)}
                />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-neutral-500">No subjects match your search.</p>
          )}
        </div>
        <div className="lg:col-span-1">
          <SectionHeader title="Recent Activity" action="View all" />
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            {filteredActivities.length > 0 ? (
              <ul className="divide-y divide-neutral-100">
                {filteredActivities.map((activity) => (
                  <ActivityItem key={activity.title + activity.time} {...activity} />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-500">No activity matches your search.</p>
            )}
          </div>
        </div>
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
