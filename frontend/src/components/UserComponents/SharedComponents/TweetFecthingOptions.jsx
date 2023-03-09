import { Link } from "react-router-dom";

export const TweetFetchingOptions = ({ OptionArray }) => {
  return (
    <div className="UserRecomendationHolder">
      <ul className="ChoicesOptionHolder">
        {OptionArray.map((option) => (
          <li className="OptionHolder group" key={option.id}>
            <Link to="">{option.text}</Link>
            <div className="userChoiceLoaderLine"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
