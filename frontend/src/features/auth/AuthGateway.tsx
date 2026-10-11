// AuthGateway — chooses which standalone authentication screen to show when
// there is no valid session. Rendered by App instead of the dashboard shell.
// On successful auth the provider sets the session and App re-renders away.
//
import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLoginPage from './pages/AdminLoginPage'

export type AuthScreen = 'login' | 'register' | 'admin'

export default function AuthGateway() {
  const [screen, setScreen] = useState<AuthScreen>('login')

  if (screen === 'register') {
    return <RegisterPage onNavigate={setScreen} />
  }
  if (screen === 'admin') {
    return <AdminLoginPage onNavigate={setScreen} />
  }
  return <LoginPage onNavigate={setScreen} />
}
