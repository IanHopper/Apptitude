import Head from "next/head";
import Header from "../components/Header";

const about = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Header />
      <div>
        <h2>
          About <span className="brand">App</span>titude
        </h2>
        <p>
          Apptitude is task planning application that allows for project based
          cost and time estimation.
        </p>
        <h2>Technologies</h2>
        <p>Apptitude uses a Next.js with typescript and connects to a Django REST API with a PostgreSQL DB. Deployment is with Docker.</p>
      </div>
    </>
  );
};

export default about;
