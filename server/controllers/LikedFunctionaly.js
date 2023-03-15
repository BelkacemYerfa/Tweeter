const JWT = require("jsonwebtoken");
const TweetSchema = require("../models/TweetSchema");
const likedTweetsSchema = require("../models/LikedTweets");

const LikeTweet = async (req, res) => {
  try {
    const { token, tweetId, userId } = req.body;
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
    const LikedTweets = await likedTweetsSchema.findOne({
      userId: userId,
      tweetId: tweetId,
    });
    if (!LikedTweets) {
      await likedTweetsSchema.create({
        tweetId: tweetId,
        userId: userId,
      });
      const LikeTweet = await TweetSchema.findOneAndUpdate(
        { _id: tweetId },
        { $inc: { Liked: +1 } }
      );
      if (LikeTweet === null) {
        return res.status(404).json({
          msg: "sorry tweet not Found",
        });
      }
      res.status(201).json({
        msg: "Tweet liked successfully",
        LikedTweet: LikeTweet,
      });
    } else {
      await TweetSchema.findOneAndUpdate(
        { _id: tweetId },
        { $inc: { Liked: -1 } }
      );
      await likedTweetsSchema.findOneAndDelete({
        userId: userId,
        tweetId: tweetId,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const getAllLikedTweets = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("invalid Creditels , try again");
    }
    const token = authHeader.split(" ")[1];
    const { userId } = req.params;
    if (!token) {
      return res.status(400).json({
        msg: "bad request",
      });
    }
    const match = JWT.verify(token, process.env.JWT_SECRET);
    if (!match) {
      return res.status(401).json({
        msg: "Unauthorized , check your credentials",
      });
    }
    const LikedTweets = await likedTweetsSchema.find({
      userId: userId,
    });
    if (LikedTweets.length === 0) {
      return res.status(404).json({
        msg: "no liked tweets found",
      });
    }
    //fix the api with the auth
    //the saved api try to send the search by id
    const LikedUserTweets = [];
    for (let i = 0; i < LikedTweets.length; i++) {
      const Tweet = await TweetSchema.findOne({ _id: LikedTweets[i]?.tweetId });
      LikedUserTweets.push(Tweet);
    }
    res.status(201).json({
      msg: "liked tweets fetched seccefully",
      Tweets: LikedUserTweets,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = { LikeTweet, getAllLikedTweets };
