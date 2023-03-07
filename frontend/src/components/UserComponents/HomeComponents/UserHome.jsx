import { useDataLayerValue } from "../../../config/dataLayer";
import { useState, useRef, useEffect } from "react";
import { TweetVisibilityOption } from "../../../static/UserTweetVisibility";
import { TweeterPostData } from "../SharedComponents/TweeterPostData";
import axios from "axios";

export const UserHome = () => {
  const [{ user, PostedTweets }, dispatch] = useDataLayerValue();
  const TweetDropDownRef = useRef(null);
  const [TweetVisibilityDropDown, setTweetVisibilityDropDown] = useState(false);
  const [TweetVisibility, setTweetVisibility] = useState({
    icon: "public",
    text: "Everyone can reply",
  });
  const [UploadedImage, setUploadedImage] = useState(null);
  const [TweetDetails, setTweetDetails] = useState(null);
  const handleUploadedImage = (e) => {
    const file = e.target.files[0];
    setUploadedImage(URL.createObjectURL(file));
  };
  const HandlePostTweet = async (e) => {
    e.preventDefault();
    const data = {
      TweetVisibility: TweetVisibility.text,
      TweetImage: UploadedImage,
      TweetDetails: TweetDetails,
      User: user,
      token: localStorage.getItem("token"),
    };
    console.log(data);
    //data to be sent to backend
    const CreateTweet = await axios.post(
      "http://localhost:4000/api/v1/PostTweet",
      data
    );
    if (CreateTweet.status === 201) {
      console.log(CreateTweet);
    }
    getAllTweets();
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
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!TweetDropDownRef.current.contains(e.target)) {
        setTweetVisibilityDropDown(false);
      } else {
        setTweetVisibilityDropDown(true);
      }
    });
  });
  return (
    <section className="UserHomePage">
      <section className="UserHomePageDetails">
        <div className="UserPostes">
          <section className="UserPost">
            <p className="TweetTilte">Tweet something</p>
            <div className="line"></div>
            <div className="UserInfoDetails">
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="userProfilePic"
                  alt="userProfilePic"
                />
              ) : (
                <div className="UserFirstLetters">
                  {user?.username.slice(0, 2)}
                </div>
              )}
              <form className="TweetSection" onSubmit={HandlePostTweet}>
                <div className="PostInfoHolder">
                  <textarea
                    className="UserTweetInput"
                    name="Tweet"
                    id="Tweet"
                    placeholder="What’s happening?"
                    onChange={(e) => {
                      e.preventDefault();
                      if (e.target.value.length > 0) {
                        setTweetDetails(e.target.value);
                      }
                    }}
                  ></textarea>
                  {UploadedImage && (
                    <img
                      src={UploadedImage}
                      className="ImageUploaed"
                      alt="UploadedImage"
                    />
                  )}
                </div>
                <div className="TweetSettings">
                  <div className="AdditionalDetails">
                    <label
                      htmlFor="UploadedImage"
                      className="flex items-center justify-center text-submitBtnBg"
                    >
                      <input
                        type="file"
                        name="UploadedImage"
                        id="UploadedImage"
                        className="UploadedImageInput"
                        accept="image/*"
                        onChange={handleUploadedImage}
                      />
                      <span className="material-symbols-rounded">image</span>
                    </label>
                    <div className="TweetVisibilityHolder">
                      <div className="TweetShare" ref={TweetDropDownRef}>
                        <span className="material-symbols-rounded">
                          {TweetVisibility.icon}
                        </span>
                        <p className="TweetShare">{TweetVisibility.text}</p>
                      </div>
                      {TweetVisibilityDropDown && (
                        <div className="TweetVisibilityDropDown">
                          <div className="DetailsTweetHolder">
                            <h3 className="TweetTilte">Who can reply</h3>
                            <p className="DescriptionVisiblity">
                              Choose who can reply to this Tweet.
                            </p>
                          </div>
                          <ul className="VisibilityOptions">
                            {TweetVisibilityOption.map((option) => (
                              <li
                                className="Option"
                                key={option.id}
                                onClick={() => {
                                  setTweetVisibility(option);
                                  setTweetVisibilityDropDown(false);
                                }}
                              >
                                <span className="material-symbols-rounded">
                                  {option.icon}
                                </span>
                                <p>{option.text}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="Submit" className="TweetBtn">
                    Tweet
                  </button>
                </div>
              </form>
            </div>
          </section>
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
          <div className="Trends">
            <div className="TrendsHolder">
              <p className="TrendsText">Trends for you</p>
              <div className="line"></div>
              <br />
              <ul className="ListOfTrends">
                <li className="TrendOption">
                  <h5 className="TrendLink">#ReactJs</h5>
                  <p className="TrendNumber">213k Tweets</p>
                </li>
                <li className="TrendOption">
                  <h5 className="TrendLink">#ReactJs</h5>
                  <p className="TrendNumber">213k Tweets</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
