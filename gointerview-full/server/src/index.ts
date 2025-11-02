import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './lib/env.js';
import { healthRouter } from './routes/health.js';
import { interviewsRouter } from './routes/interviews.js';
import { scheduleRouter } from './routes/schedule.js';
import { knowledgeRouter } from './routes/knowledge.js';
import { cabRouter } from './routes/cab.js';
import { webhooksRouter } from './routes/webhooks.js';

const app = express();
app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: env.CORS_ORIGIN ?? '*' }));

app.use('/api/health', healthRouter);
app.use('/api/interviews', interviewsRouter);
app.use('/api/schedule', scheduleRouter);
app.use('/api/knowledge', knowledgeRouter);
app.use('/api/cab', cabRouter);
app.use('/api/webhooks', webhooksRouter);

app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'GoInterview', time: new Date().toISOString() });
});

const port = Number(env.PORT ?? process.env.PORT ?? 8080);
app.listen(port, () => console.log(`[server] GoInterview listening on ${port}`));
