-- ============================================
-- Evalify AI: Quota & Subscription Tables
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter',
  promo_code TEXT,
  daily_limit INTEGER NOT NULL DEFAULT 50,
  active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Promo codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'starter',
  daily_limit INTEGER NOT NULL DEFAULT 50,
  duration_days INTEGER NOT NULL DEFAULT 30,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Insert demo promo code "OPENFREE"
INSERT INTO promo_codes (code, plan, daily_limit, duration_days, active)
VALUES ('OPENFREE', 'professional', 100, 30, true)
ON CONFLICT (code) DO NOTHING;

-- 4. Disable RLS for service role access
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_all" ON subscriptions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "promo_codes_all" ON promo_codes FOR ALL USING (true) WITH CHECK (true);
