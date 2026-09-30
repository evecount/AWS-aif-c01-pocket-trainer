import { useState } from 'react';
import { X, Search, Zap, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

interface AwsCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ServiceItem {
  name: string;
  category: 'GenAI & Bedrock' | 'Traditional ML & MLOps' | 'Perception & NLP' | 'Search & Recommenders' | 'Security & Governance';
  trigger: string;
  trap: string;
  examKeywords: string[];
}

export const AWS_EXAM_SERVICES: ServiceItem[] = [
  {
    name: 'Amazon Bedrock',
    category: 'GenAI & Bedrock',
    trigger: 'Fully managed service providing access to multi-tenant foundation models (Claude, Titan, Llama, Mistral) via a single unified serverless API.',
    trap: 'Contrast with SageMaker JumpStart: Bedrock is completely serverless pay-per-token with NO instances to manage. JumpStart deploys to dedicated SageMaker EC2 hosting instances.',
    examKeywords: ['Serverless API', 'Pay-per-token', 'Pre-trained foundation models', 'No compute to manage']
  },
  {
    name: 'Bedrock Knowledge Bases',
    category: 'GenAI & Bedrock',
    trigger: 'Managed RAG (Retrieval-Augmented Generation). Automatically connects foundation models to your private S3 data using vector embeddings with source citations.',
    trap: 'Contrast with Amazon Kendra: Use Knowledge Bases when feeding retrieved vector passages into an LLM for GenAI answers. Use Kendra for standard enterprise document search without an LLM.',
    examKeywords: ['Managed RAG', 'Vector embeddings', 'S3 document citations', 'Eliminate hallucinations']
  },
  {
    name: 'Bedrock Agents',
    category: 'GenAI & Bedrock',
    trigger: 'Orchestrates multi-step, complex tasks by letting foundation models interact with external enterprise APIs via AWS Lambda Action Groups.',
    trap: 'Use Agents when the model must dynamically take actions, call APIs, or execute multi-step workflows. Guardrails only filters text; it cannot execute tasks.',
    examKeywords: ['Multi-step task orchestration', 'API calling', 'AWS Lambda action groups', 'Tool use']
  },
  {
    name: 'Bedrock Guardrails',
    category: 'GenAI & Bedrock',
    trigger: 'Implements runtime safety layers: blocks toxic content, filters out PII (SSNs, phone numbers), and enforces denied topics on model inputs and outputs.',
    trap: 'Contrast with SageMaker Clarify: Guardrails works at RUNTIME on live GenAI prompts/responses. Clarify is an offline tool for training dataset bias & SHAP explainability.',
    examKeywords: ['PII redaction/masking', 'Blocked topics', 'Toxic content filtering', 'Runtime GenAI safety']
  },
  {
    name: 'Amazon SageMaker',
    category: 'Traditional ML & MLOps',
    trigger: 'The full, end-to-end ML platform for preparing data, building, training, fine-tuning, and deploying custom models with full compute control.',
    trap: 'Contrast with Bedrock: SageMaker is for custom ML engineering and dedicated hosting instances. Bedrock is for turnkey serverless foundation models.',
    examKeywords: ['Custom model training', 'Dedicated endpoints', 'Feature Store', 'Data Wrangler', 'Model Monitor']
  },
  {
    name: 'SageMaker Clarify',
    category: 'Traditional ML & MLOps',
    trigger: 'Detects bias in training datasets (pre-training imbalance) and provides post-hoc explainability (feature importance via SHAP values) for model predictions.',
    trap: 'Exam Trigger: Whenever the question mentions "measuring fairness", "demographic bias in historical data", or "explaining prediction factors with SHAP", choose Clarify.',
    examKeywords: ['Bias detection', 'Disparate impact', 'Explainability', 'SHAP feature attribution']
  },
  {
    name: 'Amazon Transcribe',
    category: 'Perception & NLP',
    trigger: 'Converts speech-to-text (STT) for recorded audio files, customer call recordings, and meetings.',
    trap: 'Contrast with Amazon Lex: Transcribe passively transcribes audio to text. Amazon Lex builds interactive conversational chatbots that recognize intent and manage multi-turn dialogues.',
    examKeywords: ['Speech-to-text', 'Audio transcription', 'Call center WAV files', 'Subtitles']
  },
  {
    name: 'Amazon Polly',
    category: 'Perception & NLP',
    trigger: 'Converts text-to-speech (TTS) to generate lifelike voiceovers and natural spoken audio from written text.',
    trap: 'Mnemonic: Transcribe = "transcribes notes" (Audio -> Text). Polly = "talks like a parrot" (Text -> Audio).',
    examKeywords: ['Text-to-speech', 'Voice synthesis', 'Read aloud', 'Lifelike human voices']
  },
  {
    name: 'Amazon Comprehend',
    category: 'Perception & NLP',
    trigger: 'Natural Language Processing (NLP) service for text analytics: sentiment analysis, entity extraction, syntax parsing, and language detection.',
    trap: 'Contrast with Amazon Textract: Comprehend operates on existing raw text strings. Textract extracts text and structured tables from scanned images and PDFs.',
    examKeywords: ['Sentiment analysis', 'Entity recognition', 'Key phrase extraction', 'Text analytics']
  },
  {
    name: 'Amazon Lex',
    category: 'Perception & NLP',
    trigger: 'Builds interactive conversational AI interfaces and voice/text chatbots (the core technology behind Alexa).',
    trap: 'Exam Trigger: Look for "intents", "utterances", "slots", or "conversational dialogue turns". If the app needs an interactive bot to execute banking tasks, pick Lex.',
    examKeywords: ['Conversational AI', 'Chatbots', 'Intent recognition', 'Slots and fulfillment']
  },
  {
    name: 'Amazon Rekognition',
    category: 'Perception & NLP',
    trigger: 'Computer vision service for analyzing images and videos (facial analysis, object detection, text in images, and visual content moderation).',
    trap: 'Rekognition analyzes visual images and videos. For scanned document table and form OCR, use Amazon Textract instead.',
    examKeywords: ['Computer vision', 'Facial analysis', 'Object detection', 'Image moderation']
  },
  {
    name: 'Amazon Personalize',
    category: 'Search & Recommenders',
    trigger: 'Builds real-time recommendation engines and custom personalization workflows based on user clickstreams and purchase history.',
    trap: 'Exam Trigger: "Recommending products/movies based on user activity with least ML effort" = Amazon Personalize. Does NOT require building custom neural networks.',
    examKeywords: ['Recommendation engine', 'User personalization', 'Clickstream ranking', 'Zero ML code']
  },
  {
    name: 'Amazon Kendra',
    category: 'Search & Recommenders',
    trigger: 'Intelligent enterprise semantic search and document indexing service across SharePoint, Confluence, and S3.',
    trap: 'Classic Exam Trap: Use Bedrock Knowledge Bases for LLM/RAG setups. Use Amazon Kendra for standard enterprise search returning document links WITHOUT invoking an LLM.',
    examKeywords: ['Enterprise search', 'Document indexing', 'Semantic search bar', 'No LLM required']
  },
  {
    name: 'Amazon Q Business vs Q Developer',
    category: 'GenAI & Bedrock',
    trigger: 'Q Business = GenAI assistant for enterprise employees to query corporate data. Q Developer = AI coding companion inside IDEs for generating code & security scans.',
    trap: 'Q Business respects enterprise Access Control Lists (ACLs). Q Developer replaces CodeWhisperer for software engineers in VS Code / JetBrains.',
    examKeywords: ['Q Business (Corporate files)', 'Q Developer (IDE code assistant)', 'Enterprise ACLs']
  },
  {
    name: 'Amazon Macie',
    category: 'Security & Governance',
    trigger: 'Data security service that uses machine learning and pattern matching to discover, classify, and protect sensitive Personally Identifiable Information (PII like SSNs, credit cards, passport numbers) stored in Amazon S3 buckets.',
    trap: 'Contrast with Bedrock Guardrails: Macie scans stored S3 data at rest. Bedrock Guardrails filters and redacts PII from live prompts/responses at runtime. (Mnemonic: Macie = Monitors S3 for PII).',
    examKeywords: ['Discover PII in S3', 'Sensitive data discovery', 'S3 security audit', 'Data at rest', 'PII classification']
  }
];

export function AwsCheatSheetModal({ isOpen, onClose }: AwsCheatSheetModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'GenAI & Bedrock', 'Traditional ML & MLOps', 'Perception & NLP', 'Search & Recommenders', 'Security & Governance'];

  const filteredServices = AWS_EXAM_SERVICES.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.trap.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.examKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-300 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="shrink-0 px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-amber-50/70">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500 text-white">
              <Zap className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                AWS AI/ML Core Services Cheat Sheet
                <span className="text-[10px] bg-amber-200 text-amber-950 font-bold px-1.5 py-0.2 rounded border border-amber-300">
                  AIF-C01
                </span>
              </h2>
              <p className="text-[11px] text-slate-600">The exact service triggers and classic exam traps you need to pass</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="shrink-0 p-3 border-b border-slate-200 bg-slate-50 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search services (e.g., RAG, voice, search, PII, audio)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2 py-0.5 rounded-md font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {filteredServices.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No services match your search query.
            </div>
          ) : (
            filteredServices.map((svc) => (
              <div 
                key={svc.name}
                className="bg-white border border-slate-200 rounded-lg p-3 shadow-2xs hover:border-slate-300 transition-all"
              >
                {/* Service Header */}
                <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xs text-slate-900">{svc.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {svc.category}
                    </span>
                  </div>
                </div>

                {/* The Exam Trigger */}
                <div className="mb-1.5 text-[11.5px] leading-relaxed text-slate-800">
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 mr-1.5 text-[10.5px]">
                    ⚡ What It Does (Exam Trigger):
                  </span>
                  {svc.trigger}
                </div>

                {/* Classic Exam Trap */}
                <div className="mb-2 text-[11.5px] leading-relaxed text-amber-950 bg-amber-50/70 border border-amber-200/80 rounded-md p-1.5">
                  <span className="font-bold text-amber-900 mr-1 text-[10.5px] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600 inline shrink-0" />
                    Classic Exam Trap:
                  </span>
                  {svc.trap}
                </div>

                {/* Keywords Chips */}
                <div className="flex items-center gap-1 flex-wrap pt-0.5">
                  {svc.examKeywords.map((kw) => (
                    <span 
                      key={kw}
                      className="text-[10px] bg-slate-100 text-slate-700 font-medium px-1.5 py-0.2 rounded"
                    >
                      • {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-4 py-2 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium text-[11px]">
            Showing {filteredServices.length} of {AWS_EXAM_SERVICES.length} Core Services
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs shadow-2xs"
          >
            Back to Question
          </button>
        </div>
      </div>
    </div>
  );
}
