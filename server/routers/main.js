const express = require("express");
const router = express.Router();

const { login, register, logout } = require("../controllers/logInAndSignUp");
const { PostTweet, GetTweets } = require("../controllers/TweetSending");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/PostTweet").post(PostTweet);
router.route("/getAllTweets").post(GetTweets);

module.exports = router;
