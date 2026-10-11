// Auth account types — frontend-only prototype (no backend, no auth library).
// These describe WHO the user is for Login/Registration only. Classroom data
// (class codes, enrollment, quiz/activity scores, attendance, lesson progress)
// belongs to the classroom/learning features and must never live here.
//
// SECURITY LIMITATION (frontend-only prototype):
// This is a UI demonstration. There is no server, no password hashing, and no
// real session security. Demo credentials are intentionally public and must
// NEVER be treated as production authentication. Real authentication must be
// enforced by the backend (Laravel + Sanctum) in a later phase.
//

// All roles the application knows about. Role always comes from the
// authenticated session — it is never chosen by a header/preview control.
export type UserRole = 'teacher' | 'student' | 'admin'

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

// Administrator account. Administrators are created by the system only —
// there is no public admin registration and no way to self-assign this role.
export interface AdminAccount extends AuthAccount {
  role: 'admin'
  adminId: string
}

// Any concrete account the demo registry / session can hold.
export type DemoAccount = TeacherAccount | StudentAccount | AdminAccount

// The authenticated session user the app shell needs.
export type SessionUser = DemoAccount

// Credential shapes used by the login/registration flows.
export interface LoginCredentials {
  identifier: string // username or email
  password: string
}

export interface AdminLoginCredentials {
  username: string
  password: string
}

export interface StudentRegistrationInput {
  firstName: string
  middleName: string
  lastName: string
  username: string
  email: string
  password: string
  confirmPassword: string
  grade: string
  section: string
}

// Result of an auth attempt. `ok` drives navigation; `error` is shown inline.
export interface AuthResult {
  ok: boolean
  error?: string
}
