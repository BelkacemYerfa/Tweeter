import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../config/dataLayer";
import axios from "axios";
import {
  configHeaderAuth,
  userData,
} from "../../../config/configHeaderForTheAuthApi";

export const TweetFetchingOptions = ({ OptionArray }) => {
  const [{ SavedTweets }, dispatch] = useDataLayerValue();
  const getAllLikedTweetsOfUser = async () => {
    //use the localStorage if the user info were not fetched from the server
    try {
      const LikedTweets = await axios.get(
        `http://localhost:4000/api/v1/getAllLikedTweets/${userData?._id}`,
        configHeaderAuth
      );
      console.log(LikedTweets);
      if (LikedTweets?.status === 201) {
        dispatch({
          type: "SET_SAVED_TWEETS",
          SavedTweets: LikedTweets?.data?.Tweets,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllSavedTweetsOfUser = async () => {
    try {
      const AllSavedTweets = await axios.get(
        `http://localhost:4000/api/v1/getAllSavedTweets/${userData?._id}`,
        configHeaderAuth
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
  return (
    <div className="UserRecomendationHolder">
      <ul className="ChoicesOptionHolder">
        {OptionArray.map((option) => (
          <li
            className="OptionHolder group"
            key={option.id}
            onClick={
              option.text === "Likes"
                ? getAllLikedTweetsOfUser
                : option.text === "Tweets"
                ? getAllSavedTweetsOfUser
                : null
            }
          >
            <Link to="">{option.text}</Link>
            <div className="userChoiceLoaderLine"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
