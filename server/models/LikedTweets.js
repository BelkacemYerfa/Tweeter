const mongoose = require("mongoose");

const likedTweetsSchema = new mongoose.Schema({
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
  "LikedTweets",
  likedTweetsSchema,
  "TweetsBiengLiked"
);
