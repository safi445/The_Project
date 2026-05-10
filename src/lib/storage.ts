import { ConsultationSession } from '@/types';

const STORAGE_KEY = 'barber_sessions';

export const saveSession = (session: ConsultationSession) => {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  sessions.unshift(session);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions.slice(0, 50)));
};

export const getSessions = (): ConsultationSession[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};
