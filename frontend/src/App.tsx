// App — dashboard layout shell (sidebar + header + content).
// Frontend-only prototype: local UI state, no router, no backend.
//
// Access control: when there is no authenticated session the standalone
// AuthGateway (Login / Register / Admin login) is shown instead of the shell.
// The role always comes from the session — there is no preview-role control.
//
import { useEffect, useState } from 'react'
import PlaceholderView from './components/common/PlaceholderView'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './features/dashboard/Dashboard'
import MyLessons from './features/my-lessons/MyLessons'
import Progress from './features/progress/Progress'
import Subjects from './features/subjects/Subjects'
import Classrooms from './features/classrooms/Classrooms'
import ClassroomPage from './features/classrooms/ClassroomPage'
import StudentClassroomView from './features/classrooms/StudentClassroomView'
import StudentClassrooms from './features/classrooms/StudentClassrooms'
import CLASSES from './features/classrooms/mockData'
import type { Classroom } from './features/classrooms/types'
import StudentProfile from './features/students/StudentProfile'
import Settings from './features/settings/Settings'
import AdminDashboard from './features/admin/AdminDashboard'
import ActivitiesQuizzes from './features/assignments/ActivitiesQuizzes'
import ActivityDetail from './features/assignments/ActivityDetail'
import QuizTake from './features/assignments/QuizTake'
import { AssignmentsProvider } from './features/assignments/AssignmentsContext'
import type { Activity, Quiz } from './features/assignments/types'
import type { StudentProfile as StudentProfileData } from './features/students/types'
import { useAuth } from './features/auth/useAuth'
import AuthGateway from './features/auth/AuthGateway'
import AuthRoute from './features/auth/AuthRoute'
import {
  DEFAULT_TEACHER_ACCOUNT,
  readStoredTheme,
  writeStoredTheme,
  type AccountValues,
  type Language,
  type Theme,
} from './features/settings/types'

