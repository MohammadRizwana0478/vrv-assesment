const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const router = express.Router();

// This route requires 'view-user' permission
router.get('/users', authMiddleware, roleMiddleware(['view-user']), (req, res) => {
  res.json({ message: 'Here are the users' });
});

module.exports = router;
