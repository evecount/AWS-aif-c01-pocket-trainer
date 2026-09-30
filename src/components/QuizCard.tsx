import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Volume2, 
  VolumeX,
  RotateCcw,
  Clock,
  Play,
  Pause
} from 'lucide-react';
import { Question } from '../types';
import { soundEffects } from '../utils/audio';

interface QuizCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
  onAnswer: (selected: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
  savedAnswer?: 'A' | 'B' | 'C' | 'D';
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetAll: () => void;
  score: { correct: number; total: number; streak: number };
  timeRemaining: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  formatTimer: (secs: number) => string;
}

export function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  onPrev,
  onAnswer,
  savedAnswer,
  isBookmarked,
  onToggleBookmark,
  soundEnabled,
  onToggleSound,
  onResetAll,
  score,
  timeRemaining,
  isTimerRunning,
  onToggleTimer,
  formatTimer
}: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(savedAnswer || null);

  // Sync when question changes or saved answer exists
  useEffect(() => {
    setSelectedOption(savedAnswer || null);
  }, [question.id, savedAnswer]);

  // Keyboard navigation: A, B, C, D to answer, Left Arrow for Prev, Right Arrow / Space for Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        if (!selectedOption) {
          handleSelectOption(key as 'A' | 'B' | 'C' | 'D');
        }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, onNext, onPrev, question.id]);

  const handleSelectOption = (letter: 'A' | 'B' | 'C' | 'D') => {
    if (selectedOption !== null) return; // Prevent double click

    setSelectedOption(letter);
    const isCorrect = letter === question.correctAnswer;

    if (soundEnabled) {
      if (isCorrect) {
        soundEffects.playCorrect();
      } else {
        soundEffects.playIncorrect();
      }
    }

    onAnswer(letter, isCorrect);
  };

  const optionKeys: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const hasAnswered = selectedOption !== null;
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="h-full flex flex-col justify-between overflow-hidden">
      {/* Top Meta Bar: Single Clean Line with Q, Score, Timer, and Controls */}
      <div className="shrink-0 flex items-center justify-between pb-1.5 border-b border-slate-200 text-xs">
        {/* Left: Q number + Score */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="font-extrabold text-slate-900 tracking-tight text-[12.5px]">
            Q{currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600 font-mono text-[11px]">
            Score: <strong className="text-emerald-700 font-bold">{score.correct}</strong>/{score.total} ({score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%)
          </span>
          {score.streak > 1 && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-1 py-0.2 rounded text-[10px]">
              🔥{score.streak}
            </span>
          )}
        </div>

        {/* Right: Timer + Sound + Bookmark + Reset */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Live Countdown Timer on the same line */}
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-mono font-bold text-[11.5px] border ${
            timeRemaining < 600 
              ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse' 
              : 'bg-slate-50 text-slate-800 border-slate-200'
          }`}>
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{formatTimer(timeRemaining)}</span>
            <button
              onClick={onToggleTimer}
              title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
              className="hover:text-slate-950 text-slate-400 p-0.5"
            >
              {isTimerRunning ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5 text-emerald-600" />}
            </button>
          </div>

          <button
            onClick={onToggleSound}
            aria-label="Toggle Sound"
            className="p-1 rounded text-slate-500 hover:text-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          <button
            onClick={onToggleBookmark}
            aria-label="Bookmark"
            className={`p-1 rounded transition-colors ${
              isBookmarked ? 'text-amber-500 fill-amber-500' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          <button
            onClick={onResetAll}
            title="Reset round"
            className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Body (Single Screen: Scenario + 4 Options + Explanation) */}
      <div className="flex-1 flex flex-col min-h-0 py-2 gap-2 overflow-y-auto pr-0.5">
        {/* Scenario Box (Compact, high-contrast, no scrolling) */}
        <div className="shrink-0 bg-white border border-slate-300 rounded-lg p-2.5 sm:p-3 shadow-xs">
          <p className="text-[13px] sm:text-[14px] leading-snug font-medium text-slate-900">
            {question.scenario}
          </p>
        </div>

        {/* 4 Options Stack: 1-click submit */}
        <div className="shrink-0 flex flex-col gap-1.5">
          {optionKeys.map((letter) => {
            const text = question.options[letter];
            const isSelected = selectedOption === letter;
            const isTargetCorrect = letter === question.correctAnswer;

            let buttonClass = 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-slate-400 active:bg-slate-100';

            if (hasAnswered) {
              if (isTargetCorrect) {
                buttonClass = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                buttonClass = 'bg-rose-50 border-rose-500 text-rose-950 line-through opacity-85';
              } else {
                buttonClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={letter}
                onClick={() => handleSelectOption(letter)}
                disabled={hasAnswered}
                className={`w-full text-left p-2 sm:p-2.5 rounded-lg border text-xs sm:text-[13px] flex items-start gap-2.5 transition-all min-h-[38px] ${buttonClass}`}
              >
                <span className={`w-5 h-5 shrink-0 rounded flex items-center justify-center font-bold text-[11px] ${
                  hasAnswered && isTargetCorrect
                    ? 'bg-emerald-600 text-white'
                    : hasAnswered && isSelected && !isCorrect
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-300'
                }`}>
                  {letter}
                </span>

                <span className="flex-1 leading-tight pt-0.5">
                  {text}
                </span>

                {hasAnswered && isTargetCorrect && (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Card (Why right is right & why wrong is wrong) */}
        {hasAnswered && (
          <div className="flex-1 min-h-0 bg-white border border-slate-300 rounded-lg p-2.5 shadow-xs overflow-y-auto">
            {/* Verdict */}
            <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-200 text-xs">
              <span className={`font-bold flex items-center gap-1 ${
                isCorrect ? 'text-emerald-700' : 'text-rose-600'
              }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Correct! (Option {question.correctAnswer})
                  </>
                ) : (
                  <>
                    <XCircle className="w-3.5 h-3.5 text-rose-500" />
                    Incorrect — Correct is Option {question.correctAnswer}
                  </>
                )}
              </span>

              {question.confusingProductNote && (
                <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1 py-0.2 rounded font-medium truncate max-w-[180px]">
                  {question.confusingProductNote}
                </span>
              )}
            </div>

            {/* Core Why Explanation */}
            <p className="text-[11.5px] leading-relaxed text-slate-800 font-medium mb-2">
              {question.explanation}
            </p>

            {/* 4-Option Distractor Breakdown */}
            <div className="space-y-1 text-[11px] border-t border-slate-100 pt-1.5">
              {optionKeys.map((opt) => {
                const isTarget = opt === question.correctAnswer;
                const reason = question.distractorBreakdown?.[opt];
                return (
                  <div key={opt} className={`flex items-start gap-1 leading-snug ${
                    isTarget ? 'text-emerald-900 font-semibold' : 'text-slate-600'
                  }`}>
                    <span className={`font-mono text-[10.5px] px-1 rounded ${
                      isTarget ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {opt}:
                    </span>
                    <span>
                      {isTarget 
                        ? 'Correct solution for this requirement.' 
                        : (reason || 'Does not satisfy the scenario requirements.')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar: Full-Width 50/50 Prev and Next Buttons */}
      <div className="shrink-0 pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 w-full">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`h-10 px-4 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all w-full ${
            currentIndex === 0
              ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-[0.98]'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={onNext}
          className={`h-10 px-4 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98] w-full ${
            currentIndex + 1 >= totalQuestions
              ? 'bg-emerald-700 hover:bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <span>{currentIndex + 1 >= totalQuestions ? 'Finish Exam (65/65)' : 'Next Question'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
