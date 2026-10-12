// mockData.ts — static assignment data (activities + quizzes) for the UI prototype.
// Frontend-only; no backend, no persistence, no submission tracking.
//
// This module is the SINGLE SOURCE OF TRUTH for quiz records. The dashboard and
// the Activities & Quizzes page both import from here so counts and lists can
// never disagree.
//
import { isoDaysFromNow } from '../../utils/dates'

export type QuizStatus = 'new' | 'in-progress' | 'completed'

export interface QuizStatusMeta {
  label: string
  chipClass: string
}

export const quizStatusMeta: Record<QuizStatus, QuizStatusMeta> = {
  new: { label: 'New', chipClass: 'bg-indigo-50 text-indigo-700' },
  'in-progress': { label: 'In Progress', chipClass: 'bg-amber-50 text-amber-700' },
  completed: { label: 'Completed', chipClass: 'bg-emerald-50 text-emerald-700' },
}

export interface Quiz {
  id: string
  title: string
  subject: string
  subjectClass: string
  teacher: string
  questions: number
  status: QuizStatus
  /** Local ISO date the quiz was published. */
  date: string
  /** Local ISO date the quiz is due. */
  dueDate: string
}

// Dates are generated relative to the day the app is opened so that "due"
// information always reads sensibly in a demo.
export const quizzes: Quiz[] = [
  {
    id: 'quiz-quadratics',
    title: 'Quadratic Equations Quiz',
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    teacher: 'Teacher Benju',
    questions: 10,
    status: 'completed',
    date: isoDaysFromNow(-3),
    dueDate: isoDaysFromNow(2),
  },
  {
    id: 'quiz-photosynthesis',
    title: 'Photosynthesis Quiz',
    subject: 'Science',
    subjectClass: 'bg-emerald-50 text-emerald-700',
    teacher: 'Teacher Ana',
    questions: 8,
    status: 'new',
    date: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(5),
  },
  {
    id: 'quiz-data-structures',
    title: 'Data Structures Quiz',
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    teacher: 'Teacher Benju',
    questions: 12,
    status: 'in-progress',
    date: isoDaysFromNow(-1),
    dueDate: isoDaysFromNow(3),
  },
  {
    id: 'quiz-essay',
    title: 'Persuasive Essay Review Quiz',
    subject: 'English',
    subjectClass: 'bg-amber-50 text-amber-700',
    teacher: 'Teacher Maria',
    questions: 6,
    status: 'new',
    date: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(7),
  },
]

/** Quizzes the student has not finished yet — part of the dashboard count. */
export const pendingQuizzes = quizzes.filter((quiz) => quiz.status !== 'completed')

export type AssignmentKind = 'activity' | 'quiz'

export interface Assignment {
  id: string
  kind: AssignmentKind
  title: string
  subject: string
  subjectClass: string
  teacher: string
  /** Short summary such as "10 problems · individual". */
  detail: string
  status: QuizStatus
  date: string
  dueDate: string
}

//
// Activities. These are task assignments (exercises, seatwork, projects) —
// deliberately separate from the Recent Activity *event feed* on the dashboard.
//
export const activities: Assignment[] = [
  {
    id: 'act-quadratic-set',
    kind: 'activity',
    title: 'Quadratic Equations — Practice Set 4',
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    teacher: 'Teacher Benju',
    detail: '10 problems · individual',
    status: 'new',
    date: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(1),
  },
  {
    id: 'act-cell-model',
    kind: 'activity',
    title: 'Plant Cell Model Worksheet',
    subject: 'Science',
    subjectClass: 'bg-emerald-50 text-emerald-700',
    teacher: 'Teacher Ana',
    detail: 'Group activity · 4 members',
    status: 'new',
    date: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(4),
  },
  {
    id: 'act-html-layout',
    kind: 'activity',
    title: 'Build a Two-Column Web Layout',
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    teacher: 'Teacher Benju',
    detail: 'Submit HTML + CSS',
    status: 'in-progress',
    date: isoDaysFromNow(-2),
    dueDate: isoDaysFromNow(2),
  },
]

/** Activities + quizzes the student still has to finish. */
export const pendingAssignments: Assignment[] = [
  ...activities.filter((activity) => activity.status !== 'completed'),
  ...pendingQuizzes.map((quiz) => ({
    ...quiz,
    kind: 'quiz' as const,
    detail: `${quiz.questions} questions`,
  })),
]

/** Total new (unfinished) assignments — the dashboard "Activities & Quizzes" count. */
export const newAssignmentCount = pendingAssignments.length

/** Shared status presentation so the card, page, and dialog never disagree. */
export const assignmentStatusMeta = quizStatusMeta

