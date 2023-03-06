import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoginSchema } from "../../static/authSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMsg } from "../ErrorMsg/ErrorMsg";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../../config/dataLayer";
import axios from "axios";

export const LoginForm = () => {
  const [{ user }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  const [UserData, setUserData] = useState(null);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const onSubmitHandle = async (data) => {
    try {
      const LoginUserData = await axios.post(
        "http://localhost:4000/api/v1/login",
        data
      );
      if (LoginUserData.status === 201) {
        dispatch({
          type: "SET_USER",
          user: LoginUserData.data.userInfo,
        });
        if (LoginUserData.data.token) {
          localStorage.setItem("token", LoginUserData.data.token);
          setUserData(LoginUserData);
          navigate(`/${LoginUserData.data.userInfo.username}`);
        }
      } else {
        setUserData(LoginUserData);
      }
    } catch (error) {
      localStorage.removeItem("token");
      console.log(error);
    }
  };
  const getAllTweets = async () => {
    const data = {
      token: localStorage.getItem("token"),
    };
    //data to be sent to backend
    const AllTweets = await axios.post(
      "http://localhost:4000/api/v1/getAllTweets",
      data
    );
    console.log(AllTweets);
    if (AllTweets.status === 201) {
      dispatch({
        type: "SET_POSTED_TWEETS",
        PostedTweets: AllTweets.data,
      });
    }
  };
  useEffect(() => {
    getAllTweets();
  });
  return (
    <section className="FormHolder" onSubmit={handleSubmit(onSubmitHandle)}>
      <div className="FormDetails">
        <div className="FormCenter">
          <h2 className="TitleRegistraion">Login</h2>
        </div>
        <br />
        <form action="" className="Form">
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
          {UserData?.msg && <ErrorMsg error={UserData.msg} />}
          <button type="submit" className="SubmitBtn">
            start coding now
          </button>
        </form>
        <br />
        <div className="HolderAccount">
          <p className="HolderUserAccount">
            Don’t have an account yet?{" "}
            <Link to="/registration" className="Link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
