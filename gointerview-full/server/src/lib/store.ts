import { nanoid } from 'nanoid';

export type Message = { role: 'system'|'user'|'assistant', text: string, ts: string, sentiment?: number };
export type InterviewSession = {
  id: string;
  title: string;
  candidateName?: string;
  position?: string;
  status: 'pending'|'running'|'completed';
  messages: Message[];
  tags: string[]; // 'CAB0' | 'CAB1' | 'CAB2'
  scheduledAt?: string;
  recordingUrl?: string;
};

export type KnowledgeItem = {
  id: string;
  filename: string;
  size: number;
  uploadedAt: string;
  notes?: string;
};

export const db = {
  sessions: new Map<string, InterviewSession>(),
  knowledge: new Map<string, KnowledgeItem>(),
  cohorts: { CAB0: new Set<string>(), CAB1: new Set<string>(), CAB2: new Set<string>() }
};

export function createSession(partial: Partial<InterviewSession>): InterviewSession {
  const id = nanoid();
  const now = new Date().toISOString();
  const session: InterviewSession = {
    id,
    title: partial.title ?? 'New Interview',
    candidateName: partial.candidateName,
    position: partial.position,
    status: 'pending',
    messages: [{ role: 'system', text: 'Interview created', ts: now }],
    tags: partial.tags ?? []
  };
  db.sessions.set(id, session);
  return session;
}
