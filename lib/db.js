/**
 * UNIDAR – MySQL2 connection pool
 * Works with XAMPP locally, and any hosted MySQL in production
 */
const mysql = require('mysql2/promise');

let pool;

function getPool() {
  if (!pool) {
    const isProduction = process.env.NODE_ENV === 'production' || process.env.DB_SSL === 'true';
    pool = mysql.createPool({
      host:     process.env.DB_HOST     || '127.0.0.1',
      port:     parseInt(process.env.DB_PORT || '3306'),
      database: process.env.DB_NAME     || 'unidar',
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASS     || '',
      charset:  'utf8mb4',
      waitForConnections: true,
      connectionLimit:    10,
      queueLimit:         0,
      ...(isProduction && { ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: false } }),
    });
  }
  return pool;
}

/**
 * Execute a parameterised SQL query.
 * @param {string} sql
 * @param {Array}  params
 * @returns {Promise<Array>}
 */
async function query(sql, params = []) {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows;
}

/**
 * Return the underlying pool for transactions.
 */
function rawPool() {
  return getPool();
}

module.exports = { query, rawPool };
