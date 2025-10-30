import { useEffect, useMemo, useState } from 'react'

export default function Doctor() {
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('doctorToken'))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('appointments')
    if (saved) setAppointments(JSON.parse(saved))
  }, [])

  const upcoming = useMemo(() => {
    return [...appointments]
      .filter(a => a.status !== 'cancelled')
      .sort((a,b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time))
  }, [appointments])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    // Simple demo auth; replace with real backend auth for production
    if (email && password) {
      localStorage.setItem('doctorToken', 'demo-doctor-token')
      setIsAuthed(true)
    } else {
      setError('Enter email and password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('doctorToken')
    setIsAuthed(false)
  }

  if (!isAuthed) {
    return (
      <div className="max-w-md mx-auto card p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Doctor Login</h2>
        {error && <div className="p-2 bg-red-50 text-red-700 rounded mb-3">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-3">
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
    )
  }

  const now = new Date()

  const isNowOrSoon = (dateStr, timeStr) => {
    const dt = new Date(`${dateStr} ${timeStr}`)
    const diffMin = (dt - now) / 60000
    return diffMin > -15 && diffMin < 30 // within 15 min past and 30 min upcoming
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Doctor Dashboard</h2>
        <button onClick={handleLogout} className="btn-secondary">Logout</button>
      </div>

      <div className="card p-4">
        <h3 className="text-xl font-semibold mb-3">Upcoming Meetings</h3>
        {upcoming.length === 0 ? (
          <div className="text-gray-600">No appointments scheduled.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-4">Patient</th>
                  <th className="py-2 pr-4">Specialty</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Time</th>
                  <th className="py-2 pr-4">Mode</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map(a => (
                  <tr key={a.id} className="border-b last:border-0">
                    <td className="py-2 pr-4">{a.psychiatrist?.name || 'Patient'}</td>
                    <td className="py-2 pr-4">{a.psychiatrist?.specialty || '-'}</td>
                    <td className="py-2 pr-4">{new Date(a.date).toLocaleDateString()}</td>
                    <td className="py-2 pr-4">{a.time}</td>
                    <td className="py-2 pr-4 capitalize">{a.mode || 'online'}</td>
                    <td className="py-2">
                      {a.mode === 'online' && a.joinUrl ? (
                        <a
                          href={a.joinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-3 py-2 rounded text-white ${isNowOrSoon(a.date, a.time) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-400 cursor-not-allowed'}`}
                          onClick={(e) => { if (!isNowOrSoon(a.date, a.time)) e.preventDefault() }}
                        >
                          Join Meeting
                        </a>
                      ) : (
                        <span className="text-gray-500">In-person</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}


