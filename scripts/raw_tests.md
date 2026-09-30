# Practice Test 7

1. A company is using large language models (LLMs) to develop online tutoring applications. The company needs to apply configurable safeguards to the LLMs. These safeguards must ensure that the LLMs follow standard safety rules when creating applications. Which solution will meet these requirements with the LEAST effort?
    - A. Amazon Bedrock playgrounds
    - B. Amazon SageMaker Clarify
    - C. Amazon Bedrock Guardrails
    - D. Amazon SageMaker Jumpstart

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: C

      Explanation: Amazon Bedrock Guardrails provide configurable safeguards that enforce standard safety rules on large language models (LLMs) with minimal effort, making it easy to ensure safe and compliant AI application development.
    </details>

2. A company is exploring Amazon Nova models in Amazon Bedrock. The company needs a multimodal model that supports multiple languages. Which Nova model will meet these requirements MOST cost-effectively?
    - A. Nova Lite
    - B. Nova Pro
    - C. Nova Canvas
    - D. Nova Reel

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: A

      Explanation:   Nova Lite is a multimodal model in Amazon Bedrock that supports multiple languages andis designed the most cost-effective option among the Nova models, making it suitable for organizations seeking efficient, scalable, and economical
    </details>

3. A company is building a new generative AI chatbot. The chatbot uses an Amazon Bedrock foundation model (FM) to generate responses. During testing, the company notices that the chatbot is prone to prompt injection attacks. What can the company do to secure the chatbot with the LEAST implementation effort?
    - A. Fine-tune the FM to avoid harmful responses.
    - B. Use Amazon Bedrock Guardrails content filters and denied topics.
    - C. Change the FM to a more secure FM.
    - D. Use chain-of-thought prompting to produce secure responses.

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: B

      Explanation: Using Amazon Bedrock Guardrails' content filters and denied topics is the quickest and least effort solution to mitigate prompt injection attacks. These guardrails can be configured without model retraining, helping to automatically filter or block unsafe prompts and responses.
    </details>

4. What does inference refer to in the context of AI?
    - A. The process of creating new AI algorithms
    - B. The use of a trained model to make predictions or decisions on unseen data
    - C. The process of combining multiple AI models into one model
    - D. The method of collecting training data for AI systems

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: B

      Explanation: Inference in AI refers to applying a trained model to new, unseen data to generate predictions or decisions, leveraging the patterns learned during training.
    </details>

5. A company wants to build an AI assistant to provide responses to user queries. The AI assistant must evaluate specific data sources, query external APIs, generate response options, and compare and prioritize response options. Which Amazon Bedrock feature or resource will meet these requirements?
    - A. Prompt Management
    - B. Response streaming
    - C. Knowledge Bases
    - D. Agents

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: D

      Explanation: Amazon Bedrock Agents enable AI assistants to interact with specific data sources, query external APIs, generate and compare response options, and prioritize results, making them the ideal feature for building advanced, task-oriented chatbots with decision-making and orchestration capabilities.
    </details>

6. An AI practitioner notices a large language model (LLM) is generating different responses for the same input across multiple invocations. Which risk of AI does this describe?
    - A. Hallucinations
    - B. Nondeterminism
    - C. Accuracy
    - D. Multimodality

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: B

      Explanation: Nondeterminism refers to the property where a large language model generates different responses for the same input due to inherent randomness or stochasticity in the generation process. This can lead to varying outputs on multiple invocations with identical inputs.
    </details>

7. A company is building a generative AI application on AWS. The application will help improve reading comprehension for students. The application must give students the ability to add illustrations to stories. Which solution will meet this requirement?
    - A. Use Amazon Bedrock Stable Diffusion 3.5 Large to generate images based on text inputs.
    - B. Use Amazon Polly to create an audiobook based on story texts.
    - C. Use Amazon Rekognition to analyze image contents and detect text attributes.
    - D. Create a standard prompt template. Use Amazon Q Business to illustrate stories.

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: A

      Explanation: Amazon Bedrock Stable Diffusion 3.5 Large is a generative AI model designed to create high-quality images from text prompts, allowing students to add custom illustrations to their stories and enhancing reading comprehension through visual aids.
    </details>

8. A healthcare company wants to analyze patient data. The data was gathered over the previous year to detect patterns in disease outbreaks. The company needs to create a trend analysis report for each month to present to public health officials. The company must provide insights into patient data from the most recent month of the current year. Which inference method will meet these requirements MOST cost-effectively?
    - A. Real-time inference
    - B. Batch transform
    - C. Serverless inference
    - D. Asynchronous inference

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: B

      Explanation: Batch transform is the most cost-effective inference method for analyzing large amounts of data collected over a period (such as monthly patient data). It allows you to process and generate reports on all historical data in batches, rather than incurring the higher costs of real-time or serverless inference.
    </details>

9. A company acquires International Organization for Standardization (ISO) accreditation to manage AI risks and to use AI responsibly. What does this accreditation reflect about the company?
    - A. All members of the company are ISO certified.
    - B. All AI systems that the company uses are ISO certified.
    - C. All AI application team members are ISO certified.
    - D. The company’s development framework is ISO certified.

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: D

      Explanation: ISO accreditation for managing AI risks means that the company’s development processes, controls, and frameworks for AI are certified to meet ISO standards. It does not certify individual employees or AI systems, but rather the organizational framework and practices.
    </details>

10. A company is developing an ML model to predict heart disease risk. The model uses patient data, such as age, cholesterol, blood pressure, smoking status, and exercise habits. The dataset includes a target value that indicates whether a patient has heart disease. Which ML technique will meet these requirements?
    - A. Unsupervised learning
    - B. Supervised learning
    - C. Reinforcement learning
    - D. Semi-supervised learning

    <details markdown=1><summary markdown="span">Answer</summary>
      Correct answer: B

      Explanation: Supervised learning is used when the dataset includes both input features (like age, cholesterol, blood pressure, etc.) and a target value indicating the presence of heart disease. The model learns to predict the target value from labeled examples.
    </details>
