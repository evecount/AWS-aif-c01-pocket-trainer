import { Question } from '../types';

export interface PracticeTestSet {
  testId: string;
  title: string;
  description: string;
  questions: Question[];
}

export const PRACTICE_TESTS: PracticeTestSet[] = [
  {
    testId: 'test-7',
    title: 'Practice Test 7',
    description: 'Bedrock Guardrails, Nova models, Prompt Injection, Batch Transform, ISO Risk Frameworks',
    questions: [
      {
        id: 't7-q1',
        domain: 'Responsible AI',
        subtopic: 'Bedrock Guardrails',
        scenario: 'A company is using large language models (LLMs) to develop online tutoring applications. The company needs to apply configurable safeguards to the LLMs. These safeguards must ensure that the LLMs follow standard safety rules when creating applications. Which solution will meet these requirements with the LEAST effort?',
        options: {
          A: 'Amazon Bedrock playgrounds',
          B: 'Amazon SageMaker Clarify',
          C: 'Amazon Bedrock Guardrails',
          D: 'Amazon SageMaker Jumpstart'
        },
        correctAnswer: 'C',
        explanation: 'Amazon Bedrock Guardrails provide configurable safeguards that enforce standard safety rules on large language models with minimal effort.',
        distractorBreakdown: {
          A: 'Bedrock playgrounds are interactive web consoles for testing prompts, not deployable application safeguards.',
          B: 'SageMaker Clarify detects bias in training data and provides model explainability, not runtime prompt/response safety filtering for Bedrock.',
          D: 'SageMaker JumpStart is a hub for pre-trained models on dedicated compute, not a configurable safety safeguard.'
        },
        confusingProductNote: 'Guardrails = Runtime safety & PII filtering. Clarify = Training bias & SHAP explainability.',
        examTip: 'Whenever the exam says "apply configurable safeguards / safety rules to LLMs with LEAST effort", the answer is Amazon Bedrock Guardrails.'
      },
      {
        id: 't7-q2',
        domain: 'GenAI & Bedrock',
        subtopic: 'Amazon Nova Models',
        scenario: 'A company is exploring Amazon Nova models in Amazon Bedrock. The company needs a multimodal model that supports multiple languages. Which Nova model will meet these requirements MOST cost-effectively?',
        options: {
          A: 'Nova Lite',
          B: 'Nova Pro',
          C: 'Nova Canvas',
          D: 'Nova Reel'
        },
        correctAnswer: 'A',
        explanation: 'Nova Lite is a multimodal model in Amazon Bedrock that supports multiple languages and is designed as the most cost-effective option among the Nova model family.',
        distractorBreakdown: {
          B: 'Nova Pro offers maximum intelligence and reasoning capability, but at a significantly higher cost than Nova Lite.',
          C: 'Nova Canvas is specialized specifically for image generation, not general multimodal multilingual text processing.',
          D: 'Nova Reel is specialized for generating high-definition video clips.'
        },
        confusingProductNote: 'Nova Lite = Cost-effective multimodal. Nova Pro = High reasoning. Nova Canvas = Image. Nova Reel = Video.',
        examTip: 'Nova Lite is AWS\'s answer for high-throughput, low-latency, lowest-cost multimodal reasoning.'
      },
      {
        id: 't7-q3',
        domain: 'Security & Governance',
        subtopic: 'Prompt Injection Defense',
        scenario: 'A company is building a new generative AI chatbot using an Amazon Bedrock foundation model. During testing, the company notices that the chatbot is prone to prompt injection attacks. What can the company do to secure the chatbot with the LEAST implementation effort?',
        options: {
          A: 'Fine-tune the FM to avoid harmful responses',
          B: 'Use Amazon Bedrock Guardrails content filters and denied topics',
          C: 'Change the FM to a more secure FM',
          D: 'Use chain-of-thought prompting to produce secure responses'
        },
        correctAnswer: 'B',
        explanation: 'Amazon Bedrock Guardrails content filters and denied topics can be configured immediately without retraining to detect and block prompt injection attacks.',
        distractorBreakdown: {
          A: 'Fine-tuning requires curating thousands of adversarial training pairs and retraining model weights, incurring heavy effort.',
          C: 'Base foundation models are all inherently susceptible to prompt injection; changing models does not guarantee security.',
          D: 'Chain-of-thought encourages reasoning on complex tasks, but does not prevent malicious prompt hijacking or jailbreaking.'
        },
        examTip: 'Defense against Prompt Injection with LEAST effort = Amazon Bedrock Guardrails.'
      },
      {
        id: 't7-q4',
        domain: 'Traditional ML',
        subtopic: 'AI Terminology',
        scenario: 'What does "inference" refer to in the context of AI?',
        options: {
          A: 'The process of creating new AI algorithms',
          B: 'The use of a trained model to make predictions or decisions on unseen data',
          C: 'The process of combining multiple AI models into one model',
          D: 'The method of collecting training data for AI systems'
        },
        correctAnswer: 'B',
        explanation: 'Inference refers to passing new, unseen input data into an already trained model to generate predictions, classifications, or generative responses.',
        distractorBreakdown: {
          A: 'Creating new algorithms is machine learning research/development.',
          C: 'Combining multiple models is ensemble learning (e.g. bagging, boosting).',
          D: 'Collecting data is the data ingestion and preparation phase.'
        }
      },
      {
        id: 't7-q5',
        domain: 'GenAI & Bedrock',
        subtopic: 'Bedrock Agents',
        scenario: 'A company wants to build an AI assistant that can evaluate specific data sources, query external APIs, generate response options, and compare and prioritize response options. Which Amazon Bedrock feature or resource will meet these requirements?',
        options: {
          A: 'Prompt Management',
          B: 'Response streaming',
          C: 'Knowledge Bases',
          D: 'Agents'
        },
        correctAnswer: 'D',
        explanation: 'Amazon Bedrock Agents autonomously break down multi-step tasks, orchestrate API calls (Action Groups with AWS Lambda), query knowledge sources, and prioritize actions.',
        distractorBreakdown: {
          A: 'Prompt Management helps store, version, and evaluate prompts, but cannot orchestrate external API execution.',
          B: 'Response streaming streams generated tokens in chunks to lower perceived latency for end-users.',
          C: 'Knowledge Bases provides RAG document retrieval, but cannot orchestrate multi-step external API actions autonomously.'
        },
        confusingProductNote: 'Knowledge Bases = Retrieve info (RAG). Agents = Take action + query APIs + orchestrate workflow.'
      },
      {
        id: 't7-q6',
        domain: 'GenAI & Bedrock',
        subtopic: 'LLM Risks - Nondeterminism',
        scenario: 'An AI practitioner notices a large language model (LLM) is generating different responses for the exact same input across multiple invocations. Which risk of AI does this describe?',
        options: {
          A: 'Hallucinations',
          B: 'Nondeterminism',
          C: 'Accuracy',
          D: 'Multimodality'
        },
        correctAnswer: 'B',
        explanation: 'Nondeterminism is the property where an LLM produces varying outputs for identical inputs due to probabilistic token sampling (controlled by Temperature and Top-P).',
        distractorBreakdown: {
          A: 'Hallucination is generating factually false or fabricated information presented with confidence.',
          C: 'Accuracy measures correctness against ground truth, not variability across identical runs.',
          D: 'Multimodality is the ability to process multiple data formats (text, images, audio).'
        },
        examTip: 'To eliminate nondeterminism, set Temperature to 0.0 (greedy sampling).'
      },
      {
        id: 't7-q7',
        domain: 'GenAI & Bedrock',
        subtopic: 'Image Generation',
        scenario: 'A company is building a generative AI application to help improve reading comprehension. The application must give students the ability to add illustrations to stories based on text inputs. Which solution meets this requirement?',
        options: {
          A: 'Use Amazon Bedrock Stable Diffusion to generate images based on text inputs',
          B: 'Use Amazon Polly to create an audiobook based on story texts',
          C: 'Use Amazon Rekognition to analyze image contents and detect text attributes',
          D: 'Use Amazon Q Business to illustrate stories'
        },
        correctAnswer: 'A',
        explanation: 'Stable Diffusion (and Amazon Titan Image Generator / Nova Canvas) on Bedrock generates high-quality images from text prompts (text-to-image).',
        distractorBreakdown: {
          B: 'Amazon Polly is Text-to-Speech (audio voice synthesis), not image generation.',
          C: 'Amazon Rekognition analyzes existing images/video (computer vision perception), it does not generate images.',
          D: 'Amazon Q Business is an enterprise knowledge assistant for employee files, not an image generation tool.'
        }
      },
      {
        id: 't7-q8',
        domain: 'Traditional ML',
        subtopic: 'Inference Types',
        scenario: 'A healthcare company wants to analyze patient data gathered over the previous year to detect patterns in disease outbreaks, generating a monthly trend report. Which inference method will meet these requirements MOST cost-effectively?',
        options: {
          A: 'Real-time inference',
          B: 'Batch transform',
          C: 'Serverless inference',
          D: 'Asynchronous inference'
        },
        correctAnswer: 'B',
        explanation: 'Batch transform processes large historical datasets in scheduled offline batches, shutting down compute immediately upon completion to minimize cost.',
        distractorBreakdown: {
          A: 'Real-time inference maintains active 24/7 endpoint instances, which is needlessly expensive for monthly offline reports.',
          C: 'Serverless inference is for intermittent real-time HTTP requests, not bulk historical transformations.',
          D: 'Asynchronous inference queues incoming real-time payload requests with large processing times (up to 1 hour), not monthly batch reporting.'
        }
      },
      {
        id: 't7-q9',
        domain: 'Security & Governance',
        subtopic: 'ISO Standards & Compliance',
        scenario: 'A company acquires International Organization for Standardization (ISO) accreditation to manage AI risks and to use AI responsibly. What does this accreditation reflect about the company?',
        options: {
          A: 'All members of the company are ISO certified',
          B: 'All AI systems that the company uses are ISO certified',
          C: 'All AI application team members are ISO certified',
          D: 'The company’s development framework and processes are ISO certified'
        },
        correctAnswer: 'D',
        explanation: 'ISO AI risk management accreditation (such as ISO/IEC 42001) certifies the organizational governance policies, development processes, and controls, not individual employees or standalone algorithms.',
        distractorBreakdown: {
          A: 'ISO standards certify organizational management systems, not individual employee personal certifications.',
          B: 'Specific dynamic AI models are not individually certified; the governance framework governing their creation is.',
          C: 'Team members are not the entity holding organizational ISO compliance accreditation.'
        }
      },
      {
        id: 't7-q10',
        domain: 'Traditional ML',
        subtopic: 'Supervised Learning',
        scenario: 'A company is developing an ML model to predict heart disease risk. The dataset includes features (age, cholesterol, blood pressure) and a known target label indicating whether each patient has heart disease. Which ML technique should be used?',
        options: {
          A: 'Unsupervised learning',
          B: 'Supervised learning',
          C: 'Reinforcement learning',
          D: 'Semi-supervised learning'
        },
        correctAnswer: 'B',
        explanation: 'Supervised learning trains on datasets containing known ground-truth target labels to learn a predictive mapping from input features to the target outcome.',
        distractorBreakdown: {
          A: 'Unsupervised learning is used when there are NO target labels (e.g. K-Means clustering).',
          C: 'Reinforcement learning learns via trial-and-error rewards and penalties within an environment.',
          D: 'Semi-supervised learning is used when only a tiny fraction of data is labeled and the rest is unlabeled.'
        }
      },
      {
        id: 't7-q11',
        domain: 'Security & Governance',
        subtopic: 'Data Governance Policies',
        scenario: 'A company establishes mandatory guidelines defining how long customer transaction data is stored in Amazon S3 and when it must be permanently deleted. Which data governance strategy does this describe?',
        options: {
          A: 'Data de-identification',
          B: 'Data quality standards',
          C: 'Data retention',
          D: 'Log storage'
        },
        correctAnswer: 'C',
        explanation: 'Data retention policies specify the storage duration, archival lifecycles, and scheduled deletion timelines to satisfy legal and business requirements.',
        distractorBreakdown: {
          A: 'Data de-identification is stripping or masking PII to protect individual privacy.',
          B: 'Data quality standards govern data accuracy, completeness, and consistency.',
          D: 'Log storage is the physical act of storing audit logs, not the formal policy governing lifecycle duration and deletion.'
        }
      },
      {
        id: 't7-q12',
        domain: 'Traditional ML',
        subtopic: 'Appropriate Use of AI/ML',
        scenario: 'A company needs to apply standard numerical transformations to transpose and rotate images by 90 degrees. Which solution meets these requirements in the MOST operationally efficient way?',
        options: {
          A: 'Train a deep convolutional neural network',
          B: 'Create an AWS Lambda function to perform the transformations programmatically',
          C: 'Use an Amazon Bedrock LLM with high temperature',
          D: 'Use AWS Glue Data Quality'
        },
        correctAnswer: 'B',
        explanation: 'Deterministic mathematical operations (like rotating or transposing an image) should use standard code (AWS Lambda) rather than machine learning, which is unnecessary, probabilistic, and expensive.',
        distractorBreakdown: {
          A: 'Training a neural network for simple geometric rotation is extreme overkill and prone to approximation errors.',
          C: 'LLMs process text and have nothing to do with executing matrix rotation on raw image arrays.',
          D: 'Glue Data Quality measures data freshness and completeness in data lakes, not image rotation.'
        },
        examTip: 'Exam guide Task 1.2: "Determine when AI/ML solutions are NOT appropriate (e.g. situations when a deterministic outcome/calculation is needed instead of a prediction)."'
      },
      {
        id: 't7-q13',
        domain: 'AWS AI Services',
        subtopic: 'Amazon Q Developer',
        scenario: 'A software engineer wants to quickly generate unit tests and draft documentation for existing Python code directly inside their IDE. Which AWS solution meets these requirements with the LEAST effort?',
        options: {
          A: 'Upload code to a public online web chatbot',
          B: 'Develop a custom application with Bedrock foundation models',
          C: 'Use Amazon Q Developer in the integrated development environment (IDE)',
          D: 'Research and manually write unit tests'
        },
        correctAnswer: 'C',
        explanation: 'Amazon Q Developer (formerly CodeWhisperer) integrates directly into IDEs (VS Code, JetBrains) to generate unit test suites and explain/document code with a single click.',
        distractorBreakdown: {
          A: 'Uploading proprietary source code to public chatbots creates serious data leakage and compliance risks.',
          B: 'Developing a custom Bedrock app requires building infrastructure, APIs, and UI from scratch.',
          D: 'Manual test authoring requires maximum developer time and effort.'
        }
      },
      {
        id: 't7-q14',
        domain: 'GenAI & Bedrock',
        subtopic: 'Model Architectures',
        scenario: 'An e-commerce company needs a generative AI model to automatically generate thousands of unique, coherent product description paragraphs daily with consistent tone. Which model architecture is designed for this?',
        options: {
          A: 'Variational Autoencoder (VAE)',
          B: 'Transformer-based model',
          C: 'Diffusion model',
          D: 'Generative Adversarial Network (GAN)'
        },
        correctAnswer: 'B',
        explanation: 'Transformer-based models (such as GPT, Claude, Titan) use self-attention mechanisms and are the foundational architecture for coherent, large-scale natural language text generation.',
        distractorBreakdown: {
          A: 'VAEs are primarily used for representation learning and image generation.',
          C: 'Diffusion models are specialized for generating images, audio, and video by reversing a noise process.',
          D: 'GANs use a generator-discriminator pair, typically for image synthesis.'
        }
      },
      {
        id: 't7-q15',
        domain: 'Traditional ML',
        subtopic: 'Overfitting vs Underfitting',
        scenario: 'An AI practitioner trains a model that achieves 98% accuracy on the training dataset, but only 58% accuracy on unseen evaluation data. What is the MOST likely cause?',
        options: {
          A: 'The model is underfit',
          B: 'The model requires prompt engineering',
          C: 'The model is biased',
          D: 'The model is overfit'
        },
        correctAnswer: 'D',
        explanation: 'Overfitting (high variance) occurs when a model memorizes training noise and idiosyncrasies, performing exceptionally on training data but failing on unseen validation/test data.',
        distractorBreakdown: {
          A: 'Underfitting (high bias) performs poorly on BOTH training and validation datasets.',
          B: 'Prompt engineering applies to foundation models, not traditional supervised training datasets.',
          C: 'Bias in training data can cause unfairness across demographics, but a high train / low test gap is the textbook definition of overfitting.'
        }
      },
      {
        id: 't7-q16',
        domain: 'Traditional ML',
        subtopic: 'AI vs ML Relationship',
        scenario: 'What is the primary relationship between Artificial Intelligence (AI) and Machine Learning (ML)?',
        options: {
          A: 'AI is a subset of ML',
          B: 'ML is a subset of AI',
          C: 'They are completely unrelated fields',
          D: 'AI and ML are synonymous terms for deep neural networks'
        },
        correctAnswer: 'B',
        explanation: 'AI is the broad umbrella discipline of building intelligent systems; Machine Learning (ML) is a subset of AI that learns patterns from data; Deep Learning is a subset of ML.',
        distractorBreakdown: {
          A: 'The hierarchy is inverted; ML is inside AI.',
          C: 'ML is one of the core branches of AI.',
          D: 'AI encompasses rule-based systems, expert systems, and search algorithms beyond just deep neural networks.'
        },
        examTip: 'Hierarchy to remember: AI (broadest) $\\rightarrow$ ML (learns from data) $\\rightarrow$ Deep Learning (multi-layer neural nets) $\\rightarrow$ Generative AI.'
      },
      {
        id: 't7-q17',
        domain: 'Traditional ML',
        subtopic: 'ML Paradigms',
        scenario: 'Which of the following is NOT one of the recognized core paradigms of machine learning?',
        options: {
          A: 'Supervised learning',
          B: 'Unsupervised learning',
          C: 'Reinforcement learning',
          D: 'Diagnostic learning'
        },
        correctAnswer: 'D',
        explanation: 'The three foundational machine learning paradigms are Supervised, Unsupervised, and Reinforcement learning. "Diagnostic learning" is not a formal ML paradigm.',
        distractorBreakdown: {
          A: 'Supervised learning learns from input-output labeled pairs.',
          B: 'Unsupervised learning finds hidden structures in unlabeled data.',
          C: 'Reinforcement learning optimizes an agent through environmental reward signals.'
        }
      },
      {
        id: 't7-q18',
        domain: 'AWS AI Services',
        subtopic: 'Amazon Comprehend',
        scenario: 'A company wants an AWS managed AI service to extract customer sentiment, key phrases, language, and recognized entities from raw text reviews without training custom models. Which service should they choose?',
        options: {
          A: 'Amazon SageMaker',
          B: 'Amazon Comprehend',
          C: 'Amazon Polly',
          D: 'Amazon Transcribe'
        },
        correctAnswer: 'B',
        explanation: 'Amazon Comprehend is a pre-trained Natural Language Processing (NLP) service that automatically extracts sentiment, entities, key phrases, and PII from unstructured text.',
        distractorBreakdown: {
          A: 'Amazon SageMaker is a broad ML platform for building, training, and deploying custom models from scratch.',
          C: 'Amazon Polly converts written text into lifelike speech (TTS).',
          D: 'Amazon Transcribe converts speech audio into text (STT).'
        }
      },
      {
        id: 't7-q19',
        domain: 'Traditional ML',
        subtopic: 'Exploratory Data Analysis (EDA)',
        scenario: 'What is the primary objective of Exploratory Data Analysis (EDA) in the machine learning development lifecycle?',
        options: {
          A: 'To train the final model weights',
          B: 'To deploy the model endpoint to production',
          C: 'To understand data distributions, correlations, outliers, and quality before modeling',
          D: 'To monitor data drift after deployment'
        },
        correctAnswer: 'C',
        explanation: 'EDA analyzes dataset characteristics, summary statistics, missing values, and visual distributions prior to feature engineering and model training.',
        distractorBreakdown: {
          A: 'Model training occurs after data preparation and feature engineering.',
          B: 'Deployment happens at the end of the pipeline.',
          D: 'Monitoring data drift in production is performed post-deployment by tools like SageMaker Model Monitor.'
        }
      },
      {
        id: 't7-q20',
        domain: 'Traditional ML',
        subtopic: 'Classification Metrics - ROC-AUC',
        scenario: 'What does the Area Under the Curve (AUC) of the Receiver Operating Characteristic (ROC) measure?',
        options: {
          A: 'The financial cost per inference request',
          B: 'The model\'s ability to discriminate between positive and negative classes across all classification thresholds',
          C: 'The total training time required for convergence',
          D: 'The number of features retained after PCA'
        },
        correctAnswer: 'B',
        explanation: 'ROC-AUC measures a binary classifier\'s ability to distinguish between classes across all possible decision thresholds, where 1.0 is perfect and 0.5 is random guessing.',
        distractorBreakdown: {
          A: 'Financial cost is a business metric, not a mathematical ROC curve.',
          C: 'Training time is an operational infrastructure metric.',
          D: 'PCA dimensionality reduction is evaluated by explained variance ratio, not ROC-AUC.'
        }
      }
    ]
  },
  {
    testId: 'test-6',
    title: 'Practice Test 6',
    description: 'Nova Canvas vs Reel, AWS PrivateLink, SageMaker Canvas, K-Means, Ground Truth Plus, OpenSearch',
    questions: [
      {
        id: 't6-q1',
        domain: 'GenAI & Bedrock',
        subtopic: 'Image Generation Parameters',
        scenario: 'A design agency using a Bedrock image foundation model wants to control how detailed or abstract generated images appear by adjusting the number of denoising iterations. Which parameter should they modify?',
        options: {
          A: 'Model checkpoint',
          B: 'Batch size',
          C: 'Generation steps',
          D: 'Token length'
        },
        correctAnswer: 'C',
        explanation: 'Generation steps in diffusion models specify the number of denoising iterations; higher steps yield sharper, more refined detail, while fewer steps produce abstract or draft images.',
        distractorBreakdown: {
          A: 'Model checkpoints are saved weight snapshots during training.',
          B: 'Batch size controls the number of samples processed simultaneously per compute pass.',
          D: 'Token length applies to text language models, not diffusion step iterations.'
        }
      },
      {
        id: 't6-q2',
        domain: 'Security & Governance',
        subtopic: 'Network Isolation',
        scenario: 'A multinational bank requires that all API calls between internal applications and Amazon Bedrock foundation models remain strictly on the private AWS network without traversing the public internet. Which service should they configure?',
        options: {
          A: 'AWS PrivateLink (VPC Endpoint)',
          B: 'Amazon CloudFront',
          C: 'AWS CloudTrail',
          D: 'Amazon Route 53'
        },
        correctAnswer: 'A',
        explanation: 'AWS PrivateLink establishes private connectivity between your VPC and AWS services (like Amazon Bedrock) without requiring an Internet Gateway, NAT, or public IP exposure.',
        distractorBreakdown: {
          B: 'CloudFront is a public content delivery network (CDN).',
          C: 'CloudTrail logs API calls for governance and audits, but does not provide private network transport.',
          D: 'Route 53 is a DNS service.'
        }
      },
      {
        id: 't6-q3',
        domain: 'Responsible AI',
        subtopic: 'Bedrock Guardrails',
        scenario: 'An e-commerce chatbot allows customers to inquire about orders and product inventory. The company must implement safeguards to filter out profanity, hate speech, and competitor mentions from prompts and responses. Which feature meets these requirements?',
        options: {
          A: 'Amazon Bedrock Guardrails',
          B: 'Amazon Bedrock Agents',
          C: 'Amazon Bedrock Inference APIs',
          D: 'Amazon Bedrock Provisioned Throughput'
        },
        correctAnswer: 'A',
        explanation: 'Amazon Bedrock Guardrails provides customizable content filters, denied topics, word filters, and sensitive information (PII) redaction for both inputs and model outputs.',
        distractorBreakdown: {
          B: 'Agents orchestrate multi-step API workflows, they do not enforce content moderation filters.',
          C: 'Inference APIs invoke the models without applying custom safety guardrail policies.',
          D: 'Provisioned Throughput reserves dedicated inference capacity.'
        }
      },
      {
        id: 't6-q4',
        domain: 'GenAI & Bedrock',
        subtopic: 'PartyRock',
        scenario: 'A company wants business teams with no coding or AWS experience to experiment with generative AI prompts and build prototype applications in a fun, zero-cost, hands-on environment. Which AWS offering meets this requirement?',
        options: {
          A: 'Amazon Q Developer',
          B: 'Amazon SageMaker JumpStart',
          C: 'PartyRock, an Amazon Bedrock Playground',
          D: 'Amazon Q Business'
        },
        correctAnswer: 'C',
        explanation: 'PartyRock is a shareable, intuitive, no-code generative AI playground powered by Amazon Bedrock where anyone can build AI apps using foundation models without an AWS account or credit card.',
        distractorBreakdown: {
          A: 'Amazon Q Developer is an AI coding assistant inside developer IDEs.',
          B: 'SageMaker JumpStart requires an active AWS account, SageMaker Studio, and paid EC2 hosting instances.',
          D: 'Amazon Q Business requires enterprise setup, indexing, and enterprise identity federation.'
        },
        examTip: 'Exam guide Task 2.3 explicitly lists: "PartyRock, an Amazon Bedrock Playground" as in-scope for experimental prototyping.'
      },
      {
        id: 't6-q5',
        domain: 'Traditional ML',
        subtopic: 'SageMaker Canvas',
        scenario: 'A human resources business analyst with zero programming or machine learning experience wants to predict employee attrition using historical CSV data without writing any code. Which SageMaker feature should they use?',
        options: {
          A: 'Amazon SageMaker Canvas',
          B: 'Amazon SageMaker Clarify',
          C: 'Amazon SageMaker Model Monitor',
          D: 'Amazon SageMaker Data Wrangler'
        },
        correctAnswer: 'A',
        explanation: 'Amazon SageMaker Canvas provides a visual, drag-and-drop, no-code interface that enables business analysts to build, train, and generate predictions without writing a single line of code.',
        distractorBreakdown: {
          B: 'SageMaker Clarify is for detecting bias and calculating explainability metrics.',
          C: 'SageMaker Model Monitor tracks live production endpoints for drift.',
          D: 'Data Wrangler prepares, cleans, and transforms data visually, but Canvas trains the end-to-end predictive model.'
        }
      },
      {
        id: 't6-q6',
        domain: 'Traditional ML',
        subtopic: 'Unsupervised Clustering',
        scenario: 'A retailer wants to segment its customer base into 5 distinct groups based on annual spending and shopping frequency, but does not have any predefined segment labels. Which algorithm should they apply?',
        options: {
          A: 'K-Nearest Neighbors (k-NN)',
          B: 'K-Means clustering',
          C: 'Decision Trees',
          D: 'Linear Regression'
        },
        correctAnswer: 'B',
        explanation: 'K-Means is an unsupervised clustering algorithm that partitions unlabeled data points into K clusters based on Euclidean distance to cluster centroids.',
        distractorBreakdown: {
          A: 'k-NN is a supervised classification/regression algorithm requiring labeled ground truth.',
          C: 'Decision Trees require labeled target columns.',
          D: 'Linear Regression predicts continuous numeric targets from labeled data.'
        }
      },
      {
        id: 't6-q7',
        domain: 'GenAI & Bedrock',
        subtopic: 'Negative Prompts',
        scenario: 'A marketing team is using Amazon Nova Canvas on Bedrock to generate lifestyle product photos. The team needs to prevent the model from including people or text watermarks in the generated images. Which prompt technique should they use?',
        options: {
          A: 'Increase the temperature',
          B: 'Use a negative prompt',
          C: 'Use chain-of-thought prompting',
          D: 'Decrease generation steps'
        },
        correctAnswer: 'B',
        explanation: 'Negative prompts explicitly instruct diffusion image models on what visual concepts, objects, or flaws (e.g. "blurry, people, text, watermarks") to avoid in the output.',
        distractorBreakdown: {
          A: 'Increasing temperature increases randomness, which would make unwanted artifacts more likely.',
          C: 'Chain-of-thought is for multi-step text reasoning in LLMs, not diffusion image generation.',
          D: 'Decreasing steps lowers image resolution and fidelity.'
        }
      },
      {
        id: 't6-q8',
        domain: 'Traditional ML',
        subtopic: 'Data Labeling Services',
        scenario: 'A company needs to label a large dataset of customer service audio clips with human annotators to fine-tune an AI model, but does not want to recruit, manage, or coordinate a labeling workforce. Which AWS service provides a turnkey managed workforce?',
        options: {
          A: 'Amazon SageMaker Data Wrangler',
          B: 'Amazon SageMaker Ground Truth Plus',
          C: 'Amazon Transcribe',
          D: 'Amazon Macie'
        },
        correctAnswer: 'B',
        explanation: 'Amazon SageMaker Ground Truth Plus is a turnkey, fully managed data labeling service where AWS manages the professional labeling workforce and quality assurance workflows for you.',
        distractorBreakdown: {
          A: 'Data Wrangler visually cleans and transforms tabular data, but does not provide human labeling teams.',
          C: 'Amazon Transcribe automatically converts speech to text via ML, but does not provide human labelers for custom datasets.',
          D: 'Amazon Macie discovers sensitive data/PII in S3 buckets.'
        }
      },
      {
        id: 't6-q9',
        domain: 'GenAI & Bedrock',
        subtopic: 'Vector Databases in Bedrock',
        scenario: 'A company needs a vector database for similarity searches and nearest neighbor queries to store text embeddings for a Bedrock RAG application. Which AWS service is commonly used?',
        options: {
          A: 'Amazon Comprehend',
          B: 'Amazon Personalize',
          C: 'Amazon Polly',
          D: 'Amazon OpenSearch Service (or Serverless)'
        },
        correctAnswer: 'D',
        explanation: 'Amazon OpenSearch Service supports k-NN (k-nearest neighbors) vector search indexes, making it a primary native vector store for Bedrock Knowledge Bases.',
        distractorBreakdown: {
          A: 'Comprehend is a text analysis NLP service, not a vector database.',
          B: 'Personalize generates product recommendations, not vector storage.',
          C: 'Polly is a text-to-speech service.'
        }
      },
      {
        id: 't6-q10',
        domain: 'GenAI & Bedrock',
        subtopic: 'Model Customization - Continued Pre-training',
        scenario: 'A company wants a foundation model to deeply understand proprietary technical jargon, internal acronyms, and industry engineering documents from millions of pages of unstructured text. Which customization approach is best?',
        options: {
          A: 'Supervised classification',
          B: 'Continued pre-training',
          C: 'Model distillation',
          D: 'Few-shot prompting'
        },
        correctAnswer: 'B',
        explanation: 'Continued pre-training feeds massive amounts of unannotated domain-specific raw text to a base model, adapting its internal vocabulary and latent weights to specialized domains.',
        distractorBreakdown: {
          A: 'Classification assigns labels to categories, it does not adapt an LLM\'s internal language vocabulary.',
          C: 'Distillation transfers knowledge from a large model into a smaller one.',
          D: 'Few-shot prompting provides temporary in-context examples, but cannot ingest millions of technical documents into a context window.'
        }
      }
    ]
  },
  {
    testId: 'test-5',
    title: 'Practice Test 5',
    description: 'Multimodal Models, Temperature 0, Bedrock Data Privacy, ReAct Prompting, Model Registry, HealthScribe',
    questions: [
      {
        id: 't5-q1',
        domain: 'GenAI & Bedrock',
        subtopic: 'Multimodal LLMs',
        scenario: 'An educational app allows students to type a homework question or upload a photo of a math problem. The application generates a written step-by-step answer. Which model type is required?',
        options: {
          A: 'Computer vision classification model',
          B: 'Large multimodal language model',
          C: 'Diffusion model',
          D: 'Text-to-speech model'
        },
        correctAnswer: 'B',
        explanation: 'Large multimodal models (such as Claude 3 or Amazon Nova) natively accept both text and image inputs and generate contextual text responses.',
        distractorBreakdown: {
          A: 'Vision classification models output class labels (e.g. "math worksheet"), not full generative explanations.',
          C: 'Diffusion models generate images/videos, not written math explanations.',
          D: 'Text-to-speech models convert text to audio voice.'
        }
      },
      {
        id: 't5-q2',
        domain: 'GenAI & Bedrock',
        subtopic: 'Deterministic Output with Temperature',
        scenario: 'A healthcare application requires an LLM to produce completely deterministic and stable responses for clinical terminology lookups. What parameter setting guarantees this behavior?',
        options: {
          A: 'Set Temperature to 0',
          B: 'Add "be deterministic" to the end of the prompt',
          C: 'Add "be deterministic" to the beginning of the prompt',
          D: 'Set Temperature to 1'
        },
        correctAnswer: 'A',
        explanation: 'Setting Temperature to 0 enforces greedy token decoding, always selecting the single highest-probability next token, resulting in deterministic and reproducible output.',
        distractorBreakdown: {
          B: 'Prompt instructions do not alter the stochastic mathematical sampling distribution of the inference engine.',
          C: 'Prompt instructions alone cannot guarantee mathematical determinism.',
          D: 'Temperature of 1 maximizes creative randomness and variability.'
        }
      },
      {
        id: 't5-q3',
        domain: 'GenAI & Bedrock',
        subtopic: 'Bedrock Data Privacy Contract',
        scenario: 'A financial enterprise invokes third-party foundation models (such as Anthropic Claude) through Amazon Bedrock. How does Amazon Bedrock protect customer data privacy?',
        options: {
          A: 'Prompts and completions are anonymized and shared with third-party providers for training',
          B: 'Prompts and completions are never shared with third-party model providers, nor used to train any base models',
          C: 'Prompts are private, but completions are cached in a public pool',
          D: 'Customer data is automatically published after 90 days'
        },
        correctAnswer: 'B',
        explanation: 'Amazon Bedrock operates within your AWS security boundary; customer prompts and completions are never shared with model providers and never used to train base foundation models.',
        distractorBreakdown: {
          A: 'Bedrock never shares customer inference data with third-party providers.',
          C: 'Completions are strictly returned to the caller and never publicly pooled.',
          D: 'Customer data is not published or retained by AWS for external purposes.'
        }
      },
      {
        id: 't5-q4',
        domain: 'Traditional ML',
        subtopic: 'Amazon SageMaker Model Registry',
        scenario: 'An enterprise MLOps team has created dozens of model versions across multiple staging environments. They need a centralized catalog to track model versions, manage approval workflows, and register deployment status. Which feature should they use?',
        options: {
          A: 'AWS Audit Manager',
          B: 'Amazon SageMaker Model Monitor',
          C: 'Amazon SageMaker Model Registry',
          D: 'Amazon SageMaker Canvas'
        },
        correctAnswer: 'C',
        explanation: 'SageMaker Model Registry is the centralized repository for cataloging model versions, tracking metadata (like Model Cards), managing CI/CD approval status, and orchestrating deployments.',
        distractorBreakdown: {
          A: 'AWS Audit Manager automates evidence collection for regulatory compliance audits.',
          B: 'SageMaker Model Monitor tracks live production endpoints for drift.',
          D: 'SageMaker Canvas is a no-code ML building interface.'
        },
        confusingProductNote: 'Model Registry = Versioning & Approval. Model Cards = Documentation & Governance. Model Dashboard = Live Endpoint Monitoring.'
      },
      {
        id: 't5-q5',
        domain: 'AWS AI Services',
        subtopic: 'AWS HealthScribe',
        scenario: 'A hospital network wants an AI service that automatically listens to doctor-patient consultations, generates clinical audio transcriptions, and formats structured clinical notes for electronic health records (EHR). Which AWS service is purpose-built for this?',
        options: {
          A: 'Amazon Q Developer',
          B: 'Amazon Polly',
          C: 'Amazon Rekognition',
          D: 'AWS HealthScribe'
        },
        correctAnswer: 'D',
        explanation: 'AWS HealthScribe combines speech-to-text with generative AI to transcribe patient-clinician conversations and automatically generate structured clinical summaries with source citations.',
        distractorBreakdown: {
          A: 'Amazon Q Developer is a coding assistant for software engineers in IDEs.',
          B: 'Amazon Polly converts written text into spoken voice.',
          C: 'Amazon Rekognition is a computer vision service for images and video.'
        }
      }
    ]
  },
  {
    testId: 'test-4',
    title: 'Practice Test 4',
    description: 'Comprehend toxicity, Model Cards, Context size, Bedrock On-Demand vs Provisioned Throughput, Precision vs Recall',
    questions: [
      {
        id: 't4-q1',
        domain: 'AWS AI Services',
        subtopic: 'Amazon Comprehend Toxicity Detection',
        scenario: 'A company wants to identify harmful language in the comments section of social media posts using an ML model without training on custom labeled data. Which strategy should they use?',
        options: {
          A: 'Use Amazon Rekognition moderation',
          B: 'Use Amazon Comprehend toxicity detection',
          C: 'Use Amazon SageMaker built-in algorithms to train from scratch',
          D: 'Use Amazon Polly to monitor comments'
        },
        correctAnswer: 'B',
        explanation: 'Amazon Comprehend provides pre-trained NLP models with out-of-the-box toxicity detection to flag hateful, abusive, or harmful language without requiring labeled training datasets.',
        distractorBreakdown: {
          A: 'Amazon Rekognition analyzes images and video content, not written text comments.',
          C: 'Training custom algorithms requires gathering and annotating extensive labeled training datasets.',
          D: 'Amazon Polly converts text into synthesized speech.'
        }
      },
      {
        id: 't4-q2',
        domain: 'Responsible AI',
        subtopic: 'SageMaker Model Cards',
        scenario: 'A company is deploying AI/ML models on AWS. The company must offer transparency into the models\' decision-making processes, intended use, and limitations for auditors. Which feature meets these requirements?',
        options: {
          A: 'Amazon SageMaker Model Cards',
          B: 'Amazon Rekognition',
          C: 'Amazon Comprehend',
          D: 'Amazon Lex'
        },
        correctAnswer: 'A',
        explanation: 'SageMaker Model Cards standardize model documentation (intended purpose, risk rating, training data, evaluation metrics) for transparency, explainability, and governance audits.',
        distractorBreakdown: {
          B: 'Rekognition is a computer vision service.',
          C: 'Comprehend is a text analysis NLP service.',
          D: 'Lex builds conversational voice and chat bots.'
        }
      },
      {
        id: 't4-q3',
        domain: 'GenAI & Bedrock',
        subtopic: 'Context Window Limits',
        scenario: 'A company is building an AI application to summarize books of varying lengths. During testing, the application fails on books with more than 300 pages. What is the fundamental cause?',
        options: {
          A: 'The temperature is set too high',
          B: 'The selected model does not support fine-tuning',
          C: 'The Top P value is too high',
          D: 'The input tokens exceed the model’s context size'
        },
        correctAnswer: 'D',
        explanation: 'Every foundation model has a fixed maximum context window (e.g. 8k, 32k, or 200k tokens); passing documents exceeding that limit causes token length overflow API errors.',
        distractorBreakdown: {
          A: 'Temperature controls probabilistic randomness, not document length limits.',
          B: 'Fine-tuning support has no bearing on inference prompt token capacity.',
          C: 'Top-P sets cumulative probability sampling, not token input length.'
        }
      },
      {
        id: 't4-q4',
        domain: 'GenAI & Bedrock',
        subtopic: 'Bedrock Throughput Models',
        scenario: 'A company has an editorial assistant application using Bedrock. Pilot usage is low and unpredictable, and the company wants to pay only for exact inference calls made with zero upfront commitments. Which pricing model meets this?',
        options: {
          A: 'Amazon EC2 GPU instances',
          B: 'Amazon Bedrock Provisioned Throughput',
          C: 'Amazon Bedrock On-Demand Throughput',
          D: 'SageMaker JumpStart dedicated endpoints'
        },
        correctAnswer: 'C',
        explanation: 'Amazon Bedrock On-Demand Throughput charges per token processed with zero upfront commitment or ongoing hourly infrastructure charges.',
        distractorBreakdown: {
          A: 'EC2 GPU instances run 24/7 and accrue hourly infrastructure charges regardless of traffic.',
          B: 'Provisioned Throughput requires 1-month or 6-month commitments for reserved model units.',
          D: 'SageMaker JumpStart dedicated instances incur continuous hourly compute charges.'
        }
      },
      {
        id: 't4-q5',
        domain: 'Traditional ML',
        subtopic: 'Precision vs Recall for Fraud',
        scenario: 'A fraud detection team flags suspicious transactions for human review. The company wants to minimize the wasted hours employees spend reviewing false alarms (non-fraudulent transactions). Which metric should be maximized?',
        options: {
          A: 'Recall',
          B: 'Accuracy',
          C: 'Precision',
          D: 'Mean Absolute Error'
        },
        correctAnswer: 'C',
        explanation: 'Precision measures (True Positives) / (True Positives + False Positives); maximizing precision minimizes False Positives (false alarms), saving reviewer time.',
        distractorBreakdown: {
          A: 'Maximizing Recall minimizes False Negatives (missed fraud), which would increase false alarms and reviewer workload.',
          B: 'Accuracy is skewed in fraud due to class imbalance (99.9% legitimate).',
          D: 'Mean Absolute Error is a metric for regression, not classification.'
        }
      }
    ]
  },
  {
    testId: 'test-3',
    title: 'Practice Test 3',
    description: 'Clarify Bias & Explainability, BERTScore, KMS for Bedrock, Regularization, Decision Trees',
    questions: [
      {
        id: 't3-q1',
        domain: 'Responsible AI',
        subtopic: 'SageMaker Clarify',
        scenario: 'A bank is developing an ML model for automated loan approvals. The company must implement a solution to detect pre-training bias and explain the feature attributions behind individual predictions. Which solution meets these requirements?',
        options: {
          A: 'Amazon SageMaker Clarify',
          B: 'Amazon SageMaker Data Wrangler',
          C: 'Amazon SageMaker Model Cards',
          D: 'AWS AI Service Cards'
        },
        correctAnswer: 'A',
        explanation: 'SageMaker Clarify measures dataset bias (pre-training and post-training) and computes SHAP feature attributions to explain individual predictions.',
        distractorBreakdown: {
          B: 'Data Wrangler visually cleans and prepares tabular data, but does not calculate SHAP explainability.',
          C: 'Model Cards document governance metadata, but Clarify generates the quantitative bias and explainability metrics.',
          D: 'AI Service Cards document AWS 1P managed services (like Rekognition), not custom models.'
        }
      },
      {
        id: 't3-q2',
        domain: 'Security & Governance',
        subtopic: 'KMS Encryption for Bedrock',
        scenario: 'A company is creating custom fine-tuned models in Amazon Bedrock and requires that all model artifacts and training data be encrypted using a customer managed key (CMK). Which AWS service manages this key?',
        options: {
          A: 'AWS Key Management Service (AWS KMS)',
          B: 'Amazon Inspector',
          C: 'Amazon Macie',
          D: 'AWS Secrets Manager'
        },
        correctAnswer: 'A',
        explanation: 'AWS KMS creates, manages, and audits customer managed keys (CMKs) used to encrypt Bedrock custom models and S3 training data at rest.',
        distractorBreakdown: {
          B: 'Amazon Inspector scans EC2 and container images for software vulnerabilities.',
          C: 'Amazon Macie discovers sensitive PII inside S3 buckets.',
          D: 'AWS Secrets Manager manages database credentials and API passwords.'
        }
      },
      {
        id: 't3-q3',
        domain: 'Traditional ML',
        subtopic: 'Regularization',
        scenario: 'An ML model performs well on training data but does not accurately predict customer churn on new unseen test data. Which hyperparameter adjustment will help prevent this overfitting?',
        options: {
          A: 'Decrease the regularization parameter',
          B: 'Increase the regularization parameter',
          C: 'Add more complex polynomial features',
          D: 'Train the model for more epochs'
        },
        correctAnswer: 'B',
        explanation: 'Increasing the regularization parameter (L1/L2) penalizes large model weights, reducing model complexity and variance to prevent overfitting.',
        distractorBreakdown: {
          A: 'Decreasing regularization allows the model to become more complex, exacerbating overfitting.',
          C: 'Adding more complex polynomial features increases model variance and overfitting.',
          D: 'Training for more epochs on overfit data causes further memorization of training noise.'
        }
      },
      {
        id: 't3-q4',
        domain: 'GenAI & Bedrock',
        subtopic: 'Vector Databases - Aurora pgvector',
        scenario: 'A company wants to store and perform similarity search on text embeddings within an existing enterprise relational PostgreSQL database. Which AWS database service with an extension meets this?',
        options: {
          A: 'Amazon Athena',
          B: 'Amazon Aurora PostgreSQL with pgvector',
          C: 'Amazon Redshift Serverless',
          D: 'Amazon EMR'
        },
        correctAnswer: 'B',
        explanation: 'Amazon Aurora PostgreSQL supports the pgvector extension, allowing storage of high-dimensional vector embeddings and approximate nearest neighbor (ANN) vector similarity searches via standard SQL.',
        distractorBreakdown: {
          A: 'Athena is an interactive query engine for S3 files.',
          C: 'Redshift is a columnar data warehouse for analytics.',
          D: 'Amazon EMR runs big data frameworks like Apache Spark and Hadoop.'
        }
      },
      {
        id: 't3-q5',
        domain: 'Traditional ML',
        subtopic: 'Decision Trees & Explainability',
        scenario: 'A genetics lab wants to classify genes into 20 categories. Regulators require complete transparency into how the internal rules and splits of the model reach each classification. Which algorithm is best?',
        options: {
          A: 'Decision trees',
          B: 'Linear regression',
          C: 'Support Vector Machines with RBF kernel',
          D: 'Deep neural networks'
        },
        correctAnswer: 'A',
        explanation: 'Decision trees provide white-box transparency: every prediction follows an explicit, human-readable hierarchy of if-then feature threshold splits.',
        distractorBreakdown: {
          B: 'Linear regression predicts continuous numeric values, not 20 discrete categories.',
          C: 'SVM with RBF kernel is a complex non-linear black box projection.',
          D: 'Deep neural networks have millions of matrix weights, making internal split tracing opaque.'
        }
      }
    ]
  },
  {
    testId: 'test-2',
    title: 'Practice Test 2',
    description: 'Human Workforce Evaluation, Trainium Trn instances, GANs, Sampling Bias, Asynchronous Inference',
    questions: [
      {
        id: 't2-q1',
        domain: 'Security & Governance',
        subtopic: 'Sustainability & AWS Trainium',
        scenario: 'A company wants to pre-train a proprietary foundation model while minimizing the carbon footprint and environmental energy consumption of the training cluster. Which EC2 instance family is specifically designed for this?',
        options: {
          A: 'Amazon EC2 C series (Compute Optimized)',
          B: 'Amazon EC2 G series (Graphics)',
          C: 'Amazon EC2 P series',
          D: 'Amazon EC2 Trn series (AWS Trainium)'
        },
        correctAnswer: 'D',
        explanation: 'Amazon EC2 Trn instances are powered by custom AWS Trainium chips purpose-built to deliver high performance for deep learning training with optimal energy efficiency.',
        distractorBreakdown: {
          A: 'C series instances use standard CPUs, which are extremely inefficient for training billion-parameter neural networks.',
          B: 'G series instances are balanced GPU instances primarily used for graphics and inference.',
          C: 'P series instances use NVIDIA GPUs, which consume substantial power compared to custom Trainium silicon.'
        }
      },
      {
        id: 't2-q2',
        domain: 'Traditional ML',
        subtopic: 'Synthetic Data with GANs',
        scenario: 'A company needs to generate realistic synthetic images that preserve the statistical distribution of medical training data without exposing patient records. Which type of generative model is designed for this?',
        options: {
          A: 'Generative Adversarial Network (GAN)',
          B: 'XGBoost',
          C: 'Residual Neural Network (ResNet)',
          D: 'K-Means clustering'
        },
        correctAnswer: 'A',
        explanation: 'Generative Adversarial Networks (GANs) pit a generator network against a discriminator network to synthesize realistic tabular or image data that mimics real training data.',
        distractorBreakdown: {
          B: 'XGBoost is a gradient-boosted decision tree algorithm for tabular prediction.',
          C: 'ResNet is a discriminative convolutional neural network used for image classification.',
          D: 'K-Means is an unsupervised clustering algorithm.'
        }
      },
      {
        id: 't2-q3',
        domain: 'Responsible AI',
        subtopic: 'Sampling Bias',
        scenario: 'A security camera ML model flags individuals of a specific demographic group for potential shoplifting at a disproportionately higher rate than other shoppers because the training data lacked diverse shoppers. What type of bias is this?',
        options: {
          A: 'Measurement bias',
          B: 'Sampling bias',
          C: 'Observer bias',
          D: 'Confirmation bias'
        },
        correctAnswer: 'B',
        explanation: 'Sampling bias occurs when the collected training dataset does not represent the real-world population distribution fairly, resulting in skewed algorithmic predictions.',
        distractorBreakdown: {
          A: 'Measurement bias arises from faulty data collection equipment or miscalibrated sensors.',
          C: 'Observer bias occurs when human annotators record what they expect to see.',
          D: 'Confirmation bias happens when researchers search for results that affirm pre-existing beliefs.'
        }
      },
      {
        id: 't2-q4',
        domain: 'Traditional ML',
        subtopic: 'SageMaker Asynchronous Inference',
        scenario: 'A company uses SageMaker to process large payloads up to 1 GB with long inference processing times (up to 15 minutes per request). Which SageMaker inference option is designed for this?',
        options: {
          A: 'Batch transform',
          B: 'Real-time inference',
          C: 'Serverless inference',
          D: 'Asynchronous inference'
        },
        correctAnswer: 'D',
        explanation: 'SageMaker Asynchronous Inference queues incoming requests with payload sizes up to 1 GB and processing times up to 1 hour, auto-scaling to zero when idle.',
        distractorBreakdown: {
          A: 'Batch transform is for offline datasets stored in S3, not dynamic HTTP request queues.',
          B: 'Real-time inference has a 6 MB payload limit and a 60-second timeout.',
          C: 'Serverless inference has a 4 MB payload limit and a 60-second timeout.'
        }
      },
      {
        id: 't2-q5',
        domain: 'Traditional ML',
        subtopic: 'SageMaker Feature Store',
        scenario: 'Multiple data science teams across an organization need a centralized catalog to discover, share, and reuse curated feature vectors for both offline model training and low-latency real-time inference. Which service should they use?',
        options: {
          A: 'Amazon SageMaker Feature Store',
          B: 'Amazon SageMaker Data Wrangler',
          C: 'Amazon SageMaker Clarify',
          D: 'Amazon SageMaker Model Cards'
        },
        correctAnswer: 'A',
        explanation: 'SageMaker Feature Store provides a purpose-built repository to store, share, and retrieve ML features across teams with dual online (low latency) and offline (batch training) stores.',
        distractorBreakdown: {
          B: 'Data Wrangler visually cleans and transforms tabular datasets.',
          C: 'SageMaker Clarify checks datasets for bias and calculates explainability.',
          D: 'SageMaker Model Cards document model governance and factsheets.'
        }
      }
    ]
  },
  {
    testId: 'test-1',
    title: 'Practice Test 1',
    description: 'Partial Dependence Plots (PDPs), Transfer Learning, Prompt Injection Defense, Generative AI Scoping Matrix',
    questions: [
      {
        id: 't1-q1',
        domain: 'Responsible AI',
        subtopic: 'Explainability - Partial Dependence Plots',
        scenario: 'An AI practitioner is writing a model governance report for business executives. They need to graphically illustrate the marginal effect of changing a single feature (e.g. income) on the model\'s predicted loan probability. What should they include?',
        options: {
          A: 'Model training code repository',
          B: 'Partial Dependence Plots (PDPs)',
          C: 'Sample raw training data rows',
          D: 'Gradient descent convergence tables'
        },
        correctAnswer: 'B',
        explanation: 'Partial Dependence Plots (PDPs) plot the marginal relationship between one or two features and the predicted target outcome, providing visual interpretability for stakeholders.',
        distractorBreakdown: {
          A: 'Source code does not explain mathematical relationships between features and predictions.',
          C: 'Raw data rows do not convey how the trained algorithm weighs individual feature changes.',
          D: 'Convergence tables show numerical optimization progress during training, not prediction explainability.'
        }
      },
      {
        id: 't1-q2',
        domain: 'Traditional ML',
        subtopic: 'Transfer Learning',
        scenario: 'A company wants to build a custom computer vision model for identifying manufacturing defects. Rather than collecting millions of images and training from scratch, they want to reuse weights from a model pre-trained on ImageNet. Which technique is this?',
        options: {
          A: 'Transfer learning',
          B: 'Unsupervised clustering',
          C: 'Reinforcement learning',
          D: 'Random hyperparameter tuning'
        },
        correctAnswer: 'A',
        explanation: 'Transfer learning leverages features and weights learned from a broad source task/dataset (e.g. ImageNet) and fine-tunes them for a specific target task with a smaller labeled dataset.',
        distractorBreakdown: {
          B: 'Unsupervised clustering groups unlabeled points without pre-trained model weights.',
          C: 'Reinforcement learning optimizes actions through trial-and-error rewards.',
          D: 'Hyperparameter tuning finds optimal configuration parameters, it does not transfer learned weights.'
        }
      },
      {
        id: 't1-q3',
        domain: 'Security & Governance',
        subtopic: 'Generative AI Security Scoping Matrix',
        scenario: 'According to the AWS Generative AI Security Scoping Matrix, which solution scope places the HIGHEST level of security and compliance responsibility on the customer?',
        options: {
          A: 'Consuming an existing third-party SaaS enterprise app with embedded AI',
          B: 'Calling a managed foundation model via Bedrock API',
          C: 'Fine-tuning a foundation model using business data on Bedrock',
          D: 'Training a proprietary foundation model from scratch on custom data'
        },
        correctAnswer: 'D',
        explanation: 'Training a model from scratch gives the customer full ownership and maximum responsibility for data curation, architecture, security, infrastructure, and compliance controls.',
        distractorBreakdown: {
          A: 'Third-party SaaS places the vast majority of infrastructure, application, and model responsibility on the SaaS vendor.',
          B: 'Consuming Bedrock API relies on AWS for hosting, infrastructure, and base model safety.',
          C: 'Fine-tuning shares responsibility: AWS manages base model and infrastructure; customer manages tuning data.'
        }
      },
      {
        id: 't1-q4',
        domain: 'AWS AI Services',
        subtopic: 'Amazon Transcribe',
        scenario: 'A call center records thousands of customer calls daily in WAV audio format. The business needs to convert these audio recordings into searchable text transcripts for sentiment analysis. Which service performs this audio-to-text conversion?',
        options: {
          A: 'Amazon Transcribe',
          B: 'Amazon Comprehend',
          C: 'Amazon Polly',
          D: 'Amazon Textract'
        },
        correctAnswer: 'A',
        explanation: 'Amazon Transcribe is an automated speech recognition (ASR) service that converts spoken audio into written text transcripts with timestamps.',
        distractorBreakdown: {
          B: 'Amazon Comprehend analyzes text that has already been transcribed, but cannot process raw audio files directly.',
          C: 'Amazon Polly converts written text into spoken audio (Text-to-Speech).',
          D: 'Amazon Textract extracts text from scanned PDFs and document images.'
        }
      },
      {
        id: 't1-q5',
        domain: 'GenAI & Bedrock',
        subtopic: 'Prompting - Few-Shot Learning',
        scenario: 'A company prompts an LLM on Bedrock: "Here are 3 examples of customer reviews paired with their sentiment label: [Ex 1], [Ex 2], [Ex 3]. Now classify this new review: [Review]". Which technique is being used?',
        options: {
          A: 'Zero-shot prompting',
          B: 'Few-shot prompting',
          C: 'Pre-training',
          D: 'RLHF'
        },
        correctAnswer: 'B',
        explanation: 'Few-shot prompting provides a small number (typically 2 to 5) of demonstration input-output examples directly inside the prompt context to establish the desired output pattern.',
        distractorBreakdown: {
          A: 'Zero-shot provides instructions with zero demonstration examples.',
          C: 'Pre-training is the foundational training of base weights on massive web data.',
          D: 'RLHF is fine-tuning using human preference rankings to align model behavior.'
        }
      }
    ]
  }
];

export function getAllPracticeQuestions(): Question[] {
  return PRACTICE_TESTS.flatMap(t => t.questions);
}

