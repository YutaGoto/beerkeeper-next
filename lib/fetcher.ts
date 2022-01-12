import axios from "axios";

async function fetcher(url: string, token: string) {
  axios.defaults.baseURL = process.env.BASE_URL;
  axios.defaults.headers.common["content-type"] =
    "application/json;charset=UTF-8";
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export default fetcher;
