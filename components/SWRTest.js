import useSWR from "swr";
import PostList from "./PostList";


const fetcher = (...args) => fetch(...args).then((res) => res.json())

const dev = false
const local = "http://127.0.01:8000/api/v1/"
const heroku = "https://ihop-blog-api.herokuapp.com/api/v1/"
const url = dev ? local : heroku
const token = 'ebe0b03ab76f86f3c2c892f38628ee79ba70d88b'
const body = { method: 'GET', mode: 'no-cors', headers: { Authorization: `Token ${token}`}}

const SWRTest = () => {
  const { data, error } = useSWR(url, async (url) => fetcher(url, body));

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <PostList posts={data}></PostList>

};

export default SWRTest;
