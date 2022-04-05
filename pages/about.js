import Head from "next/head";
import Header from "../components/Header";



const about = () => {

  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Header />
      <h1>About</h1>
      <p>
        This is an app is to test a connection between a Django REST API hosted on
        heroku with a Next.js app hosted on Vercel.
      </p>
   
      
    </>
  );
};

export default about;
