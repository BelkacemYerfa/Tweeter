import { BookMarksTweets } from "../components/UserComponents/BookMarksComponent/BookMarkTweets";
import { NavBar } from "../components/UserComponents/SharedComponents/Navbar";

export const BookMarks = () => {
  return (
    <div className="BookMarks">
      <NavBar />
      <BookMarksTweets />
    </div>
  );
};
