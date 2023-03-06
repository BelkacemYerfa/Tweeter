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
  UserID: {
    type: String,
    required: [true, "Please provide a user id"],
  },
});

module.exports = mongoose.model("Tweet", TweetSchema);
