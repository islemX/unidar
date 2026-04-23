/**
 * Public stats endpoint — used by the home page hero counters.
 * No auth required, returns aggregate counts only.
 */
const { query } = require('../../../lib/db');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    // Prevent stale caches so refresh always shows fresh numbers
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');

    const [
      [{ listings }],
      [{ students }],
      [{ owners }],
      [{ universities }],
      [{ subscriptions }]
    ] = await Promise.all([
      query("SELECT COUNT(*) AS listings FROM listings WHERE status = 'active'"),
      query("SELECT COUNT(*) AS students FROM users WHERE role = 'student' AND status = 'active'"),
      query("SELECT COUNT(*) AS owners FROM users WHERE role = 'owner' AND status = 'active'"),
      query("SELECT COUNT(*) AS universities FROM faculties"),
      query("SELECT COUNT(*) AS subscriptions FROM subscriptions WHERE status = 'active' AND expires_at > NOW()")
    ]);

    return res.status(200).json({
      listings,
      students,
      owners,
      universities,
      subscriptions,
      generated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('public stats error:', err);
    return res.status(500).json({ error: 'Failed to load stats' });
  }
};
