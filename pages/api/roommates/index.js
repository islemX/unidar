/**
 * UNIDAR � Roommate Matching API
 * GET  /api/roommates          � get preferences (no ?matches)
 * GET  /api/roommates?matches  � get matches
 * POST /api/roommates          � save/update preferences
 */
import { query }       from '../../../lib/db';
import { verifyToken, requireRole } from '../../../lib/auth';

export default async function handler(req, res) {
  const payload = verifyToken(req);
  const user = payload || null;

  try {
    if (req.method === 'GET') {
      if ('matches' in req.query) return await getMatches(req, res, user);
      if (!user) return res.status(401).json({ error: 'Auth required for preferences' });
      return await getPreferences(req, res, user);
    }
    if (!user || user.role !== 'student') return res.status(403).json({ error: 'Student only' });
    if (req.method === 'POST' || req.method === 'PUT') return await savePreferences(req, res, user);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Roommates error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPreferences(req, res, user) {
  const rows = await query('SELECT * FROM roommate_preferences WHERE user_id = ?', [user.id]);
  return res.json({ preferences: rows[0] || null });
}

async function savePreferences(req, res, user) {
  const d = req.body;
  const prefs = {
    budget_min:          d.budget_min          !== undefined ? parseFloat(d.budget_min)  : null,
    budget_max:          d.budget_max          !== undefined ? parseFloat(d.budget_max)  : null,
    cleanliness_level:   d.cleanliness_level   || null,
    smoking_preference:  d.smoking_preference  || null,
    noise_tolerance:     d.noise_tolerance     || null,
    sleep_schedule:      d.sleep_schedule      || null,
    gender_preference:   d.gender_preference   || null,
    age_min:             d.age_min             !== undefined ? parseInt(d.age_min)        : null,
    age_max:             d.age_max             !== undefined ? parseInt(d.age_max)        : null,
    guests:              d.guests              || null,
    pets:                d.pets                || null,
  };

  const existing = await query('SELECT id FROM roommate_preferences WHERE user_id = ?', [user.id]);

  if (existing.length) {
    await query(`UPDATE roommate_preferences
      SET budget_min=?, budget_max=?, cleanliness_level=?, smoking_preference=?,
          noise_tolerance=?, sleep_schedule=?, gender_preference=?, age_min=?, age_max=?, guests=?, pets=?
      WHERE user_id=?`,
      [...Object.values(prefs), user.id]);
  } else {
    await query(`INSERT INTO roommate_preferences
      (user_id, budget_min, budget_max, cleanliness_level, smoking_preference,
       noise_tolerance, sleep_schedule, gender_preference, age_min, age_max, guests, pets)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user.id, ...Object.values(prefs)]);
  }
  return res.json({ success: true });
}

async function getMatches(req, res, user) {
  const userPrefsRows = user ? await query('SELECT * FROM roommate_preferences WHERE user_id = ?', [user.id]) : [];
  const userPrefs     = userPrefsRows[0] || {};
  
  if (!userPrefs && user) return res.json({ matches: [], message: 'Please set your preferences first' });

  const userInfoRows = user ? await query('SELECT university, preferred_lat, preferred_lng FROM users WHERE id = ?', [user.id]) : [];
  const userInfo     = userInfoRows[0] || null;

  const userId = user ? user.id : 0;
  const candidates = await query(`
    SELECT u.id as user_id, u.full_name, u.email, u.university, u.preferred_lat, u.preferred_lng,
           rp.budget_min, rp.budget_max, rp.cleanliness_level, rp.smoking_preference,
           rp.noise_tolerance, rp.sleep_schedule, rp.gender_preference,
           (SELECT status FROM verifications WHERE user_id = u.id ORDER BY id DESC LIMIT 1) as verification_status
    FROM users u
    JOIN roommate_preferences rp ON u.id = rp.user_id
    WHERE u.id != ? AND u.role = 'student' AND u.status = 'active'
  `, [userId]);

  const matches = candidates
    .map(c => ({ ...c, score: calculateCompatibilityScore(userPrefs, c, userInfo) }))
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(c => ({
      user_id:              c.user_id,
      full_name:            c.full_name,
      email:                user ? c.email : 'Log in to view',
      university:           c.university,
      verified:             c.verification_status === 'approved',
      compatibility_score:  Math.round(c.score * 100) / 100,
      preferences: {
        budget_min:          c.budget_min,
        budget_max:          c.budget_max,
        cleanliness_level:   c.cleanliness_level,
        smoking_preference:  c.smoking_preference,
        noise_tolerance:     c.noise_tolerance,
        sleep_schedule:      c.sleep_schedule,
      }
    }));

  return res.json({ matches });
}

// -- Matching algorithm (ported 1:1 from roommates.php) ----------------------

function calculateCompatibilityScore(up, c, ui) {
  let score = 0, max = 0;

  // Budget (30%)
  max += 30;
  if (up.budget_min && up.budget_max && c.budget_min && c.budget_max) {
    const overlap = Math.min(up.budget_max, c.budget_max) - Math.max(up.budget_min, c.budget_min);
    if (overlap > 0) score += 30;
    else if (Math.abs(up.budget_min - c.budget_max) < 100 || Math.abs(c.budget_min - up.budget_max) < 100) score += 20;
    else score += 10;
  }

  const cleanScale = { very_clean: 0, clean: 1, moderate: 2, relaxed: 3 };

  // Cleanliness (20%)
  max += 20;
  if (up.cleanliness_level && c.cleanliness_level) {
    if (up.cleanliness_level === c.cleanliness_level) score += 20;
    else if (Math.abs((cleanScale[up.cleanliness_level] ?? 0) - (cleanScale[c.cleanliness_level] ?? 0)) === 1) score += 15;
    else score += 5;
  }

  // Smoking (15%)
  max += 15;
  if (up.smoking_preference && c.smoking_preference) {
    if (up.smoking_preference === c.smoking_preference || up.smoking_preference === 'no_preference' || c.smoking_preference === 'no_preference') score += 15;
  }

  const noiseScale = { quiet: 0, moderate: 1, social: 2 };

  // Noise (15%)
  max += 15;
  if (up.noise_tolerance && c.noise_tolerance) {
    if (up.noise_tolerance === c.noise_tolerance || up.noise_tolerance === 'no_preference' || c.noise_tolerance === 'no_preference') score += 15;
    else if (Math.abs((noiseScale[up.noise_tolerance] ?? 0) - (noiseScale[c.noise_tolerance] ?? 0)) === 1) score += 10;
    else score += 5;
  }

  // Sleep (20%)
  max += 20;
  if (up.sleep_schedule && c.sleep_schedule) {
    if (up.sleep_schedule === c.sleep_schedule || up.sleep_schedule === 'no_preference' || c.sleep_schedule === 'no_preference') score += 20;
    else if (['early_riser-normal','normal-early_riser','normal-night_owl','night_owl-normal'].includes(`${up.sleep_schedule}-${c.sleep_schedule}`)) score += 15;
    else score += 5;
  }

  // University (20%)
  max += 20;
  if (ui && ui.university && c.university && ui.university.toLowerCase().trim() === c.university.toLowerCase().trim()) score += 20;

  // Distance (20%)
  max += 20;
  if (ui && ui.preferred_lat && ui.preferred_lng && c.preferred_lat && c.preferred_lng) {
    const d = haversineKm(parseFloat(ui.preferred_lat), parseFloat(ui.preferred_lng), parseFloat(c.preferred_lat), parseFloat(c.preferred_lng));
    if (d <= 2) score += 20;
    else if (d <= 5) score += 15;
    else if (d <= 10) score += 10;
    else if (d <= 20) score += 5;
  }

  return max > 0 ? (score / max) * 100 : 0;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371, dLat = rad(lat2 - lat1), dLon = rad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function rad(d) { return d * Math.PI / 180; }
