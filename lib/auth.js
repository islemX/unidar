/**
 * UNIDAR – JWT Auth middleware (replaces PHP sessions)
 */
const jwt  = require('jsonwebtoken');
const cookie = require('cookie');

const SECRET = process.env.JWT_SECRET || 'unidar-dev-secret-change-in-prod';
const COOKIE_NAME = 'unidar_token';

/**
 * Sign a JWT and set it as an httpOnly cookie.
 */
function signToken(res, user) {
  const token = jwt.sign(
    { id: user.id, role: user.role, email: user.email, name: user.full_name || user.name },
    SECRET,
    { expiresIn: '7d' }
  );
  res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge:   60 * 60 * 24 * 7, // 7 days
  }));
  return token;
}

/**
 * Clear the auth cookie (logout).
 */
function clearToken(res) {
  res.setHeader('Set-Cookie', cookie.serialize(COOKIE_NAME, '', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path:     '/',
    maxAge:   0,
    expires:  new Date(0),
  }));
}

/**
 * Verify the JWT from the request cookie.
 * Returns the decoded payload or null.
 */
function verifyToken(req) {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token   = cookies[COOKIE_NAME];
    if (!token) return null;
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

/**
 * Middleware: require any authenticated user.
 * Returns the user payload or sends 401 and returns null.
 */
function requireAuth(req, res) {
  const user = verifyToken(req);
  if (!user) {
    res.status(401).json({ error: 'Authentication required' });
    return null;
  }
  return user;
}

/**
 * Middleware: require a specific role (or admin always passes).
 * Returns the user payload or sends 403 and returns null.
 */
function requireRole(req, res, role) {
  const user = requireAuth(req, res);
  if (!user) return null;
  if (user.role !== role && user.role !== 'admin') {
    res.status(403).json({ error: 'Access denied' });
    return null;
  }
  return user;
}

module.exports = { signToken, clearToken, verifyToken, requireAuth, requireRole };
