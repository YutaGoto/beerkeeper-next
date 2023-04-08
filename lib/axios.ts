import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response?.status === 401) {
      return err.response;
    }
    return Promise.reject(err);
  }
);
