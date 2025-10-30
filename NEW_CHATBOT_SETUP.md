# New AI Chatbot Setup - Complete Guide

## ✅ What Was Done

### 1. Removed Old Chatbot
- Removed rule-based chatbot logic
- Cleaned up old OpenAI integration
- Kept the old `Therapy.jsx` file (can be deleted manually if needed)

### 2. Created New Gemini-Powered Chatbot
- **New File**: `mental-health/src/pages/TherapyNew.jsx`
- **Backend**: Updated `mental-health-backend/src/routes/chat.js`
- **API Key**: Configured in `mental-health-backend/.env`

### 3. Updated Configuration
- Set `GEMINI_API_KEY=AIzaSyDBF7eW-9xRzm8MHX6rx8ZLHeC9O7WFzlk` in backend `.env`
- Updated `package.json` to use `@google/generative-ai` v0.21.0
- Configured Gemini 1.5 Flash model with mental health system instructions

## 🚀 How to Start

### Step 1: Install Dependencies
```powershell
# Backend
cd e:\GitHub\MindEase\mental-health-backend
npm install

# Frontend (if needed)
cd e:\GitHub\MindEase\mental-health
npm install
```

### Step 2: Start Backend
```powershell
cd e:\GitHub\MindEase\mental-health-backend
npm start
```
**Expected output:**
```
Connected to MongoDB
Server listening on http://localhost:4000
```

### Step 3: Start Frontend
```powershell
cd e:\GitHub\MindEase\mental-health
npm run dev
```
**Expected output:**
```
Local: http://localhost:5173
```

### Step 4: Test the Chatbot
1. Open browser to `http://localhost:5173`
2. Login/Register if needed
3. Click **"💬 Therapy"** in the navigation
4. You should see the new AI chatbot interface
5. Try sending a message like "I'm feeling anxious"

## 🎨 New Features

### Modern UI
- **Gradient design** with purple/pink theme
- **Message bubbles** with avatars
- **Auto-scroll** to latest message
- **Loading indicators** with animated dots
- **Quick action buttons** for common topics

### AI Capabilities
- **Powered by Google Gemini 1.5 Flash**
- **CBT-focused responses** (Cognitive Behavioral Therapy)
- **Empathetic and supportive** tone
- **Concise responses** (2-4 sentences)
- **Context-aware** conversations
- **Crisis detection** with helpline information

### Quick Actions
Pre-filled prompts for common concerns:
- 😰 Feeling anxious
- 😢 Feeling sad
- 😓 Work stress
- 😴 Sleep issues

## 🔧 Technical Details

### Backend API Endpoint
- **URL**: `POST /api/chat`
- **Body**: `{ "message": "user message here" }`
- **Response**: `{ "reply": "AI response here" }`

### Gemini Configuration
```javascript
model: 'gemini-1.5-flash'
systemInstruction: Mental health support assistant with CBT techniques
maxTokens: Default (model handles this)
temperature: Default (balanced creativity/consistency)
```

### Error Handling
- **API key missing**: Returns 500 error
- **Gemini API error**: Returns fallback message
- **Quota exceeded**: Special fallback with crisis resources
- **Network error**: User-friendly error message

## 🛡️ Safety Features

### Built-in Protections
1. **Crisis Detection**: Recognizes crisis language and provides helpline info
2. **Professional Boundaries**: Never diagnoses or prescribes
3. **Encourages Professional Help**: When appropriate
4. **Disclaimer**: Prominent warning about not replacing professional care

### Crisis Resources Provided
- **988 Suicide & Crisis Lifeline** (US)
- **Crisis Text Line**: Text "HELLO" to 741741
- **Emergency Services**: 911

## 📝 System Instructions

The AI is instructed to:
- ✅ Provide empathetic, non-judgmental support
- ✅ Use CBT techniques when appropriate
- ✅ Keep responses concise (2-4 sentences)
- ✅ Validate feelings and emotions
- ✅ Suggest healthy coping strategies
- ✅ Encourage professional help when needed
- ❌ Never diagnose or prescribe medication
- ✅ Be warm, supportive, and understanding
- ✅ Ask follow-up questions
- ✅ Focus on present moment and actionable steps

