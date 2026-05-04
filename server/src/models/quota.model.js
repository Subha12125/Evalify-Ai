const supabase = require('../config/supabase');

const FREE_DAILY_LIMIT = 3;

const QuotaModel = {
  /**
   * Get today's usage count for a user.
   * Counts evaluations created today for exams owned by this user.
   */
  async getTodayUsage(userId) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    try {
      // Get user's exam IDs
      const { data: exams, error: examErr } = await supabase
        .from('exams')
        .select('id')
        .eq('created_by', userId);

      if (examErr || !exams || exams.length === 0) return 0;

      const examIds = exams.map(e => e.id);

      const { count, error } = await supabase
        .from('evaluations')
        .select('id', { count: 'exact', head: true })
        .in('exam_id', examIds)
        .gte('created_at', todayStart.toISOString());

      if (error) return 0;
      return count || 0;
    } catch {
      return 0;
    }
  },

  /**
   * Get user's subscription info.
   * Returns { plan, promoApplied, expiresAt } or null if free tier.
   */
  async getSubscription(userId) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('active', true)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  /**
   * Apply a promo code for a user.
   */
  async applyPromo(userId, code) {
    // Validate promo code
    const { data: promo, error: promoError } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .maybeSingle();

    if (promoError) throw promoError;
    if (!promo) return { success: false, message: 'Invalid or expired promo code' };

    // Check if already used by this user
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .eq('promo_code', code.toUpperCase())
      .maybeSingle();

    if (existing) return { success: false, message: 'Promo code already used' };

    // Create subscription from promo
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (promo.duration_days || 30));

    const { data: sub, error: subError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        plan: promo.plan || 'starter',
        promo_code: code.toUpperCase(),
        daily_limit: promo.daily_limit || 50,
        active: true,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (subError) throw subError;
    return { success: true, subscription: sub, message: `${promo.plan || 'Starter'} plan activated!` };
  },

  /**
   * Get daily limit for a user.
   */
  async getDailyLimit(userId) {
    const sub = await this.getSubscription(userId);
    if (sub && new Date(sub.expires_at) > new Date()) {
      return sub.daily_limit || 999;
    }
    return FREE_DAILY_LIMIT;
  },

  /**
   * Check if user can evaluate (has remaining quota).
   * Returns { allowed, used, limit, remaining }
   */
  async checkQuota(userId) {
    const [used, limit] = await Promise.all([
      this.getTodayUsage(userId),
      this.getDailyLimit(userId),
    ]);

    return {
      allowed: used < limit,
      used,
      limit,
      remaining: Math.max(0, limit - used),
    };
  },
};

module.exports = QuotaModel;
