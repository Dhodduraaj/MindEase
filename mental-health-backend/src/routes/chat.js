import express from 'express'
import { z } from 'zod'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = express.Router()

const messageSchema = z.object({
  message: z.string().min(1).max(2000),
})

// No auth middleware - chatbot is public

router.post('/', async (req, res) => {
  const parsed = messageSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input' })

  const userMessage = parsed.data.message

  try {
    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set')
      return res.status(500).json({ message: 'API key not configured' })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-pro',
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

    const result = await model.generateContent(userMessage)
    const reply = result.response.text()

    if (!reply) {
      throw new Error('Empty response from Gemini')
    }

    res.json({ reply: reply.trim() })
    
  } catch (e) {
    console.error('Gemini API error:', e)
    
    // Provide helpful fallback based on error
    let fallbackMessage = "I'm here to support you. I'm having trouble connecting right now, but I want you to know that your feelings are valid and important. Can you tell me more about what's on your mind?"
    
    if (e.message?.includes('quota') || e.message?.includes('429')) {
      fallbackMessage = "I'm experiencing high demand right now. While I work on that, please know that your wellbeing matters. If you're in crisis, please reach out to a crisis helpline: 988 (US) or your local emergency services."
    }
    
    res.json({ reply: fallbackMessage })
  }
})

export default router


