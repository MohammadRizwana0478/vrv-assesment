const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (userId, roleId) => {
  return jwt.sign({ userId, roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateToken;
