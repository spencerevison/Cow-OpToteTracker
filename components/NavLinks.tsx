import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type NavLinksProps = {
  className: string;
};

const clickHandler = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

const NavLinks: React.FC<NavLinksProps> = ({ className }) => {
  const router = useRouter();

  return (
    <ul tabIndex={0} className={className}>
      <li className="mr-4">
        <Link href="/outgoing">
          <a
            onClick={clickHandler}
            className={`
              ${router.pathname == "/outgoing" ? "underline" : ""}
            `}
          >
            Log Outgoing Totes
          </a>
        </Link>
      </li>
      <li>
        <Link href="/incoming">
          <a
            onClick={clickHandler}
            className={`
              ${router.pathname == "/incoming" ? "underline" : ""}
            `}
          >
            Log Incoming Totes
          </a>
        </Link>
      </li>
    </ul>
  );
};
export default NavLinks;
