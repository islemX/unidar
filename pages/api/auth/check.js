/**
 * UNIDAR � Auth Check (dedicated endpoint)
 * GET /api/auth/check
 */
import { query } from '../../../lib/db';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const payload = verifyToken(req);
    if (!payload) return res.json({ authenticated: false });

    const rows = await query(`
      SELECT u.id, u.email, u.full_name, u.role, u.university,
             (SELECT status FROM verifications
              WHERE user_id = u.id ORDER BY id DESC LIMIT 1) as verification_status,
             (SELECT expires_at
              FROM subscriptions
              WHERE user_id = u.id AND status = 'active'
              ORDER BY id DESC
              LIMIT 1) as subscription_expires_at,
             COALESCE(
              (SELECT CASE
                WHEN expires_at > NOW() THEN 'active'
                ELSE 'expired'
              END
               FROM subscriptions
               WHERE user_id = u.id AND status = 'active'
               ORDER BY id DESC
               LIMIT 1),
              'none'
             ) as subscription_status
      FROM users u WHERE u.id = ?
    `, [payload.id]);

    return res.json({ authenticated: true, user: rows[0] || null });
  } catch (err) {
    console.error('CheckAuth error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
