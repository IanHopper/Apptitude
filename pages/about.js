import Head from "next/head";

const about = () => {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h1>About</h1>
      <p>
        This is an app is to test a connection between a Django REST API hosted on
        heroku with a Next.js app hosted on Vercel.
      </p>
    </>
  );
};

export default about;
