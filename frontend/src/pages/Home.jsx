import axios from "axios";
import { redirect, useParams } from "react-router-dom";

export const Home = () => {
 const { username } = useParams();
 return(
  <>
   <h1>
    Welcome { username }
   </h1>
   <button >
    logOut
   </button>
  </>
 );
}