const mongoose = require("mongoose");

const SavedTweetsSchema = new mongoose.Schema({
  tweetId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(
  "SavedTweets",
  SavedTweetsSchema,
  "TweetsBiengSaved"
);
