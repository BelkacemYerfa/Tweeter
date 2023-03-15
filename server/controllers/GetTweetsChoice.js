const JWT = require("jsonwebtoken");
const TweetSchema = require("../models/TweetSchema");
const UserSchema = require("../models/UserSchema");

const getTopTweets = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized , check your Credentials");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized , check your Credentials" });
    }
    const match = JWT.verify(token, process.env.JWT_SECRET);
    if (!match) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tweets = await TweetSchema.find({}).sort({ Liked: "desc" }).limit(10);
    //in the likes : -1 means the descinding sort
    //in the limit : 10 means the top 10 tweets
    //we can use sort({likes:1}) for ascending sort
    //or : sort({field : "desc" })
    res.status(201).json({
      msg: "Top 10 tweets",
      Tweets: tweets,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getLatestTweets = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized , check your Credentials");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized , check your Credentials" });
    }
    const match = JWT.verify(token, process.env.JWT_SECRET);
    if (!match) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const Tweets = await TweetSchema.find({})
      .sort({ CreationDate: "desc" })
      .limit(10);
    res.status(201).json({
      msg: "Latest 10 tweets",
      Tweets: Tweets,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getPeople = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized , check your Credentials");
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized , check your Credentials" });
    }
    const match = JWT.verify(token, process.env.JWT_SECRET);
    if (!match) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const Tweets = await UserSchema.find({})
      .sort({ username: "desc" })
      .limit(10);
    res.status(201).json({
      msg: "Latest 10 tweets",
      Tweets: Tweets,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = { getTopTweets, getLatestTweets, getPeople };
