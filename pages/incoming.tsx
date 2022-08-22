import type { NextPage } from "next";
import Head from "next/head";
import IncomingForm from "../components/IncomingForm";

const Incoming: NextPage = () => {
  return (
    <>
      <Head>
        <title>Log Incoming Totes | Cow-Op Tote Tracker</title>
      </Head>
      <IncomingForm />
    </>
  );
};

export default Incoming;
