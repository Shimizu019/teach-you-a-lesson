// statusMeta.ts — shared presentation for assignment/quiz statuses so the list,
// cards, dashboard, and result views never disagree on labels or colors.
//
import type { AssignmentStatus } from './types'

export interface AssignmentStatusMeta {
  label: string
  chipClass: string
}

export const assignmentStatusMeta: Record<AssignmentStatus, AssignmentStatusMeta> = {
  'not-started': { label: 'Not started', chipClass: 'bg-neutral-100 text-neutral-600' },
  'in-progress': { label: 'In progress', chipClass: 'bg-amber-50 text-amber-700' },
  draft: { label: 'Draft saved', chipClass: 'bg-sky-50 text-sky-700' },
  submitted: { label: 'Submitted', chipClass: 'bg-indigo-50 text-indigo-700' },
  'awaiting-review': { label: 'Awaiting review', chipClass: 'bg-purple-50 text-purple-700' },
  completed: { label: 'Completed', chipClass: 'bg-emerald-50 text-emerald-700' },
}

/** Statuses that count as "still to do" for filters and summary cards. */
export const PENDING_STATUSES: AssignmentStatus[] = ['not-started', 'in-progress', 'draft']
