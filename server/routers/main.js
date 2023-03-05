const express = require("express");
const router = express.Router();

const { login, register, logout } = require("../controllers/logInAndSignUp");
const { PostTweet } = require("../controllers/TweetSending");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/tweet").post(PostTweet);

module.exports = router;
