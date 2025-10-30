import { useEffect, useRef, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import { emotionApi } from '../lib/api'

export default function FaceEmotionDetector({ onEmotionDetected, onStopDetection }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const modelRef = useRef(null)
  const rafRef = useRef(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [currentEmotion, setCurrentEmotion] = useState(null)
  const [detectedEmotions, setDetectedEmotions] = useState([])
  const [error, setError] = useState('')
  const [status, setStatus] = useState('Ready to start detection')
  const [cameraReady, setCameraReady] = useState(false)
  const [stream, setStream] = useState(null)
  const [faceDetected, setFaceDetected] = useState(false)
  const [modelReady, setModelReady] = useState(false)

  const drawAnnotations = (ctx, keypoints) => {
    ctx.strokeStyle = 'rgba(59,130,246,0.9)'
    ctx.lineWidth = 2
    for (const pt of keypoints) {
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, 1.8, 0, 2 * Math.PI)
      ctx.stroke()
    }
  }

  const drawBoundingBox = (ctx, keypoints, label) => {
    if (!keypoints || keypoints.length === 0) return
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (const p of keypoints) {
      if (p.x < minX) minX = p.x
      if (p.y < minY) minY = p.y
      if (p.x > maxX) maxX = p.x
      if (p.y > maxY) maxY = p.y
    }
    ctx.strokeStyle = 'rgba(16,185,129,0.9)'
    ctx.lineWidth = 3
    ctx.strokeRect(minX - 8, minY - 8, (maxX - minX) + 16, (maxY - minY) + 16)

    if (label) {
      ctx.fillStyle = 'rgba(16,185,129,0.9)'
      ctx.font = '14px sans-serif'
      const textWidth = ctx.measureText(label).width
      ctx.fillRect(minX - 8, minY - 30, textWidth + 12, 22)
      ctx.fillStyle = '#ffffff'
      ctx.fillText(label, minX - 2, minY - 14)
    }
  }

  const inferEmotion = (keypoints) => {
    // Enhanced emotion detection with more emotions
    const byIndex = (i) => keypoints[i]
    
    // Key facial landmarks
    const leftMouth = byIndex(61)
    const rightMouth = byIndex(291)
    const upperLip = byIndex(13)
    const lowerLip = byIndex(14)
    const leftBrow = byIndex(70)
    const rightBrow = byIndex(300)
    const leftEyeTop = byIndex(159)
    const leftEyeBottom = byIndex(145)
    const rightEyeTop = byIndex(386)
    const rightEyeBottom = byIndex(374)
    const noseTip = byIndex(1)
    const leftMouthCorner = byIndex(61)
    const rightMouthCorner = byIndex(291)
    const mouthTop = byIndex(0)
    const mouthBottom = byIndex(17)

    if (!leftMouth || !rightMouth || !upperLip || !lowerLip || !leftBrow || !rightBrow) {
      return 'neutral'
    }

    // Calculate facial metrics
    const mouthWidth = Math.hypot(rightMouth.x - leftMouth.x, rightMouth.y - leftMouth.y)
    const mouthOpen = Math.abs(lowerLip.y - upperLip.y)
    const browSeparation = Math.abs(rightBrow.x - leftBrow.x)
    const leftEyeOpen = leftEyeBottom && leftEyeTop ? Math.abs(leftEyeBottom.y - leftEyeTop.y) : 10
    const rightEyeOpen = rightEyeBottom && rightEyeTop ? Math.abs(rightEyeBottom.y - rightEyeTop.y) : 10
    const avgEyeOpen = (leftEyeOpen + rightEyeOpen) / 2
    
    // Mouth corner positions (for smile detection)
    const mouthCenterY = (leftMouth.y + rightMouth.y) / 2
    const browCenterY = (leftBrow.y + rightBrow.y) / 2
    const mouthCornerRaise = noseTip ? (noseTip.y - mouthCenterY) : 0
    
    // Eyebrow position (for anger/surprise)
    const browHeight = noseTip ? (browCenterY - noseTip.y) : 0
    
    // Ratios for emotion detection
    const smileScore = mouthWidth / Math.max(1, browSeparation)
    const surpriseScore = mouthOpen / Math.max(1, avgEyeOpen)
    const mouthOpenRatio = mouthOpen / Math.max(1, mouthWidth)
    
    // HAPPY: Wide smile, mouth corners raised, eyes slightly closed
    if (smileScore > 0.48 && mouthOpen < 15 && mouthCornerRaise > 0) {
      return 'happy'
    }
    
    // EXCITED: Wide smile with mouth more open, eyes wide
    if (smileScore > 0.46 && mouthOpen > 12 && mouthOpen < 25 && avgEyeOpen > 8) {
      return 'excited'
    }
    
    // SURPRISED: Mouth wide open, eyes wide open, eyebrows raised
    if (surpriseScore > 2.2 && avgEyeOpen > 10 && browHeight < -10) {
      return 'surprised'
    }
    
    // ANGRY: Eyebrows lowered, mouth slightly open or tight, eyes narrowed
    if (browHeight > 5 && avgEyeOpen < 8 && mouthOpen < 10) {
      return 'angry'
    }
    
    // SAD: Mouth corners down, slight frown, eyes may be droopy
    if (mouthOpen > 5 && mouthOpen < 15 && smileScore < 0.42 && mouthCornerRaise < -5) {
      return 'sad'
    }
    
    // NEUTRAL: Default state
    return 'neutral'
  }

  const detectFrame = async () => {
    if (!modelRef.current || !videoRef.current) return
    const predictions = await modelRef.current.estimateFaces({ input: videoRef.current, flipHorizontal: true })

    const ctx = canvasRef.current?.getContext('2d')
    if (ctx && videoRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }

    if (predictions && predictions.length > 0) {
      setFaceDetected(true)
      const face = predictions[0]
      const keypoints = face.keypoints || face.mesh || []
      if (ctx && keypoints.length) {
        drawAnnotations(ctx, keypoints)
        drawBoundingBox(ctx, keypoints, currentEmotion ? currentEmotion.toUpperCase() : '')
      }
      const emotion = inferEmotion(keypoints)
      setCurrentEmotion(emotion)
      setDetectedEmotions(prev => (prev[prev.length - 1] === emotion ? prev : [...prev, emotion]))
      setStatus(`Face detected! Emotion: ${emotion}`)
      if (onEmotionDetected) onEmotionDetected(emotion)
    } else {
      setFaceDetected(false)
      setStatus('Please position your face in the camera view')
    }

    rafRef.current = requestAnimationFrame(detectFrame)
  }

  const startDetection = () => {
    if (!cameraReady) {
      setStatus('Camera not ready. Please wait...')
      return
    }
    if (!modelReady) {
      setStatus('Model loading... please wait')
      return
    }
    setIsDetecting(true)
    setDetectedEmotions([])
    setStatus('Detection active - analyzing facial expressions...')
    rafRef.current = requestAnimationFrame(detectFrame)
  }

  // Send a frame to backend every few seconds for deeper analysis
  useEffect(() => {
    let interval
    if (isDetecting && videoRef.current) {
      interval = setInterval(async () => {
        try {
          const video = videoRef.current
          if (!video || video.readyState < 2) return
          const off = document.createElement('canvas')
          off.width = video.videoWidth
          off.height = video.videoHeight
          const octx = off.getContext('2d')
          octx.drawImage(video, 0, 0, off.width, off.height)
          const dataUrl = off.toDataURL('image/jpeg', 0.7)
          const base64 = dataUrl.split(',')[1]
          const analysis = await emotionApi.analyze(base64)
          // Optionally merge analysis.suggestions somewhere in UI
          if (analysis?.primaryEmotion) {
            setCurrentEmotion(analysis.primaryEmotion)
          }
        } catch (e) {
          // Non-fatal; ignore intermittent errors
        }
      }, 4000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isDetecting])

  const stopDetection = () => {
    setIsDetecting(false)
    setStatus('Stopping detection...')
    
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    
    // Don't stop the camera stream, just stop detection
    setStatus('Detection stopped. Click "Start Detection" to begin again.')
    
    // Calculate most frequent emotion
    setTimeout(() => {
      if (detectedEmotions.length > 0) {
        const emotionCounts = detectedEmotions.reduce((acc, emotion) => {
          acc[emotion] = (acc[emotion] || 0) + 1
          return acc
        }, {})
        
        const mostFrequentEmotion = Object.keys(emotionCounts).reduce((a, b) => 
          emotionCounts[a] > emotionCounts[b] ? a : b
        )
        
        setStatus(`Detection stopped. Final result: ${mostFrequentEmotion}`)
        if (onStopDetection) {
          onStopDetection(mostFrequentEmotion, detectedEmotions)
        }
      } else {
        setStatus('Detection stopped - no emotions detected')
        if (onStopDetection) {
          onStopDetection('neutral', [])
        }
      }
    }, 500)
  }

  useEffect(() => {
    const startCamera = async () => {
      try {
        setStatus('Starting camera...')
        const newStream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        })
        setStream(newStream)
        if (videoRef.current) {
          videoRef.current.srcObject = newStream
          setStatus('Camera ready. Click "Start Detection" to begin.')
          setCameraReady(true)
        }
      } catch (err) {
        setError('Camera access denied. Please allow camera permissions.')
        setStatus('Camera access denied')
        setCameraReady(false)
      }
    }

    const load = async () => {
      try {
        await tf.setBackend('webgl')
        await tf.ready()
        const model = await faceLandmarksDetection.createDetector(
          faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
          {
            runtime: 'tfjs',
            refineLandmarks: true
          }
        )
        modelRef.current = model
        setModelReady(true)
      } catch (e) {
        setError('Failed to load face landmark model')
      }
    }

    startCamera()
    load()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800">Face Emotion Detection</h3>
        <p className="text-gray-600 mt-2">AI-powered real-time emotion recognition</p>
      </div>
      
      {error && <div className="p-3 bg-red-100 text-red-800 rounded-lg border-2 border-red-300">{error}</div>}
      
      {/* Instructions */}
      {!isDetecting && (
        <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">📋 Instructions:</h4>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Allow camera access when prompted</li>
            <li>Position your face clearly in the camera view</li>
            <li>Ensure good lighting for better accuracy</li>
            <li>Try different expressions: smile, frown, surprise, etc.</li>
            <li>Click "Start Detection" to begin analyzing your emotions</li>
          </ul>
        </div>
      )}
      
      {/* Status Display */}
      <div className={`p-3 rounded-lg border-2 ${
        faceDetected && isDetecting 
          ? 'bg-green-50 border-green-300' 
          : isDetecting 
            ? 'bg-yellow-50 border-yellow-300'
            : 'bg-gray-100 border-gray-300'
      }`}>
        <div className="text-sm font-medium text-gray-700">Status:</div>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
      
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full max-w-md rounded border"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ display: 'none' }}
        />
        {/* Face tracking overlay */}
        {isDetecting && (
          <div className="absolute inset-0 pointer-events-none">
            {faceDetected ? (
              <div className="absolute inset-4 border-4 border-green-500 rounded-lg animate-pulse">
                <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                  Face Detected ✓
                </div>
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-sm font-medium">
                  {currentEmotion && currentEmotion.charAt(0).toUpperCase() + currentEmotion.slice(1)}
                </div>
              </div>
            ) : (
              <div className="absolute inset-4 border-4 border-red-500 rounded-lg animate-pulse">
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  No Face Detected
                </div>
                <div className="absolute bottom-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-sm font-medium">
                  Position face in view
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real-time emotion display with emoji */}
      {currentEmotion && isDetecting && (
        <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 rounded-xl border-2 border-blue-300">
          <div className="flex items-center justify-between">
            <div>
              <strong className="text-lg">Current Emotion:</strong>
              <div className="text-2xl font-bold capitalize mt-1">{currentEmotion}</div>
            </div>
            <div className="text-5xl">
              {currentEmotion === 'happy' && '😊'}
              {currentEmotion === 'sad' && '😢'}
              {currentEmotion === 'angry' && '😠'}
              {currentEmotion === 'surprised' && '😲'}
              {currentEmotion === 'excited' && '🤩'}
              {currentEmotion === 'neutral' && '😐'}
            </div>
          </div>
        </div>
      )}

      {/* Emotion Statistics */}
      {detectedEmotions.length > 0 && (
        <div className="p-4 bg-white rounded-xl shadow-md border-2 border-gray-200">
          <strong className="text-lg text-gray-800 block mb-3">Emotion Analysis:</strong>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {(() => {
              const emotionCounts = detectedEmotions.reduce((acc, emotion) => {
                acc[emotion] = (acc[emotion] || 0) + 1
                return acc
              }, {})
              
              const emotionEmojis = {
                happy: '😊',
                sad: '😢',
                angry: '😠',
                surprised: '😲',
                excited: '🤩',
                neutral: '😐'
              }
              
              return Object.entries(emotionCounts).map(([emotion, count]) => (
                <div key={emotion} className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-300">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{emotionEmojis[emotion]}</span>
                    <span className="capitalize font-medium text-gray-700">{emotion}</span>
                  </div>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm font-bold">{count}</span>
                </div>
              ))
            })()}
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <strong>Total detections:</strong> {detectedEmotions.length}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => {
            if (isDetecting) {
              stopDetection()
            } else {
              startDetection()
            }
          }}
          disabled={!cameraReady}
          className={`px-4 py-2 rounded ${
            isDetecting 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : cameraReady 
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          {isDetecting ? 'Stop Detection' : 'Start Detection'}
        </button>
        
        {detectedEmotions.length > 0 && (
          <button
            onClick={() => {
              setDetectedEmotions([])
              setCurrentEmotion(null)
              setStatus('Ready to start detection')
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  )
}
