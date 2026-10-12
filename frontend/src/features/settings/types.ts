// Settings types + defaults — frontend-only prototype (no backend/auth).
//
export type Theme = 'light' | 'dark' | 'system'

export type Language = 'English' | 'Filipino'

// ---------------------------------------------------------------------------
// Theme persistence — the selection must survive a browser refresh and stay
// consistent when the app switches between the dashboard and the standalone
// authentication screens (login / register / admin). Stored under a single
// key in localStorage; failures (e.g. private browsing) fall back to light.
// ---------------------------------------------------------------------------
const THEME_STORAGE_KEY = 'tyal.theme'

export function readStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'dark' || stored === 'light' || stored === 'system' ? stored : 'light'
  } catch {
    return 'light'
  }
}

export function writeStoredTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Ignore storage failures (e.g. private browsing) — the in-memory theme still applies.
  }
}

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