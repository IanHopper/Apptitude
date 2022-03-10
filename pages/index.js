import Head from "next/head";
import PostList from "../components/PostList";
import SWRTest from "../components/SWRTest";



export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      <Head>
        <title>Appostalic News</title>
        <meta name="description" content="Appostalic web development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRTest/>
      <PostList posts={posts}></PostList>
    </div>
  );
}

const dev = false
const local = "http://127.0.01:8000/api/v1/"
const heroku = "https://ihop-blog-api.herokuapp.com/api/v1/"
const url = dev ? local : heroku
const token = 'ebe0b03ab76f86f3c2c892f38628ee79ba70d88b'
const data = { method: 'GET', headers: { Authorization: `Token ${token}`}}

export const getStaticProps = async () => {
  const res = await fetch(url, data);
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};

