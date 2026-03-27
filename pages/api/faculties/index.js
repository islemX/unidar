/**
 * UNIDAR – Faculties API
 * GET /api/faculties
 */
import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });
  try {
    const rows = await query(
      `SELECT id, name, governorate, latitude, longitude
       FROM faculties
       ORDER BY governorate ASC, name ASC`
    ).catch(() => []);
    return res.json({ success: true, faculties: rows });
  } catch (err) {
    console.error('Faculties API error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
