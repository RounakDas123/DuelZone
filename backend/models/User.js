const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Not required for Google accounts
  authType: { type: String, enum: ['local', 'google'], default: 'local' },
  username: { type: String },
  bio: { type: String },
  avatarUrl: { type: String },
  country: { type: String },
  favoriteMode: { type: String } // e.g., 'AI', 'Friend'
});

module.exports = mongoose.model('User', userSchema);
