import { useState, useEffect, useMemo, useRef } from 'react';
import { QuizCard } from './components/QuizCard';
import { ScoreReportModal } from './components/ScoreReportModal';
import { OFFICIAL_EXAM_ROUND_65 } from './data/officialExamQuestions';
import { EXAM_QUESTIONS } from './data/examQuestions';
import { getAllPracticeQuestions } from './data/practiceTests';
import { Question, QuizProgress } from './types';
import { loadProgress, saveProgress, clearUserProgress } from './utils/storage';

const ROUND_SIZE = 65;
const EXAM_DURATION_SECONDS = 85 * 60; // 85 minutes official exam standard

export default function App() {
  const [progress, setProgress] = useState<QuizProgress>(loadProgress);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(EXAM_DURATION_SECONDS);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showScoreReport, setShowScoreReport] = useState<boolean>(false);
  const [isReviewingMissed, setIsReviewingMissed] = useState<boolean>(false);

  // Sync progress to localStorage
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Master bank of questions, prioritized with the pristine OFFICIAL_EXAM_ROUND_65
  const masterPool: Question[] = useMemo(() => {
    const practiceQs = getAllPracticeQuestions();
    return [...OFFICIAL_EXAM_ROUND_65, ...practiceQs, ...EXAM_QUESTIONS];
  }, []);

  // 65-question round deck: Round 1 is exactly the pristine 65 official exam questions
  const activeDeck = useMemo(() => {
    if (isReviewingMissed) {
      return masterPool.filter(q => progress.answered[q.id]?.isCorrect === false);
    }
    if (currentRound === 1) {
      return OFFICIAL_EXAM_ROUND_65;
    }
    const startIndex = ((currentRound - 1) * ROUND_SIZE) % masterPool.length;
    let roundSlice = masterPool.slice(startIndex, startIndex + ROUND_SIZE);
    
    // If pool is slightly short of 65 at the tail, loop from start to ensure exactly 65 questions
    if (roundSlice.length < ROUND_SIZE) {
      roundSlice = [...roundSlice, ...masterPool.slice(0, ROUND_SIZE - roundSlice.length)];
    }
    return roundSlice;
  }, [masterPool, currentRound, isReviewingMissed, progress.answered]);

  const safeIndex = Math.min(Math.max(0, currentQuestionIndex), Math.max(0, activeDeck.length - 1));
  const currentQuestion = activeDeck[safeIndex];

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || showScoreReport) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowScoreReport(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, showScoreReport]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < activeDeck.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Reached end of 65-question round!
      setShowScoreReport(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAnswer = (selected: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
    if (!currentQuestion) return;

    setProgress(prev => {
      const nextStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const bestStreak = Math.max(prev.bestStreak, nextStreak);

      return {
        ...prev,
        answered: {
          ...prev.answered,
          [currentQuestion.id]: {
            selected,
            isCorrect,
            timestamp: Date.now()
          }
        },
        currentStreak: nextStreak,
        bestStreak
      };
    });
  };

  const handleToggleBookmark = () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedIds.includes(qId);
      return {
        ...prev,
        bookmarkedIds: isBookmarked 
          ? prev.bookmarkedIds.filter(id => id !== qId)
          : [...prev.bookmarkedIds, qId]
      };
    });
  };

  const handleToggleSound = () => {
    setProgress(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const handleNextRound = () => {
    setShowScoreReport(false);
    setIsReviewingMissed(false);
    setCurrentRound(r => r + 1);
    setCurrentQuestionIndex(0);
    setTimeRemaining(EXAM_DURATION_SECONDS);
    setIsTimerRunning(true);
  };

  const handleReviewMissed = () => {
    setShowScoreReport(false);
    setIsReviewingMissed(true);
    setCurrentQuestionIndex(0);
  };

  const handleRetakeRound = () => {
    setShowScoreReport(false);
    setIsReviewingMissed(false);
    setCurrentQuestionIndex(0);
    setTimeRemaining(EXAM_DURATION_SECONDS);
    setIsTimerRunning(true);
  };

  const handleResetSession = () => {
    if (window.confirm('Reset current 65-question exam round?')) {
      const reset = clearUserProgress();
      setProgress(reset);
      setCurrentQuestionIndex(0);
      setTimeRemaining(EXAM_DURATION_SECONDS);
      setShowScoreReport(false);
      setIsReviewingMissed(false);
    }
  };

  // Score in current round
  const roundScore = useMemo(() => {
    const roundAnswered = activeDeck.filter(q => progress.answered[q.id]);
    const correctCount = roundAnswered.filter(q => progress.answered[q.id]?.isCorrect).length;
    return {
      correct: correctCount,
      total: roundAnswered.length,
      streak: progress.currentStreak
    };
  }, [activeDeck, progress.answered, progress.currentStreak]);

  const savedAnswer = currentQuestion ? progress.answered[currentQuestion.id]?.selected : undefined;

  return (
    <div className="h-dvh h-screen w-screen overflow-hidden bg-slate-100 flex flex-col items-center justify-center p-1 sm:p-3 text-slate-900 select-none">
      {/* Pearson VUE Exam Simulation Container */}
      <div className="w-full max-w-2xl h-full bg-white border border-slate-300 rounded-xl p-2.5 sm:p-3 shadow-md flex flex-col justify-between overflow-hidden">
        {/* The Single-Screen Quiz Experience (Header Removed to Save All Space) */}
        {currentQuestion && (
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            <QuizCard
              question={currentQuestion}
              currentIndex={safeIndex}
              totalQuestions={activeDeck.length}
              onNext={handleNextQuestion}
              onPrev={handlePrevQuestion}
              onAnswer={handleAnswer}
              savedAnswer={savedAnswer}
              isBookmarked={progress.bookmarkedIds.includes(currentQuestion.id)}
              onToggleBookmark={handleToggleBookmark}
              soundEnabled={progress.soundEnabled}
              onToggleSound={handleToggleSound}
              onResetAll={handleResetSession}
              score={roundScore}
              timeRemaining={timeRemaining}
              isTimerRunning={isTimerRunning}
              onToggleTimer={() => setIsTimerRunning(!isTimerRunning)}
              formatTimer={formatTimer}
            />
          </div>
        )}
      </div>

      {/* Score Report Modal on finishing Question 65 or time up */}
      {showScoreReport && (
        <ScoreReportModal
          questions={activeDeck}
          answered={progress.answered}
          timeRemainingSeconds={timeRemaining}
          totalTimeSeconds={EXAM_DURATION_SECONDS}
          onNextRound={handleNextRound}
          onReviewMissed={handleReviewMissed}
          onRetakeRound={handleRetakeRound}
        />
      )}
    </div>
  );
}
