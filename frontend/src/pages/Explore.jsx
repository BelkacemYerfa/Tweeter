import { ExploreTweets } from "../components/UserComponents/ExploreComponents/ExploreTweets";
import { NavBar } from "../components/UserComponents/SharedComponents/Navbar";

export const Explore = () => {
  return (
    <section className="Explore">
      <NavBar />
      <ExploreTweets />
    </section>
  );
};
