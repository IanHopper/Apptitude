import Head from "next/head";
import Register from "../components/Register";

const register = () => {
  return (
    <>
      <Head>
        <title>New Post</title>
      </Head>
      <Register/>
    </>
  );
};

export default register;