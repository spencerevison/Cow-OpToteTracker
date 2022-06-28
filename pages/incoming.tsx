import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import IncomingForm from "../components/IncomingForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cow-Op Barcode Scanner</title>
        <meta
          name="description"
          content="Utility application for tracking tote inventory"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <NavBar />
      </header>
      <main className="my-8 mx-4 sm:mx-8 md:mx-12">
        <IncomingForm />
      </main>
    </>
  );
};

export default Home;
