import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const UserDropDown = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const data = await axios.get("http://localhost:5000/api/v1/logout");
      console.log(data);
      localStorage.removeItem("token");
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
        <li className="option">
          <span className="material-symbols-rounded">account_circle</span>
          <Link>My Profile</Link>
        </li>
        <li className="option">
          <span className="material-symbols-rounded">group</span>
          <Link>Group Chat</Link>
        </li>
        <li className="option">
          <span className="material-symbols-rounded">settings</span>
          <Link>Settings</Link>
        </li>
      </ul>
      <div className="line"></div>
      <button type="submit" className="LogOutBtn" onClick={logOut}>
        <span className="material-symbols-rounded">logout</span>
        Logout
      </button>
    </div>
  );
};
