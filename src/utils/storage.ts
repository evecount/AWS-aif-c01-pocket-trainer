import { Question, QuizProgress } from '../types';
import { EXAM_QUESTIONS } from '../data/examQuestions';

const STORAGE_KEYS = {
  PROGRESS: 'aif_c01_quiz_progress_v1',
  IMPORTED_QUESTIONS: 'aif_c01_imported_questions_v1',
  CUSTOM_TEST_SETS: 'aif_c01_custom_sets_v1'
};

export const defaultProgress: QuizProgress = {
  answered: {},
  bookmarkedIds: [],
  currentStreak: 0,
  bestStreak: 0,
  poolsideMode: false,
  soundEnabled: true,
  autoAdvance: false
};

export function loadProgress(): QuizProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: QuizProgress) {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch {
    // Ignore storage quota
  }
}

export function loadImportedQuestions(): Question[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.IMPORTED_QUESTIONS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveImportedQuestions(questions: Question[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.IMPORTED_QUESTIONS, JSON.stringify(questions));
  } catch {
    // Ignore storage quota
  }
}

export function clearUserProgress(): QuizProgress {
  const reset: QuizProgress = {
    ...defaultProgress,
    poolsideMode: loadProgress().poolsideMode,
    soundEnabled: loadProgress().soundEnabled
  };
  saveProgress(reset);
  return reset;
}

/**
 * Intelligent parser for user-pasted practice test text.
 * Handles diverse styles:
 * - "Question 1: ..." or "1. ..."
 * - "A) ..." or "A. ..." or "A: ..."
 * - "Answer: B" or "Correct Answer: B" or "Answer: (B)"
 * - "Explanation: ..."
 */
export function parseRawPracticeTest(rawText: string, testName = 'Custom Practice Test'): Question[] {
  const questions: Question[] = [];
  
  // First check if it's valid JSON
  try {
    const parsed = JSON.parse(rawText);
    if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].scenario && parsed[0].options) {
      return parsed.map((q, idx) => ({
        id: q.id || `custom-${Date.now()}-${idx + 1}`,
        domain: q.domain || 'GenAI & Bedrock',
        subtopic: q.subtopic || testName,
        scenario: q.scenario,
        options: {
          A: q.options.A || '',
          B: q.options.B || '',
          C: q.options.C || '',
          D: q.options.D || ''
        },
        correctAnswer: (q.correctAnswer?.toUpperCase() || 'A') as 'A' | 'B' | 'C' | 'D',
        explanation: q.explanation || 'No explanation provided.',
        distractorBreakdown: q.distractorBreakdown,
        confusingProductNote: q.confusingProductNote,
        source: testName
      }));
    }
  } catch {
    // Fall back to regex-based text parsing
  }

  // Split by question markers like "Question 1", "Question 2", "Q1", or numbers followed by dot/parenthesis
  const rawBlocks = rawText.split(/(?=(?:(?:Question|Q)\s*\d+[:.]?)|(?:^\s*\d+[\.\)]\s+))/gim);

  let qCount = 0;
  for (const block of rawBlocks) {
    const trimmed = block.trim();
    if (!trimmed || trimmed.length < 20) continue;

    // Extract options
    const optionAMatch = trimmed.match(/(?:^|\n)\s*(?:[A|a][\.\)\:\-]\s*)([\s\S]*?)(?=(?:^|\n)\s*[B|b][\.\)\:\-]\s*)/i);
    const optionBMatch = trimmed.match(/(?:^|\n)\s*(?:[B|b][\.\)\:\-]\s*)([\s\S]*?)(?=(?:^|\n)\s*[C|c][\.\)\:\-]\s*)/i);
    const optionCMatch = trimmed.match(/(?:^|\n)\s*(?:[C|c][\.\)\:\-]\s*)([\s\S]*?)(?=(?:^|\n)\s*[D|d][\.\)\:\-]\s*)/i);
    const optionDMatch = trimmed.match(/(?:^|\n)\s*(?:[D|d][\.\)\:\-]\s*)([\s\S]*?)(?=(?:^|\n)\s*(?:Answer|Correct Answer|Ans|Explanation|$))/i);

    if (!optionAMatch || !optionBMatch) continue;

    // Extract scenario (before option A)
    const scenarioRaw = trimmed.substring(0, trimmed.search(/(?:^|\n)\s*[A|a][\.\)\:\-]\s*/i));
    const cleanScenario = scenarioRaw
      .replace(/^(?:Question|Q)?\s*\d+[\.\:\)]?\s*/i, '')
      .trim();

    // Extract Answer
    const answerMatch = trimmed.match(/(?:Answer|Correct\s*Answer|Ans)[\s\:\*\#\-\=]*\(?([A-D])\)?/i);
    const answer = (answerMatch ? answerMatch[1].toUpperCase() : 'A') as 'A' | 'B' | 'C' | 'D';

    // Extract Explanation
    const expMatch = trimmed.match(/(?:Explanation|Explain|Rationale)[\s\:\*\#\-\=]*([\s\S]*?)(?=(?:Question|Q\d+|$))/i);
    const explanation = expMatch ? expMatch[1].trim() : 'Correct answer verified for exam scenario.';

    qCount++;
    questions.push({
      id: `imported-${Date.now()}-${qCount}`,
      domain: inferDomain(cleanScenario + ' ' + (optionAMatch[1] || '')),
      subtopic: testName,
      scenario: cleanScenario || `Question ${qCount}`,
      options: {
        A: optionAMatch ? optionAMatch[1].trim() : 'Option A',
        B: optionBMatch ? optionBMatch[1].trim() : 'Option B',
        C: optionCMatch ? optionCMatch[1].trim() : 'Option C',
        D: optionDMatch ? optionDMatch[1].trim() : 'Option D'
      },
      correctAnswer: answer,
      explanation: explanation,
      source: testName
    });
  }

  return questions;
}

function inferDomain(text: string): Question['domain'] {
  const lower = text.toLowerCase();
  if (lower.includes('bedrock') || lower.includes('rag') || lower.includes('llm') || lower.includes('foundation model') || lower.includes('temperature') || lower.includes('titan') || lower.includes('prompt')) {
    return 'GenAI & Bedrock';
  }
  if (lower.includes('clarify') || lower.includes('guardrail') || lower.includes('bias') || lower.includes('shap') || lower.includes('fairness') || lower.includes('pii') || lower.includes('model card')) {
    return 'Responsible AI';
  }
  if (lower.includes('precision') || lower.includes('recall') || lower.includes('f1') || lower.includes('overfitting') || lower.includes('underfitting') || lower.includes('decision tree') || lower.includes('unsupervised') || lower.includes('supervised')) {
    return 'Traditional ML';
  }
  if (lower.includes('comprehend') || lower.includes('textract') || lower.includes('rekognition') || lower.includes('polly') || lower.includes('transcribe') || lower.includes('kendra') || lower.includes('personalize') || lower.includes('lex')) {
    return 'AWS AI Services';
  }
  if (lower.includes('vpc') || lower.includes('kms') || lower.includes('cloudtrail') || lower.includes('privatelink') || lower.includes('iam')) {
    return 'Security & Governance';
  }
  return 'GenAI & Bedrock';
}
