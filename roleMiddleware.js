const Role = require('../models/Role');

const roleMiddleware = (permissions) => {
  return async (req, res, next) => {
    const role = await Role.findById(req.user.roleId);
    if (!role || !permissions.every(p => role.permissions.get(p))) {
      return res.status(403).json({ message: 'Access Denied: insufficient permissions' });
    }
    next();
  };
};

module.exports = roleMiddleware;
