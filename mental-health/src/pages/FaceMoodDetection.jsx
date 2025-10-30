import { useState, useRef, useEffect } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default function FaceMoodDetection() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectedMood, setDetectedMood] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cameraReady, setCameraReady] = useState(false)
  const [stream, setStream] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user'
          } 
        })
        setStream(newStream)
        if (videoRef.current) {
          videoRef.current.srcObject = newStream
          await videoRef.current.play()
          setCameraReady(true)
          setError('')
        }
      } catch (err) {
        console.error('Camera error:', err)
        setError(`Camera access denied: ${err.message}. Please allow camera permissions.`)
        setCameraReady(false)
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const captureAndAnalyze = async () => {
    if (!cameraReady || !videoRef.current) {
      setError('Camera not ready')
      return
    }

    setLoading(true)
    setError('')
    setDetectedMood(null)

    try {
      // Ensure video is playing and has valid dimensions
      const video = videoRef.current
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        throw new Error('Video not ready. Please wait a moment and try again.')
      }

      // Capture image from video
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      
      // Clear canvas first
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw current video frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      // Convert to base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8)
      
      // Validate image data
      if (!imageData || imageData === 'data:,') {
        throw new Error('Failed to capture image. Please try again.')
      }
      
      setCapturedImage(imageData)
      
      // Remove data URL prefix
      const base64Image = imageData.split(',')[1]
      
      // Validate base64 data
      if (!base64Image || base64Image.length < 100) {
        throw new Error('Invalid image data. Please try again.')
      }

      // Use Gemini API to analyze the image
      const apiKey = 'AIzaSyDBF7eW-9xRzm8MHX6rx8ZLHeC9O7WFzlk'
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image
          }
        },
        `Analyze this person's facial expression and emotional state. Provide:
1. Primary emotion (happy, sad, angry, anxious, neutral, excited, surprised, calm, stressed, or tired)
2. Confidence level (high, medium, low)
3. Brief description (1-2 sentences) of what you observe in their facial expression
4. Mood assessment (positive, negative, or neutral)

Format your response as JSON:
{
  "emotion": "emotion name",
  "confidence": "confidence level",
  "description": "description",
  "mood": "mood assessment",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Provide 3 helpful suggestions based on the detected emotion.`
      ])

      const responseText = result.response.text()
      
      // Extract JSON from response (handle markdown code blocks)
      let jsonText = responseText
      if (responseText.includes('```json')) {
        jsonText = responseText.split('```json')[1].split('```')[0].trim()
      } else if (responseText.includes('```')) {
        jsonText = responseText.split('```')[1].split('```')[0].trim()
      }
      
      const analysis = JSON.parse(jsonText)
      setDetectedMood(analysis)
      setIsDetecting(true)

    } catch (err) {
      console.error('Analysis error:', err)
      setError(`Failed to analyze mood: ${err.message}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setDetectedMood(null)
    setCapturedImage(null)
    setIsDetecting(false)
    setError('')
    setLoading(false)
    
    // Clear canvas
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }

  const getMoodColor = (mood) => {
    switch (mood?.toLowerCase()) {
      case 'positive': return 'from-green-500 to-emerald-600'
      case 'negative': return 'from-red-500 to-rose-600'
      default: return 'from-blue-500 to-indigo-600'
    }
  }

  const getEmotionEmoji = (emotion) => {
    const emojiMap = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      anxious: '😰',
      neutral: '😐',
      excited: '🤩',
      surprised: '😲',
      calm: '😌',
      stressed: '😓',
      tired: '😴'
    }
    return emojiMap[emotion?.toLowerCase()] || '🙂'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">📸</span>
          </div>
          <div className="text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Face Mood Detection
            </h1>
            <p className="text-gray-600">Powered by Google Gemini Vision AI</p>
          </div>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let AI analyze your facial expression to understand your current emotional state
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-red-800">Error</h4>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Camera Section */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span>📷</span>
            <span>Camera Feed</span>
          </h3>
          
          <div className="relative bg-black rounded-lg overflow-hidden mb-4">
            {!capturedImage ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full rounded-lg"
                style={{ transform: 'scaleX(-1)' }}
              />
            ) : (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full rounded-lg"
                style={{ transform: 'scaleX(-1)' }}
              />
            )}
            
            {!cameraReady && !capturedImage && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p>Loading camera...</p>
                </div>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />

          <div className="flex gap-3">
            {!isDetecting ? (
              <button
                onClick={captureAndAnalyze}
                disabled={!cameraReady || loading}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 py-3 rounded-xl disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">📸</span>
                    <span>Capture & Analyze Mood</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={() => window.location.reload()}
                className="flex-1 btn-secondary flex items-center justify-center space-x-2 py-3 rounded-xl"
              >
                <span className="text-xl">🔄</span>
                <span>Analyze Again</span>
              </button>
            )}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Tip:</strong> Look directly at the camera with a natural expression for best results
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
            <span>🎯</span>
            <span>Analysis Results</span>
          </h3>

          {!detectedMood ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <span className="text-6xl mb-4">🤔</span>
              <p className="text-center">Click "Capture & Analyze Mood" to detect your emotional state</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Emotion Display */}
              <div className={`bg-gradient-to-r ${getMoodColor(detectedMood.mood)} p-6 rounded-xl text-white text-center`}>
                <div className="text-6xl mb-3">{getEmotionEmoji(detectedMood.emotion)}</div>
                <h4 className="text-2xl font-bold capitalize mb-2">{detectedMood.emotion}</h4>
                <p className="text-sm opacity-90">Confidence: {detectedMood.confidence}</p>
              </div>

              {/* Mood Assessment */}
              <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-2">Mood Assessment:</h5>
                <p className="text-gray-700 capitalize font-medium">{detectedMood.mood}</p>
              </div>

              {/* Description */}
              <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                <h5 className="font-semibold text-gray-800 mb-2">Observation:</h5>
                <p className="text-gray-700 text-sm leading-relaxed">{detectedMood.description}</p>
              </div>

              {/* Suggestions */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border-2 border-purple-200">
                <h5 className="font-semibold text-purple-800 mb-3 flex items-center space-x-2">
                  <span>💡</span>
                  <span>Suggestions for You:</span>
                </h5>
                <ul className="space-y-2">
                  {detectedMood.suggestions?.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-purple-900">
                      <span className="text-purple-500 mt-0.5">•</span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">🤖</div>
          <h3 className="font-semibold text-gray-800 mb-1">AI-Powered</h3>
          <p className="text-sm text-gray-600">Advanced Gemini Vision AI analyzes facial expressions</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-semibold text-gray-800 mb-1">Private & Secure</h3>
          <p className="text-sm text-gray-600">Images are analyzed in real-time and not stored</p>
        </div>
        <div className="card p-4 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-800 mb-1">Instant Results</h3>
          <p className="text-sm text-gray-600">Get mood analysis in seconds</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Important Notice</h4>
            <p className="text-yellow-700 leading-relaxed text-sm">
              This AI mood detection is for informational purposes only and should not be used as a diagnostic tool. 
              It provides general insights based on facial expressions. For professional mental health assessment, 
              please consult a qualified healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
