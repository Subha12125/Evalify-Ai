const genAI = require('../config/gemini');
const logger = require('../utils/logger');

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 45000; // 45 seconds
const CALL_TIMEOUT_MS = 60000; // 60 seconds

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
    const parts = [];

    // Add images as inline data
    for (const img of images) {
      parts.push({
        inlineData: {
          mimeType: img.type,
          data: img.data,
        },
      });
    }

    // Add text prompt
    parts.push({ text: prompt });

    logger.info(`Sending ${images.length} image(s) to Gemini for evaluation`);

    // Try each model with retries
    for (const modelName of MODELS) {
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          logger.info(`Trying ${modelName} (attempt ${attempt}/${MAX_RETRIES})...`);
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await withTimeout(model.generateContent(parts), CALL_TIMEOUT_MS);
          const response = result.response;
          const text = response.text();

          if (!text) {
            throw new Error('No text response from Gemini');
          }

          logger.info(`Gemini response received (model: ${modelName}, ${text.length} chars)`);
          return text;
        } catch (err) {
          const errMsg = err.message || '';
          const isRateLimit = errMsg.includes('429') || errMsg.includes('quota') || errMsg.includes('Too Many Requests') || errMsg.includes('RESOURCE_EXHAUSTED');

          logger.warn(`Gemini error on ${modelName} attempt ${attempt}: ${errMsg.substring(0, 200)}`);

          if (isRateLimit && attempt < MAX_RETRIES) {
            logger.warn(`Rate limited. Retrying in ${RETRY_DELAY_MS / 1000}s...`);
            await sleep(RETRY_DELAY_MS);
            continue;
          }

          if (isRateLimit) {
            logger.warn(`Rate limited on ${modelName}, trying next model...`);
            break;
          }

          // Non-rate-limit error, throw immediately
          throw err;
        }
      }
    }

    throw new Error('All Gemini models exhausted. API quota exceeded.');
  },

  /**
   * Extract questions from a question paper image.
   */
  async extractQuestions(images, prompt) {
    return this.evaluate(prompt, images);
  },
};

module.exports = GeminiService;
