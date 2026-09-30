import { ProductComparison } from '../types';

export const PRODUCT_COMPARISONS: ProductComparison[] = [
  {
    id: 'bedrock-vs-jumpstart',
    category: 'GenAI vs ML Platform',
    serviceA: 'Amazon Bedrock',
    serviceB: 'Amazon SageMaker JumpStart',
    coreDistinction: 'Bedrock is fully serverless API access to foundation models; JumpStart provides pre-trained models deployed onto SageMaker-managed EC2 compute instances.',
    whenToChooseA: 'You want quick, zero-infrastructure serverless API calls to top foundation models (Claude, Titan, Llama, Mistral) without managing EC2 instances.',
    whenToChooseB: 'You need deep control over model weights, custom hosting containers, custom VPC network topologies, or fine-tuning infrastructure within SageMaker Studio.',
    examTriggerA: ['Serverless', 'API-driven', 'No infrastructure to manage', 'Knowledge Bases', 'Guardrails'],
    examTriggerB: ['Deploy to dedicated SageMaker endpoint', 'Custom container', 'SageMaker Studio integration', 'Full compute control'],
    trapWarning: 'If the question mentions "deploying an endpoint on specific ml.g5 instances", the answer is SageMaker JumpStart, not Bedrock!'
  },
  {
    id: 'knowledge-bases-vs-kendra',
    category: 'Search & Knowledge',
    serviceA: 'Knowledge Bases for Bedrock (RAG)',
    serviceB: 'Amazon Kendra',
    coreDistinction: 'Knowledge Bases manages end-to-end vector embeddings + vector database sync + LLM prompt augmentation; Kendra is an intelligent enterprise semantic search engine with prebuilt connectors.',
    whenToChooseA: 'Building a conversational Generative AI RAG pipeline to ground Bedrock Foundation Models on internal documents in S3.',
    whenToChooseB: 'You need an enterprise search bar with built-in connectors (SharePoint, Salesforce, Confluence) returning exact answer excerpts and document links for employees.',
    examTriggerA: ['Grounding foundation models', 'Vector embeddings', 'RAG workflow', 'Bedrock integration', 'Reduce hallucinations'],
    examTriggerB: ['Enterprise search engine', 'Pre-built connectors to third-party SaaS', 'Natural language search bar', 'Document ranking with citations'],
    trapWarning: 'Knowledge Bases for Bedrock can actually use Kendra as an underlying retriever, but if the goal is direct GenAI RAG grounding from S3 with vector DB, pick Knowledge Bases!'
  },
  {
    id: 'guardrails-vs-clarify',
    category: 'Responsible AI',
    serviceA: 'Amazon Bedrock Guardrails',
    serviceB: 'Amazon SageMaker Clarify',
    coreDistinction: 'Guardrails enforces real-time runtime safety filters (PII masking, toxic topic blocking, hallucination checks) on GenAI prompts/responses; Clarify evaluates bias and explainability (SHAP) across the ML lifecycle.',
    whenToChooseA: 'You need live runtime protection to mask SSNs/credit cards, block competitive topics, and filter toxic prompts in Amazon Bedrock applications.',
    whenToChooseB: 'You need to detect training data imbalance (pre-training bias), check model prediction disparate impact (post-training bias), or compute SHAP values for model explainability.',
    examTriggerA: ['Runtime content filtering', 'Redact PII (anonymize/mask)', 'Blocked topics', 'Word filters', 'Contextual grounding check'],
    examTriggerB: ['Detect dataset bias', 'Pre-training / Post-training bias metrics', 'Explainability', 'SHAP feature attribution', 'Fairness audit'],
    trapWarning: 'Guardrails is RUNTIME GenAI content filtering. Clarify is ANALYTICAL bias and explainability measurement for ML models.'
  },
  {
    id: 'comprehend-vs-textract-vs-rekognition',
    category: 'Perception & NLP',
    serviceA: 'Amazon Comprehend',
    serviceB: 'Amazon Textract',
    coreDistinction: 'Comprehend analyzes unstructured text for meaning, sentiment, entities, and PII; Textract extracts text, forms, and tabular key-value pairs from scanned PDFs and image documents.',
    whenToChooseA: 'You already have text strings and want to detect sentiment, syntax, language, key phrases, or redact PII entities (names, phone numbers).',
    whenToChooseB: 'You have scanned images, PDF forms, invoices, or passports and need OCR that preserves table structures and key-value form fields.',
    examTriggerA: ['Sentiment analysis', 'Entity recognition', 'Topic modeling', 'PII redaction in raw text strings'],
    examTriggerB: ['Extract tables from PDF', 'Scanned loan application', 'Key-value pairs', 'Form extraction', 'OCR'],
    trapWarning: 'If you need to analyze customer sentiment on scanned receipts: FIRST use Textract to get text, THEN Comprehend to analyze sentiment!'
  },
  {
    id: 'transcribe-vs-polly',
    category: 'Perception & NLP',
    serviceA: 'Amazon Transcribe',
    serviceB: 'Amazon Polly',
    coreDistinction: 'Transcribe converts Speech (audio) into Text (STT); Polly converts Text into lifelike Speech (TTS).',
    whenToChooseA: 'Transcribing call center audio recordings into written text for customer support analysis.',
    whenToChooseB: 'Giving a mobile app or chatbot a natural speaking voice to read articles aloud to users.',
    examTriggerA: ['Audio to text', 'Speech recognition', 'Call center transcription', 'Subtitles/closed captions'],
    examTriggerB: ['Text to speech', 'Lifelike synthesized voice', 'SSML', 'Read aloud'],
    trapWarning: 'Remember: Transcribe = "Transcribe audio into notes" (Audio -> Text). Polly = "Polly wants a cracker" (Parrot talks -> Text to Voice).'
  },
  {
    id: 'q-business-vs-q-developer',
    category: 'Enterprise Assistants',
    serviceA: 'Amazon Q Business',
    serviceB: 'Amazon Q Developer',
    coreDistinction: 'Q Business is a generative AI assistant for enterprise knowledge workers connected to company files; Q Developer is an AI coding assistant inside IDEs and AWS console.',
    whenToChooseA: 'Employees want to ask business questions grounded across company documents, wikis, Salesforce, and HR portals.',
    whenToChooseB: 'Software engineers want inline code completions, automated test generation, code security scans, and code translation (e.g. Java upgrades).',
    examTriggerA: ['Enterprise knowledge assistant', 'Connect to enterprise data sources', 'Business user chat', 'Role-based access controls for files'],
    examTriggerB: ['Coding assistant', 'IDE integration', 'Code completion', 'Code transformation', 'Security vulnerability scanning'],
    trapWarning: 'Amazon Q Developer was formerly known as Amazon CodeWhisperer.'
  },
  {
    id: 'model-cards-vs-model-dashboard-vs-registry',
    category: 'Responsible AI',
    serviceA: 'SageMaker Model Cards',
    serviceB: 'SageMaker Model Dashboard',
    coreDistinction: 'Model Cards document static model metadata, intended usage, and training details for governance; Model Dashboard monitors all deployed models in real-time for drift and performance drops.',
    whenToChooseA: 'You need a standardized single source of truth documenting a model\'s intended purpose, limitations, risk assessment, and training history for auditing.',
    whenToChooseB: 'You need an operational console tracking all live production endpoints, alerting when data quality drifts or model accuracy degrades over time.',
    examTriggerA: ['Documentation', 'Intended use & limitations', 'Auditing & compliance report', 'Factual model details'],
    examTriggerB: ['Unified operational overview', 'Track live model endpoints', 'Alert on data drift & model drift', 'Model Monitor integration'],
    trapWarning: 'Model Cards = Documentation / Factsheet. Model Dashboard = Live Monitoring / Ops Cockpit. Model Registry = Version control & approval catalog for deployment.'
  },
  {
    id: 'prompt-vs-rag-vs-finetuning',
    category: 'GenAI vs ML Platform',
    serviceA: 'RAG (Retrieval-Augmented Generation)',
    serviceB: 'Fine-Tuning',
    coreDistinction: 'RAG provides fresh external knowledge at query time without changing model weights; Fine-Tuning updates model weights on labeled domain examples to learn specialized style, tone, or task formats.',
    whenToChooseA: 'Data changes frequently (daily product catalog, internal policies) and you need verifiable citations with zero model retraining.',
    whenToChooseB: 'You have a stable task requiring a specific formatting style (e.g., generating medical discharge summaries in specific clinical jargon) with thousands of labeled prompt-response pairs.',
    examTriggerA: ['Dynamic knowledge', 'Frequent updates', 'Source citations', 'Low cost', 'No model weight modification'],
    examTriggerB: ['Domain-specific terminology', 'Specialized output format', 'Consistent tone/style', 'Labeled prompt-completion pairs', 'Updates model weights'],
    trapWarning: 'Fine-tuning is NOT recommended just to add new factual knowledge because of hallucination risks and high retraining costs; use RAG for facts!'
  },
  {
    id: 'precision-vs-recall',
    category: 'ML Metrics',
    serviceA: 'Recall (Sensitivity)',
    serviceB: 'Precision',
    coreDistinction: 'Recall minimizes False Negatives (avoiding missing positive cases); Precision minimizes False Positives (avoiding false alarms).',
    whenToChooseA: 'High cost of missing a positive: Cancer detection, fraud detection, safety hazards (better to raise a false alarm than miss a real case).',
    whenToChooseB: 'High cost of a false alarm: Email spam filter (don\'t want valid emails in spam), YouTube video recommendations (don\'t show unwanted content).',
    examTriggerA: ['False negatives are costly', 'Minimize missed cases', 'Medical diagnosis', 'Fraud alert'],
    examTriggerB: ['False positives are costly', 'Minimize false alarms', 'Spam filtering', 'Quality of positive predictions'],
    trapWarning: 'F1-Score is the harmonic mean of Precision and Recall, best when you need a balance on imbalanced datasets.'
  },
  {
    id: 'overfitting-vs-underfitting',
    category: 'ML Metrics',
    serviceA: 'Overfitting (High Variance)',
    serviceB: 'Underfitting (High Bias)',
    coreDistinction: 'Overfitting occurs when a model memorizes training noise and fails on unseen test data; Underfitting occurs when a model is too simple to capture patterns even on training data.',
    whenToChooseA: 'Symptoms: High training accuracy, low validation/test accuracy. Solutions: Regularization (L1/L2), Dropout, Pruning, More training data, Simpler model.',
    whenToChooseB: 'Symptoms: Low training accuracy AND low test accuracy. Solutions: Increase model complexity, Add more features, Train longer, Reduce regularization.',
    examTriggerA: ['High variance', 'Memorizes training data', 'High train score, low test score', 'Fix with dropout / regularization / data augmentation'],
    examTriggerB: ['High bias', 'Model is too simple', 'Low train score, low test score', 'Fix with more complex model / feature engineering'],
    trapWarning: 'Overfitting = High Variance. Underfitting = High Bias. Remember: "Variance is Vexing on Validation".'
  }
];
