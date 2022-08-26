import React from "react";
import NavBar from "./NavBar";

type LayoutProps = {
  children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="my-1 mx-4 text-center text-sm sm:mx-8 sm:text-base md:mx-12 md:my-8">
        {children}
      </main>
    </>
  );
};

export default Layout;
