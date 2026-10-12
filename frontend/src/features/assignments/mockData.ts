// mockData.ts — static assignment data (activities + quizzes) for the interactive
// prototype. Frontend-only; no backend, no persistence.
//
// This module is the SINGLE SOURCE OF TRUTH for assignment records. The listing
// page, submission/quiz flows, and the dashboard all import from here. Live
// student progress (drafts, submissions, attempts) is layered on top by
// AssignmentsContext — it never mutates this seed data.
//
// Answer keys below are DEMO ONLY and intentionally client-side. They are not
// secure and must never be used for real, graded examinations.
//
import { isoDaysFromNow } from '../../utils/dates'
import type { Activity, Quiz } from './types'

export type { Activity, Quiz } from './types'

/** Activities — task assignments across several enrolled subjects. */
export const activities: Activity[] = [
  {
    id: 'act-quadratic-set',
    kind: 'activity',
    title: 'Quadratic Equations — Practice Set 4',
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    teacher: 'Teacher Benju',
    instructions:
      'Solve the ten quadratic equations in Practice Set 4. Show your complete solution for each item using factoring or the quadratic formula. Type your final answers in the response box.',
    assignedDate: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(1),
    submissionMethods: ['text'],
    requireText: true,
    maxPoints: 20,
    baseStatus: 'not-started',
  },
  {
    id: 'act-cell-model',
    kind: 'activity',
    title: 'Plant Cell Model Worksheet',
    subject: 'Science',
    subjectClass: 'bg-emerald-50 text-emerald-700',
    teacher: 'Teacher Ana',
    instructions:
      'Label the parts of a plant cell on the provided worksheet, then photograph or scan your completed work and attach it here. This is a group activity — submit one file per group.',
    assignedDate: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(4),
    submissionMethods: ['file'],
    requireFile: true,
    maxPoints: 15,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'application/pdf'],
    maxFileSizeBytes: 5 * 1024 * 1024,
    baseStatus: 'not-started',
  },
  {
    id: 'act-html-layout',
    kind: 'activity',
    title: 'Build a Two-Column Web Layout',
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    teacher: 'Teacher Benju',
    instructions:
      'Create a responsive two-column layout using HTML and CSS. Attach your files as a single archive or screenshot, and describe your approach in the response box.',
    assignedDate: isoDaysFromNow(-2),
    dueDate: isoDaysFromNow(2),
    submissionMethods: ['text', 'file'],
    requireText: true,
    acceptedFileTypes: ['image/png', 'image/jpeg', 'application/zip'],
    maxFileSizeBytes: 5 * 1024 * 1024,
    baseStatus: 'not-started',
  },
  {
    id: 'act-essay-outline',
    kind: 'activity',
    title: 'Persuasive Essay Outline',
    subject: 'English',
    subjectClass: 'bg-amber-50 text-amber-700',
    teacher: 'Teacher Maria',
    instructions:
      'Draft an outline for a persuasive essay on a topic of your choice. Include your thesis statement, three supporting arguments, and a conclusion.',
    assignedDate: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(6),
    submissionMethods: ['text'],
    requireText: true,
    maxPoints: 25,
    baseStatus: 'not-started',
  },
  {
    id: 'act-reading-reflection',
    kind: 'activity',
    title: 'Filipino Reading Reflection',
    subject: 'Filipino',
    subjectClass: 'bg-rose-50 text-rose-700',
    teacher: 'Teacher Jose',
    instructions:
      'Write a short reflection on the assigned Filipino short story. This activity has no deadline — submit when you are ready.',
    assignedDate: isoDaysFromNow(-1),
    submissionMethods: ['text'],
    requireText: true,
    maxPoints: 10,
    baseStatus: 'not-started',
  },
]

