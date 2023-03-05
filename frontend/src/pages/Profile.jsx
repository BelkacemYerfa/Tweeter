import { useParams } from "react-router-dom";

export const Profile = () => {
  const { username } = useParams();
  return <h1>{username} this is your profile</h1>;
};
