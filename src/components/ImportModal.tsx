import { useState } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, FileText, Trash2, ArrowRight } from 'lucide-react';
import { parseRawPracticeTest, saveImportedQuestions, loadImportedQuestions } from '../utils/storage';
import { Question } from '../types';

interface ImportModalProps {
  onQuestionsImported: (questions: Question[]) => void;
  poolsideMode: boolean;
  onClose?: () => void;
}

const SAMPLE_TEMPLATE = `Question 1: A financial company wants to automate loan decisions with Bedrock while guaranteeing that customer social security numbers are never output to users. What should they configure?
A) Amazon Bedrock Guardrails with sensitive information filters
B) Amazon SageMaker Clarify
C) Amazon Rekognition Custom Labels
D) AWS WAF Web ACL

Correct Answer: A
Explanation: Amazon Bedrock Guardrails provides configurable PII masking and toxic content filtering for foundation models.

Question 2: An ML engineer observes that a fraud detection model achieves 99% accuracy during training, but drops to 55% on validation data. What is this phenomenon?
A) Underfitting
B) Overfitting (High Variance)
C) Class Inversion
D) Stochastic Drift

Correct Answer: B
Explanation: High performance on training data coupled with poor generalization on validation data indicates overfitting (high variance).`;

export function ImportModal({ onQuestionsImported, poolsideMode, onClose }: ImportModalProps) {
  const [rawText, setRawText] = useState('');
  const [testName, setTestName] = useState('Practice Test 1');
  const [parsedPreview, setParsedPreview] = useState<Question[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const existingImported = loadImportedQuestions();

  const handleParse = () => {
    if (!rawText.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste some question text or JSON first.' });
      return;
    }

    const parsed = parseRawPracticeTest(rawText, testName);
    if (parsed.length === 0) {
      setStatusMessage({ 
        type: 'error', 
        text: 'Could not detect question blocks. Ensure each question has options (A, B, C, D) and an Answer line.' 
      });
      setParsedPreview([]);
    } else {
      setParsedPreview(parsed);
      setStatusMessage({ 
        type: 'success', 
        text: `Successfully parsed ${parsed.length} questions from ${testName}!` 
      });
    }
  };

  const handleSaveAndUse = () => {
    if (parsedPreview.length === 0) return;

    // Combine with any previously imported or replace
    const combined = [...existingImported, ...parsedPreview];
    saveImportedQuestions(combined);
    onQuestionsImported(parsedPreview);
    setStatusMessage({ type: 'success', text: `Loaded ${parsedPreview.length} questions into active practice!` });
    setRawText('');
    setParsedPreview([]);
    if (onClose) onClose();
  };

  const handleClearExisting = () => {
    saveImportedQuestions([]);
    setStatusMessage({ type: 'success', text: 'Cleared all imported custom tests.' });
  };

  const handleLoadSample = () => {
    setRawText(SAMPLE_TEMPLATE);
    setTestName('Sample Practice Test');
    setStatusMessage(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pb-28">
      {/* Intro */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Import Practice Tests
        </h1>
        <p className={`text-xs sm:text-sm ${poolsideMode ? 'text-slate-800' : 'text-slate-400'}`}>
          Paste your practice test questions here (text or JSON). The quizmaster will parse the questions, options, answers, and explanations into your poolside session.
        </p>
      </div>

      {/* Main Paste Box */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        poolsideMode ? 'bg-white border-slate-300 text-slate-900 shadow-sm' : 'bg-slate-900/90 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>Practice Test Source</span>
          </label>
          <button
            onClick={handleLoadSample}
            className="text-xs text-slate-400 hover:text-amber-400 underline underline-offset-2 transition-colors"
          >
            Insert sample format
          </button>
        </div>

        {/* Test Name Input */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-slate-400 mb-1">Test Name / Source Label</label>
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="e.g. Practice Test 1 (AIF-C01)"
            className={`w-full h-10 px-3 text-sm rounded-xl border outline-none ${
              poolsideMode ? 'bg-slate-100 border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-700 text-slate-100'
            }`}
          />
        </div>

        {/* Text Area */}
        <div className="mb-4">
          <textarea
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              setStatusMessage(null);
            }}
            rows={10}
            placeholder={`Paste your practice test questions here...

Example:
Question 1: What is Amazon Bedrock?
A) Serverless foundation model API
B) Dedicated GPU cluster
C) Speech synthesizer
D) Relational database

Correct Answer: A
Explanation: Bedrock provides fully managed serverless API access to foundation models.`}
            className={`w-full p-3 text-xs sm:text-sm font-mono rounded-xl border outline-none resize-y ${
              poolsideMode 
                ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-slate-800' 
                : 'bg-slate-950 border-slate-800 text-slate-200 focus:border-amber-400/80'
            }`}
          />
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800' 
              : 'bg-rose-950/40 text-rose-300 border border-rose-800'
          }`}>
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleParse}
            className={`w-full sm:w-auto px-5 h-11 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              poolsideMode 
                ? 'bg-slate-950 text-white hover:bg-slate-900' 
                : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Parse Questions</span>
          </button>

          {parsedPreview.length > 0 && (
            <button
              onClick={handleSaveAndUse}
              className="w-full sm:w-auto px-5 h-11 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Start Quizzing Now ({parsedPreview.length} Qs)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Existing Saved Tests */}
      {existingImported.length > 0 && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between ${
          poolsideMode ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
        }`}>
          <div>
            <p className="font-semibold text-sm">Stored Custom Questions</p>
            <p className="text-xs text-slate-400">{existingImported.length} custom questions saved in your local deck.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onQuestionsImported(existingImported)}
              className="px-3 py-1.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg"
            >
              Quiz This Deck
            </button>
            <button
              onClick={handleClearExisting}
              aria-label="Delete saved custom questions"
              className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
