// types.ts — shared TypeScript models for the interactive Activities & Quizzes
// prototype. Frontend-only; no backend, no persistence beyond session state.
//
// Status uses a discriminated union of defined states rather than loose strings
// so the list, summary cards, dashboard, and detail views can never disagree.

/** How a student may submit an activity. */
export type SubmissionMethod = 'text' | 'file'

/** Supported question types for the demo quiz engine. */
export type QuestionType = 'multiple-choice' | 'identification'

/** When correct answers / results become visible to the student. */
export type ResultVisibility = 'always' | 'after-submit' | 'never'

/** Whether a submitted quiz can be auto-scored or needs manual grading. */
export type GradingMode = 'auto' | 'manual'

/** Seed status stored in mock data (before any session interaction). */
export type BaseStatus = 'not-started' | 'in-progress'

/**
 * Effective status shown to the student, combining seed data with live session
 * state (drafts, submissions, attempts).
 */
export type AssignmentStatus =
  | 'not-started'
  | 'in-progress'
  | 'draft'
  | 'submitted'
  | 'awaiting-review'
  | 'completed'

export interface StatusMeta {
  label: string
  chipClass: string
}

interface QuestionBase {
  id: string
  text: string
  points: number
}

export interface MultipleChoiceQuestion extends QuestionBase {
  type: 'multiple-choice'
  choices: string[]
  /** Index into `choices` that is correct (demo answer key). */
  correctChoice: number
}

export interface IdentificationQuestion extends QuestionBase {
  type: 'identification'
  /** Accepted answers, compared case-insensitively with trimmed whitespace. */
  acceptedAnswers: string[]
}

export type Question = MultipleChoiceQuestion | IdentificationQuestion

export interface Activity {
  id: string
  kind: 'activity'
  title: string
  subject: string
  subjectClass: string
  teacher: string
  instructions: string
  /** Local ISO date the activity was assigned. */
  assignedDate: string
  /** Local ISO due date; undefined when the activity has no deadline. */
  dueDate?: string
  submissionMethods: SubmissionMethod[]
  /** Marks a submission method as mandatory. */
  requireText?: boolean
  requireFile?: boolean
  maxPoints?: number
  /** Allowed file MIME types when file submission is permitted. */
  acceptedFileTypes?: string[]
  /** Maximum file size in bytes when file submission is permitted. */
  maxFileSizeBytes?: number
  baseStatus: BaseStatus
}

export interface Quiz {
  id: string
  kind: 'quiz'
  title: string
  subject: string
  subjectClass: string
  teacher: string
  instructions: string
  assignedDate: string
  dueDate?: string
  questions: Question[]
  /** Sum of question points; derived when omitted. */
  totalPoints?: number
  resultVisibility: ResultVisibility
  grading: GradingMode
  /** Optional countdown in minutes; only set when a time limit is configured. */
  timeLimitMinutes?: number
  /** Optional attempt limit; undefined means unlimited. */
  attemptsAllowed?: number
  baseStatus: BaseStatus
}

export type AssignmentItem = Activity | Quiz

/** A student's activity submission/draft, tracked in session state. */
export interface ActivitySubmission {
  text: string
  file?: { name: string; size: number }
  savedDraftAt?: string
  submittedAt?: string
}

/** A student's quiz attempt, tracked in session state. */
export interface QuizAttempt {
  /** Map of questionId -> the student's answer. */
  answers: Record<string, string>
  startedAt: string
  submittedAt?: string
  /** Auto-computed score when the quiz is auto-graded. */
  score?: number
  correctCount?: number
  totalPoints?: number
}
