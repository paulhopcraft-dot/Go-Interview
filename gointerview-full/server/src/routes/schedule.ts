import { Router } from 'express';
import { z } from 'zod';
import { GmailCalendarProvider } from '../adapters/gmail_calendar.js';
import { ZoomProvider } from '../adapters/zoom.js';

export const scheduleRouter = Router();

const Schedule = z.object({
  title: z.string().min(1),
  start: z.string().min(1),
  durationMins: z.number().min(5).max(600),
  attendees: z.array(z.string().email()).min(1),
  provider: z.enum(['google','zoom']).optional()
});

scheduleRouter.post('/', async (req, res) => {
  const parse = Schedule.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid', issues: parse.error.flatten() });

  const { provider = 'google', ...opts } = parse.data;
  const p = provider === 'zoom' ? ZoomProvider : GmailCalendarProvider;
  const meeting = await p.createMeeting(opts);
  res.json({ ok: true, provider, ...meeting });
});
