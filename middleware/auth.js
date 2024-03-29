const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeder = req.headers['authorization'];

  const token = authHeder && authHeder.split('')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
