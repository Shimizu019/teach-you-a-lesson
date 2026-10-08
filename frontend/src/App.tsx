// App — dashboard layout shell (sidebar + header + content).
// Frontend-only prototype: local UI state, no router, no backend.
//
import { useState } from 'react'
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
import StudentRegistration from './features/students/StudentRegistration'
import StudentProfile from './features/students/StudentProfile'
import type { StudentProfile as StudentProfileData } from './features/students/types'

type Role = 'teacher' | 'student'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [openClassId, setOpenClassId] = useState<string | undefined>(undefined)

  // Role foundation — all frontend-only, no auth/backend.
  const [role, setRole] = useState<Role>('teacher')
  const [studentProfile, setStudentProfile] = useState<StudentProfileData | null>(null)
  const [classrooms, setClassrooms] = useState<Classroom[]>(CLASSES)
  const [joinedClassIds, setJoinedClassIds] = useState<string[]>([])

  const isStudent = role === 'student'
  const studentFullName = studentProfile
    ? [studentProfile.firstName, studentProfile.middleName, studentProfile.lastName]
        .filter(Boolean)
        .join(' ')
    : null

  const handleSelectNav = (label: string) => {
    setActiveNav(label)
    setSidebarOpen(false)
  }

  const handleOpenClass = (id: string) => {
    setOpenClassId(id)
    setActiveNav('Classroom')
    setSidebarOpen(false)
  }

  const handleRoleChange = (nextRole: Role) => {
    if (nextRole === role) return
    setRole(nextRole)
    setActiveNav('Dashboard')
    setOpenClassId(undefined)
    setSearchQuery('')
  }

  const handleRegisterStudent = (profile: StudentProfileData) => {
    setStudentProfile(profile)
    setActiveNav('Profile')
  }

  const handleJoinClass = (id: string) => {
    setJoinedClassIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const handleCreateClass = (classroom: Classroom) => {
    setClassrooms((prev) => [...prev, classroom])
  }

  const openStudentClass =
    openClassId && joinedClassIds.includes(openClassId)
      ? classrooms.find((entry) => entry.id === openClassId)
      : undefined

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeNav}
        onSelectItem={handleSelectNav}
        role={role}
        studentName={isStudent ? studentFullName : null}
      />
      <div className="lg:pl-64">
        <Header
          onMenuToggle={() => setSidebarOpen((value) => !value)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          role={role}
          onRoleChange={handleRoleChange}
        />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {isStudent && !studentProfile ? (
            <StudentRegistration onSubmit={handleRegisterStudent} />
          ) : activeNav === 'Dashboard' ? (
            <Dashboard
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          ) : activeNav === 'My Lessons' ? (
            <MyLessons />
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
          ) : activeNav === 'Profile' && isStudent && studentProfile ? (
            <StudentProfile profile={studentProfile} />
          ) : (
            <PlaceholderView
              title={activeNav}
              onBack={() => setActiveNav('Dashboard')}
            />
          )}
        </main>
      </div>
    </div>
  )
}
