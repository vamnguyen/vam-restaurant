"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const UserLinks = () => {
  const { status, data } = useSession();
  return (
    <div className="flex justify-between items-center gap-2">
      {status === "loading" ? (
        <div>loading...</div>
      ) : (
        data?.user?.image && (
          <Image
            src={data?.user?.image}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        )
      )}

      {status === "authenticated" ? (
        <div>
          <Link href="/pages/orders">Orders</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>
            Logout
          </span>
        </div>
      ) : (
        status !== "loading" && <Link href="/pages/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
