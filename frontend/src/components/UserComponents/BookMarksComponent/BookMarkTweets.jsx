import { TweetFetchingOptions } from "../SharedComponents/TweetFecthingOptions";
import { OptionLoadingTweetBookMarks } from "../../../static/OptionLoadingTweet";
import { useDataLayerValue } from "../../../config/dataLayer";
import { TweeterPostData } from "../SharedComponents/TweeterPostData";
import { useEffect } from "react";
import axios from "axios";

export const BookMarksTweets = () => {
  const [{ PostedTweets }, dispatch] = useDataLayerValue();
  const getAllTweets = async () => {
    const data = {
      token: localStorage.getItem("token"),
    };
    const AllSavedTweets = await axios.get(
      "http://localhost:4000/api/v1/getAllSavedTweets",
      data
    );
    console.log(AllSavedTweets);
  };
  useEffect(() => {
    getAllTweets();
  }, []);
  return (
    <section className="UserHomePage">
      <section className="ExploreTweetsDetails UserHomePageDetails">
        <div className="SearchPostHolder UserPostes">
          <section className="UserFiendsPost"></section>
        </div>
        <div className="UserRecomendations">
          <TweetFetchingOptions OptionArray={OptionLoadingTweetBookMarks} />
        </div>
      </section>
    </section>
  );
};
