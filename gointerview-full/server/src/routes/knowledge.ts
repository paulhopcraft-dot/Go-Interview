import { Router } from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
import { db } from '../lib/store.js';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
export const knowledgeRouter = Router();

knowledgeRouter.get('/', (_req, res) => {
  res.json({ items: Array.from(db.knowledge.values()) });
});

knowledgeRouter.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const id = nanoid();
  db.knowledge.set(id, {
    id,
    filename: req.file.originalname,
    size: req.file.size,
    uploadedAt: new Date().toISOString(),
    notes: req.body?.notes
  });
  res.status(201).json({ ok: true, id });
});
