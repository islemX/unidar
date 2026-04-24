/**
 * UNIDAR � One-time DB migrations
 * GET /api/admin/migrate � runs safe, idempotent ALTER statements
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

  // 5. Widen signature path columns to TEXT (Vercel Blob URLs can exceed varchar(500))
  try {
    await query(`ALTER TABLE contracts MODIFY COLUMN student_signature_path TEXT DEFAULT NULL`);
    await query(`ALTER TABLE contracts MODIFY COLUMN owner_signature_path TEXT DEFAULT NULL`);
    results.push('contracts signature path columns widened to TEXT');
  } catch (e) {
    results.push('contracts signature paths: ' + e.message);
  }

  // 6. Create termination_requests table if missing
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS termination_requests (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        contract_id   INT NOT NULL,
        requester_id  INT NOT NULL,
        reason        TEXT DEFAULT NULL,
        status        ENUM('pending','approved','rejected') DEFAULT 'pending',
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uniq_contract (contract_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    results.push('termination_requests table created or already exists');
  } catch (e) {
    results.push('termination_requests: ' + e.message);
  }

  // 7. Backfill: insert termination_requests rows for contracts that fell back to status='termination_requested'
  try {
    await query(`
      INSERT IGNORE INTO termination_requests (contract_id, requester_id, reason, status)
      SELECT c.id, c.student_id, 'Requested via dashboard', 'pending'
      FROM contracts c
      WHERE c.status = 'termination_requested'
    `);
    results.push('termination_requests backfilled from contracts.status');
  } catch (e) {
    results.push('termination_requests backfill: ' + e.message);
  }

  return res.json({ success: true, results });
}
