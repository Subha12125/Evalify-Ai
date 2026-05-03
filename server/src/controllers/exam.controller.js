const ExamModel = require('../models/exam.model');
const GeminiService = require('../services/geminiService');
const PdfService = require('../services/pdfService');
const { buildQuestionExtractionPrompt } = require('../utils/promptBuilder');
const { parseEvaluationResponse } = require('../utils/parser');
const logger = require('../utils/logger');

/**
 * POST /api/exams
 */
async function createExam(req, res, next) {
  try {
    const { title, subject, totalMarks, questions, rubric } = req.body;

    if (!title || !subject || !totalMarks) {
      return res.status(400).json({ error: 'Title, subject, and totalMarks are required' });
    }

    const exam = await ExamModel.create({
      title,
      subject,
      totalMarks: parseInt(totalMarks, 10),
      questions: questions || [],
      rubric: rubric || '',
      createdBy: req.user.id,
    });

    logger.info(`Exam created: ${title} by ${req.user.email}`);
    res.status(201).json({ exam });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/exams
 */
async function getExams(req, res, next) {
  try {
    const exams = await ExamModel.findByUser(req.user.id);
    res.json({ exams });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/exams/:id
 */
async function getExam(req, res, next) {
  try {
    const exam = await ExamModel.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    res.json({ exam });
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/exams/:id
 */
async function deleteExam(req, res, next) {
  try {
    await ExamModel.delete(req.params.id);
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/exams/extract-questions
 * Upload question paper image and extract questions via AI.
 */
async function extractQuestions(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Question paper file is required' });
    }

    const images = await PdfService.filesToBase64([req.file.path]);
    const prompt = buildQuestionExtractionPrompt();
    const rawResponse = await GeminiService.extractQuestions(images, prompt);
    const parsed = parseEvaluationResponse(rawResponse);

    // Cleanup
    PdfService.cleanup([req.file.path]);

    if (!parsed.success) {
      return res.status(422).json({ error: 'Failed to extract questions', details: parsed.error });
    }

    res.json({ questions: parsed.data });
  } catch (err) {
    if (req.file) PdfService.cleanup([req.file.path]);
    next(err);
  }
}

module.exports = { createExam, getExams, getExam, deleteExam, extractQuestions };
