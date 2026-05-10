import React from 'react';
import { HaircutStyle, BeardStyle } from '@/types';
import { Scissors, Ruler, Paintbrush } from 'lucide-react';

interface BarberCutSheetProps {
  haircut: HaircutStyle;
  beard?: BeardStyle;
}

export default function BarberCutSheet({ haircut, beard }: BarberCutSheetProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <Scissors className="w-5 h-5 text-indigo-600" />
        Barber Cut Sheet
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Haircut: {haircut.name}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <Ruler className="w-3 h-3" />
                <span className="text-[10px] font-bold">FADE LENGTH</span>
              </div>
              <p className="text-sm font-medium text-slate-700">{haircut.details.fadeLength}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <Paintbrush className="w-3 h-3" />
                <span className="text-[10px] font-bold">TOP TEXTURE</span>
              </div>
              <p className="text-sm font-medium text-slate-700">{haircut.details.topTexture}</p>
            </div>
          </div>
          <div className="mt-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
            <span className="text-[10px] font-bold text-indigo-400 block mb-1">LINE-UP GUIDE</span>
            <p className="text-sm font-medium text-indigo-700">{haircut.details.lineUp}</p>
          </div>
        </div>

        {beard && (
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Beard: {beard.name}</h4>
            <div className="bg-slate-50 p-3 rounded-lg mb-3">
              <div className="flex items-center gap-1 text-slate-400 mb-1">
                <Ruler className="w-3 h-3" />
                <span className="text-[10px] font-bold">LENGTH (MM)</span>
              </div>
              <p className="text-sm font-medium text-slate-700">{beard.details.lengthMm} mm</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">SHAPING GUIDE</span>
              <p className="text-sm font-medium text-slate-700">{beard.details.guide}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
