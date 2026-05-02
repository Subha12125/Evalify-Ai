const genAI = require('../config/claude');
const logger = require('../utils/logger');

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 40000; // 40 seconds (API suggests ~35s)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(parts);
          const response = result.response;
          const text = response.text();

          if (!text) {
            throw new Error('No text response from Gemini');
          }

          logger.info(`Gemini evaluation response received (model: ${modelName}, attempt: ${attempt})`);
          return text;
        } catch (err) {
          const isRateLimit = err.message?.includes('429') || err.message?.includes('quota') || err.message?.includes('Too Many Requests');

          if (isRateLimit && attempt < MAX_RETRIES) {
            logger.warn(`Rate limited on ${modelName} (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${RETRY_DELAY_MS / 1000}s...`);
            await sleep(RETRY_DELAY_MS);
            continue;
          }

          if (isRateLimit) {
            logger.warn(`Rate limited on ${modelName}, trying next model...`);
            break; // Try next model
          }

          // Non-rate-limit error, throw immediately
          throw err;
        }
      }
    }

    throw new Error('All Gemini models exhausted. API quota exceeded. Please wait and try again, or upgrade your API plan at https://ai.google.dev/pricing');
  },

  /**
   * Extract questions from a question paper image.
   */
  async extractQuestions(images, prompt) {
    return this.evaluate(prompt, images);
  },
};

module.exports = GeminiService;
