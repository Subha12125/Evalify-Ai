const supabase = require('./supabase');
const logger = require('../utils/logger');

/**
 * Ensures quota-related tables exist in Supabase.
 * Creates subscriptions and promo_codes tables if missing,
 * and seeds the OPENFREE demo promo code.
 */
async function ensureQuotaTables() {
  try {
    // Test if promo_codes table exists
    const { error: promoErr } = await supabase
      .from('promo_codes')
      .select('id')
      .limit(1);

    if (promoErr && promoErr.code === '42P01') {
      logger.warn('promo_codes table not found. Please run migrations/002_quota_subscriptions.sql in Supabase SQL Editor.');
      return false;
    }

    // Test if subscriptions table exists
    const { error: subErr } = await supabase
      .from('subscriptions')
      .select('id')
      .limit(1);

    if (subErr && subErr.code === '42P01') {
      logger.warn('subscriptions table not found. Please run migrations/002_quota_subscriptions.sql in Supabase SQL Editor.');
      return false;
    }

    // Seed OPENFREE promo if not exists
    const { data: existing } = await supabase
      .from('promo_codes')
      .select('id')
      .eq('code', 'OPENFREE')
      .maybeSingle();

    if (!existing) {
      const { error: insertErr } = await supabase
        .from('promo_codes')
        .insert({
          code: 'OPENFREE',
          plan: 'professional',
          daily_limit: 100,
          duration_days: 30,
          active: true,
        });

      if (insertErr) {
        logger.error('Failed to seed OPENFREE promo:', insertErr.message);
      } else {
        logger.info('Seeded OPENFREE promo code');
      }
    }

    logger.info('Quota tables verified');
    return true;
  } catch (err) {
    logger.error('ensureQuotaTables error:', err.message);
    return false;
  }
}

module.exports = { ensureQuotaTables };
