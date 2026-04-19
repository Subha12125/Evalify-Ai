const ClaudeService = require('./claudeService');
const PdfService = require('./pdfService');
const EvaluationModel = require('../models/evaluation.model');
const StudentModel = require('../models/student.model');
const ResultModel = require('../models/result.model');
const ExamModel = require('../models/exam.model');
const { buildEvaluationPrompt } = require('../utils/promptBuilder');
const { parseEvaluationResponse, extractStudentInfo } = require('../utils/parser');
const logger = require('../utils/logger');

const EvaluationService = {
  /**
   * Process a batch of answer sheets for an exam.
   * @param {string} examId - Exam ID
   * @param {Array} answerFiles - Array of multer file objects
   */
  async processBatch(examId, answerFiles) {
    const exam = await ExamModel.findById(examId);
    if (!exam) throw new Error('Exam not found');

    await ExamModel.updateStatus(examId, 'evaluating');

    const results = [];
    const errors = [];

    for (const file of answerFiles) {
      try {
        const result = await this.evaluateSingle(exam, file);
        results.push(result);
      } catch (err) {
        logger.error(`Failed to evaluate ${file.originalname}`, { error: err.message });
        errors.push({ file: file.originalname, error: err.message });
      }
    }

    // Clean up uploaded files
    PdfService.cleanup(answerFiles.map((f) => f.path));

    // Update exam status
    const finalStatus = errors.length === answerFiles.length ? 'failed' : 'completed';
    await ExamModel.updateStatus(examId, finalStatus);

    return {
      examId,
      total: answerFiles.length,
      successful: results.length,
      failed: errors.length,
      results,
      errors,
    };
  },

  /**
   * Evaluate a single answer sheet.
   */
  async evaluateSingle(exam, file) {
    const studentInfo = extractStudentInfo(file.originalname);

    // Create or get student record
    const student = await StudentModel.upsert({
      rollNumber: studentInfo.rollNumber,
      name: studentInfo.name,
      examId: exam.id,
    });

    // Create evaluation record
    const evaluation = await EvaluationModel.create({
      examId: exam.id,
      studentId: student.id,
      status: 'processing',
    });

    try {
      // Convert answer sheet to base64
      const images = await PdfService.filesToBase64([file.path]);

      // Build prompt
      const prompt = buildEvaluationPrompt({
        subject: exam.subject,
        totalMarks: exam.total_marks,
        questions: exam.questions || [],
        rubric: exam.rubric,
      });

      // Call Claude
      const rawResponse = await ClaudeService.evaluate(prompt, images);
      const parsed = parseEvaluationResponse(rawResponse);

      if (!parsed.success) {
        throw new Error(parsed.error);
      }

      // Store result
      const result = await ResultModel.create({
        examId: exam.id,
        studentId: student.id,
        evaluationId: evaluation.id,
        questionResults: parsed.data.studentAnswers,
        totalMarksAwarded: parsed.data.totalMarksAwarded,
        totalMaxMarks: parsed.data.totalMaxMarks,
        overallFeedback: parsed.data.overallFeedback,
      });

      // Mark evaluation complete
      await EvaluationModel.updateWithResults(evaluation.id, {
        results: parsed.data,
        totalMarks: parsed.data.totalMarksAwarded,
        feedback: parsed.data.overallFeedback,
        status: 'completed',
      });

      logger.info(`Evaluated ${file.originalname}: ${parsed.data.totalMarksAwarded}/${parsed.data.totalMaxMarks}`);

      return {
        student: studentInfo,
        marksAwarded: parsed.data.totalMarksAwarded,
        maxMarks: parsed.data.totalMaxMarks,
        resultId: result.id,
      };
    } catch (err) {
      await EvaluationModel.updateWithResults(evaluation.id, {
        results: null,
        totalMarks: 0,
        feedback: err.message,
        status: 'failed',
      });
      throw err;
    }
  },
};

module.exports = EvaluationService;
