/**
 * UNIDAR – Single Listing API
 * GET    /api/listings/[id]
 * PUT    /api/listings/[id]
 * DELETE /api/listings/[id]
 */
import { query }       from '../../../lib/db';
import { requireAuth, requireRole } from '../../../lib/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  try {
    if (req.method === 'GET')    return await getListing(req, res, id);
    if (req.method === 'PUT')    return await updateListing(req, res, id);
    if (req.method === 'DELETE') return await deleteListing(req, res, id);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Listing [id] error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getListing(req, res, id) {
  const user = requireAuth(req, res);
  if (!user) return;

  // Core query: only listings + users (always exist)
  const rows = await query(`
    SELECT l.*, u.full_name as owner_name, u.email as owner_email
    FROM listings l
    JOIN users u ON l.owner_id = u.id
    WHERE l.id = ?
  `, [id]);

  if (!rows.length) return res.status(404).json({ error: 'Listing not found' });
  const listing = rows[0];

  // Optional queries — wrapped individually so a missing table never kills the whole request
  try {
    const saved = await query('SELECT COUNT(*) as c FROM saved_listings WHERE listing_id = ? AND user_id = ?', [id, user.id]);
    listing.is_saved = !!(saved[0]?.c);
  } catch (_) { listing.is_saved = false; }

  try {
    const occ = await query(`SELECT COUNT(*) as c FROM contracts WHERE listing_id = ?
      AND status IN ('signed_by_student','signed_by_owner','paid','active','completed','completed_student','signed_by_both')
      AND (end_date IS NULL OR end_date >= CURDATE())`, [id]);
    listing.occupant_count  = Number(occ[0]?.c) || 0;
    listing.available_rooms = Math.max(0, (Number(listing.capacity) || 1) - listing.occupant_count);
  } catch (_) { listing.occupant_count = 0; listing.available_rooms = Number(listing.capacity) || 1; }

  try {
    const ver = await query('SELECT status FROM verifications WHERE user_id = ? ORDER BY id DESC LIMIT 1', [listing.owner_id]);
    listing.owner_verified = ver[0]?.status || null;
  } catch (_) { listing.owner_verified = null; }

  try {
    listing.images = await query('SELECT image_path FROM listing_images WHERE listing_id = ? ORDER BY display_order', [id]);
  } catch (_) { listing.images = []; }

  try {
    listing.roommates = await query(`
      SELECT u.id as student_id, u.full_name, rp.gender, rp.cleanliness_level, rp.sleep_schedule, rp.noise_tolerance, rp.guests, rp.pets
      FROM contracts c
      JOIN users u ON c.student_id = u.id
      LEFT JOIN roommate_preferences rp ON u.id = rp.user_id
      WHERE c.listing_id = ? AND c.status IN ('signed_by_student','signed_by_owner','paid','active','completed','completed_student','signed_by_both')
      AND (c.end_date IS NULL OR c.end_date >= CURDATE())
    `, [id]);
  } catch (_) { listing.roommates = []; }

  return res.json({ listing });
}

async function updateListing(req, res, id) {
  const user = requireRole(req, res, 'owner');
  if (!user) return;

  const rows = await query('SELECT owner_id FROM listings WHERE id = ?', [id]);
  if (!rows.length || (rows[0].owner_id !== user.id && user.role !== 'admin')) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const allowed = ['title', 'description', 'address', 'price', 'bedrooms', 'beds_count', 'capacity', 'bathrooms', 'property_type', 'status', 'gender_preference'];
  const updates = [];
  const params  = [];

  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      updates.push(`${field} = ?`);
      params.push(req.body[field]);
    }
  }
  if (req.body.latitude !== undefined && req.body.longitude !== undefined) {
    updates.push('latitude = ?', 'longitude = ?');
    params.push(req.body.latitude, req.body.longitude);
  }
  if (!updates.length) return res.status(400).json({ error: 'No fields to update' });

  params.push(id);
  await query(`UPDATE listings SET ${updates.join(', ')} WHERE id = ?`, params);
  return res.json({ success: true });
}

async function deleteListing(req, res, id) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (user.role === 'owner') {
    const rows = await query('SELECT owner_id FROM listings WHERE id = ?', [id]);
    if (!rows.length || rows[0].owner_id !== user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
  } else if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Not authorized' });
  }

  await query("UPDATE listings SET status = 'removed' WHERE id = ?", [id]);
  return res.json({ success: true });
}
