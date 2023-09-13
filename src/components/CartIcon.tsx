"use client";
import { useCartStore } from "@/utils/store";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const CartIcon = () => {
  const { totalItems } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return (
    <Link href={"/cart"} className="flex items-center gap-2">
      <div className="relative w-8 h-8">
        <Image src={"/cart.png"} alt="" fill />
      </div>
      <span>Cart ({totalItems})</span>
    </Link>
  );
};

export default CartIcon;
