import axios from "axios";

const url = "http://localhost:4000/api/v1/";

export const useFetchGetMethod = async (initialValue) => {
  const { status, data } = await axios.get(url + initialValue);

  return [data, status];
};

export const useFetchPostMethod = async (initialValue, sendData) => {
  const { status, data } = await axios.post(url + initialValue, sendData);

  return [data, status];
};

//still under constraction.
