// Auth account types — frontend-only prototype (no backend, no auth library).
// These describe WHO the user is for Login/Registration only. Classroom data
// (class codes, enrollment, quiz/activity scores, attendance, lesson progress)
// belongs to the classroom/learning features and must never live here.
//
export type UserRole = 'teacher' | 'student'

// Fields every authentication account shares, regardless of role.
export interface AuthAccount {
  id: string
  role: UserRole
  firstName: string
  middleName: string
  lastName: string
  email: string
}

// Teacher-specific profile information.
export interface TeacherAccount extends AuthAccount {
  role: 'teacher'
  teacherId: string
  department: string
}

// Student-specific profile information.
export interface StudentAccount extends AuthAccount {
  role: 'student'
  grade: string
  section: string
  studentId: string
}
