import express from 'express';
import { z } from 'zod';
import Mood from '../models/Mood.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const moodSchema = z.object({
  mood: z.number().int().min(1).max(5),
  note: z.string().max(1000).optional(),
  loggedAt: z.string().datetime().optional(),
});

router.use(requireAuth);

router.get('/', async (req, res) => {
  const moods = await Mood.find({ userId: req.user.id }).sort({ loggedAt: -1 }).limit(365);
  res.json(moods);
});

router.post('/', async (req, res) => {
  const parsed = moodSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input' });
  const data = parsed.data;
  const created = await Mood.create({ ...data, userId: req.user.id });
  res.status(201).json(created);
});

router.put('/:id', async (req, res) => {
  const parsed = moodSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid input' });
  const updated = await Mood.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: parsed.data },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Mood.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ success: true });
});

export default router;


