# MindEase - Quick Start Guide

## 🚀 Start the Application

### 1. Install Dependencies (First Time Only)
```powershell
# Backend
cd e:\GitHub\MindEase\mental-health-backend
npm install

# Frontend
cd e:\GitHub\MindEase\mental-health
npm install
```

### 2. Start Backend Server
```powershell
cd e:\GitHub\MindEase\mental-health-backend
npm start
```
✅ **Expected**: "Server listening on http://localhost:4000"

### 3. Start Frontend Server
```powershell
cd e:\GitHub\MindEase\mental-health
npm run dev
```
✅ **Expected**: "Local: http://localhost:5173"

### 4. Open in Browser
Navigate to: **http://localhost:5173**

## 🎯 Features Overview

### 1. 💬 AI Therapy Chatbot
**Location**: Navigation → "💬 Therapy"

**What it does**:
- AI-powered mental health support
- Uses Google Gemini 2.5 Pro
- CBT-focused responses
- Real-time conversation
- Quick action buttons

**How to use**:
1. Click "💬 Therapy" in navigation
2. Type your message or use quick actions
3. Get instant AI support

---

### 2. 📸 AI Face Mood Detection
**Location**: Navigation → "📸 Face Mood"

**What it does**:
- Analyzes facial expressions
- Detects 10 different emotions
- Provides mood assessment
- Gives personalized suggestions
- Uses Google Gemini Vision AI

**How to use**:
1. Click "📸 Face Mood" in navigation
2. Allow camera access
3. Click "Capture & Analyze Mood"
4. View your results in 2-3 seconds

**Detects**:
- Happy 😊, Sad 😢, Angry 😠
- Anxious 😰, Neutral 😐, Excited 🤩
- Surprised 😲, Calm 😌, Stressed 😓, Tired 😴

---

### 3. 📋 Mood Assessment Survey
**Location**: Homepage → "Take Mood Assessment"

**What it does**:
- 10-question mental health survey
- Generates personalized report
- Provides recommendations
- Tracks mood levels

**How to use**:
1. Click "Take Mood Assessment" on homepage
2. Answer 10 questions
3. View your mood report
4. Get personalized recommendations

---

### 4. 📅 Appointments
**Location**: Navigation → "📅 Appointments"

**What it does**:
- Book mental health appointments
- View upcoming sessions
- Manage schedule

---

### 5. 📚 Resources
**Location**: Navigation → "📚 Resources"

**What it does**:
- Mental health articles
- Coping strategies
- Educational content
- Crisis helplines

---

### 6. 🎮 Activities
**Location**: Navigation → "🎮 Activities"

**What it does**:
- Relaxation exercises
- Mindfulness activities
- Mood-boosting games

## 🔑 API Keys Configuration

### Backend (.env file)
Location: `mental-health-backend/.env`

```env
GEMINI_API_KEY=AIzaSyDBF7eW-9xRzm8MHX6rx8ZLHeC9O7WFzlk
MONGO_URI=mongodb://127.0.0.1:27017/mental_health
PORT=4000
```

### Frontend (Hardcoded in FaceMoodDetection.jsx)
- Face mood detection uses API key directly in code
- For production, move to backend proxy

## 🧪 Testing Checklist

### Chatbot
- [ ] Can send messages
- [ ] Receives AI responses
- [ ] Quick actions work
- [ ] Loading indicator shows
- [ ] Messages display correctly

### Face Mood Detection
- [ ] Camera access granted
- [ ] Video feed displays
- [ ] Capture works
- [ ] AI analysis completes
- [ ] Results display correctly
- [ ] Suggestions are relevant

### Survey
- [ ] All 10 questions display
- [ ] Can answer questions
- [ ] Progress bar updates
- [ ] Report generates
- [ ] Recommendations show

## 🐛 Common Issues

### Backend won't start
**Error**: "Cannot find module"
**Solution**: 
```powershell
cd e:\GitHub\MindEase\mental-health-backend
npm install
```

### Frontend won't start
**Error**: "Cannot find module"
**Solution**:
```powershell
cd e:\GitHub\MindEase\mental-health
npm install
```

### Chatbot not responding
**Check**:
1. Backend is running
2. `GEMINI_API_KEY` is set in backend `.env`
3. No console errors (F12)

### Face detection not working
**Check**:
1. Camera permissions allowed
2. No other app using camera
3. Good lighting
4. Face clearly visible

### Blank page
**Check**:
1. Both servers running
2. Browser console for errors (F12)
3. Logged in (go to /auth)

## 📱 Browser Support

### ✅ Fully Supported
- Chrome 90+
- Edge 90+
- Firefox 88+

### ⚠️ Limited Support
- Safari 14+ (camera issues possible)
- Mobile browsers (performance may vary)

## 🔒 Privacy & Security

### Data Handling
- ✅ Conversations not stored permanently
- ✅ Face images analyzed in real-time, not saved
- ✅ Local processing where possible
- ✅ Secure API communication

### API Keys
- Backend key stored in `.env` (secure)
- Frontend key in code (for demo only)
- **Production**: Move all keys to backend

## 📊 Project Structure

```
MindEase/
├── mental-health/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── TherapyNew.jsx      # Chatbot
│   │   │   ├── FaceMoodDetection.jsx  # Face mood
│   │   │   ├── Homepage.jsx         # Home
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── MoodQuestionnaire.jsx  # Survey
│   │   │   └── ...
│   │   └── lib/
│   │       └── api.js              # API calls
│   └── package.json
│
├── mental-health-backend/      # Backend (Node.js + Express)
│   ├── src/
│   │   └── routes/
│   │       ├── chat.js            # Chatbot API
│   │       ├── auth.js            # Authentication
│   │       └── moods.js           # Mood tracking
│   ├── server.js
│   ├── .env                       # API keys
│   └── package.json
│
└── Documentation/
    ├── QUICK_START.md             # This file
    ├── NEW_CHATBOT_SETUP.md       # Chatbot details
    ├── FACE_MOOD_DETECTION_SETUP.md  # Face detection details
    └── TESTING_INSTRUCTIONS.md    # Troubleshooting
```

## 🎯 Next Steps

### After Starting
1. ✅ Register/Login
2. ✅ Try the chatbot
3. ✅ Test face mood detection
4. ✅ Complete mood survey
5. ✅ Explore all features

### For Development
1. Check console for errors
2. Monitor API usage
3. Test on different browsers
4. Gather user feedback
5. Optimize performance

## 📞 Need Help?

### Check Documentation
- `NEW_CHATBOT_SETUP.md` - Chatbot details
- `FACE_MOOD_DETECTION_SETUP.md` - Face detection guide
- `TESTING_INSTRUCTIONS.md` - Troubleshooting

### Debug Steps
1. Open browser console (F12)
2. Check for red errors
3. Verify both servers running
4. Check API keys configured
5. Test camera/permissions

## ✨ Summary

### What's Working
- ✅ AI Therapy Chatbot (Gemini 2.5 Pro)
- ✅ AI Face Mood Detection (Gemini Vision)
- ✅ 10-Question Mood Survey
- ✅ User Authentication
- ✅ Mood Tracking
- ✅ Resources & Activities

### Technologies Used
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, MongoDB
- **AI**: Google Gemini API
- **Auth**: JWT tokens

### Ready to Use!
Everything is configured and ready. Just start both servers and open your browser!

---

**Happy coding! 🚀**
