const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  createdAccount: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", UserSchema);
