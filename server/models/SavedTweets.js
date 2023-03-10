const mongoose = require("mongoose");

const SavedTweetsSchema = new mongoose.Schema({
  tweet: {
    type: Object,
    required: true,
  },
  Saved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("SavedTweets", SavedTweetsSchema);
