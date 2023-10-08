import Link from "next/link";
import React from "react";
import Menu from "./Menu";
import CartIcon from "./CartIcon";
import UserLinks from "./UserLinks";

const Navbar = () => {
  return (
    <div className="h-12 text-red-500 p-4 flex items-center justify-between border-b-2 border-b-red-500 uppercase md:h-24 lg:px-20 xl:px-30 gap-1 lg:gap-5">
      {/* LEFT LINKS */}
      <div className="hidden md:flex gap-4 flex-1 font-semibold">
        <Link href="/">Homepage</Link>
        <Link href="/pages/menu">Menu</Link>
        <Link href="/pages/contact">Contact</Link>
      </div>

      {/* LOGO */}
      <div className="text-2xl font-extrabold  md:text-center">
        <Link href={"/"}>VAM Restaurant</Link>
      </div>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <Menu />
      </div>

      {/* RIGHT LINKS */}
      <div className="hidden md:flex gap-6 items-center justify-end flex-1 font-semibold">
        {/* <div className="md:absolute lg:w-[140px] top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
          <Image src="/phone.png" alt="" width={20} height={20} />
          <span>0397 923 904</span>
        </div> */}
        <UserLinks />
        <CartIcon />
      </div>
    </div>
  );
};

export default Navbar;
