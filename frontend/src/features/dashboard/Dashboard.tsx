// Dashboard — composes dashboard sections using static mock data.
// All interactions are frontend-only prototype behaviors.
//
// Data ownership (single source of truth — nothing is duplicated here):
//   subjects -> features/subjects/mockData.ts    (enrolled subjects + teachers)
//   lessons  -> features/my-lessons/mockData.ts  (lessons with assignment dates)
//   quizzes  -> features/assignments/mockData.ts (activities + quizzes)
// Every statistic below is DERIVED from those records, so a card count always
// matches the list it links to.
//
import { useState } from 'react'
import ActivityItem from '../../components/common/ActivityItem'
import LessonCard from '../../components/common/LessonCard'
import PlaceholderDialog from '../../components/common/PlaceholderDialog'
import StatCard from '../../components/common/StatCard'
import SubjectCard from '../../components/common/SubjectCard'
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ClockIcon,
  LayersIcon,
} from '../../components/common/Icons'
import {
  activityFeed,
  attendanceStreakIcon,
  attendanceSummary,
  sortByNewest,
} from './mockData'
import { subjects } from '../subjects/mockData'
import { myLessons } from '../my-lessons/mockData'
import { formatLongDate, formatShortDate, isToday } from '../../utils/dates'
import {
  assignmentStatusMeta,
  newAssignmentCount,
  pendingQuizzes,
  quizzes,
  type Quiz,
} from '../assignments/mockData'

interface DialogState {
  title: string
  description: string
}

interface DashboardProps {
  searchQuery: string
  onClearSearch: () => void
  /** Navigates the shell (the same mechanism the sidebar uses). */
  onNavigate: (item: string) => void
  /** Opens My Lessons pre-filtered to today's records. */
  onOpenTodaysLessons: () => void
}

// The greeting date comes from the browser's own clock. Captured once at module
// scope (not per render) so it stays stable and free of impure calls in render.
const TODAY_LABEL = formatLongDate(new Date())

function SectionHeader({
  title,
  count,
  action,
  onAction,
}: {
  title: string
  count?: string
  action?: string
  onAction?: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
        {title}
        {count && <span className="ml-2 text-sm font-medium text-neutral-500">{count}</span>}
      </h2>
      {action && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="rounded-md text-sm font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {action}
        </button>
      )}
    </div>
  )
}

