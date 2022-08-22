import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Head from "next/head";
const OutgoingForm = dynamic(() => import("../components/OutgoingForm"), {
  suspense: true,
});

const Outgoing: NextPage = () => {
  return (
    <>
      <Head>
        <title>Log Outgoing Totes | Cow-Op Tote Tracker</title>
      </Head>
      <Suspense fallback={`Loading...`}>
        <OutgoingForm />
      </Suspense>
    </>
  );
};

export default Outgoing;
