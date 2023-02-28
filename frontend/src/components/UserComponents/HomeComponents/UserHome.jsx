import { useDataLayerValue } from "../../../config/dataLayer";


export const UserHome = ()=>{
 const [{user}] = useDataLayerValue();
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
            <span className="material-symbols-rounded">
             image
            </span>
            <div className="TweetShare" >
             <span className="material-symbols-rounded">
              public
             </span>
             <p className="TweetShare" >
              Everyone can reply
             </p>
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