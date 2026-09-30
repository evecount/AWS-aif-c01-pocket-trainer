import { Zap, GitCompare, UploadCloud, BarChart3 } from 'lucide-react';

export type NavTab = 'quiz' | 'confusion' | 'import' | 'stats';

interface BottomNavProps {
  currentTab: NavTab;
  onChangeTab: (tab: NavTab) => void;
  poolsideMode: boolean;
}

export function BottomNav({ currentTab, onChangeTab, poolsideMode }: BottomNavProps) {
  const tabs = [
    { id: 'quiz' as NavTab, label: 'Quiz', icon: Zap },
    { id: 'confusion' as NavTab, label: 'Cheat Sheet', icon: GitCompare },
    { id: 'import' as NavTab, label: 'Import Tests', icon: UploadCloud },
    { id: 'stats' as NavTab, label: 'Diagnostics', icon: BarChart3 }
  ];

  return (
    <nav 
      aria-label="Primary mobile navigation"
      className={`fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md transition-colors ${
        poolsideMode 
          ? 'bg-amber-100/95 border-amber-300 text-slate-900' 
          : 'bg-slate-950/90 border-slate-800 text-slate-400'
      }`}
    >
      <div className="max-w-2xl mx-auto grid grid-cols-4 items-center h-14 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center transition-colors ${
                isActive
                  ? poolsideMode
                    ? 'text-slate-950 font-bold'
                    : 'text-amber-400 font-semibold'
                  : poolsideMode
                  ? 'text-slate-700 hover:text-slate-950'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] leading-tight tracking-tight mt-0.5">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