export default function App() {
  const { user, logout } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [openClassId, setOpenClassId] = useState<string | undefined>(undefined)
  // Set when the dashboard's "Today's Lessons" card is used, so My Lessons can
  // open filtered to today and the sidebar selection stays consistent.
  const [todayLessonsOnly, setTodayLessonsOnly] = useState(false)

  // Classroom state (frontend-only).
  const [classrooms, setClassrooms] = useState<Classroom[]>(CLASSES)
  const [joinedClassIds, setJoinedClassIds] = useState<string[]>([])

  // Assignments drill-down state (frontend-only; session data lives in
  // AssignmentsProvider so the list, detail, and quiz views share it).
  const [openActivity, setOpenActivity] = useState<Activity | null>(null)
  const [openQuiz, setOpenQuiz] = useState<Quiz | null>(null)

  // Settings state (frontend-only). The theme is persisted to localStorage so
  // the selection survives a refresh and stays consistent between the dashboard
  // and the standalone authentication screens after logout.
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme())
  const [language, setLanguage] = useState<Language>('English')
  const [teacherAccount, setTeacherAccount] = useState<AccountValues>(DEFAULT_TEACHER_ACCOUNT)
  const [studentAccount, setStudentAccount] = useState<AccountValues | null>(null)

  // Apply the selected theme to <html>; "system" follows the OS preference.
  useEffect(() => {
    writeStoredTheme(theme)
    const root = document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const applyTheme = () => {
      const resolvedDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches)
      root.classList.toggle('dark', resolvedDark)
      root.style.colorScheme = resolvedDark ? 'dark' : 'light'
    }
    applyTheme()
    mediaQuery.addEventListener('change', applyTheme)
    return () => mediaQuery.removeEventListener('change', applyTheme)
  }, [theme])

  // No session -> standalone authentication (never inside the dashboard shell).
  if (!user) {
    return <AuthGateway />
  }

  // Administrators get their own shell + dashboard.
  if (user.role === 'admin') {
    return <AdminDashboard user={user} onLogout={logout} />
  }

  const role: 'teacher' | 'student' = user.role
  const isStudent = role === 'student'

  // Derive the student profile from the authenticated session so the existing
  // StudentProfile view keeps working without a separate registration flow.
  const studentProfile: StudentProfileData | null =
    isStudent && user.role === 'student'
      ? {
          firstName: user.firstName,
          middleName: user.middleName,
          lastName: user.lastName,
          section: user.section,
          grade: user.grade,
        }
      : null

  const handleSelectNav = (label: string) => {
    setActiveNav(label)
    setSidebarOpen(false)
    // Only the dashboard's Today's Lessons card opts into the today filter.
    if (label !== 'My Lessons') setTodayLessonsOnly(false)
    // Leaving the assignments area always returns to the list view next time.
    setOpenActivity(null)
    setOpenQuiz(null)
  }

  const handleOpenTodaysLessons = () => {
    setTodayLessonsOnly(true)
    handleSelectNav('My Lessons')
  }

  const handleOpenClass = (id: string) => {
    setOpenClassId(id)
    setActiveNav('Classroom')
    setSidebarOpen(false)
  }

  const handleOpenActivity = (activity: Activity) => {
    setOpenQuiz(null)
    setOpenActivity(activity)
  }

  const handleOpenQuiz = (quiz: Quiz) => {
    setOpenActivity(null)
    setOpenQuiz(quiz)
    // Also used from the dashboard, so make sure the assignments area is active.
    setActiveNav('Activities & Quizzes')
  }

  const handleBackToAssignments = () => {
    setOpenActivity(null)
    setOpenQuiz(null)
  }

  const handleJoinClass = (id: string) => {
    setJoinedClassIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const handleCreateClass = (classroom: Classroom) => {
    setClassrooms((prev) => [...prev, classroom])
  }

  const currentAccount: AccountValues =
    (isStudent ? studentAccount : teacherAccount) ?? DEFAULT_TEACHER_ACCOUNT

  const handleSaveAccount = (values: AccountValues) => {
    if (isStudent) setStudentAccount(values)
    else setTeacherAccount(values)
  }

  const openStudentClass =
    openClassId && joinedClassIds.includes(openClassId)
      ? classrooms.find((entry) => entry.id === openClassId)
      : undefined

  return (
    <AssignmentsProvider>
      <div className="min-h-screen bg-neutral-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeNav}
        onSelectItem={handleSelectNav}
        role={role}
        user={user}
        onLogout={logout}
      />
      <div className="lg:pl-64">
        <Header
          onMenuToggle={() => setSidebarOpen((value) => !value)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          user={user}
          onLogout={logout}
        />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <AuthRoute allow={[role]}>
            {activeNav === 'Dashboard' ? (
              <Dashboard
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery('')}
                onNavigate={handleSelectNav}
                onOpenTodaysLessons={handleOpenTodaysLessons}
                onOpenQuiz={handleOpenQuiz}
              />
            ) : activeNav === 'My Lessons' ? (
              <MyLessons todayOnly={todayLessonsOnly} />
            ) : activeNav === 'Activities & Quizzes' ? (
              openActivity ? (
                <ActivityDetail activity={openActivity} onBack={handleBackToAssignments} />
              ) : openQuiz ? (
                <QuizTake quiz={openQuiz} onBack={handleBackToAssignments} />
              ) : (
                <ActivitiesQuizzes
                  onOpenActivity={handleOpenActivity}
                  onOpenQuiz={handleOpenQuiz}
                />
              )
            ) : activeNav === 'Subjects' ? (
              <Subjects />
            ) : activeNav === 'Progress' ? (
              <Progress />
            ) : activeNav === 'Classrooms' ? (
              isStudent ? (
                <StudentClassrooms
                  classrooms={classrooms}
                  joinedIds={joinedClassIds}
                  onJoin={handleJoinClass}
                  onOpenClass={handleOpenClass}
                />
              ) : (
                <Classrooms
                  classrooms={classrooms}
                  onCreateClass={handleCreateClass}
                  onOpenClass={handleOpenClass}
                />
              )
            ) : activeNav === 'Classroom' ? (
              isStudent ? (
                <StudentClassroomView
                  classroom={openStudentClass}
                  onBack={() => setActiveNav('Classrooms')}
                />
              ) : (
                <ClassroomPage classId={openClassId} classrooms={classrooms} />
              )
            ) : activeNav === 'Settings' ? (
              <Settings
                role={role}
                theme={theme}
                onThemeChange={setTheme}
                language={language}
                onLanguageChange={setLanguage}
                account={currentAccount}
                onAccountSave={handleSaveAccount}
              />
            ) : activeNav === 'Profile' && isStudent && studentProfile ? (
              <StudentProfile profile={studentProfile} />
            ) : (
              <PlaceholderView title={activeNav} onBack={() => setActiveNav('Dashboard')} />
            )}
          </AuthRoute>
        </main>
      </div>
      </div>
    </AssignmentsProvider>
  )
}

