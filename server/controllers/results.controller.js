const ResultModel = require('../models/result.model');
const ExportService = require('../services/exportService');
const logger = require('../utils/logger');

/**
 * GET /api/results/:examId
 */
async function getResults(req, res, next) {
  try {
    const { examId } = req.params;

    const results = await ResultModel.findByExam(examId);
    const stats = await ResultModel.getExamStats(examId);

    res.json({ results, stats });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/results/:examId/student/:studentId
 */
async function getStudentResult(req, res, next) {
  try {
    const { examId, studentId } = req.params;

    const result = await ResultModel.findByStudentAndExam(studentId, examId);

    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.json({ result });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/results/:examId/export/csv
 */
async function exportCSV(req, res, next) {
  try {
    const { examId } = req.params;
    const csv = await ExportService.toCSV(examId);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=results-${examId}.csv`);
    res.send(csv);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/results/:examId/export/pdf
 */
async function exportPDF(req, res, next) {
  try {
    const { examId } = req.params;
    const pdfData = await ExportService.toPDFData(examId);

    // Send structured data for client-side PDF generation
    res.json(pdfData);
  } catch (err) {
    next(err);
  }
}

module.exports = { getResults, getStudentResult, exportCSV, exportPDF };
