const JWT = require("jsonwebtoken");
const TweetSchema = require("../models/TweetSchema");

const PostTweet = async (req, res) => {
  try {
    const { token, TweetDetails, TweetVisibility, TweetImage, User } = req.body;
    if (!token) {
      return res.status(401).json({
        msg: "Unauthorized to post tweet",
      });
    } else {
      const match = JWT.verify(token, process.env.JWT_SECRET);
      if (!match) {
        return res.status(401).json({
          msg: "Unauthorized to post tweet",
        });
      } else {
        const tweet = await TweetSchema.create({
          TweetDetails: TweetDetails,
          TweetVisibility: TweetVisibility,
          TweetImage: TweetImage,
          UserInfo: User,
        });
        res.status(201).json({
          msg: "Tweet posted successfully",
          tweet: tweet,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

const GetTweets = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        msg: "Unauthorized to post tweet",
      });
    } else {
      const match = JWT.verify(token, process.env.JWT_SECRET);
      if (!match) {
        return res.status(400).json({
          msg: "Unauthorized to get tweets",
        });
      } else {
        const tweets = await TweetSchema.find({});
        res.status(201).json({
          msg: "Tweets fetched successfully",
          tweets: tweets,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

module.exports = {
  PostTweet,
  GetTweets,
};
