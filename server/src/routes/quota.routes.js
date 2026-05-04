const { Router } = require('express');
const { getQuota, applyPromo } = require('../controllers/quota.controller');
const { authenticate } = require('../middleware/auth');

const router = Router();

router.use(authenticate);

router.get('/', getQuota);
router.post('/promo', applyPromo);

module.exports = router;
