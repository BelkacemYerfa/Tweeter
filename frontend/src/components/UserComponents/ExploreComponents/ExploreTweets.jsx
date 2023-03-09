import { useState } from "react";
import { useDataLayerValue } from "../../../config/dataLayer";
import { TweeterPostData } from "../SharedComponents/TweeterPostData";
import { Link } from "react-router-dom";

export const ExploreTweets = () => {
  const [{ PostedTweets }] = useDataLayerValue();
  const [searchPost, setSearchPost] = useState("");
  const HandleSearchInfo = (e) => {
    e.preventDefault();
    if (e.target.value !== " ") {
      setSearchPost(e.target.value);
    }
  };
  return (
    <section className="UserHomePage">
      <section className="ExploreTweetsDetails UserHomePageDetails">
        <div className="UserPostes">
          <form action="" className="SearchForm">
            <div className="SearchIconHolder">
              <span></span>
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
          <div className="UserRecomendationHolder">
            <ul className="ChoicesOptionHolder">
              <li className="OptionHolder group">
                <Link to="">Top</Link>
                <div className="userChoiceLoaderLine"></div>
              </li>
              <li className="OptionHolder group">
                <Link to="">Latest</Link>
                <div className="userChoiceLoaderLine"></div>
              </li>
              <li className="OptionHolder group">
                <Link to="">People</Link>
                <div className="userChoiceLoaderLine"></div>
              </li>
              <li className="OptionHolder group">
                <Link to="">Media</Link>
                <div className="userChoiceLoaderLine"></div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  );
};
