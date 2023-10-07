"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteButton = ({ id }: { id: string }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <p>Loading... please wait</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    return;
  }

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (res.status === 200) {
      router.push("/pages/menu");
      toast.success("The product has been deleted!");
    } else {
      const err = await res.json();
      toast.error(err.message);
    }
  };

  return (
    <button
      className="bg-red-400 p-2 hover:bg-red-500 text-white rounded-full ml-10"
      onClick={handleDelete}
    >
      <Image src="/delete.png" alt="" width={20} height={20} />
    </button>
  );
};

export default DeleteButton;
