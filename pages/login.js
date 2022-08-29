import Head from "next/head";
import Login from "../components/Login";
import Header from "../components/Header";

const login = () => {
  
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header/>
      <Login/>
    </>
  );
};

export default login;
