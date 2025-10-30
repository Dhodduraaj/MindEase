import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Resources from './pages/Resources'
import TherapyNew from './pages/TherapyNew'
import Activities from './pages/Activities'
import Auth from './pages/Auth'
import Homepage from './pages/Homepage'
import Appointments from './pages/Appointments'
import FaceMoodDetection from './pages/FaceMoodDetection'
import { useEffect, useState } from 'react'
import { isLoggedIn, setToken } from './lib/auth'
import Locator from './pages/Locator'
import Doctor from './pages/Doctor'


function Layout({ children }) {
  const [logged, setLogged] = useState(isLoggedIn())
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handler = () => setLogged(isLoggedIn())
    window.addEventListener('auth-changed', handler)
    return () => window.removeEventListener('auth-changed', handler)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800 relative overflow-hidden">
      {/* Soothing Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
          backgroundSize: '400px 400px, 600px 600px, 800px 800px',
          animation: 'float 20s ease-in-out infinite'
        }}></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'drift 30s linear infinite'
        }}></div>
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'drift 25s linear infinite reverse'
        }}></div>
      </div>
      {/* Enhanced Header with smooth animations */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white/70 backdrop-blur-sm'
      }`}>
        <div className="w-full px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo with animation */}
          <div className="flex items-center space-x-3 flex-none">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center float-animation">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MindEase
            </h1>
          </div>
          
          {/* Enhanced Navigation - extended width, single line, scrollable if overflow */}
          <nav className="hidden md:flex items-center space-x-2 flex-1 justify-center overflow-x-auto whitespace-nowrap px-8">
            <NavLink 
              to="/" 
              end 
              className={({isActive}) => 
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              🏠 Home
            </NavLink>
            <NavLink 
              to="/appointments" 
              className={({isActive}) => 
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              📅 Appointments
            </NavLink>
            <NavLink 
              to="/resources" 
              className={({isActive}) => 
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              📚 Resources
            </NavLink>
            <NavLink 
              to="/therapy" 
              className={({isActive}) => 
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              💬 Therapy
            </NavLink>
            <NavLink 
              to="/activities" 
              className={({isActive}) => 
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              🎮 Activities
            </NavLink>
            <NavLink 
              to="/face-mood" 
              className={({isActive}) => 
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              📸 Face Mood
            </NavLink>
            <NavLink 
              to="/locator" 
              className={({isActive}) => 
                `px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`
              }
            >
              📍 Locator
            </NavLink>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-3 flex-none">
            {!logged ? (
              <NavLink 
                to="/auth" 
                className="btn-primary flex items-center space-x-2"
              >
                <span>🔐</span>
                <span>Login</span>
              </NavLink>
            ) : (
              <button 
                onClick={() => setToken('')} 
                className="btn-secondary flex items-center space-x-2"
              >
                <span>👋</span>
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main content with smooth transitions */}
      <main className="pt-20 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="page-enter-active">
            {children}
          </div>
        </div>
      </main>

      {/* Floating Action Button for mobile */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform duration-300">
          ☰
        </button>
      </div>
    </div>
  )
}

 

// Protected Route Component
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = isLoggedIn()
      setIsAuthenticated(loggedIn)
      setLoading(false)
    }

    checkAuth()
    
    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth()
    }
    
    window.addEventListener('auth-changed', handleAuthChange)
    
    return () => {
      window.removeEventListener('auth-changed', handleAuthChange)
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white text-2xl">🧠</span>
          </div>
          <p className="text-gray-600">Loading MindEase...</p>
        </div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/auth" replace />
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Layout>
        <Routes>
          <Route path="/auth" element={<Auth/>} />
          <Route path="/" element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointments/></ProtectedRoute>} />
          <Route path="/resources" element={<ProtectedRoute><Resources/></ProtectedRoute>} />
          <Route path="/therapy" element={<ProtectedRoute><TherapyNew/></ProtectedRoute>} />
          <Route path="/activities" element={<ProtectedRoute><Activities/></ProtectedRoute>} />
          <Route path="/face-mood" element={<ProtectedRoute><FaceMoodDetection/></ProtectedRoute>} />
          <Route path="/locator" element={<ProtectedRoute><Locator/></ProtectedRoute>} />
          <Route path="/doctor" element={<ProtectedRoute><Doctor/></ProtectedRoute>} />
          </Routes>
      </Layout>
    </BrowserRouter>
  )
}
