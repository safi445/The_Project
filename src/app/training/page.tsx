'use client';

import { useState } from 'react';
import { FaceShape } from '@/types';
import { haircuts, beards } from '@/lib/styles';
import { BookOpen, CheckCircle, XCircle, Info } from 'lucide-react';

const quizQuestions = [
  {
    shape: 'Round' as FaceShape,
    description: 'This face is as wide as it is long, with a rounded jawline and cheekbones.',
    correctStyles: ['h2', 'h3'],
    explanation: 'For round faces, you want to add height and structure. A Textured Crop or Pompadour Fade works best.'
  },
  {
    shape: 'Square' as FaceShape,
    description: 'Strong, angular jawline with a broad forehead. Length and width are similar.',
    correctStyles: ['h1', 'h4'],
    explanation: 'Square faces suit classic, clean-cut styles that emphasize the strong jawline, like a Side Part or Buzz Cut.'
  },
  {
    shape: 'Heart' as FaceShape,
    description: 'Wide forehead and cheekbones that taper down to a narrow, pointed chin.',
    correctStyles: ['h2'],
    explanation: 'For heart shapes, avoid too much volume on top that makes the forehead look wider. A Textured Crop balances the proportions.'
  }
];

export default function TrainingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const question = quizQuestions[currentStep];

  const handleCheck = () => {
    if (selectedStyle && question.correctStyles.includes(selectedStyle)) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const nextQuestion = () => {
    setSelectedStyle(null);
    setFeedback(null);
    setCurrentStep((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-indigo-600" />
        <h2 className="text-2xl font-bold text-slate-900">Barber Training</h2>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full">
            LEVEL: APPRENTICE
          </span>
          <span className="text-slate-400 text-xs font-medium">
            Challenge {currentStep + 1} of {quizQuestions.length}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2">Identify: {question.shape} Face</h3>
        <p className="text-slate-500 text-sm mb-6">{question.description}</p>

        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select the best haircut:</p>
          <div className="grid grid-cols-1 gap-3">
            {haircuts.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedStyle(h.id)}
                disabled={feedback === 'correct'}
                className={`p-4 rounded-2xl text-left border-2 transition-all ${
                  selectedStyle === h.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">{h.name}</span>
                  {feedback === 'correct' && question.correctStyles.includes(h.id) && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {feedback === 'wrong' && selectedStyle === h.id && !question.correctStyles.includes(h.id) && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {feedback === 'correct' && (
          <div className="mt-6 p-4 bg-green-50 rounded-2xl border border-green-100">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-sm text-green-800">{question.explanation}</p>
            </div>
            <button
              onClick={nextQuestion}
              className="w-full mt-4 py-3 bg-green-600 text-white rounded-xl font-bold text-sm"
            >
              Next Challenge
            </button>
          </div>
        )}

        {feedback !== 'correct' && (
          <button
            onClick={handleCheck}
            disabled={!selectedStyle}
            className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-bold disabled:bg-slate-300 transition-all"
          >
            Check Answer
          </button>
        )}
      </div>

      <div className="bg-indigo-50 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 leading-relaxed">
          <strong>Tip:</strong> Always look at the width of the forehead relative to the jawline. For round faces, focus on verticality.
        </p>
      </div>
    </div>
  );
}