/** Quizzes — multiple-choice and identification items with demo answer keys. */
export const quizzes: Quiz[] = [
  {
    id: 'quiz-quadratics',
    kind: 'quiz',
    title: 'Quadratic Equations Quiz',
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    teacher: 'Teacher Benju',
    instructions: 'Answer all questions. Your score is shown immediately after you submit.',
    assignedDate: isoDaysFromNow(-3),
    dueDate: isoDaysFromNow(2),
    resultVisibility: 'after-submit',
    grading: 'auto',
    baseStatus: 'not-started',
    questions: [
      {
        id: 'q-quad-1',
        type: 'multiple-choice',
        text: 'What are the solutions to x² − 5x + 6 = 0?',
        points: 2,
        choices: ['x = 1 or 6', 'x = 2 or 3', 'x = −2 or −3', 'x = −1 or 6'],
        correctChoice: 1,
      },
      {
        id: 'q-quad-2',
        type: 'identification',
        text: 'In one word, what is b² − 4ac called?',
        points: 3,
        acceptedAnswers: ['discriminant'],
      },
      {
        id: 'q-quad-3',
        type: 'multiple-choice',
        text: 'A quadratic equation has a degree of…',
        points: 2,
        choices: ['1', '2', '3', '4'],
        correctChoice: 1,
      },
    ],
  },
  {
    id: 'quiz-photosynthesis',
    kind: 'quiz',
    title: 'Photosynthesis Quiz',
    subject: 'Science',
    subjectClass: 'bg-emerald-50 text-emerald-700',
    teacher: 'Teacher Ana',
    instructions: 'A short check on how plants convert light into energy.',
    assignedDate: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(5),
    resultVisibility: 'always',
    grading: 'auto',
    baseStatus: 'not-started',
    questions: [
      {
        id: 'q-photo-1',
        type: 'multiple-choice',
        text: 'Which gas do plants absorb from the air during photosynthesis?',
        points: 2,
        choices: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
        correctChoice: 1,
      },
      {
        id: 'q-photo-2',
        type: 'multiple-choice',
        text: 'Where in the plant cell does photosynthesis mainly occur?',
        points: 2,
        choices: ['Nucleus', 'Mitochondria', 'Chloroplast', 'Ribosome'],
        correctChoice: 2,
      },
      {
        id: 'q-photo-3',
        type: 'identification',
        text: 'Name the green pigment that captures light energy.',
        points: 2,
        acceptedAnswers: ['chlorophyll'],
      },
    ],
  },
  {
    id: 'quiz-data-structures',
    kind: 'quiz',
    title: 'Data Structures Quiz',
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    teacher: 'Teacher Benju',
    instructions: 'This quiz has a 15-minute time limit. Answer before the timer runs out.',
    assignedDate: isoDaysFromNow(-1),
    dueDate: isoDaysFromNow(3),
    timeLimitMinutes: 15,
    resultVisibility: 'after-submit',
    grading: 'auto',
    baseStatus: 'not-started',
    questions: [
      {
        id: 'q-ds-1',
        type: 'multiple-choice',
        text: 'Which data structure follows Last-In-First-Out (LIFO)?',
        points: 2,
        choices: ['Queue', 'Stack', 'Linked list', 'Tree'],
        correctChoice: 1,
      },
      {
        id: 'q-ds-2',
        type: 'multiple-choice',
        text: 'Which structure follows First-In-First-Out (FIFO)?',
        points: 2,
        choices: ['Stack', 'Queue', 'Heap', 'Graph'],
        correctChoice: 1,
      },
      {
        id: 'q-ds-3',
        type: 'identification',
        text: 'What is the time complexity of accessing an array element by index? (e.g. O(1))',
        points: 3,
        acceptedAnswers: ['o(1)', 'o1', 'constant'],
      },
    ],
  },

  {
    id: 'quiz-essay-review',
    kind: 'quiz',
    title: 'Persuasive Essay Review Quiz',
    subject: 'English',
    subjectClass: 'bg-amber-50 text-amber-700',
    teacher: 'Teacher Maria',
    instructions:
      'This quiz is graded manually by your teacher. Your score will appear once it is reviewed.',
    assignedDate: isoDaysFromNow(0),
    dueDate: isoDaysFromNow(7),
    resultVisibility: 'after-submit',
    grading: 'manual',
    baseStatus: 'not-started',
    questions: [
      {
        id: 'q-essay-1',
        type: 'multiple-choice',
        text: 'A thesis statement should appear in which part of a persuasive essay?',
        points: 2,
        choices: ['Conclusion', 'Introduction', 'Body paragraph 3', 'Title'],
        correctChoice: 1,
      },
      {
        id: 'q-essay-2',
        type: 'identification',
        text: 'What term describes evidence that supports a claim with facts or data?',
        points: 3,
        acceptedAnswers: ['support', 'supporting evidence', 'evidence'],
      },
    ],
  },
  {
    id: 'quiz-filipino-vocab',
    kind: 'quiz',
    title: 'Filipino Vocabulary Quiz',
    subject: 'Filipino',
    subjectClass: 'bg-rose-50 text-rose-700',
    teacher: 'Teacher Jose',
    instructions: 'Match each Filipino word to its meaning. Scores are kept private for this quiz.',
    assignedDate: isoDaysFromNow(-1),
    dueDate: isoDaysFromNow(8),
    resultVisibility: 'never',
    grading: 'auto',
    baseStatus: 'not-started',
    questions: [
      {
        id: 'q-fil-1',
        type: 'multiple-choice',
        text: 'What does "araw" mean in English?',
        points: 2,
        choices: ['Moon', 'Sun / day', 'Star', 'Rain'],
        correctChoice: 1,
      },
      {
        id: 'q-fil-2',
        type: 'multiple-choice',
        text: 'Which word means "book"?',
        points: 2,
        choices: ['Lapiz', 'Aklat', 'Mesa', 'Pinto'],
        correctChoice: 1,
      },
    ],
  },
]

/** All assignment items in one array (activities first, then quizzes). */
export const allAssignments = [...activities, ...quizzes]

/** Total possible points for a quiz (sum of question points). */
export function quizTotalPoints(quiz: Quiz): number {
  return quiz.totalPoints ?? quiz.questions.reduce((sum, question) => sum + question.points, 0)
}

/** Distinct subjects that have at least one assignment. */
export function assignmentSubjects(): string[] {
  return Array.from(new Set(allAssignments.map((item) => item.subject)))
}

