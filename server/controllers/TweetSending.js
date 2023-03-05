const JWT = require("jsonwebtoken");
const TweetSchema = require("../models/TweetSchema");

const PostTweet = async (req, res) => {
  try {
    const { TweetText, TweetVisibility, TweetImage, token } = req.body;
    if (!token) {
      return res.status(400).json({
        msg: "Unauthorized to post tweet",
      });
    } else {
      const verified = JWT.verify(token, process.env.JWT_SECRET);
      if (!verified) {
        return res.status(400).json({
          msg: "Unauthorized to post tweet",
        });
      } else {
        if (!tweet || !image) {
          return res.status(400).json({
            msg: "Please provide tweet and image",
          });
        }
        const newTweet = await TweetSchema.create({
          TweetText: TweetText,
          TweetVisibility: TweetVisibility,
          TweetImage: TweetImage,
        });
        res.status(201).json({
          msg: "User created successfully",
          userInfo: newTweet,
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
};
