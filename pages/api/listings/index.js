import { query }       from '../../../lib/db';
import { verifyToken, requireAuth, requireRole } from '../../../lib/auth';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { put } from '@vercel/blob';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  try {
    if (req.method === 'GET')    return await getListings(req, res);
    if (req.method === 'POST')   return await createListing(req, res);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Listings error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getListings(req, res) {
  const payload = verifyToken(req);
  const userId  = payload ? payload.id : 0;

  const where  = ["l.status = 'active'"];
  const params = [userId]; // for is_saved subquery

  if (req.query.min_price) { where.push('price >= ?'); params.push(req.query.min_price); }
  if (req.query.max_price) { where.push('price <= ?'); params.push(req.query.max_price); }
  if (req.query.bedrooms)  { where.push('bedrooms = ?'); params.push(req.query.bedrooms); }
  if (req.query.property_type) { where.push('property_type = ?'); params.push(req.query.property_type); }
  
  if (req.query.lat && req.query.lng && req.query.max_distance) {
    where.push('(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) <= ?');
    params.push(req.query.lat, req.query.lng, req.query.lat, req.query.max_distance);
  }

  // If owner, show their own listings only. If student or guest, show all active.
  if (payload && payload.role === 'owner' && !req.query.public) {
     where.push('owner_id = ?'); params.push(userId);
  }

  let limitClause = '';
  if (req.query.limit) {
    limitClause = `LIMIT ${parseInt(req.query.limit)}`;
  }

  const sql = `
    SELECT l.*, u.full_name as owner_name,
           (SELECT image_path FROM listing_images WHERE listing_id = l.id ORDER BY display_order LIMIT 1) as thumbnail,
           (SELECT COUNT(*) FROM saved_listings WHERE listing_id = l.id AND user_id = ?) as is_saved,
           (SELECT COUNT(*) FROM contracts WHERE listing_id = l.id
            AND status IN ('signed_by_student','signed_by_owner','paid','active','completed','completed_student','signed_by_both')
            AND (end_date IS NULL OR end_date >= CURDATE())) as occupant_count
    FROM listings l
    JOIN users u ON l.owner_id = u.id
    WHERE ${where.join(' AND ')}
    ORDER BY l.created_at DESC ${limitClause}`;

  const listings = await query(sql, params);

  for (const listing of listings) {
    const images = await query('SELECT image_path FROM listing_images WHERE listing_id = ? ORDER BY display_order', [listing.id]);
    listing.images        = images;
    listing.is_saved      = !!listing.is_saved;
    listing.occupant_count = Number(listing.occupant_count) || 0;
    listing.available_rooms = Math.max(0, (Number(listing.capacity) || 1) - listing.occupant_count);
  }

  return res.json({ listings });
}

async function createListing(req, res) {
  const user = requireRole(req, res, 'owner');
  if (!user) return;

  const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
  const uploadDir = useBlob
    ? os.tmpdir()
    : path.join(process.cwd(), 'public', 'uploads', 'listings');

  if (!useBlob && !fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({ uploadDir, keepExtensions: true, multiples: true });

  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fds, fs) => err ? reject(err) : resolve({ fields: fds, files: fs }));
  });

  const getF = (k) => Array.isArray(fields[k]) ? fields[k][0] : fields[k];

  const title = getF('title');
  const address = getF('address');
  const price = parseFloat(getF('price'));
  const bedrooms = parseInt(getF('bedrooms'));
  const propertyType = getF('property_type');
  const genderPreference = getF('gender_preference') || 'any';

  if (!title || !address || isNaN(price) || price <= 0 || isNaN(bedrooms) || bedrooms <= 0) {
    return res.status(400).json({ error: 'Invalid listing data' });
  }

  const result = await query(
    `INSERT INTO listings (owner_id, title, description, address, latitude, longitude,
      price, bedrooms, beds_count, capacity, bathrooms, property_type, gender_preference, available_from)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [user.id, title, getF('description'), address, parseFloat(getF('latitude') || 0), parseFloat(getF('longitude') || 0),
     price, bedrooms, parseInt(getF('beds_count') || 1), parseInt(getF('capacity') || 1), parseFloat(getF('bathrooms') || 0),
     propertyType, genderPreference, getF('available_from') || null]
  );

  const listingId = result.insertId;

  // Handle uploaded images
  let uploadedFiles = files.images || [];
  if (!Array.isArray(uploadedFiles)) uploadedFiles = [uploadedFiles];
  uploadedFiles = uploadedFiles.filter(Boolean);

  for (let i = 0; i < uploadedFiles.length; i++) {
    const f = uploadedFiles[i];
    let dbPath;
    if (useBlob) {
      const ext = path.extname(f.originalFilename || f.newFilename || '');
      const blob = await put(`listings/${listingId}-${i}-${Date.now()}${ext}`,
                             fs.createReadStream(f.filepath), { access: 'public' });
      dbPath = blob.url;
      try { fs.unlinkSync(f.filepath); } catch (_) {}
    } else {
      dbPath = 'uploads/listings/' + path.basename(f.filepath || f.path);
    }
    await query('INSERT INTO listing_images (listing_id, image_path, display_order) VALUES (?, ?, ?)',
                [listingId, dbPath, i]);
  }

  return res.status(201).json({ success: true, listing_id: listingId });
}

