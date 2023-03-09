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
    const AllTweets = await axios.post(
      "http://localhost:4000/api/v1/getAllTweets",
      data
    );
    if (AllTweets?.status === 201) {
      dispatch({
        type: "SET_POSTED_TWEETS",
        PostedTweets: AllTweets?.data?.tweets,
      });
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
            {PostedTweets?.map((tweet) => (
              <TweeterPostData
                key={tweet?._id}
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
