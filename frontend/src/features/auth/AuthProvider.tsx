// AuthProvider — holds the authentication session for the whole app.
//
// FRONTEND-ONLY PROTOTYPE. There is no backend and no real security:
//   - The account registry lives in memory (React state) for the session.
//   - The logged-in user is persisted to sessionStorage so a browser refresh
//     restores the session. No password is ever written to storage.
//   - Client-side route protection alone is NOT sufficient for production;
//     the backend must enforce authentication and authorization server-side.
//
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext, type AuthContextValue } from './AuthContext'
import { DEMO_ACCOUNTS, type StoredAccount } from './config/demoAccounts'
import type {
  SessionUser,
  AuthResult,
  LoginCredentials,
  AdminLoginCredentials,
  StudentRegistrationInput,
} from './types'

const SESSION_KEY = 'tyal.auth.session.v1'

// Read a previously stored session (survives refresh, cleared on tab close).
function readStoredSession(): SessionUser | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as SessionUser) : null
  } catch {
    return null
  }
}

// Build the session user from a stored account WITHOUT exposing the password.
function toSessionUser(account: StoredAccount): SessionUser {
  const session: SessionUser = { ...account }
  delete (session as { password?: string }).password
  return session
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accounts, setAccounts] = useState<StoredAccount[]>(DEMO_ACCOUNTS)
  const [user, setUser] = useState<SessionUser | null>(readStoredSession)

  // Persist / clear the session whenever it changes.
  useEffect(() => {
    try {
      if (user) {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
      } else {
        window.sessionStorage.removeItem(SESSION_KEY)
      }
    } catch {
      // Ignore storage failures (e.g. private browsing).
    }
  }, [user])

  const login = (credentials: LoginCredentials): AuthResult => {
    const id = credentials.identifier.trim().toLowerCase()
    if (!id || !credentials.password) {
      return { ok: false, error: 'Enter your username/email and password.' }
    }
    const match = accounts.find(
      (account) =>
        account.role !== 'admin' &&
        (account.email.toLowerCase() === id || account.username.toLowerCase() === id) &&
        account.password === credentials.password,
    )
    if (!match) {
      return { ok: false, error: 'Invalid username/email or password.' }
    }
    setUser(toSessionUser(match))
    return { ok: true }
  }

  const loginAdmin = (credentials: AdminLoginCredentials): AuthResult => {
    const username = credentials.username.trim()
    if (!username || !credentials.password) {
      return { ok: false, error: 'Enter the administrator username and password.' }
    }
    const match = accounts.find(
      (account) =>
        account.role === 'admin' &&
        account.username === username &&
        account.password === credentials.password,
    )
    if (!match) {
      return { ok: false, error: 'Invalid administrator credentials.' }
    }
    setUser(toSessionUser(match))
    return { ok: true }
  }

  const registerStudent = (input: StudentRegistrationInput): AuthResult => {
    const email = input.email.trim().toLowerCase()
    const username = input.username.trim().toLowerCase()
    if (accounts.some((account) => account.email.toLowerCase() === email)) {
      return { ok: false, error: 'An account with this email already exists.' }
    }
    if (accounts.some((account) => account.username.toLowerCase() === username)) {
      return { ok: false, error: 'This username is already taken.' }
    }
    const created: StoredAccount = {
      id: `student-${Date.now()}`,
      role: 'student',
      firstName: input.firstName.trim(),
      middleName: input.middleName.trim(),
      lastName: input.lastName.trim(),
      email: input.email.trim(),
      grade: input.grade.trim(),
      section: input.section.trim(),
      studentId: `S-${Date.now().toString().slice(-6)}`,
      username: input.username.trim(),
      password: input.password,
    }
    setAccounts((prev) => [...prev, created])
    setUser(toSessionUser(created))
    return { ok: true }
  }

  const logout = () => setUser(null)

  const value: AuthContextValue = { user, login, loginAdmin, registerStudent, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
