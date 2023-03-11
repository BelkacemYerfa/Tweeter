const express = require("express");
const router = express.Router();

const { login, register, logout } = require("../controllers/logInAndSignUp");
const { PostTweet, GetTweets } = require("../controllers/TweetSending");
const {
  SaveTweet,
  LoadAllSavedTweets,
} = require("../controllers/SavingTweets");

const { LikeTweet } = require("../controllers/TweetsFunctionality");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/PostTweet").post(PostTweet);
router.route("/getAllTweets").post(GetTweets);
router.route("/savedTweet").post(SaveTweet);
router.route("/getAllSavedTweets").get(LoadAllSavedTweets);
router.route("/likeTweet").patch(LikeTweet);

module.exports = router;
