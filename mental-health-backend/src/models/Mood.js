import mongoose from 'mongoose';

const moodSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mood: { type: Number, required: true, min: 1, max: 5 },
    note: { type: String },
    voiceNoteUrl: { type: String },
    loggedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

export default mongoose.model('Mood', moodSchema);


