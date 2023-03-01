import { useDataLayerValue } from "../../../config/dataLayer";
import { useState } from "react";

export const UserHome = ()=>{
 const [{user}] = useDataLayerValue();
 const [TweetVisibilityDropDown , setTweetVisibilityDropDown] = useState(false);
 return (
  <section className="UserHomePage" >
   <section className="UserHomePageDetails" >
    <div className="UserPostes" >
      <section className="UserPost" >
       <p className="TweetTilte">
        Tweet something
       </p>
       <div className="line"></div>
       <div className="UserInfoDetails" >
        {
         user?.profilePic ? (
           <img src={user?.profilePic} className="userProfilePic" alt="userProfilePic" />
         ) : (
           <div className="UserFirstLetters" >
             {user?.username.slice(0,2)}
           </div>
         )
        }
        <div className="TweetSection" >
         <textarea className="UserTweetInput" name="Tweet" id="Tweet" 
          placeholder="What’s happening?" >
         </textarea>
         <div className="TweetSettings" >
           <div className="AdditionalDetails" >
            <span className="material-symbols-rounded AddStyle">
             image
            </span>
            <div className="TweetVisibilityHolder" >
             <div className="TweetShare" onClick={()=>{
              setTweetVisibilityDropDown(!TweetVisibilityDropDown);
             }} >
              <span className="material-symbols-rounded">
               public
              </span>
              <p className="TweetShare" >
               Everyone can reply
              </p>
             </div>
             {
              TweetVisibilityDropDown && (
                <div className="TweetVisibilityDropDown" >
                  <div className="DetailsTweetHolder" >
                   <h3 className="TweetTilte" >Who can reply</h3>
                   <p className="DescriptionVisiblity" >Choose who can reply to this Tweet.</p>
                  </div>
                  <ul className="VisibilityOptions">
                   <li className="Option" >
                    <span className="material-symbols-rounded">public</span>
                    <p>Everyone</p>
                   </li>
                   <li className="Option" >
                    <span className="material-symbols-rounded">group</span>
                    <p>people you follow</p>
                   </li>
                  </ul>
                </div>
              )
             }
            </div>
           </div>
           <button type="Submit" className="TweetBtn" >
             Tweet
           </button>
         </div>
        </div>
       </div>
      </section>
    </div>
    <div className="UserRecomendations" >

    </div>
   </section>
  </section>
 );
}