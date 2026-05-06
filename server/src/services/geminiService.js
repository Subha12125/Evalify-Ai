const genAI = require('../config/gemini');
const logger = require('../utils/logger');
const { GEMINI_API_KEY } = require('../config/env');

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 60000; // 60 seconds
const CALL_TIMEOUT_MS = 120000; // 120 seconds

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error(`Gemini API timed out after ${ms / 1000}s`)), ms)
    ),
  ]);
}

const GeminiService = {
  /**
   * Send images + prompt to Gemini Vision API for evaluation.
   * @param {string} prompt - The evaluation prompt text
   * @param {Array<{type: string, data: string}>} images - Base64 encoded images
   * @returns {string} Raw text response from Gemini
   */
  async evaluate(prompt, images = []) {
    // Validate API key
    if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
      throw new Error('GEMINI_API_KEY is not configured. Please add it to your .env file.');
    }

    if (GEMINI_API_KEY.length < 20) {
      throw new Error('GEMINI_API_KEY appears to be invalid (too short). Please check your .env file.');
    }

    const parts = [];

    // Add images as inline data
    for (const img of images) {
      logger.info(`Adding image to request: type=${img.type}, size=${img.data.length} chars`);
      parts.push({
        inlineData: {
          mimeType: img.type,
          data: img.data,
        },
      });
    }

    // Add text prompt
    parts.push({ text: prompt });

    logger.info(`Sending ${images.length} image(s) + prompt (${prompt.length} chars) to Gemini for evaluation`);

    // Try each model with retries
    for (const modelName of MODELS) {
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          logger.info(`Trying ${modelName} (attempt ${attempt}/${MAX_RETRIES})...`);
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await withTimeout(model.generateContent(parts), CALL_TIMEOUT_MS);
          const response = result.response;
          const text = response.text();

          if (!text || text.trim() === '') {
            throw new Error('Empty response from Gemini. The model may have rejected the input.');
          }

          logger.info(`Gemini response received (model: ${modelName}, ${text.length} chars)`);
          logger.debug(`Response preview: ${text.substring(0, 300)}...`);
          
          return text;
        } catch (err) {
          const errMsg = err.message || '';
          const isRateLimit = errMsg.includes('429') || errMsg.includes('quota') || errMsg.includes('Too Many Requests') || errMsg.includes('RESOURCE_EXHAUSTED');
          const isOverloaded = errMsg.includes('503') || errMsg.includes('Service Unavailable') || errMsg.includes('high demand');
          const isAuthError = errMsg.includes('UNAUTHENTICATED') || errMsg.includes('401') || errMsg.includes('invalid API key') || errMsg.includes('API key');

          logger.warn(`Gemini error on ${modelName} attempt ${attempt}: ${errMsg.substring(0, 200)}`);

          if (isAuthError) {
            throw new Error(`Gemini API authentication failed. Check your GEMINI_API_KEY in .env file. Details: ${errMsg.substring(0, 100)}`);
          }

          if ((isRateLimit || isOverloaded) && attempt < MAX_RETRIES) {
            const delaySeconds = RETRY_DELAY_MS / 1000;
            logger.warn(`${isOverloaded ? 'Overloaded (503)' : 'Rate limited (429)'}. Retrying in ${delaySeconds}s (attempt ${attempt}/${MAX_RETRIES})...`);
            await sleep(RETRY_DELAY_MS);
            continue;
          }

          if (isRateLimit || isOverloaded) {
            logger.warn(`${isOverloaded ? 'Overloaded' : 'Rate limited'} on ${modelName}, trying next model...`);
            break;
          }

          // Non-rate-limit error, throw immediately
          throw err;
        }
      }
    }

    throw new Error('All Gemini models exhausted. Service is overloaded or quota exceeded. Please try again later.');
  },

  /**
   * Extract questions from a question paper image.
   */
  async extractQuestions(images, prompt) {
    return this.evaluate(prompt, images);
  },
};

module.exports = GeminiService;
