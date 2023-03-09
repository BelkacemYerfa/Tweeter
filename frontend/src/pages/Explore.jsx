import { ExploreTweets } from "../components/UserComponents/ExploreComponents/ExploreTweets";
import { NavBar } from "../components/UserComponents/HomeComponents/Navbar";

export const Explore = () => {
  return (
    <section className="Explore">
      <NavBar />
      <ExploreTweets />
    </section>
  );
};
