const { Router } = require('express');
const { createExam, getExams, getExam, deleteExam, extractQuestions } = require('../controllers/exam.controller');
const { authenticate } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = Router();

router.use(authenticate);

router.post('/', createExam);
router.get('/', getExams);
router.get('/:id', getExam);
router.delete('/:id', deleteExam);
router.post('/extract-questions', upload.single('questionPaper'), extractQuestions);

module.exports = router;
