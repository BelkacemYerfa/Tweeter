const JWT = require("jsonwebtoken");
const TweetSchema = require("../models/TweetSchema");
const likedTweetsSchema = require("../models/LikedTweets");

const LikeTweet = async (req, res) => {
  try {
    const { token, tweetId } = req.body;
    if (!token) {
      return res.status(400).json({
        msg: "Bad request",
      });
    }
    const match = JWT.verify(token, process.env.JWT_SECRET);
    if (!match) {
      return res.status(401).json({
        msg: "Unauthorized , check your credentials",
      });
    }
    const LikeTweet = await TweetSchema.findOneAndUpdate(
      { _id: tweetId },
      { $inc: { Liked: +1 } }
    );
    if (LikeTweet === null) {
      return res.status(404).json({
        msg: "sorry tweet not Found",
      });
    }
    const LikedTweets = await likedTweetsSchema.findById({
      userId: LikeTweet.UserInfo._id,
    });
    if (LikedTweets === null) {
      const Tweet = await likedTweetsSchema.create({
        tweetId: LikeTweet._id,
        userId: LikeTweet.UserInfo._id,
      });
    } else {
      return res.status(201).json({
        msg: "already liked this Tweet",
      });
    }
    res.status(201).json({
      msg: "Tweet liked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = { LikeTweet };
