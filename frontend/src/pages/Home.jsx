import { useParams } from "react-router-dom";
import { NavBar } from "../components/UserComponents/HomeComponents/Navbar";
import { UserHome } from "../components/UserComponents/HomeComponents/UserHome";
export const Home = () => {
 const { username } = useParams();
 return(
  <section className="Home" >
    <NavBar />
    <UserHome />
  </section>
 );
}