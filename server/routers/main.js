const express = require("express");
const router = express.Router();

const { login, register, logout } = require("../controllers/logInAndSignUp");
const { PostTweet, GetTweets } = require("../controllers/TweetSending");
const {
  SaveTweet,
  LoadAllSavedTweets,
} = require("../controllers/SavingTweets");
const {
  LikeTweet,
  getAllLikedTweets,
} = require("../controllers/LikedFunctionaly");
const {
  getTopTweets,
  getPeople,
  getLatestTweets,
} = require("../controllers/GetTweetsChoice");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/PostTweet").post(PostTweet);
router.route("/getAllTweets").post(GetTweets);
router.route("/savedTweet").patch(SaveTweet);
router.route("/getAllSavedTweets/:userId").get(LoadAllSavedTweets);
router.route("/likeTweet").patch(LikeTweet);
router.route("/getAllLikedTweets/:userId").get(getAllLikedTweets);
router.route("/getTopTweets").get(getTopTweets);
router.route("/getLatestTweets").get(getLatestTweets);
router.route("/getPeople").get(getPeople);

module.exports = router;
