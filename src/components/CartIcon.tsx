"use client";
import { useCartStore } from "@/utils/store";
// import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
// import { toast } from "react-toastify";

const CartIcon = () => {
  // const { data: session, status } = useSession();
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  // const userIsAdmin = () => {
  //   return session?.user.isAdmin ? "/add" : "";
  // };

  // const userNotification = () => {
  //   if (!session?.user.isAdmin) {
  //     toast.warning("You are not allowed! Only Admin has added new product.");
  //   }
  // };

  return (
    <div className="flex flex-col gap-4 md:gap-2 md:flex-row">
      <Link href={"/pages/cart"} className="flex items-center gap-2">
        <div className="relative w-8 h-8">
          <Image
            src={"/cart.png"}
            alt=""
            fill
            sizes="100%"
            className="object-contain"
          />
        </div>
        <span>Cart ({totalItems})</span>
      </Link>
      <Link href={"/pages/add"}>
        <button
          className="p-1 bg-red-500 text-white rounded-md"
          // onClick={userNotification}
        >
          Add product
        </button>
      </Link>
    </div>
  );
};

export default CartIcon;
