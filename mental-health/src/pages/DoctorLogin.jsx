import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function DoctorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter email and password')
      return
    }
    // Demo-only local auth; replace with backend doctor auth when ready
    localStorage.setItem('doctorToken', 'demo-doctor-token')
    window.dispatchEvent(new Event('auth-changed'))
    navigate('/doctor', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md card p-6">
        <h1 className="text-2xl font-bold mb-4">Doctor Login</h1>
        {error && <div className="p-2 bg-red-50 text-red-700 rounded mb-3">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
      </div>
    </div>
  )
}


