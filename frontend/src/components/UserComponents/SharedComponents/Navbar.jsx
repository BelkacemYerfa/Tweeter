import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../config/dataLayer";
import logo from "../../../assets/tweeter.22779de5.svg";
import { useState, useRef, useEffect } from "react";
import { UserDropDown } from "../HomeComponents/UserDropDown";

export const NavBar = () => {
  const [{ user }] = useDataLayerValue();
  const UserDropDownRef = useRef(null);
  const [UserDropDownToggle, SetUserDropDownToggle] = useState(false);

  useEffect(() => {
    if (UserDropDownRef.current !== null) {
      window.addEventListener("click", (e) => {
        if (!UserDropDownRef.current.contains(e.target)) {
          SetUserDropDownToggle(false);
        } else {
          SetUserDropDownToggle(true);
        }
      });
    }
  });
  return (
    <nav className="NavigationBar">
      <div className="LogoHolder">
        <img src={logo} alt="TweeterLogo" />
      </div>
      <ul className="UserLinks">
        <li className="LinkHolder group ">
          <Link to={`/Home/${user?.username}`} className="userLink">
            Home
          </Link>
          <div className="userLinkHover"></div>
        </li>
        <li className="LinkHolder group">
          <Link to="/Explore" className="userLink">
            Explore
          </Link>
          <div className="userLinkHover"></div>
        </li>
        <li className="LinkHolder group">
          <Link to="/Bookmarks" className="userLink">
            Bookmarks
          </Link>
          <div className="userLinkHover"></div>
        </li>
      </ul>
      <div className="UserDrop">
        <div className="AccountDropDownHolder" ref={UserDropDownRef}>
          <div className="UserInfoHolder">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="userProfilePic"
                alt="user profilePic"
              />
            ) : (
              <div className="UserFirstLetters">
                {user?.username?.slice(0, 2)}
              </div>
            )}
            <h3 className="Username">{user?.username}</h3>
          </div>
          <div className="DropDownIcon">
            <span className="material-symbols-rounded">expand_more</span>
          </div>
        </div>
        {UserDropDownToggle && <UserDropDown />}
      </div>
    </nav>
  );
};
