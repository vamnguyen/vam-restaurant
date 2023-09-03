import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="h-12 p-4 py-10 md:h-24 lg:px-20 xl:px-40 text-red-500 flex items-center justify-between border-t-2 border-t-red-500 text-center">
      <Link href="/" className="font-extrabold text-xl">
        VAM Restaurant
      </Link>
      <p className="">© ALL RIGHTS RESERVED.</p>
    </div>
  );
};

export default Footer;
