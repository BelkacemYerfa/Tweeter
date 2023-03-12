import { TweetFetchingOptions } from "../SharedComponents/TweetFecthingOptions";
import { OptionLoadingTweetBookMarks } from "../../../static/OptionLoadingTweet";
import { useDataLayerValue } from "../../../config/dataLayer";
import { TweeterPostData } from "../SharedComponents/TweeterPostData";
import { useEffect } from "react";
import axios from "axios";

export const BookMarksTweets = () => {
  const [{ SavedTweets }, dispatch] = useDataLayerValue();

  const getAllTweets = async () => {
    try {
      const data = {
        token: localStorage.getItem("token"),
      };
      const AllSavedTweets = await axios.post(
        "http://localhost:4000/api/v1/getAllSavedTweets",
        data
      );
      console.log(AllSavedTweets);
      if (AllSavedTweets?.status === 201) {
        dispatch({
          type: "SET_SAVED_TWEETS",
          SavedTweets: AllSavedTweets?.data?.Tweets,
        });
      }
      if (typeof user === "object") {
        dispatch({
          type: "SET_USER",
          user: JSON.parse(localStorage.getItem("user")),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTweets();
  }, []);
  return (
    <section className="UserHomePage">
      <section className="ExploreTweetsDetails UserHomePageDetails">
        <div className="SearchPostHolder UserPostes">
          <section className="UserFiendsPost">
            {SavedTweets?.map((tweet) => (
              <TweeterPostData
                key={tweet?._id}
                TweetId={tweet?._id}
                TweetDetails={tweet?.TweetDetails}
                TweetImage={tweet?.TweetImage}
                TweetVisibility={tweet?.TweetVisibility}
                UserInfo={tweet?.UserInfo}
                CreateDate={tweet?.CreationDate}
                Comments={tweet?.Comments}
                Liked={tweet?.Liked}
                Saved={tweet?.Saved}
              />
            ))}
          </section>
        </div>
        <div className="UserRecomendations">
          <TweetFetchingOptions OptionArray={OptionLoadingTweetBookMarks} />
        </div>
      </section>
    </section>
  );
};
