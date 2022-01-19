import { axios } from "./axios";

async function fetcher(url: string, token: string) {
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export default fetcher;
