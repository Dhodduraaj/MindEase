import { useState, useEffect, useRef } from 'react'
import { chatApi } from '../lib/api'

export default function TherapyNew() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Add welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Hello! I\'m your mental health support assistant powered by AI. I\'m here to listen, provide support, and help you explore your thoughts and feelings. How are you doing today?'
      }])
    }
  }, [])

  async function sendMessage() {
    if (!input.trim()) return
    
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    
    try {
      const { reply } = await chatApi.send(userMsg.content)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((m) => [...m, { 
        role: 'assistant', 
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment. If you\'re in crisis, please contact a crisis helpline immediately: 988 (US) or your local emergency services.' 
      }])
    } finally { 
      setLoading(false) 
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !loading) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">🤖</span>
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Therapy Assistant
            </h1>
            <p className="text-gray-600">Powered by Google Gemini</p>
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A safe, confidential space to explore your thoughts and feelings with AI-powered support
        </p>
      </div>
      
      {/* Chat Container */}
      <div className="card p-6 shadow-xl">
        {/* Messages Area */}
        <div className="h-[500px] overflow-y-auto mb-6 p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border-2 border-gray-200">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`mb-4 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${m.role === 'user' ? 'order-2' : 'order-1'}`}>
                {/* Avatar */}
                <div className={`flex items-center space-x-2 mb-2 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    m.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : 'bg-gradient-to-br from-purple-500 to-pink-600'
                  }`}>
                    <span className="text-white">{m.role === 'user' ? '👤' : '🤖'}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {m.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                
                {/* Message Bubble */}
                <div className={`px-6 py-4 rounded-2xl shadow-md ${
                  m.role === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                    : 'bg-white text-gray-800 border border-gray-200'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed text-sm">
                    {m.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[75%]">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-gradient-to-br from-purple-500 to-pink-600">
                    <span className="text-white">🤖</span>
                  </div>
                  <span className="text-xs font-medium text-gray-600">AI Assistant</span>
                </div>
                <div className="px-6 py-4 rounded-2xl shadow-md bg-white border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <span className="text-sm text-gray-500 ml-2">Thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea 
              className="w-full border-2 border-gray-300 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none" 
              placeholder="Share what's on your mind..." 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={handleKeyPress}
              disabled={loading}
              rows="3"
            />
            <div className="absolute right-4 bottom-4">
              <span className="text-gray-400 text-xl">💭</span>
            </div>
          </div>
          <button 
            onClick={sendMessage} 
            disabled={loading || !input.trim()}
            className="btn-primary flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed self-end h-fit"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span className="text-xl">📤</span>
                <span>Send</span>
              </>
            )}
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button 
            onClick={() => setInput("I'm feeling anxious today")}
            disabled={loading}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors disabled:opacity-50"
          >
            😰 Feeling anxious
          </button>
          <button 
            onClick={() => setInput("I'm feeling sad")}
            disabled={loading}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors disabled:opacity-50"
          >
            😢 Feeling sad
          </button>
          <button 
            onClick={() => setInput("I'm stressed about work")}
            disabled={loading}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors disabled:opacity-50"
          >
            😓 Work stress
          </button>
          <button 
            onClick={() => setInput("I can't sleep well")}
            disabled={loading}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors disabled:opacity-50"
          >
            😴 Sleep issues
          </button>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
            <p className="text-yellow-700 leading-relaxed text-sm">
              This AI assistant provides supportive conversation but is not a substitute for professional mental health care. 
              If you're in crisis or having thoughts of self-harm, please contact emergency services (911) or a crisis helpline 
              immediately: <strong>988 Suicide & Crisis Lifeline</strong> (US) or <strong>Crisis Text Line: Text "HELLO" to 741741</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-gray-800 mb-1">Private & Secure</h3>
          <p className="text-sm text-gray-600">Your conversations are confidential</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">🤝</div>
          <h3 className="font-semibold text-gray-800 mb-1">Empathetic Support</h3>
          <p className="text-sm text-gray-600">Non-judgmental, compassionate responses</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-800 mb-1">Instant Availability</h3>
          <p className="text-sm text-gray-600">24/7 support whenever you need it</p>
        </div>
      </div>
    </div>
  )
}
