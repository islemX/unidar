/**
 * UNIDAR – Messages API
 * GET  /api/messages?conversation_id=X   – get messages
 * GET  /api/messages?action=unread_count  – total unread count
 * POST /api/messages                      – send message
 * POST /api/messages?action=block         – block user
 * PUT  /api/messages                      – mark as read
 */
import { query }      from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = requireAuth(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      if (req.query.action === 'unread_count') return await getUnreadCount(req, res, user);
      if (req.query.conversation_id || req.query.conversation || req.query.id) return await getMessages(req, res, user);
      return res.json({ success: true, messages: [] });
    }
    if (req.method === 'POST') {
      if (req.query.action === 'block') return await blockUser(req, res, user);
      return await sendMessage(req, res, user);
    }
    if (req.method === 'PUT') return await markAsRead(req, res, user);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Messages error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getMessages(req, res, user) {
  const convId = parseInt(req.query.conversation_id || req.query.conversation || req.query.id);
  if (!convId) return res.status(400).json({ error: 'Conversation ID required' });

  const convRows = await query('SELECT user1_id, user2_id FROM conversations WHERE id = ?', [convId]);
  const conv = convRows[0];
  if (!conv || (conv.user1_id !== user.id && conv.user2_id !== user.id)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const otherUserId = conv.user1_id === user.id ? conv.user2_id : conv.user1_id;
  const otherRows = await query('SELECT full_name FROM users WHERE id = ?', [otherUserId]);
  const otherUserName = otherRows[0]?.full_name || 'User';

  const messages = await query(`
    SELECT m.*, u.full_name as sender_name
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.conversation_id = ?
    ORDER BY m.created_at ASC
  `, [convId]);

  return res.json({ success: true, messages, other_user_name: otherUserName });
}

async function sendMessage(req, res, user) {
  const convId  = parseInt(req.body?.conversation_id || req.query.conversation_id);
  const message = (req.body?.message || '').trim();
  if (!convId || !message) return res.status(400).json({ error: 'Missing fields' });

  const convRows = await query('SELECT user1_id, user2_id FROM conversations WHERE id = ?', [convId]);
  const conv = convRows[0];
  if (!conv || (conv.user1_id !== user.id && conv.user2_id !== user.id)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  const receiverId = conv.user1_id === user.id ? conv.user2_id : conv.user1_id;

  const blocked = await query('SELECT 1 FROM blocked_users WHERE blocker_id = ? AND blocked_id = ? LIMIT 1', [receiverId, user.id]);
  if (blocked.length) return res.status(403).json({ error: 'You cannot message this user' });

  await query('INSERT INTO messages (conversation_id, sender_id, receiver_id, message) VALUES (?, ?, ?, ?)',
              [convId, user.id, receiverId, message]);
  await query('UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?', [convId]);

  return res.json({ success: true });
}

async function markAsRead(req, res, user) {
  const convId = parseInt(req.body?.conversation_id || req.query.conversation_id || req.query.conversation || req.query.id);
  if (!convId) return res.status(400).json({ error: 'Conversation ID required' });
  await query('UPDATE messages SET is_read = 1, read_at = CURRENT_TIMESTAMP WHERE conversation_id = ? AND receiver_id = ? AND is_read = 0',
              [convId, user.id]);
  return res.json({ success: true });
}

async function getUnreadCount(req, res, user) {
  const rows = await query('SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0', [user.id]);
  return res.json({ success: true, count: parseInt(rows[0].count) });
}

async function blockUser(req, res, user) {
  const targetId = parseInt(req.body?.user_id);
  if (!targetId) return res.status(400).json({ error: 'Target user ID required' });
  if (targetId === user.id) return res.status(400).json({ error: 'You cannot block yourself' });
  await query('INSERT IGNORE INTO blocked_users (blocker_id, blocked_id) VALUES (?, ?)', [user.id, targetId]);
  return res.json({ success: true });
}
