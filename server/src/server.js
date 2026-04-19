const { PORT } = require('./config/env');
const app = require('./app');
const logger = require('./utils/logger');

app.listen(PORT, () => {
  logger.info(`🚀 Evalify AI server running on port ${PORT}`);
  logger.info(`📡 Health check: http://localhost:${PORT}/api/health`);
});
