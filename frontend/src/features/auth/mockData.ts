// Development-only mock accounts — frontend-only prototype.
// Clearly fake values for UI development/testing. No real credentials and no
// passwords of any kind; if a mock sign-in is added later it must be treated
// as development-only.
//
import type { StudentAccount, TeacherAccount } from './types'

export const MOCK_TEACHER_ACCOUNT: TeacherAccount = {
  id: 'auth-teacher-001',
  role: 'teacher',
  firstName: 'Demo',
  middleName: 'Q.',
  lastName: 'Teacher',
  email: 'demo.teacher@example.com',
  teacherId: 'T-DEMO-001',
  department: 'Sample Department'
}

export const MOCK_STUDENT_ACCOUNT: StudentAccount = {
  id: 'auth-student-001',
  role: 'student',
  firstName: 'Demo',
  middleName: 'Q.',
  lastName: 'Student',
  email: 'demo.student@example.com',
  grade: '10',
  section: 'A',
  studentId: 'S-DEMO-001'
}
