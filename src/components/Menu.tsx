"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartIcon from "./CartIcon";
import { signOut, useSession } from "next-auth/react";

const links = [
  { id: 1, title: "Homepage", url: "/" },
  { id: 2, title: "Menu", url: "/pages/menu" },
  { id: 3, title: "Working Hours", url: "/" },
  { id: 4, title: "Contact", url: "/pages/contact" },
];

const Menu = () => {
  const [open, setOpen] = useState(false);

  // TEMPORARY
  const { status } = useSession();

  return (
    <div>
      <Image
        src={open ? "/close.png" : "/open.png"}
        alt=""
        width={20}
        height={20}
        onClick={() => setOpen(!open)}
        className="cursor-pointer"
      />
      {open && (
        <div className="bg-red-500 text-white absolute left-0 top-24 w-full flex flex-col gap-5 items-center justify-center text-xl z-10 px-2 py-3">
          {links.map((item) => (
            <Link key={item.id} href={item.url} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}

          <Link
            href={status === "authenticated" ? "/pages/orders" : "/pages/login"}
            onClick={() => setOpen(false)}
          >
            {status === "authenticated" ? "Orders" : "Login"}
          </Link>

          {status === "authenticated" && (
            <span className="cursor-pointer" onClick={() => signOut()}>
              Logout
            </span>
          )}

          <Link href="/pages/cart" onClick={() => setOpen(false)}>
            <CartIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
