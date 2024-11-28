const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, enum: ['Admin', 'Moderator', 'User'] },
  permissions: { 
    type: Map, 
    of: Boolean, 
    default: {
      'create-user': false,
      'edit-user': false,
      'delete-user': false,
      'view-user': false
    } 
  }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
