const jwt = require('jsonwebtoken');

// Middleware to verify token and check user role
const authMiddleware = (requiredRole) => (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    if (decoded.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role.' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
