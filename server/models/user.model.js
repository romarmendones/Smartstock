const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'manager', 'user'], default: 'user' }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
