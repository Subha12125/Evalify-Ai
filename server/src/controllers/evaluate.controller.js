const EvaluationService = require('../services/evaluationService');
const EvaluationModel = require('../models/evaluation.model');
const logger = require('../utils/logger');

/**
 * POST /api/evaluate
 * Upload answer sheets and start evaluation.
 */
async function startEvaluation(req, res, next) {
  try {
    const { examId } = req.body;

    if (!examId) {
      return res.status(400).json({ error: 'examId is required' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'At least one answer sheet file is required' });
    }

    logger.info(`Starting evaluation for exam ${examId} with ${req.files.length} answer sheets`);

    // Process in background - send immediate response
    const batchResult = await EvaluationService.processBatch(examId, req.files);

    res.json({
      message: 'Evaluation complete',
      ...batchResult,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/evaluate/status/:examId
 * Get evaluation progress for an exam.
 */
async function getEvaluationStatus(req, res, next) {
  try {
    const { examId } = req.params;

    const counts = await EvaluationModel.countByStatus(examId);
    const evaluations = await EvaluationModel.findByExam(examId);

    res.json({
      examId,
      counts,
      total: evaluations.length,
      evaluations: evaluations.map((e) => ({
        id: e.id,
        studentName: e.students?.name || 'Unknown',
        rollNumber: e.students?.roll_number || 'N/A',
        status: e.status,
        marksAwarded: e.total_marks_awarded,
        evaluatedAt: e.evaluated_at,
      })),
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { startEvaluation, getEvaluationStatus };
