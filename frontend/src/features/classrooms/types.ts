// Shared classroom types — frontend-only prototype (no backend).
//
export interface Classroom {
  id: string;
  name: string;
  grade: number;
  section: string;
  students: number;
  lessons: number;
  quizzes: number;
  joinCode: string;
  openClass: boolean;
  description?: string;
}
