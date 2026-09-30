import { Sun, Moon, Volume2, VolumeX, Bookmark, Flame } from 'lucide-react';
import { QuizProgress } from '../types';

interface HeaderProps {
  progress: QuizProgress;
  onTogglePoolside: () => void;
  onToggleSound: () => void;
  onOpenBookmarks: () => void;
  streak: number;
}

export function Header({
  progress,
  onTogglePoolside,
  onToggleSound,
  onOpenBookmarks,
  streak
}: HeaderProps) {
  const isSun = progress.poolsideMode;

  return (
    <header className={`sticky top-0 z-30 px-4 py-3 border-b transition-colors ${
      isSun 
        ? 'bg-amber-100 border-amber-300 text-slate-950' 
        : 'bg-slate-950/90 backdrop-blur-md border-slate-800 text-slate-100'
    }`}>
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        {/* Brand Zone */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-base sm:text-lg flex items-center gap-1.5">
              <span>AIF-C01 Quizmaster</span>
              {streak > 1 && (
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                  isSun ? 'bg-amber-300 text-amber-950' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                  {streak} streak
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label="Toggle sound feedback"
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg transition-colors ${
              isSun 
                ? 'hover:bg-amber-200 text-slate-800' 
                : 'hover:bg-slate-800 text-slate-300'
            }`}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {/* Bookmarks Counter / Trigger */}
          <button
            onClick={onOpenBookmarks}
            aria-label="View bookmarked questions"
            className={`min-h-[44px] px-2.5 flex items-center gap-1.5 rounded-lg text-xs font-medium transition-colors ${
              progress.bookmarkedIds.length > 0 
                ? isSun ? 'bg-amber-200 text-amber-900' : 'bg-slate-800 text-amber-400' 
                : isSun ? 'text-slate-700' : 'text-slate-400'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${progress.bookmarkedIds.length > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="tabular-nums font-semibold">{progress.bookmarkedIds.length}</span>
          </button>

          {/* Poolside Sun Mode Toggle */}
          <button
            onClick={onTogglePoolside}
            aria-label={isSun ? 'Switch to Standard Dark Mode' : 'Switch to Poolside High-Contrast Sun Mode'}
            title={isSun ? 'Poolside Sun Mode active (High Contrast)' : 'Enable Poolside Outdoor Sun Mode'}
            className={`min-h-[44px] px-2.5 flex items-center gap-1.5 rounded-lg text-xs font-semibold transition-all ${
              isSun 
                ? 'bg-slate-900 text-amber-300 shadow-sm' 
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {isSun ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400 fill-amber-400/30" />}
            <span className="hidden xs:inline">{isSun ? 'Dark' : 'Sun Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
