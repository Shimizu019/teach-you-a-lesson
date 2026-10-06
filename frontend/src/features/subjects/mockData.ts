// mockData.ts — static subject data for the Subjects prototype.
// Frontend-only; no backend, no persistence.
//
import type { ComponentType } from 'react'
import {
  BookIcon,
  BookOpenIcon,
  CalculatorIcon,
  ChartIcon,
  CodeIcon,
  FlaskIcon,
  LayersIcon,
  SettingsIcon,
} from '../../components/common/Icons'

type IconType = ComponentType<{ className?: string }>

export const categoryFilters = ['All', 'STEM', 'Languages', 'Computer / IT'] as const
export type CategoryFilter = (typeof categoryFilters)[number]

export type SubjectCategory = Exclude<CategoryFilter, 'All'>

export interface Subject {
  name: string
  category: SubjectCategory
  categoryClass: string
  description: string
  lessonCount: number
  completedLessons: number
  iconChipClass: string
  icon: IconType
}

export const subjects: Subject[] = [
  {
    name: 'Mathematics',
    category: 'STEM',
    categoryClass: 'bg-indigo-50 text-indigo-700',
    description:
      'Build confidence with equations, statistics, algebra, and problem solving.',
    lessonCount: 14,
    completedLessons: 9,
    iconChipClass: 'bg-indigo-50 text-indigo-600',
    icon: CalculatorIcon,
  },
  {
    name: 'Science',
    category: 'STEM',
    categoryClass: 'bg-indigo-50 text-indigo-700',
    description: 'Explore biology, chemistry, physics, and the world around you.',
    lessonCount: 11,
    completedLessons: 6,
    iconChipClass: 'bg-emerald-50 text-emerald-600',
    icon: FlaskIcon,
  },
  {
    name: 'English',
    category: 'Languages',
    categoryClass: 'bg-amber-50 text-amber-700',
    description: 'Improve grammar, reading, writing, and communication skills.',
    lessonCount: 9,
    completedLessons: 7,
    iconChipClass: 'bg-amber-50 text-amber-600',
    icon: BookIcon,
  },
  {
    name: 'Filipino',
    category: 'Languages',
    categoryClass: 'bg-amber-50 text-amber-700',
    description: 'Practice Filipino language, reading, writing, and communication.',
    lessonCount: 8,
    completedLessons: 3,
    iconChipClass: 'bg-rose-50 text-rose-600',
    icon: BookOpenIcon,
  },
  {
    name: 'Computer Science',
    category: 'Computer / IT',
    categoryClass: 'bg-sky-50 text-sky-700',
    description:
      'Learn programming, algorithms, data structures, and computing concepts.',
    lessonCount: 12,
    completedLessons: 4,
    iconChipClass: 'bg-sky-50 text-sky-600',
    icon: CodeIcon,
  },
  {
    name: 'Web Development',
    category: 'Computer / IT',
    categoryClass: 'bg-sky-50 text-sky-700',
    description: 'Learn HTML, CSS, JavaScript, and modern web development.',
    lessonCount: 10,
    completedLessons: 5,
    iconChipClass: 'bg-violet-50 text-violet-600',
    icon: LayersIcon,
  },
  {
    name: 'Information Technology',
    category: 'Computer / IT',
    categoryClass: 'bg-sky-50 text-sky-700',
    description: 'Explore databases, networking, systems, and information technology.',
    lessonCount: 8,
    completedLessons: 2,
    iconChipClass: 'bg-cyan-50 text-cyan-600',
    icon: SettingsIcon,
  },
  {
    name: 'Physics',
    category: 'STEM',
    categoryClass: 'bg-indigo-50 text-indigo-700',
    description: 'Understand motion, forces, energy, electricity, and physical systems.',
    lessonCount: 7,
    completedLessons: 1,
    iconChipClass: 'bg-teal-50 text-teal-600',
    icon: ChartIcon,
  },
]
