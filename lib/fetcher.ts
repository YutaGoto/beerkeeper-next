import axios from 'axios'
const fetcher = (url: string, token: string) => {
  axios.defaults.baseURL = 'http://localhost:8000'
  axios.defaults.headers.common['content-type'] = 'application/json;charset=UTF-8'
  return axios.get(
    url, { headers: { Authorization: `Bearer ${token}` }},
  ).then(res => res.data)
}

export default fetcher
