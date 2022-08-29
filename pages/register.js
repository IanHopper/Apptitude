import Head from "next/head";
import Register from "../components/Register";
import Header from "../components/Header";

const register = () => {
  return (
    <>
      <Head>
        <title>Logout</title>
      </Head>
      <Header />
      <Register />
    </>
  );
};

export default register;
