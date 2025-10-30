import express from 'express'
import { z } from 'zod'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = express.Router()

const schema = z.object({
  answers: z.record(z.string(), z.any()),
  summary: z.object({
    totalScore: z.number(),
    maxPossibleScore: z.number(),
    averageScore: z.number(),
    percentageScore: z.number(),
  }),
})

router.post('/', async (req, res) => {
  const parsed = schema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input' })

  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return res.status(500).json({ message: 'API key not configured' })

    const { answers, summary } = parsed.data

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })

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
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    })

    const text = result?.response?.text()?.trim() || ''
    let json
    try {
      json = JSON.parse(text)
    } catch {
      return res.status(502).json({ message: 'Model did not return valid JSON', raw: text })
    }

    return res.json(json)
  } catch (e) {
    console.error('Questionnaire analysis error:', e)
    return res.status(502).json({ message: e?.message || 'Questionnaire analysis failed' })
  }
})

export default router


