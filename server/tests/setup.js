/**
 * Test setup file.
 * Set test environment variables before running tests.
 */

process.env.PORT = '5001';
process.env.NODE_ENV = 'test';
process.env.GEMINI_API_KEY = 'test-key';
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_SERVICE_KEY = 'test-service-key';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing';

// Suppress logs during tests
process.env.LOG_LEVEL = 'error';
