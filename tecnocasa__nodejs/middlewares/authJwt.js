// middlewares/authJwt.js
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization || '';
    const [, token] = auth.split(' ');
    if (!token) return res.status(401).json({ message: 'No autenticado' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.auth = { userId: payload.userId, email: payload.email };
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
module.exports = { requireAuth };
