import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <h1 className="text-2xl">Start Tracking Totes!</h1>
      <div className="mx-auto flex max-w-xs flex-col">
        <Link href="/outgoing">
          <a className="btn mt-8">Log Outgoing Totes</a>
        </Link>
        <Link href="/incoming">
          <a className="btn mt-6">Log Incoming Totes</a>
        </Link>
      </div>
    </>
  );
};

export default Home;
