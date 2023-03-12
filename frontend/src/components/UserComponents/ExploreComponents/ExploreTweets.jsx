import { useState, useEffect } from "react";
import { useDataLayerValue } from "../../../config/dataLayer";
import { TweeterPostData } from "../SharedComponents/TweeterPostData";
import { TweetFetchingOptions } from "../SharedComponents/TweetFecthingOptions";
import { OptionLoadingTweetExplore } from "../../../static/OptionLoadingTweet";
import axios from "axios";

export const ExploreTweets = () => {
  const [{ PostedTweets }, dispatch] = useDataLayerValue();
  const [searchPost, setSearchPost] = useState("");
  const HandleSearchInfo = (e) => {
    if (e.target.value !== " ") {
      setSearchPost(e.target.value);
    }
  };
  const handleDataSented = (e) => {
    e.preventDefault();
    alert(searchPost);
  };
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
    if (typeof user === "object") {
      dispatch({
        type: "SET_USER",
        user: JSON.parse(localStorage.getItem("user")),
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
          <form action="" className="SearchForm" onSubmit={handleDataSented}>
            <div className="SearchIconHolder">
              <span class="material-symbols-rounded">search</span>
            </div>
            <input
              className="SearchInput"
              type="search"
              name="seachForm"
              id="seachForm"
              placeholder="Search"
              onChange={HandleSearchInfo}
            />
            <button type="submit" className="addFollowBtn SearchBtn">
              Search
            </button>
          </form>
          <br />
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
          <TweetFetchingOptions OptionArray={OptionLoadingTweetExplore} />
        </div>
      </section>
    </section>
  );
};
