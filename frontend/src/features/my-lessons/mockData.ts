// mockData.ts — static lesson data for the My Lessons prototype.
// Frontend-only; no backend, no persistence.
//

export type LessonStatus = 'In Progress' | 'Completed' | 'Not Started'

export const statusFilters = ['All', 'In Progress', 'Completed', 'Not Started'] as const
export type StatusFilter = (typeof statusFilters)[number]

export const actionLabels: Record<LessonStatus, string> = {
  'In Progress': 'Continue',
  Completed: 'Review',
  'Not Started': 'Start Lesson',
}

export interface MyLesson {
  subject: string
  subjectClass: string
  title: string
  description: string
  progress: number
  status: LessonStatus
  statusClass: string
  studyTime: string
  moduleInfo: string
}

export const myLessons: MyLesson[] = [
  {
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    title: 'Quadratic Equations',
    description:
      'Solve quadratic equations using factoring, completing the square, and the quadratic formula.',
    progress: 72,
    status: 'In Progress',
    statusClass: 'bg-indigo-50 text-indigo-700',
    studyTime: '45 min',
    moduleInfo: 'Module 2 · Algebra',
  },
  {
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    title: 'Linear Equations & Inequalities',
    description:
      'Build a foundation for solving linear equations, graphing inequalities, and checking solutions.',
    progress: 100,
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-emerald-700',
    studyTime: '35 min',
    moduleInfo: 'Module 1 · Algebra',
  },
  {
    subject: 'Mathematics',
    subjectClass: 'bg-indigo-50 text-indigo-700',
    title: 'Introduction to Statistics',
    description:
      'Learn to organize data, calculate measures of central tendency, and read basic charts.',
    progress: 0,
    status: 'Not Started',
    statusClass: 'bg-neutral-100 text-neutral-600',
    studyTime: '50 min',
    moduleInfo: 'Module 3 · Statistics',
  },
  {
    subject: 'Science',
    subjectClass: 'bg-emerald-50 text-emerald-700',
    title: 'Photosynthesis: Energy in Plants',
    description:
      'Understand how plants convert sunlight into chemical energy and why it matters for life on Earth.',
    progress: 45,
    status: 'In Progress',
    statusClass: 'bg-indigo-50 text-indigo-700',
    studyTime: '40 min',
    moduleInfo: 'Unit 2 · Biology',
  },
  {
    subject: 'Science',
    subjectClass: 'bg-emerald-50 text-emerald-700',
    title: 'Exploring the Solar System',
    description:
      'Tour the planets, moons, and asteroids of our solar system and learn how they move.',
    progress: 100,
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-emerald-700',
    studyTime: '30 min',
    moduleInfo: 'Unit 1 · Astronomy',
  },
  {
    subject: 'English',
    subjectClass: 'bg-amber-50 text-amber-700',
    title: 'Persuasive Essay Writing',
    description:
      'Plan and structure an argument with clear claims, supporting evidence, and convincing conclusions.',
    progress: 20,
    status: 'In Progress',
    statusClass: 'bg-indigo-50 text-indigo-700',
    studyTime: '55 min',
    moduleInfo: 'Unit 3 · Writing',
  },
  {
    subject: 'English',
    subjectClass: 'bg-amber-50 text-amber-700',
    title: 'Reading Comprehension: Main Ideas',
    description:
      'Practice identifying main ideas, supporting details, and the author’s purpose in short passages.',
    progress: 0,
    status: 'Not Started',
    statusClass: 'bg-neutral-100 text-neutral-600',
    studyTime: '25 min',
    moduleInfo: 'Unit 1 · Reading',
  },
  {
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    title: 'Introduction to Data Structures',
    description:
      'Explore arrays, linked lists, and stacks — the building blocks of efficient programs.',
    progress: 28,
    status: 'In Progress',
    statusClass: 'bg-indigo-50 text-indigo-700',
    studyTime: '60 min',
    moduleInfo: 'Module 1 · Fundamentals',
  },
  {
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    title: 'HTML & Web Basics',
    description:
      'Structure web pages with semantic HTML and understand how browsers render content.',
    progress: 100,
    status: 'Completed',
    statusClass: 'bg-emerald-50 text-emerald-700',
    studyTime: '40 min',
    moduleInfo: 'Module 2 · Web',
  },
  {
    subject: 'Computer / IT',
    subjectClass: 'bg-sky-50 text-sky-700',
    title: 'Variables and Data Types',
    description:
      'Learn how programs store information using variables, numbers, text, and booleans.',
    progress: 0,
    status: 'Not Started',
    statusClass: 'bg-neutral-100 text-neutral-600',
    studyTime: '30 min',
    moduleInfo: 'Module 1 · Programming',
  },
]
