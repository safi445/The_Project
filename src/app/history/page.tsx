'use client';

import { useState, useEffect } from 'react';
import { getSessions } from '@/lib/storage';
import { ConsultationSession } from '@/types';
import { Scissors, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function HistoryPage() {
  const [sessions, setSessions] = useState<ConsultationSession[]>([]);

  useEffect(() => {
    setSessions(getSessions());
  }, []);

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Style History</h2>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-200">
          <p className="text-slate-400 mb-4">No past consultations found.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm">
            Start First Scan
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div key={session.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                  <Scissors className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{session.faceAnalysis.faceShape} Style</h4>
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
