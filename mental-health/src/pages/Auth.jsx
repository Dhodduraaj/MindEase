import { useEffect, useState } from 'react'
import { setToken, isLoggedIn } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

export default function Auth() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [logged, setLogged] = useState(isLoggedIn())
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setLogged(isLoggedIn())
    window.addEventListener('auth-changed', handler)
    return () => window.removeEventListener('auth-changed', handler)
  }, [])

  async function submit() {
    setError('')
    try {
      // For demo purposes, create a simple token-based auth without backend
      if (mode === 'register') {
        if (!displayName || !email || !password) {
          setError('Please fill in all fields')
          return
        }
        // Create a simple token for demo
        const token = btoa(JSON.stringify({ email, displayName, timestamp: Date.now() }))
        setToken(token)
        navigate('/')
      } else {
        if (!email || !password) {
          setError('Please fill in all fields')
          return
        }
        // For login, just create a token (in real app, this would verify credentials)
        const token = btoa(JSON.stringify({ email, timestamp: Date.now() }))
        setToken(token)
        navigate('/')
      }
    } catch (e) {
      setError('Authentication failed')
    }
  }

  if (logged) return <div className="p-4 bg-green-100 text-green-800 rounded">You are logged in.</div>

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Welcome Header */}
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 float-animation">
            <span className="text-white text-3xl">🧠</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join MindEase'}
          </h2>
          <p className="text-gray-600 text-lg">
            {mode === 'login' 
              ? 'Sign in to continue your mental wellness journey' 
              : 'Create your account to start your mental wellness journey'
            }
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-gray-100">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center space-x-2">
              <span className="text-xl">⚠️</span>
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Display Name</label>
                <input 
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                  placeholder="Enter your name" 
                  value={displayName} 
                  onChange={(e)=>setDisplayName(e.target.value)} 
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input 
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
              />
            </div>
          </div>

          <button 
            onClick={submit} 
            className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
          
          <div className="text-center">
            <button 
              onClick={()=>setMode(mode==='login'?'register':'login')} 
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
            >
              {mode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="text-center space-y-4">
          <p className="text-gray-600">Start your journey with:</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <span>📅</span>
              <span>Appointments</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🎧</span>
              <span>ASMR</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🧘</span>
              <span>Meditation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


