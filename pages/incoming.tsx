import type { NextPage } from "next";
import Head from "next/head";
import AdditionForm from "../components/AdditionForm";
import NavBar from "../components/NavBar";

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
        <AdditionForm />
      </main>
    </>
  );
};

export default Home;
