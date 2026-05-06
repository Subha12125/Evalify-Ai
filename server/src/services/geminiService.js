const ai = require('../config/gemini');
const logger = require('../utils/logger');
const { GEMINI_API_KEY } = require('../config/env');

const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 10000; // 10 seconds (reduced from 60s)
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

/**
 * Extract a human-readable error message from Gemini SDK errors.
 * The new @google/genai SDK may throw errors with JSON bodies.
 */
function extractErrorInfo(err) {
  const msg = err.message || '';
  const status = err.status || err.httpStatusCode || 0;
  
  // Try to parse JSON error body from the message
  let parsedMsg = msg;
  try {
    const jsonBody = JSON.parse(msg);
    if (jsonBody?.error?.message) {
      parsedMsg = jsonBody.error.message;
    }
  } catch {
    // Not JSON, use as-is
  }

  const combined = `${parsedMsg} ${status}`;
  
  return {
    message: parsedMsg,
    status,
    isRateLimit: combined.includes('429') || combined.includes('quota') || combined.includes('Too Many Requests') || combined.includes('RESOURCE_EXHAUSTED'),
    isOverloaded: combined.includes('503') || combined.includes('Service Unavailable') || combined.includes('high demand'),
    isAuthError: combined.includes('UNAUTHENTICATED') || combined.includes('401') || combined.includes('invalid API key') || combined.includes('API_KEY_INVALID'),
    isQuotaZero: combined.includes('limit: 0'),
  };
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

    // Build contents array for the new SDK
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

          // New @google/genai SDK: use ai.models.generateContent()
          const result = await withTimeout(
            ai.models.generateContent({
              model: modelName,
              contents: [{ role: 'user', parts }],
            }),
            CALL_TIMEOUT_MS
          );

          // New SDK: response.text is a property, not a function
          const text = result.text;

          if (!text || text.trim() === '') {
            throw new Error('Empty response from Gemini. The model may have rejected the input.');
          }

          logger.info(`Gemini response received (model: ${modelName}, ${text.length} chars)`);
          logger.debug(`Response preview: ${text.substring(0, 300)}...`);
          
          return text;
        } catch (err) {
          const errInfo = extractErrorInfo(err);

          logger.warn(`Gemini error on ${modelName} attempt ${attempt}: ${errInfo.message.substring(0, 300)}`);

          if (errInfo.isAuthError) {
            throw new Error(`Gemini API authentication failed. Check your GEMINI_API_KEY in .env file.`);
          }

          // If quota is completely zero, don't waste time retrying — fail fast
          if (errInfo.isQuotaZero) {
            logger.error(`API quota is ZERO for ${modelName}. Trying next model immediately...`);
            break;
          }

          if ((errInfo.isRateLimit || errInfo.isOverloaded) && attempt < MAX_RETRIES) {
            const delaySeconds = RETRY_DELAY_MS / 1000;
            logger.warn(`${errInfo.isOverloaded ? 'Overloaded (503)' : 'Rate limited (429)'}. Retrying in ${delaySeconds}s (attempt ${attempt}/${MAX_RETRIES})...`);
            await sleep(RETRY_DELAY_MS);
            continue;
          }

          if (errInfo.isRateLimit || errInfo.isOverloaded) {
            logger.warn(`${errInfo.isOverloaded ? 'Overloaded' : 'Rate limited'} on ${modelName}, trying next model...`);
            break;
          }

          // Non-rate-limit error, throw immediately
          throw new Error(`Gemini API error: ${errInfo.message.substring(0, 200)}`);
        }
      }
    }

    throw new Error('All Gemini models exhausted. Your API quota may be exceeded. Please check your billing at https://ai.google.dev or try again later.');
  },

  /**
   * Extract questions from a question paper image.
   */
  async extractQuestions(images, prompt) {
    return this.evaluate(prompt, images);
  },
};

module.exports = GeminiService;
