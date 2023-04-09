import { axios } from "./axios";

async function fetcher(url: string, token: string | undefined) {
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.data) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  return res.data;
}

export default fetcher;
