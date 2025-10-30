import { useState } from 'react'
import FaceEmotionDetector from './FaceEmotionDetector'
import { questionnaireApi } from '../lib/api'

const questions = [
  {
    id: 1,
    text: "How would you rate your overall mood today?",
    type: "likert",
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: 2,
    text: "How well did you sleep last night?",
    type: "likert",
    options: ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
  },
  {
    id: 3,
    text: "How stressed do you feel right now?",
    type: "likert",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 4,
    text: "How energetic do you feel?",
    type: "likert",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"]
  },
  {
    id: 5,
    text: "How satisfied are you with your current life situation?",
    type: "likert",
    options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"]
  },
  {
    id: 6,
    text: "How anxious do you feel?",
    type: "likert",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 7,
    text: "How connected do you feel to others?",
    type: "likert",
    options: ["Very Isolated", "Isolated", "Neutral", "Connected", "Very Connected"]
  },
  {
    id: 8,
    text: "How motivated are you to complete daily tasks?",
    type: "likert",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"]
  },
  {
    id: 9,
    text: "How hopeful do you feel about the future?",
    type: "likert",
    options: ["Very Hopeless", "Hopeless", "Neutral", "Hopeful", "Very Hopeful"]
  },
  {
    id: 10,
    text: "How would you describe your current emotional state?",
    type: "multiple",
    options: ["Happy", "Sad", "Angry", "Anxious", "Calm", "Excited", "Depressed", "Content"]
  }
]

