// assignmentUtils — pure helpers shared by the assignments UI.
// Kept out of AssignmentsContext.tsx so that file only exports components
// (React fast refresh requirement, matching the auth feature's layout).
//
import type { AssignmentStatus } from './types'

/** "Due soon" window, in days, for the summary card. */
export const DUE_SOON_DAYS = 3

/** Normalize an identification answer: trim + collapse whitespace + lowercase. */
export function normalizeAnswer(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLowerCase()
}

/** Whole days from today until the due date (negative = overdue). */
export function daysUntilDue(dueDate: string): number {
  const [y, m, d] = dueDate.split('-').map(Number)
  const due = new Date(y, m - 1, d)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((due.getTime() - today.getTime()) / (24 * 60 * 60 * 1000))
}

/** Whether a status represents a finished (submitted/graded) item. */
export function isFinishedStatus(status: AssignmentStatus): boolean {
  return status === 'completed' || status === 'awaiting-review'
}