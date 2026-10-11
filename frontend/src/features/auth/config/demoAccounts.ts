// DEMO-ONLY account seed. These credentials are intentionally public and exist
// purely so the frontend prototype can be exercised without a backend.
//
// SECURITY: This is NOT production authentication. There is no password
// hashing and no server validation. A real backend (Laravel + Sanctum) must
// validate credentials server-side. Do not copy this pattern into production.
//
import type { DemoAccount } from '../types'

// A stored demo account = a real account shape plus demo-only username/password.
// (Intersection, not interface-extends, because DemoAccount is a union.)
export type StoredAccount = DemoAccount & { username: string; password: string }

// General teacher login (username "teacher" / password "teacher").
export const DEMO_TEACHER = { username: 'teacher', password: 'teacher' }

// Administrator login — exactly as requested by the project owner.
export const DEMO_ADMIN = { username: 'AdminBenju', password: 'Admin' }

export const DEMO_ACCOUNTS: StoredAccount[] = [
  {
    id: 'demo-teacher-1',
    role: 'teacher',
    firstName: 'Demo',
    middleName: '',
    lastName: 'Teacher',
    email: 'teacher@demo.local',
    teacherId: 'T-DEMO-1',
    department: 'Sample Department',
    username: DEMO_TEACHER.username,
    password: DEMO_TEACHER.password,
  },
  {
    id: 'demo-admin-1',
    role: 'admin',
    firstName: 'Admin',
    middleName: '',
    lastName: 'Benju',
    email: 'admin@demo.local',
    adminId: 'ADM-DEMO-1',
    username: DEMO_ADMIN.username,
    password: DEMO_ADMIN.password,
  },
]
