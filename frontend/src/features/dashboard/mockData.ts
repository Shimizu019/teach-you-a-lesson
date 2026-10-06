// mockData.ts — static mock data for the dashboard UI prototype.
// No real data, no backend, no persistence.
//
import type { ComponentType } from 'react'
import {
  BookIcon,
  BookOpenIcon,
  CalculatorIcon,
  CheckCircleIcon,
  ClockIcon,
  CodeIcon,
  EyeIcon,
  FlaskIcon,
  FlameIcon,
  PlayIcon,
  TrophyIcon,
} from '../../components/common/Icons'

type IconType = ComponentType<{ className?: string }>

export interface SummaryStat {
  label: string
  value: string
  hint: string
  hintClass: string
  iconChipClass: string
  icon: IconType
}

export interface LessonData {
  subject: string
  subjectClass: string
  title: string
  description: string
  progress: number
}

export interface SubjectData {
  name: string
  description: string
  lessonCount: number
  iconChipClass: string
  icon: IconType
}

export interface ActivityData {
  title: string
  detail: string
  time: string
  iconChipClass: string
  icon: IconType
}

export const summaryStats: SummaryStat[] = [
  {
    label: 'Lessons Completed',
    value: '24',
    hint: '+3 this week',
    hintClass: 'text-emerald-600',
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: CheckCircleIcon,
  },
  {
    label: 'Lessons In Progress',
    value: '6',
    hint: '2 due today',
    hintClass: 'text-amber-600',
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: BookOpenIcon,
  },
  {
    label: 'Study Time',
    value: '18.5h',
    hint: '+2.4h this week',
    hintClass: 'text-emerald-600',
    iconChipClass: 'bg-sky-50 text-sky-600',
    icon: ClockIcon,
  },
  {
    label: 'Current Streak',
    value: '12 days',
    hint: 'Personal best: 15 days',
    hintClass: 'text-neutral-500',
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: FlameIcon,
  },
]

export const lessons: LessonData[] = [
  {
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    title: 'Quadratic Equations',
    description:
      'Solve quadratic equations using factoring, completing the square, and the quadratic formula.',
    progress: 72,
  },
  {
    subject: 'Science',
    subjectClass: 'bg-emerald-50 text-emerald-700',
    title: 'Photosynthesis: Energy in Plants',
    description:
      'Understand how plants convert sunlight into chemical energy and why it matters for life on Earth.',
    progress: 45,
  },
  {
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    title: 'Introduction to Data Structures',
    description:
      'Explore arrays, linked lists, and stacks — the building blocks of efficient programs.',
    progress: 28,
  },
]

export const subjects: SubjectData[] = [
  {
    name: 'Mathematics',
    description: 'Numbers, algebra, and problem solving',
    lessonCount: 14,
    iconChipClass: 'bg-indigo-50 text-indigo-600',
    icon: CalculatorIcon,
  },
  {
    name: 'Science',
    description: 'Life, physical, and earth sciences',
    lessonCount: 11,
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: FlaskIcon,
  },
  {
    name: 'English',
    description: 'Reading, writing, and communication',
    lessonCount: 9,
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: BookIcon,
  },
  {
    name: 'Computer / IT',
    description: 'Programming and digital skills',
    lessonCount: 12,
    iconChipClass: 'bg-sky-50 text-sky-600',
    icon: CodeIcon,
  },
]

export const activities: ActivityData[] = [
  {
    title: 'Completed a lesson',
    detail: 'Quadratic Equations — Practice Set 3',
    time: '2h ago',
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: CheckCircleIcon,
  },
  {
    title: 'Started a new lesson',
    detail: 'Introduction to Data Structures',
    time: '5h ago',
    iconChipClass: 'bg-indigo-50 text-indigo-600',
    icon: PlayIcon,
  },
  {
    title: 'Reviewed a topic',
    detail: 'Cell Biology — Mitosis & Meiosis',
    time: 'Yesterday',
    iconChipClass: 'bg-sky-50 text-sky-600',
    icon: EyeIcon,
  },
  {
    title: 'Achieved a learning milestone',
    detail: '12-day study streak',
    time: 'Yesterday',
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: TrophyIcon,
  },
]
