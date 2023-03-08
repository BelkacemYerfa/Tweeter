import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDropDownOptions } from "../../../static/UserDropDownOptions";

export const UserDropDown = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const data = await axios.get("http://localhost:4000/api/v1/logout");
      console.log(data);
      if (data.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="UserDropdown">
      <ul className="OptionList">
        {UserDropDownOptions.map((option) => (
          <li className="option" key={option.id}>
            <span className="material-symbols-rounded">{option.icon}</span>
            <Link>{option.text}</Link>
          </li>
        ))}
      </ul>
      <div className="line"></div>
      <button type="submit" className="LogOutBtn" onClick={logOut}>
        <span className="material-symbols-rounded">logout</span>
        Logout
      </button>
    </div>
  );
};