## 🧪 Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can navigate to /therapy page
- [ ] Welcome message appears
- [ ] Can send a message
- [ ] AI responds within 3-5 seconds
- [ ] Messages display correctly
- [ ] Quick action buttons work
- [ ] Loading indicator shows while waiting
- [ ] Auto-scrolls to new messages
- [ ] Disclaimer is visible
- [ ] Crisis resources are mentioned when appropriate

## 🐛 Troubleshooting

### Issue: "API key not configured"
**Solution**: 
- Check `mental-health-backend/.env` has `GEMINI_API_KEY=AIzaSyDBF7eW-9xRzm8MHX6rx8ZLHeC9O7WFzlk`
- Restart backend server

### Issue: "Failed to load @google/generative-ai"
**Solution**:
```powershell
cd e:\GitHub\MindEase\mental-health-backend
npm install @google/generative-ai
npm start
```

### Issue: Chatbot not responding
**Possible causes**:
1. Backend not running → Start it
2. API key invalid → Check .env file
3. Network issue → Check internet connection
4. Quota exceeded → Check Gemini API console

**Check backend logs** for specific error messages

### Issue: Blank page on /therapy
**Solution**:
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check if both servers are running
4. Verify you're logged in

### Issue: "429 Too Many Requests"
**Cause**: API quota exceeded
**Solution**: 
- Wait a few minutes
- Check Gemini API quota in Google Cloud Console
- Fallback message will be shown to user

## 📊 API Usage

### Gemini 1.5 Flash Limits
- **Free tier**: 15 requests per minute
- **Paid tier**: Higher limits available
- **Token limit**: ~1M tokens per request

### Monitoring Usage
1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Check API key usage
3. Monitor quota and billing

## 🔄 Comparison: Old vs New

### Old Chatbot (Removed)
- ❌ Rule-based pattern matching
- ❌ Limited responses
- ❌ No context awareness
- ❌ Repetitive answers
- ✅ No API costs

### New Chatbot (Current)
- ✅ AI-powered with Gemini
- ✅ Context-aware conversations
- ✅ Natural, varied responses
- ✅ CBT-focused support
- ✅ Better user experience
- ⚠️ Requires API key (free tier available)

## 📁 Files Modified

### Backend
- ✅ `mental-health-backend/.env` - Added Gemini API key
- ✅ `mental-health-backend/src/routes/chat.js` - New Gemini integration
- ✅ `mental-health-backend/package.json` - Updated dependencies

### Frontend
- ✅ `mental-health/src/pages/TherapyNew.jsx` - New chatbot UI
- ✅ `mental-health/src/App.jsx` - Updated route to use TherapyNew
- ℹ️ `mental-health/src/pages/Therapy.jsx` - Old file (can be deleted)

## 🗑️ Optional Cleanup

You can safely delete these files:
```powershell
# Old therapy page
rm e:\GitHub\MindEase\mental-health\src\pages\Therapy.jsx

# Rename new file to replace old one
mv e:\GitHub\MindEase\mental-health\src\pages\TherapyNew.jsx e:\GitHub\MindEase\mental-health\src\pages\Therapy.jsx

# Then update App.jsx import back to 'Therapy'
```

## 🎯 Next Steps

1. **Test the chatbot** thoroughly
2. **Monitor API usage** in Google Cloud Console
3. **Gather user feedback** on AI responses
4. **Fine-tune system instructions** if needed
5. **Consider upgrading** to paid tier if usage is high

## 📞 Support

If issues persist:
1. Check backend console for errors
2. Check browser console (F12) for frontend errors
3. Verify API key is valid in Google AI Studio
4. Check network tab to see if API calls are being made
5. Review backend logs for Gemini API errors

---

**Status**: ✅ Ready to use
**Last Updated**: 2025-10-05
**API**: Google Gemini 1.5 Flash
**Model**: gemini-1.5-flash
