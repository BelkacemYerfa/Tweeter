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
  const TweetOption = [
    {
      icon: "mode_comment",
      text: "Comment",
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
              className="userProfilePic"
              alt="user profilePic"
            />
          ) : (
            <div className="UserFirstLetters">
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
            <p className="DetailsOption">{Comments} Comments</p>
            <p className="DetailsOption">{Liked} Likes</p>
            <p className="DetailsOption">{Saved} Saved</p>
          </div>
        </div>
        <div className="line"></div>
        <div className="BtnSettingsInfo">
          {TweetOption.map((option) => (
            <div className="OptionDetails" key={option.text}>
              <span class="material-symbols-rounded">{option.icon}</span>
              <p className="OptionText">{option.text}</p>
            </div>
          ))}
        </div>
        <div className="line"></div>
      </div>
    </div>
  );
};
