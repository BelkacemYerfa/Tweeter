import { useState } from "react";
import { useDataLayerValue } from "../../../config/dataLayer";
import { TweeterPostData } from "../SharedComponents/TweeterPostData";
import { TweetFetchingOptions } from "../SharedComponents/TweetFecthingOptions";
import { OptionLoadingTweetExplore } from "../../../static/OptionLoadingTweet";

export const ExploreTweets = () => {
  const [{ PostedTweets }] = useDataLayerValue();
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
