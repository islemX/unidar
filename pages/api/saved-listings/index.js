/**
 * UNIDAR – Saved Listings API
 * GET    /api/saved-listings         – list saved listings
 * POST   /api/saved-listings         – save a listing
 * DELETE /api/saved-listings?id=X    – unsave
 */
import { query }       from '../../../lib/db';
import { requireAuth } from '../../../lib/auth';

export default async function handler(req, res) {
  const user = requireAuth(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const rows = await query(`
        SELECT l.*, u.full_name as owner_name,
               (SELECT image_path FROM listing_images WHERE listing_id = l.id ORDER BY display_order LIMIT 1) as thumbnail
        FROM saved_listings sl
        JOIN listings l ON sl.listing_id = l.id
        JOIN users u ON l.owner_id = u.id
        WHERE sl.user_id = ? AND l.status = 'active'
        ORDER BY sl.created_at DESC
      `, [user.id]);
      return res.json({ saved_listings: rows });
    }

    if (req.method === 'POST') {
      const { listing_id } = req.body;
      if (!listing_id) return res.status(400).json({ error: 'listing_id required' });
      await query('INSERT IGNORE INTO saved_listings (user_id, listing_id) VALUES (?, ?)', [user.id, listing_id]);
      return res.json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'listing id required' });
      await query('DELETE FROM saved_listings WHERE user_id = ? AND listing_id = ?', [user.id, id]);
      return res.json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Saved listings error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
