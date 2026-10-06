// mockData.ts — static progress data for the Progress prototype.
// Frontend-only; no backend, no persistence.
//
import type { ComponentType } from 'react'
import {
  BookIcon,
  BookOpenIcon,
  CalculatorIcon,
  ChartIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeIcon,
  EyeIcon,
  FlameIcon,
  FlaskIcon,
  LayersIcon,
  PlayIcon,
  SettingsIcon,
  TrophyIcon,
} from '../../components/common/Icons'

type IconType = ComponentType<{ className?: string }>

export interface OverallProgress {
  percent: number
  completedLessons: number
  totalLessons: number
  remainingLessons: number
  studyTime: string
}

export const overallProgress: OverallProgress = {
  percent: 47,
  completedLessons: 37,
  totalLessons: 79,
  remainingLessons: 42,
  studyTime: '24.5 hours',
}

export interface ProgressStat {
  label: string
  value: string
  hint: string
  hintClass: string
  iconChipClass: string
  icon: IconType
}

export const progressStats: ProgressStat[] = [
  {
    label: 'Lessons Completed',
    value: '37',
    hint: '+3 this week',
    hintClass: 'text-emerald-600',
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: CheckCircleIcon,
  },
  {
    label: 'Lessons In Progress',
    value: '6',
    hint: 'Across 4 subjects',
    hintClass: 'text-neutral-500',
    iconChipClass: 'bg-indigo-50 text-indigo-600',
    icon: PlayIcon,
  },
  {
    label: 'Study Time',
    value: '24.5h',
    hint: '6.2h this week',
    hintClass: 'text-neutral-500',
    iconChipClass: 'bg-sky-50 text-sky-600',
    icon: ClockIcon,
  },
  {
    label: 'Current Streak',
    value: '12 days',
    hint: 'Personal best: 18 days',
    hintClass: 'text-amber-600',
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: FlameIcon,
  },
]

export interface SubjectProgress {
  name: string
  completedLessons: number
  totalLessons: number
  iconChipClass: string
  icon: IconType
}

export const subjectProgress: SubjectProgress[] = [
  { name: 'Mathematics', completedLessons: 9, totalLessons: 14, iconChipClass: 'bg-indigo-50 text-indigo-600', icon: CalculatorIcon },
  { name: 'Science', completedLessons: 6, totalLessons: 11, iconChipClass: 'bg-emerald-50 text-emerald-600', icon: FlaskIcon },
  { name: 'Physics', completedLessons: 1, totalLessons: 7, iconChipClass: 'bg-teal-50 text-teal-600', icon: ChartIcon },
  { name: 'English', completedLessons: 7, totalLessons: 9, iconChipClass: 'bg-amber-50 text-amber-600', icon: BookIcon },
  { name: 'Filipino', completedLessons: 3, totalLessons: 8, iconChipClass: 'bg-rose-50 text-rose-600', icon: BookOpenIcon },
  { name: 'Computer Science', completedLessons: 4, totalLessons: 12, iconChipClass: 'bg-sky-50 text-sky-600', icon: CodeIcon },
  { name: 'Web Development', completedLessons: 5, totalLessons: 10, iconChipClass: 'bg-violet-50 text-violet-600', icon: LayersIcon },
  { name: 'Information Technology', completedLessons: 2, totalLessons: 8, iconChipClass: 'bg-cyan-50 text-cyan-600', icon: SettingsIcon },
]

export interface StudyDay {
  day: string
  shortDay: string
  hours: number
}

export const weeklyActivity: StudyDay[] = [
  { day: 'Monday', shortDay: 'Mon', hours: 1.5 },
  { day: 'Tuesday', shortDay: 'Tue', hours: 0.8 },
  { day: 'Wednesday', shortDay: 'Wed', hours: 2.1 },
  { day: 'Thursday', shortDay: 'Thu', hours: 0 },
  { day: 'Friday', shortDay: 'Fri', hours: 1.2 },
  { day: 'Saturday', shortDay: 'Sat', hours: 0.4 },
  { day: 'Sunday', shortDay: 'Sun', hours: 0.2 },
]

export interface Achievement {
  title: string
  description: string
  iconChipClass: string
  icon: IconType
}

export const achievements: Achievement[] = [
  {
    title: 'First 10 Lessons',
    description: 'Completed your first 10 lessons.',
    iconChipClass: 'bg-indigo-50 text-indigo-600',
    icon: TrophyIcon,
  },
  {
    title: '7 Day Streak',
    description: 'Studied 7 days in a row.',
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: FlameIcon,
  },
  {
    title: 'Mathematics Milestone',
    description: 'Finished half of Mathematics.',
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: CalculatorIcon,
  },
  {
    title: 'Consistent Learner',
    description: 'Studied 5 hours in one week.',
    iconChipClass: 'bg-sky-50 text-sky-600',
    icon: EyeIcon,
  },
]
