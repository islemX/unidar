/**
 * UNIDAR � Reports API
 * GET  /api/reports        � list my reports (student) or all (admin)
 * POST /api/reports        � submit a report
 */
import { query }       from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = requireAuth(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      if (user.role === 'admin') {
        const rows = await query(`
          SELECT r.*, u.full_name as reporter_name, u.email as reporter_email
          FROM reports r JOIN users u ON r.reporter_id = u.id
          ORDER BY r.created_at DESC
        `).catch(() => []);
        return res.json({ reports: rows });
      }
      const rows = await query('SELECT * FROM reports WHERE reporter_id = ? ORDER BY created_at DESC', [user.id]).catch(() => []);
      return res.json({ reports: rows });
    }

    if (req.method === 'POST') {
      const { reported_user_id, listing_id, reason, description = '' } = req.body;
      if (!reason) return res.status(400).json({ error: 'Reason is required' });

      await query(`INSERT INTO reports (reporter_id, reported_user_id, listing_id, reason, description, status)
                   VALUES (?, ?, ?, ?, ?, 'open')`,
                  [user.id, reported_user_id || null, listing_id || null, reason, description]).catch(() => {});
      return res.status(201).json({ success: true });
    }

    if (req.method === 'PUT') {
      if (user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
      const id = req.query.id;
      const { action, notes = '' } = req.body;
      if (!id) return res.status(400).json({ error: 'Report ID required' });

      // Update report status
      const status = action === 'resolve' ? 'resolved' : 'reviewed';
      await query('UPDATE reports SET status = ? WHERE id = ?', [status, id]);

      // Log admin action
      await query('INSERT INTO admin_actions (admin_id, action_type, target_report_id, notes) VALUES (?, ?, ?, ?)',
                  [user.id, 'resolve_report', id, notes]);

      return res.json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Reports error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
