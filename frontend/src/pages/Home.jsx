import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const Home = () => {
 const navigate = useNavigate();
 const { username } = useParams();
 const logOut = async () => {
  try {
    const data = await axios.get('http://localhost:5000/api/v1/logout');
    console.log(data);
    localStorage.removeItem('token');
    if(data.status === 200){
     navigate('/login');
    }
  } catch (error) {
   console.log(error);
  }
 }
 return(
  <>
   <h1>
    Welcome { username }
   </h1>
   <button onClick={logOut} >
    logOut
   </button>
  </>
 );
}