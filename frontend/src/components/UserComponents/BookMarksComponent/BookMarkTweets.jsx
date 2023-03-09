import { TweetFetchingOptions } from "../SharedComponents/TweetFecthingOptions";
import { OptionLoadingTweetBookMarks } from "../../../static/OptionLoadingTweet";
import { useDataLayerValue } from "../../../config/dataLayer";
import { TweeterPostData } from "../SharedComponents/TweeterPostData";

export const BookMarksTweets = () => {
  const [{ PostedTweets }] = useDataLayerValue();

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
