// App — dashboard layout shell (sidebar + header + content).
// Frontend-only prototype: local UI state, no router, no backend.
//
import { useState } from 'react'
import PlaceholderView from './components/common/PlaceholderView'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './features/dashboard/Dashboard'
import MyLessons from './features/my-lessons/MyLessons'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')

  const handleSelectNav = (label: string) => {
    setActiveNav(label)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeNav}
        onSelectItem={handleSelectNav}
      />
      <div className="lg:pl-64">
        <Header
          onMenuToggle={() => setSidebarOpen((value) => !value)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {activeNav === 'Dashboard' ? (
            <Dashboard
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          ) : activeNav === 'My Lessons' ? (
            <MyLessons />
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
