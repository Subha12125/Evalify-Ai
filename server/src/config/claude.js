const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY } = require('./env');

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

module.exports = genAI;
