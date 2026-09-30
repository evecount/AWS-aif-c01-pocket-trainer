import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { Question } from '../types';

interface ScoreReportModalProps {
  questions: Question[];
  answered: Record<string, { selected: 'A' | 'B' | 'C' | 'D'; isCorrect: boolean }>;
  timeRemainingSeconds: number;
  totalTimeSeconds: number;
  onNextRound: () => void;
  onReviewMissed: () => void;
  onRetakeRound: () => void;
}

export function ScoreReportModal({
  questions,
  answered,
  timeRemainingSeconds,
  totalTimeSeconds,
  onNextRound,
  onReviewMissed,
  onRetakeRound
}: ScoreReportModalProps) {
  const total = questions.length;
  const answeredCount = questions.filter(q => answered[q.id]).length;
  const correctCount = questions.filter(q => answered[q.id]?.isCorrect).length;
  const missedCount = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;
  
  // Real AWS scaled score: 100 to 1000, passing score is 700 (~70%)
  const scaledScore = Math.min(1000, Math.round(100 + (correctCount / total) * 900));
  const isPassed = scaledScore >= 700;

  const secondsSpent = Math.max(0, totalTimeSeconds - timeRemainingSeconds);
  const minutesSpent = Math.floor(secondsSpent / 60);
  const remainingSecs = secondsSpent % 60;

  // Domain breakdown
  const domains: Question['domain'][] = [
    'Fundamentals of AI & ML' as any,
    'Fundamentals of Generative AI' as any,
    'Applications of Foundation Models' as any,
    'Guidelines for Responsible AI' as any,
    'Security, Compliance & Governance' as any
  ];

  const domainMap: Record<string, Question['domain']> = {
    'Domain 1: ML Fundamentals': 'Traditional ML',
    'Domain 2: GenAI Basics': 'GenAI & Bedrock',
    'Domain 3: Foundation Models': 'GenAI & Bedrock',
    'Domain 4: Responsible AI': 'Responsible AI',
    'Domain 5: Security & Compliance': 'Security & Governance'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 select-none">
      <div className="w-full max-w-lg bg-white border border-slate-300 rounded-2xl shadow-xl flex flex-col overflow-hidden max-h-[92vh]">
        {/* Header */}
        <div className={`p-4 text-center border-b ${
          isPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
        }`}>
          <div className="inline-flex p-2 rounded-full mb-1 bg-white shadow-xs">
            <Award className={`w-8 h-8 ${isPassed ? 'text-emerald-600' : 'text-rose-500'}`} />
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            {isPassed ? 'EXAM PASSED! 🎉' : 'EXAM RESULT: NEEDS REVIEW'}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            AWS Certified AI Practitioner (AIF-C01) Practice Round
          </p>
        </div>

        {/* Body Stats */}
        <div className="p-4 space-y-3 overflow-y-auto text-xs">
          {/* Main Scaled Score Box */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Scaled Score</span>
              <p className={`text-xl font-bold font-mono ${isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                {scaledScore}
              </p>
              <span className="text-[9.5px] text-slate-400">Pass: 700 / 1000</span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Accuracy</span>
              <p className="text-xl font-bold font-mono text-slate-900">
                {accuracy}%
              </p>
              <span className="text-[9.5px] text-slate-400">{correctCount} of {total} correct</span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Time Spent</span>
              <p className="text-xl font-bold font-mono text-slate-900">
                {minutesSpent}m {remainingSecs}s
              </p>
              <span className="text-[9.5px] text-slate-400">Limit: 85m</span>
            </div>
          </div>

          {/* Quick Domain Breakdown */}
          <div className="border border-slate-200 rounded-xl p-3 bg-white space-y-2">
            <span className="font-bold text-[11px] uppercase tracking-wider text-slate-700 block">
              Performance by Core Domain
            </span>
            {[
              { name: 'Domain 1: Fundamentals of AI & ML', filter: 'Traditional ML' },
              { name: 'Domain 2 & 3: GenAI & Bedrock Applications', filter: 'GenAI & Bedrock' },
              { name: 'Domain 4: Guidelines for Responsible AI', filter: 'Responsible AI' },
              { name: 'Domain 5: Security & Governance', filter: 'Security & Governance' }
            ].map(d => {
              const dQuestions = questions.filter(q => q.domain === d.filter);
              const dCorrect = dQuestions.filter(q => answered[q.id]?.isCorrect).length;
              const rate = dQuestions.length > 0 ? Math.round((dCorrect / dQuestions.length) * 100) : 0;
              return (
                <div key={d.name} className="space-y-0.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-700">{d.name}</span>
                    <span className="font-mono font-semibold">{rate}% ({dCorrect}/{dQuestions.length})</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${rate >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-2">
          {missedCount > 0 && (
            <button
              onClick={onReviewMissed}
              className="flex-1 h-9 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Review Missed ({missedCount})</span>
            </button>
          )}

          <button
            onClick={onRetakeRound}
            className="flex-1 h-9 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Round</span>
          </button>

          <button
            onClick={onNextRound}
            className="flex-1 h-9 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all"
          >
            <span>Start Next Round</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
