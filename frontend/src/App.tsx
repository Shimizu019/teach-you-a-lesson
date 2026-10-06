// App — dashboard layout shell (sidebar + header + content).
// UI prototype only — no routing, no state libraries, no backend.
//
import { useState } from 'react'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './features/dashboard/Dashboard'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header onMenuToggle={() => setSidebarOpen((value) => !value)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Dashboard />
        </main>
      </div>
    </div>
  )
}
