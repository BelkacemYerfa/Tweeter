import { Link } from "react-router-dom";
import { RegistrationSchema } from "../../static/authSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDataLayerValue } from "../../config/dataLayer";

export const RegisterForm = () => {
  const [{ user }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RegistrationSchema),
  });
  const onSubmitHandle = async (data) => {
    try {
      const UserData = await axios.post(
        "http://localhost:4000/api/v1/register",
        data
      );
      if (UserData?.status === 201) {
        dispatch({
          type: "SET_USER",
          user: UserData?.data?.userInfo,
        });
      }
      if (UserData?.data?.token) {
        localStorage.setItem("token", UserData?.data?.token);
        localStorage.setItem("user", JSON.stringify(UserData?.data?.userInfo));
        console.log(user);
        navigate(`/Home/${user?.username}`);
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }
  };
  return (
    <section className="FormHolder" onSubmit={handleSubmit(onSubmitHandle)}>
      <div className="FormDetails">
        <div className="FormCenter">
          <h2 className="TitleRegistraion">
            Join thousands of learners from around the world
          </h2>
          <br />
          <p className="Description">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <br />
        <form action="" className="Form">
          <div className="InputFormHolder">
            <span class="material-symbols-rounded">account_circle</span>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              {...register("username")}
            />
          </div>
          {formState.errors.username?.message && (
            <ErrorMsg error={formState.errors.username?.message} />
          )}
          <div className="InputFormHolder">
            <span className="material-symbols-rounded">mail</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          {formState.errors.email?.message && (
            <ErrorMsg error={formState.errors.email?.message} />
          )}
          <div className="InputFormHolder">
            <span className="material-symbols-rounded">lock</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
          </div>
          {formState.errors.password?.message && (
            <ErrorMsg error={formState.errors.password?.message} />
          )}
          <div className="InputFormHolder">
            <span className="material-symbols-rounded">lock</span>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
          </div>
          {formState.errors.confirmPassword?.message && (
            <ErrorMsg error={formState.errors.confirmPassword?.message} />
          )}
          <button type="submit" className="SubmitBtn">
            start coding now
          </button>
        </form>
        <br />
        <div className="HolderAccount">
          <p className="HolderUserAccount">
            Already a member?
            <Link to="/login" className="Link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
