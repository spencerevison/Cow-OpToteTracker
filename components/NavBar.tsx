import React from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 pt-4 sm:px-4 md:px-8">
      <div className="flex-1">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Navigation"
          >
            <span className="hidden">Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <NavLinks className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow" />
        </div>
        <Link href="/">
          <a className="text-2xl normal-case sm:text-3xl">
            Cow-Op Tote Tracker
          </a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <NavLinks className="menu menu-horizontal p-0" />
      </div>
    </div>
  );
};
export default NavBar;
