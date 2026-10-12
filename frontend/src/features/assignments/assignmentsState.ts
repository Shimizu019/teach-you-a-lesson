// assignmentsState — the React context object + shared value type for the
// assignments session state. Separate from AssignmentsContext.tsx (the provider
// component) so React fast refresh keeps working, matching the auth feature.
//
import { createContext } from 'react'
import type { Activity, ActivitySubmission, AssignmentStatus, Quiz, QuizAttempt } from './types'

/** Result of grading a submitted quiz attempt. */
export interface QuizGrade {
  score: number
  totalPoints: number
  correctCount: number
  totalQuestions: number
  /** True when the quiz can be auto-scored. */
  autoGraded: boolean
}

export interface AssignmentsContextValue {
  activities: Activity[]
  quizzes: Quiz[]
  allAssignments: (Activity | Quiz)[]
  /** Effective status of an assignment, merging seed data + session state. */
  getStatus: (id: string) => AssignmentStatus
  getActivitySubmission: (id: string) => ActivitySubmission | undefined
  getQuizAttempt: (id: string) => QuizAttempt | undefined
  /** Save a draft (does not submit). */
  saveActivityDraft: (id: string, data: { text: string; file?: { name: string; size: number } }) => void
  /** Final submission for an activity. */
  submitActivity: (id: string, data: { text: string; file?: { name: string; size: number } }) => void
  /** Create or resume an attempt (records startedAt once). */
  startQuiz: (id: string) => void
  /** Record/overwrite a single answer within the current attempt. */
  setQuizAnswer: (id: string, questionId: string, value: string) => void
  /** Finalize a quiz attempt and compute an auto-score when possible. */
  submitQuiz: (id: string) => QuizGrade | null
  /** Grade an attempt against the quiz's answer keys. */
  gradeQuiz: (quiz: Quiz, attempt: QuizAttempt) => QuizGrade
  /** Whether an item is past its due date and still unfinished. */
  isOverdue: (item: Activity | Quiz) => boolean
  /** Derived summary counts for the summary cards. */
  counts: { pending: number; dueSoon: number; completed: number; overdue: number }
}

export const AssignmentsContext = createContext<AssignmentsContextValue | null>(null)
