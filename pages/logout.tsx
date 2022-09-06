import Logout from "../components/Logout";
import Head from "next/head";
import Header from "../components/Header";

const logout = () => {
  return (
    <>
      <Head>
        <title>Logout</title>
      </Head>
      <Header />
      <Logout />
    </>
  );
};

export default logout;
