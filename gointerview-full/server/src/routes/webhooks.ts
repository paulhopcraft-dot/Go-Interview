import { Router } from 'express';
export const webhooksRouter = Router();

webhooksRouter.post('/synthesia', (req, res) => {
  console.log('[webhook] synthesia:', req.body);
  res.json({ ok: true });
});
webhooksRouter.post('/elevenlabs', (req, res) => {
  console.log('[webhook] elevenlabs:', req.body);
  res.json({ ok: true });
});
