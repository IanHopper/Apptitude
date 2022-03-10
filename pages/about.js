import SWRTest from "../components/SWRTest";
import Head from "next/head";

const about = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h1>About</h1>
      <SWRTest />
    </>
  );
};

export default about;
