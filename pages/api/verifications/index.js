/**
 * UNIDAR – Verifications API
 * GET  /api/verifications          – get my verification (student) or list all (admin)
 * POST /api/verifications          – submit verification (student)
 * PUT  /api/verifications?id=X     – approve/reject (admin only)
 */
import { query }                      from '../../../lib/db';
import { requireAuth, requireRole }   from '../../../lib/auth';
import formidable                      from 'formidable';
import fs                              from 'fs';
import path                            from 'path';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const user = requireAuth(req, res);
  if (!user) return;

  // Manual body parsing for non-POST requests since bodyParser is false
  if (req.method === 'PUT' || req.method === 'PATCH') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      req.body = JSON.parse(Buffer.concat(chunks).toString());
    } catch (e) {
      req.body = {};
    }
  }

  try {
    if (req.method === 'GET') {
      if (user.role === 'admin') return await getAll(req, res);
      return await getMine(req, res, user);
    }
    if (req.method === 'POST') return await submit(req, res, user);
    if (req.method === 'PUT')  {
      if (user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
      return await review(req, res, user);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Verifications error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAll(req, res) {
  const status = req.query.status || 'pending';
  const rows = await query(`
    SELECT v.*, u.email, u.full_name, u.university
    FROM verifications v
    JOIN users u ON v.user_id = u.id
    WHERE v.status = ? ORDER BY v.submitted_at DESC
  `, [status]);
  return res.json({ verifications: rows });
}

async function getMine(req, res, user) {
  const rows = await query('SELECT * FROM verifications WHERE user_id = ? ORDER BY id DESC LIMIT 1', [user.id]);
  return res.json({ verification: rows[0] || null });
}

async function submit(req, res, user) {
  if (user.role !== 'student') return res.status(403).json({ error: 'Students only' });

  const pending = await query("SELECT id FROM verifications WHERE user_id = ? AND status = 'pending'", [user.id]);
  if (pending.length) return res.status(409).json({ error: 'Verification already pending' });

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'verifications');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ uploadDir, keepExtensions: true, maxFileSize: 5 * 1024 * 1024 });

  const { files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, _, f) => err ? reject(err) : resolve({ files: f }));
  });

  const studentIdFile  = files.student_id_file?.[0]  || files.student_id_file;
  const nationalIdFile = files.national_id_file?.[0] || files.national_id_file;

  if (!studentIdFile || !nationalIdFile) {
    return res.status(400).json({ error: 'Both files are required' });
  }

  const toDbPath = (f) => 'uploads/verifications/' + path.basename(f.filepath || f.path);

  await query('INSERT INTO verifications (user_id, student_id_file, national_id_file) VALUES (?, ?, ?)',
              [user.id, toDbPath(studentIdFile), toDbPath(nationalIdFile)]);

  return res.status(201).json({ success: true, message: 'Verification submitted successfully' });
}

async function review(req, res, user) {
  const id = req.query.id;
  if (!id) return res.status(400).json({ error: 'Verification ID required' });

  const { action, rejection_reason = null } = req.body;
  if (!['approve', 'reject'].includes(action)) return res.status(400).json({ error: 'Invalid action' });

  const rows = await query('SELECT user_id FROM verifications WHERE id = ?', [id]);
  if (!rows.length) return res.status(404).json({ error: 'Verification not found' });

  const status = action === 'approve' ? 'approved' : 'rejected';
  await query("UPDATE verifications SET status=?, reviewed_by=?, reviewed_at=NOW(), rejection_reason=? WHERE id=?",
              [status, user.id, rejection_reason, id]);

  const actionType = action === 'approve' ? 'verify_user' : 'reject_verification';
  await query('INSERT INTO admin_actions (admin_id, action_type, target_user_id, notes) VALUES (?, ?, ?, ?)',
              [user.id, actionType, rows[0].user_id, rejection_reason]);

  return res.json({ success: true });
}
