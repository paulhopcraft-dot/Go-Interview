import { Router } from 'express';
import { z } from 'zod';
import { db } from '../lib/store.js';

export const cabRouter = Router();

const Assign = z.object({
  sessionId: z.string().min(1),
  cohort: z.enum(['CAB0','CAB1','CAB2'])
});

cabRouter.get('/report', (_req, res) => {
  const report = {
    CAB0: db.cohorts.CAB0.size,
    CAB1: db.cohorts.CAB1.size,
    CAB2: db.cohorts.CAB2.size
  };
  res.json({ report, updatedAt: new Date().toISOString() });
});

cabRouter.post('/assign', (req, res) => {
  const parse = Assign.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid', issues: parse.error.flatten() });
  const s = db.sessions.get(parse.data.sessionId);
  if (!s) return res.status(404).json({ error: 'Session not found' });
  s.tags = Array.from(new Set([...(s.tags ?? []), parse.data.cohort]));
  (db.cohorts as any)[parse.data.cohort].add(s.id);
  res.json({ ok: true, session: s });
});
