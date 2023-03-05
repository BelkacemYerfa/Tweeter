const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema({
  TweetText: {
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
});

module.exports = mongoose.model("Tweet", TweetSchema);
