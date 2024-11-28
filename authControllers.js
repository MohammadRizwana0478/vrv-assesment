const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { email, password, roleName } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const role = await Role.findOne({ name: roleName });
  if (!role) return res.status(400).json({ message: 'Invalid role' });

  const user = new User({ email, password, role: role._id });
  await user.save();

  const token = generateToken(user._id, role._id);
  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email }).populate('role');
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id, user.role._id);
  res.json({ token });
};
