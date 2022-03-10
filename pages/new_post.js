
import Head from "next/head";
import NewPost from "../components/NewPost";

const new_post = () => {
  return (
    <>
      <Head>
        <title>New Post</title>
      </Head>
      <NewPost/>
    </>
  );
};

export default new_post;
