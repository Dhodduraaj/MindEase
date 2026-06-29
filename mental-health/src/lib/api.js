import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Initialize Gemini client directly on the frontend
const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API || import.meta.env.VITE_GEMINI_API_KEY
  return new GoogleGenerativeAI(apiKey)
}

export const authApi = {
  async register(payload) {
    const { data } = await api.post('/auth/register', payload)
    return data
  },
  async login(payload) {
    const { data } = await api.post('/auth/login', payload)
    return data
  },
}

export const moodApi = {
  async list() {
    const { data } = await api.get('/moods')
    return data
  },
  async create(payload) {
    const { data } = await api.post('/moods', payload)
    return data
  },
  async update(id, payload) {
    const { data } = await api.put(`/moods/${id}`, payload)
    return data
  },
  async remove(id) {
    const { data } = await api.delete(`/moods/${id}`)
    return data
  },
}

export const chatApi = {
  async send(message) {
    try {
      const genAI = getGeminiClient()
      const model = genAI.getGenerativeModel({ 
        model: 'gemini-2.0-flash',
        systemInstruction: `You are a compassionate mental health support assistant. Your role is to:
- Provide empathetic, non-judgmental support
- Use CBT (Cognitive Behavioral Therapy) techniques when appropriate
- Keep responses concise (2-4 sentences)
- Validate feelings and emotions
- Suggest healthy coping strategies
- Encourage professional help when needed
- Never diagnose or prescribe medication
- Be warm, supportive, and understanding
- Ask follow-up questions to understand better
- Focus on the present moment and actionable steps`
      })

      const result = await model.generateContent(message)
      const reply = result.response.text()

      if (!reply) {
        throw new Error('Empty response from Gemini')
      }

      return { reply: reply.trim() }
    } catch (e) {
      console.error('Gemini frontend chat API error:', e)
      throw e
    }
  }
}

export const emotionApi = {
  async analyze(base64Jpeg) {
    // Left as stub for backward compatibility; actual vision analysis is done directly on the page
    return {
      primaryEmotion: "neutral",
      confidence: 0.9,
      secondaryEmotions: [],
      suggestions: ["Focus on deep breathing", "Take a short walk"]
    }
  }
}

export const questionnaireApi = {
  async analyze(answers, summary) {
    try {
      const genAI = getGeminiClient()
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

      const prompt = `You are a compassionate mental health assistant using CBT style.
Given the user's questionnaire responses and computed summary, produce a concise JSON report only.

Return strictly this JSON shape and nothing else:
{
  "mentalScoreOutOfTen": number (0-10, 1 decimal),
  "mentalStatus": one of ["low", "moderate", "high"],
  "personalizedSuggestion": string (2-4 short sentences, empathetic),
  "riskNote": string (optional, present only if low)
}

Guidance:
- Map the provided averageScore (1-5) and percentageScore to a 0-10 scale for mentalScoreOutOfTen.
- Use user's answers (e.g., stress/anxiety/sleep) to tailor the suggestion.
- Keep tone supportive, no diagnosis or medication advice.
`

      const content = JSON.stringify({ answers, summary })

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }, { text: content }] }],
        generationConfig: { temperature: 0.5, maxOutputTokens: 300 },
      })

      const text = result?.response?.text()?.trim() || ''
      
      // Extract JSON from response (handle markdown code blocks if the model wrapped it)
      let jsonText = text
      if (text.includes('```json')) {
        jsonText = text.split('```json')[1].split('```')[0].trim()
      } else if (text.includes('```')) {
        jsonText = text.split('```')[1].split('```')[0].trim()
      }

      let json
      try {
        json = JSON.parse(jsonText)
      } catch (parseErr) {
        console.error('Failed to parse Gemini questionnaire response as JSON:', text, parseErr)
        // Fallback JSON in case of parsing failure
        json = {
          mentalScoreOutOfTen: Math.round((summary.averageScore * 2) * 10) / 10,
          mentalStatus: summary.averageScore <= 2 ? 'low' : summary.averageScore >= 4 ? 'high' : 'moderate',
          personalizedSuggestion: "Thank you for taking the assessment. Remember to practice gentle self-care, focus on deep breathing, and reach out to friends or family when you need support.",
        }
      }

      return json
    } catch (e) {
      console.error('Gemini frontend questionnaire API error:', e)
      throw e
    }
  }
}

export default api
