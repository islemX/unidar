/**
 * UNIDAR � Auth API (Dynamic Actions)
 */
import { query } from '../../../lib/db';
import { signToken, clearToken, verifyToken } from '../../../lib/auth';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  const { action } = req.query;

  try {
    if (req.method === 'POST' && action === 'register') return await handleRegister(req, res);
    if (req.method === 'POST' && action === 'login')    return await handleLogin(req, res);
    if (action === 'logout') return handleLogout(req, res);
    if (action === 'check') return await handleCheck(req, res);
    
    return res.status(400).json({ error: 'Invalid action: ' + action });
  } catch (err) {
    console.error('Auth API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleRegister(req, res) {
  const { email, password, full_name, role = 'student', gender } = req.body;
  
  if (!email || !password || !full_name) return res.status(400).json({ error: 'Missing required fields' });

  const existing = await query('SELECT id FROM users WHERE email = ?', [email]);
  if (existing.length > 0) return res.status(409).json({ error: 'Email already registered' });

  const hashed = await bcrypt.hash(password, 10);
  const result = await query(
    `INSERT INTO users (email, password, full_name, role, gender, status)
     VALUES (?, ?, ?, ?, ?, 'active')`,
    [email, hashed, full_name, role, gender || null]
  );

  const userId = result.insertId;
  const user   = { id: userId, role, email, full_name };
  signToken(res, user);

  return res.status(201).json({ success: true, user });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const rows = await query(
    'SELECT id, email, password, full_name, role, status FROM users WHERE email = ?',
    [email]
  );
  const user = rows[0];
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
  if (user.status !== 'active') return res.status(403).json({ error: 'Account disabled' });

  signToken(res, user);
  return res.json({ success: true, user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role } });
}

function handleLogout(req, res) {
  clearToken(res);
  return res.json({ success: true });
}

async function handleCheck(req, res) {
  const payload = verifyToken(req);
  if (!payload) return res.json({ authenticated: false });

  const rows = await query(`
    SELECT u.id, u.email, u.full_name, u.role, u.university,
           (SELECT status FROM verifications
            WHERE user_id = u.id ORDER BY id DESC LIMIT 1) as verification_status,
           (SELECT CASE WHEN COUNT(*) > 0 THEN 'active' ELSE 'none' END
            FROM subscriptions
            WHERE user_id = u.id AND status = 'active' AND expires_at > NOW()) as subscription_status
    FROM users u WHERE u.id = ?
  `, [payload.id]);

  return res.json({ authenticated: true, user: rows[0] || null });
}
