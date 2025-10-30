import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './src/routes/auth.js';
import moodRoutes from './src/routes/moods.js';
import chatRoutes from './src/routes/chat.js';
import emotionRoutes from './src/routes/emotion.js';
import questionnaireRoutes from './src/routes/questionnaire.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mental_health';
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/moods', moodRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/emotion', emotionRoutes);
  app.use('/api/questionnaire', questionnaireRoutes);

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(err.status || 500).json({ message: err.message || 'Server error' });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

start();


