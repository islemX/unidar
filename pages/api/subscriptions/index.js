/**
 * UNIDAR � Subscriptions API
 * GET  /api/subscriptions         � get my active subscription
 * GET  /api/subscriptions?all=1   � all subscriptions (admin)
 * POST /api/subscriptions         � create subscription
 */
import { query }       from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

const PRICES = { yearly: 25.00 };

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      if (req.query.all) {
        const user = requireAuth(req, res);
        if (!user || user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
        return await getAllSubscriptions(req, res);
      }
      const user = requireAuth(req, res);
      if (!user) return;
      return await getMine(req, res, user);
    }
    if (req.method === 'POST') {
      const user = requireAuth(req, res);
      if (!user) return;
      return await createSubscription(req, res, user);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Subscriptions error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getMine(req, res, user) {
  const rows = await query(`
    SELECT * FROM subscriptions
    WHERE user_id = ? AND status = 'active' AND expires_at > NOW()
    ORDER BY expires_at DESC LIMIT 1
  `, [user.id]);
  return res.json({
    subscription_status: rows.length ? 'active' : 'none',
    subscription: rows[0] || null
  });
}

async function createSubscription(req, res, user) {
  const { plan = 'yearly', payment_method = 'card', card_number = '' } = req.body;

  if (!PRICES[plan]) return res.status(400).json({ error: 'Invalid plan.' });

  const amount   = PRICES[plan];
  const cardLast4 = card_number.replace(/\D/g, '').slice(-4) || null;
  const now      = new Date();
  const exp      = new Date(now);
  exp.setFullYear(exp.getFullYear() + 1);

  const toMysql = d => d.toISOString().slice(0, 19).replace('T', ' ');

  // Cancel existing active subscriptions
  await query("UPDATE subscriptions SET status='cancelled' WHERE user_id=? AND status='active'", [user.id]);

  const result = await query(
    `INSERT INTO subscriptions (user_id, plan, amount, status, starts_at, expires_at, payment_method, card_last4)
     VALUES (?, ?, ?, 'active', ?, ?, ?, ?)`,
    [user.id, plan, amount, toMysql(now), toMysql(exp), payment_method, cardLast4]
  );

  return res.status(201).json({
    success:    true,
    message:    'Subscription activated successfully',
    plan, amount,
    expires_at: toMysql(exp)
  });
}

async function getAllSubscriptions(req, res) {
  const rows = await query(`
    SELECT s.*, u.full_name, u.email
    FROM subscriptions s
    JOIN users u ON s.user_id = u.id
    ORDER BY s.created_at DESC LIMIT 100
  `);
  return res.json({ subscriptions: rows });
}
