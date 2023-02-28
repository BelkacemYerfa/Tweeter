import { Link } from "react-router-dom";
import { useDataLayerValue } from "../../../config/dataLayer";
import logo from '../../../assets/tweeter.22779de5.svg'
import { useState } from "react";
import { UserDropDown } from "./UserDropDown";

export const NavBar = ()=>{
 const [{user}] = useDataLayerValue();
 const [UserDropDownToggle , SetUserDropDownToggle] = useState(false);

 const DropDownVisibility = ()=>{
  SetUserDropDownToggle(!UserDropDownToggle);
 }

 return (
  <nav className="NavigationBar" >
    <div className="LogoHolder" >
     <img src={logo} alt="TweeterLogo" />
    </div>
    <div className="UserLinks" >
     <div className="LinkHolder group " >
      <Link to={`/${user?.username}`} className='userLink' >Home</Link>
      <div className="userLinkHover" ></div>
     </div>
     <div className="LinkHolder group" >
      <Link to='/Explore' className='userLink' >Explore</Link>
      <div className="userLinkHover" ></div>
     </div>
     <div className="LinkHolder group" >
      <Link to='/Bookmarks' className='userLink' >Bookmarks</Link>
      <div className="userLinkHover" ></div>
     </div>
    </div>
    <div className="UserDrop" >
     <div className="AccountDropDownHolder" onClick={DropDownVisibility} >
      <div className="UserInfoHolder" >
       {
        user?.profilePic ? 
        (<img src={user?.profilePic} className='userProfilePic' alt='user profilePic' />) : 
        (<div className="UserFirstLetters" >
          {user?.username.slice(0,2)}
        </div>)
       }
       <h3 className="Username" >
        {
         user?.username
        }
       </h3>
      </div>
      <div className="DropDownIcon">
       <span className="material-symbols-rounded">
        expand_more
       </span>
      </div>
     </div>
     {
      UserDropDownToggle && (
       <UserDropDown />
      )
     }
    </div>
  </nav>
 );
}