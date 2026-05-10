'use client';

import { haircuts, beards } from '@/lib/styles';
import { Scissors } from 'lucide-react';

export default function StylesPage() {
  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Style Library</h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Trending Haircuts</h3>
          <div className="grid gap-4">
            {haircuts.map(h => (
              <div key={h.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-800 text-lg">{h.name}</h4>
                <p className="text-slate-500 text-sm mt-1">{h.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {h.suitableFaceShapes.map(s => (
                    <span key={s} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Beard Styles</h3>
          <div className="grid gap-4">
            {beards.map(b => (
              <div key={b.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-800 text-lg">{b.name}</h4>
                <p className="text-slate-500 text-sm mt-1">Perfect for {b.suitableFaceShapes.join(', ')}.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
