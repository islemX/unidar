/**
 * UNIDAR � Admin Payments API
 * GET /api/admin/payments
 */
import { query }       from '../../../lib/db';
import { requireRole } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = requireRole(req, res, 'admin');
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const period = String(req.query.period || 'all');
      let where = '';
      if (period === 'today') where = 'WHERE p.created_at >= CURDATE()';
      else if (period === 'week') where = 'WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)';
      else if (period === 'month') where = 'WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)';

      const rows = await query(`
        SELECT p.*,
               u.full_name as student_name, u.email as student_email,
               o.full_name as owner_name, o.email as owner_email,
               c.listing_id, l.title as listing_title, l.address as listing_address,
               ROUND((p.amount * 0.05), 3) as commission
        FROM payments p
        JOIN users u ON p.user_id = u.id
        JOIN contracts c ON p.contract_id = c.id
        JOIN listings l ON c.listing_id = l.id
        JOIN users o ON c.owner_id = o.id
        ${where}
        ORDER BY p.created_at DESC
        LIMIT 200
      `).catch(() => []);
      return res.json({ payments: rows });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Admin payments error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
