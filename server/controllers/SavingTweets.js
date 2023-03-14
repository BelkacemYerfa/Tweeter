const JWT = require("jsonwebtoken");
const SavedTweetsSchema = require("../models/SavedTweets");
const TweetSchema = require("../models/TweetSchema");

const SaveTweet = async (req, res) => {
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
    const CheckTweet = await SavedTweetsSchema.findOne({
      userId: userId,
      tweetId: tweetId,
    });
    if (CheckTweet) {
      return res.status(201).json({
        msg: "Tweet already saved",
      });
    }
    const Tweet = await SavedTweetsSchema.create({
      tweetId: tweetId,
      userId: userId,
    });
    const TweetSaved = await TweetSchema.findByIdAndUpdate(
      { _id: tweetId },
      { $inc: { Saved: +1 } }
    );
    if (!TweetSaved) {
      return res.status(404).json({
        msg: "tweet not found",
      });
    }
    res.status(201).json({
      msg: "Tweet saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const LoadAllSavedTweets = async (req, res) => {
  try {
    const { token, userId } = req.body;
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
    const Tweets = await SavedTweetsSchema.find({ userId: userId });
    if (!Tweets) {
      return res.status(404).json({
        msg: "No tweets found",
      });
    }
    const TweetsArray = [];
    for (let i = 0; i < Tweets.length; i++) {
      const Tweet = await TweetSchema.findOne({ _id: Tweets[i]?.tweetId });
      TweetsArray.push(Tweet);
    }
    res.status(201).json({
      msg: "Tweets fetched successfully",
      Tweets: TweetsArray,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = { SaveTweet, LoadAllSavedTweets };
