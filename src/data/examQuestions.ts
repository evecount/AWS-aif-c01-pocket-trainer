import { Question } from '../types';

export const EXAM_QUESTIONS: Question[] = [
  // --- DOMAIN: GenAI & Bedrock ---
  {
    id: 'genai-1',
    domain: 'GenAI & Bedrock',
    subtopic: 'RAG vs Fine-Tuning',
    scenario: 'A company wants a Bedrock chatbot to answer employee questions about rapidly changing internal HR policies stored in Amazon S3, with source citations. Which approach requires the LEAST operational overhead?',
    options: {
      A: 'Continuously fine-tune a foundation model on new policy documents each week',
      B: 'Implement Knowledge Bases for Amazon Bedrock connected to the S3 bucket',
      C: 'Deploy an open-source LLM on Amazon EC2 with custom embedding scripts',
      D: 'Pre-train a proprietary foundation model from scratch using SageMaker HyperPod'
    },
    correctAnswer: 'B',
    explanation: 'Knowledge Bases for Amazon Bedrock automates the end-to-end RAG workflow (chunking, embedding, vector storage, and query retrieval) with zero model retraining.',
    distractorBreakdown: {
      A: 'Fine-tuning is expensive, takes time, alters model weights, and does not provide verifiable real-time citations.',
      C: 'Deploying on EC2 creates heavy operational overhead for server management, scaling, and maintenance.',
      D: 'Pre-training from scratch costs millions of dollars and is completely unnecessary for dynamic document retrieval.'
    },
    confusingProductNote: 'Knowledge Bases for Bedrock is the managed serverless RAG solution on AWS.',
    examTip: 'Whenever the exam mentions "dynamic/rapidly changing data" + "source citations" + "least overhead", the answer is RAG / Knowledge Bases for Bedrock.'
  },
  {
    id: 'genai-2',
    domain: 'GenAI & Bedrock',
    subtopic: 'Inference Parameters',
    scenario: 'A healthcare application requires an Amazon Bedrock foundation model to generate highly predictable, factual summaries with minimum creativity or randomness. Which parameter adjustment should you make?',
    options: {
      A: 'Set Temperature to 0.0 or near zero and reduce Top-P',
      B: 'Increase Temperature to 1.0 and maximize Top-K',
      C: 'Increase Top-P to 0.99 to widen token candidate sampling',
      D: 'Set Max Generation Tokens to 0'
    },
    correctAnswer: 'A',
    explanation: 'Lowering Temperature (towards 0) and Top-P makes token selection deterministic and greedy, resulting in factual, repeatable outputs with minimal randomness.',
    distractorBreakdown: {
      B: 'High temperature increases creative randomness and likelihood of hallucinations.',
      C: 'High Top-P samples from a wider cumulative probability distribution, increasing variability.',
      D: 'Setting max tokens to 0 would prevent the model from generating any text.'
    },
    confusingProductNote: 'Temperature controls randomness; Top-P controls the cumulative probability pool of candidate tokens.',
    examTip: 'High Temperature = Creative (poetry, brainstorming). Low Temperature (0 to 0.2) = Factual, analytical, code generation.'
  },
  {
    id: 'genai-3',
    domain: 'GenAI & Bedrock',
    subtopic: 'Bedrock vs SageMaker JumpStart',
    scenario: 'A startup wants to use foundation models via a serverless API without provisioning or managing any EC2 instances or endpoints. Which AWS service should they choose?',
    options: {
      A: 'Amazon SageMaker JumpStart',
      B: 'Amazon Bedrock',
      C: 'Amazon SageMaker Studio',
      D: 'AWS Deep Learning AMIs'
    },
    correctAnswer: 'B',
    explanation: 'Amazon Bedrock provides fully managed, serverless API access to top foundation models without provisioning any infrastructure or endpoints.',
    distractorBreakdown: {
      A: 'SageMaker JumpStart requires deploying models to dedicated SageMaker hosting instances (e.g. ml.g5 instances).',
      C: 'SageMaker Studio is a web-based IDE for building and training custom ML models.',
      D: 'Deep Learning AMIs provide customized EC2 virtual machine images, requiring full server management.'
    },
    confusingProductNote: 'Bedrock = Serverless API (pay-per-token). JumpStart = Dedicated SageMaker compute instances.'
  },
  {
    id: 'genai-4',
    domain: 'GenAI & Bedrock',
    subtopic: 'Bedrock Agents',
    scenario: 'An insurance company needs a generative AI system that can understand a customer claim, query an internal claims database via API, and trigger an automated email refund. Which Bedrock feature provides this?',
    options: {
      A: 'Amazon Bedrock Guardrails',
      B: 'Agents for Amazon Bedrock',
      C: 'Amazon Bedrock Model Evaluation',
      D: 'Amazon Titan Image Generator'
    },
    correctAnswer: 'B',
    explanation: 'Agents for Amazon Bedrock break down multi-step user tasks, orchestrate API calls through Action Groups (AWS Lambda), and access Knowledge Bases to fulfill requests autonomously.',
    distractorBreakdown: {
      A: 'Guardrails filters toxic content and masks PII, but does not orchestrate multi-step API workflows.',
      C: 'Model Evaluation compares model outputs using automated metrics or human reviewers.',
      D: 'Titan Image Generator produces images from text prompts.'
    },
    confusingProductNote: 'Agents = Orchestration + Tool Calling (Lambda functions) for multi-step reasoning.'
  },
  {
    id: 'genai-5',
    domain: 'GenAI & Bedrock',
    subtopic: 'Data Privacy in Bedrock',
    scenario: 'A bank wants to invoke Claude 3 through Amazon Bedrock. The compliance officer asks whether the prompts and responses will be used by AWS or Anthropic to retrain the foundation models.',
    options: {
      A: 'Yes, prompts are logged by default into a shared public repository for fine-tuning',
      B: 'Yes, but only after 90 days of anonymization',
      C: 'No, Amazon Bedrock does not use customer prompts or completions to train any base models',
      D: 'Prompts are used to train Titan models, but not third-party models'
    },
    correctAnswer: 'C',
    explanation: 'Amazon Bedrock ensures complete data privacy: customer data (prompts and completions) is never used to train or improve base foundation models, nor shared with third-party model providers.',
    distractorBreakdown: {
      A: 'Bedrock never shares customer prompts to public pools.',
      B: 'No training occurs at all, regardless of timeframe.',
      D: 'Neither Titan nor third-party models are trained on customer inference data.'
    },
    examTip: 'Huge exam point: In Bedrock, your data is NOT used to train base models. Data remains encrypted in your VPC/region.'
  },
  {
    id: 'genai-6',
    domain: 'GenAI & Bedrock',
    subtopic: 'Prompt Engineering vs Fine-Tuning',
    scenario: 'A company wants an LLM to generate customer support responses strictly adhering to a standard corporate greeting and formatting structure. They have 3,000 labeled prompt-response pairs. Which customization method is best suited?',
    options: {
      A: 'Zero-shot prompt engineering',
      B: 'Fine-tuning the foundation model',
      C: 'Pre-training a foundation model',
      D: 'Using Amazon Kendra search'
    },
    correctAnswer: 'B',
    explanation: 'Fine-tuning modifies the weights of a foundation model using labeled prompt-completion pairs to adapt its style, tone, and specific domain format.',
    distractorBreakdown: {
      A: 'Zero-shot provides no examples and cannot reliably ensure strict compliance with a proprietary response format.',
      C: 'Pre-training is for creating a model from scratch with billions of raw tokens, not adapting style.',
      D: 'Amazon Kendra is an enterprise search engine, not a model customization technique.'
    },
    examTip: 'Style/Tone/Formatting with labeled dataset = Fine-tuning. Fresh facts/documentation = RAG.'
  },
  {
    id: 'genai-7',
    domain: 'GenAI & Bedrock',
    subtopic: 'Bedrock Model Evaluation',
    scenario: 'A data science team needs to evaluate three candidate foundation models in Bedrock for factual accuracy, robustness, and toxicity using both automated benchmarks and internal subject-matter expert reviews. Which tool should they use?',
    options: {
      A: 'Amazon Bedrock Model Evaluation',
      B: 'Amazon CloudWatch Synthetics',
      C: 'Amazon Inspector',
      D: 'AWS Trusted Advisor'
    },
    correctAnswer: 'A',
    explanation: 'Amazon Bedrock Model Evaluation supports both automated evaluation (using built-in datasets for metrics like ROUGE/BLEU) and human evaluation with internal teams or AWS Ground Truth.',
    distractorBreakdown: {
      B: 'CloudWatch Synthetics tests API endpoint availability and latency, not model quality or toxicity.',
      C: 'Amazon Inspector scans for software vulnerabilities and network exposure in EC2/ECR.',
      D: 'AWS Trusted Advisor provides general cost, performance, and security best practices.'
    }
  },
  {
    id: 'genai-8',
    domain: 'GenAI & Bedrock',
    subtopic: 'Vector Databases in RAG',
    scenario: 'When building a RAG application using Amazon Bedrock Knowledge Bases, which AWS service is commonly configured as the vector store to store and index text embeddings?',
    options: {
      A: 'Amazon OpenSearch Serverless (vector search collection)',
      B: 'Amazon DynamoDB with standard primary keys',
      C: 'Amazon Glacier Vault',
      D: 'Amazon Simple Queue Service (SQS)'
    },
    correctAnswer: 'A',
    explanation: 'Amazon OpenSearch Serverless with vector engine is the default native vector database integrated into Amazon Bedrock Knowledge Bases for storing and querying embeddings.',
    distractorBreakdown: {
      B: 'Standard DynamoDB lacks native high-dimensional approximate nearest neighbor (ANN) vector search indexes.',
      C: 'Amazon Glacier is for cold archival storage, not low-latency vector similarity retrieval.',
      D: 'SQS is a message queuing service.'
    }
  },

  // --- DOMAIN: Responsible AI ---
  {
    id: 'resp-1',
    domain: 'Responsible AI',
    subtopic: 'Bedrock Guardrails',
    scenario: 'A retail company is deploying a customer-facing Bedrock application. They must ensure Social Security Numbers and Credit Card numbers are automatically masked in conversations and competitor mentions are blocked. What should they use?',
    options: {
      A: 'Amazon SageMaker Clarify',
      B: 'Amazon Bedrock Guardrails',
      C: 'Amazon Rekognition custom labels',
      D: 'AWS WAF rate limiting'
    },
    correctAnswer: 'B',
    explanation: 'Amazon Bedrock Guardrails evaluates user inputs and model responses in real-time to block harmful topics, filter profanity, mask sensitive PII (like SSNs/credit cards), and check grounding.',
    distractorBreakdown: {
      A: 'SageMaker Clarify is an offline/lifecycle bias detection and explainability tool, not a real-time prompt filter for Bedrock.',
      C: 'Rekognition is a computer vision image/video analysis service.',
      D: 'AWS WAF protects web applications from network layer attacks and SQL injection, not semantic PII/topic filtering.'
    },
    confusingProductNote: 'Guardrails = Real-time GenAI safety & PII filter. Clarify = ML bias & explainability metrics.'
  },
  {
    id: 'resp-2',
    domain: 'Responsible AI',
    subtopic: 'SageMaker Clarify - Bias Detection',
    scenario: 'Before training a loan approval classification model, a bank wants to verify that historical training data does not contain demographic bias against protected groups. Which tool provides this analysis?',
    options: {
      A: 'Amazon Bedrock Guardrails',
      B: 'Amazon SageMaker Clarify',
      C: 'AWS CloudTrail',
      D: 'Amazon GuardDuty'
    },
    correctAnswer: 'B',
    explanation: 'Amazon SageMaker Clarify analyzes pre-training data for bias (such as Class Imbalance or Difference in Proportions of Labels) and post-training predictions for disparate impact.',
    distractorBreakdown: {
      A: 'Guardrails is for runtime filtering of Generative AI text prompts in Bedrock, not tabular ML training data bias.',
      C: 'CloudTrail audits AWS management API calls.',
      D: 'GuardDuty detects malicious activity and unauthorized behavior in AWS accounts.'
    },
    examTip: 'Pre-training bias (training data distribution) + Post-training bias (prediction fairness) = SageMaker Clarify.'
  },
  {
    id: 'resp-3',
    domain: 'Responsible AI',
    subtopic: 'Explainability & SHAP',
    scenario: 'A credit scoring agency needs to explain to customers why their loan application was denied by showing the relative contribution of each feature (income, credit score, debt). Which technique does SageMaker Clarify use?',
    options: {
      A: 'SHAP (Shapley Additive exPlanations)',
      B: 'K-Means clustering centroids',
      C: 'Monte Carlo dropout simulation',
      D: 'Stochastic Gradient Descent loss mapping'
    },
    correctAnswer: 'A',
    explanation: 'SageMaker Clarify uses SHAP (Shapley Additive exPlanations) values from cooperative game theory to measure each feature\'s positive or negative contribution to an individual prediction.',
    distractorBreakdown: {
      B: 'K-Means is an unsupervised clustering algorithm, not an explainability method.',
      C: 'Monte Carlo dropout is used for uncertainty estimation in deep neural networks.',
      D: 'SGD is an optimization algorithm used during model training to minimize loss.'
    },
    examTip: 'Whenever you see "Feature attribution" or "Explainability" on the AIF-C01 exam, think SHAP values.'
  },
  {
    id: 'resp-4',
    domain: 'Responsible AI',
    subtopic: 'SageMaker Model Cards',
    scenario: 'An auditor requires documentation detailing an AI model\'s intended use, performance evaluation metrics, ethical considerations, and known limitations in a centralized governance document. What should you create?',
    options: {
      A: 'Amazon SageMaker Model Card',
      B: 'Amazon SageMaker Model Dashboard',
      C: 'AWS Systems Manager Parameter Store',
      D: 'Amazon CloudWatch Dashboard'
    },
    correctAnswer: 'A',
    explanation: 'Amazon SageMaker Model Cards provide standardized, factual documentation of an ML model\'s intended purpose, limitations, risk rating, training details, and evaluation metrics.',
    distractorBreakdown: {
      B: 'SageMaker Model Dashboard is for operational monitoring of live deployed endpoints (tracking drift/health), not static governance documentation.',
      C: 'Parameter Store stores configuration values and secrets.',
      D: 'CloudWatch Dashboard displays operational metric time-series graphs.'
    },
    confusingProductNote: 'Model Cards = Documentation & Governance Factsheet. Model Dashboard = Live Endpoint Health & Drift Monitoring.'
  },
  {
    id: 'resp-5',
    domain: 'Responsible AI',
    subtopic: 'Responsible AI Pillars',
    scenario: 'Which of the following is considered a foundational pillar of Responsible AI when deploying machine learning systems in high-stakes domains like healthcare?',
    options: {
      A: 'Maximizing model parameter size at any cost',
      B: 'Transparency, fairness, explainability, and privacy',
      C: 'Exclusively using black-box proprietary deep learning models',
      D: 'Disabling logging to avoid data storage expenses'
    },
    correctAnswer: 'B',
    explanation: 'Core pillars of Responsible AI include fairness (mitigating bias), explainability/transparency, privacy/data protection, robustness, and safety.',
    distractorBreakdown: {
      A: 'Bigger models do not guarantee safety or fairness.',
      C: 'Black-box models without explainability fail compliance in healthcare and finance.',
      D: 'Logging and auditability are essential for governance.'
    }
  },
  {
    id: 'resp-6',
    domain: 'Responsible AI',
    subtopic: 'Hallucination Mitigation',
    scenario: 'A company notices their generative AI application is inventing plausible-sounding but factually false claims about their product warranty. What is this phenomenon called and how can it be mitigated?',
    options: {
      A: 'Overfitting; mitigate by training for more epochs',
      B: 'Data drift; mitigate by clearing the S3 bucket',
      C: 'Hallucination; mitigate by using Grounding / RAG with authoritative documents and setting low temperature',
      D: 'Catastrophic forgetting; mitigate by increasing the learning rate'
    },
    correctAnswer: 'C',
    explanation: 'Hallucinations occur when an LLM generates inaccurate information with high confidence; grounding responses via RAG with source verification and lowering temperature mitigates this.',
    distractorBreakdown: {
      A: 'Training for more epochs on bad data exacerbates memorization, not factual grounding.',
      B: 'Clearing the data source eliminates the very knowledge needed.',
      D: 'Catastrophic forgetting happens when fine-tuning overwrites old skills, unrelated to general generation inaccuracy.'
    }
  },

  // --- DOMAIN: Traditional ML Fundamentals ---
  {
    id: 'trad-1',
    domain: 'Traditional ML',
    subtopic: 'Overfitting vs Underfitting',
    scenario: 'An ML engineer trains a model that achieves 99% accuracy on the training dataset, but drops to 62% accuracy on the validation and test datasets. What is the issue and how should it be addressed?',
    options: {
      A: 'Underfitting (high bias); address by increasing model complexity',
      B: 'Overfitting (high variance); address by adding regularization, dropout, or collecting more data',
      C: 'Data leakage; address by duplicating the training data',
      D: 'Class imbalance; address by setting the learning rate to zero'
    },
    correctAnswer: 'B',
    explanation: 'High training score combined with poor test score is the classic signature of overfitting (high variance); it is mitigated with L1/L2 regularization, dropout, pruning, and data augmentation.',
    distractorBreakdown: {
      A: 'Underfitting means poor performance on BOTH training and testing data due to high bias.',
      C: 'Duplicating training data reinforces overfitting rather than solving it.',
      D: 'Setting the learning rate to zero stops model learning entirely.'
    },
    examTip: 'High Train + Low Test = Overfitting (High Variance). Low Train + Low Test = Underfitting (High Bias).'
  },
  {
    id: 'trad-2',
    domain: 'Traditional ML',
    subtopic: 'Classification Metrics - Precision vs Recall',
    scenario: 'An AI model is being developed to detect malignant tumors in medical scans. Missing a cancer case (False Negative) has fatal consequences, whereas a false alarm can be resolved with a follow-up biopsy. Which metric should be prioritized?',
    options: {
      A: 'Precision',
      B: 'Recall (Sensitivity)',
      C: 'Specificity only',
      D: 'Mean Absolute Error (MAE)'
    },
    correctAnswer: 'B',
    explanation: 'Recall measures the proportion of actual positives correctly identified; when False Negatives carry catastrophic consequences, Recall must be maximized.',
    distractorBreakdown: {
      A: 'Precision minimizes False Positives (useful for spam filters, but dangerous when missing a cancer case).',
      C: 'Specificity measures true negative rate, not the detection of positive tumor cases.',
      D: 'MAE is an evaluation metric for regression problems, not classification.'
    },
    examTip: 'Cancer / Fraud / Safety alarms: Maximize RECALL. Spam filter / Video recommendations: Maximize PRECISION.'
  },
  {
    id: 'trad-3',
    domain: 'Traditional ML',
    subtopic: 'Classification Metrics - F1 Score',
    scenario: 'A fraud detection dataset contains 99.8% legitimate transactions and 0.2% fraudulent transactions. The business reports 99.8% accuracy simply by classifying every transaction as legitimate. Why is accuracy misleading here, and what metric should be used?',
    options: {
      A: 'Accuracy is skewed by severe class imbalance; use F1-Score or Precision-Recall AUC instead',
      B: 'Accuracy is never misleading; the model is production ready',
      C: 'Use Mean Squared Error (MSE) because fraud is always continuous',
      D: 'Accuracy only works on unlabelled datasets'
    },
    correctAnswer: 'A',
    explanation: 'With severe class imbalance, accuracy is distorted by the majority class; the F1-Score (harmonic mean of Precision and Recall) accurately evaluates performance on the minority positive class.',
    distractorBreakdown: {
      B: 'A model that flags 0 fraud cases has zero utility despite 99.8% naive accuracy.',
      C: 'MSE is for regression, not binary classification.',
      D: 'Accuracy requires labeled ground truth.'
    },
    confusingProductNote: 'Harmonic mean: 2 * (Precision * Recall) / (Precision + Recall).'
  },
  {
    id: 'trad-4',
    domain: 'Traditional ML',
    subtopic: 'Data Splits',
    scenario: 'Why is a machine learning dataset typically divided into Training, Validation, and Test sets rather than just Training and Test?',
    options: {
      A: 'To allow training on three different AWS regions simultaneously',
      B: 'The validation set is used for hyperparameter tuning and model selection without biasing the final test evaluation',
      C: 'The validation set is reserved for end-user customer testing in production',
      D: 'AWS SageMaker requires three datasets to allocate GPU instances'
    },
    correctAnswer: 'B',
    explanation: 'The validation set evaluates models during hyperparameter tuning, preventing data leakage so the final test set remains an unbiased benchmark of real-world generalization.',
    distractorBreakdown: {
      A: 'Data splits have nothing to do with geographic AWS regions.',
      C: 'Validation sets are part of development, not live production beta testing.',
      D: 'SageMaker does not mandate three sets as a GPU hardware requirement.'
    }
  },
  {
    id: 'trad-5',
    domain: 'Traditional ML',
    subtopic: 'Supervised vs Unsupervised Learning',
    scenario: 'A marketing team wants to segment their existing customer base into distinct demographic clusters based on purchase history, but they do NOT have pre-existing segment labels. Which learning type should they use?',
    options: {
      A: 'Supervised Learning with Linear Regression',
      B: 'Unsupervised Learning with K-Means Clustering',
      C: 'Reinforcement Learning with PPO',
      D: 'Supervised Binary Classification'
    },
    correctAnswer: 'B',
    explanation: 'Unsupervised learning algorithms (like K-Means) discover natural groupings and latent structures in data without requiring pre-assigned target labels.',
    distractorBreakdown: {
      A: 'Linear regression predicts continuous numeric values from labeled training pairs.',
      C: 'Reinforcement learning optimizes an agent\'s actions via reward signals in an environment.',
      D: 'Supervised classification strictly requires known ground-truth labels.'
    },
    examTip: 'Unlabeled data = Unsupervised learning (Clustering, PCA, Anomaly detection).'
  },
  {
    id: 'trad-6',
    domain: 'Traditional ML',
    subtopic: 'Decision Trees & Ensembles',
    scenario: 'Which characteristic is a primary advantage of a single Decision Tree model over a Deep Neural Network in heavily regulated industries?',
    options: {
      A: 'Higher parameter capacity than large language models',
      B: 'High interpretability and transparent if-then decision rules',
      C: 'Immunity to overfitting regardless of tree depth',
      D: 'Zero memory footprint during inference'
    },
    correctAnswer: 'B',
    explanation: 'Decision trees offer clear, transparent, human-readable decision boundaries (if-then splits), making them easily explainable for compliance audits.',
    distractorBreakdown: {
      A: 'Decision trees have far fewer parameters than deep neural networks.',
      C: 'Unconstrained deep decision trees are notorious for severe overfitting.',
      D: 'Decision trees still require memory to store nodes and thresholds.'
    }
  },
  {
    id: 'trad-7',
    domain: 'Traditional ML',
    subtopic: 'Feature Engineering',
    scenario: 'You have a tabular dataset with a categorical column named "DeviceType" containing three values: "Mobile", "Tablet", and "Desktop". What is the standard preprocessing step before feeding this into a logistic regression model?',
    options: {
      A: 'One-Hot Encoding into binary columns',
      B: 'Min-Max feature scaling between 0 and 1',
      C: 'PCA dimensionality reduction',
      D: 'Data augmentation with random noise'
    },
    correctAnswer: 'A',
    explanation: 'One-hot encoding converts nominal categorical variables into discrete binary (0/1) indicator columns so algorithms can process them without assuming an arbitrary numerical order.',
    distractorBreakdown: {
      B: 'Min-Max scaling is applied to continuous numeric features, not categorical strings.',
      C: 'PCA is for continuous dimensionality reduction.',
      D: 'Data augmentation with noise is for images/audio, not categorical device labels.'
    }
  },

  // --- DOMAIN: AWS AI Services (Confusion Killers) ---
  {
    id: 'serv-1',
    domain: 'AWS AI Services',
    subtopic: 'Comprehend vs Textract',
    scenario: 'A company receives thousands of scanned PDF mortgage applications and needs to extract the borrower\'s name, address, and income table from the forms. Which AWS service should they use?',
    options: {
      A: 'Amazon Comprehend',
      B: 'Amazon Textract',
      C: 'Amazon Polly',
      D: 'Amazon Rekognition'
    },
    correctAnswer: 'B',
    explanation: 'Amazon Textract uses machine learning to automatically extract text, handwriting, forms, and structured table data from scanned documents and PDFs.',
    distractorBreakdown: {
      A: 'Comprehend analyzes existing digital text for sentiment/entities, but cannot extract tables or text from scanned image PDFs.',
      C: 'Polly converts text into speech audio.',
      D: 'Rekognition analyzes general images/videos for object labels, celebrities, and moderation, not structured PDF forms.'
    },
    confusingProductNote: 'Textract = Extract text & tables from documents/PDFs. Comprehend = Understand sentiment & entities in text.'
  },
  {
    id: 'serv-2',
    domain: 'AWS AI Services',
    subtopic: 'Comprehend PII Detection',
    scenario: 'A company has customer email text and wants to automatically detect and redact names, phone numbers, and email addresses to comply with privacy laws before saving the text to S3. Which AWS service should they call?',
    options: {
      A: 'Amazon Comprehend PII detection and redaction',
      B: 'Amazon Transcribe',
      C: 'Amazon Kendra',
      D: 'AWS Glue DataBrew'
    },
    correctAnswer: 'A',
    explanation: 'Amazon Comprehend includes built-in PII detection and redaction APIs to automatically identify and mask personally identifiable information in unstructured text.',
    distractorBreakdown: {
      B: 'Transcribe converts speech audio to text.',
      C: 'Kendra is an intelligent search engine.',
      D: 'Glue DataBrew is a visual data preparation tool, not a pre-trained NLP PII detection service.'
    }
  },
  {
    id: 'serv-3',
    domain: 'AWS AI Services',
    subtopic: 'Transcribe vs Polly',
    scenario: 'A travel app needs to read turn-by-turn driving directions out loud to drivers in a natural-sounding voice. Which AWS service should generate the audio?',
    options: {
      A: 'Amazon Transcribe',
      B: 'Amazon Polly',
      C: 'Amazon Lex',
      D: 'AWS HealthScribe'
    },
    correctAnswer: 'B',
    explanation: 'Amazon Polly turns text into lifelike speech using advanced deep learning technologies (Text-to-Speech / TTS).',
    distractorBreakdown: {
      A: 'Transcribe does the opposite: it converts speech audio into text (Speech-to-Text).',
      C: 'Lex builds conversational chatbot interfaces (voice/text intents).',
      D: 'HealthScribe generates clinical notes from doctor-patient audio.'
    },
    confusingProductNote: 'Polly reads aloud (TTS). Transcribe listens and writes notes (STT).'
  },
  {
    id: 'serv-4',
    domain: 'AWS AI Services',
    subtopic: 'Amazon Rekognition',
    scenario: 'A social media platform wants to automatically flag and blur user-uploaded photos containing violence, explicit nudity, or hate symbols. Which service provides this out of the box?',
    options: {
      A: 'Amazon Rekognition Content Moderation',
      B: 'Amazon Comprehend',
      C: 'Amazon Textract',
      D: 'Amazon Forecast'
    },
    correctAnswer: 'A',
    explanation: 'Amazon Rekognition Content Moderation automatically detects inappropriate, unwanted, or unsafe visual content in images and stored or streaming videos.',
    distractorBreakdown: {
      B: 'Comprehend analyzes text, not photos/videos.',
      C: 'Textract extracts text and tables from document images.',
      D: 'Forecast predicts future numerical time-series values like retail inventory.'
    }
  },
  {
    id: 'serv-5',
    domain: 'AWS AI Services',
    subtopic: 'Amazon Kendra vs Knowledge Bases',
    scenario: 'An enterprise wants to deploy a search bar for its employees that connects out of the box to Microsoft SharePoint, Salesforce, and ServiceNow to return precise answers to employee questions. Which service is built for this?',
    options: {
      A: 'Amazon Kendra',
      B: 'Amazon S3 Glacier',
      C: 'AWS CodeCommit',
      D: 'Amazon EventBridge'
    },
    correctAnswer: 'A',
    explanation: 'Amazon Kendra is an intelligent enterprise search service with pre-built SaaS connectors (SharePoint, Salesforce) that uses natural language processing to answer employee search queries.',
    distractorBreakdown: {
      B: 'Glacier is for long-term data archiving.',
      C: 'CodeCommit is a Git version control service.',
      D: 'EventBridge is an event bus for routing system events.'
    }
  },
  {
    id: 'serv-6',
    domain: 'AWS AI Services',
    subtopic: 'Amazon Q Business vs Q Developer',
    scenario: 'A software development team wants real-time code recommendations inside Visual Studio Code and automated security scans for vulnerabilities in their Python repositories. Which service should they install?',
    options: {
      A: 'Amazon Q Developer (formerly CodeWhisperer)',
      B: 'Amazon Q Business',
      C: 'Amazon Lex',
      D: 'Amazon Comprehend Medical'
    },
    correctAnswer: 'A',
    explanation: 'Amazon Q Developer is an AI-powered coding assistant that provides inline code suggestions, vulnerability detection, and code transformations directly in the IDE.',
    distractorBreakdown: {
      B: 'Amazon Q Business is an assistant for enterprise business users to chat with corporate documents, not an IDE coding assistant.',
      C: 'Lex creates conversational voice and text bots.',
      D: 'Comprehend Medical extracts medical entities from healthcare notes.'
    },
    confusingProductNote: 'Q Developer = Code in IDE. Q Business = Enterprise document search & chat for employees.'
  },
  {
    id: 'serv-7',
    domain: 'AWS AI Services',
    subtopic: 'Personalize vs Forecast',
    scenario: 'An e-commerce store wants to display a personalized "Recommended For You" carousel of products on each user\'s home screen based on their past browsing and purchase history. Which service should they integrate?',
    options: {
      A: 'Amazon Forecast',
      B: 'Amazon Personalize',
      C: 'Amazon Fraud Detector',
      D: 'Amazon QuickSight'
    },
    correctAnswer: 'B',
    explanation: 'Amazon Personalize delivers real-time individualized product recommendations, personalized ranking, and customized search results based on machine learning.',
    distractorBreakdown: {
      A: 'Amazon Forecast predicts future aggregate numbers over time (e.g., store inventory demand next month), not per-user item carousels.',
      C: 'Fraud Detector identifies suspicious online activities like fake account creation.',
      D: 'QuickSight is a business intelligence dashboard tool.'
    },
    confusingProductNote: 'Personalize = User recommendations. Forecast = Time-series demand forecasting.'
  },

  // --- DOMAIN: Security & Governance ---
  {
    id: 'sec-1',
    domain: 'Security & Governance',
    subtopic: 'VPC Endpoints & Bedrock',
    scenario: 'A financial institution must invoke Amazon Bedrock API endpoints without traffic ever traversing the public internet. Which AWS networking feature satisfies this requirement?',
    options: {
      A: 'AWS Direct Connect with a Public VIF',
      B: 'AWS PrivateLink (VPC Interface Endpoint)',
      C: 'Internet Gateway attached to a Public Subnet',
      D: 'NAT Gateway with an Elastic IP'
    },
    correctAnswer: 'B',
    explanation: 'AWS PrivateLink allows private connectivity between your VPC and supported AWS services (like Amazon Bedrock) via private IP addresses without crossing the public internet.',
    distractorBreakdown: {
      A: 'A Public VIF routes traffic over AWS public IP space, not purely private endpoints.',
      C: 'An Internet Gateway routes traffic over the public internet.',
      D: 'A NAT Gateway allows outbound traffic to the public internet.'
    },
    examTip: 'To keep AWS API calls inside the private AWS backbone without public internet: AWS PrivateLink / VPC Interface Endpoint.'
  },
  {
    id: 'sec-2',
    domain: 'Security & Governance',
    subtopic: 'KMS Encryption for AI Data',
    scenario: 'An enterprise stores sensitive medical records in Amazon S3 for ML training. Corporate security mandates encryption at rest where keys are managed and rotated in a dedicated cryptographic service with audit trails. Which service manages these keys?',
    options: {
      A: 'AWS Secrets Manager',
      B: 'AWS Key Management Service (AWS KMS)',
      C: 'AWS Certificate Manager (ACM)',
      D: 'AWS IAM Identity Center'
    },
    correctAnswer: 'B',
    explanation: 'AWS KMS creates and manages cryptographic keys used to encrypt data across AWS services (including S3, Bedrock, and SageMaker) with full CloudTrail logging.',
    distractorBreakdown: {
      A: 'Secrets Manager rotates and retrieves database credentials and API tokens, not S3 bucket encryption keys.',
      C: 'ACM manages SSL/TLS certificates for HTTPS domain names.',
      D: 'IAM Identity Center handles centralized single sign-on user logins.'
    }
  },
  {
    id: 'sec-3',
    domain: 'Security & Governance',
    subtopic: 'SageMaker Model Dashboard vs Cards',
    scenario: 'A machine learning operations (MLOps) team needs a single unified console to monitor 50 deployed SageMaker endpoints in production, with alerts triggered whenever data drift or model accuracy drops. Which service should they use?',
    options: {
      A: 'Amazon SageMaker Model Dashboard',
      B: 'Amazon SageMaker Model Cards',
      C: 'Amazon S3 Object Lock',
      D: 'Amazon Route 53'
    },
    correctAnswer: 'A',
    explanation: 'Amazon SageMaker Model Dashboard tracks all deployed models in one place, integrating with Model Monitor to alert on data drift, model quality drift, and bias drift over time.',
    distractorBreakdown: {
      B: 'Model Cards document static model metadata and intended usage for governance, not active runtime drift monitoring.',
      C: 'S3 Object Lock prevents files from being deleted or overwritten.',
      D: 'Route 53 is a DNS web service.'
    }
  },
  {
    id: 'sec-4',
    domain: 'Security & Governance',
    subtopic: 'Auditing API Calls',
    scenario: 'A compliance auditor needs to see who made the API call to delete a custom fine-tuned model in Amazon Bedrock last Tuesday at 3:00 PM. Which AWS service records this event?',
    options: {
      A: 'AWS CloudTrail',
      B: 'Amazon CloudWatch Metrics',
      C: 'AWS Trusted Advisor',
      D: 'AWS Artifact'
    },
    correctAnswer: 'A',
    explanation: 'AWS CloudTrail tracks and logs user activity and API calls across AWS services, detailing who made the call, when, and from what IP address.',
    distractorBreakdown: {
      B: 'CloudWatch Metrics records numeric performance telemetry (like invocation counts and latency), not the IAM user identity of API callers.',
      C: 'Trusted Advisor inspects your environment for optimization recommendations.',
      D: 'AWS Artifact provides downloadable compliance reports and certifications (SOC, PCI-DSS).'
    },
    confusingProductNote: 'CloudTrail = Who did what and when (API logs). CloudWatch = How is the system performing (Metrics, Logs, Alarms).'
  },

  // --- BONUS RAPID-FIRE BLUEPRINT QUESTIONS ---
  {
    id: 'rapid-1',
    domain: 'GenAI & Bedrock',
    subtopic: 'Tokens and Context Windows',
    scenario: 'You send a 50-page PDF containing 25,000 words to an LLM with a maximum context window of 4,000 tokens. The API returns an error. What is the fundamental cause?',
    options: {
      A: 'The prompt exceeds the maximum context window capacity of the foundation model',
      B: 'PDF files cannot be processed by any AWS service',
      C: 'The temperature parameter was set too low',
      D: 'The model has not been fine-tuned yet'
    },
    correctAnswer: 'A',
    explanation: 'The context window represents the maximum cumulative number of tokens (prompt + output) an LLM can process in a single request; 25,000 words far exceeds 4,000 tokens.',
    distractorBreakdown: {
      B: 'Services like Textract and Bedrock Knowledge Bases process PDFs regularly.',
      C: 'Temperature controls token sampling probability, not prompt size limits.',
      D: 'Fine-tuning modifies weights, it does not bypass the fixed context window of an API call.'
    }
  },
  {
    id: 'rapid-2',
    domain: 'Traditional ML',
    subtopic: 'Regularization',
    scenario: 'Which technique is specifically used to prevent overfitting in deep neural networks by randomly deactivating a subset of neurons during each training pass?',
    options: {
      A: 'Dropout',
      B: 'Gradient Boosting',
      C: 'K-Fold Cross-Validation',
      D: 'Batch Normalization'
    },
    correctAnswer: 'A',
    explanation: 'Dropout randomly zeroes out a fraction of neuron outputs during training, preventing complex co-adaptations and reducing overfitting.',
    distractorBreakdown: {
      B: 'Gradient boosting is an ensemble technique for decision trees, not neural network dropout.',
      C: 'K-Fold cross-validation is an evaluation splitting technique.',
      D: 'Batch normalization stabilizes and accelerates training, but is not primarily a neuron deactivation method.'
    }
  },
  {
    id: 'rapid-3',
    domain: 'AWS AI Services',
    subtopic: 'Amazon Lex',
    scenario: 'A company wants to build an automated interactive voice response (IVR) phone system and web chatbot that understands user utterances like "Book a flight to Seattle" and extracts the destination slot. Which AWS service is purpose-built for this?',
    options: {
      A: 'Amazon Lex',
      B: 'Amazon Comprehend',
      C: 'Amazon Polly',
      D: 'Amazon Rekognition'
    },
    correctAnswer: 'A',
    explanation: 'Amazon Lex powers conversational chatbots using speech-to-text and natural language understanding to recognize user intents and extract slot parameters.',
    distractorBreakdown: {
      B: 'Comprehend analyzes existing text for sentiment and entities, but lacks conversational dialog management.',
      C: 'Polly synthesizes text into voice output, but does not parse user intent.',
      D: 'Rekognition analyzes images and video.'
    },
    confusingProductNote: 'Amazon Lex powers the voice and conversational intelligence behind Amazon Alexa.'
  },
  {
    id: 'rapid-4',
    domain: 'Responsible AI',
    subtopic: 'Data Drift vs Concept Drift',
    scenario: 'After 6 months in production, a mortgage prediction model\'s accuracy drops because macroeconomic interest rates surged from 3% to 8%, changing borrower behavior. What type of drift has occurred?',
    options: {
      A: 'Concept drift (relationship between input features and target variable has changed)',
      B: 'Software degradation in SageMaker containers',
      C: 'Data leakage during validation',
      D: 'Overfitting on the test set'
    },
    correctAnswer: 'A',
    explanation: 'Concept drift occurs when the statistical relationship between input features and the target label changes over time due to external real-world shifts (like economic rate changes).',
    distractorBreakdown: {
      B: 'Container software does not spontaneously degrade.',
      C: 'Data leakage happens during training/validation, not months after live deployment.',
      D: 'Overfitting occurs during model training, not as a runtime drift effect.'
    }
  },
  {
    id: 'rapid-5',
    domain: 'GenAI & Bedrock',
    subtopic: 'Prompt Techniques',
    scenario: 'You prompt a foundation model: "Solve this logic puzzle. Think step-by-step before providing your final answer." Which prompt engineering technique are you employing?',
    options: {
      A: 'Chain-of-Thought (CoT) prompting',
      B: 'Few-shot prompting with five examples',
      C: 'Continuous pre-training',
      D: 'Reinforcement Learning from Human Feedback (RLHF)'
    },
    correctAnswer: 'A',
    explanation: 'Chain-of-Thought (CoT) prompting encourages the foundation model to break down complex reasoning into intermediate steps before concluding, improving accuracy on reasoning tasks.',
    distractorBreakdown: {
      B: 'Few-shot prompting requires providing explicit input-output demonstration examples in the prompt.',
      C: 'Continuous pre-training is a model training method, not a prompt engineering technique.',
      D: 'RLHF is a training fine-tuning alignment technique using human feedback reward models.'
    }
  }
];
