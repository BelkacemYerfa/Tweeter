const JWT = require("jsonwebtoken");
const SavedTweetsSchema = require("../models/SavedTweets");
const TweetSchema = require("../models/TweetSchema");

const SaveTweet = async (req, res) => {
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
    const TweetSaved = await TweetSchema.findById({ _id: tweetId });
    const Tweet = await SavedTweetsSchema.create({
      tweet: TweetSaved,
      Saved: true,
    });
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
    const { token } = req.body;
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
    const Tweets = await SavedTweetsSchema.find().limit(1);
    res.status(201).json({
      msg: "Tweets fetched successfully",
      Tweets: Tweets,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = { SaveTweet, LoadAllSavedTweets };
