import { RotateCcw, Target, Award, CheckCircle, XCircle, Bookmark, ArrowRight } from 'lucide-react';
import { QuizProgress, Question } from '../types';

interface StatsScreenProps {
  progress: QuizProgress;
  allQuestions: Question[];
  onDrillMissed: () => void;
  onDrillBookmarked: () => void;
  onResetProgress: () => void;
  poolsideMode: boolean;
}

export function StatsScreen({
  progress,
  allQuestions,
  onDrillMissed,
  onDrillBookmarked,
  onResetProgress,
  poolsideMode
}: StatsScreenProps) {
  const answeredEntries = Object.entries(progress.answered);
  const totalAnswered = answeredEntries.length;
  const correctCount = answeredEntries.filter(([, val]) => val.isCorrect).length;
  const incorrectCount = totalAnswered - correctCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Domain breakdown
  const domains: Question['domain'][] = [
    'GenAI & Bedrock',
    'Responsible AI',
    'Traditional ML',
    'AWS AI Services',
    'Security & Governance'
  ];

  const domainStats = domains.map((domain) => {
    const domainQs = allQuestions.filter(q => q.domain === domain);
    const domainAnswered = domainQs.filter(q => progress.answered[q.id]);
    const domainCorrect = domainAnswered.filter(q => progress.answered[q.id]?.isCorrect).length;
    const rate = domainAnswered.length > 0 ? Math.round((domainCorrect / domainAnswered.length) * 100) : null;
    return {
      domain,
      total: domainQs.length,
      answered: domainAnswered.length,
      correct: domainCorrect,
      rate
    };
  });

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pb-28">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Exam Readiness & Diagnostics
        </h1>
        <p className={`text-xs sm:text-sm ${poolsideMode ? 'text-slate-800' : 'text-slate-400'}`}>
          AIF-C01 passing score is 700 / 1000 (~70-75% accuracy). Track your strengths and review your missed questions.
        </p>
      </div>

      {/* Hero Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Accuracy */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          poolsideMode ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Accuracy</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <span className={`text-2xl sm:text-3xl font-bold tabular-nums ${
            accuracy >= 75 ? 'text-emerald-500' : accuracy >= 60 ? 'text-amber-400' : 'text-slate-300'
          }`}>
            {totalAnswered > 0 ? `${accuracy}%` : '—'}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Passing: ~72%</span>
        </div>

        {/* Answered */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          poolsideMode ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Answered</span>
            <CheckCircle className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold tabular-nums">
            {totalAnswered}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">of {allQuestions.length} total</span>
        </div>

        {/* Current Streak */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          poolsideMode ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Streak</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold tabular-nums text-amber-400">
            {progress.currentStreak}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Best: {progress.bestStreak}</span>
        </div>

        {/* Bookmarked */}
        <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
          poolsideMode ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Bookmarked</span>
            <Bookmark className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-bold tabular-nums text-purple-400">
            {progress.bookmarkedIds.length}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Flagged for review</span>
        </div>
      </div>

      {/* Rapid Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Drill Missed */}
        <button
          onClick={onDrillMissed}
          disabled={incorrectCount === 0}
          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
            incorrectCount > 0
              ? poolsideMode
                ? 'bg-rose-50 border-rose-300 text-rose-950 hover:bg-rose-100'
                : 'bg-rose-950/20 border-rose-800/60 text-rose-200 hover:bg-rose-950/40'
              : 'opacity-50 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="text-left">
              <p className="font-bold text-sm">Drill Missed Questions ({incorrectCount})</p>
              <p className="text-xs opacity-75">Target your wrong answers</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Drill Bookmarked */}
        <button
          onClick={onDrillBookmarked}
          disabled={progress.bookmarkedIds.length === 0}
          className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
            progress.bookmarkedIds.length > 0
              ? poolsideMode
                ? 'bg-purple-50 border-purple-300 text-purple-950 hover:bg-purple-100'
                : 'bg-purple-950/20 border-purple-800/60 text-purple-200 hover:bg-purple-950/40'
              : 'opacity-50 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-500'
          }`}
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-5 h-5 text-purple-400 shrink-0" />
            <div className="text-left">
              <p className="font-bold text-sm">Drill Bookmarked ({progress.bookmarkedIds.length})</p>
              <p className="text-xs opacity-75">Review saved study cards</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Domain Mastery Breakdown */}
      <div className={`p-4 sm:p-5 rounded-2xl border ${
        poolsideMode ? 'bg-white border-slate-300 text-slate-950' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4">
          Domain Proficiency Breakdown
        </h2>

        <div className="space-y-4">
          {domainStats.map((item) => (
            <div key={item.domain} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold">{item.domain}</span>
                <span className="font-mono tabular-nums text-slate-400">
                  {item.rate !== null ? `${item.rate}% (${item.correct}/${item.answered})` : 'Not attempted'}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.rate !== null && item.rate >= 75
                      ? 'bg-emerald-500'
                      : item.rate !== null && item.rate >= 50
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${item.rate || 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Progress */}
      <div className="flex justify-end">
        <button
          onClick={onResetProgress}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 py-2 px-3 rounded-lg transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Exam Statistics</span>
        </button>
      </div>
    </div>
  );
}
