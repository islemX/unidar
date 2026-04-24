/**
 * UNIDAR � DB Status Check API
 * GET /api/debug-db
 */
import { query } from '../../lib/db';

export default async function handler(req, res) {
  try {
    const start = Date.now();
    const rows = await query('SELECT DATABASE() as db, VERSION() as version');
    const tables = await query('SHOW TABLES');
    const elapsed = Date.now() - start;

    return res.json({
      success: true,
      message: 'Database connected successfully',
      details: {
        database: rows[0].db,
        version: rows[0].version,
        table_count: tables.length,
        latency_ms: elapsed
      },
      env: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        name: process.env.DB_NAME
      }
    });
  } catch (err) {
    console.error('DB Debug Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message,
      code: err.code,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
