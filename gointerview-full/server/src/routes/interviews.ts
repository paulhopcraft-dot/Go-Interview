import { Router } from 'express';
import { z } from 'zod';
import { db, createSession, Message } from '../lib/store.js';
import { scoreSentiment } from '../lib/sentiment.js';

export const interviewsRouter = Router();

const NewInterview = z.object({
  title: z.string().min(1),
  candidateName: z.string().optional(),
  position: z.string().optional(),
  tags: z.array(z.string()).optional()
});

const SendMessage = z.object({ text: z.string().min(1) });

interviewsRouter.get('/', (_req, res) => { res.json({ items: Array.from(db.sessions.values()) }); });

interviewsRouter.post('/', (req, res) => {
  const parse = NewInterview.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid', issues: parse.error.flatten() });
  const session = createSession(parse.data);
  res.status(201).json(session);
});

interviewsRouter.post('/:id/start', (req, res) => {
  const s = db.sessions.get(req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  s.status = 'running';
  s.messages.push({ role: 'assistant', text: 'AI Interview started. Introduce yourself.', ts: new Date().toISOString() });
  res.json(s);
});

interviewsRouter.post('/:id/message', (req, res) => {
  const s = db.sessions.get(req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  const parse = SendMessage.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid', issues: parse.error.flatten() });
  const now = new Date().toISOString();
  const userMsg: Message = { role: 'user', text: parse.data.text, ts: now, sentiment: scoreSentiment(parse.data.text) };
  s.messages.push(userMsg);
  const reply: Message = { role: 'assistant', text: `Thanks. Noted: "${parse.data.text.slice(0,200)}"`, ts: now, sentiment: scoreSentiment(parse.data.text) };
  s.messages.push(reply);
  res.json({ session: s, reply });
});

interviewsRouter.post('/:id/stop', (req, res) => {
  const s = db.sessions.get(req.params.id);
  if (!s) return res.status(404).json({ error: 'Not found' });
  s.status = 'completed';
  s.messages.push({ role: 'assistant', text: 'Interview completed. We will share a summary.', ts: new Date().toISOString() });
  res.json(s);
});
