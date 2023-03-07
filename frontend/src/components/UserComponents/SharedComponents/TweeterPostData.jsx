import { useState } from "react";
import { useDataLayerValue } from "../../../config/dataLayer";

export const TweeterPostData = ({
  TweetDetails,
  TweetImage,
  TweetVisibility,
  UserInfo,
  CreateDate,
  Comments,
  Liked,
  Saved,
}) => {
  const [{ user }] = useDataLayerValue();
  const [UploadedCommentImage, SetUploadedCommentImage] = useState(null);

  const HandleUploadedImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    SetUploadedCommentImage(URL.createObjectURL(file));
  };
  const TweetOption = [
    {
      icon: "mode_comment",
      text: "Comment",
    },
    {
      icon: "sync",
      text: "Retweet",
    },
    {
      icon: "favorite",
      text: "Liked",
    },
    {
      icon: "bookmark",
      text: "Saved",
    },
  ];
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
            <div className="UserFirstLetters UserFirstLettersSize">
              {UserInfo?.username.slice(0, 2)}
            </div>
          )}
          <div className="InfoHolder">
            <h3 className="UserInfoName">{UserInfo?.username}</h3>
            <p className="CreationDate">{CreateDate}</p>
          </div>
        </div>
        <div className="UserDetails">
          <p className="DetailsInfo">{TweetDetails}</p>
          <br />
          {TweetImage && (
            <img
              src={TweetImage}
              className="TweetImage"
              alt="UserPostedImage"
            />
          )}
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
            <div className="OptionDetails" key={option.text}>
              <div className="OptionDetailsHolder">
                <span class="material-symbols-rounded">{option.icon}</span>
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
