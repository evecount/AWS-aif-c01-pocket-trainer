export type DomainType = 
  | 'GenAI & Bedrock'
  | 'Responsible AI'
  | 'Traditional ML'
  | 'AWS AI Services'
  | 'Security & Governance';

export interface Question {
  id: string;
  domain: DomainType;
  subtopic: string;
  scenario: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string; // Sharp 1-2 sentence core explanation
  distractorBreakdown?: {
    [key in 'A' | 'B' | 'C' | 'D']?: string;
  };
  confusingProductNote?: string; // Direct hint for confusing AWS services
  examTip?: string;
  source?: string;
}

export interface ProductComparison {
  id: string;
  category: 'GenAI vs ML Platform' | 'Search & Knowledge' | 'Responsible AI' | 'Perception & NLP' | 'ML Metrics' | 'Enterprise Assistants' | 'Security & Governance';
  serviceA: string;
  serviceB: string;
  coreDistinction: string;
  whenToChooseA: string;
  whenToChooseB: string;
  examTriggerA: string[];
  examTriggerB: string[];
  trapWarning: string;
}

export interface QuizProgress {
  answered: Record<string, {
    selected: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
    timestamp: number;
  }>;
  bookmarkedIds: string[];
  currentStreak: number;
  bestStreak: number;
  poolsideMode: boolean; // Ultra high-contrast outdoor sun mode
  soundEnabled: boolean;
  autoAdvance: boolean;
}
