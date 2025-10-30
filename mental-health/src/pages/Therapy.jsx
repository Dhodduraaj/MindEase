import { useState, useEffect } from 'react'
import { chatApi } from '../lib/api'

export default function Therapy() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  // Backend chat API is used for responses

  // Add welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Hello! I\'m here to provide emotional support and guidance. How are you feeling today?'
      }])
    }
  }, [])

  async function send() {
    if (!input.trim()) return
    
    const userMsg = { role: 'user', content: input }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)
    setApiError('')
    
    try {
      const { reply } = await chatApi.send(userMsg.content)
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
      
    } catch (error) {
      console.error('Chat API error:', error)
      setApiError(`API Error: ${error.message}`)
      
      // Fallback responses based on user input
      const fallbackResponses = [
        "I understand you're going through a difficult time. I'm here to listen and support you. Can you tell me more about what's troubling you?",
        "It sounds like you're dealing with some challenging emotions. That takes courage to share. How can I help you feel more supported right now?",
        "I hear you, and I want you to know that your feelings are valid. What would be most helpful for you in this moment?",
        "Thank you for trusting me with your thoughts. I'm here to listen without judgment. What's weighing on your mind today?"
      ]
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      setMessages((m) => [...m, { role: 'assistant', content: randomResponse }])
      
    } finally { 
      setLoading(false) 
    }
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center float-animation">
            <span className="text-white text-xl">💬</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Therapy Assistant
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your AI-powered mental health companion. Share your thoughts and feelings in a safe, supportive environment.
        </p>
      </div>
      
      {apiError && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded-xl animate-slideIn">
          <div className="flex items-center space-x-2">
            <span className="text-xl">⚠️</span>
            <div>
              <strong className="text-yellow-800">Note:</strong> 
              <span className="text-yellow-700"> {apiError} - Using fallback responses for support.</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Enhanced Chat Interface */}
      <div className="card p-6">
        <div className="h-96 overflow-y-auto border-2 border-gray-100 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-blue-50">
          {messages.map((m, i) => (
            <div key={i} className={`mb-4 animate-slideIn ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block max-w-xs lg:max-w-lg px-6 py-4 rounded-2xl shadow-sm ${
                m.role === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-auto' 
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    m.role === 'user' ? 'bg-blue-400' : 'bg-purple-100'
                  }`}>
                    {m.role === 'user' ? '👤' : '🤖'}
                  </div>
                  <div className="text-sm font-medium">
                    {m.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{m.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left mb-4 animate-slideIn">
              <div className="inline-block bg-white border border-gray-200 px-6 py-4 rounded-2xl shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs">
                    🤖
                  </div>
                  <div className="text-sm font-medium">Assistant</div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="animate-bounce w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div className="animate-bounce w-2 h-2 bg-purple-400 rounded-full" style={{animationDelay: '0.1s'}}></div>
                  <div className="animate-bounce w-2 h-2 bg-purple-400 rounded-full" style={{animationDelay: '0.2s'}}></div>
                  <span className="text-sm text-gray-500 ml-2">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Enhanced Input Area */}
        <div className="mt-6 flex gap-3">
          <div className="flex-1 relative">
            <input 
              className="w-full border-2 border-gray-200 rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300" 
              placeholder="Share what's on your mind..." 
              value={input} 
              onChange={(e)=>setInput(e.target.value)} 
              onKeyDown={(e)=>{ if(e.key==='Enter' && !loading) send() }}
              disabled={loading}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <span className="text-gray-400">💭</span>
            </div>
          </div>
          <button 
            onClick={send} 
            disabled={loading || !input.trim()}
            className="btn-primary flex items-center space-x-2 px-6 py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="spinner w-4 h-4"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>📤</span>
                <span>Send</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Enhanced Disclaimer */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">Important Notice</h4>
            <p className="text-blue-700 leading-relaxed">
              This AI assistant is not a substitute for professional mental health care. 
              If you're in crisis or having thoughts of self-harm, please contact your local emergency services 
              or a mental health professional immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


