import axios from "axios";
import { useEffect, useState } from "react";
import { configHeaderAuth } from "../config/configHeaderForTheAuthApi";

/* const url = "http://localhost:4000/api/v1/";

export const useFetchGetMethod = async (initialValue) => {
  const { status, data } = await axios.get(url + initialValue);

  return [data, status];
};

export const useFetchPostMethod = async (initialValue, sendData) => {
  const { status, data } = await axios.post(url + initialValue, sendData);

  return [data, status];
};
 */
//still under constraction.
const AuthorizationBearer = `Bearer ${localStorage.getItem("token")}`;

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
