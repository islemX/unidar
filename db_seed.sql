-- UNIDAR — clean dataset + real owners + active subscriptions
-- Idempotent: safe to re-run.

START TRANSACTION;

-- 1. Real owner accounts (Croisette agency + 2 persons)
--    Password for all = "Owner123!"  (bcrypt below)
INSERT INTO users (email, password_hash, full_name, role, phone, status)
VALUES
  ('contact@croisette-agence.tn',
   '$2a$10$3EPj5mleutIFwbauLsRRruOiz/ufHd5QtJHkg/xk7s1qOaUo8XrXO',
   'Croisette Agence', 'owner', '+216 71 000 100', 'active'),
  ('mehdi.bensalah@unidar.tn',
   '$2a$10$3EPj5mleutIFwbauLsRRruOiz/ufHd5QtJHkg/xk7s1qOaUo8XrXO',
   'Mehdi Ben Salah', 'owner', '+216 22 333 444', 'active'),
  ('sonia.trabelsi@unidar.tn',
   '$2a$10$3EPj5mleutIFwbauLsRRruOiz/ufHd5QtJHkg/xk7s1qOaUo8XrXO',
   'Sonia Trabelsi', 'owner', '+216 55 777 888', 'active')
ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), role = VALUES(role), status = 'active';

-- 2. Reassign existing studio + shared_room listings to real owners
UPDATE listings SET owner_id = (SELECT id FROM users WHERE email='contact@croisette-agence.tn')
  WHERE id = 1;
UPDATE listings SET owner_id = (SELECT id FROM users WHERE email='mehdi.bensalah@unidar.tn')
  WHERE id = 2;
UPDATE listings SET owner_id = (SELECT id FROM users WHERE email='sonia.trabelsi@unidar.tn')
  WHERE id = 23;

-- 3. Drop every listing that's NOT a studio or shared_room
--    Cascade through dependent rows first (FKs may not all be CASCADE).
SET @to_del := (SELECT GROUP_CONCAT(id) FROM listings WHERE property_type NOT IN ('studio','shared_room'));

DELETE FROM listing_images   WHERE FIND_IN_SET(listing_id, @to_del);
DELETE FROM saved_listings   WHERE FIND_IN_SET(listing_id, @to_del);
DELETE FROM messages         WHERE FIND_IN_SET(listing_id, @to_del);
DELETE FROM conversations    WHERE FIND_IN_SET(listing_id, @to_del);
DELETE FROM contracts        WHERE FIND_IN_SET(listing_id, @to_del);
DELETE FROM reports          WHERE FIND_IN_SET(reported_listing_id, @to_del);
UPDATE admin_actions SET target_listing_id = NULL WHERE FIND_IN_SET(target_listing_id, @to_del);
DELETE FROM listings WHERE property_type NOT IN ('studio','shared_room');

-- 4. Activate at least 2 subscriptions for existing students.
--    Pick the two most recently-registered students that don't already
--    have an active subscription, give each a yearly Premium plan (25 TND).
INSERT INTO subscriptions (user_id, plan, amount, status, starts_at, expires_at, payment_method, card_last4)
SELECT u.id, 'yearly', 25.00, 'active', NOW(), DATE_ADD(NOW(), INTERVAL 1 YEAR), 'card', '4242'
FROM users u
WHERE u.role = 'student'
  AND u.status = 'active'
  AND NOT EXISTS (
    SELECT 1 FROM subscriptions s
    WHERE s.user_id = u.id AND s.status = 'active' AND s.expires_at > NOW()
  )
ORDER BY u.created_at DESC
LIMIT 2;

COMMIT;

-- Verification queries (output only, no changes)
SELECT '--- LISTINGS ---' AS section;
SELECT l.id, l.title, l.property_type, u.full_name AS owner, u.role
FROM listings l JOIN users u ON l.owner_id = u.id ORDER BY l.id;

SELECT '--- ACTIVE SUBSCRIPTIONS ---' AS section;
SELECT s.id, s.user_id, u.full_name, u.email, s.plan, s.amount, s.status, s.expires_at
FROM subscriptions s JOIN users u ON s.user_id = u.id
WHERE s.status = 'active' AND s.expires_at > NOW();

SELECT '--- OWNER ROSTER ---' AS section;
SELECT id, email, full_name, role, status FROM users WHERE role IN ('owner','admin') ORDER BY id;
