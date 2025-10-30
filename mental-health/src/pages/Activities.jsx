import { useMemo, useState, useEffect } from 'react'

export default function Activities() {
  const [activeGame, setActiveGame] = useState(null)
  
  const suggestions = useMemo(() => [
    { title: '4-7-8 Breathing', detail: 'Inhale 4s, hold 7s, exhale 8s x4' },
    { title: '5-Minute Journal', detail: 'Write 3 things you\'re grateful for' },
    { title: 'Mindful Walk', detail: '10 minutes outdoors, focus on senses' },
    { title: 'Body Scan', detail: 'Progressively relax from head to toe' },
  ], [])

  const stressGames = [
    {
      id: 'bubble-wrap',
      title: 'Virtual Bubble Wrap',
      description: 'Pop virtual bubbles to relieve stress',
      icon: '🫧'
    },
    {
      id: 'breathing',
      title: 'Guided Breathing',
      description: 'Interactive breathing exercise',
      icon: '🫁'
    },
    {
      id: 'coloring',
      title: 'Digital Coloring',
      description: 'Relaxing coloring activity',
      icon: '🎨'
    },
    {
      id: 'meditation',
      title: 'Mindfulness Timer',
      description: 'Guided meditation timer',
      icon: '🧘'
    }
  ]

  const handleGameClick = (gameId) => {
    setActiveGame(gameId)
  }

  const renderGame = (gameId) => {
    const game = stressGames.find(g => g.id === gameId)
    if (!game) return null
    
    switch (gameId) {
      case 'bubble-wrap':
        return <BubbleWrapGame onClose={() => setActiveGame(null)} />
      case 'breathing':
        return <BreathingGame onClose={() => setActiveGame(null)} />
      case 'coloring':
        return <ColoringGame onClose={() => setActiveGame(null)} />
      case 'meditation':
        return <MeditationTimer onClose={() => setActiveGame(null)} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center float-animation">
            <span className="text-white text-xl">🎮</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Activities & Stress Relief
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Interactive games and activities designed to help you relax, reduce stress, and improve your mental wellbeing.
        </p>
      </div>
      
      {/* Enhanced Stress Relief Games */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🎮</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interactive Stress Relief Games
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stressGames.map((game, index) => (
            <div 
              key={game.id} 
              className="group p-6 bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-2 border-transparent hover:border-blue-200 rounded-2xl cursor-pointer transition-all duration-300 interactive-hover animate-slideIn"
              onClick={() => handleGameClick(game.id)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-lg">{game.icon}</span>
                </div>
                <h4 className="font-bold text-gray-800 group-hover:text-blue-700">{game.title}</h4>
              </div>
              <p className="text-sm text-gray-600 group-hover:text-blue-600 leading-relaxed">{game.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Quick Activities */}
      <div className="card p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-lg">🧘</span>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Quick Mindfulness Activities
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {suggestions.map((s, i) => (
            <div 
              key={i} 
              className="group p-6 bg-gradient-to-br from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 border-2 border-transparent hover:border-green-200 rounded-2xl transition-all duration-300 interactive-hover animate-slideIn"
              style={{animationDelay: `${i * 0.1}s`}}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-sm">
                    {i === 0 ? '🫁' : i === 1 ? '📝' : i === 2 ? '🚶' : '🧘'}
                  </span>
                </div>
                <h4 className="font-bold text-gray-800 group-hover:text-green-700">{s.title}</h4>
              </div>
              <p className="text-sm text-gray-600 group-hover:text-green-600 leading-relaxed">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Game Modal */}
      {activeGame && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl transform animate-slideUp">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-lg">
                      {activeGame === 'bubble-wrap' ? '🫧' : 
                       activeGame === 'breathing' ? '🫁' : 
                       activeGame === 'coloring' ? '🎨' : '🧘'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stressGames.find(g => g.id === activeGame)?.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {stressGames.find(g => g.id === activeGame)?.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveGame(null)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-300"
                >
                  <span className="text-xl">×</span>
                </button>
              </div>
              <div className="animate-slideIn">
                {renderGame(activeGame)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Game Components
function BubbleWrapGame({ onClose }) {
  const [bubbles, setBubbles] = useState(Array.from({ length: 50 }, (_, i) => ({ id: i, popped: false })))
  const [score, setScore] = useState(0)

  // Create pop sound using Web Audio API
  const playPopSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const popBubble = (id) => {
    setBubbles(prev => prev.map(bubble => 
      bubble.id === id ? { ...bubble, popped: true } : bubble
    ))
    setScore(prev => prev + 1)
    playPopSound()
  }

  const resetGame = () => {
    setBubbles(Array.from({ length: 50 }, (_, i) => ({ id: i, popped: false })))
    setScore(0)
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="text-lg font-semibold">Virtual Bubble Wrap</h4>
        <p className="text-gray-600">Click bubbles to pop them and relieve stress!</p>
        <div className="mt-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Score: {score}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-10 gap-2 p-4 bg-gray-100 rounded-lg">
        {bubbles.map(bubble => (
          <button
            key={bubble.id}
            onClick={() => !bubble.popped && popBubble(bubble.id)}
            className={`w-8 h-8 rounded-full transition-all duration-200 ${
              bubble.popped 
                ? 'bg-gray-300 opacity-50' 
                : 'bg-blue-400 hover:bg-blue-500 hover:scale-110'
            }`}
            disabled={bubble.popped}
          />
        ))}
      </div>
      
      <div className="flex justify-center gap-2">
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Reset Game
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function BreathingGame({ onClose }) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState('inhale')
  const [count, setCount] = useState(4)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCount(prev => {
        if (prev === 1) {
          if (phase === 'inhale') {
            setPhase('hold')
            return 7
          } else if (phase === 'hold') {
            setPhase('exhale')
            return 8
          } else {
            setPhase('inhale')
            setCycle(prev => prev + 1)
            return 4
          }
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, phase])

  const startBreathing = () => {
    setIsActive(true)
    setPhase('inhale')
    setCount(4)
    setCycle(0)
  }

  const stopBreathing = () => {
    setIsActive(false)
    setPhase('inhale')
    setCount(4)
    setCycle(0)
  }

  return (
    <div className="space-y-6 text-center">
      <div>
        <h4 className="text-lg font-semibold">4-7-8 Breathing Exercise</h4>
        <p className="text-gray-600">Follow the guided breathing pattern</p>
      </div>
      
      <div className="relative">
        <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-1000 ${
          phase === 'inhale' ? 'bg-green-500 scale-110' :
          phase === 'hold' ? 'bg-yellow-500 scale-125' :
          'bg-blue-500 scale-100'
        }`}>
          {count}
        </div>
        <div className="mt-4">
          <p className="text-lg font-medium capitalize">{phase}</p>
          <p className="text-sm text-gray-600">Cycle: {cycle}</p>
        </div>
      </div>
      
      <div className="flex justify-center gap-2">
        {!isActive ? (
          <button
            onClick={startBreathing}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start Breathing
          </button>
        ) : (
          <button
            onClick={stopBreathing}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Stop
          </button>
        )}
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function ColoringGame({ onClose }) {
  const [selectedColor, setSelectedColor] = useState('#ff6b6b')
  const [pixels, setPixels] = useState(Array.from({ length: 100 }, () => '#ffffff'))
  
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd']
  
  const colorPixel = (index) => {
    setPixels(prev => prev.map((color, i) => i === index ? selectedColor : color))
  }

  const clearCanvas = () => {
    setPixels(Array.from({ length: 100 }, () => '#ffffff'))
  }

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-center">Digital Coloring</h4>
      
      <div className="flex justify-center gap-2 mb-4">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            className={`w-8 h-8 rounded-full border-2 ${
              selectedColor === color ? 'border-gray-800' : 'border-gray-300'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-10 gap-1 p-4 bg-gray-100 rounded-lg mx-auto w-fit">
        {pixels.map((color, index) => (
          <button
            key={index}
            onClick={() => colorPixel(index)}
            className="w-6 h-6 border border-gray-300 hover:border-gray-500"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      
      <div className="flex justify-center gap-2">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Clear
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}

function MeditationTimer({ onClose }) {
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isActive, setIsActive] = useState(false)
  const [sessionType, setSessionType] = useState('mindfulness')

  const sessionTypes = [
    { id: 'mindfulness', name: 'Mindfulness', duration: 300 },
    { id: 'breathing', name: 'Breathing', duration: 180 },
    { id: 'body-scan', name: 'Body Scan', duration: 600 },
    { id: 'loving-kindness', name: 'Loving Kindness', duration: 420 }
  ]

  const startTimer = () => {
    setIsActive(true)
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopTimer = () => {
    setIsActive(false)
  }

  const resetTimer = () => {
    const selected = sessionTypes.find(s => s.id === sessionType)
    setTimeLeft(selected.duration)
    setIsActive(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6 text-center">
      <h4 className="text-lg font-semibold">Meditation Timer</h4>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Session Type:</label>
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="border rounded px-3 py-2"
            disabled={isActive}
          >
            {sessionTypes.map(session => (
              <option key={session.id} value={session.id}>
                {session.name} ({Math.floor(session.duration / 60)} min)
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-6xl font-bold text-blue-600">
          {formatTime(timeLeft)}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
            style={{ 
              width: `${((sessionTypes.find(s => s.id === sessionType).duration - timeLeft) / sessionTypes.find(s => s.id === sessionType).duration) * 100}%` 
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        {!isActive ? (
          <button
            onClick={startTimer}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start Session
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Stop
          </button>
        )}
        <button
          onClick={resetTimer}
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Reset
        </button>
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}