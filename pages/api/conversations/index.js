/**
 * UNIDAR � Conversations API
 * GET  /api/conversations  � list all conversations for current user
 * POST /api/conversations  � create/get conversation with another user
 */
import { query }       from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = requireAuth(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET')  return await getConversations(req, res, user);
    if (req.method === 'POST') return await createConversation(req, res, user);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Conversations error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getConversations(req, res, user) {
  const rows = await query(`
    SELECT c.id, c.updated_at,
           u.id as other_user_id, u.full_name as other_user_name,
           (SELECT m.message FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message,
           (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = c.id AND m.receiver_id = ? AND m.is_read = 0) as unread_count
    FROM conversations c
    JOIN users u ON (u.id = CASE WHEN c.user1_id = ? THEN c.user2_id ELSE c.user1_id END)
    WHERE c.user1_id = ? OR c.user2_id = ?
    ORDER BY c.updated_at DESC
  `, [user.id, user.id, user.id, user.id]);

  return res.json({ success: true, conversations: rows });
}

async function createConversation(req, res, user) {
  const { other_user_id } = req.body;
  if (!other_user_id) return res.status(400).json({ error: 'other_user_id required' });

  // Check if conversation already exists
  const existing = await query(`
    SELECT id FROM conversations
    WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)
    LIMIT 1
  `, [user.id, other_user_id, other_user_id, user.id]);

  if (existing.length) return res.json({ success: true, conversation_id: existing[0].id });

  const result = await query('INSERT INTO conversations (user1_id, user2_id) VALUES (?, ?)', [user.id, other_user_id]);
  return res.status(201).json({ success: true, conversation_id: result.insertId });
}
