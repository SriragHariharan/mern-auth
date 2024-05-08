const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String, default: null }
  },
  { timestamps: true });

module.exports = mongoose.model("User", userSchema);