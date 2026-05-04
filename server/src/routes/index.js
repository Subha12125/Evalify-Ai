const { Router } = require('express');
const authRoutes = require('./auth.routes');
const examRoutes = require('./exam.routes');
const evaluateRoutes = require('./evaluate.routes');
const resultsRoutes = require('./results.routes');
const quotaRoutes = require('./quota.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/exams', examRoutes);
router.use('/evaluate', evaluateRoutes);
router.use('/results', resultsRoutes);
router.use('/quota', quotaRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
