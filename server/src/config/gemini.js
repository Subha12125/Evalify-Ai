const { GoogleGenAI } = require('@google/genai');
const { GEMINI_API_KEY } = require('./env');

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

module.exports = ai;
