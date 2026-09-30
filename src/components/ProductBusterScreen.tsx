import { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { PRODUCT_COMPARISONS } from '../data/productCheatSheet';
import { soundEffects } from '../utils/audio';

interface ProductBusterProps {
  poolsideMode: boolean;
  soundEnabled: boolean;
  onPracticeDomain?: (domain: string) => void;
}

// Interactive mini-drills specifically for product differentiation
const PRODUCT_DRILLS = [
  {
    prompt: 'You need to redact Social Security numbers and block competitor names in live Bedrock chatbot prompts.',
    correct: 'Amazon Bedrock Guardrails',
    options: ['Amazon Bedrock Guardrails', 'Amazon SageMaker Clarify', 'Amazon Comprehend Medical', 'AWS WAF'],
    reason: 'Guardrails is the real-time runtime filter for Bedrock FMs to mask PII and enforce safety boundaries.'
  },
  {
    prompt: 'A scanned PDF table of income records needs to be parsed into structured JSON key-value pairs.',
    correct: 'Amazon Textract',
    options: ['Amazon Textract', 'Amazon Comprehend', 'Amazon Rekognition', 'Amazon Kendra'],
    reason: 'Textract specializes in OCR + structured table and form extraction from scanned documents and PDFs.'
  },
  {
    prompt: 'Before training an ML model, you need to measure whether historical loan approvals show disparate impact against protected demographic groups.',
    correct: 'Amazon SageMaker Clarify',
    options: ['Amazon SageMaker Clarify', 'Amazon Bedrock Guardrails', 'AWS Audit Manager', 'Amazon Inspector'],
    reason: 'SageMaker Clarify computes pre-training and post-training bias metrics to evaluate algorithmic fairness.'
  },
  {
    prompt: 'You need fully serverless, pay-as-you-go API access to Anthropic Claude 3 and Amazon Titan without provisioning any EC2 instances.',
    correct: 'Amazon Bedrock',
    options: ['Amazon Bedrock', 'Amazon SageMaker JumpStart', 'SageMaker Studio Notebooks', 'AWS Elastic Beanstalk'],
    reason: 'Bedrock is the serverless API service for Foundation Models; JumpStart requires deploying to dedicated hosting instances.'
  },
  {
    prompt: 'A mobile audio guide needs to read aloud museum exhibition descriptions to visitors with natural, human-sounding voices.',
    correct: 'Amazon Polly',
    options: ['Amazon Polly', 'Amazon Transcribe', 'Amazon Lex', 'AWS HealthScribe'],
    reason: 'Amazon Polly is Text-to-Speech (TTS); Transcribe is Speech-to-Text (STT).'
  },
  {
    prompt: 'Software engineers need real-time code recommendations and automated security scans directly inside Visual Studio Code.',
    correct: 'Amazon Q Developer',
    options: ['Amazon Q Developer', 'Amazon Q Business', 'Amazon Kendra', 'AWS CodePipeline'],
    reason: 'Q Developer (formerly CodeWhisperer) is the AI coding assistant in IDEs; Q Business connects enterprise files for employees.'
  },
  {
    prompt: 'Auditors require a standardized factsheet documenting an AI model\'s intended purpose, limitations, risk assessment, and training history.',
    correct: 'SageMaker Model Cards',
    options: ['SageMaker Model Cards', 'SageMaker Model Dashboard', 'Amazon CloudWatch', 'AWS Systems Manager'],
    reason: 'Model Cards document static governance metadata & intended use; Model Dashboard monitors live operational drift.'
  },
  {
    prompt: 'You need an automated AWS service to scan millions of archived text files stored in Amazon S3 buckets to discover and inventory unencrypted Personally Identifiable Information (PII) before training a foundation model.',
    correct: 'Amazon Macie',
    options: ['Amazon Macie', 'Amazon Bedrock Guardrails', 'Amazon Inspector', 'AWS Secrets Manager'],
    reason: 'Amazon Macie uses ML to discover, classify, and protect sensitive PII in Amazon S3 buckets at rest. (Macie = Monitors S3 for PII).'
  }
];

export function ProductBusterScreen({ poolsideMode, soundEnabled }: ProductBusterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Rapid drill state
  const [drillIndex, setDrillIndex] = useState(0);
  const [selectedDrillChoice, setSelectedDrillChoice] = useState<string | null>(null);
  const [drillScore, setDrillScore] = useState(0);
  const [drillFinished, setDrillFinished] = useState(false);

  const categories = ['All', 'GenAI vs ML Platform', 'Responsible AI', 'Search & Knowledge', 'Perception & NLP', 'ML Metrics'];

  const filteredComparisons = PRODUCT_COMPARISONS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.serviceA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceB.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.coreDistinction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examTriggerA.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.examTriggerB.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const currentDrill = PRODUCT_DRILLS[drillIndex];

  const handleDrillAnswer = (choice: string) => {
    if (selectedDrillChoice) return;
    setSelectedDrillChoice(choice);
    const isCorrect = choice === currentDrill.correct;
    if (isCorrect) {
      setDrillScore(s => s + 1);
      if (soundEnabled) soundEffects.playCorrect();
    } else {
      if (soundEnabled) soundEffects.playIncorrect();
    }
  };

  const handleNextDrill = () => {
    if (drillIndex + 1 < PRODUCT_DRILLS.length) {
      setDrillIndex(drillIndex + 1);
      setSelectedDrillChoice(null);
    } else {
      setDrillFinished(true);
    }
  };

  const handleRestartDrill = () => {
    setDrillIndex(0);
    setSelectedDrillChoice(null);
    setDrillScore(0);
    setDrillFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 pb-28">
      {/* Intro Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Product Confusion Buster
        </h1>
        <p className={`text-xs sm:text-sm ${poolsideMode ? 'text-slate-800' : 'text-slate-400'}`}>
          The AIF-C01 exam loves testing subtle differences between similar AWS services. Master these side-by-side differentiators so you never hesitate.
        </p>
      </div>

      {/* Interactive Rapid Product Drill Box */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
        poolsideMode 
          ? 'bg-amber-50 border-amber-300 text-slate-900 shadow-sm' 
          : 'bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30 text-slate-100'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Zap className="w-4 h-4 fill-amber-400 text-slate-900" />
            <span>Rapid Product Drill ({drillIndex + 1}/{PRODUCT_DRILLS.length})</span>
          </div>
          <span className="text-xs font-mono font-semibold tabular-nums text-slate-400">
            Score: {drillScore}
          </span>
        </div>

        {!drillFinished ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm sm:text-base font-medium leading-snug">
              "{currentDrill.prompt}"
            </p>

            {/* Drill Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {currentDrill.options.map((opt) => {
                const isSelected = selectedDrillChoice === opt;
                const isTargetCorrect = opt === currentDrill.correct;
                
                let btnStyle = poolsideMode
                  ? 'bg-white border-slate-300 text-slate-900 hover:bg-slate-50'
                  : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-500';

                if (selectedDrillChoice) {
                  if (isTargetCorrect) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-semibold';
                  } else if (isSelected && !isTargetCorrect) {
                    btnStyle = 'bg-rose-600 text-white border-rose-600 line-through';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-800 border-slate-800 text-slate-400';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleDrillAnswer(opt)}
                    disabled={selectedDrillChoice !== null}
                    className={`min-h-[44px] px-3 py-2 text-xs sm:text-sm text-left rounded-xl border flex items-center justify-between gap-2 transition-all ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedDrillChoice && isTargetCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                    {selectedDrillChoice && isSelected && !isTargetCorrect && <XCircle className="w-4 h-4 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Drill explanation on answer */}
            {selectedDrillChoice && (
              <div className="mt-2 pt-2 border-t border-slate-700/40 flex items-center justify-between gap-3 animate-in fade-in duration-150">
                <p className="text-xs text-slate-300 leading-tight">
                  <span className="font-bold text-amber-400">Why: </span>
                  {currentDrill.reason}
                </p>
                <button
                  onClick={handleNextDrill}
                  className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shrink-0 flex items-center gap-1"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 text-center flex flex-col items-center gap-2">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <p className="font-bold text-base">Drill Complete!</p>
            <p className="text-xs text-slate-300">You scored {drillScore} out of {PRODUCT_DRILLS.length}.</p>
            <button
              onClick={handleRestartDrill}
              className="mt-2 px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search confusing services (e.g. Bedrock, Kendra, Recall)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full h-11 pl-10 pr-4 text-sm rounded-xl border outline-none transition-colors ${
              poolsideMode 
                ? 'bg-white border-slate-300 text-slate-950 focus:border-slate-900 placeholder:text-slate-400' 
                : 'bg-slate-900 border-slate-800 text-slate-100 focus:border-amber-400/80 placeholder:text-slate-500'
            }`}
          />
        </div>

        {/* Category Segmented Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? poolsideMode ? 'bg-slate-950 text-white font-semibold' : 'bg-amber-400 text-slate-950 font-bold'
                  : poolsideMode ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="flex flex-col gap-4">
        {filteredComparisons.map((item) => (
          <div
            key={item.id}
            className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              poolsideMode 
                ? 'bg-white border-slate-300 text-slate-950 shadow-sm' 
                : 'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            {/* Header: Versus Badge */}
            <div className="flex items-center justify-between mb-3 border-b border-slate-700/30 pb-2">
              <span className="text-xs font-mono font-medium text-amber-400 uppercase tracking-wider">
                {item.category}
              </span>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className={poolsideMode ? 'text-blue-700' : 'text-blue-400'}>{item.serviceA}</span>
                <span className="text-slate-500 font-normal">vs</span>
                <span className={poolsideMode ? 'text-purple-700' : 'text-purple-400'}>{item.serviceB}</span>
              </div>
            </div>

            {/* Core Distinction in 1 Sentence */}
            <p className={`text-sm sm:text-base font-semibold leading-relaxed mb-4 ${
              poolsideMode ? 'text-slate-950' : 'text-slate-100'
            }`}>
              {item.coreDistinction}
            </p>

            {/* Side-by-Side Detail Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
              {/* Service A */}
              <div className={`p-3 rounded-xl border ${
                poolsideMode ? 'bg-blue-50/60 border-blue-200 text-slate-900' : 'bg-blue-950/20 border-blue-800/40 text-blue-100'
              }`}>
                <div className="font-bold text-sm mb-1 text-blue-400">{item.serviceA}</div>
                <p className="mb-2 leading-relaxed">{item.whenToChooseA}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.examTriggerA.map((kw, i) => (
                    <span key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      poolsideMode ? 'bg-blue-200 text-blue-900 font-semibold' : 'bg-blue-900/50 text-blue-300'
                    }`}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service B */}
              <div className={`p-3 rounded-xl border ${
                poolsideMode ? 'bg-purple-50/60 border-purple-200 text-slate-900' : 'bg-purple-950/20 border-purple-800/40 text-purple-100'
              }`}>
                <div className="font-bold text-sm mb-1 text-purple-400">{item.serviceB}</div>
                <p className="mb-2 leading-relaxed">{item.whenToChooseB}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.examTriggerB.map((kw, i) => (
                    <span key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                      poolsideMode ? 'bg-purple-200 text-purple-900 font-semibold' : 'bg-purple-900/50 text-purple-300'
                    }`}>
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Trap Warning */}
            <div className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs ${
              poolsideMode ? 'bg-rose-50 border-rose-200 text-rose-950' : 'bg-rose-950/20 border-rose-800/40 text-rose-200'
            }`}>
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <span className="font-bold">Exam Trap to Avoid: </span>
                {item.trapWarning}
              </div>
            </div>
          </div>
        ))}

        {filteredComparisons.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <HelpCircle className="w-8 h-8 mx-auto mb-2 text-slate-500" />
            <p>No products matched "{searchTerm}".</p>
          </div>
        )}
      </div>
    </div>
  );
}
