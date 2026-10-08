// Settings types + defaults — frontend-only prototype (no backend/auth).
//
export type Theme = 'light' | 'dark' | 'system'

export type Language = 'English' | 'Filipino'

export type SettingsRole = 'teacher' | 'student'

export interface AccountValues {
  name: string
  displayName: string
  email: string
}

export const DEFAULT_TEACHER_ACCOUNT: AccountValues = {
  name: 'Alex Rivera',
  displayName: 'Alex Rivera',
  email: 'alex.rivera@teachyoualesson.edu',
}