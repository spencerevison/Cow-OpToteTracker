import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
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
      <main className="my-8 mx-4 text-center sm:mx-8 md:mx-12">
        <h1 className="text-2xl">Start Tracking Totes!</h1>
        <div className="mx-auto flex max-w-xs flex-col">
          <Link href="/outgoing">
            <a className="btn mt-8">Log Outgoing Totes</a>
          </Link>
          <Link href="/incoming">
            <a className="btn mt-6">Log Incoming Totes</a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
