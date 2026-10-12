// mockData.ts — static mock data for the dashboard UI prototype.
// No real data, no backend, no persistence.
//
// Data that has a proper feature owner lives with that feature and is imported
// from here for display only, so counts and lists can never disagree:
//   subjects  -> features/subjects/mockData.ts   (includes teacher names)
//   lessons   -> features/my-lessons/mockData.ts  (includes assignment dates)
//   quizzes   -> features/assignments/mockData.ts
//
import type { ComponentType } from 'react'
import {
  CheckCircleIcon,
  EyeIcon,
  FlameIcon,
  PlayIcon,
  TrophyIcon,
} from '../../components/common/Icons'
import { isoDaysFromNow, localTimestamp } from '../../utils/dates'

type IconType = ComponentType<{ className?: string }>

export interface ActivityData {
  id: string
  title: string
  detail: string
  time: string
  /** ISO timestamp, used to sort the feed chronologically (newest first). */
  timestamp: string
  /** Related subject, when the event belongs to one. */
  subject?: string
  iconChipClass: string
  icon: IconType
}

//
// Recent Activity — classroom events built from the same demo records used
// elsewhere (lesson uploads, published quizzes, assigned activities, attendance).
// Timestamps are demo values relative to the day the app is opened. These are
// NOT live system events: there is no real-time or synchronization layer.
//
/**
 * Recent Activity feed. Exported under an explicit name so it is never confused
 * with the activity *assignments* owned by features/assignments/mockData.ts.
 */
export const activityFeed: ActivityData[] = [
  {
    id: 'feed-lesson-1',
    title: 'New lesson uploaded',
    detail: 'Quadratic Equations',
    subject: 'Mathematics',
    time: 'Today, 8:30 AM',
    timestamp: localTimestamp(isoDaysFromNow(0), 8, 30),
    iconChipClass: 'bg-indigo-50 text-indigo-600',
    icon: PlayIcon,
  },
  {
    id: 'feed-quiz-1',
    title: 'New quiz published',
    detail: 'Photosynthesis Quiz — 8 questions',
    subject: 'Science',
    time: 'Today, 7:45 AM',
    timestamp: localTimestamp(isoDaysFromNow(0), 7, 45),
    iconChipClass: 'bg-purple-50 text-purple-600',
    icon: CheckCircleIcon,
  },
  {
    id: 'feed-activity-1',
    title: 'Activity assigned',
    detail: 'Quadratic Equations — Practice Set 4',
    subject: 'Mathematics',
    time: 'Yesterday, 4:15 PM',
    timestamp: localTimestamp(isoDaysFromNow(-1), 16, 15),
    iconChipClass: 'bg-sky-50 text-sky-600',
    icon: PlayIcon,
  },
  {
    id: 'feed-attendance-1',
    title: 'Attendance recorded',
    detail: 'Marked present for Computer / IT',
    subject: 'Computer / IT',
    time: 'Yesterday, 1:05 PM',
    timestamp: localTimestamp(isoDaysFromNow(-1), 13, 5),
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: CheckCircleIcon,
  },
  {
    id: 'feed-lesson-2',
    title: 'Completed a lesson',
    detail: 'Linear Equations & Inequalities',
    subject: 'Mathematics',
    time: '2 days ago, 6:00 PM',
    timestamp: localTimestamp(isoDaysFromNow(-2), 18, 0),
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: TrophyIcon,
  },
  {
    id: 'feed-review-1',
    title: 'Reviewed a topic',
    detail: 'Persuasive Essay Writing',
    subject: 'English',
    time: '2 days ago, 5:20 PM',
    timestamp: localTimestamp(isoDaysFromNow(-2), 17, 20),
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: EyeIcon,
  },
]

//
// Attendance — DEMONSTRATION DATA ONLY.
// No attendance backend or persistence exists in this prototype, so these are
// fixed demo values, not recorded classroom data. Kept separate from the
// enrollment/learning models because attendance is its own feature.
//
export interface AttendanceSummary {
  /** Consecutive days the student is shown as present (demo value). */
  streakDays: number
  /** Demo per-status tallies across the recorded sessions. */
  present: number
  absent: number
  late: number
  /** Total demo attendance sessions. */
  sessions: number
}

export const attendanceSummary: AttendanceSummary = {
  streakDays: 3,
  present: 8,
  absent: 1,
  late: 0,
  sessions: 9,
}

export const attendanceStreakIcon = FlameIcon

/** Newest first, using the ISO timestamps. */
export function sortByNewest<T extends { timestamp: string }>(items: readonly T[]): T[] {
  return [...items].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}
