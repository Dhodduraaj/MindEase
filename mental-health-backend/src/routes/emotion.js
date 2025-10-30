import express from 'express'
import { z } from 'zod'
import { GoogleGenerativeAI } from '@google/generative-ai'

const router = express.Router()

const payloadSchema = z.object({
  image: z.string().min(100), // base64 (no data URL prefix)
})

router.post('/', async (req, res) => {
  const parsed = payloadSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input' })

  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return res.status(500).json({ message: 'API key not configured' })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })

    const prompt = `Analyze the person's primary emotion from this image.
Return a strict JSON object with:
{
  "primaryEmotion": one of ["happy","sad","angry","surprised","neutral","fearful","disgusted"],
  "confidence": number between 0 and 1,
  "secondaryEmotions": [{ "label": string, "score": number }] (2-4 items),
  "suggestions": [ string, ... ] (2-4 short supportive coping suggestions)
}
Do not include any extra text besides the JSON.`

    const imageData = parsed.data.image

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [
          { text: prompt },
          { inlineData: { mimeType: 'image/jpeg', data: imageData } },
        ] },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 300,
      },
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
    console.error('Emotion analysis error:', e)
    return res.status(502).json({ message: e?.message || 'Emotion analysis failed' })
  }
})

export default router


