import { useState } from "react";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../config/dataLayer";
import { TweetOption } from "../../../static/TweeteOptions";
import axios from "axios";

export const TweeterPostData = ({
  TweetDetails,
  TweetId,
  TweetImage,
  UserInfo,
  CreateDate,
  Comments,
  Liked,
  Saved,
}) => {
  const [{ user }] = useDataLayerValue();
  const [UploadedCommentImage, SetUploadedCommentImage] = useState(null);
  const SaveTweet = async () => {
    const data = {
      token: localStorage.getItem("token"),
      tweetId: TweetId,
      userId: user?._id,
    };
    const SaveTweet = await axios.patch(
      "http://localhost:4000/api/v1/savedTweet",
      data
    );
    console.log(SaveTweet);
  };
  const likedTweet = async () => {
    const data = {
      token: localStorage.getItem("token"),
      tweetId: TweetId,
      userId: user?._id,
    };
    const UpdateTweet = await axios.patch(
      "http://localhost:4000/api/v1/likeTweet",
      data
    );
    console.log(UpdateTweet);
  };
  const HandleUploadedImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    SetUploadedCommentImage(URL.createObjectURL(file));
  };
  return (
    <div className="TweetHolder">
      <div className="InfoTweetHolder">
        <div className="UserInfoHolder">
          {UserInfo?.profilePic ? (
            <img
              src={UserInfo?.profilePic}
              className="userProfilePic UserFirstLettersSize"
              alt="user profilePic"
            />
          ) : (
            <Link
              to={`/profile/${UserInfo?.username}`}
              className="UserFirstLetters UserFirstLettersSize"
            >
              {UserInfo?.username.slice(0, 2)}
            </Link>
          )}
          <div className="InfoHolder">
            <Link
              to={`/profile/${UserInfo?.username}`}
              className="hover:underline"
            >
              {UserInfo?.username}
            </Link>
            <p className="CreationDate">{CreateDate}</p>
          </div>
        </div>
        <div className="UserDetails">
          <p className="DetailsInfo">{TweetDetails}</p>
          <br />
          <div className="ImagePostedHodler">
            {TweetImage && (
              <div className="ImagePostHodler">
                <img
                  src={TweetImage}
                  className="TweetImage"
                  alt="UserPostedImage"
                />
              </div>
            )}
            {
              //to render the image you need to check the Url image generatred
              //cause their are aved with the localHost:3000hostSpot
            }
          </div>
        </div>
        <div className="TweetInfoDetails">
          <div className="TweetInfoSettingsHolder">
            <p className="DetailsOption">{0} Comments</p>
            <p className="DetailsOption">{Liked} Likes</p>
            <p className="DetailsOption">{Saved} Saved</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="BtnSettingsInfo">
          {TweetOption.map((option) => (
            <div
              className={`OptionDetails ${option.text} duration-300 ease-in-out hover:font-semibold`}
              key={option.id}
              onClick={
                option.text === "Saved"
                  ? SaveTweet
                  : option.text === "Liked"
                  ? likedTweet
                  : null
              }
            >
              <div className="OptionDetailsHolder">
                <span className="material-symbols-rounded">{option.icon}</span>
                <p className="OptionText">{option.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="line"></div>
        <div className="UserCommentHolder">
          {user?.profilePic ? (
            <img
              src={user?.profilePic}
              className="userProfilePic UserFirstLettersSize"
              alt="user profilePic"
            />
          ) : (
            <div className="UserFirstLetters UserFirstLettersSize ">
              {user?.username?.slice(0, 2)}
            </div>
          )}
          <form action="" className="CommentForm">
            <input
              type="text"
              className="CommentInput"
              placeholder="Tweet your reply"
            />
            <label
              htmlFor="fileInputComment"
              className="flex items-center justify-center text-userHolder"
            >
              <input
                type="file"
                accept="image/*"
                id="fileInputComment"
                name="fileInputComment"
                className="UploadedImageInput"
              />
              {UploadedCommentImage ? (
                <img
                  src={UploadedCommentImage}
                  className="UploadeCommentImage"
                  alt="uploadedImage"
                />
              ) : (
                <span className="material-symbols-rounded">image</span>
              )}
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};
