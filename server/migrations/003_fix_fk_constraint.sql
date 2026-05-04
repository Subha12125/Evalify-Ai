-- Fix: Drop the foreign key constraint that references auth.users
-- The app uses a custom "users" table, not auth.users

ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;

-- Verify it works
SELECT * FROM promo_codes WHERE code = 'OPENFREE';
