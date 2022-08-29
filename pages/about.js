import Head from "next/head";
import Header from "../components/Header";

const about = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <div>
        <h2>About</h2>
        <p>
          This app is a learning project which connects a Django REST API
          deployed to Heroku with a Next.js deployed to Vercel.
        </p>
      </div>
    </>
  );
};

export default about;
