import { useDataLayerValue } from "../../../config/dataLayer";
import { useState, useRef, useEffect } from "react";
import { TweetVisibilityOption } from "../../../static/UserTweetVisibility";

export const UserHome = () => {
  const [{ user }] = useDataLayerValue();
  const TweetDropDownRef = useRef(null);
  const [TweetVisibilityDropDown, setTweetVisibilityDropDown] = useState(false);
  const [TweetVisibility, setTweetVisibility] = useState({
    icon: "public",
    text: "Everyone can reply",
  });
  const [UploadedImage, setUploadedImage] = useState(null);
  const handleUploadedImage = (e) => {
    const file = e.target.files[0];
    setUploadedImage(URL.createObjectURL(file));
  };
  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!TweetDropDownRef.current.contains(e.target)) {
        setTweetVisibilityDropDown(false);
        console.log(e.target);
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
              <div className="TweetSection">
                <div className="PostInfoHolder">
                  <textarea
                    className="UserTweetInput"
                    name="Tweet"
                    id="Tweet"
                    placeholder="What’s happening?"
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
                    <label htmlFor="UploadedImage" className="text-submitBtnBg">
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
              </div>
            </div>
          </section>
        </div>
        <div className="UserRecomendations"></div>
      </section>
    </section>
  );
};
