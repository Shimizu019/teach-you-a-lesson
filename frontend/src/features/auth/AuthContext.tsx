// AuthContext — shared shape for the authentication session.
// Frontend-only prototype. See AuthProvider for the implementation and the
// security limitations (no backend, no real password security).
//
import { createContext } from 'react'
import type {
  SessionUser,
  AuthResult,
  LoginCredentials,
  AdminLoginCredentials,
  StudentRegistrationInput,
} from './types'

export interface AuthContextValue {
  // The currently authenticated user, or null when signed out.
  user: SessionUser | null
  // Sign in a teacher or student by username/email + password.
  login: (credentials: LoginCredentials) => AuthResult
  // Sign in an administrator (separate, restricted flow).
  loginAdmin: (credentials: AdminLoginCredentials) => AuthResult
  // Register a new student account and sign them in.
  registerStudent: (input: StudentRegistrationInput) => AuthResult
  // Clear the session.
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
