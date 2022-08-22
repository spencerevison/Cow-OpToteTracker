import type { NextPage } from "next";
import Head from "next/head";
import OutgoingForm from "../components/OutgoingForm";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Log Outgoing Totes | Cow-Op Tote Tracker</title>
        <meta
          name="description"
          content="Utility application for tracking tote inventory"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavBar />
      </header>
      <main className="my-1 mx-4 sm:mx-8 md:my-8 md:mx-12">
        <OutgoingForm />
      </main>
    </>
  );
};

export default Home;
