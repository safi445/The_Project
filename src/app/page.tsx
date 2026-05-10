'use client';

import { useState } from 'react';
import CameraView from '@/components/CameraView';
import { FaceAnalysisResult, ConsultationSession } from '@/types';
import { getRecommendations } from '@/lib/recommendations';
import BarberCutSheet from '@/components/BarberCutSheet';
import ProductRecommendations from '@/components/ProductRecommendations';
import { saveSession } from '@/lib/storage';
import { CheckCircle2, MessageSquare, RefreshCcw, Sparkles } from 'lucide-react';

export default function Home() {
  const [analysis, setAnalysis] = useState<FaceAnalysisResult | null>(null);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [selectedHaircutIdx, setSelectedHaircutIdx] = useState(0);
  const [selectedBeardIdx, setSelectedBeardIdx] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [mode, setMode] = useState<'scan' | 'result'>('scan');

  const handleAnalysisComplete = (result: FaceAnalysisResult) => {
    setAnalysis(result);
    const recs = getRecommendations(result);
    setRecommendations(recs);
    setIsSaved(false);
    setMode('result');
  };

  const handleSave = () => {
    if (!analysis || !recommendations) return;

    const session: ConsultationSession = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      faceAnalysis: analysis,
      selectedHaircutId: recommendations.haircuts[selectedHaircutIdx].id,
      selectedBeardId: recommendations.beards[selectedBeardIdx]?.id,
    };

    saveSession(session);
    setIsSaved(true);
  };

  const handleReset = () => {
    setAnalysis(null);
    setRecommendations(null);
    setIsSaved(false);
    setMode('scan');
  };

  const sendWhatsAppReminder = () => {
    const message = encodeURIComponent("Hi! Your fade will need a touch-up in 10 days. Book your next appointment here: [Link]");
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const currentHaircut = recommendations?.haircuts[selectedHaircutIdx];
  const currentBeard = recommendations?.beards[selectedBeardIdx];

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="mb-2">
        <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
          {mode === 'scan' ? (
            <>Find Your <span className="text-indigo-600">Perfect</span> Style.</>
          ) : (
            <>Your <span className="text-indigo-600">Style</span> Result</>
          )}
        </h2>
        <p className="text-slate-500 mt-2">
          {mode === 'scan'
            ? "Scan your face and get AI recommendations in seconds."
            : `${analysis?.faceShape} face shape detected.`}
        </p>
      </div>

      <div className="relative">
        <CameraView
          onAnalysisComplete={handleAnalysisComplete}
          selectedHaircutId={currentHaircut?.id}
          selectedBeardId={currentBeard?.id}
          isLocked={mode === 'result'}
        />

        {mode === 'result' && recommendations && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <p className="text-white text-[10px] font-bold uppercase tracking-wider">Tap to Try-on</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {recommendations.haircuts.map((h: any, i: number) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHaircutIdx(i)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    selectedHaircutIdx === i ? 'bg-indigo-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {h.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {mode === 'result' && (
          <button
            onClick={handleReset}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition-colors z-10"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {mode === 'scan' ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm mb-1">Face Shape</h4>
            <p className="text-xs text-slate-400">Detection of jawline and density</p>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 text-sm mb-1">Live AR</h4>
            <p className="text-xs text-slate-400">Try on styles in real-time</p>
          </div>
        </div>
      ) : (
        <>
          <BarberCutSheet
            haircut={currentHaircut}
            beard={currentBeard}
          />

          <ProductRecommendations
            products={currentHaircut.productRecommendations}
          />

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                isSaved ? 'bg-green-100 text-green-600' : 'bg-slate-900 text-white'
              }`}
            >
              {isSaved ? <CheckCircle2 className="w-5 h-5" /> : null}
              {isSaved ? 'Saved' : 'Save Style'}
            </button>
            <button
              onClick={sendWhatsAppReminder}
              className="flex items-center justify-center gap-2 py-4 bg-indigo-50 text-indigo-600 rounded-2xl font-bold hover:bg-indigo-100 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Reminder
            </button>
          </div>
        </>
      )}

      <div className="pb-8"></div>
    </div>
  );
}
