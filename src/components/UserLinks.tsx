"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const UserLinks = () => {
  const { status, data } = useSession();

  return (
    <div>
      {/* {data?.user.name! && (
        <div>
          <Image src={data?.user.image!} alt="avatar" />
        </div>
      )} */}
      {status === "authenticated" ? (
        <div>
          <Link href="/pages/orders">Orders</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>
            Logout
          </span>
        </div>
      ) : (
        <Link href="/pages/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
