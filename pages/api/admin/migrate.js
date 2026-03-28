/**
 * UNIDAR – One-time DB migrations
 * GET /api/admin/migrate — runs safe, idempotent ALTER statements
 * Can be called multiple times without harm.
 */
import { query } from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

export default async function handler(req, res) {
  // Only admins can run migrations
  const user = requireAuth(req, res);
  if (!user) return;
  if (user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'Admin only' });
  }

  const results = [];

  // 1. Expand contracts.status ENUM to include all values used by the API
  try {
    await query(`
      ALTER TABLE contracts
      MODIFY COLUMN status
        ENUM('draft','pending','pending_signature','signed_by_student','signed_by_both',
             'completed','cancelled','active','paid','terminated','termination_requested',
             'expired','rejected')
        DEFAULT 'draft'
    `);
    results.push('contracts.status ENUM expanded');
  } catch (e) {
    results.push('contracts.status: ' + e.message);
  }

  // 2. Add termination_reason column if missing
  try {
    await query(`
      ALTER TABLE contracts
      ADD COLUMN termination_reason TEXT DEFAULT NULL
    `);
    results.push('contracts.termination_reason column added');
  } catch (e) {
    if (e.message.includes('Duplicate column')) {
      results.push('contracts.termination_reason already exists');
    } else {
      results.push('contracts.termination_reason: ' + e.message);
    }
  }

  // 3. Make contract_template_id nullable / have a default (legacy NOT NULL causes INSERT failures)
  try {
    await query(`
      ALTER TABLE contracts
      MODIFY COLUMN contract_template_id INT DEFAULT 0
    `);
    results.push('contracts.contract_template_id now has DEFAULT 0');
  } catch (e) {
    results.push('contracts.contract_template_id: ' + e.message);
  }

  // 4. Make contract_content nullable (filled after INSERT via UPDATE)
  try {
    await query(`
      ALTER TABLE contracts
      MODIFY COLUMN contract_content TEXT DEFAULT NULL
    `);
    results.push('contracts.contract_content now nullable');
  } catch (e) {
    results.push('contracts.contract_content: ' + e.message);
  }

  return res.json({ success: true, results });
}