export default function MoodQuestionnaire({ onSubmit }) {
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [aiReport, setAiReport] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [showFaceTracking, setShowFaceTracking] = useState(false)
  const [faceEmotion, setFaceEmotion] = useState(null)

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      // After 10 questions, generate report directly
      generateReport()
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const generateReport = async () => {
    // Calculate scores properly - handle both numeric and array answers
    const scores = Object.values(answers).map(answer => {
      if (Array.isArray(answer)) {
        // For multiple choice questions, use length as score
        return answer.length
      }
      return typeof answer === 'number' ? answer : 3 // Default to neutral if not a number
    })
    
    const averageScore = scores.length > 0 ? scores.reduce((sum, score) => sum + score, 0) / scores.length : 3
    
    let moodLevel = 'neutral'
    let recommendations = []
    let professionalHelp = false

    if (averageScore <= 2) {
      moodLevel = 'low'
      recommendations = [
        'Try deep breathing exercises',
        'Take a short walk outside',
        'Listen to calming music',
        'Consider talking to a friend'
      ]
      professionalHelp = true
    } else if (averageScore >= 4) {
      moodLevel = 'high'
      recommendations = [
        'Share your positive energy with others',
        'Try a new hobby or activity',
        'Practice gratitude journaling',
        'Help someone else today'
      ]
    } else {
      moodLevel = 'moderate'
      recommendations = [
        'Maintain your current routine',
        'Try some light exercise',
        'Connect with friends or family',
        'Practice mindfulness'
      ]
    }

    const report = {
      moodLevel,
      averageScore: Math.round(averageScore * 10) / 10, // Round to 1 decimal
      recommendations,
      professionalHelp,
      answers
    }

    // Build summary for AI
    const questionScores = questions.map((q) => {
      const answer = answers[q.id]
      let score = 3
      if (Array.isArray(answer)) score = answer.length
      else if (typeof answer === 'number') score = answer
      return { maxScore: q.type === 'likert' ? 5 : 8, score }
    })
    const totalScore = questionScores.reduce((s, i) => s + i.score, 0)
    const maxPossibleScore = questionScores.reduce((s, i) => s + i.maxScore, 0)
    const percentageScore = Math.round((totalScore / maxPossibleScore) * 100)

    setSubmitting(true)
    try {
      const ai = await questionnaireApi.analyze(answers, { totalScore, maxPossibleScore, averageScore, percentageScore })
      setAiReport(ai)
    } catch (e) {
      setAiReport(null)
    } finally {
      setSubmitting(false)
      setShowResults(true)
      if (onSubmit) onSubmit(report)
    }
  }


  if (showResults) {
    // Calculate detailed scores for each question
    const questionScores = questions.map((q, index) => {
      const answer = answers[q.id]
      let score = 3 // Default neutral
      
      if (Array.isArray(answer)) {
        score = answer.length
      } else if (typeof answer === 'number') {
        score = answer
      }
      
      return {
        question: q.text,
        score: score,
        maxScore: q.type === 'likert' ? 5 : 8
      }
    })
    
    const totalScore = questionScores.reduce((sum, item) => sum + item.score, 0)
    const maxPossibleScore = questionScores.reduce((sum, item) => sum + item.maxScore, 0)
    const percentageScore = Math.round((totalScore / maxPossibleScore) * 100)
    const averageScore = totalScore / questionScores.length
    
    const report = {
      moodLevel: averageScore <= 2 ? 'low' : averageScore >= 4 ? 'high' : 'moderate',
      averageScore: Math.round(averageScore * 10) / 10,
      totalScore,
      maxPossibleScore,
      percentageScore,
      questionScores,
      recommendations: averageScore <= 2 ? [
        'Try deep breathing exercises',
        'Take a short walk outside',
        'Listen to calming music',
        'Consider talking to a friend'
      ] : averageScore >= 4 ? [
        'Share your positive energy with others',
        'Try a new hobby or activity',
        'Practice gratitude journaling',
        'Help someone else today'
      ] : [
        'Maintain your current routine',
        'Try some light exercise',
        'Connect with friends or family',
        'Practice mindfulness'
      ],
      professionalHelp: averageScore <= 2
    }

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Mood Analysis Report
          </h3>
          <p className="text-gray-600 mt-2">Comprehensive assessment of your mental wellbeing</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          {/* Overall Score Card */}
          <div className={`bg-gradient-to-r ${
            report.moodLevel === 'low' ? 'from-red-500 to-rose-600' :
            report.moodLevel === 'high' ? 'from-green-500 to-emerald-600' : 
            'from-blue-500 to-indigo-600'
          } p-6 rounded-xl text-white text-center`}>
            <div className="text-6xl font-bold mb-2">{report.percentageScore}%</div>
            <div className="text-2xl font-semibold mb-1">{report.moodLevel.toUpperCase()}</div>
            <p className="text-sm opacity-90">Overall Wellbeing Score</p>
            <div className="mt-4 pt-4 border-t border-white/30">
              <p className="text-sm">Total Score: {report.totalScore} / {report.maxPossibleScore}</p>
              <p className="text-sm">Average: {report.averageScore.toFixed(1)} / 5</p>
            </div>
          </div>

          {/* AI Summary Modal-like card */}
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-xl border-2 border-emerald-200">
            <h4 className="font-semibold text-lg mb-2 text-emerald-800">Personalized AI Summary</h4>
            {submitting && (
              <div className="text-sm text-emerald-700">Generating insights...</div>
            )}
            {!submitting && aiReport && (
              <div className="space-y-2 text-emerald-900">
                <div><strong>Score (0-10):</strong> {aiReport.mentalScoreOutOfTen?.toFixed?.(1) ?? '—'}</div>
                <div><strong>Status:</strong> {aiReport.mentalStatus ?? '—'}</div>
                <div><strong>Suggestion:</strong> {aiReport.personalizedSuggestion ?? '—'}</div>
                {aiReport.riskNote && (
                  <div className="text-amber-800 bg-amber-50 border border-amber-200 rounded p-2"><strong>Note:</strong> {aiReport.riskNote}</div>
                )}
              </div>
            )}
            {!submitting && !aiReport && (
              <div className="text-sm text-emerald-700">Could not generate AI summary. Please try again later.</div>
            )}
          </div>

          {/* Detailed Question Scores */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <span>📊</span>
              <span>Detailed Score Breakdown</span>
            </h4>
            <div className="space-y-3">
              {report.questionScores.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-700 flex-1">
                      Q{index + 1}: {item.question}
                    </p>
                    <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                      {item.score}/{item.maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
            <h4 className="font-semibold text-lg mb-4 flex items-center space-x-2 text-purple-800">
              <span>💡</span>
              <span>Recommended Activities</span>
            </h4>
            <ul className="space-y-2">
              {report.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start space-x-2 text-purple-900">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>


          {report.professionalHelp && (
            <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
              <h4 className="font-semibold text-yellow-800">Consider Professional Help</h4>
              <p className="text-yellow-700">
                Your responses suggest you might benefit from speaking with a mental health professional.
                Consider reaching out to a therapist or counselor.
              </p>
            </div>
          )}

          <button
            onClick={() => {
              setShowResults(false)
              setCurrentQuestion(0)
              setAnswers({})
              setAiReport(null)
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded"
          >
            Take Questionnaire Again
          </button>
        </div>
      </div>
    )
  }


  const question = questions[currentQuestion]
  const currentAnswer = answers[question.id]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Mood Assessment</h3>
        <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h4 className="text-lg font-medium mb-4">{question.text}</h4>
        
        {question.type === 'likert' ? (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={index + 1}
                  checked={currentAnswer === index + 1}
                  onChange={() => handleAnswer(question.id, index + 1)}
                  className="text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {question.options.map((option, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer p-2 border rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={currentAnswer?.includes(option)}
                  onChange={(e) => {
                    const current = currentAnswer || []
                    if (e.target.checked) {
                      handleAnswer(question.id, [...current, option])
                    } else {
                      handleAnswer(question.id, current.filter(item => item !== option))
                    }
                  }}
                  className="text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextQuestion}
            disabled={!currentAnswer}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Generate Report' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
