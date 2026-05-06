const GeminiService = require('./geminiService');
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

    // Validate exam has required data
    if (!exam.rubric || exam.rubric.trim() === '') {
      logger.warn(`Exam ${examId} has no rubric. Evaluation may fail.`);
    }

    if (!exam.questions || exam.questions.length === 0) {
      logger.warn(`Exam ${examId} has no questions. Evaluation may fail.`);
    }

    const previousStatus = exam.status;
    await ExamModel.updateStatus(examId, 'evaluating');

    const results = [];
    const errors = [];

    for (let i = 0; i < answerFiles.length; i++) {
      const file = answerFiles[i];
      try {
        // Delay between files to avoid Gemini API rate limits
        if (i > 0) {
          logger.info(`Waiting 5s before next evaluation to avoid rate limits...`);
          await new Promise(r => setTimeout(r, 5000));
        }
        const result = await this.evaluateSingle(exam, file);
        results.push(result);
      } catch (err) {
        logger.error(`Failed to evaluate ${file.originalname}`, { error: err.message, stack: err.stack });
        errors.push({ file: file.originalname, error: err.message });
      }
    }

    // Clean up uploaded files
    PdfService.cleanup(answerFiles.map((f) => f.path));

    // Determine final status considering existing evaluations
    let finalStatus;
    if (results.length > 0) {
      // At least one new file succeeded
      finalStatus = 'completed';
    } else if (previousStatus === 'completed') {
      // All new files failed but exam had previous results
      finalStatus = 'completed';
    } else {
      finalStatus = 'failed';
    }
    await ExamModel.updateStatus(examId, finalStatus);

    logger.info(`Batch complete: ${results.length} succeeded, ${errors.length} failed. Final status: ${finalStatus}`, {
      examId,
      totalFiles: answerFiles.length,
      successCount: results.length,
      failureCount: errors.length,
      errors: errors.length > 0 ? errors.map(e => e.error).join('; ') : 'none',
    });

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

      logger.info(`Evaluating ${file.originalname}: subject=${exam.subject}, totalMarks=${exam.total_marks}, rubricLength=${exam.rubric?.length || 0}, questionsLength=${(exam.questions || []).length}`);

      // Call Gemini
      logger.info(`Calling Gemini API with ${images.length} image(s)...`);
      const rawResponse = await GeminiService.evaluate(prompt, images);
      logger.info(`Received response from Gemini (${rawResponse.length} chars)`);
      
      // Log response preview
      logger.info(`Response preview: ${rawResponse.substring(0, 300)}`);

      const parsed = parseEvaluationResponse(rawResponse);

      if (!parsed.success) {
        logger.error(`Failed to parse response for ${file.originalname}: ${parsed.error}`);
        throw new Error(`Response parsing failed: ${parsed.error}`);
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
      logger.error(`Evaluation error for ${file.originalname}`, {
        error: err.message,
        studentName: studentInfo.name,
        rollNumber: studentInfo.rollNumber,
        examId: exam.id,
        stack: err.stack,
      });

      await EvaluationModel.updateWithResults(evaluation.id, {
        results: null,
        totalMarks: 0,
        feedback: `Error: ${err.message}`,
        status: 'failed',
      });
      throw err;
    }
  },
};

module.exports = EvaluationService;
