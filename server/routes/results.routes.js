const { Router } = require('express');
const { getResults, getStudentResult, exportCSV, exportPDF } = require('../controllers/results.controller');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.use(authenticate);

router.get('/:examId', getResults);
router.get('/:examId/student/:studentId', getStudentResult);
router.get('/:examId/export/csv', exportCSV);
router.get('/:examId/export/pdf', exportPDF);

module.exports = router;
