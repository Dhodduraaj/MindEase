# MindEase - Mental Health Support Application

MindEase is a comprehensive web application designed to provide mental health support, mood tracking, therapy guidance, and wellness resources for users in India and Tamil Nadu.

## Features

- **Mood Assessment**: AI-powered mood questionnaire with personalized insights
- **Face Emotion Detection**: Real-time emotion detection using TensorFlow.js
- **AI Therapy Chat**: 24/7 mental health support powered by Google Gemini API
- **Appointment Booking**: Schedule appointments with licensed mental health professionals
- **Stress Relief Activities**: Interactive games and exercises for mental wellbeing
- **Educational Resources**: Curated videos, articles, and meditation guides
- **Crisis Support**: Quick access to Indian mental health helplines
- **Localized Content**: India and Tamil Nadu specific mental health resources

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling
- **React Router** - Client-side routing
- **TensorFlow.js** - Machine learning models
- **Axios** - HTTP client
- **Chart.js** - Data visualization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Google Generative AI** - AI support
- **JWT** - Authentication

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or cloud)
- Google Gemini API key

### Environment Setup

1. **Frontend** - Create `.env` file in `mental-health/`:
```
VITE_API_BASE=https://your-api-url/api
```

2. **Backend** - Create `.env` file in `mental-health-backend/`:
```
MONGO_URI=mongodb://localhost:27017/mental_health
GEMINI_API_KEY=your-gemini-api-key
PORT=4000
```

### Installation

```bash
# Install frontend dependencies
cd mental-health
npm install

# Install backend dependencies  
cd ../mental-health-backend
npm install
```

### Development

```bash
# Terminal 1 - Backend
cd mental-health-backend
npm run dev

# Terminal 2 - Frontend
cd mental-health
npm run dev
```

Frontend will be available at `http://localhost:5173`
Backend will run on `http://localhost:4000`

### Build

```bash
cd mental-health
npm run build
```

This creates an optimized production build in `dist/` directory.

## Deployment

### Netlify Deployment

1. **Connect Repository**
   - Push code to GitHub
   - Connect your repository to Netlify

2. **Build Settings**
   - Build command: `cd mental-health && npm run build`
   - Publish directory: `mental-health/dist`

3. **Environment Variables**
   Add in Netlify dashboard:
   - `VITE_API_BASE`: Your production API URL

4. **Redirects** 
   The `netlify.toml` file handles SPA routing with redirect rules

5. **API Backend**
   - Deploy backend separately (Render, Railway, Heroku, or AWS)
   - Update `VITE_API_BASE` with production backend URL

### Backend Deployment Options

The backend can be deployed to:
- **Render** (Free tier available)
- **Railway** (pay-as-you-go)
- **Heroku** (requires paid dyno)
- **AWS** (Lambda + API Gateway)

Required environment variables:
- `MONGO_URI`: MongoDB connection string
- `GEMINI_API_KEY`: Google Gemini API key
- `PORT`: Server port (5000 for Render/Railway)

## Crisis Support - India

**Immediate Help Available:**
- **Aasra**: 9820466726 (24/7)
- **iCall**: 9152987821
- **Vandrevala Foundation**: 9999661036
- **Tamil Nadu Helpline**: 9445241489
- **Emergency**: 112

## Content Localization

This project is localized for Indian users with a focus on Tamil Nadu:
- Indian mental health helplines and resources
- Tamil Nadu specific mental health services
- Indian healthcare platform integrations (Practo, Healthdunia, 1mg, Lybrate)
- Indian mental health organization references

## Project Structure

```
MindEase/
├── mental-health/              # React frontend
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── lib/               # Utilities and API calls
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── mental-health-backend/      # Node.js backend
│   ├── src/
│   │   ├── routes/            # API routes
│   │   ├── models/            # Database models
│   │   └── middleware/        # Express middleware
│   ├── server.js              # Entry point
│   └── package.json
│
├── netlify.toml               # Netlify configuration
└── README.md                  # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Mood Tracking
- `GET /api/moods` - Get user moods
- `POST /api/moods` - Create new mood entry
- `PUT /api/moods/:id` - Update mood
- `DELETE /api/moods/:id` - Delete mood

### Therapy Chat
- `POST /api/chat` - Send message to AI (public)

### Emotion Detection
- `POST /api/emotion` - Analyze emotion from image

### Questionnaire
- `POST /api/questionnaire` - Get AI analysis of questionnaire

## AI Integration

This project uses **Google Generative AI (Gemini API)** exclusively for:
- Chat-based mental health support
- Emotion detection from facial images
- Mood assessment analysis
- Personalized recommendations

All other AI SDKs have been removed to maintain consistency and reduce bundle size.

## Performance Optimizations

- Code splitting for TensorFlow.js, vendor libraries, and UI components
- Lazy loading of route components
- Optimized TailwindCSS with purging
- Image optimization and lazy loading
- CSS animations with GPU acceleration
- Service worker for offline capability (Vite PWA plugin ready)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 13+, Chrome Mobile

## Security

- JWT-based authentication
- CORS configuration for Netlify
- Environment variables for sensitive data
- Input validation with Zod
- Safety settings enabled for Gemini API

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team

---

**Last Updated**: May 2024
**Version**: 1.0.0 - Netlify Ready


