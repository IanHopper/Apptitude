import Head from "next/head";
import styles from "../styles/Home.module.css";
import PostList from "../components/PostList";

export default function Home({ posts }) {
  console.log(posts)
  return (
    <div>
      <Head>
        <title>Appostalic News</title>
        <meta name="description" content="Appostalic web development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PostList posts={posts}></PostList>
    </div>
  );
}

const dev = false
const local = "http://127.0.01:8000/api/v1/"
const heroku = "https://ihop-blog-api.herokuapp.com/api/v1/"
const url = dev ? local : heroku
const token = 'ebe0b03ab76f86f3c2c892f38628ee79ba70d88b'

export const getStaticProps = async () => {
  const res = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Token ${token}`}
  });
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
