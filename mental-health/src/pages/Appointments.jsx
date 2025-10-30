import { useState, useEffect } from 'react'
import { moodApi } from '../lib/api'

const psychiatrists = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Anxiety & Depression', rating: 4.8, experience: '8 years', bookingUrl: 'https://www.zocdoc.com/telehealth' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Trauma & PTSD', rating: 4.9, experience: '12 years', bookingUrl: 'https://www.zocdoc.com/telehealth' },
  { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Bipolar Disorder', rating: 4.7, experience: '6 years', bookingUrl: 'https://www.zocdoc.com/telehealth' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Addiction & Recovery', rating: 4.6, experience: '10 years', bookingUrl: 'https://www.zocdoc.com/telehealth' },
  { id: 5, name: 'Dr. Lisa Thompson', specialty: 'Child & Adolescent', rating: 4.9, experience: '15 years', bookingUrl: 'https://www.zocdoc.com/telehealth' }
]

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

export default function Appointments() {
  const [selectedPsychiatrist, setSelectedPsychiatrist] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointments, setAppointments] = useState([])
  const [showBooking, setShowBooking] = useState(false)
  const [bookingStep, setBookingStep] = useState(1)
  const [sessionMode, setSessionMode] = useState('online') // 'online' | 'in_person'
  const [notes, setNotes] = useState('')
  const [providerUrl, setProviderUrl] = useState('')
  const [showProvider, setShowProvider] = useState(false)

  useEffect(() => {
    // Load existing appointments from localStorage
    const saved = localStorage.getItem('appointments')
    if (saved) {
      setAppointments(JSON.parse(saved))
    }
  }, [])

  const saveAppointment = (appointment) => {
    const newAppointments = [...appointments, appointment]
    setAppointments(newAppointments)
    localStorage.setItem('appointments', JSON.stringify(newAppointments))
  }

  const deleteAppointment = (id) => {
    const newAppointments = appointments.filter(apt => apt.id !== id)
    setAppointments(newAppointments)
    localStorage.setItem('appointments', JSON.stringify(newAppointments))
  }

  const handleBooking = () => {
    if (!selectedPsychiatrist || !selectedDate || !selectedTime) return

    const appointment = {
      id: Date.now(),
      psychiatrist: selectedPsychiatrist,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      mode: sessionMode,
      joinUrl: sessionMode === 'online' ? `https://meet.jit.si/MindEase-${Date.now()}` : '',
      notes,
      createdAt: new Date().toISOString()
    }

    saveAppointment(appointment)
    setShowBooking(false)
    setBookingStep(1)
    setSelectedPsychiatrist(null)
    setSelectedDate('')
    setSelectedTime('')
    setSessionMode('online')
    setNotes('')
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center float-animation shadow-lg">
            <span className="text-white text-2xl">📅</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Doctor Appointments
          </h2>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Connect with experienced mental health professionals who are here to support your journey towards better mental wellbeing. 
          Choose from our carefully selected team of psychiatrists and therapists.
        </p>
      </div>

      {/* Real Provider Options (External) */}
      <div className="card p-6">
        <h3 className="text-xl font-semibold mb-4">Find Licensed Psychiatrists (Online)</h3>
        <p className="text-gray-600 mb-4">Book with real providers on trusted platforms. These links open official websites.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <a className="p-4 border-2 rounded-xl hover:shadow-md transition flex items-start gap-3 cursor-pointer" href="https://www.zocdoc.com/psychiatrists" onClick={(e)=>{e.preventDefault(); setProviderUrl('https://www.zocdoc.com/psychiatrists'); setShowProvider(true);}}>
            <span className="text-2xl">🌐</span>
            <div>
              <div className="font-semibold text-gray-800">Zocdoc – Psychiatrists</div>
              <div className="text-sm text-gray-600">Search and book online sessions with psychiatrists near you</div>
            </div>
          </a>
          <a className="p-4 border-2 rounded-xl hover:shadow-md transition flex items-start gap-3 cursor-pointer" href="https://www.teladoc.com/what-we-treat/mental-health/" onClick={(e)=>{e.preventDefault(); setProviderUrl('https://www.teladoc.com/what-we-treat/mental-health/'); setShowProvider(true);}}>
            <span className="text-2xl">📱</span>
            <div>
              <div className="font-semibold text-gray-800">Teladoc – Mental Health</div>
              <div className="text-sm text-gray-600">Virtual psychiatry and therapy sessions</div>
            </div>
          </a>
          <a className="p-4 border-2 rounded-xl hover:shadow-md transition flex items-start gap-3 cursor-pointer" href="https://www.amwell.com/psychiatry/" onClick={(e)=>{e.preventDefault(); setProviderUrl('https://www.amwell.com/psychiatry/'); setShowProvider(true);}}>
            <span className="text-2xl">💻</span>
            <div>
              <div className="font-semibold text-gray-800">Amwell – Psychiatry</div>
              <div className="text-sm text-gray-600">Psychiatry appointments online</div>
            </div>
          </a>
          <a className="p-4 border-2 rounded-xl hover:shadow-md transition flex items-start gap-3 cursor-pointer" href="https://www.mdlive.com/behavioral-health/" onClick={(e)=>{e.preventDefault(); setProviderUrl('https://www.mdlive.com/behavioral-health/'); setShowProvider(true);}}>
            <span className="text-2xl">🩺</span>
            <div>
              <div className="font-semibold text-gray-800">MDLIVE – Behavioral Health</div>
              <div className="text-sm text-gray-600">Psychiatrists and therapists via video</div>
            </div>
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-3">Note: Availability depends on your region and insurance. MindEase is not affiliated with these providers.</p>
      </div>

      {showProvider && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="text-sm text-gray-600 truncate">{providerUrl}</div>
              <div className="flex items-center gap-2">
                <a href={providerUrl} target="_blank" rel="noreferrer" className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Open in new tab</a>
                <button onClick={()=>setShowProvider(false)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200">×</button>
              </div>
            </div>
            <div className="flex-1 relative">
              <iframe
                title="Provider"
                src={providerUrl}
                className="absolute inset-0 w-full h-full"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-xs text-gray-500 bg-white/80">
                If the site doesn't display, it may block embedding. Use “Open in new tab”.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced New Appointment Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowBooking(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold flex items-center space-x-3 text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          <span className="text-xl">➕</span>
          <span>Book New Appointment</span>
        </button>
      </div>

      {showBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg">📅</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Book New Appointment
                </h3>
              </div>
              <button
                onClick={() => setShowBooking(false)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300"
              >
                <span className="text-xl">×</span>
              </button>
            </div>

            {bookingStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Step 1: Choose Your Doctor</h4>
                  <p className="text-gray-600">Select from our team of experienced mental health professionals</p>
                </div>
                <div className="grid gap-4">
                  {psychiatrists.map(psych => (
                    <div
                      key={psych.id}
                      className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedPsychiatrist?.id === psych.id
                          ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 shadow-lg'
                          : 'border-gray-200 hover:border-emerald-300 hover:shadow-md bg-white'
                      }`}
                      onClick={() => setSelectedPsychiatrist(psych)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-lg">👩‍⚕️</span>
                            </div>
                            <div>
                              <h5 className="font-bold text-lg text-gray-800">{psych.name}</h5>
                              <p className="text-emerald-600 font-medium">{psych.specialty}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 ml-12">{psych.experience} of experience</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-center space-x-1 mb-2">
                            <span className="text-yellow-500 text-xl">★</span>
                            <span className="font-bold text-lg">{psych.rating}</span>
                          </div>
                          <div className="text-xs text-gray-500">Rating</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookingStep(2)}
                  disabled={!selectedPsychiatrist}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                >
                  Next: Select Date & Time →
                </button>
              </div>
            )}

            {bookingStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">Step 2: Select Date & Time</h4>
                  <p className="text-gray-600">Choose your preferred appointment slot</p>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">🖥️ Session Mode:</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSessionMode('online')}
                      className={`px-4 py-2 rounded-xl border-2 ${sessionMode==='online' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200'}`}
                    >Online (Video)</button>
                    <button
                      type="button"
                      onClick={() => setSessionMode('in_person')}
                      className={`px-4 py-2 rounded-xl border-2 ${sessionMode==='in_person' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200'}`}
                    >In-person</button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">📅 Available Dates:</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                  >
                    <option value="">Select a date</option>
                    {getAvailableDates().map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">🕐 Available Times:</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-4 border-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          selectedTime === time
                            ? 'border-emerald-500 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 shadow-lg'
                            : 'border-gray-200 hover:border-emerald-300 hover:shadow-md bg-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-3">📝 Notes (optional):</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                    placeholder="Add anything you'd like your doctor to know in advance"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setBookingStep(1)}
                    className="flex-1 px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
                  >
                    ✓ Confirm Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Your Appointments Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">📋 Your Appointments</h3>
          <p className="text-gray-600">Manage your scheduled appointments</p>
        </div>
        
        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">📅</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-600 mb-2">No appointments scheduled</h4>
            <p className="text-gray-500">Book your first appointment to get started with professional mental health support.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">👩‍⚕️</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{appointment.psychiatrist.name}</h4>
                        <p className="text-emerald-600 font-medium">{appointment.psychiatrist.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">📅</span>
                        <span className="font-medium">{new Date(appointment.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🕐</span>
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🖥️</span>
                    <span className="font-medium capitalize">{appointment.mode === 'online' ? 'Online' : 'In-person'}</span>
                  </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-3">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    }`}>
                      {appointment.status}
                    </span>
                {appointment.mode === 'online' && appointment.joinUrl && (
                  <a
                    href={appointment.joinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>🔗</span>
                    <span>Join Online Session</span>
                  </a>
                )}
                {appointment.psychiatrist.bookingUrl && (
                  <a
                    href={appointment.psychiatrist.bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                  >
                    <span>🌐</span>
                    <span>Book with Provider</span>
                  </a>
                )}
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this appointment?')) {
                          deleteAppointment(appointment.id)
                        }
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
