import type { NextPage } from "next";
import Head from "next/head";
import OutgoingForm from "../components/OutgoingForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Log Outgoing Totes | Cow-Op Tote Tracker</title>
      </Head>
      <OutgoingForm />
    </>
  );
};

export default Home;
