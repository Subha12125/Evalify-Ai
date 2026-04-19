const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'info'];

function timestamp() {
  return new Date().toISOString();
}

const logger = {
  error(msg, meta = {}) {
    if (currentLevel >= LOG_LEVELS.error) {
      console.error(`[${timestamp()}] ERROR: ${msg}`, Object.keys(meta).length ? meta : '');
    }
  },

  warn(msg, meta = {}) {
    if (currentLevel >= LOG_LEVELS.warn) {
      console.warn(`[${timestamp()}] WARN: ${msg}`, Object.keys(meta).length ? meta : '');
    }
  },

  info(msg, meta = {}) {
    if (currentLevel >= LOG_LEVELS.info) {
      console.log(`[${timestamp()}] INFO: ${msg}`, Object.keys(meta).length ? meta : '');
    }
  },

  debug(msg, meta = {}) {
    if (currentLevel >= LOG_LEVELS.debug) {
      console.log(`[${timestamp()}] DEBUG: ${msg}`, Object.keys(meta).length ? meta : '');
    }
  },
};

module.exports = logger;
