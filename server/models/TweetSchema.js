const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  TweetDetails: {
    type: String,
    trim: true,
  },
  TweetVisibility: {
    type: String,
    required: [true, "Please provide a visibility"],
  },
  TweetImage: {
    type: String,
    trim: true,
  },
  UserInfo: {
    type: Object,
    default: {},
  },
  CreationDate: {
    type: Date,
    default: Date.now(),
  },
  Commments: {
    type: Array,
    default: [],
  },
  Liked: {
    type: Number,
    default: 0,
  },
  Saved: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Tweet", TweetSchema);
