import Head from "next/head";
import PostList from "../components/PostList";
import useSWR from "swr";
import SWRTest from "../components/SWRTest";

export default function Home({ posts }) {
  
  console.log(posts);
  return (
    <div>
      <Head>
        <title>Appostalic News</title>
        <meta name="description" content="Appostalic web development" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SWRTest />
    
    </div>
  );
}
