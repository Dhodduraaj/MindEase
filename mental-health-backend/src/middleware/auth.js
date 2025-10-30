import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = { id: payload.sub };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function signToken(userId) {
  const secret = process.env.JWT_SECRET || 'dev_secret';
  return jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });
}