export default function Dashboard({
  searchQuery,
  onClearSearch,
  onNavigate,
  onOpenTodaysLessons,
}: DashboardProps) {
  const [dialog, setDialog] = useState<DialogState | null>(null)

  const query = searchQuery.trim().toLowerCase()
  const isSearching = query.length > 0

  // --- Derived statistics (each matches the list it links to) ---------------
  const enrolledSubjectCount = subjects.length
  const todaysLessons = myLessons.filter((lesson) => isToday(lesson.assignedOn))
  const todaysLessonCount = todaysLessons.length
  const assignmentCount = newAssignmentCount
  const attendanceStreak = `${attendanceSummary.streakDays}-day streak`

  // --- Filtering (local, mock data only) ------------------------------------
  const matches = (...fields: string[]) => fields.join(' ').toLowerCase().includes(query)

  const feed = sortByNewest(activityFeed)
  const visibleFeed = isSearching
    ? feed.filter((item) => matches(item.title, item.detail, item.subject ?? ''))
    : feed
  const visibleSubjects = isSearching
    ? subjects.filter((subject) => matches(subject.name, subject.description, subject.teacher))
    : subjects
  const visibleQuizzes = isSearching
    ? quizzes.filter((quiz) => matches(quiz.title, quiz.subject, quiz.teacher))
    : quizzes
  // "Continue learning" only ever shows lessons the student has started.
  const inProgressLessons = myLessons.filter((lesson) => lesson.status === 'In Progress')
  const visibleLessons = isSearching
    ? inProgressLessons.filter((lesson) =>
        matches(lesson.subject, lesson.title, lesson.description, lesson.moduleInfo),
      )
    : inProgressLessons

  const noResults =
    isSearching &&
    visibleFeed.length === 0 &&
    visibleSubjects.length === 0 &&
    visibleQuizzes.length === 0 &&
    visibleLessons.length === 0

  const openLesson = (title: string) =>
    setDialog({
      title: 'Lesson content',
      description: `"${title}" would open here. The lesson player is not implemented yet — this is a UI prototype using mock data.`,
    })

  const openSubject = (name: string, teacher: string) =>
    setDialog({
      title: name,
      description: `Taught by ${teacher}. The subject detail view is not implemented yet — this is a UI prototype using mock data.`,
    })

  const openQuiz = (quiz: Quiz) =>
    setDialog({
      title: quiz.title,
      description:
        `The quiz engine is not implemented yet, so "${quiz.title}" cannot be taken here — ` +
        `this is a UI prototype using mock data. Status shown: ${assignmentStatusMeta[quiz.status].label}.`,
    })

  const openAttendance = () =>
    setDialog({
      title: 'Attendance (demo data)',
      description:
        'Demo records only — there is no attendance backend in this prototype. ' +
        `${attendanceSummary.present} present, ${attendanceSummary.absent} absent, ` +
        `${attendanceSummary.late} late across ${attendanceSummary.sessions} sessions.`,
    })

  const goToSubjects = () => onNavigate('Subjects')
  const goToAssignments = () => onNavigate('Activities & Quizzes')
  const goToTodaysLessons = onOpenTodaysLessons

  const handleHeroContinue = () => {
    const next = inProgressLessons[0] ?? myLessons[0]
    if (next) openLesson(next.title)
  }

  const handleBrowseSubjects = () =>
    document.getElementById('subjects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome / hero — the greeting is the primary focus; the date is secondary */}
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
          {TODAY_LABEL}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Welcome back
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-500 sm:text-base">
          Continue your lessons, review completed topics, and keep your learning progress moving.
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

      {/* Learning overview — four statistics, each derived from its own list */}
      <section
        aria-label="Learning overview"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4"
      >
        <StatCard
          label="Enrolled Subjects"
          value={String(enrolledSubjectCount)}
          hint="Subjects you are enrolled in"
          hintClass="text-indigo-600"
          iconChipClass="bg-indigo-50 text-indigo-600"
          icon={LayersIcon}
          action="View all"
          onAction={goToSubjects}
        />
        <StatCard
          label="Today's Lessons"
          value={String(todaysLessonCount)}
          hint={
            todaysLessonCount === 0
              ? 'No lessons scheduled today'
              : `Assigned ${todaysLessonCount === 1 ? 'lesson' : 'lessons'} for today`
          }
          hintClass="text-amber-600"
          iconChipClass="bg-amber-50 text-amber-600"
          icon={BookOpenIcon}
          action="View all"
          onAction={goToTodaysLessons}
        />
        <StatCard
          label="Activities & Quizzes"
          value={`${assignmentCount} new`}
          hint={
            assignmentCount === 0
              ? 'Nothing new to finish'
              : `${pendingQuizzes.length} quiz${pendingQuizzes.length === 1 ? '' : 'zes'} + ${
                  assignmentCount - pendingQuizzes.length
                } activities`
          }
          hintClass="text-purple-600"
          iconChipClass="bg-purple-50 text-purple-600"
          icon={CheckCircleIcon}
          action="View all"
          onAction={goToAssignments}
        />
        <StatCard
          label="Attendance"
          value={attendanceStreak}
          hint="Consecutive days present (demo data)"
          hintClass="text-neutral-500"
          iconChipClass="bg-emerald-50 text-emerald-600"
          icon={attendanceStreakIcon}
          action="View all"
          onAction={openAttendance}
        />
      </section>

      {/* Continue Learning — lessons the student has started */}
      <section aria-label="Continue learning">
        <SectionHeader
          title="Continue Learning"
          count={`${inProgressLessons.length} in progress`}
          action="View all"
          onAction={goToTodaysLessons}
        />
        {visibleLessons.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {visibleLessons.map((lesson) => (
              <LessonCard
                key={lesson.title}
                {...lesson}
                onContinue={() => openLesson(lesson.title)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center shadow-sm">
            <h3 className="text-base font-semibold text-neutral-900">Nothing in progress</h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-neutral-500">
              {isSearching
                ? `No in-progress lessons match "${query}".`
                : 'Start a lesson from My Lessons and it will show up here.'}
            </p>
          </div>
        )}
      </section>

      {/* 1. Recent Activity */}
      <section aria-label="Recent activity">
        <SectionHeader title="Recent Activity" count={`${feed.length} events`} />
        <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          {visibleFeed.length > 0 ? (
            <ul className="divide-y divide-neutral-100">
              {visibleFeed.map((item) => (
                <ActivityItem
                  key={item.id}
                  title={item.title}
                  detail={item.detail}
                  time={item.time}
                  iconChipClass={item.iconChipClass}
                  icon={item.icon}
                />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">
              {isSearching ? `No activity matches "${query}".` : 'No recent activity yet.'}
            </p>
          )}
          <p className="mt-4 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
            Demo events built from mock records — this is not a live activity stream.
          </p>
        </div>
      </section>

      {/* 2. Subjects */}
      <section id="subjects" aria-label="Subjects" className="scroll-mt-24">
        <SectionHeader
          title="Subjects"
          count={`${subjects.length} enrolled`}
          action="View all"
          onAction={goToSubjects}
        />
        {visibleSubjects.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {visibleSubjects.map((subject) => (
              <SubjectCard
                key={subject.name}
                name={subject.name}
                description={subject.description}
                lessonCount={subject.lessonCount}
                iconChipClass={subject.iconChipClass}
                icon={subject.icon}
                category={subject.category}
                categoryClass={subject.categoryClass}
                completedLessons={subject.completedLessons}
                onSelect={() => openSubject(subject.name, subject.teacher)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center shadow-sm">
            <h3 className="text-base font-semibold text-neutral-900">No subjects found</h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-neutral-500">
              {isSearching
                ? `No enrolled subject matches "${query}".`
                : 'You have no subjects yet.'}
            </p>
          </div>
        )}
      </section>

      {/* 3. Quizzes */}
      <section aria-label="Quizzes">
        <SectionHeader
          title="Quizzes"
          count={`${quizzes.length} total`}
          action="View all"
          onAction={goToAssignments}
        />
        {visibleQuizzes.length > 0 ? (
          <ul className="mt-4 rounded-2xl border border-neutral-200 bg-white px-5 shadow-sm">
            {visibleQuizzes.map((quiz) => (
              <li
                key={quiz.id}
                className="flex flex-col gap-3 border-b border-neutral-100 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">{quiz.title}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-neutral-500">
                    <span className={`rounded-full px-2 py-0.5 font-medium ${quiz.subjectClass}`}>
                      {quiz.subject}
                    </span>
                    <span>{quiz.teacher}</span>
                    <span>{quiz.questions} questions</span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="h-3.5 w-3.5" />
                      Due {formatShortDate(quiz.dueDate)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-none items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      assignmentStatusMeta[quiz.status].chipClass
                    }`}
                  >
                    {assignmentStatusMeta[quiz.status].label}
                  </span>
                  <button
                    type="button"
                    onClick={() => openQuiz(quiz)}
                    className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-indigo-600 transition-colors duration-150 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  >
                    Open
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center shadow-sm">
            <h3 className="text-base font-semibold text-neutral-900">No quizzes yet</h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-relaxed text-neutral-500">
              {isSearching
                ? `No quiz matches "${query}".`
                : 'When a teacher publishes a quiz it will appear here.'}
            </p>
          </div>
        )}
        <p className="mt-3 text-xs text-neutral-500">
          Taking a quiz is not implemented yet — these are mock assignments only.
        </p>
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
