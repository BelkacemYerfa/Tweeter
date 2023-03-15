import axios from "axios";
import { useEffect, useState } from "react";
import { configHeaderAuth } from "../config/configHeaderForTheAuthApi";

//still under constraction.
const AuthorizationBearer = `Bearer ${localStorage.getItem("token")}`;
//try to optimize this code
//by passing just the endPoint for the url
export const useFetch = (ApiMethod, Url) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios({
      method: ApiMethod,
      url: Url,
      headers: {
        Authorization: AuthorizationBearer,
      },
    }).then((res) => {
      console.log(res);
      setData(res.data);
    });
  }, [ApiMethod, Url]);
  return [data];
};
