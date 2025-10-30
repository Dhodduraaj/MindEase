import { useEffect, useRef, useState } from 'react'

export default function FaceEmotionDetectorSimple({ onEmotionDetected, onStopDetection }) {
  const videoRef = useRef(null)
  const [isDetecting, setIsDetecting] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('Click Start to begin')
  const [cameraReady, setCameraReady] = useState(false)
  const [stream, setStream] = useState(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        setStatus('Requesting camera access...')
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
          setStatus('Camera ready! Click "Start Detection" to begin.')
          setCameraReady(true)
          setError('')
        }
      } catch (err) {
        console.error('Camera error:', err)
        setError(`Camera access denied: ${err.message}. Please allow camera permissions in your browser settings.`)
        setStatus('Camera access denied')
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

  const startDetection = () => {
    if (!cameraReady) {
      setStatus('Camera not ready. Please wait...')
      return
    }
    setIsDetecting(true)
    setStatus('Detection active - This is a test version')
    
    // Simulate emotion detection for testing
    setTimeout(() => {
      if (onEmotionDetected) {
        onEmotionDetected('happy')
      }
    }, 2000)
  }

  const stopDetection = () => {
    setIsDetecting(false)
    setStatus('Detection stopped')
    if (onStopDetection) {
      onStopDetection('happy', ['happy'])
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800">Face Emotion Detection (Test Mode)</h3>
        <p className="text-gray-600 mt-2">Testing camera access</p>
      </div>
      
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg border-2 border-red-300">
          <strong>Error:</strong> {error}
          <div className="mt-2 text-sm">
            <p>To fix this:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Click the camera icon in your browser's address bar</li>
              <li>Allow camera access for this site</li>
              <li>Refresh the page</li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Status Display */}
      <div className={`p-3 rounded-lg border-2 ${
        cameraReady 
          ? 'bg-green-50 border-green-300' 
          : 'bg-yellow-50 border-yellow-300'
      }`}>
        <div className="text-sm font-medium text-gray-700">Status:</div>
        <div className="text-sm text-gray-600">{status}</div>
      </div>
      
      <div className="relative bg-black rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full max-w-md mx-auto rounded"
          style={{ transform: 'scaleX(-1)' }}
        />
        {!cameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading camera...</p>
            </div>
          </div>
        )}
      </div>

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
          className={`px-6 py-3 rounded-lg font-medium ${
            isDetecting 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : cameraReady 
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          {isDetecting ? 'Stop Detection' : 'Start Detection'}
        </button>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This is a simplified test version. If the camera works here, 
          the full AI detection will work too.
        </p>
      </div>
    </div>
  )
}
