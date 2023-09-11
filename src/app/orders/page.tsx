"use client";

import { OrderType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const OrdersPage = () => {
  // check user authenticate login
  const { data: session, status } = useSession();

  // handle case user logout in Orders Page
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }

  // fetch call api orders data
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetch("http://localhost:3000/api/orders").then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log("OrdersPage ~ error:", error);
      console.log("OrdersPage ~ variables:", variables);
      console.log("OrdersPage ~ context:", context);
    },
  });

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    const status = input.value;

    mutation.mutate({ id, status });
    toast.success("The order status has been changed!");
  };

  if (isLoading || status === "loading") return "Loading...";
  if (error) return "An error has occurred: " + error;

  return (
    <div className="p-4 lg:px-20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: OrderType) => (
            <tr
              className={`text-sm md:text-base ${
                item.status !== "delivered" && "bg-red-50"
              } `}
              key={item.id}
            >
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">
                {item.createdAt.toString().slice(0, 10)}
              </td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">
                {item.products[0].title}
              </td>
              {session?.user.isAdmin ? (
                <td>
                  <form
                    className="flex items-center justify-between md:justify-center gap-3 md:gap-6 md:px-3"
                    onSubmit={(e) => handleUpdate(e, item.id)}
                  >
                    <input
                      placeholder={item.status}
                      className="py-1 px-2 md:p-2 ring-1 ring-red-100 rounded-md w-full"
                    />
                    <button className="bg-red-400 p-1 md:p-2 rounded-full">
                      <Image src={"/edit.png"} alt="" width={20} height={20} />
                    </button>
                  </form>
                </td>
              ) : (
                <td className="py-6 px-1">{item.status}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
