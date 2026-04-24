/**
 * UNIDAR � Admin API
 * GET /api/admin?action=users|stats|reports|verifications
 * POST /api/admin?action=ban-user|unban-user|resolve-report
 * DELETE /api/admin?action=delete-user&id=X
 */
import { query }       from '../../../lib/db';
import { requireRole } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = requireRole(req, res, 'admin');
  if (!user) return;

  const { action } = req.query;

  try {
    if (req.method === 'GET') {
      if (action === 'users')          return await getUsers(req, res);
      if (action === 'stats')          return await getStats(req, res);
      if (action === 'reports')        return await getReports(req, res);
      if (action === 'verifications')  return await getVerifications(req, res);
      if (action === 'listings')       return await getListings(req, res);
      if (action === 'contracts')      return await getContracts(req, res);
      if (action === 'subscriptions')  return await getSubscriptions(req, res);
    }
    if (req.method === 'POST') {
      if (action === 'ban-user')       return await banUser(req, res, user);
      if (action === 'unban-user')     return await unbanUser(req, res, user);
      if (action === 'resolve-report') return await resolveReport(req, res, user);
    }
    if (req.method === 'DELETE' && action === 'delete-user') return await deleteUser(req, res, user);
    return res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('Admin error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getUsers(req, res) {
  const { status, role, search } = req.query;
  const where  = [];
  const params = [];

  if (status) { where.push('status = ?'); params.push(status); }
  if (role)   { where.push('role = ?');   params.push(role); }
  if (search) {
    where.push('(full_name LIKE ? OR email LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }

  const sql = `SELECT id, email, full_name, role, university, status, created_at,
        (SELECT status FROM verifications WHERE user_id = users.id ORDER BY id DESC LIMIT 1) as verification_status
        FROM users ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
        ORDER BY created_at DESC`;

  const users = await query(sql, params);
  return res.json({ users });
}

async function getStats(req, res) {
  const [totalUsers]   = await query("SELECT COUNT(*) as c FROM users");
  const [students]     = await query("SELECT COUNT(*) as c FROM users WHERE role = 'student'");
  const [owners]       = await query("SELECT COUNT(*) as c FROM users WHERE role = 'owner'");
  const [listings]     = await query("SELECT COUNT(*) as c FROM listings WHERE status = 'active'");
  const [contracts]    = await query("SELECT COUNT(*) as c FROM contracts");
  const [pending_verif] = await query("SELECT COUNT(*) as c FROM verifications WHERE status = 'pending'");
  const [open_reports] = await query("SELECT COUNT(*) as c FROM reports WHERE status = 'open'").catch(() => [{ c: 0 }]);
  const [active_subs]  = await query("SELECT COUNT(*) as c FROM subscriptions WHERE status = 'active' AND expires_at > NOW()");
  const [subs_30d]     = await query("SELECT COUNT(*) as c FROM subscriptions WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)").catch(() => [{ c: 0 }]);
  const [payments_30d] = await query("SELECT IFNULL(SUM(amount),0) as s FROM payments WHERE status='completed' AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)").catch(() => [{ s: 0 }]);

  return res.json({
    stats: {
      total_users:    totalUsers.c,
      students:       students.c,
      owners:         owners.c,
      active_listings: listings.c,
      total_contracts: contracts.c,
      pending_verifications: pending_verif.c,
      open_reports:   open_reports.c,
      active_subscriptions: active_subs.c,
      new_subscriptions_30d: subs_30d.c,
      revenue_30d: payments_30d.s,
    }
  });
}

async function getReports(req, res) {
  const rows = await query(`
    SELECT r.*, u.full_name as reporter_name, u.email as reporter_email
    FROM reports r
    JOIN users u ON r.reporter_id = u.id
    ORDER BY r.created_at DESC
  `).catch(() => []);
  return res.json({ reports: rows });
}

async function getVerifications(req, res) {
  const status = req.query.status || 'pending';
  const rows = await query(`
    SELECT v.*, u.email, u.full_name, u.university
    FROM verifications v
    JOIN users u ON v.user_id = u.id
    WHERE v.status = ? ORDER BY v.submitted_at DESC
  `, [status]);
  return res.json({ verifications: rows });
}

async function getListings(req, res) {
  const rows = await query(`
    SELECT l.*, u.full_name as owner_name FROM listings l
    JOIN users u ON l.owner_id = u.id ORDER BY l.created_at DESC
  `);
  return res.json({ listings: rows });
}

async function getContracts(req, res) {
  const rows = await query(`
    SELECT c.*, l.title as listing_title,
           s.full_name as student_name, o.full_name as owner_name
    FROM contracts c
    JOIN listings l ON c.listing_id = l.id
    JOIN users s ON c.student_id = s.id
    JOIN users o ON c.owner_id = o.id
    ORDER BY c.created_at DESC LIMIT 200
  `);
  return res.json({ contracts: rows });
}

async function getSubscriptions(req, res) {
  const status = req.query.status || '';
  const where = [];
  const params = [];
  if (status) { where.push('s.status = ?'); params.push(status); }

  const rows = await query(
    `
    SELECT s.*, u.full_name as user_name, u.email as user_email, u.role as user_role
    FROM subscriptions s
    JOIN users u ON s.user_id = u.id
    ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
    ORDER BY s.created_at DESC
    LIMIT 200
    `,
    params
  ).catch(() => []);

  return res.json({ subscriptions: rows });
}

async function banUser(req, res, admin) {
  const { user_id, reason = '' } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id required' });
  await query("UPDATE users SET status = 'banned' WHERE id = ?", [user_id]);
  await query('INSERT INTO admin_actions (admin_id, action_type, target_user_id, notes) VALUES (?, ?, ?, ?)',
              [admin.id, 'ban_user', user_id, reason]);
  return res.json({ success: true });
}

async function unbanUser(req, res, admin) {
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ error: 'user_id required' });
  await query("UPDATE users SET status = 'active' WHERE id = ?", [user_id]);
  await query('INSERT INTO admin_actions (admin_id, action_type, target_user_id, notes) VALUES (?, ?, ?, ?)',
              [admin.id, 'unban_user', user_id, '']);
  return res.json({ success: true });
}

async function resolveReport(req, res, admin) {
  const { report_id, resolution = '' } = req.body;
  if (!report_id) return res.status(400).json({ error: 'report_id required' });
  await query("UPDATE reports SET status = 'resolved', resolution = ?, resolved_by = ?, resolved_at = NOW() WHERE id = ?",
              [resolution, admin.id, report_id]).catch(() => {});
  return res.json({ success: true });
}

async function deleteUser(req, res, admin) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'User ID required' });
  await query("UPDATE users SET status = 'banned' WHERE id = ?", [id]);
  await query('INSERT INTO admin_actions (admin_id, action_type, target_user_id, notes) VALUES (?, ?, ?, ?)',
              [admin.id, 'delete_user', id, 'Soft deleted']);
  return res.json({ success: true });
}
