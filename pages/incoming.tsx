import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Head from "next/head";
const IncomingForm = dynamic(() => import("../components/IncomingForm"), {
  suspense: true,
});

const Incoming: NextPage = () => {
  return (
    <>
      <Head>
        <title>Log Incoming Totes | Cow-Op Tote Tracker</title>
      </Head>
      <Suspense fallback={`Loading...`}>
        <IncomingForm />
      </Suspense>
    </>
  );
};

export default Incoming;
